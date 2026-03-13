import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export async function fetchData (endpoint: string , options: RequestInit = {}){
    const cookieStore = cookies();
    const token = (await cookieStore).get('access_token')?.value;
    const refreshToken = (await cookieStore).get('refresh_token')?.value

    const headers = {
        'Content-Type' : 'application/json',
        ...(token && { Authorization: `Bearer ${token}`}),
        ...options.headers,
    }

    const response = await fetch(`http://localhost:8080${endpoint}` , {
        ...options,
        headers,
    })


    if (response.status === 401){
        const refreshResponse = await fetch('http://localhost:8080/auth/refresh' , {
            method: 'POST',
            headers: {
                'Content-Type' : 'Application/json',
            },
            body: JSON.stringify({refreshToken})
        })

        if (!refreshResponse.ok){
            (await cookieStore).delete('access_token');
            (await cookieStore).delete('refresh_token');
            redirect('/');
        }
        const refreshResData = await refreshResponse.json()
        const refreshData = refreshResData.access_token;

        ;(await cookieStore).set({
            name: 'access_token',
            value: refreshData,

        })


        const newResponse = await fetch(`http://localhost:8080${endpoint}`, {
            ...options,
            headers:{
                ...options.headers,
                Authorization : `Bearer ${refreshData}`
            }
        })
        
        return newResponse
    }

    return response;
}