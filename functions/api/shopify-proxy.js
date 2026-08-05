export async function onRequestPost(context) {
  try {
    const body = await context.request.json();
    const res = await fetch('https://' + body.shop + '/admin/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ client_id: body.client_id, client_secret: body.client_secret, code: body.code })
    });
    const rawText = await res.text();
    let data;
    try { data = JSON.parse(rawText); } catch(e) { data = { raw: rawText.slice(0, 500) }; }
    return new Response(JSON.stringify({ status: res.status, data }), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: {'Content-Type':'application/json'} });
  }
}