import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { currency, sampleProducts } from "../fakeapi.jsx";

export default function ProductPage({ onAdd }) {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [added, setAdded] = useState(false);

    useEffect(() => {
        setLoading(true);
        const found = sampleProducts.find(p => String(p.id) === String(id));
        if (found) {
            setProduct(found);
            setLoading(false);
        } else {
            setError("Product not found");
            setLoading(false);
        }
    }, [id]);

    if (loading) return <main className="max-w-6xl mx-auto px-4 py-12">Loading product...</main>
    if (error) return <main className="max-w-6xl mx-auto px-4 py-12 text-red-500">{error}</main>

    const handleAdd = () => {
        onAdd(product);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000); // 2 sekunddan keyin yo‘qoladi
    };

    return (
        <main className="max-w-6xl mx-auto px-4 py-12 text-gray-900 dark:text-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-96 object-cover rounded border border-gray-200 dark:border-gray-700"
                    />
                </div>
                <div>
                    <h1 className="text-2xl font-bold">{product.title}</h1>
                    <div className="mt-3 text-2xl font-bold">{currency(product.price)}</div>
                    <p className="mt-4 text-gray-700 dark:text-gray-300">{product.description}</p>
                    <div className="mt-6 relative">
                        <button
                            onClick={handleAdd}
                            className="px-5 py-3 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
                        >
                            Add to cart
                        </button>

                        {added && (
                            <div className="absolute top-[-40px] left-0 bg-green-600 text-white text-sm px-3 py-1 rounded shadow">
                                ✅ Savatchaga qo‘shildi
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    )
}
