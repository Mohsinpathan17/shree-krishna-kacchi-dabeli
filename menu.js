const items = [
  { id: 'butter', name: 'Amul Butter Dabeli', price: 18 },
  { id: 'cheese', name: 'Cheese Dabeli', price: 30 },
  { id: 'special', name: 'Special Dabeli', price: 40 },
  { id: 'dryfruit', name: 'Dryfruit Dabeli', price: 35 },
];

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  return res.status(200).json({ items });
}
