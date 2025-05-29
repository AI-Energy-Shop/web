import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('a-token')?.value;
  const user = request.cookies.get('a-user')?.value;
  const userData = JSON.parse(user || '{}');
  const role = userData?.role?.name || 'PUBLIC';
  const path = request.nextUrl.pathname;

  const protectedPaths = [
    '/cart',
    '/profile',
    '/address',
    '/checkout-overview',
    '/checkout',
  ];

  // 🚫 PUBLIC: block access to protected paths if not authenticated
  if (!token || !user) {
    if (protectedPaths.some((p) => path.startsWith(p))) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
    return NextResponse.next(); // public route
  }

  // 🚫 CUSTOMER: block access to /admin
  if (role === 'CUSTOMER' && path.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // ✅ ADMIN and SALES can access everything, including /admin
  // No need to check further

  const response = NextResponse.next();
  response.headers.set('x-pathname', path);
  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api).*)'],
};
