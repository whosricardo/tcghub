import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default function proxy(request: NextRequest) {
    const token = request.cookies.get('auth_token')?.value
    const isAuthRoute = request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/cadastro')

    
    if (token && isAuthRoute) {
        return NextResponse.redirect(new URL('/', request.url))
    }


    return NextResponse.next()
}

export const config = {
    matcher: [
        '/login/:path*',
        '/cadastro/:path*',
    ],
}