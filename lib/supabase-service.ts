import { createClient, SupabaseClient } from '@supabase/supabase-js'

let client: SupabaseClient | undefined

function getSupabaseService(): SupabaseClient {
  if (!client) {
    client = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )
  }
  return client
}

export const supabaseService = new Proxy({} as SupabaseClient, {
  get(_target, prop, receiver) {
    return Reflect.get(getSupabaseService(), prop, receiver)
  },
})
