import { put } from '@vercel/blob';
import { randomUUID } from 'node:crypto';

export async function POST() {
  if (!process.env.BLOB_READ_WRITE_TOKEN && !process.env.BLOB_STORE_ID) {
    return Response.json({ error: 'Confirmaciones no disponibles' }, { status: 503 });
  }
  try {
    const record = { confirmedAt: new Date().toISOString() };
    await put(`confirmaciones/${Date.now()}-${randomUUID()}.json`, JSON.stringify(record), {
      access: 'private', contentType: 'application/json',
    });
    return Response.json({ ok: true }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    console.error('Confirmation storage failed', error);
    return Response.json({ error: 'No se pudo guardar' }, { status: 503 });
  }
}
