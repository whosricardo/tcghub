export type Product = {
    id: string;
    edition: string;
    title: string;
    price: number;
    rarity: string;
    isHot?: boolean;
    image: string;
    isFavorite: boolean;
    colors?: string[];
    cardType?: string;
    description?: string;
    cardNumber?: string;
    artist?: string;
    cost?: number | string;
    power?: number | string;
    combatAttribute?: string;
    subtypes?: string[];
    life?: string;
    counter?: string | number;
};

export const MOCK_PRODUCTS: Product[] = [
    {
        id: "1",
        edition: "AETHER SET #02",
        title: "Spectral Dragon",
        price: 299.00,
        rarity: "MYTHIC",
        isHot: true,
        image: "https://images.unsplash.com/photo-1618331835717-801e976710b2?w=500&q=80",
        isFavorite: false,
    },
    {
        id: "2",
        edition: "CHRONO SET",
        title: "Time Warden",
        price: 45.50,
        rarity: "ULTRA RARE",
        image: "https://images.unsplash.com/photo-1620207418302-439b387441b0?w=500&q=80",
        isFavorite: true,
    },
    {
        id: "3",
        edition: "THE VOID",
        title: "Nebula Weaver",
        price: 12.99,
        rarity: "RARE",
        isHot: true,
        image: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=500&q=80",
        isFavorite: false,
    },
    {
        id: "4",
        edition: "BASE SET",
        title: "Stone Guardian",
        price: 0.25,
        rarity: "COMMON",
        image: "https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?w=500&q=80",
        isFavorite: false,
    },
    {
        id: "5",
        edition: "AETHER SET #03",
        title: "Prism Shifter",
        price: 142.00,
        rarity: "MYTHIC",
        image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=500&q=80",
        isFavorite: false,
    },
    {
        id: "6",
        edition: "FORBIDDEN CRYPT",
        title: "Lich Lord",
        price: 89.99,
        rarity: "SECRET RARE",
        isHot: true,
        image: "https://images.unsplash.com/photo-1604871000636-074fa5117945?w=500&q=80",
        isFavorite: false,
    },
    {
        id: "7",
        edition: "ANCIENT WOODS",
        title: "Elder Ent",
        price: 22.00,
        rarity: "SUPER RARE",
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&q=80",
        isFavorite: false,
    },
    {
        id: "8",
        edition: "ZENITH SET",
        title: "Celestial Flare",
        price: 512.00,
        rarity: "MYTHIC",
        image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500&q=80",
        isFavorite: false,
    }
];
