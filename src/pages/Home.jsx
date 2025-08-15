import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fakeFetchCatalogs } from "../fakeapi.jsx";

export default function Home() {
    const [catalogs, setCatalogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fakeFetchCatalogs().then((data) => {
            setCatalogs(data);
            setLoading(false);
        });
    }, []);

    return (
        <main className="max-w-6xl mx-auto px-4 py-12">
            {/* Hero Section */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                    <h1 className="text-4xl font-bold leading-tight text-gray-900 dark:text-gray-100">
                        Elektron buyumlar katalogi
                    </h1>
                    <p className="mt-4 text-gray-700 dark:text-gray-300">
                        Bizning katalogdan kerakli bo‘limni tanlang va mahsulotlarni ko‘ring.
                    </p>
                </div>
                <div>
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/f/f5/Electronic_circuit.jpg"
                        alt="hero"
                        className="w-full rounded shadow"
                    />
                </div>
            </section>

            {/* Catalog Section */}
            <section className="mt-12">
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                    Kataloglar
                </h2>

                {loading ? (
                    <p className="text-gray-500">Yuklanmoqda...</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {catalogs.map((cat) => (
                            <Link
                                to={`/shop?category=${cat.id}`}
                                key={cat.id}
                                className="border rounded p-4 bg-white dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg transition"
                            >
                                <img
                                    src={cat.image}
                                    alt={cat.title}
                                    className="w-full h-40 object-cover rounded"
                                />
                                <h3 className="mt-3 font-semibold text-gray-800 dark:text-gray-100 text-center">
                                    {cat.title}
                                </h3>
                            </Link>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}
