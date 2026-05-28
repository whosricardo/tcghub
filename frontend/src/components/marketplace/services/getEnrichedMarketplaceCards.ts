"use server"

import { getAllMarketplaceCards, CardSearchParams } from "./getAllMarketplaceCards";
import { CardVerification } from "./cardVerification";
import { Product } from "@/mockedData/marketplace";

export async function getEnrichedMarketplaceCards(params: CardSearchParams, page: number, limit: number = 12) {
    // 1. Fetch from database internal API
    const dbData = await getAllMarketplaceCards(params, page, limit);
    const content = dbData?.content || [];

    // 2. Fetch images and price from external API for each card (runs on the Next.js server!)
    const enrichedCards: Product[] = await Promise.all(
        content.map(async (dbCard) => {
            let imageUrl = "https://images.unsplash.com/photo-1618331835717-801e976710b2?w=500&q=80"; // Fallback image valid
            let externalPrice = 0;
            let externalDescription = "";
            let externalCardNumber = "";
            let externalLife = "";
            let externalCounter = "";
            let externalCost = "";
            let externalPower = "";
            let externalAttribute = "";
            let externalSubtypes = "";

            try {
                const extCards = await CardVerification(dbCard.name, dbCard.cardType);
                if (extCards && extCards.length > 0) {
                    const extCard = extCards[0];
                    if (extCard.card_image) {
                        imageUrl = extCard.card_image;
                    }
                    if (extCard.market_price) {
                        externalPrice = extCard.market_price;
                    }
                    if (extCard.card_text) {
                        externalDescription = extCard.card_text;
                    }
                    if (extCard.card_set_id) {
                        externalCardNumber = extCard.card_set_id;
                    }
                    if (extCard.life && extCard.life !== "NULL") {
                        externalLife = extCard.life;
                    }
                    if (extCard.counter_amount && extCard.counter_amount !== "NULL") {
                        externalCounter = extCard.counter_amount;
                    }
                    if (extCard.card_cost && extCard.card_cost !== "NULL") {
                        externalCost = extCard.card_cost;
                    }
                    if (extCard.card_power && extCard.card_power !== "NULL") {
                        externalPower = extCard.card_power;
                    }
                    if (extCard.attribute && extCard.attribute !== "NULL") {
                        externalAttribute = extCard.attribute;
                    }
                    if (extCard.sub_types && extCard.sub_types !== "NULL") {
                        externalSubtypes = extCard.sub_types;
                    }
                }
            } catch (error) {
                console.error("Failed to fetch external card info for", dbCard.name);
            }

            return {
                id: dbCard.id.toString(),
                edition: dbCard.collection,
                title: dbCard.name,
                price: externalPrice || dbCard.cost || 0, // Fallback to cost or 0 if no market price
                rarity: dbCard.rarity || 'COMMON',
                isHot: false,
                image: imageUrl,
                isFavorite: false,
                colors: dbCard.colors || [],
                cardType: dbCard.cardType || '',
                description: dbCard.description || externalDescription || '',
                cardNumber: dbCard.cardNumber || externalCardNumber || '',
                artist: 'Artista Desconhecido',
                cost: dbCard.cost || externalCost || 'N/A',
                power: dbCard.power || externalPower || 'N/A',
                combatAttribute: dbCard.combatAttribute || externalAttribute || 'N/A',
                subtypes: dbCard.subtypes || (externalSubtypes ? externalSubtypes.split(',') : []),
                life: externalLife || 'N/A',
                counter: externalCounter || 'N/A',
            };
        })
    );

    return {
        ...dbData,
        content: enrichedCards,
    };
}
