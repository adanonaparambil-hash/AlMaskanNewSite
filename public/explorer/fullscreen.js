'use strict';
// One full-screen action for the whole explorer (sidebar, masterplan and tour together). Embedded in the website it
// takes the <iframe> itself full screen from the parent page; opened on its own it uses this page. Where the browser
// has no element full screen (iPhone) or refuses it, the explorer is expanded to fill the window instead.
(() => {
  let host = null;
  try { host = window.frameElement; } catch {}
  const doc = host ? host.ownerDocument : document;
  const target = host || document.documentElement;
  const expandedClass = 'explorer-expanded';
  const buttons = () => document.querySelectorAll('[data-fullscreen]');

  const isExpanded = () => doc.documentElement.classList.contains(expandedClass);
  const isFull = () => !!doc.fullscreenElement || !!doc.webkitFullscreenElement || isExpanded();

  function label() {
    const on = isFull();
    document.body.classList.toggle('is-full', on);
    buttons().forEach((b) => {
      b.setAttribute('aria-label', on ? 'Exit full screen' : 'Enter full screen');
      b.setAttribute('title', on ? 'Exit full screen' : 'Full screen');
      b.querySelector('use')?.setAttribute('href', on ? '#i-exit' : '#i-full');
      const text = b.querySelector('span');
      if (text) text.textContent = on ? 'Exit full screen' : 'Full screen';
    });
  }

  function expand(on) {
    doc.documentElement.classList.toggle(expandedClass, on);
    host?.classList.toggle('is-expanded', on);
    label();
  }

  async function toggle() {
    if (isExpanded()) { expand(false); return; }
    if (doc.fullscreenElement || doc.webkitFullscreenElement) {
      try { await (doc.exitFullscreen?.() ?? doc.webkitExitFullscreen?.()); } catch {}
      return;
    }
    const request = target.requestFullscreen ?? target.webkitRequestFullscreen;
    if (request && (doc.fullscreenEnabled ?? doc.webkitFullscreenEnabled)) {
      try { await request.call(target); return; } catch {}
    }
    expand(true);
  }

  ['fullscreenchange', 'webkitfullscreenchange'].forEach((t) => doc.addEventListener(t, label));
  const onKey = (e) => { if (e.key === 'Escape' && isExpanded()) expand(false); };
  document.addEventListener('keydown', onKey);
  if (host) doc.addEventListener('keydown', onKey);
  window.toggleExplorerFullscreen = toggle;
  document.addEventListener('DOMContentLoaded', () => {
    buttons().forEach((b) => { b.hidden = false; b.addEventListener('click', toggle); });
    label();
  });
})();
