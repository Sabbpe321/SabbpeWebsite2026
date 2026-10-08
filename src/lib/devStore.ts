import { randomUUID } from 'crypto';
import { promises as fs } from 'fs';
import path from 'path';

/**
 * Where developer accounts are stored.
 *   DATABASE_URL set     -> MariaDB/MySQL, tables `developers` and `pending_signups` (see db/developers.sql).
 *   DATABASE_URL not set -> local JSON files, for development only.
 * To use a different database, implement the DevStore interface below and return it from getStore().
 * DATABASE_URL format: mariadb://user:password@host:port/database
 *
 * A sign-up starts with only an email, staged in `pending_signups`. Opening the emailed link lets the
 * person choose a password, and only then is the account written to `developers`.
 */

export type Developer = { id: string; email: string; passwordHash: string; name: string | null; verifiedAt: string | null };
export type PendingSignup = { id: string; email: string };

export interface DevStore {
  /** A confirmed account, or null. Only accounts that have clicked the emailed link live here. */
  findByEmail(email: string): Promise<Developer | null>;
  /** Stages an email (insert, or refresh the token if one is already pending). No password yet. */
  createPending(d: { email: string; tokenHash: string; tokenExpires: Date }): Promise<void>;
  /** A staged sign-up by token, if the token matches and has not expired. */
  findPendingByTokenHash(tokenHash: string): Promise<PendingSignup | null>;
  /** Completes a staged sign-up: writes the account with the chosen password. Returns it, or null if it is gone. */
  promotePending(id: string, passwordHash: string): Promise<Developer | null>;
  touchLogin(id: string): Promise<void>;
}

type Row = { id: string; email: string; password_hash: string; name: string | null; verified_at: Date | string | null; verify_token_expires?: Date | string | null };
const fromRow = (r: Row): Developer => ({ id: r.id, email: r.email, passwordHash: r.password_hash, name: r.name, verifiedAt: r.verified_at ? new Date(r.verified_at).toISOString() : null });
const toPending = (r: Row): PendingSignup => ({ id: r.id, email: r.email });

function poolConfig(): import('mariadb').PoolConfig {
  const url = new URL(process.env.DATABASE_URL as string);
  return {
    host: url.hostname,
    port: Number(url.port || 3306),
    user: decodeURIComponent(url.username),
    password: decodeURIComponent(url.password),
    database: decodeURIComponent(url.pathname.replace(/^\//, '')),
    connectionLimit: 5,
  };
}

async function mariaStore(): Promise<DevStore> {
  const g = globalThis as unknown as { __sabbpePool?: import('mariadb').Pool };
  if (!g.__sabbpePool) { const { createPool } = await import('mariadb'); g.__sabbpePool = createPool(poolConfig()); }
  const pool = g.__sabbpePool;
  const cols = 'id, email, password_hash, name, verified_at';
  return {
    async findByEmail(email) { const rows = (await pool.query(`select ${cols} from developers where email = ?`, [email])) as Row[]; return rows[0] ? fromRow(rows[0]) : null; },
    async createPending(d) {
      await pool.query(
        `insert into pending_signups (id, email, verify_token_hash, verify_token_expires)
         values (?, ?, ?, ?)
         on duplicate key update verify_token_hash = values(verify_token_hash), verify_token_expires = values(verify_token_expires)`,
        [randomUUID(), d.email, d.tokenHash, d.tokenExpires],
      );
    },
    async findPendingByTokenHash(tokenHash) {
      const rows = (await pool.query('select id, email, verify_token_expires from pending_signups where verify_token_hash = ?', [tokenHash])) as Row[];
      const row = rows[0];
      if (!row || !row.verify_token_expires || new Date(row.verify_token_expires) <= new Date()) return null;
      return toPending(row);
    },
    async promotePending(id, passwordHash) {
      const conn = await pool.getConnection();
      try {
        await conn.beginTransaction();
        const rows = (await conn.query('select id, email from pending_signups where id = ? for update', [id])) as Row[];
        const p = rows[0];
        if (!p) { await conn.rollback(); return null; }
        const existing = (await conn.query(`select ${cols} from developers where email = ?`, [p.email])) as Row[];
        if (existing[0]) { await conn.query('delete from pending_signups where id = ?', [id]); await conn.commit(); return fromRow(existing[0]); }
        const devId = randomUUID();
        await conn.query('insert into developers (id, email, password_hash, name, verified_at) values (?, ?, ?, ?, now())', [devId, p.email, passwordHash, null]);
        await conn.query('delete from pending_signups where id = ?', [id]);
        await conn.commit();
        return { id: devId, email: p.email, passwordHash, name: null, verifiedAt: new Date().toISOString() };
      } catch (e) {
        await conn.rollback();
        throw e;
      } finally {
        conn.release();
      }
    },
    async touchLogin(id) { await pool.query('update developers set last_login_at = now() where id = ?', [id]); },
  };
}

type FileRec = Developer & { createdAt: string; lastLoginAt: string | null };
type PendingRec = PendingSignup & { tokenHash: string; tokenExpires: string; createdAt: string };
function fileStore(): DevStore {
  const devFile = path.resolve(process.env.DEV_STORE_FILE ?? '.data/developers.json');
  const pendingFile = path.resolve(process.env.DEV_PENDING_FILE ?? '.data/pending-signups.json');
  const load = async <T>(file: string): Promise<T[]> => { try { return JSON.parse(await fs.readFile(file, 'utf8')); } catch { return []; } };
  const save = async (file: string, rows: unknown[]) => { await fs.mkdir(path.dirname(file), { recursive: true }); await fs.writeFile(file, JSON.stringify(rows, null, 2)); };
  const pub = (r: FileRec): Developer => ({ id: r.id, email: r.email, passwordHash: r.passwordHash, name: r.name, verifiedAt: r.verifiedAt });
  const pubP = (r: PendingRec): PendingSignup => ({ id: r.id, email: r.email });
  return {
    async findByEmail(email) { const r = (await load<FileRec>(devFile)).find((x) => x.email === email); return r ? pub(r) : null; },
    async createPending(d) {
      const rows = await load<PendingRec>(pendingFile);
      const existing = rows.find((x) => x.email === d.email);
      const rec: PendingRec = existing ?? { id: randomUUID(), email: d.email, tokenHash: d.tokenHash, tokenExpires: d.tokenExpires.toISOString(), createdAt: new Date().toISOString() };
      rec.tokenHash = d.tokenHash; rec.tokenExpires = d.tokenExpires.toISOString();
      if (!existing) rows.push(rec);
      await save(pendingFile, rows);
    },
    async findPendingByTokenHash(tokenHash) { const r = (await load<PendingRec>(pendingFile)).find((x) => x.tokenHash === tokenHash && new Date(x.tokenExpires) > new Date()); return r ? pubP(r) : null; },
    async promotePending(id, passwordHash) {
      const pending = await load<PendingRec>(pendingFile);
      const p = pending.find((x) => x.id === id);
      if (!p) return null;
      const devs = await load<FileRec>(devFile);
      const dup = devs.find((x) => x.email === p.email);
      if (dup) { await save(pendingFile, pending.filter((x) => x.id !== id)); return pub(dup); }
      const rec: FileRec = { id: randomUUID(), email: p.email, passwordHash, name: null, verifiedAt: new Date().toISOString(), createdAt: new Date().toISOString(), lastLoginAt: null };
      devs.push(rec);
      await save(devFile, devs);
      await save(pendingFile, pending.filter((x) => x.id !== id));
      return pub(rec);
    },
    async touchLogin(id) { const rows = await load<FileRec>(devFile); const r = rows.find((x) => x.id === id); if (r) { r.lastLoginAt = new Date().toISOString(); await save(devFile, rows); } },
  };
}

export async function getStore(): Promise<DevStore> {
  if (process.env.DATABASE_URL) return mariaStore();
  if (process.env.NODE_ENV === 'production' && process.env.DEV_ALLOW_FILE_STORE !== 'true') throw new Error('DATABASE_URL must be set in production');
  return fileStore();
}
