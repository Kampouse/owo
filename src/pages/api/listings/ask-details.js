import openAiApi from "@/backend/services/OpenAiAPI";


export default async function handler(req, res) {
  // TODO: Add authentication with token
  try {
    if (req.method !== "POST") {
      throw "Only POST requests are allowed";
    }
    const { content } = req.body;

    const question = await openAiApi.listingAskDetails(content);

    res.status(200).json({ content, question });
  } catch (error) {
    res.status(500).json(error);
  }
}
