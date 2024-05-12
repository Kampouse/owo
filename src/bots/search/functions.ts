import { supabase } from "@/config/SupabaseClient"



type completeSearchType = {
  search_raw: string;
}

export const completeSearch = async ({
  search_raw,
}: completeSearchType) => {

  const query = `${search_raw}`;

  const response = await fetch('/api/listings/search-offers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  })
  const { data } = await response.json()

  return data ? data : 'rip'
}
