# web-portal

Statisches SaaS-Web-Portal (SPA) fuer den Betrieb hinter dem API-Gateway.

Stand: 11.02.2026

## Aktueller Zustand
- Frontend ist Vite + React SPA.
- Production-Serving erfolgt statisch ueber `nginx:alpine`.
- API-Calls laufen relativ (Gateway-first), keine hardcodierten Service-Hosts.
- Container-Health ist ueber `/healthz` vorhanden.
- Deployment ist standardmaessig internal-only (`expose: 80`), keine Host-Port-Freigabe im Default.

## Architektur
- Build: Node Stage (`npm ci`, `npm run build`)
- Runtime: NGINX Stage (statische Assets aus `dist/`)
- SPA-Fallback: unbekannte Routen werden auf `/index.html` geleitet
- Caching fuer Hash-Assets: `Cache-Control: public, max-age=31536000, immutable`
- Caching fuer `index.html`: `Cache-Control: no-store`

## Gateway-Integration (SaaS)
- Portal wird ueber das Gateway ausgeliefert (`/* -> web-portal`).
- API-Routing bleibt getrennt: `/auth/*` -> auth-service.
- API-Routing bleibt getrennt: `/profiles/*` -> profile-service.
- SPA-Routing funktioniert auch ueber Gateway (z. B. `/dashboard`).

## API-Contract im Frontend
- Frontend nutzt nur relative Pfade (z. B. `/auth/login`, `/profiles/me`).
- Optionaler Prefix bleibt relativ: `VITE_API_BASE_PATH=""` oder z. B. `/api`.
- Absolute API-URLs sind absichtlich nicht erlaubt.

## Konfiguration
Nur oeffentliche Build-Variablen mit `VITE_` Prefix verwenden.

```env
VITE_APP_NAME=Pfad des Paradoxons
VITE_ENVIRONMENT=development
VITE_API_BASE_PATH=
```

Hinweise:
- `VITE_API_BASE_PATH` muss leer sein oder mit `/` beginnen.
- Keine Secrets (keine Tokens, DB-Zugangsdaten, SMTP-Credentials) in `.env` oder im Bundle.

## Token-Handling
- Access Token wird im Frontend verwendet (`Authorization: Bearer ...`).
- Refresh Token wird nicht mehr persistent im Frontend gespeichert.

## Dateien (relevant)
- `Dockerfile`: Multi-Stage Build + NGINX Runtime
- `nginx/default.conf`: SPA-Fallback + `/healthz`
- `docker-compose.yml`: internal-only Service-Start + Healthcheck
- `src/shared/lib/httpClient.ts`: relative API-URL-Bildung
- `src/shared/lib/tokenManager.ts`: kein persistentes refresh_token

## Lokale Entwicklung
```bash
cd /home/devops/web-portal
npm ci
npm run dev
```

## Build
```bash
cd /home/devops/web-portal
npm ci
npm run build
```

## Container-Betrieb
```bash
cd /home/devops/web-portal
docker compose build
docker compose up -d
docker compose ps
```

## Healthcheck
Im Container:
```bash
wget -qO- http://127.0.0.1/healthz
```

Erwartet: `ok`

## Verifikation (aktueller Ist-Stand)
Folgende Checks wurden erfolgreich ausgefuehrt:
- `npm run build` erfolgreich
- `docker compose config` valide
- Web-Portal Container `healthy`
- Gateway liefert `GET /` -> `200` (SPA)
- Gateway liefert `GET /dashboard` -> `200` (SPA-Fallback)
- API-Pfade bleiben separat geroutet

## Guardrails
- Kein Dev-Server in Production (kein `vite preview` als Runtime).
- Keine absoluten Backend-URLs im Frontend-Code.
- Kein Direktzugriff auf interne Services oder DB aus dem Browser.
- CORS/Security Header werden am Gateway gesetzt, nicht im Portal selbst.
