// Image loader for the static cPanel build (no image optimiser on the server). scripts/build-cpanel.mjs writes every
// raster image under /assets in each width below as WebP to /_img/<width>/…; this picks the file for a requested
// width, so phones download small images and big screens sharp ones.
export const IMG_WIDTHS = [96, 200, 384, 640, 960, 1440, 1920];

export default function cpanelImageLoader({ src, width }: { src: string; width: number; quality?: number }) {
  if (!src.startsWith('/assets/') || !/\.(jpe?g|png|webp)$/i.test(src)) return src;
  const w = IMG_WIDTHS.find((x) => x >= width) ?? IMG_WIDTHS[IMG_WIDTHS.length - 1];
  return `/_img/${w}${src.replace(/\.(jpe?g|png|webp)$/i, '.webp')}`;
}
