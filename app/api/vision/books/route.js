export async function POST(request) {
  const workerUrl = process.env.WORKER_URL;
  const workerToken = process.env.WORKER_TOKEN;

  if (!workerUrl || !workerToken) {
    return Response.json({ error: 'Worker not configured' }, { status: 500 });
  }

  const body = await request.text();
  const upstream = await fetch(`${workerUrl}/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Readr-Token': workerToken },
    body,
  });

  return new Response(upstream.body, {
    status: upstream.status,
    headers: { 'Content-Type': upstream.headers.get('Content-Type') || 'application/json' },
  });
}
