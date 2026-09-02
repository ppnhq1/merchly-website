import { Pool } from "pg";

// Reuses the same Neon Postgres database Payload already talks to, so this
// needs no new infrastructure (e.g. Redis/Upstash) just to throttle abuse.
// A global singleton avoids opening a new pool on every dev hot-reload / hot
// serverless invocation.
declare global {
  var _rateLimitPool: Pool | undefined;
}

function getPool() {
  if (!global._rateLimitPool) {
    global._rateLimitPool = new Pool({
      connectionString: process.env.DATABASE_URL,
      max: 3,
    });
  }
  return global._rateLimitPool;
}

let tableReady: Promise<void> | undefined;

function ensureTable() {
  if (!tableReady) {
    tableReady = getPool()
      .query(
        `CREATE TABLE IF NOT EXISTS rate_limit_hits (
           key TEXT PRIMARY KEY,
           window_start TIMESTAMPTZ NOT NULL,
           count INTEGER NOT NULL
         )`,
      )
      .then(() => undefined)
      .catch(() => {
        // Reset so a transient failure (e.g. brief connectivity blip) is
        // retried on the next call instead of permanently short-circuiting.
        tableReady = undefined;
      });
  }
  return tableReady;
}

export type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  limit: number;
};

// Fixed-window limiter: `key` should already include the route and the
// caller's IP. Atomic via a single upsert, so concurrent requests racing the
// same key can't both slip through under the limit.
export async function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number,
): Promise<RateLimitResult> {
  await ensureTable();
  const pool = getPool();

  const result = await pool.query<{ count: number }>(
    `INSERT INTO rate_limit_hits (key, window_start, count)
     VALUES ($1, now(), 1)
     ON CONFLICT (key) DO UPDATE SET
       count = CASE
         WHEN rate_limit_hits.window_start < now() - ($2 || ' milliseconds')::interval
           THEN 1
         ELSE rate_limit_hits.count + 1
       END,
       window_start = CASE
         WHEN rate_limit_hits.window_start < now() - ($2 || ' milliseconds')::interval
           THEN now()
         ELSE rate_limit_hits.window_start
       END
     RETURNING count`,
    [key, String(windowMs)],
  );

  const count = result.rows[0]?.count ?? 1;
  return {
    allowed: count <= limit,
    remaining: Math.max(0, limit - count),
    limit,
  };
}

export function getClientIp(headers: Headers): string {
  const forwardedFor = headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return headers.get("x-real-ip") ?? "unknown";
}
