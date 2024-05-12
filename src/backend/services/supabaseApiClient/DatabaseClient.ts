import { createServerClient, type CookieOptions, serialize } from '@supabase/ssr'
import { SupabaseClient } from '@supabase/supabase-js'
import { type NextApiRequest, type NextApiResponse } from 'next'

export class DatabaseClient {
  private _supabase: SupabaseClient<any, "public", any>

  constructor(supabase: SupabaseClient<any, "public", any>) {
    this._supabase = supabase
  }

  apply = () => this._supabase

  materializeUserInterests = async ({ owner, tags }: { owner?: string, tags: string[] }) => {
    const { error } = await this._supabase.from('user_interests').insert({ owner, tags })

    if (error) {
        console.log(`Cannot materialize user interests.  reason: ${error.toString()}`)
    }
  }

  materializeSearchIntents = async ({ owner, query, embedding }: { owner?: string, query: string, embedding: number[] }) => {
    const { error } = await this._supabase.from('search_intents').insert({ user_profile: owner, query, embedding })

    if (error) {
        console.log(`Cannot materialize search intents.  reason: ${error.toString()}`)
    }
  }

  logAiPricing = async ({ callerFunctionName, modelName, totalCost }: { callerFunctionName: string, modelName: string, totalCost: number }) => {
    const user = await this.getUser();
    await this._supabase.from('ai_pricing').insert([
        { call: callerFunctionName, model: modelName, amount: totalCost, user_id: user?.id },
    ]);
  }

  getUser = async () => {
    const { data: { user } } = await this._supabase.auth.getUser();

    return user
  }
}

export default function createClient(req: NextApiRequest, res: NextApiResponse) {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return req.cookies[name]
        },
        set(name: string, value: string, options: CookieOptions) {
          res.appendHeader('Set-Cookie', serialize(name, value, options))
        },
        remove(name: string, options: CookieOptions) {
          res.appendHeader('Set-Cookie', serialize(name, '', options))
        },
      },
    }
  )

  return new DatabaseClient(supabase)
}
