export async function onRequestPost(context) {
  try {
    const body = await context.request.json();
    const res = await fetch('https://' + body.shop + '/admin/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ client_id: body.client_id, client_secret: body.client_secret, code: body.code })
    });
    const data = await res.json();
    return new Response(JSON.stringify({ status: res.status, data }), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: {'Content-Type':'application/json'} });
  }
}