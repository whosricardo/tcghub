export async function CardVerification (card:string , typeCard: string = 'Leader'){
    const searchParams = new URLSearchParams({
        card_name: card,
        card_type: typeCard,
    })


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