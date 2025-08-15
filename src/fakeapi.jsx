export const sampleProducts = [
    { id: '1', title: 'Comfort Hoodie', price: 39.99, image: 'https://splash.uz/frontend/images/png/product2.png', category: 'apparel', description: 'Soft, cozy hoodie for everyday wear.' },
    { id: '2', title: 'Running Sneakers', price: 89.95, image: 'https://splash.uz/frontend/images/png/product2.png', category: 'shoes', description: 'Lightweight sneakers built for speed.' },
    { id: '3', title: 'Classic Watch', price: 129.00, image: 'https://splash.uz/frontend/images/png/product2.png', category: 'accessories', description: 'Minimalist watch with leather strap.' },
    { id: '4', title: 'Baseball Cap', price: 19.5, image: 'https://splash.uz/frontend/images/png/product2.png', category: 'accessories', description: 'Adjustable cap for sunny days.' },
    { id: '5', title: 'Denim Jacket', price: 74.99, image: 'https://splash.uz/frontend/images/png/product2.png', category: 'apparel', description: 'Durable denim jacket with modern cut.' },
    { id: '6', title: 'Backpack Pro', price: 59.0, image: 'https://splash.uz/frontend/images/png/product2.png', category: 'bags', description: 'Weather-resistant backpack with padded laptop sleeve.' }
]

export function fakeFetchProducts(delay = 500) {
    return new Promise((resolve) => setTimeout(() => resolve([...sampleProducts]), delay))
}

export function fakeFetchProductById(id, delay = 400) {
    return new Promise((resolve, reject) => setTimeout(() => {
        const p = sampleProducts.find(s => s.id === id)
        if (p) resolve({ ...p })
        else reject(new Error('Product not found'))
    }, delay))
}

/* ----------------- Utilities ----------------- */
export function currency(n) { return '$' + Number(n).toFixed(2) }