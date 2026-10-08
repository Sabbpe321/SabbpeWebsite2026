-- Developer accounts for sabbpe.com (sign up, email verification, login).
-- PostgreSQL. Run once on the database that DATABASE_URL points to.
create table if not exists developers (
  id                    uuid primary key default gen_random_uuid(),
  email                 text not null unique,          -- stored in lower case
  password_hash         text not null,                 -- scrypt hash, never the password
  name                  text,
  verified_at           timestamptz,                   -- null until the email link is clicked
  verify_token_hash     text,                          -- SHA-256 of the emailed token
  verify_token_expires  timestamptz,
  created_at            timestamptz not null default now(),
  last_login_at         timestamptz
);
create index if not exists developers_verify_token_idx on developers (verify_token_hash);
