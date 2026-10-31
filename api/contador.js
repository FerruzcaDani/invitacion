import { get, list } from '@vercel/blob';
import { timingSafeEqual } from 'node:crypto';

function authorized(request) {
  const expected = process.env.ADMIN_PASSWORD;
  const provided = request.headers.get('authorization')?.replace(/^Bearer\s+/i, '') || '';
  if (!expected || !provided) return false;
  const left = Buffer.from(provided);
  const right = Buffer.from(expected);
  return left.length === right.length && timingSafeEqual(left, right);
}

export async function GET(request) {
  const headers = { 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex, nofollow' };
  if (!authorized(request)) return Response.json({ error: 'Acceso denegado' }, { status: 401, headers });
  if (!process.env.BLOB_READ_WRITE_TOKEN && !process.env.BLOB_STORE_ID) {
    return Response.json({ error: 'Almacenamiento no configurado' }, { status: 503, headers });
  }
  try {
    const records = [];
    let cursor;
    let hasMore = true;
    while (hasMore && records.length < 5000) {
      const page = await list({ prefix: 'confirmaciones/', limit: 1000, cursor });
      for (const blob of page.blobs) {
        const result = await get(blob.pathname, { access: 'private' });
        if (result?.stream) {
          const item = await new Response(result.stream).json();
          if (typeof item.confirmedAt === 'string') records.push(item);
        }
      }
      hasMore = page.hasMore;
      cursor = page.cursor;
    }
    records.sort((a, b) => b.confirmedAt.localeCompare(a.confirmedAt));
    return Response.json({ confirmations: records.length }, { headers });
  } catch (error) {
    console.error('Counter loading failed', error);
    return Response.json({ error: 'No se pudo cargar el contador' }, { status: 503, headers });
  }
}
