import { createClient, SupabaseClient } from '@supabase/supabase-js'

let client: SupabaseClient | undefined

type NextFetchInit = RequestInit & {
  next?: {
    revalidate?: number
  }
}

const supabaseFetch: typeof fetch = (input, init) =>
  fetch(input, {
    ...(init as NextFetchInit | undefined),
    next: {
      ...(init as NextFetchInit | undefined)?.next,
      revalidate: 300,
    },
  } as NextFetchInit)

function getSupabaseService(): SupabaseClient {
  if (!client) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!url || !key) {
      throw new Error('Supabase env vars not configured (NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY)')
    }
    client = createClient(url, key, {
      global: {
        fetch: supabaseFetch,
      },
    })
  }
  return client
}

export const supabaseService = new Proxy({} as SupabaseClient, {
  get(_target, prop, receiver) {
    return Reflect.get(getSupabaseService(), prop, receiver)
  },
})

// Uncached variant for admin panels and anything that must always read fresh
// data — the default client above caches every Supabase response for 300s,
// which makes admin lists lag up to 5 minutes behind reality.
let uncachedClient: SupabaseClient | undefined

function getSupabaseServiceUncached(): SupabaseClient {
  if (!uncachedClient) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!url || !key) {
      throw new Error('Supabase env vars not configured (NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY)')
    }
    uncachedClient = createClient(url, key, {
      global: {
        fetch: (input, init) => fetch(input, { ...init, cache: 'no-store' }),
      },
    })
  }
  return uncachedClient
}

export const supabaseServiceUncached = new Proxy({} as SupabaseClient, {
  get(_target, prop, receiver) {
    return Reflect.get(getSupabaseServiceUncached(), prop, receiver)
  },
})
