import { createClient } from '@supabase/supabase-js'
import Cookies from 'js-cookie'

export const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    auth: {
      storage: {
        getItem: (key: string) => Cookies.get(key) ?? null,
        setItem: (key: string, value: string) => { Cookies.set(key, value) },
        removeItem: (key: string) => Cookies.remove(key),
      },
    },
  })