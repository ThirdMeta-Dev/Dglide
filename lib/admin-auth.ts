import { createClient } from '@/lib/supabase/server'

// Only these emails can access the admin panel.
// Set ADMIN_EMAILS in .env.local and Vercel env vars as a comma-separated list.
// Example: ADMIN_EMAILS=admin@dglide.com,team@hexanovate.in
function getAllowedEmails(): Set<string> {
  const env = process.env.ADMIN_EMAILS || ''
  const emails = env
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean)
  return new Set(emails)
}

export async function requireAdmin(): Promise<boolean> {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user?.email) return false

    const allowed = getAllowedEmails()
    // If ADMIN_EMAILS is not configured, any authenticated Supabase user is allowed.
    // Set ADMIN_EMAILS in production to restrict access to specific accounts.
    if (allowed.size === 0) return true

    return allowed.has(user.email.toLowerCase())
  } catch {
    return false
  }
}
