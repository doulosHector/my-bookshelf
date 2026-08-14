import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// Repository name, so the assets resolve under https://<user>.github.io/<repo>/.
// Override with BASE_PATH=/ when deploying to a custom domain or another host.
const base = process.env.BASE_PATH ?? "/my-bookshelf/";

// https://vite.dev/config/
export default defineConfig({
  base,
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",
      includeAssets: ["favicon.svg", "apple-touch-icon.png"],
      manifest: {
        name: "Mi Libero Personal",
        short_name: "Mi Libero",
        description:
          "Registra los libros que lees, califícalos y revisa tus estadísticas de lectura.",
        lang: "es",
        start_url: "./",
        scope: "./",
        display: "standalone",
        orientation: "portrait",
        background_color: "#E6E7E3",
        theme_color: "#E6E7E3",
        icons: [
          { src: "pwa-192x192.png", sizes: "192x192", type: "image/png" },
          { src: "pwa-512x512.png", sizes: "512x512", type: "image/png" },
          {
            src: "maskable-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,webmanifest}"],
        // Any unknown route falls back to the app shell, so deep links work offline.
        navigateFallback: `${base}index.html`,
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts",
              expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            // The Open Library lookup is optional: serve the last answer when offline.
            urlPattern: /^https:\/\/openlibrary\.org\/search\.json.*/i,
            handler: "NetworkFirst",
            options: {
              cacheName: "open-library",
              networkTimeoutSeconds: 5,
              expiration: { maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 * 7 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
      devOptions: { enabled: false },
    }),
  ],
});
