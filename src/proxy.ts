import { NextResponse, type NextRequest } from 'next/server';

// English keeps its original, unprefixed URLs (rewritten internally to the /en segment); Arabic lives under /ar.
// /en/... is never a public URL: it redirects to the unprefixed address so each page has one English URL.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === '/en' || pathname.startsWith('/en/')) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(3) || '/';
    return NextResponse.redirect(url, 308);
  }
  if (pathname === '/ar' || pathname.startsWith('/ar/')) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/en${pathname === '/' ? '' : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // pages only: skip the API, Next internals, public assets and any file with an extension (robots.txt, sitemap.xml, images…)
  matcher: ['/((?!api|_next|assets|.*\\..*).*)'],
};
