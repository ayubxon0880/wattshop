import { useEffect, useState } from "react";
import { fakeFetchProducts } from "../fakeapi.jsx";
import ProductCard from "./ProductCard.jsx";

export default function Shop({ onAdd }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState("");
    const [category, setCategory] = useState("all");

    useEffect(() => {
        setLoading(true);
        fakeFetchProducts().then(res => { setProducts(res); setLoading(false); });
    }, []);

    const filtered = products.filter(
        p =>
            (category === "all" || p.category === category) &&
            p.title.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <main className="max-w-6xl mx-auto px-4 py-12 text-gray-900 dark:text-gray-100">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <h1 className="text-2xl font-bold">Shop</h1>
                <div className="flex gap-3">
                    {/* Search */}
                    <input
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        placeholder="Search..."
                        className="border rounded px-3 py-2 bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                    />

                    {/* Category filter */}
                    <select
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                        className="border rounded px-3 py-2 bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                    >
                        <option value="all">All</option>
                        <option value="apparel">Apparel</option>
                        <option value="shoes">Shoes</option>
                        <option value="accessories">Accessories</option>
                        <option value="bags">Bags</option>
                    </select>
                </div>
            </div>

            {/* Products */}
            {loading ? (
                <div className="mt-8 text-gray-600 dark:text-gray-400">Loading products...</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                    {filtered.map(p => (
                        <ProductCard key={p.id} product={p} onAdd={onAdd} />
                    ))}
                    {filtered.length === 0 && (
                        <div className="col-span-full text-gray-600 dark:text-gray-400">
                            No products found.
                        </div>
                    )}
                </div>
            )}
        </main>
    );
}
