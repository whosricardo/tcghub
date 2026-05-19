export async function CardVerification (card:string, typeCard?: string){
    const searchParams = new URLSearchParams()
    if (card) searchParams.append('card_name', card)
    if (typeCard) searchParams.append('card_type', typeCard)

    const baseUrl =  `https://www.optcgapi.com/api/sets/filtered/?${searchParams.toString()}`;
    if (!card) return [];
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