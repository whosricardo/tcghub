import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export async function fetchData (endpoint: string , options: RequestInit = {}){
    const cookieStore = await cookies();
    const token = cookieStore.get('access_token')?.value;
    const refreshToken = cookieStore.get('refresh_token')?.value

    const headers = {
        'Content-Type' : 'application/json',
        ...(token && { Authorization: `Bearer ${token}`}),
        ...options.headers,
    }

    let response: Response;
    try{
        response = await fetch(`http://localhost:8080${endpoint}` , {
            ...options,
            headers,
        })
    }
    catch (error){
        cookieStore.delete('access_token');
        cookieStore.delete('refresh_token');
        return redirect('/');
    }


    if (response.status === 401){
        const refreshResponse = await fetch('http://localhost:8080/auth/refresh' , {
            method: 'POST',
            headers: {
                'Content-Type' : 'Application/json',
            },
            body: JSON.stringify({refreshToken})
        })

        if (!refreshResponse.ok){
            cookieStore.delete('access_token');
            cookieStore.delete('refresh_token');
            redirect('/');
        }
        const refreshResData = await refreshResponse.json()
        const refreshData = refreshResData.access_token;

        cookieStore.set({
            name: 'access_token',
            value: refreshData,
            path: '/'
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