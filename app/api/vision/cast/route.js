export async function POST(request) {
  try {
    const workerUrl = process.env.WORKER_URL;
    const workerToken = process.env.WORKER_TOKEN;

    if (!workerUrl || !workerToken) {
      return Response.json({ error: 'Worker not configured' }, { status: 500 });
    }

    const body = await request.text();
    const upstream = await fetch(`${workerUrl}/cast`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Readr-Token': workerToken },
      body,
    });

    const text = await upstream.text();
    return new Response(text, {
      status: upstream.status,
      headers: { 'Content-Type': upstream.headers.get('Content-Type') || 'application/json' },
    });
  } catch (e) {
    console.error('[api/vision/cast] error', e);
    return Response.json({ error: e?.message || 'Route error' }, { status: 500 });
  }
}
