const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, X-Readr-Token',
};

const PROMPT = `You are a book detection assistant. Look at this image and identify all visible book titles and authors.
Return ONLY a JSON array with no markdown, no explanation — just raw JSON like:
[{"title":"The Great Gatsby","author":"F. Scott Fitzgerald"},{"title":"1984","author":"George Orwell"}]
If you cannot identify any books, return an empty array: []
Use the exact text visible on the covers or spines. If the author is not visible, use an empty string.`;

async function getFlashModel(apiKey) {
  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
  const data = await res.json();
  const models = (data.models || [])
    .filter(m =>
      m.name.includes('flash') &&
      (m.supportedGenerationMethods || []).includes('generateContent')
    )
    .map(m => m.name);
  return models[0] || 'models/gemini-2.0-flash';
}

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS_HEADERS });
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    const token = request.headers.get('X-Readr-Token');
    if (!token || token !== env.READR_TOKEN) {
      return json({ error: 'Unauthorized' }, 401);
    }

    try {
      const { image, mimeType } = await request.json();

      if (!image || !mimeType) {
        return json({ error: 'Missing image or mimeType' }, 400);
      }

      const model = await getFlashModel(env.GEMINI_API_KEY);

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/${model}:generateContent?key=${env.GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [
                { text: PROMPT },
                { inline_data: { mime_type: mimeType, data: image } }
              ]
            }],
            generationConfig: { temperature: 0.1, maxOutputTokens: 1024 }
          })
        }
      );

      const data = await res.json();

      if (!res.ok) {
        return json({ error: data.error?.message || `Gemini error ${res.status}` }, res.status);
      }

      return json(data);
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
