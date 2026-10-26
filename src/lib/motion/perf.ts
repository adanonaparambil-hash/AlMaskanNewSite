/**
 * Adaptive quality. The head script already marks touch / low-core / Save-Data devices `.is-lite`; this samples the real
 * frame rate once the page has settled and drops to lite mode (no grain, static ambient light, cheaper glass) on any
 * machine that cannot hold ~45fps — an integrated-GPU laptop, a throttled battery-saver mode, an old phone.
 */
export function watchFrameRate(): () => void {
  const html = document.documentElement;
  if (html.classList.contains('is-lite')) return () => {};
  let raf = 0;
  let timer = 0;
  const sample = () => {
    if (document.hidden) { timer = window.setTimeout(sample, 2000); return; }
    let frames = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      frames++;
      if (t - t0 < 1500) { raf = requestAnimationFrame(tick); return; }
      const fps = (frames * 1000) / (t - t0);
      if (fps < 45) html.classList.add('is-lite');
    };
    raf = requestAnimationFrame(tick);
  };
  // wait for the intro choreography to finish so we measure steady state, not the loader
  timer = window.setTimeout(sample, 6500);
  return () => { window.clearTimeout(timer); cancelAnimationFrame(raf); };
}
