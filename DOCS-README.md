# SabbPe developer docs (/docs)

Adds a Developers tab and a docs section at `/docs`: a product sidebar on the left, and on the right a guide,
a walkthrough video and (for merchants who are logged in) the API reference with request and response samples.

## Files

| Path | What it is |
|---|---|
| `src/app/docs/docsNav.ts` | Public content: sidebar groups, each product's narration, steps and video |
| `src/app/docs/apiData.ts` | API reference content. Server only. Never import it in a client component |
| `src/app/docs/layout.tsx`, `page.tsx`, `[product]/page.tsx` | The docs shell, home page and product page |
| `src/components/docs/DocsSidebar.tsx`, `EndpointBlock.tsx` | Sidebar and endpoint block |
| `src/lib/docsAuth.ts` | Session cookie signing and the server-side login check |
| `src/lib/devStore.ts`, `authUtil.ts`, `mailer.ts` | Developer storage, password and token helpers, verification email |
| `src/app/signup/`, `login/`, `verify/`, `src/app/api/auth/` | Sign-up, login and email confirmation pages, and their routes |
| `db/developers.sql` | The `developers` table |
| `src/components/navigation/Navbar.tsx` | Changed: adds the Developers link (desktop and mobile) |
| `public/videos/checkout_page.mp4`, `discount_coupons.mp4` | Two videos the site did not have yet |

Two packages were added: `mariadb` (database driver) and `nodemailer` (email).

## Developer accounts and the lock

1. A developer enters their email at `/signup` and clicks "Send verification link". No password yet.
2. The email is staged in `pending_signups` and the site emails a link (`/verify?token=...`), valid for 24 hours.
3. Opening the link shows a page to choose a password. Submitting it writes the account to `developers` and logs the developer in.
4. Login sets a signed, httpOnly session cookie that lasts 8 hours. Logging out clears it.

The docs product page reads that cookie on the server. Without a valid session, `apiData.ts` is never loaded,
so endpoints, fields and samples are not in the page HTML or in any public JavaScript file.

### Set-up for your developer

1. Run `db/developers.sql` on your MariaDB/MySQL database to create the `developers` table.
2. Fill in `.env` from `.env.example`: `DOCS_SESSION_SECRET`, `DATABASE_URL` (`mariadb://user:password@host:port/database`), `SITE_URL` and the SMTP settings.
3. Run `npm install`, then `npm run build` and `npm start`.

### How it is stored and protected

- Passwords are stored as scrypt hashes with a random salt, never in plain text.
- An unconfirmed sign-up lives only in `pending_signups`; it becomes a real account when the link is opened.
- The emailed token is stored only as a SHA-256 hash, and is cleared once used.
- Sign-up gives the same reply whether or not an email is already registered.
- Sign-up is limited to 5 attempts and login to 8 attempts per IP every 10 minutes, held in memory.
  Use a shared store if you run more than one server.

### Using a different database

All database access is in `src/lib/devStore.ts`, behind the `DevStore` interface.
To use PostgreSQL or another store, implement that interface and return it from `getStore()`.
`MAIL_FROM` (the sender address) is required once `SMTP_HOST` is set, with no default.

### Not included

Password reset, and an admin screen to view or remove developers.

## Adding content

- New product page: add an entry to `docsNav.ts`. Set `access` to `api`, `soon` or `dashboard`.
- New endpoints: add them under the product's slug in `apiData.ts`, and list their names in `endpointNames` in `docsNav.ts`.
