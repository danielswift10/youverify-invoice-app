// src/main.tsx (or src/index.tsx)
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import ReactQueryProvider from "./providers/ReactQueryProvider.tsx";

async function enableMocking() {
  // Only attempt to enable mocking in the browser during development
  if (typeof window === "undefined" || !import.meta.env.DEV) {
    return;
  }

  try {
    const { worker } = await import("./mocks/browser");

    // Start the worker and wait for it to be ready
    await worker.start({
      onUnhandledRequest: "bypass",
      // If you initialised MSW with `npx msw init public/` and serve the file from /mockServiceWorker.js
      // you can pass the serviceWorker.url option here. Uncomment if you want to be explicit:
      // serviceWorker: { url: '/mockServiceWorker.js' },
    });

    console.log("[msw] Mock Service Worker started");
  } catch (err) {
    // If the worker fails to start, don't break the app — log and continue
    // (common during test runners or non-standard build pipelines)
    // eslint-disable-next-line no-console
    console.warn("[msw] Failed to start Mock Service Worker:", err);
  }
}

enableMocking().finally(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <HelmetProvider>
        <BrowserRouter>
          <ReactQueryProvider>
            <App />
          </ReactQueryProvider>
        </BrowserRouter>
      </HelmetProvider>
    </StrictMode>
  );
});
