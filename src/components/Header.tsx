'use client';

import Image from 'next/image';
import Link from './LocaleLink';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useI18n } from '@/i18n/client';
import { switchLocalePath } from '@/i18n/config';
import { lockScroll } from '@/lib/motion/smooth';

export default function Header() {
  const pathname = usePathname();
  const { nav, ui, locale, href, site } = useI18n();
  const other = locale === 'ar' ? 'en' : 'ar';
  // a plain anchor (not the locale-aware Link): this one deliberately leaves the current language
  const LangSwitch = ({ className }: { className: string }) => (
    <a className={className} href={switchLocalePath(pathname, other)} hrefLang={other} lang={other} aria-label={ui.switchToLabel}>{ui.switchTo}</a>
  );
  const [open, setOpen] = useState(false);
  const [openSub, setOpenSub] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    setOpenSub(null);
  }, []);

  // close on navigation
  useEffect(() => { close(); }, [pathname, close]);

  // lock page scroll + Escape + focus trap while the mobile menu is open
  useEffect(() => {
    const header = document.querySelector('[data-site-header]');
    header?.classList.toggle('menu-open', open);
    document.documentElement.style.overflow = open ? 'hidden' : '';
    lockScroll(open);
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { close(); burgerRef.current?.focus(); }
      if (e.key === 'Tab' && panelRef.current) {
        const f = [burgerRef.current, ...panelRef.current.querySelectorAll<HTMLElement>('a[href],button')].filter(Boolean) as HTMLElement[];
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('keydown', onKey); document.documentElement.style.overflow = ''; lockScroll(false); };
  }, [open, close]);

  // English pages report the internal /en path; compare against the address the visitor sees
  const current = pathname.replace(/^\/en(?=\/|$)/, '') || '/';
  const isActive = (path: string) => {
    const p = href(path);
    return path === '/' ? current === p : current === p || current.startsWith(p + '/');
  };

  return (
    <header className="site-header" data-site-header>
      <div className="site-header__bar container">
        <Link href="/" className="site-header__logo" aria-label={ui.header.logo} data-nav-bit>
          <Image src="/assets/logos/al-maskaan-village-logo.png" alt={site.name} width={300} height={84} priority sizes="150px" />
        </Link>

        <nav className="nav" aria-label={ui.header.primary}>
          <ul>
            {nav.map((item) => (
              <li key={item.href} className={item.children ? 'has-sub' : undefined} data-nav-bit>
                <Link href={item.href} aria-current={isActive(item.href) ? 'page' : undefined}>
                  <span>{item.label}</span>
                  {item.children && (
                    <svg width="9" height="6" viewBox="0 0 9 6" aria-hidden="true"><path d="M1 1l3.5 3.5L8 1" stroke="currentColor" strokeWidth="1.2" fill="none" /></svg>
                  )}
                </Link>
                {item.children && (
                  <div className="sub">
                    <ul>
                      {item.children.map((c) => (
                        <li key={c.href}>
                          <Link href={c.href}>
                            <span className="sub__label">{c.label}</span>
                            {c.note && <span className="sub__note">{c.note}</span>}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <Link href="/contact-us" className="site-header__cta btn btn--solid btn--sm" data-nav-bit>
          <span className="btn__label">{ui.header.cta}</span>
        </Link>

        <LangSwitch className="lang-switch" />

        <button
          ref={burgerRef}
          type="button"
          className="burger"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? ui.header.close : ui.header.open}
          onClick={() => setOpen((v) => !v)}
        >
          <span /><span />
        </button>
      </div>

      <div id="mobile-menu" ref={panelRef} className="mmenu" data-open={open} aria-hidden={!open} inert={!open}>
        <nav aria-label={ui.header.mobile}>
          <ul>
            {nav.map((item) => (
              <li key={item.href}>
                {item.children ? (
                  <>
                    <button type="button" className="mmenu__toggle" aria-expanded={openSub === item.href} onClick={() => setOpenSub(openSub === item.href ? null : item.href)}>
                      <span>{item.label}</span>
                      <span className="mmenu__plus" aria-hidden="true" />
                    </button>
                    <ul className="mmenu__sub" data-open={openSub === item.href}>
                      {item.children.map((c) => (
                        <li key={c.href}><Link href={c.href} tabIndex={openSub === item.href ? 0 : -1}>{c.label}</Link></li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <Link href={item.href} className="mmenu__link">{item.label}</Link>
                )}
              </li>
            ))}
            <li><Link href="/contact-us" className="mmenu__link mmenu__link--cta">{ui.header.cta}</Link></li>
            <li><LangSwitch className="mmenu__link mmenu__lang" /></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
