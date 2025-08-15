import { useEffect, useState } from "react";

export default function useTelegramTheme() {
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        if (window.Telegram?.WebApp) {
            const tg = window.Telegram.WebApp;

            // Telegramdan dastlabki color scheme olish
            const initialTheme = tg.colorScheme === "dark" ? "dark" : "light";
            setTheme(initialTheme);

            // Telegram ichida theme o‘zgarsa — yangilash
            tg.onEvent("themeChanged", () => {
                setTheme(tg.colorScheme === "dark" ? "dark" : "light");
            });
        }
    }, []);

    return theme;
}
