import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getMarketplaceCardById } from "../services/getMarketplaceCardById";
import { CardVerification } from "../services/cardVerification";
import { Product } from "@/mockedData/marketplace";

export function useMarketplaceCardById(id: string) {
    const queryClient = useQueryClient();

    return useQuery({
        queryKey: ['marketplaceCard', id],
        queryFn: async () => {
            // 1. Buscar a carta no banco de dados interno
            const dbCard = await getMarketplaceCardById(id);

            // 2. Buscar informações externas (imagem, preço) na API externa
            let imageUrl = "https://images.unsplash.com/photo-1618331835717-801e976710b2?w=500&q=80"; // Fallback
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

            // 3. Mapear e retornar o objeto enriquecido
            const enrichedCard = {
                id: dbCard.id.toString(),
                edition: dbCard.collection,
                title: dbCard.name,
                price: externalPrice || dbCard.cost || 0,
                rarity: dbCard.rarity || 'COMMON',
                isHot: false,
                image: imageUrl,
                isFavorite: false,
                colors: dbCard.colors || [],
                cardType: dbCard.cardType || '',
                // Detalhes extras necessários para o ProductDetails
                description: dbCard.description || externalDescription || '',
                cardNumber: dbCard.cardNumber || externalCardNumber || '',
                // A API mock não tem artista nativo, providenciando fallback
                artist: 'Artista Desconhecido', 
                cost: dbCard.cost || externalCost || 'N/A',
                power: dbCard.power || externalPower || 'N/A',
                combatAttribute: dbCard.combatAttribute || externalAttribute || 'N/A',
                subtypes: dbCard.subtypes || (externalSubtypes ? externalSubtypes.split(',') : []),
                life: externalLife || 'N/A',
                counter: externalCounter || 'N/A',
            };

            return enrichedCard;
        },
        initialData: () => {
            // Estratégia de otimização com Tanstack Query Cache:
            // Tenta recuperar a carta se ela já foi carregada pela listagem do marketplace
            const queries = queryClient.getQueriesData({ queryKey: ['marketplaceCards'] });
            for (const [key, data] of queries) {
                // O data retornado de marketplaceCards é { content: Product[], ... }
                const pageData = data as any; 
                if (pageData && pageData.content) {
                    const card = pageData.content.find((c: Product) => c.id === id);
                    if (card) return card;
                }
            }
            return undefined;
        },
        staleTime: 1000 * 60 * 5, // 5 minutos
    });
}
