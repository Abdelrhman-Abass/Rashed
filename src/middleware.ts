// src/middleware.ts (or /middleware.ts)
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