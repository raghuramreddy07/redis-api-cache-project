import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 2600,
        style: {
          borderRadius: "12px",
          boxShadow: "0 16px 40px rgba(15, 23, 42, 0.14)",
        },
      }}
    />
  </React.StrictMode>
);
