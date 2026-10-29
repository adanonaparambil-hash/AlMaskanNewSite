'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { useI18n } from '@/i18n/client';
import type { UI } from '@/i18n/ui';

type Status = { kind: 'idle' } | { kind: 'sending' } | { kind: 'success' } | { kind: 'error'; message: string; fallback?: boolean };

const TOPICS = ['Village', 'Accommodation', 'Catering', 'Retail', 'Spaces', 'Lifestyle'] as const;

const KINDS = ['Query', 'Quote', 'Complaint'] as const;

/** Room types (the values the inquiry email uses); labels come from ui.form.rooms. */
const ROOMS = [
  { v: 'Executive single', note: 'Liwan Building' },
  { v: 'Executive twin', note: 'Liwan Building' },
  { v: 'Executive triple', note: 'Liwan Building' },
  { v: 'Shared room', note: 'Majan 1' },
  { v: 'Individual bedspace', note: 'Majan 1' },
  { v: 'Basic room', note: 'Majan 2' },
] as const;

const MEAL_PLANS = ['Room Only', 'Bed & Breakfast', 'Half Board', 'Full Board'] as const;

type Errors = Partial<Record<'name' | 'email' | 'phone' | 'message' | 'topic' | 'residents', string>>;

function validate(f: FormData, t: UI['form']): Errors {
  const e: Errors = {};
  const name = String(f.get('name') ?? '').trim();
  const email = String(f.get('email') ?? '').trim();
  const phone = String(f.get('phone') ?? '').trim();
  const message = String(f.get('message') ?? '').trim();
  if (name.length < 2) e.name = t.errName;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) e.email = t.errEmail;
  if (phone && !/^[+()\d][\d\s().-]{5,}$/.test(phone)) e.phone = t.errPhone;
  if (message.length < 10) e.message = t.errMessage;
  const residents = String(f.get('residents') ?? '').trim();
  if (residents && !(/^\d+$/.test(residents) && Number(residents) >= 1 && Number(residents) <= 5000)) e.residents = t.errResidents;
  return e;
}

export default function InquiryForm({ defaultTopic = 'Village' }: { defaultTopic?: string }) {
  const { ui, site: SITE } = useI18n();
  const t = ui.form;
  const uid = useId();
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  const [errors, setErrors] = useState<Errors>({});
  const [audience, setAudience] = useState<'Individual' | 'Institution'>('Individual');
  const [topic, setTopic] = useState<string>(defaultTopic);
  const [kind, setKind] = useState<string>('Query');
  const [room, setRoom] = useState<string>('');
  const message = useRef<HTMLTextAreaElement>(null);

  // "Get a quote" buttons link here with ?kind=Quote&topic=…&room=…&about=…: set the form up to match
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const k = q.get('kind');
    const tp = q.get('topic');
    const rm = q.get('room');
    const about = q.get('about');
    if (k && (KINDS as readonly string[]).includes(k)) setKind(k);
    if (tp && (TOPICS as readonly string[]).includes(tp)) setTopic(tp);
    if (rm && ROOMS.some((r) => r.v === rm)) setRoom(rm);
    if (about && message.current && !message.current.value) message.current.value = t.quoteFor(about.slice(0, 120));
  }, [t]);
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
    const errs = validate(data, t);
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
        setKind('Query');
        setRoom('');
        setProgress(0);
      } else if (json.code === 'not_configured') {
        setStatus({ kind: 'error', fallback: true, message: t.notConfigured });
      } else {
        setStatus({ kind: 'error', message: t.failed });
      }
    } catch {
      setStatus({ kind: 'error', message: t.offline });
    }
  }

  const fid = (n: string) => `${uid}-${n}`;
  const err = (n: keyof Errors) => (errors[n] ? { 'aria-invalid': true, 'aria-describedby': fid(n + '-err') } : {});
  const Err = ({ n }: { n: keyof Errors }) => (errors[n] ? <p id={fid(n + '-err')} className="field__err">{errors[n]}</p> : null);

  return (
    <form className="form" onSubmit={onSubmit} onInput={(e) => measure(e.currentTarget)} noValidate aria-describedby={fid('status')}>
      <div className="form__steps" aria-hidden="true">
        <span>{t.progress}</span>
        <i style={{ '--p': progress } as React.CSSProperties} />
        <span>{Math.round(progress * 100)}%</span>
      </div>
      <fieldset className="choice">
        <legend>{t.audience}</legend>
        <div>
          {(['Individual', 'Institution'] as const).map((v) => (
            <label key={v} className="chip">
              <input type="radio" name="audience" value={v} checked={audience === v} onChange={() => setAudience(v)} />
              <span>{t.audiences[v] ?? v}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="choice">
        <legend>{t.kind}</legend>
        <div>
          {KINDS.map((v) => (
            <label key={v} className="chip">
              <input type="radio" name="kind" value={v} checked={kind === v} onChange={() => setKind(v)} />
              <span>{t.kinds[v] ?? v}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="choice">
        <legend>{t.topic}</legend>
        <div>
          {TOPICS.map((v) => (
            <label key={v} className="chip">
              <input type="radio" name="topic" value={v} checked={topic === v} onChange={() => setTopic(v)} />
              <span>{t.topics[v] ?? v}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {topic === 'Accommodation' && (
        <div className="form__reveal">
          <fieldset className="choice">
            <legend>{t.roomType} <span className="opt">{t.optional}</span></legend>
            <div>
              {ROOMS.map((r) => (
                <label key={r.v} className="chip chip--room">
                  <input type="radio" name="room" value={r.v} checked={room === r.v} onChange={() => setRoom(r.v)} />
                  <span>{t.rooms[r.v]?.[0] ?? r.v}<small>{t.rooms[r.v]?.[1] ?? r.note}</small></span>
                </label>
              ))}
            </div>
          </fieldset>
          <fieldset className="choice">
            <legend>{t.mealPlan} <span className="opt">{t.optional}</span></legend>
            <div>
              {MEAL_PLANS.map((v) => (
                <label key={v} className="chip">
                  <input type="radio" name="mealPlan" value={v} />
                  <span>{t.mealPlans[v] ?? v}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <div className="form__grid">
            <div className="field">
              <label htmlFor={fid('residents')}>{t.residents} <span className="opt">{t.optional}</span></label>
              <input id={fid('residents')} name="residents" type="number" min={1} max={5000} inputMode="numeric" {...err('residents')} />
              <Err n="residents" />
            </div>
            <div className="field">
              <label htmlFor={fid('movein')}>{t.movein} <span className="opt">{t.optional}</span></label>
              <input id={fid('movein')} name="movein" type="date" />
            </div>
            <div className="field">
              <label htmlFor={fid('duration')}>{t.duration} <span className="opt">{t.optional}</span></label>
              <input id={fid('duration')} name="duration" type="text" maxLength={60} placeholder={t.durationHint} />
            </div>
          </div>
        </div>
      )}

      <div className="form__grid">
        <div className="field">
          <label htmlFor={fid('name')}>{t.name}</label>
          <input id={fid('name')} name="name" type="text" autoComplete="name" required {...err('name')} />
          <Err n="name" />
        </div>
        {audience === 'Institution' && (
          <div className="field">
            <label htmlFor={fid('org')}>{t.organisation} <span className="opt">{t.optional}</span></label>
            <input id={fid('org')} name="organisation" type="text" autoComplete="organization" />
          </div>
        )}
        <div className="field">
          <label htmlFor={fid('email')}>{t.email}</label>
          <input id={fid('email')} name="email" type="email" dir="ltr" autoComplete="email" required {...err('email')} />
          <Err n="email" />
        </div>
        <div className="field">
          <label htmlFor={fid('phone')}>{t.phone} <span className="opt">{t.optional}</span></label>
          <input id={fid('phone')} name="phone" type="tel" dir="ltr" autoComplete="tel" inputMode="tel" {...err('phone')} />
          <Err n="phone" />
        </div>
      </div>

      <div className="field">
        <label htmlFor={fid('message')}>{t.message}</label>
        <textarea ref={message} id={fid('message')} name="message" rows={5} required {...err('message')} />
        <Err n="message" />
      </div>

      {/* honeypot — real visitors never see or fill this */}
      <div className="hp" aria-hidden="true">
        <label>{t.honeypot}<input type="text" name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>

      <div className="form__foot">
        <button type="submit" className="btn btn--solid" disabled={status.kind === 'sending'}>
          <span className="btn__label">{status.kind === 'sending' ? t.sending : t.send}</span>
        </button>
        <p className="form__note">{t.note(SITE.responseTime)}</p>
      </div>

      <div id={fid('status')} className="form__status" role="status" aria-live="polite">
        {status.kind === 'success' && (
          <p className="notice notice--ok">{t.success(SITE.responseTime)}</p>
        )}
        {status.kind === 'error' && (
          <div className="notice notice--err" role="alert">
            <p>{status.message}</p>
            {status.fallback && (
              <p>
                {t.fallbackA} <a dir="ltr" href={SITE.phones[0].href}>{SITE.phones[0].label}</a> {t.fallbackOr} <a dir="ltr" href={SITE.phones[1].href}>{SITE.phones[1].label}</a>{t.fallbackEmail}{' '}
                <a dir="ltr" href={`mailto:${SITE.email}`}>{SITE.email}</a>.
              </p>
            )}
          </div>
        )}
      </div>
    </form>
  );
}
