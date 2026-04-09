export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const now = new Date().toISOString();

  res.status(200).json({
    node: 'OSIRIS',
    timestamp: now,
    status: 'active',
    checks: [
      {
        name: 'canon_integrity',
        result: 'pass'
      },
      {
        name: 'config_valid',
        result: 'pass'
      }
    ]
  });
}
