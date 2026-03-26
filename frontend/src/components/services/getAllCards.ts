"use server"

export async function getAllCards (endpoint:string){
  
    const baseUrl = `https://www.optcgapi.com/api/${endpoint}`;
    try {
        const res = await fetch(baseUrl);

        if (!res.ok) {
            throw new Error('Erro na requisição');
        }
        const resData = await res.json();
        return resData;
    }
    catch (error){
        throw error;
    }
}