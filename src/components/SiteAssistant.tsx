'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import Link from './LocaleLink';
import { useI18n } from '@/i18n/client';
import type { Topic } from '@/lib/assistant/topics';

type Msg = { role: 'user' | 'assistant'; content: string; topic?: Topic; contact?: boolean };

/** Paths, links, emails and phone numbers in an answer become tappable; everything else stays plain text. */
function linkify(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /(https?:\/\/[^\s)]+|\/(?:[a-z0-9-]+\/?)+(?=[\s).,;:]|$)|[\w.+-]+@[\w-]+\.[\w.]+|\+968[\d\s]{8,11}\d)/gi;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const v = m[0];
    const key = `${m.index}-${v}`;
    if (v.startsWith('/')) out.push(<Link key={key} href={v.replace(/\/$/, '') || '/'}>{v}</Link>);
    else if (v.includes('@')) out.push(<a key={key} dir="ltr" href={`mailto:${v}`}>{v}</a>);
    else if (v.startsWith('+')) out.push(<a key={key} dir="ltr" href={`tel:${v.replace(/\s/g, '')}`}>{v}</a>);
    else out.push(<a key={key} href={v} target="_blank" rel="noopener noreferrer">{v}</a>);
    last = m.index + v.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

/** Offline answer for a typed question: the topic whose keywords match best. */
function matchTopic(q: string, topics: Topic[]) {
  const words = q.toLowerCase().split(/[\s،,.?!؟]+/).filter(Boolean);
  let best: Topic | undefined;
  let score = 0;
  for (const t of topics) {
    const s = t.keywords.reduce((n, k) => n + (words.some((w) => w.includes(k) || k.includes(w) && w.length > 3) ? 1 : 0), 0);
    if (s > score) { score = s; best = t; }
  }
  return best;
}

/**
 * Floating site assistant. Topic chips answer instantly from the site's content; typed questions go to /api/chat
 * (Claude, streamed) when it is configured, otherwise they are matched to the closest topic. Contact details are
 * offered whenever it cannot answer.
 */
export default function SiteAssistant({ topics }: { topics: Topic[] }) {
  const { ui, site } = useI18n();
  const t = ui.assistant;
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [ai, setAi] = useState<boolean | null>(null);
  const list = useRef<HTMLDivElement>(null);
  const field = useRef<HTMLTextAreaElement>(null);
  const launcher = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    field.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setOpen(false); launcher.current?.focus(); } };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => { list.current?.scrollTo({ top: list.current.scrollHeight, behavior: 'smooth' }); }, [msgs, busy]);

  const pickTopic = (topic: Topic) => {
    setMsgs((m) => [...m, { role: 'user', content: topic.label }, { role: 'assistant', content: topic.answer, topic }]);
  };

  const fallback = (q: string, reason: 'offline' | 'error' | 'refused' | 'busy') => {
    const topic = reason === 'offline' ? matchTopic(q, topics) : undefined;
    setMsgs((m) => [...m, topic ? { role: 'assistant', content: topic.answer, topic } : { role: 'assistant', content: t[reason], contact: true }]);
  };

  async function ask(e?: React.FormEvent) {
    e?.preventDefault();
    const q = input.trim();
    if (!q || busy) return;
    setInput('');
    const history: Msg[] = [...msgs, { role: 'user', content: q }];
    setMsgs(history);
    if (ai === false) { fallback(q, 'offline'); return; }
    setBusy(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ messages: history.slice(-12).map(({ role, content }) => ({ role, content })) }),
      });
      if (res.status === 503) { setAi(false); fallback(q, 'offline'); return; }
      if (res.status === 429) { fallback(q, 'busy'); return; }
      if (!res.ok || !res.body) { fallback(q, 'error'); return; }
      setAi(true);
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let text = '';
      setMsgs((m) => [...m, { role: 'assistant', content: '' }]);
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        text += decoder.decode(value, { stream: true });
        const shown = text.split('\u0000')[0];
        setMsgs((m) => [...m.slice(0, -1), { role: 'assistant', content: shown }]);
      }
      if (text.includes('\u0000REFUSAL') || text.includes('\u0000ERROR') || !text.trim()) {
        const reason = text.includes('\u0000REFUSAL') ? 'refused' : 'error';
        setMsgs((m) => [...m.slice(0, m[m.length - 1]?.content ? m.length : -1), { role: 'assistant', content: t[reason], contact: true }]);
      }
    } catch {
      fallback(q, 'error');
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <button
        ref={launcher}
        type="button"
        className={`assistant__launcher${open ? ' is-open' : ''}`}
        aria-expanded={open}
        aria-controls="site-assistant"
        aria-label={open ? t.close : t.open}
        onClick={() => setOpen((v) => !v)}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          {open
            ? <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            : <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8a2.5 2.5 0 0 1-2.5 2.5H10l-4.5 4v-4h0A2.5 2.5 0 0 1 3 13.5v-8Zm5 4.5h.01M12 10h.01M15 10h.01" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />}
        </svg>
        {!open && <span className="assistant__hint">{t.open}</span>}
      </button>

      <section id="site-assistant" className={`assistant glass${open ? ' is-open' : ''}`} role="dialog" aria-label={t.title} aria-hidden={!open} inert={!open}>
        <header className="assistant__head">
          <img src="/assets/logos/al-maskaan-village-mark.png" alt="" width="34" height="34" />
          <div>
            <h2>{t.title}</h2>
            <p>{t.subtitle}</p>
          </div>
        </header>

        <div className="assistant__body" ref={list} aria-live="polite">
          <div className="assistant__msg is-bot"><p>{t.greeting}</p></div>
          {msgs.map((m, i) => (
            <div key={i} className={`assistant__msg ${m.role === 'user' ? 'is-user' : 'is-bot'}`}>
              {m.content.split('\n').map((ln, j) => (ln ? <p key={j}>{linkify(ln)}</p> : <br key={j} />))}
              {m.topic?.href && (
                m.topic.href.startsWith('http')
                  ? <a className="assistant__cta" href={m.topic.href} target="_blank" rel="noopener noreferrer">{m.topic.hrefLabel} ↗</a>
                  : <Link className="assistant__cta" href={m.topic.href}>{m.topic.hrefLabel}</Link>
              )}
              {m.contact && (
                <p className="assistant__contact">
                  <a dir="ltr" href={site.phones[0].href}>{site.phones[0].label}</a> · <a dir="ltr" href={`mailto:${site.email}`}>{site.email}</a>
                </p>
              )}
            </div>
          ))}
          {busy && <div className="assistant__msg is-bot assistant__typing" aria-label={t.typing}><i /><i /><i /></div>}
          <div className="assistant__chips" role="group" aria-label={t.topics}>
            {topics.map((tp) => <button key={tp.id} type="button" onClick={() => pickTopic(tp)}>{tp.label}</button>)}
          </div>
        </div>

        <form className="assistant__form" onSubmit={ask}>
          <textarea
            ref={field}
            rows={1}
            value={input}
            maxLength={600}
            placeholder={t.placeholder}
            aria-label={t.placeholder}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); void ask(); } }}
          />
          <button type="submit" disabled={busy || !input.trim()} aria-label={t.send}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </form>
        {ai && <p className="assistant__note">{t.aiNote}</p>}
      </section>
    </>
  );
}
