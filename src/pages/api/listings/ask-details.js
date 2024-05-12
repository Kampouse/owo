import OpenAiApi from "@/backend/services/OpenAiAPI";
import createClient from "@/backend/services/supabaseApiClient/DatabaseClient";


export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      throw "Only POST requests are allowed";
    }
    const { content } = req.body;
    const openAiApi = new OpenAiApi(createClient(req, res));
    const question = await openAiApi.listingAskDetails(content);

    res.status(200).json({ content, question });
  } catch (error) {
    res.status(500).json(error);
  }
}
