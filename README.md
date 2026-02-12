# web-portal

Statisches SaaS-Web-Portal (Vite + React), das hinter dem NGINX Gateway betrieben wird.

Stand: 2026-02-12 14:37:47 CET

## Aktueller Stand (2026-02-12 14:37:47 CET)

- Container `web-portal-stack-web-portal-1` laeuft `healthy`.
- Gateway-Rootcheck `https://127.0.0.1:8443/` liefert `200`.
- Auslieferung ueber Gateway ist aktiv (SPA-HTML wird korrekt geliefert).

## Statusueberblick

Fazit: Portal-Basis ist produktionsnah fuer Login/Register + einfache Profilansicht. Das Repo ist jedoch noch nicht vollstaendig implementiert.

- Fertig und verifiziert:
  - Multi-Stage Build (`node:22-alpine` -> `nginx:alpine`) in `Dockerfile`
  - Statisches Serving + SPA-Fallback in `nginx/default.conf`
  - Relative API-Calls ueber `src/shared/lib/httpClient.ts` (keine harten Service-Hosts im `src/`)
  - Compose-Deployment internal-only (`expose: 80`, kein Default-Host-Port)
  - Gateway-Integration aktiv (`/` und `/dashboard` liefern SPA ueber HTTPS)
  - Catch-all Method-Safety aktiv (`POST /` via HTTPS -> `405`)

- Teilweise umgesetzt:
  - Auth-Feature hat viele API-Wrapper, aber Routing/UI nutzt aktuell nur:
    - `/login`
    - `/register`
    - `/profile/me`
  - Mehrere Auth/Profile-Seiten sind als Platzhalter angelegt, aber leer.

- Offen:
  - 18 leere Platzhalterdateien in `src/` (von insgesamt 64 Dateien)
  - TypeScript-Strict-Check ist nicht clean (`npx tsc --noEmit` Fehler in `src/app/guards/RequireRole.tsx:22`)
  - Kein dedizierter `test`/`lint` Script in `package.json`

## Implementierungsumfang (Ist)

- Aktiv im Router (`src/app/router.tsx`):
  - `LoginPage`
  - `RegisterPage`
  - `ProfilePage`
- Aktiv fuer Auth-Bootstrap:
  - `GET /auth/me` ueber `src/app/providers/AuthProvider.tsx`
- Token-Handling:
  - Access Token in `localStorage`
  - Kein persistentes Refresh Token (`src/shared/lib/tokenManager.ts`)
- Vorhandene, aber nicht aktiv verdrahtete Bereiche:
  - `RequireRole` Guard
  - `useRegister`, `useVerifyEmail`
  - Viele Auth-API-Wrapper (Magic Link, OTP, Sessions, Password-Flows)
  - Groesste Teile des Profile-Features (Hooks/API/Components/Types)

## Platzhalterdateien (0 Byte)

Aktuell leer:

- `src/shared/store/authStore.ts`
- `src/shared/ui/FormField.tsx`
- `src/features/auth/pages/ForgotPasswordPage.tsx`
- `src/features/auth/pages/MagicLinkPage.tsx`
- `src/features/auth/pages/OtpPage.tsx`
- `src/features/auth/pages/ResetPasswordPage.tsx`
- `src/features/auth/pages/SessionsPage.tsx`
- `src/features/auth/pages/VerifyEmailPage.tsx`
- `src/features/profile/api/getMyProfile.ts`
- `src/features/profile/api/health.ts`
- `src/features/profile/api/updateMyProfile.ts`
- `src/features/profile/components/ProfileCard.tsx`
- `src/features/profile/components/ProfileForm.tsx`
- `src/features/profile/hooks/useMyProfile.ts`
- `src/features/profile/hooks/useUpdateProfile.ts`
- `src/features/profile/pages/ProfileEditPage.tsx`
- `src/features/profile/pages/ProfilePrivacyPage.tsx`
- `src/features/profile/types/profile.types.ts`

## Verifikation (durchgefuehrt am 12.02.2026)

### Build und Konfiguration

```bash
cd /home/devops/web-portal
npm run build
docker compose config
docker compose ps
```

Ergebnis:
- Build erfolgreich (`vite build`, 49 Module transformiert)
- Compose-Config valide
- Container `web-portal-stack-web-portal-1` ist `healthy`

### Gateway-/Routing-Checks

```bash
curl -i http://127.0.0.1:8080/
curl -i http://127.0.0.1:8080/dashboard
curl -k -I https://127.0.0.1:8443/
curl -k -I https://127.0.0.1:8443/dashboard
curl -k -I https://127.0.0.1:8443/healthz
curl -k -I https://127.0.0.1:8443/auth/healthz
curl -k -I https://127.0.0.1:8443/health/profile
curl -k -i -X POST https://127.0.0.1:8443/
```

Ergebnis:
- HTTP `:8080` leitet auf HTTPS um (`301`)
- HTTPS Root + `/dashboard` liefern `200` (SPA/Fallback)
- Gateway Health-Endpunkte liefern `200`
- Portal-Catch-all blockiert write methods korrekt (`405` auf `POST /`)

### Code-/Qualitaets-Checks

```bash
rg -n "http://localhost|https://localhost|auth-service|profile-service" src
npx tsc --noEmit
```

Ergebnis:
- Keine harten Backend-Hosts in `src/`
- TypeScript-Check aktuell nicht clean:
  - `src/app/guards/RequireRole.tsx:22` (`user.roles` moeglicherweise `undefined`)

## Konfiguration

Nur oeffentliche Build-Variablen mit `VITE_` Prefix:

```env
VITE_APP_NAME=Pfad des Paradoxons
VITE_ENVIRONMENT=development
VITE_API_BASE_PATH=
```

Hinweise:
- `VITE_API_BASE_PATH` muss leer sein oder mit `/` beginnen.
- Keine Secrets in `.env` oder Frontend-Bundle.

## Lokal ausfuehren

```bash
cd /home/devops/web-portal
npm ci
npm run dev
```

## Guardrails

- Kein Dev-Server in Production-Runtime
- Keine absoluten Backend-URLs im Frontend
- Kein Direktzugriff vom Browser auf interne Services/DB
- Security Header, CORS, TLS und Error-Envelope bleiben Gateway-Verantwortung
