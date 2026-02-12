# web-portal

Statisches SaaS-Web-Portal (Vite + React), das ausschliesslich hinter dem NGINX-Gateway ausgeliefert wird.

## Boundary
- Frontend-only SPA, keine Backend- oder DB-Logik.
- API-Aufrufe nur relativ (`/auth/*`, `/profiles/*`, ...).
- Keine Secrets im Bundle.
- Security Header, TLS, CORS, Error-Envelope und AuthZ werden am Gateway erzwungen.

## Aktueller Stand (2026-02-12)
- Multi-stage Build aktiv (`node:22-alpine` -> `nginx:alpine`).
- SPA-Fallback + Caching in `nginx/default.conf`:
  - `index.html`: `Cache-Control: no-store`
  - hashed assets: `public, max-age=31536000, immutable`
- Auth/Profile-Flows sind als typed Seiten/Hooks/API implementiert.
- Keine 0-Byte Platzhalterdateien in `src/`.
- Runtime-Config Contract vorhanden (`public/config.json`, Loader in `src/shared/lib/runtimeConfig.ts`).
- Globale ErrorBoundary aktiv (`src/app/ErrorBoundary.tsx`) mit Support-Info Copy.
- HTTP-Client verarbeitet Gateway-Error-Envelope inkl. `request_id` und zeigt Support-Code im UI.
- Phase-0/1 Routing aktiv:
  - Public: `/`, `/login`, `/register`, `/verify`, `/forgot`, `/reset`
  - Private: `/app`, `/app/onboarding`, `/app/profile`, `/app/settings`
  - Legacy-Redirects auf alte Pfade bleiben aktiv.

## Security Contract (Portal <-> Gateway)
- Portal setzt keine trusted Identity-Header (`X-User-Id`, Rollen etc.).
- Optional kann `X-Tenant-Id` aus `localStorage.tenant_id` gesetzt werden (nur UUID).
- `X-Request-Id` wird vom Gateway erzeugt/weitergereicht und im Fehlerfall als Support-Code angezeigt.
- Refresh-Token werden nicht im Client gespeichert (`tokenManager` speichert nur Access Token).
- Optionales CSRF-Headering (`X-CSRF-Token`) fuer write methods ist vorbereitet.

## Token + CSRF Policy
- MVP (aktueller Stand):
  - Auth im Browser via Bearer Access Token.
  - Access Token liegt nur in Memory (`tokenManager`), kein Persist ueber Page Reload.
  - Refresh Token wird im Portal nicht gespeichert und nicht gelesen.
- Zielbild:
  - Access Token bleibt in Memory.
  - Refresh Token nur als `HttpOnly; Secure; SameSite=Lax|Strict` Cookie.
- CSRF-Regel:
  - Solange keine Cookie-authenticated Endpunkte genutzt werden, ist kein CSRF-Flow aktiv.
  - Sobald Cookie-Refresh aktiv ist (`/auth/refresh`), ist `X-CSRF-Token` + Origin/Referer-Pruefung verpflichtend (Gateway/Auth-Vertrag).

## Scripts
```bash
npm run dev
npm run build
npm run typecheck
npm run lint
npm run test
npm run secret-scan
npm run audit:prod
```

Hinweis:
- `lint` ist aktuell auf TypeScript-Strict fokussiert (`npm run typecheck`).
- `test` nutzt aktuell `node --test` (0 Tests erlaubt im MVP, sollte schrittweise ausgebaut werden).

## CI / Quality Gates
GitHub Actions Workflow: `.github/workflows/ci.yml`
- `quality`: `lint`, `typecheck`, `test`, `build` + `dist/` Artifact
- `supply-chain`: `npm audit --omit=dev`
- `secret-scan`: `npm run secret-scan`

## Lokaler Start
```bash
cd /home/devops/web-portal
npm ci
npm run dev
```

## Build + Container
```bash
cd /home/devops/web-portal
npm ci
npm run build
docker compose config
docker compose up -d --build
docker compose ps
```

## Gateway-Checks (DoD)
```bash
curl -i http://127.0.0.1:8080/
curl -i http://127.0.0.1:8080/dashboard
curl -k -I https://127.0.0.1:8443/
curl -k -I https://127.0.0.1:8443/healthz
curl -k -i -X POST https://127.0.0.1:8443/
```

Erwartung:
- HTTP `:8080` redirect auf HTTPS.
- SPA ueber HTTPS erreichbar.
- `POST /` auf Portal-Catch-all liefert `405`.

## Guardrails
- Kein `localhost`/Service-Host Hardcoding in `src/`.
- Keine Secrets, Tokens oder private Keys im Repo.
- Kein Dev-Server in Production Runtime.
- Kein Direktzugriff vom Browser auf interne Services/DB.
