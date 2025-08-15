import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ShoppingCart } from "lucide-react"; // Optional icons (npm i lucide-react)

export default function Navbar({ cartCount }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="bg-white border-b shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

                {/* Logo */}
                <Link to="/" className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-pink-500 rounded flex items-center justify-center text-white font-bold">
                        E
                    </div>
                    <span className="font-semibold text-lg">ElmStore</span>
                </Link>

                {/* Desktop Menu */}
                <nav className="hidden md:flex items-center gap-6">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/shop">Shop</NavLink>
                    <NavLink to="/about">About</NavLink>

                    <CartButton cartCount={cartCount} />
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 rounded hover:bg-gray-100"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
            </div>

            {/* Mobile Dropdown */}
            {isOpen && (
                <div className="md:hidden bg-white border-t animate-slideDown">
                    <div className="flex flex-col p-4 gap-4">
                        <NavLink to="/" onClick={() => setIsOpen(false)}>Home</NavLink>
                        <NavLink to="/shop" onClick={() => setIsOpen(false)}>Shop</NavLink>
                        <NavLink to="/about" onClick={() => setIsOpen(false)}>About</NavLink>
                        <CartButton cartCount={cartCount} onClick={() => setIsOpen(false)} />
                    </div>
                </div>
            )}
        </header>
    );
}

/* Reusable NavLink Component */
function NavLink({ to, children, onClick }) {
    return (
        <Link
            to={to}
            onClick={onClick}
            className="text-gray-700 hover:text-indigo-600 transition-colors"
        >
            {children}
        </Link>
    );
}

/* Reusable Cart Button */
function CartButton({ cartCount, onClick }) {
    return (
        <Link
            to="/cart"
            onClick={onClick}
            className="relative inline-flex items-center gap-2 border px-3 py-1.5 rounded hover:bg-gray-50 transition"
        >
            <ShoppingCart size={18} />
            <span>Cart</span>
            {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center shadow">
          {cartCount}
        </span>
            )}
        </Link>
    );
}
