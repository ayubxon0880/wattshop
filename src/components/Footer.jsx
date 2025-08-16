export default function Footer() {
    return (
        <footer className="bg-gray-50 dark:bg-gray-900 border-t mt-12 transition-colors">
            <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row justify-between gap-6">
                <div>
                    <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100">WattShop</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Quality goods for everyday life.
                    </p>
                </div>

                <div className="flex gap-6">
                    <div>
                        <h4 className="font-semibold text-gray-800 dark:text-gray-100">Products</h4>
                        <ul className="text-sm text-gray-600 dark:text-gray-400">
                            <li>Apparel</li>
                            <li>Shoes</li>
                            <li>Accessories</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-gray-800 dark:text-gray-100">Company</h4>
                        <ul className="text-sm text-gray-600 dark:text-gray-400">
                            <li>About</li>
                            <li>Careers</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="text-center text-xs text-gray-500 dark:text-gray-400 pb-4">
                © {new Date().getFullYear()} WattShop. All rights reserved.
            </div>
        </footer>
    );
}
