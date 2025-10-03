import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import ReactQueryProvider from "./providers/ReactQueryProvider.tsx";

async function enableMocking() {
  if (typeof window === "undefined" || !import.meta.env.DEV) {
    return;
  }

  try {
    const { worker } = await import("./mocks/browser");

    await worker.start({
      onUnhandledRequest: "bypass",
    });

    console.log("[msw] Mock Service Worker started");
  } catch (err) {
    console.log("[msw] Failed to start Mock Service Worker:", err);
  }
}

enableMocking().finally(() => {
  createRoot(document.getElementById("root")!).render(
    // <StrictMode>
      <HelmetProvider>
        <BrowserRouter>
          <ReactQueryProvider>
            <App />
          </ReactQueryProvider>
        </BrowserRouter>
      </HelmetProvider>
    // </StrictMode>
  );
});
