import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Shop from "./pages/Shop.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import Cart from "./pages/Card.jsx";
import About from "./pages/About.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";


export default function App() {
    const [cart, setCart] = useState(() => {
        try { return JSON.parse(localStorage.getItem('cart') || '[]') } catch { return [] }
    })

    useEffect(() => { localStorage.setItem('cart', JSON.stringify(cart)) }, [cart])

    function addToCart(product) {
        setCart(prev => {
            const found = prev.find(p => p.id === product.id)
            if (found) return prev.map(p => p.id === product.id ? { ...p, qty: p.qty + 1 } : p)
            return [...prev, { ...product, qty: 1 }]
        })
    }

    function removeFromCart(id) { setCart(prev => prev.filter(p => p.id !== id)) }
    function updateQty(id, qty) { setCart(prev => prev.map(p => p.id === id ? { ...p, qty: Math.max(1, qty) } : p)) }

    return (
        <BrowserRouter>
            <div className="min-h-screen flex flex-col">
                <Navbar cartCount={cart.reduce((s,c) => s + c.qty, 0)} />

                <div className="flex-1">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/shop" element={<Shop onAdd={addToCart} />} />
                        <Route path="/product/:id" element={<ProductPage onAdd={addToCart} />} />
                        <Route path="/cart" element={<Cart cart={cart} onRemove={removeFromCart} onUpdateQty={updateQty} />} />
                        <Route path="/about" element={<About />} />
                        <Route path="*" element={<main className="max-w-6xl mx-auto px-4 py-12">Page not found</main>} />
                    </Routes>
                </div>

                <Footer />
            </div>
        </BrowserRouter>
    )
}