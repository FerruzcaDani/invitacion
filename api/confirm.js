import { put } from '@vercel/blob';
import { randomUUID } from 'node:crypto';

export async function POST(request) {
  if (!process.env.BLOB_READ_WRITE_TOKEN && !process.env.BLOB_STORE_ID) {
    return Response.json({ error: 'Confirmaciones no disponibles' }, { status: 503 });
  }
  if (Number(request.headers.get('content-length') || 0) > 2048) {
    return Response.json({ error: 'Solicitud demasiado grande' }, { status: 413 });
  }
  let body;
  try { body = await request.json(); } catch { return Response.json({ error: 'Datos inválidos' }, { status: 400 }); }
  if (body.website) return Response.json({ ok: true });
  const name = String(body.name || '').trim().replace(/\s+/g, ' ');
  const count = Number(body.count);
  if (name.length < 2 || name.length > 80 || !Number.isInteger(count) || count < 1 || count > 20) {
    return Response.json({ error: 'Nombre o cantidad inválidos' }, { status: 400 });
  }
  const record = { name, count, confirmedAt: new Date().toISOString() };
  try {
    await put(`confirmaciones/${Date.now()}-${randomUUID()}.json`, JSON.stringify(record), {
      access: 'private', contentType: 'application/json',
    });
    return Response.json({ ok: true }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    console.error('Confirmation storage failed', error);
    return Response.json({ error: 'No se pudo guardar' }, { status: 503 });
  }
}
