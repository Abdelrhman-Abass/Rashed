// // src/middleware.ts (or /middleware.ts)
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Example: Redirect based on path
  if (request.nextUrl.pathname.startsWith('/about')) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Or modify response
  const response = NextResponse.next()
  response.cookies.set('visited', 'true')
  return response
}

// Optional: Specify matching paths
export const config = {
  matcher: ['/about/:path*', '/dashboard/:path*'],
}

// middleware.ts (at the root of your Next.js project)
// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// export function middleware(request: NextRequest) {
//   // Get the token from cookies
//   const token = request.cookies.get('token')?.value;
//   console.log("Token from cookies:", token); // Log the token for debugging

//   // Define paths that require authentication (e.g., chat page)
//   const protectedPaths = ['/chat', '/chat/:path*'];
//   // const protectedPaths = [''];

//   // Check if the current path is a protected path
//   const isProtectedPath = protectedPaths.some((path) =>
//     request.nextUrl.pathname === path ||
//     new RegExp(path.replace(':path*', '.*')).test(request.nextUrl.pathname)
//   );

//   // If the user is trying to access a protected path (e.g., /chat)
//   // if (isProtectedPath) {
//   //   // If no token is found, redirect to the login page
//   //   if (!token) {
//   //     return NextResponse.redirect(new URL('/login', request.url));
//   //   }
//   //   // If token exists, allow access to the chat page
//   //   return NextResponse.next();
//   // }

//   // If the user is trying to access the login page and is already logged in
//   if (request.nextUrl.pathname === '/login' && token) {
//     // If the token exists, redirect to the chat page
//     return NextResponse.redirect(new URL('/chat', request.url));
//   }

//   // For all other routes, proceed as normal
//   return NextResponse.next();
// }

// // Specify which paths the middleware should apply to
// export const config = {
//   matcher: ['/chat/:path*', '/login'], // Apply middleware to chat and login routes
// };