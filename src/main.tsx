import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import ToastProvider from "./providers/ToastProvider.tsx";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <HelmetProvider>
    <BrowserRouter>
      <ToastProvider>
        <App />
      </ToastProvider>
    </BrowserRouter>
  </HelmetProvider>
  // </StrictMode>
);
