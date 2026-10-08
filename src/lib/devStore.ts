import { randomUUID } from 'crypto';
import { promises as fs } from 'fs';
import path from 'path';

/**
 * Where developer accounts are stored.
 *   DATABASE_URL set     -> PostgreSQL, table `developers` (see db/developers.sql).
 *   DATABASE_URL not set -> a local JSON file, for development only.
 * To use a different database, implement the DevStore interface below and return it from getStore().
 */
export type Developer = { id: string; email: string; passwordHash: string; name: string | null; verifiedAt: string | null };
export interface DevStore {
  findByEmail(email: string): Promise<Developer | null>;
  create(d: { email: string; passwordHash: string; name: string | null; tokenHash: string; tokenExpires: Date }): Promise<Developer>;
  setVerifyToken(id: string, tokenHash: string, tokenExpires: Date): Promise<void>;
  /** Marks the account verified if the token matches and has not expired. Returns the account, or null. */
  verifyByTokenHash(tokenHash: string): Promise<Developer | null>;
  touchLogin(id: string): Promise<void>;
}

type Row = { id: string; email: string; password_hash: string; name: string | null; verified_at: Date | string | null };
const fromRow = (r: Row): Developer => ({ id: r.id, email: r.email, passwordHash: r.password_hash, name: r.name, verifiedAt: r.verified_at ? new Date(r.verified_at).toISOString() : null });

async function pgStore(): Promise<DevStore> {
  const g = globalThis as unknown as { __sabbpePool?: import('pg').Pool };
  if (!g.__sabbpePool) { const { Pool } = await import('pg'); g.__sabbpePool = new Pool({ connectionString: process.env.DATABASE_URL, max: 5 }); }
  const pool = g.__sabbpePool;
  const cols = 'id, email, password_hash, name, verified_at';
  return {
    async findByEmail(email) { const r = await pool.query<Row>(`select ${cols} from developers where email = $1`, [email]); return r.rows[0] ? fromRow(r.rows[0]) : null; },
    async create(d) { const r = await pool.query<Row>(`insert into developers (email, password_hash, name, verify_token_hash, verify_token_expires) values ($1,$2,$3,$4,$5) returning ${cols}`, [d.email, d.passwordHash, d.name, d.tokenHash, d.tokenExpires]); return fromRow(r.rows[0]); },
    async setVerifyToken(id, tokenHash, tokenExpires) { await pool.query('update developers set verify_token_hash = $2, verify_token_expires = $3 where id = $1', [id, tokenHash, tokenExpires]); },
    async verifyByTokenHash(tokenHash) { const r = await pool.query<Row>(`update developers set verified_at = coalesce(verified_at, now()), verify_token_hash = null, verify_token_expires = null where verify_token_hash = $1 and verify_token_expires > now() returning ${cols}`, [tokenHash]); return r.rows[0] ? fromRow(r.rows[0]) : null; },
    async touchLogin(id) { await pool.query('update developers set last_login_at = now() where id = $1', [id]); },
  };
}

type FileRec = Developer & { tokenHash: string | null; tokenExpires: string | null; createdAt: string; lastLoginAt: string | null };
function fileStore(): DevStore {
  const file = path.resolve(process.env.DEV_STORE_FILE ?? '.data/developers.json');
  const read = async (): Promise<FileRec[]> => { try { return JSON.parse(await fs.readFile(file, 'utf8')); } catch { return []; } };
  const write = async (rows: FileRec[]) => { await fs.mkdir(path.dirname(file), { recursive: true }); await fs.writeFile(file, JSON.stringify(rows, null, 2)); };
  const pub = (r: FileRec): Developer => ({ id: r.id, email: r.email, passwordHash: r.passwordHash, name: r.name, verifiedAt: r.verifiedAt });
  return {
    async findByEmail(email) { const r = (await read()).find((x) => x.email === email); return r ? pub(r) : null; },
    async create(d) { const rows = await read(); const rec: FileRec = { id: randomUUID(), email: d.email, passwordHash: d.passwordHash, name: d.name, verifiedAt: null, tokenHash: d.tokenHash, tokenExpires: d.tokenExpires.toISOString(), createdAt: new Date().toISOString(), lastLoginAt: null }; rows.push(rec); await write(rows); return pub(rec); },
    async setVerifyToken(id, tokenHash, tokenExpires) { const rows = await read(); const r = rows.find((x) => x.id === id); if (r) { r.tokenHash = tokenHash; r.tokenExpires = tokenExpires.toISOString(); await write(rows); } },
    async verifyByTokenHash(tokenHash) { const rows = await read(); const r = rows.find((x) => x.tokenHash === tokenHash && x.tokenExpires && new Date(x.tokenExpires) > new Date()); if (!r) return null; r.verifiedAt = r.verifiedAt ?? new Date().toISOString(); r.tokenHash = null; r.tokenExpires = null; await write(rows); return pub(r); },
    async touchLogin(id) { const rows = await read(); const r = rows.find((x) => x.id === id); if (r) { r.lastLoginAt = new Date().toISOString(); await write(rows); } },
  };
}

export async function getStore(): Promise<DevStore> {
  if (process.env.DATABASE_URL) return pgStore();
  if (process.env.NODE_ENV === 'production' && process.env.DEV_ALLOW_FILE_STORE !== 'true') throw new Error('DATABASE_URL must be set in production');
  return fileStore();
}
