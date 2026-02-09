import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.has(`${process.env.NEXT_PUBLIC_TOKEN_NAME}`)
    if (!isAuthenticated) {
      return NextResponse.redirect(
        new URL(
          `${process?.env?.NEXT_PUBLIC_APP_URL || ''}/login`,
          request.url
        )
      )
  }
  return NextResponse.next()
}
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|login|games).*)',
  ],
}