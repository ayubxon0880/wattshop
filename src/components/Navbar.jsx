import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ShoppingCart, Sun, Moon } from "lucide-react";

export default function Navbar({ cartCount }) {
    const [isOpen, setIsOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(
        localStorage.getItem("theme") === "dark"
    );

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    return (
        <header className="bg-white dark:bg-gray-900 border-b shadow-sm sticky top-0 z-50 transition-colors">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

                {/* Logo */}
                <Link to="/" className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-pink-500 rounded flex items-center justify-center text-white font-bold">
                        E
                    </div>
                    <span className="font-semibold text-lg text-gray-800 dark:text-gray-100">
                        ElmStore
                    </span>
                </Link>

                {/* Desktop Menu */}
                <nav className="hidden md:flex items-center gap-6">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/shop">Shop</NavLink>
                    <NavLink to="/about">About</NavLink>
                    <CartButton cartCount={cartCount} />

                    {/* Dark Mode Toggle */}
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                        {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                    </button>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
            </div>

            {/* Mobile Dropdown */}
            {isOpen && (
                <div className="md:hidden bg-white dark:bg-gray-900 border-t animate-slideDown">
                    <div className="flex flex-col p-4 gap-4">
                        <NavLink to="/" onClick={() => setIsOpen(false)}>Home</NavLink>
                        <NavLink to="/shop" onClick={() => setIsOpen(false)}>Shop</NavLink>
                        <NavLink to="/about" onClick={() => setIsOpen(false)}>About</NavLink>
                        <CartButton cartCount={cartCount} onClick={() => setIsOpen(false)} />

                        {/* Mobile Dark Mode Toggle */}
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center gap-2"
                        >
                            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                            <span>{darkMode ? "Light" : "Dark"} Mode</span>
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
}

function NavLink({ to, children, onClick }) {
    return (
        <Link
            to={to}
            onClick={onClick}
            className="text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
        >
            {children}
        </Link>
    );
}

function CartButton({ cartCount, onClick }) {
    return (
        <Link
            to="/cart"
            onClick={onClick}
            className="relative inline-flex items-center gap-2 border px-3 py-1.5 rounded hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
            <ShoppingCart size={18} />
            <span className="text-gray-700 dark:text-gray-200">Cart</span>
            {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center shadow">
                    {cartCount}
                </span>
            )}
        </Link>
    );
}
