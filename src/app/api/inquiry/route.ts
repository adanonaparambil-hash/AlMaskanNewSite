import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

const clean = (v: unknown, max: number) => String(v ?? '').replace(/[\r\n]+/g, ' ').trim().slice(0, max);
const cleanBlock = (v: unknown, max: number) => String(v ?? '').replace(/\r/g, '').trim().slice(0, max);
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/**
 * Delivers an inquiry by email over SMTP. Nothing is faked: when SMTP isn't configured the route answers 503
 * with code "not_configured" and the form tells the visitor their message was NOT sent.
 * Required env: SMTP_HOST, SMTP_USER, SMTP_PASS, INQUIRY_TO (see .env.example).
 */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 });
  }

  // honeypot: pretend success to bots without sending anything
  if (clean(body.website, 200)) return NextResponse.json({ ok: true });

  const audience = clean(body.audience, 20) === 'Institution' ? 'Institution' : 'Individual';
  const rawKind = clean(body.kind, 20);
  const kind = (['Complaint', 'Newsletter', 'Quote'] as const).find((k) => k === rawKind) ?? 'Query';
  const topic = ['Village', 'Accommodation', 'Catering', 'Retail', 'Spaces', 'Lifestyle'].includes(clean(body.topic, 20)) ? clean(body.topic, 20) : 'Village';
  const name = clean(body.name, 120);
  const organisation = clean(body.organisation, 160);
  const email = clean(body.email, 160);
  const phone = clean(body.phone, 40);
  const message = cleanBlock(body.message, 4000);
  // accommodation details (only sent when the topic is Accommodation; all optional)
  const room = ['Executive single', 'Executive twin', 'Executive triple', 'Shared room', 'Individual bedspace', 'Basic room'].includes(clean(body.room, 30)) ? clean(body.room, 30) : '';
  const mealPlan = ['Room Only', 'Bed & Breakfast', 'Half Board', 'Full Board'].includes(clean(body.mealPlan, 30)) ? clean(body.mealPlan, 30) : '';
  const duration = clean(body.duration, 60);
  const residentsNum = Number(clean(body.residents, 6));
  const residents = Number.isInteger(residentsNum) && residentsNum >= 1 && residentsNum <= 5000 ? String(residentsNum) : '';
  const movein = /^\d{4}-\d{2}-\d{2}$/.test(clean(body.movein, 10)) ? clean(body.movein, 10) : '';

  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
  if (!validEmail || (kind !== 'Newsletter' && (name.length < 2 || message.length < 10))) {
    return NextResponse.json({ ok: false, error: 'Please complete the required fields.' }, { status: 422 });
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS, INQUIRY_TO, INQUIRY_FROM } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !INQUIRY_TO) {
    return NextResponse.json({ ok: false, code: 'not_configured', error: 'Inquiry delivery is not configured.' }, { status: 503 });
  }

  const subject = `[Al Maskaan Village website] ${kind} · ${topic} · ${name}`;
  const lines = [
    `Type: ${kind}`,
    `From: ${audience}${organisation ? ` — ${organisation}` : ''}`,
    `About: Al Maskaan ${topic}`,
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone || '—'}`,
    ...(topic === 'Accommodation' && (room || residents || movein || mealPlan || duration)
      ? [`Room type: ${room || '—'}`, `Meal plan: ${mealPlan || '—'}`, `Number of people: ${residents || '—'}`, `Start date: ${movein || '—'}`, `Duration of stay: ${duration || '—'}`]
      : []),
    '',
    message,
  ];

  try {
    const transport = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT ?? 587),
      secure: SMTP_SECURE === 'true',
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });
    await transport.sendMail({
      from: INQUIRY_FROM || SMTP_USER,
      to: INQUIRY_TO,
      replyTo: `${name.replace(/[<>"]/g, '')} <${email}>`,
      subject,
      text: lines.join('\n'),
      html: `<p>${lines.slice(0, lines.indexOf('')).map(esc).join('<br>')}</p><p style="white-space:pre-wrap">${esc(message)}</p>`,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[inquiry] SMTP delivery failed:', err instanceof Error ? err.message : err);
    return NextResponse.json({ ok: false, error: 'We could not deliver your message just now. Please try again, or call or email us.' }, { status: 502 });
  }
}
