import OpenAiApi from "@/backend/services/OpenAiAPI";
import createClient from "@/backend/services/supabaseApiClient/DatabaseClient";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "POST") {
      throw "Only POST requests are allowed";
    }
    const { query } = req.body;
    const database = createClient(req, res)
    const openAiApi = new OpenAiApi(database);

    const owner = await database.getUser()
  
    const embedding = await openAiApi.createEmbeddings(query)
  
    const { data, error } = await database
      .apply()
      .rpc('search_offers', {
        query_embedding: embedding,
        match_threshold: 0.8,
        match_count: 10,
      })
  
    if (owner) {
      await database.materializeSearchIntents({ embedding, query, owner: owner.id })
    }

    console.log(error);

    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json(error);
  }
}
