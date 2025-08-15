import { Link } from "react-router-dom";
import { currency, sampleProducts } from "../fakeapi.jsx";

export default function Home() {
    return (
        <main className="max-w-6xl mx-auto px-4 py-12">
            {/* Hero Section */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                    <h1 className="text-4xl font-bold leading-tight text-gray-900 dark:text-gray-100">
                        Your favorite products, shipped fast
                    </h1>
                    <p className="mt-4 text-gray-700 dark:text-gray-300">
                        A small demo store built with React + Vite + Tailwind. Use the shop to browse
                        products and a product page to see details.
                    </p>
                    <div className="mt-6">
                        <Link
                            to="/shop"
                            className="inline-block px-6 py-3 rounded bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
                        >
                            Shop now
                        </Link>
                    </div>
                </div>
                <div>
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/f/f5/Electronic_circuit.jpg"
                        alt="hero"
                        className="w-full rounded shadow"
                    />
                </div>
            </section>

            {/* Featured Section */}
            <section className="mt-12">
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                    Featured
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sampleProducts.slice(0, 3).map((p) => (
                        <article
                            key={p.id}
                            className="border rounded p-4 bg-white dark:bg-gray-800 dark:border-gray-700 transition-colors"
                        >
                            <img
                                src={p.image}
                                alt={p.title}
                                className="w-full h-40 object-cover rounded"
                            />
                            <h3 className="mt-3 font-semibold text-gray-800 dark:text-gray-100">
                                {p.title}
                            </h3>
                            <div className="mt-2 font-bold text-gray-900 dark:text-gray-200">
                                {currency(p.price)}
                            </div>
                            <div className="mt-3">
                                <Link
                                    to={`/product/${p.id}`}
                                    className="text-indigo-600 dark:text-indigo-400 hover:underline"
                                >
                                    View product
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </section>
        </main>
    );
}
