'use client';

import { useId, useState } from 'react';
import { useI18n } from '@/i18n/client';

/** “Join our mailing list” from the original News page. Posts to the same inquiry route (kind: Newsletter). */
export default function NewsletterForm() {
  const { ui } = useI18n();
  const t = ui.newsletter;
  const id = useId();
  const [state, setState] = useState<'idle' | 'sending' | 'ok' | 'err' | 'bad'>('idle');
  const [msg, setMsg] = useState('');

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = String(new FormData(form).get('email') ?? '').trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) { setState('bad'); setMsg(t.invalid); return; }
    setState('sending');
    try {
      const res = await fetch('/api/inquiry', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ kind: 'Newsletter', email, name: 'Mailing list', message: 'Please add this address to the mailing list.', website: new FormData(form).get('website') }) });
      const j = (await res.json().catch(() => ({}))) as { ok?: boolean; code?: string; error?: string };
      if (res.ok && j.ok) { setState('ok'); setMsg(t.ok); form.reset(); }
      else { setState('err'); setMsg(j.code === 'not_configured' ? t.notConfigured : t.error); }
    } catch { setState('err'); setMsg(t.offline); }
  }

  return (
    <form className="news-signup" onSubmit={submit} noValidate>
      <label htmlFor={`${id}-e`}>{t.label}</label>
      <div className="news-signup__row">
        <input id={`${id}-e`} name="email" type="email" autoComplete="email" placeholder={t.placeholder} dir="ltr" aria-invalid={state === 'bad'} aria-describedby={`${id}-s`} />
        <div className="hp" aria-hidden="true"><input type="text" name="website" tabIndex={-1} autoComplete="off" /></div>
        <button type="submit" className="btn btn--solid btn--sm" disabled={state === 'sending'}><span className="btn__label">{state === 'sending' ? t.sending : t.submit}</span></button>
      </div>
      <p id={`${id}-s`} role="status" aria-live="polite" className={`news-signup__msg${state === 'ok' ? ' is-ok' : state === 'idle' ? '' : ' is-err'}`}>{state === 'idle' || state === 'sending' ? '' : msg}</p>
    </form>
  );
}
