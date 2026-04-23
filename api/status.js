export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  const { ref } = req.query;
  if (!ref) return res.status(400).json({ error: 'Missing ref' });
  try {
    const response = await fetch(
      `https://backend.payhero.co.ke/api/v2/transaction-status?external_reference=${ref}`,
      {
        headers: {
          'Authorization': 'Basic WVBoWVRjUlZqRExFSU5aUFFQZ1k6UnhmRnJOZVIwVnUxYnQ5NDQ2TjJNeU54V3g1ODFqV3BTdVFUTTR3eQ==',
        },
      }
    );
    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (err) {
    return res.status(500).json({ error: 'Proxy error', message: err.message });
  }
}
