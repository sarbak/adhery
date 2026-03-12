import { NextRequest, NextResponse } from 'next/server';

const PROTECTED_PATHS = ['/slides', '/pitch', '/pharma', '/dashboard', '/dashboard-new'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected = PROTECTED_PATHS.some(
    (p) => pathname === p || pathname.startsWith(p + '/')
  );

  if (!isProtected) return NextResponse.next();

  const auth = request.cookies.get('adhery-auth');
  if (auth?.value === 'authenticated') return NextResponse.next();

  const loginUrl = new URL('/login', request.url);
  loginUrl.searchParams.set('next', pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico|logo.svg|fonts).*)'],
};
