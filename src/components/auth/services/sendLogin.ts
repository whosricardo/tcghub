export async function sendLogin(data: any) {
    const url = 'api/auth/login'
    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(data),
        })

        if (!res.ok) {
            const error = await res.json().catch(() => ({}))
            throw new Error(error.error || 'Erro ao realizar o login')
        }

        const resData = await res.json()
        return resData
    } catch (error) {
        throw error
    }
}
