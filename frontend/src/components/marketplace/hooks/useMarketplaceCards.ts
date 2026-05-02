import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getAllMarketplaceCards, CardSearchParams } from "../services/getAllMarketplaceCards";
import { CardVerification } from "../services/cardVerification";
import { Product } from "@/mockedData/marketplace";

export function useMarketplaceCards(params: CardSearchParams, page: number, limit: number = 12) {
    return useQuery({
        queryKey: ['marketplaceCards', params, page, limit],
        queryFn: async () => {
            // Fetch from database
            const dbData = await getAllMarketplaceCards(params, page, limit);

            // Safety check in case the response is not as expected
            const content = dbData?.content || [];

            // Fetch images and price from external API for each card
            const enrichedCards: Product[] = await Promise.all(
                content.map(async (dbCard) => {
                    let imageUrl = "https://images.unsplash.com/photo-1618331835717-801e976710b2?w=500&q=80"; // Fallback image valid
                    let externalPrice = 0;

                    try {
                        const extCards = await CardVerification(dbCard.name, dbCard.cardType);
                        if (extCards && extCards.length > 0) {
                            // Find matching card or just use the first one returned
                            const extCard = extCards[0];
                            if (extCard.card_image) {
                                imageUrl = extCard.card_image;
                            }
                            if (extCard.market_price) {
                                externalPrice = extCard.market_price;
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
                    };
                })
            );

            return {
                ...dbData,
                content: enrichedCards,
            };
        },
        staleTime: 1000 * 60 * 5, // 5 minutes cache
        placeholderData: keepPreviousData,
    });
}
