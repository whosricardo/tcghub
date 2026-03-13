'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function Logout() {
    const cookiesStore = cookies()

    ;(await cookiesStore).delete('access_token')
    ;(await cookiesStore).delete('refresh_token')

    redirect('/login')
}
