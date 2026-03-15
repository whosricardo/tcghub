import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default function proxy(request: NextRequest) {
    const token = request.cookies.get('access_token')?.value
    const isAuthRoute = request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/cadastro')
    const isAdminRoute = request.nextUrl.pathname.startsWith('/admin')

    
    if (token && isAuthRoute) {
        return NextResponse.redirect(new URL('/', request.url))
    }


    if (!token && isAdminRoute){
        return NextResponse.redirect(new URL('/login', request.url))
    }


    return NextResponse.next()
}

export const config = {
    matcher: [
        '/login/:path*',
        '/cadastro/:path*',
        '/admin/:path*',
    ],
}