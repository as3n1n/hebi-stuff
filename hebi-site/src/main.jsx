import React from "react";
import ReactDOM from "react-dom/client";
import App from "./styles/App.jsx";   // <-- chemin corrigé
import "./styles/globals.css";       // <-- ton css global

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
