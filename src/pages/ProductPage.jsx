import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { currency, fakeFetchProductById } from "../fakeapi.jsx";

export default function ProductPage({ onAdd }) {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        fakeFetchProductById(id)
            .then(p => { setProduct(p); setLoading(false) })
            .catch(err => { setError(err.message); setLoading(false) })
    }, [id]);

    if (loading) return <main className="max-w-6xl mx-auto px-4 py-12 text-gray-800 dark:text-gray-200">Loading product...</main>
    if (error) return <main className="max-w-6xl mx-auto px-4 py-12 text-red-500 dark:text-red-400">{error}</main>

    return (
        <main className="max-w-6xl mx-auto px-4 py-12 text-gray-900 dark:text-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Image */}
                <div>
                    <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-96 object-cover rounded border border-gray-200 dark:border-gray-700"
                    />
                </div>

                {/* Details */}
                <div>
                    <h1 className="text-2xl font-bold">{product.title}</h1>
                    <div className="mt-3 text-2xl font-bold">{currency(product.price)}</div>
                    <p className="mt-4 text-gray-700 dark:text-gray-300">{product.description}</p>
                    <div className="mt-6">
                        <button
                            onClick={() => onAdd(product)}
                            className="px-5 py-3 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
                        >
                            Add to cart
                        </button>
                    </div>
                </div>
            </div>
        </main>
    )
}
