import { Usercredentials } from '@/store/authStore'

export async function sendRegister(data: Usercredentials): Promise<unknown> {
    const url = 'http://localhost:8080/auth/register'
    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(data),
        })

        if (!res.ok) {
            throw new Error('Erro: ' + res.status)
        }

        const resData = await res.json()
        return resData
    } catch (error) {
        throw error
    }
}
