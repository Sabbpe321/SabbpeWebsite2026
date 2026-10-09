# UAT Credentials page

A login-gated reference page at **`/docs/uat`** where a developer finds the UAT (sandbox)
credentials for each SabbPe product, copies them, and reveals passwords on demand.

## How to run

```bash
npm install
npm run dev            # http://localhost:3000/docs/uat
```

Log in first (the page and its API require a session). Guests get a login gate and the
sidebar hides the **UAT → Credentials** entry.

## Files

| Path | What it is |
|---|---|
| `src/app/docs/uat/page.tsx` | Server gate for guests; renders the client page when logged in |
| `src/components/uat/UatCredentialsClient.tsx` | Fetch, search, loading/empty/error states, grid |
| `src/components/uat/CredentialCard.tsx` | One card per product (icon, name, fields, Copy all, Copy as .env) |
| `src/components/uat/CredentialRow.tsx` | A label / value / copy row |
| `src/components/uat/SecretField.tsx` | Masked value with reveal; auto re-masks after 30s |
| `src/components/uat/CopyButton.tsx` | Copy with clipboard fallback; icon or text variants |
| `src/components/uat/Toaster.tsx` | `aria-live` "Copied" feedback |
| `src/lib/uat.ts` | Types, product metadata, pure helpers (masking, `.env` build, search) |
| `src/lib/clipboard.ts` | `navigator.clipboard` with `execCommand` fallback |
| `src/lib/uat.mock.ts` | Dummy data for local dev only |
| `src/app/api/uat-credentials/route.ts` | Authenticated JSON endpoint |
| `src/lib/devStore.ts` | `getUatCredentials(email)`, `hasUatCredentials(email)`, `ensureUatCredentials(id)` |

## Data and security

- Credentials live in **`developers.uat_credentials`** (JSON), one set per developer.
- A developer whose column is `NULL` gets the default set on first login
  (`ensureUatCredentials`, called from the login and sign-up-complete routes). A developer
  who already has their own value is **never overwritten**.
- The page never hardcodes values; it fetches them at runtime from the API.
- The sidebar only checks existence (`hasUatCredentials`) and never selects values, so
  credentials are not part of the server-rendered HTML for any request.
- Passwords are masked by default (`••••••••`) and re-mask 30s after reveal. Copy always
  copies the real value, never the dots.
- The API sends `Cache-Control: no-store` and returns `401` without a session.

### `GET /api/uat-credentials`

```jsonc
{
  "environment": "UAT",
  "products": [
    {
      "key": "upi_deeplink",
      "name": "UPI Deeplink",
      "description": "…",
      "fields": [
        { "label": "sabbpe_merchantid", "value": "…", "secret": false },
        { "label": "sabbpe_password",   "value": "…", "secret": true }
      ]
    }
  ]
}
```

`secret` marks values to mask in the UI (labels matching password/secret/token/pin).

## Mock data (development only)

Set `UAT_USE_MOCK=true` in `.env.local` to serve `src/lib/uat.mock.ts` from the API instead
of the database. It is only read when `NODE_ENV !== 'production'`.

## Adding a product

Add a `dbKey → { key, name, description }` entry in `UAT_PRODUCT_META` (`src/lib/uat.ts`)
and add the same `dbKey` to the JSON stored in `developers.uat_credentials`. The card
renders automatically; icons are chosen in `CredentialCard.tsx`.

## Tests

```bash
npm test          # vitest run
npm run test:watch
```

Covers the pure helpers (`src/lib/uat.test.ts`), reveal + 30s auto re-mask
(`SecretField.test.tsx`), copy behaviour (`CopyButton.test.tsx`), and the card's
copy/.env output plus an axe accessibility check (`CredentialCard.test.tsx`).
Vitest + Testing Library + jsdom + axe are dev-only dependencies.
