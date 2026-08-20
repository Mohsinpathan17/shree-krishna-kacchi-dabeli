import { randomUUID } from 'node:crypto';

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { items, total, customer } = req.body || {};
  if (!Array.isArray(items) || !items.length) return res.status(400).json({ error: 'Cart is empty' });
  if (!customer?.name || !customer?.phone) return res.status(400).json({ error: 'Customer name and phone are required' });

  // Vercel Functions are stateless. This endpoint validates the order and returns an ID.
  // For permanent storage, connect Supabase/Postgres before launch.
  const orderId = randomUUID();
  return res.status(201).json({
    ok: true,
    orderId,
    received: {
      items,
      total: Number(total) || 0,
      customer: {
        name: String(customer.name).slice(0, 100),
        phone: String(customer.phone).slice(0, 30),
        notes: String(customer.notes || '').slice(0, 500),
      },
    },
  });
}
