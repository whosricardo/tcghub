import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const res = await fetch('http://localhost:8080/auth/login', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(body),
        })

        if (!res.ok) {
            return NextResponse.json(
                { error: 'Credenciais inválidas' },
                { status: 401 }
            )
        }

        const resData = await res.json()
        console.log('Resposta do Java:', resData)
        const token = resData.accessToken
        const refreshToken = resData.refreshToken

        const response = NextResponse.json({
            success: true,
            message: 'Login realizado com sucesso',
        })

        response.cookies.set({
            name: 'access_token',
            value: token,
            httpOnly: true,
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60 * 24,
        })

        response.cookies.set({
            name: 'refresh_token',
            value: refreshToken,
            httpOnly: true,
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60 * 24  * 7
        })

        return response
    } catch (error) {
        return NextResponse.json(
            { error: 'Erro interno no servidor' },
            { status: 500 }
        )
    }
}
