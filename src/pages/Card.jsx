import { useNavigate } from "react-router-dom";
import { currency } from "../fakeapi.jsx";

export default function Cart({ cart, onRemove, onUpdateQty }) {
    const navigate = useNavigate();
    const total = cart.reduce((s, c) => s + c.price * c.qty, 0);

    const handleCheckout = async () => {
        const tg = window.Telegram?.WebApp;
        const user = tg?.initDataUnsafe?.user;

        if (!user) {
            alert("Telegram user ma’lumotlari topilmadi!");
            return;
        }

        // Checkout xabari tayyorlaymiz
        let message = `🛒 <b>Yangi buyurtma!</b>\n\n`;
        cart.forEach(item => {
            message += `📌 <a href="https://wattshop.vercel.app/product/${item.id}">${item.title}</a>\n`;
            message += `💵 Narxi: ${currency(item.price)}\n`;
            message += `📦 Soni: ${item.qty}\n\n`;
        });
        message += `💰 <b>Jami:</b> ${currency(total)}\n`;
        message += `👤 ${user.first_name} (${user.id})`;

        // Bot orqali foydalanuvchiga yuborish + inline button
        await fetch(`https://api.telegram.org/bot7229292975:AAFqUv-MeAOdH12F0susyhZJ7t4ioOXTK7c/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: user.id, // foydalanuvchiga yuborish
                text: message,
                parse_mode: "HTML",
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: "✅ Tasdiqlash",
                                callback_data: "confirm_order"
                            },
                            {
                                text: "❌ Bekor qilish",
                                callback_data: "cancel_order"
                            }
                        ],
                        [
                            {
                                text: "📦 Buyurtmalarim",
                                url: "https://wattshop.vercel.app/orders"
                            }
                        ]
                    ]
                }
            }),
        });

        alert("✅ Buyurtma yuborildi!");
    };

    return (
        <main className="max-w-6xl mx-auto px-4 py-12">
            <h1 className="text-2xl font-bold">Shopping Cart</h1>
            {cart.length === 0 ? (
                <div className="mt-6 text-gray-600">
                    Your cart is empty.
                    <button
                        onClick={() => navigate("/shop")}
                        className="text-indigo-600 underline ml-2"
                    >
                        Go to shop
                    </button>
                </div>
            ) : (
                <div className="mt-6 border rounded overflow-hidden">
                    <div className="p-4 space-y-4">
                        {cart.map(item => (
                            <div key={item.id} className="flex items-center gap-4">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-20 h-20 object-cover rounded"
                                />
                                <div className="flex-1">
                                    <div className="font-semibold">{item.title}</div>
                                    <div className="text-sm text-gray-600">
                                        {currency(item.price)}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => onUpdateQty(item.id, item.qty - 1)}
                                        className="px-2 py-1 border rounded"
                                    >
                                        -
                                    </button>
                                    <div className="px-3">{item.qty}</div>
                                    <button
                                        onClick={() => onUpdateQty(item.id, item.qty + 1)}
                                        className="px-2 py-1 border rounded"
                                    >
                                        +
                                    </button>
                                </div>
                                <div className="w-24 text-right">
                                    {currency(item.price * item.qty)}
                                </div>
                                <button
                                    onClick={() => onRemove(item.id)}
                                    className="ml-4 text-red-500"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="p-4 border-t flex items-center justify-between">
                        <div className="font-bold text-lg">
                            Total: {currency(total)}
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={handleCheckout}
                                className="px-4 py-2 bg-green-600 text-white rounded"
                            >
                                Checkout
                            </button>
                            <button
                                onClick={() => {
                                    if (confirm("Clear cart?")) {
                                        cart.slice().forEach(i => onRemove(i.id));
                                    }
                                }}
                                className="px-4 py-2 border rounded"
                            >
                                Clear
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
