export async function sendLogin(data: any) {
    const url = 'http://localhost:8080/auth/login'
    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(data),
        })

        if (!res.ok) {
            throw new Error('erro:' + res.status)
        }

        const resData = await res.json()
        return resData
    } catch (error) {
        throw error
    }
}
