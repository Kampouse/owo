import OpenAiApi from "@/backend/services/OpenAiAPI";
import createClient from "@/backend/services/supabaseApiClient/DatabaseClient";
import { NextApiRequest, NextApiResponse } from "next";

const fromPayloadTermsToType = (terms: Record<string, boolean>) => Object.entries(terms).filter(([_, d]) => d).map(([d]) => d)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "POST") {
      throw "Only POST requests are allowed";
    }
    const body = req.body;
    const database = createClient(req, res)
    const openAiApi = new OpenAiApi(database);
    const owner = await database.getUser()

    const newOffer = {
        owner: owner?.id,
        title: body.title,
        description: body.description,
        images: body.images || [],
        type: fromPayloadTermsToType(body.proposition_terms),
        tags: body.tags,
        price: body.price,
        embedding: await openAiApi.createEmbeddings(`${body.title} ${body.description} ${body.proposition_tags}`),
    }

    const { data, error } = await database
        .apply()
        .from('offer')
        .insert(newOffer)
        .select('description')

    await database.materializeUserInterests({ owner: newOffer.owner, tags: newOffer.tags })
    
    if (error) {
      throw error
    }

    res.status(200).json({ description: data[0].description });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}
