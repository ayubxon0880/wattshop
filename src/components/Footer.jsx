export default function Footer() {
    return (
        <footer className="bg-gray-50 border-t mt-12">
            <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row justify-between gap-6">
                <div>
                    <h3 className="font-bold text-lg">ElmStore</h3>
                    <p className="text-sm text-gray-600">Quality goods for everyday life.</p>
                </div>
                <div className="flex gap-6">
                    <div>
                        <h4 className="font-semibold">Products</h4>
                        <ul className="text-sm text-gray-600">
                            <li>Apparel</li>
                            <li>Shoes</li>
                            <li>Accessories</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold">Company</h4>
                        <ul className="text-sm text-gray-600">
                            <li>About</li>
                            <li>Careers</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="text-center text-xs text-gray-500 pb-4">© {new Date().getFullYear()} ElmStore. All rights reserved.</div>
        </footer>
    )
}