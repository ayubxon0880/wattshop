// fakeapi.jsx
export const sampleCatalogs = [
    { id: "lamp", title: "Lampochkalar", image: "https://cdn.britannica.com/88/212888-050-6795342C/study-lamp-electrical-cord.jpg" },
    { id: "socket", title: "Rozetkalar", image: "https://cdn.britannica.com/88/212888-050-6795342C/study-lamp-electrical-cord.jpg" },
    { id: "cable", title: "Kabellar", image: "https://cdn.britannica.com/88/212888-050-6795342C/study-lamp-electrical-cord.jpg" }
];

export const sampleProducts = [
    { id: 1, title: "LED Lampochka 12W", price: 25000, category: "lamp", image: "https://cdn.britannica.com/88/212888-050-6795342C/study-lamp-electrical-cord.jpg", description: "Energiya tejamkor LED lampochka." },
    { id: 2, title: "E27 Lampochka", price: 15000, category: "lamp", image: "https://cdn.britannica.com/88/212888-050-6795342C/study-lamp-electrical-cord.jpg", description: "Oddiy E27 patronli lampochka." },
    { id: 3, title: "Ikki joyli rozetka", price: 18000, category: "socket", image: "https://cdn.britannica.com/88/212888-050-6795342C/study-lamp-electrical-cord.jpg", description: "Ikki joyli zamonaviy rozetka." },
    { id: 4, title: "Ethernet kabel 1m", price: 12000, category: "cable", image: "https://cdn.britannica.com/88/212888-050-6795342C/study-lamp-electrical-cord.jpg", description: "Internet uchun yuqori sifatli kabel." },
];

export function fakeFetchCatalogs() {
    return new Promise((resolve) => {
        setTimeout(() => resolve(sampleCatalogs), 400);
    });
}

export function fakeFetchProductsByCategory(categoryId) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(sampleProducts.filter(p => p.category === categoryId)), 400);
    });
}

export async function fakeFetchProductById(id) {
    const product = sampleProducts.find(p => String(p.id) === String(id));
    if (!product) {
        throw new Error("Product not found");
    }
    return product;
}

/* ----------------- Utilities ----------------- */
export function currency(n) { return '$' + Number(n).toFixed(2) }