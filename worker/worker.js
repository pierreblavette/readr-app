const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, X-Readr-Token',
};

const PROMPT = `You are a book detection assistant. Look at this image and identify all visible book titles and authors.

Return ONLY a JSON array with no markdown, no explanation — just raw JSON like:
[{"title":"The Great Gatsby","author":"F. Scott Fitzgerald"},{"title":"1984","author":"George Orwell"}]
If you cannot identify any books, return an empty array: []

CRITICAL SEPARATION RULES:
- The title and the author are ALWAYS separate fields. NEVER concatenate them.
- A book cover typically shows: the TITLE (often largest/boldest text) and the AUTHOR NAME (typically smaller, often prefixed by "by" or placed above/below the title).
- If you see "FLASH / Charles Duchaussois" on a cover, return {"title":"Flash","author":"Charles Duchaussois"} — NOT {"title":"Flash Charles Duchaussois","author":""}.
- If a person's name appears on the cover, it is almost certainly the author, not part of the title.
- If the author is genuinely not visible (e.g., spine only shows title), use an empty string for author. Do not guess.

Use the exact text visible on the covers or spines.`;

const QUOTE_PROMPT = `You are extracting a book quote from a photo of a page.

PRIORITY RULE: If any portion of the text is visually marked by the reader, return ONLY the marked portion. Marks include:
- Fluorescent highlighter (yellow, pink, green, orange, blue)
- Underline in pencil, pen, or ink
- Bracket, vertical line, or star in the margin
- Arrow pointing to a passage
- Any visible annotation framing a specific sentence or paragraph

If no such mark is present, extract the main body of text visible on the page.

FORMAT: Return ONLY the extracted text. Preserve line breaks where they separate sentences or paragraphs. No quotes around the result, no explanation, no markdown. If no readable text is found, return an empty string.`;

const MODEL_CASCADE = [
  'models/gemini-2.5-flash',
  'models/gemini-2.5-flash-lite',
];

function buildCastPrompt(title, author, lang) {
  const langName = lang === 'fr' ? 'French' : 'English';
  return `You are a literature assistant helping a reader keep track of characters while reading "${title}" by ${author || 'unknown author'}.

Return ONLY a JSON object (no markdown, no commentary) with this exact structure:
{
  "characters": [
    {
      "name": "<character name as in the book>",
      "role": "<one short sentence describing their role/identity>",
      "relations": "<one short sentence on key relations — optional, omit if none>"
    }
  ]
}

Rules:
- 5 to 10 characters maximum, prioritize the most prominent ones, ordered by importance.
- Write the role and relations fields in ${langName}.
- ANTI-SPOILER: Introduce each character only by their initial role, identity, or position at the start of the story. Do NOT reveal twists, fates, deaths, secret identities, or late-plot developments.
- Keep each field to one short sentence.
- If the book is unknown or no reliable character data exists, return exactly: {"error":"not_found"}
- Return ONLY the JSON, no backticks, no preamble.`;
}

function buildDefinePrompt(word, lang) {
  const langName = lang === 'fr' ? 'French' : 'English';
  return `You are a dictionary assistant. Define the word "${word}" in ${langName}.

Return ONLY a JSON object (no markdown, no commentary) with this exact structure:
{
  "definitions": [
    {
      "pos": "<part of speech, written in ${langName}>",
      "meaning": "<concise definition in ${langName}>",
      "example": "<short, natural example sentence in ${langName} using the word>"
    }
  ]
}

Rules:
- Provide up to 3 distinct meanings if the word is polysemous. Order by most common usage.
- Use natural, idiomatic ${langName} throughout.
- The example must contain the word itself.
- If the word is not a real word in ${langName} (or is gibberish), return exactly: {"error":"not_found"}
- Do not invent meanings. Do not translate the word to another language in the meaning.
- Return ONLY the JSON, no backticks, no preamble.`;
}

async function callGemini(apiKey, body) {
  let last = { status: 503, data: { error: { message: 'No model attempted' } } };
  for (const model of MODEL_CASCADE) {
    for (let attempt = 0; attempt < 2; attempt++) {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/${model}:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        }
      );
      const data = await res.json();
      if (res.ok) return { ok: true, status: res.status, data };
      last = { status: res.status, data };
      if (res.status !== 503 && res.status !== 429) return { ok: false, ...last };
      if (attempt === 0) await new Promise(r => setTimeout(r, 1000));
    }
  }
  return { ok: false, ...last };
}

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS_HEADERS });
    }

    const url = new URL(request.url);

    // GET /books — proxy Google Books API
    if (request.method === 'GET' && url.pathname === '/books') {
      try {
        const q     = url.searchParams.get('q');
        const title  = url.searchParams.get('title');
        const author = url.searchParams.get('author');

        let query, fields;
        if (q) {
          query  = encodeURIComponent(q);
          fields = 'items(volumeInfo(title,authors,publishedDate,categories))';
        } else {
          query  = encodeURIComponent(`intitle:${title} inauthor:${author}`);
          fields = 'items(volumeInfo(imageLinks,publishedDate,description))';
        }

        const gbUrl = `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=${q ? 8 : 1}&fields=${fields}&key=${env.GOOGLE_BOOKS_API_KEY}`;
        const res   = await fetch(gbUrl);
        const data  = await res.json();
        return json(data);
      } catch (e) {
        return json({ error: e.message || 'Books API error' }, 500);
      }
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    const token = request.headers.get('X-Readr-Token');
    if (!token || token !== env.READR_TOKEN) {
      return json({ error: 'Unauthorized' }, 401);
    }

    // POST /define — dictionary lookup via Gemini
    if (url.pathname === '/define') {
      try {
        const { word, lang } = await request.json();
        if (!word || typeof word !== 'string') {
          return json({ error: 'Missing word' }, 400);
        }
        const clean = word.trim().slice(0, 80);
        if (!clean) return json({ error: 'Empty word' }, 400);

        const result = await callGemini(env.GEMINI_API_KEY, {
          contents: [{ parts: [{ text: buildDefinePrompt(clean, lang === 'fr' ? 'fr' : 'en') }] }],
          generationConfig: { temperature: 0.2, maxOutputTokens: 1024, responseMimeType: 'application/json' }
        });

        if (!result.ok) {
          return json({ error: result.data?.error?.message || `Gemini error ${result.status}` }, result.status);
        }

        const raw = result.data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';
        let parsed;
        try { parsed = JSON.parse(raw); } catch { return json({ error: 'Bad model response' }, 502); }

        if (parsed.error === 'not_found') return json({ error: 'not_found' }, 404);
        if (!Array.isArray(parsed.definitions) || parsed.definitions.length === 0) {
          return json({ error: 'not_found' }, 404);
        }
        return json({ word: clean, lang: lang === 'fr' ? 'fr' : 'en', definitions: parsed.definitions });
      } catch (e) {
        return json({ error: e.message || 'Internal error' }, 500);
      }
    }

    // POST /cast — generate a character cast for a book via Gemini
    if (url.pathname === '/cast') {
      try {
        const { title, author, lang } = await request.json();
        if (!title || typeof title !== 'string') {
          return json({ error: 'Missing title' }, 400);
        }
        const cleanTitle  = title.trim().slice(0, 200);
        const cleanAuthor = (author || '').trim().slice(0, 200);
        if (!cleanTitle) return json({ error: 'Empty title' }, 400);

        const result = await callGemini(env.GEMINI_API_KEY, {
          contents: [{ parts: [{ text: buildCastPrompt(cleanTitle, cleanAuthor, lang === 'fr' ? 'fr' : 'en') }] }],
          generationConfig: { temperature: 0.3, maxOutputTokens: 2048, responseMimeType: 'application/json' }
        });

        if (!result.ok) {
          return json({ error: result.data?.error?.message || `Gemini error ${result.status}` }, result.status);
        }

        const raw = result.data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';
        let parsed;
        try { parsed = JSON.parse(raw); } catch { return json({ error: 'Bad model response' }, 502); }

        if (parsed.error === 'not_found') return json({ error: 'not_found' }, 404);
        if (!Array.isArray(parsed.characters) || parsed.characters.length === 0) {
          return json({ error: 'not_found' }, 404);
        }
        return json({ title: cleanTitle, author: cleanAuthor, lang: lang === 'fr' ? 'fr' : 'en', characters: parsed.characters });
      } catch (e) {
        return json({ error: e.message || 'Internal error' }, 500);
      }
    }

    // POST /quote — extract text from a photo for quote capture
    if (url.pathname === '/quote') {
      try {
        const { image, mimeType } = await request.json();

        if (!image || !mimeType) {
          return json({ error: 'Missing image or mimeType' }, 400);
        }

        const result = await callGemini(env.GEMINI_API_KEY, {
          contents: [{
            parts: [
              { text: QUOTE_PROMPT },
              { inline_data: { mime_type: mimeType, data: image } }
            ]
          }],
          generationConfig: { temperature: 0.1, maxOutputTokens: 2048 }
        });

        if (!result.ok) {
          return json({ error: result.data?.error?.message || `Gemini error ${result.status}` }, result.status);
        }

        const text = result.data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';
        return json({ text });
      } catch (e) {
        return json({ error: e.message || 'Internal error' }, 500);
      }
    }

    // POST / — detect books from a photo
    try {
      const { image, mimeType } = await request.json();

      if (!image || !mimeType) {
        return json({ error: 'Missing image or mimeType' }, 400);
      }

      const result = await callGemini(env.GEMINI_API_KEY, {
        contents: [{
          parts: [
            { text: PROMPT },
            { inline_data: { mime_type: mimeType, data: image } }
          ]
        }],
        generationConfig: { temperature: 0.1, maxOutputTokens: 1024 }
      });

      if (!result.ok) {
        return json({ error: result.data?.error?.message || `Gemini error ${result.status}` }, result.status);
      }

      return json(result.data);
    } catch (e) {
      return json({ error: e.message || 'Internal error' }, 500);
    }
  }
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }
  });
}
