// src/pages/Shop.jsx
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import * as api from "../fakeapi.jsx"; // import hamma narsani, so'ngu funksiyalarni tekshirish uchun
import ProductCard from "./ProductCard.jsx";

export default function Shop({ onAdd }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState("");

    const [searchParams, setSearchParams] = useSearchParams();

    // yuklash: API funksiyalari mavjudligiga qarab ishlaydi
    useEffect(() => {
        let mounted = true;
        const categoryId = searchParams.get("category") || "all";

        setLoading(true);

        async function load() {
            try {
                let res = [];

                // 1) agar API category bo'yicha fetch taqdim etsa — foydalanamiz
                if (categoryId !== "all" && typeof api.fakeFetchProductsByCategory === "function") {
                    res = await api.fakeFetchProductsByCategory(categoryId);
                }
                // 2) aks holda, umumiy productlarni olish funksiyasi bo'lsa — uni olamiz va client-side filtr qilamiz
                else if (typeof api.fakeFetchProducts === "function") {
                    res = await api.fakeFetchProducts();
                    if (categoryId !== "all") res = res.filter(p => p.category === categoryId);
                }
                // 3) fallback — agar sampleProducts eksport qilingan bo'lsa
                else if (Array.isArray(api.sampleProducts)) {
                    res = api.sampleProducts.slice();
                    if (categoryId !== "all") res = res.filter(p => p.category === categoryId);
                } else {
                    // hech narsa topilmadi
                    res = [];
                }

                if (mounted) {
                    setProducts(res);
                    setLoading(false);
                }
            } catch (err) {
                console.error("Shop load error:", err);
                if (mounted) {
                    setProducts([]);
                    setLoading(false);
                }
            }
        }

        load();

        return () => { mounted = false; };
    }, [searchParams]);

    // dinamik kategoriyalar (products dan olinadi)
    const categories = ["all", ...Array.from(new Set(products.map(p => p.category).filter(Boolean)))];

    // local search
    const filtered = products.filter(p => p.title.toLowerCase().includes(query.toLowerCase()));

    // category selectni o'zgartirganda URLni yangilash
    function onCategoryChange(e) {
        const val = e.target.value;
        if (val === "all") setSearchParams({});
        else setSearchParams({ category: val });
    }

    return (
        <main className="max-w-6xl mx-auto px-4 py-12 text-gray-900 dark:text-gray-100">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <h1 className="text-2xl font-bold">Shop</h1>

                <div className="flex gap-3">
                    <input
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        placeholder="Search..."
                        className="border rounded px-3 py-2 bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                    />

                    <select
                        value={searchParams.get("category") || "all"}
                        onChange={onCategoryChange}
                        className="border rounded px-3 py-2 bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                    >
                        {categories.map(cat => (
                            <option key={cat} value={cat}>
                                {cat === "all" ? "All" : (cat.charAt(0).toUpperCase() + cat.slice(1))}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

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
