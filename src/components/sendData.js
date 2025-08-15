
export default async function handler(req, res) {
    let user = null;
    if (window.Telegram?.WebApp) {
        const tg = window.Telegram.WebApp;
        tg.ready();
        user = tg.initDataUnsafe?.user || null;
    }

    if (req.method !== "POST") {
        return res.status(405).json({error: "Method not allowed"});
    }

    const {cart} = req.body;

    if (!cart || cart.length === 0) {
        return res.status(400).json({error: "Cart is empty"});
    }

    const BOT_TOKEN = "7229292975:AAFqUv-MeAOdH12F0susyhZJ7t4ioOXTK7c";
    const CHAT_ID = user.id; // admin / guruh chat ID

    let text = "🛒 Yangi buyurtma:\n\n";

    cart.forEach(item => {
        text += `🔹 <a href="https://wattshop.vercel.app/product/${item.id}">${item.title}</a>\n`;
        text += `💰 Narxi: ${item.price} x ${item.qty} = ${item.price * item.qty}\n\n`;
    });

    const total = cart.reduce((s, c) => s + c.price * c.qty, 0);
    text += `\n<b>Jami:</b> ${total} so'm`;

    try {
        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text,
                parse_mode: "HTML"
            })
        });

        res.status(200).json({ok: true});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}
