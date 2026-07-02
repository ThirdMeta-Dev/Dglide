// Simple in-memory sliding-window rate limiter.
// Per-instance on serverless — good enough to stop runaway single clients.
const store = new Map<string, number[]>()

export function getClientIp(req: Request): string {
  const h = req.headers
  return (
    (h.get('x-forwarded-for') ?? '').split(',')[0].trim() ||
    h.get('x-real-ip') ||
    'unknown'
  )
}

export function checkRateLimit(
  key: string,
  { windowMs = 60_000, max = 5 }: { windowMs?: number; max?: number } = {}
): boolean {
  const now = Date.now()
  const hits = (store.get(key) ?? []).filter((t) => now - t < windowMs)
  if (hits.length >= max) return false
  hits.push(now)
  store.set(key, hits)
  // Prune old keys periodically to avoid unbounded memory growth
  if (store.size > 5000) {
    for (const [k, v] of store) {
      if (v.every((t) => now - t >= windowMs)) store.delete(k)
    }
  }
  return true
}
