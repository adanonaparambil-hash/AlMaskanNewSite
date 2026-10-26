import Anthropic from '@anthropic-ai/sdk';
import { NextResponse } from 'next/server';
import { SITE_KNOWLEDGE } from '@/lib/assistant/knowledge';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Site assistant. POST { messages: [{ role: 'user' | 'assistant', content: string }] } → streams the answer as
 * plain UTF-8 text. Grounded in SITE_KNOWLEDGE (built from the site's content files), cached as the system prompt.
 * Needs ANTHROPIC_API_KEY; without it the route answers 503 { code: 'not_configured' } and the widget falls back
 * to its built-in topic answers.
 */
const MAX_TURNS = 12;
const MAX_CHARS = 1200;

// best-effort abuse brake per server instance (serverless instances do not share it)
const hits = new Map<string, { n: number; reset: number }>();
function limited(ip: string) {
  const now = Date.now();
  const h = hits.get(ip);
  if (!h || h.reset < now) { hits.set(ip, { n: 1, reset: now + 10 * 60_000 }); return false; }
  h.n += 1;
  return h.n > 40;
}

type Turn = { role: 'user' | 'assistant'; content: string };

function clean(body: unknown): Turn[] | null {
  const list = (body as { messages?: unknown })?.messages;
  if (!Array.isArray(list) || !list.length) return null;
  const turns = list
    .slice(-MAX_TURNS)
    .filter((m): m is Turn => !!m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
    .map((m) => ({ role: m.role, content: m.content.trim().slice(0, MAX_CHARS) }))
    .filter((m) => m.content.length > 0);
  // the conversation must start with the visitor and end with their question
  while (turns.length && turns[0].role !== 'user') turns.shift();
  return turns.length && turns[turns.length - 1].role === 'user' ? turns : null;
}

export async function POST(req: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ ok: false, code: 'not_configured' }, { status: 503 });
  }
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'local';
  if (limited(ip)) return NextResponse.json({ ok: false, code: 'rate_limited' }, { status: 429 });

  let messages: Turn[] | null = null;
  try { messages = clean(await req.json()); } catch {}
  if (!messages) return NextResponse.json({ ok: false, code: 'bad_request' }, { status: 400 });

  const client = new Anthropic();
  const stream = client.beta.messages.stream({
    model: 'claude-opus-5-5',
    max_tokens: 2048,
    // chat-style Q&A over a fixed knowledge text: low effort keeps answers quick and inexpensive
    output_config: { effort: 'low' },
    // a declined request is re-run server-side on Anthropic's recommended fallback model
    betas: ['server-side-fallback-2026-07-01'],
    fallbacks: 'default',
    system: [{ type: 'text', text: SITE_KNOWLEDGE, cache_control: { type: 'ephemeral', ttl: '1h' } }],
    messages,
  });

  const encoder = new TextEncoder();
  const body = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        for await (const event of stream) {
          if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
        // the whole fallback chain declined: the widget shows its "please contact us" line
        const final = await stream.finalMessage();
        if (final.stop_reason === 'refusal') controller.enqueue(encoder.encode('\u0000REFUSAL'));
      } catch (err) {
        if (err instanceof Anthropic.RateLimitError) console.error('[chat] rate limited by API');
        else if (err instanceof Anthropic.APIError) console.error(`[chat] API error ${err.status}:`, err.message);
        else console.error('[chat] stream failed:', err instanceof Error ? err.message : err);
        controller.enqueue(encoder.encode('\u0000ERROR'));
      } finally {
        controller.close();
      }
    },
    cancel() { stream.abort(); },
  });

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' } });
}
