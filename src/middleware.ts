import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('a-token')?.value;
  const user = request.cookies.get('a-user')?.value;
  const userData = JSON.parse(user || '{}');

  if (!token && !user) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  if (
    request.nextUrl.pathname.startsWith('/admin') &&
    userData?.role?.name !== 'ADMIN'
  ) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Get the pathname from the request
  const pathname = request.nextUrl.pathname;

  // Create a new response
  const response = NextResponse.next();

  // Set the pathname in a custom header
  response.headers.set('x-pathname', pathname);

  return response;
}

export const config = {
  matcher: [
    '/checkout',
    '/admin/:path*',
    '/cart/:path*',
    '/profile',
    '/address',
    '/checkout-overview',
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    // '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
