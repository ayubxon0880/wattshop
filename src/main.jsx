import React from "react";
import ReactDOM from "react-dom/client";
import {App} from "./App.jsx";
import "./index.css";
import './i18n'

const tg = window.Telegram?.WebApp;
if (tg) {
    const theme = tg.themeParams;

    document.body.style.backgroundColor = theme.bg_color || "#ffffff";
    document.body.style.color = theme.text_color || "#000000";
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <React.Suspense>
      <App />
    </React.Suspense>{" "}
  </React.StrictMode>
);
