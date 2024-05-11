import { createClient } from '@supabase/supabase-js'
import Cookies from 'js-cookie'

export const supabase = createClient('https://nchfhnhquozlugyqknuf.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5jaGZobmhxdW96bHVneXFrbnVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODUxNTE4NDgsImV4cCI6MjAwMDcyNzg0OH0.cBU5SjQ9w3OpenF1oWAEe_4jUZRY8sGSQNM1YUbNN8A', {
    auth: {
      storage: {
        getItem: (key: string) => Cookies.get(key) ?? null,
        setItem: (key: string, value: string) => { Cookies.set(key, value, { expires: 365 }) },
        removeItem: (key: string) => Cookies.remove(key),
      },
    },
  })