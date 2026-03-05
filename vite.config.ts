import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const GATEWAY = "http://127.0.0.1:8080";

// API-Pfade die zum NGINX-Gateway proxied werden
const API_PATHS = ["/auth", "/profile", "/profiles", "/readings", "/billing", "/health", "/healthz", "/readyz"];

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: "0.0.0.0",
    proxy: Object.fromEntries(
      API_PATHS.map((path) => [
        path,
        { target: GATEWAY, changeOrigin: true, secure: false },
      ])
    ),
  },
});
