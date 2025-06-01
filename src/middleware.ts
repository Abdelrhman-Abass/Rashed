import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the token from cookies
  const token = request.cookies.get('token')?.value;

  // Define protected paths
  const protectedPaths = [ '/chat/:path*'];

  // Check if the current path is protected
  const isProtectedPath = protectedPaths.some((path) => {
    // Handle dynamic routes by converting :path* to a regex
    const pattern = new RegExp(`^${path.replace(':path*', '.*')}$`);
    return pattern.test(request.nextUrl.pathname);
  });

  // Protect chat routes: redirect to login if no token
  if (isProtectedPath && !token) {
    // Store the requested URL to redirect back after login (optional)
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Prevent logged-in users from accessing login page
  if (request.nextUrl.pathname === '/login' && token) {
    return NextResponse.redirect(new URL('/chat', request.url));
  }

  // Allow request to proceed for non-protected routes or authenticated users
  return NextResponse.next();
}

export const config = {
  matcher: ['/chat/:path*', '/login'],
};