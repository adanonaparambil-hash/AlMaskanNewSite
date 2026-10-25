'use client';

import { useId, useState } from 'react';
import { SITE } from '@/content/site';

type Status = { kind: 'idle' } | { kind: 'sending' } | { kind: 'success' } | { kind: 'error'; message: string; fallback?: boolean };

const TOPICS = ['Village', 'Accommodation', 'Catering', 'Retail', 'Spaces', 'Lifestyle'] as const;

/** Room types as named on the accommodation pages. */
const ROOMS = [
  { v: 'Junior staff', note: 'Shared room, up to 10' },
  { v: 'Single premium', note: 'Senior staff · S1' },
  { v: 'Double premium', note: 'Senior staff · S2' },
  { v: 'Triple premium', note: 'Senior staff · S3' },
] as const;

type Errors = Partial<Record<'name' | 'email' | 'phone' | 'message' | 'topic' | 'residents', string>>;

function validate(f: FormData): Errors {
  const e: Errors = {};
  const name = String(f.get('name') ?? '').trim();
  const email = String(f.get('email') ?? '').trim();
  const phone = String(f.get('phone') ?? '').trim();
  const message = String(f.get('message') ?? '').trim();
  if (name.length < 2) e.name = 'Please enter your full name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) e.email = 'Please enter a valid email address.';
  if (phone && !/^[+()\d][\d\s().-]{5,}$/.test(phone)) e.phone = 'Please enter a valid phone number.';
  if (message.length < 10) e.message = 'Please tell us a little more (at least 10 characters).';
  const residents = String(f.get('residents') ?? '').trim();
  if (residents && !(/^\d+$/.test(residents) && Number(residents) >= 1 && Number(residents) <= 5000)) e.residents = 'Please enter a number of residents between 1 and 5,000.';
  return e;
}

export default function InquiryForm({ defaultTopic = 'Village' }: { defaultTopic?: string }) {
  const uid = useId();
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  const [errors, setErrors] = useState<Errors>({});
  const [audience, setAudience] = useState<'Individual' | 'Institution'>('Individual');
  const [topic, setTopic] = useState<string>(defaultTopic);
  const [progress, setProgress] = useState(0);
  // share of the required fields that are already filled in — drives the progress line
  const measure = (form: HTMLFormElement) => {
    const f = new FormData(form);
    const done = [String(f.get('name') ?? '').trim().length >= 2, /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(f.get('email') ?? '').trim()), String(f.get('message') ?? '').trim().length >= 10].filter(Boolean).length;
    setProgress(done / 3);
  };

  async function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const form = ev.currentTarget;
    const data = new FormData(form);
    const errs = validate(data);
    setErrors(errs);
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0];
      (form.elements.namedItem(first) as HTMLElement | null)?.focus();
      return;
    }
    setStatus({ kind: 'sending' });
    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(data.entries())),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; code?: string };
      if (res.ok && json.ok) {
        setStatus({ kind: 'success' });
        form.reset();
        setAudience('Individual');
        setTopic(defaultTopic);
        setProgress(0);
      } else if (json.code === 'not_configured') {
        setStatus({ kind: 'error', fallback: true, message: 'Our online form is not available right now, so your message was not sent.' });
      } else {
        setStatus({ kind: 'error', message: json.error ?? 'Something went wrong and your message was not sent. Please try again.' });
      }
    } catch {
      setStatus({ kind: 'error', message: 'We could not reach the server, so your message was not sent. Please check your connection and try again.' });
    }
  }

  const fid = (n: string) => `${uid}-${n}`;
  const err = (n: keyof Errors) => (errors[n] ? { 'aria-invalid': true, 'aria-describedby': fid(n + '-err') } : {});
  const Err = ({ n }: { n: keyof Errors }) => (errors[n] ? <p id={fid(n + '-err')} className="field__err">{errors[n]}</p> : null);

  return (
    <form className="form" onSubmit={onSubmit} onInput={(e) => measure(e.currentTarget)} noValidate aria-describedby={fid('status')}>
      <div className="form__steps" aria-hidden="true">
        <span>Your inquiry</span>
        <i style={{ '--p': progress } as React.CSSProperties} />
        <span>{Math.round(progress * 100)}%</span>
      </div>
      <fieldset className="choice">
        <legend>You are an</legend>
        <div>
          {(['Individual', 'Institution'] as const).map((v) => (
            <label key={v} className="chip">
              <input type="radio" name="audience" value={v} checked={audience === v} onChange={() => setAudience(v)} />
              <span>{v}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="choice">
        <legend>You want to submit a</legend>
        <div>
          {['Query', 'Complaint'].map((v, i) => (
            <label key={v} className="chip">
              <input type="radio" name="kind" value={v} defaultChecked={i === 0} />
              <span>{v}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="choice">
        <legend>Your query is about Al Maskaan</legend>
        <div>
          {TOPICS.map((v) => (
            <label key={v} className="chip">
              <input type="radio" name="topic" value={v} checked={topic === v} onChange={() => setTopic(v)} />
              <span>{v}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {topic === 'Accommodation' && (
        <div className="form__reveal">
          <fieldset className="choice">
            <legend>Room type <span className="opt" style={{ textTransform: 'none', letterSpacing: 0 }}>(optional)</span></legend>
            <div>
              {ROOMS.map((r) => (
                <label key={r.v} className="chip chip--room">
                  <input type="radio" name="room" value={r.v} />
                  <span>{r.v}<small>{r.note}</small></span>
                </label>
              ))}
            </div>
          </fieldset>
          <div className="form__grid">
            <div className="field">
              <label htmlFor={fid('residents')}>Number of residents <span className="opt">(optional)</span></label>
              <input id={fid('residents')} name="residents" type="number" min={1} max={5000} inputMode="numeric" {...err('residents')} />
              <Err n="residents" />
            </div>
            <div className="field">
              <label htmlFor={fid('movein')}>Preferred move-in date <span className="opt">(optional)</span></label>
              <input id={fid('movein')} name="movein" type="date" />
            </div>
          </div>
        </div>
      )}

      <div className="form__grid">
        <div className="field">
          <label htmlFor={fid('name')}>Full name</label>
          <input id={fid('name')} name="name" type="text" autoComplete="name" required {...err('name')} />
          <Err n="name" />
        </div>
        {audience === 'Institution' && (
          <div className="field">
            <label htmlFor={fid('org')}>Organisation <span className="opt">(optional)</span></label>
            <input id={fid('org')} name="organisation" type="text" autoComplete="organization" />
          </div>
        )}
        <div className="field">
          <label htmlFor={fid('email')}>Email address</label>
          <input id={fid('email')} name="email" type="email" autoComplete="email" required {...err('email')} />
          <Err n="email" />
        </div>
        <div className="field">
          <label htmlFor={fid('phone')}>Phone <span className="opt">(optional)</span></label>
          <input id={fid('phone')} name="phone" type="tel" autoComplete="tel" inputMode="tel" {...err('phone')} />
          <Err n="phone" />
        </div>
      </div>

      <div className="field">
        <label htmlFor={fid('message')}>Tell us briefly about your enterprise and the ways we can help you</label>
        <textarea id={fid('message')} name="message" rows={5} required {...err('message')} />
        <Err n="message" />
      </div>

      {/* honeypot — real visitors never see or fill this */}
      <div className="hp" aria-hidden="true">
        <label>Leave this field empty<input type="text" name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>

      <div className="form__foot">
        <button type="submit" className="btn btn--solid" disabled={status.kind === 'sending'}>
          <span className="btn__label">{status.kind === 'sending' ? 'Sending…' : 'Send message'}</span>
        </button>
        <p className="form__note">We typically answer within {SITE.responseTime}.</p>
      </div>

      <div id={fid('status')} className="form__status" role="status" aria-live="polite">
        {status.kind === 'success' && (
          <p className="notice notice--ok">Thank you — your message has been sent. We will come back to you within {SITE.responseTime}.</p>
        )}
        {status.kind === 'error' && (
          <div className="notice notice--err" role="alert">
            <p>{status.message}</p>
            {status.fallback && (
              <p>
                Please call <a href={SITE.phones[0].href}>{SITE.phones[0].label}</a> or <a href={SITE.phones[1].href}>{SITE.phones[1].label}</a>, or email{' '}
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
              </p>
            )}
          </div>
        )}
      </div>
    </form>
  );
}
