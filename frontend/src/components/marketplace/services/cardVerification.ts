"use server"

export async function CardVerification(card:string, typeCard: string = 'Leader'){
    let translatedType = typeCard;
    const lowerType = typeCard?.toLowerCase() || '';
    if (lowerType === 'lider' || lowerType === 'líder') translatedType = 'Leader';
    else if (lowerType === 'personagem') translatedType = 'Character';
    else if (lowerType === 'evento') translatedType = 'Event';
    else if (lowerType === 'estágio' || lowerType === 'estagio' || lowerType === 'cenário' || lowerType === 'cenario') translatedType = 'Stage';

    // A API externa usa '.D.' em vez de ' D. '
    const normalizedCard = card ? card.replace(" D. ", ".D.") : "";

    const searchParams = new URLSearchParams({
        card_name: normalizedCard,
        card_type: translatedType,
    })

    const baseUrl =  `https://www.optcgapi.com/api/sets/filtered/?${searchParams.toString()}`;
    if (!normalizedCard) return [];
    try {
        const res = await fetch(baseUrl);

        if (!res.ok) {
            return [];
        }
        const resData = await res.json();
        if (resData.error) {
            return [];
        }
        return resData;
    }
    catch (error){
        console.error("Error fetching CardVerification:", error);
        return [];
    }
}
