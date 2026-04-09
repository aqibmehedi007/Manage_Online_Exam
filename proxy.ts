import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decrypt } from '@/lib/auth';

export async function proxy(request: NextRequest) {
  const session = request.cookies.get('session')?.value;
  const { pathname } = request.nextUrl;

  // 1. Allow API routes and Public assets
  if (pathname.startsWith('/api') || pathname.startsWith('/_next') || pathname === '/favicon.ico') {
    return NextResponse.next();
  }

  // 2. Auth Pages Redirection (If logged in, don't show login/register)
  if (pathname === '/auth/login' || pathname === '/auth/register') {
    if (session) {
      try {
        const decoded = await decrypt(session);
        const dashboard = decoded.role === 'EMPLOYER' ? '/employer' : '/candidate';
        return NextResponse.redirect(new URL(dashboard, request.url));
      } catch (e) {
        return NextResponse.next();
      }
    }
    return NextResponse.next();
  }

  // 3. Protected Routes
  if (pathname.startsWith('/employer') || pathname.startsWith('/candidate')) {
    if (!session) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    try {
      const decoded = await decrypt(session);
      
      // Role enforcement
      if (pathname.startsWith('/employer') && decoded.role !== 'EMPLOYER') {
        return NextResponse.redirect(new URL('/candidate', request.url));
      }
      if (pathname.startsWith('/candidate') && decoded.role !== 'CANDIDATE') {
        return NextResponse.redirect(new URL('/employer', request.url));
      }

      return NextResponse.next();
    } catch (e) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }

  // Default redirect if at root
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
