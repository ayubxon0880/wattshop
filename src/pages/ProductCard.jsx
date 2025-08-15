import { useState } from "react";
import { Link } from "react-router-dom";
import { currency } from "../fakeapi.jsx";

export default function ProductCard({ product, onAdd }) {
    const [added, setAdded] = useState(false);

    const handleAdd = () => {
        onAdd(product);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000); // 2 sekundda yo‘qoladi
    };

    return (
        <article className="border rounded overflow-hidden group hover:shadow-lg transition-shadow bg-white dark:bg-gray-800 dark:border-gray-700 relative">
            <Link to={`/product/${product.id}`}>
                <img src={product.image} alt={product.title} className="w-full h-48 object-cover" />
            </Link>
            <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
                    <Link to={`/product/${product.id}`}>{product.title}</Link>
                </h3>
                <div className="mt-2 font-bold text-gray-900 dark:text-gray-200">
                    {currency(product.price)}
                </div>
                <div className="mt-4 flex items-center justify-between">
                    <button
                        onClick={handleAdd}
                        className="px-3 py-2 rounded bg-indigo-600 text-white text-sm hover:bg-indigo-700"
                    >
                        Add to cart
                    </button>
                    <Link
                        to={`/product/${product.id}`}
                        className="text-sm text-indigo-600 hover:underline dark:text-indigo-400"
                    >
                        Details
                    </Link>
                </div>
            </div>

            {added && (
                <div className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded shadow">
                    ✅ Added!
                </div>
            )}
        </article>
    );
}
