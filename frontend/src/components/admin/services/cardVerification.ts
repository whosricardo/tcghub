export async function CardVerification (card:String){
    const baseUrl =  `https://www.optcgapi.com/api/sets/filtered/?card_name=${card}`;
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