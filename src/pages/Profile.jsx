import {useEffect, useState} from "react";

export default function Profile() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (window.Telegram && window.Telegram.WebApp) {
            const tg = window.Telegram.WebApp;
            tg.ready(); // WebApp tayyor
            setUser(tg.initDataUnsafe.user); // User ma’lumotini olish
        }
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Telegram WebApp User Data</h1>

            {user ? (
                <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                    <p><strong>ID:</strong> {user.id}</p>
                    <p><strong>Ism:</strong> {user.first_name}</p>
                    <p><strong>Familiya:</strong> {user.last_name}</p>
                    <p><strong>Username:</strong> @{user.username}</p>
                    <p><strong>Language:</strong> {user.language_code}</p>
                </div>
            ) : (
                <p className="mt-4">User ma’lumotlari yo‘q</p>
            )}
        </div>
    );
}
