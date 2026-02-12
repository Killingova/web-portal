#!/usr/bin/env bash
set -euo pipefail

if ! command -v rg >/dev/null 2>&1; then
  echo "[ERROR] ripgrep (rg) is required for secret scan." >&2
  exit 1
fi

PATTERN='(BEGIN PRIVATE KEY|-----BEGIN [A-Z ]*PRIVATE KEY-----|AWS_SECRET_ACCESS_KEY|AWS_SESSION_TOKEN|JWT_SECRET([[:space:]]*[:=])|DB_PASSWORD([[:space:]]*[:=])|POSTGRES_PASSWORD([[:space:]]*[:=])|SUPABASE_(ANON|SERVICE)_KEY([[:space:]]*[:=])|API[_-]?KEY([[:space:]]*[:=]))'

# Focus on source + config paths to reduce false positives from dependencies.
if rg -n --hidden \
  --glob '!node_modules/**' \
  --glob '!dist/**' \
  --glob '!.git/**' \
  --glob '!package-lock.json' \
  --glob '!README.md' \
  --glob '!scripts/secret-scan.sh' \
  --glob '!*.svg' \
  --glob '!*.png' \
  --glob '!*.jpg' \
  --glob '!*.jpeg' \
  --glob '!*.gif' \
  --glob '!*.woff' \
  --glob '!*.woff2' \
  --glob '!*.map' \
  "$PATTERN" src public nginx scripts .github package.json docker-compose.yml Dockerfile .env.example; then
  echo "[ERROR] Potential secret(s) detected. Resolve findings before merge." >&2
  exit 1
fi

echo "[OK] secret scan passed"
