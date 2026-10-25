'use client';

import { useId, useState } from 'react';

/** “Join our mailing list” from the original News page. Posts to the same inquiry route (kind: Newsletter). */
export default function NewsletterForm() {
  const id = useId();
  const [state, setState] = useState<'idle' | 'sending' | 'ok' | 'err' | 'bad'>('idle');
  const [msg, setMsg] = useState('');

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = String(new FormData(form).get('email') ?? '').trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) { setState('bad'); setMsg('Please enter a valid email address.'); return; }
    setState('sending');
    try {
      const res = await fetch('/api/inquiry', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ kind: 'Newsletter', email, name: 'Mailing list', message: 'Please add this address to the mailing list.', website: new FormData(form).get('website') }) });
      const j = (await res.json().catch(() => ({}))) as { ok?: boolean; code?: string; error?: string };
      if (res.ok && j.ok) { setState('ok'); setMsg('Thank you — you are on the list.'); form.reset(); }
      else { setState('err'); setMsg(j.code === 'not_configured' ? 'Sign-up is not available right now, so your address was not saved. Please email us instead.' : j.error ?? 'Something went wrong. Please try again.'); }
    } catch { setState('err'); setMsg('We could not reach the server. Please try again.'); }
  }

  return (
    <form className="news-signup" onSubmit={submit} noValidate>
      <label htmlFor={`${id}-e`}>Join our mailing list</label>
      <div className="news-signup__row">
        <input id={`${id}-e`} name="email" type="email" autoComplete="email" placeholder="Your email address" aria-invalid={state === 'bad'} aria-describedby={`${id}-s`} />
        <div className="hp" aria-hidden="true"><input type="text" name="website" tabIndex={-1} autoComplete="off" /></div>
        <button type="submit" className="btn btn--solid btn--sm" disabled={state === 'sending'}><span className="btn__label">{state === 'sending' ? 'Sending…' : 'Sign up'}</span></button>
      </div>
      <p id={`${id}-s`} role="status" aria-live="polite" className={`news-signup__msg${state === 'ok' ? ' is-ok' : state === 'idle' ? '' : ' is-err'}`}>{state === 'idle' || state === 'sending' ? '' : msg}</p>
    </form>
  );
}
