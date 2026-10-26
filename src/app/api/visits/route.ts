import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Site visitor counter. One number in Upstash Redis (REST API, no SDK):
 *   GET  → { configured, count }       current total
 *   POST → { configured, count }       adds one (the browser only calls this on its first visit)
 * Env (set automatically when an Upstash Redis store is connected to the project in Vercel):
 *   KV_REST_API_URL + KV_REST_API_TOKEN, or UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN.
 * Without them the route answers { configured: false } and the footer hides the counter — no made-up numbers.
 */
const KEY = 'amv:visitors';

function store() {
  const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? { url: url.replace(/\/$/, ''), token } : null;
}

async function command(s: { url: string; token: string }, ...args: string[]) {
  const res = await fetch(`${s.url}/${args.map(encodeURIComponent).join('/')}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${s.token}` },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`store responded ${res.status}`);
  const json = (await res.json()) as { result: string | number | null };
  return Number(json.result ?? 0);
}

const headers = { 'Cache-Control': 'no-store' };

export async function GET() {
  const s = store();
  if (!s) return NextResponse.json({ configured: false }, { headers });
  try {
    return NextResponse.json({ configured: true, count: await command(s, 'get', KEY) }, { headers });
  } catch (err) {
    console.error('[visits] read failed:', err instanceof Error ? err.message : err);
    return NextResponse.json({ configured: true, error: true }, { status: 502, headers });
  }
}

export async function POST(req: Request) {
  const s = store();
  if (!s) return NextResponse.json({ configured: false }, { headers });
  // crawlers that run scripts still announce themselves; don't count them
  if (/bot|crawl|spider|slurp|preview|headless|lighthouse/i.test(req.headers.get('user-agent') ?? '')) {
    return GET();
  }
  try {
    return NextResponse.json({ configured: true, count: await command(s, 'incr', KEY) }, { headers });
  } catch (err) {
    console.error('[visits] increment failed:', err instanceof Error ? err.message : err);
    return NextResponse.json({ configured: true, error: true }, { status: 502, headers });
  }
}
