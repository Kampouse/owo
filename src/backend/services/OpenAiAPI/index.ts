import OpenAi from "openai";
import { ModelName } from "./prices";
import { CostTokens, CostSummary, calculateCost } from "./cost-calculator";
import { DatabaseClient } from "../supabaseApiClient/DatabaseClient";

class OpenAiAPI {
  private client;
  private database: DatabaseClient;

  constructor(database: DatabaseClient) {
    this.client = new OpenAi();
    this.database = database;
  }

  async calculateCost(callerFunctionName: string, modelName: ModelName, tokens: CostTokens): Promise<CostSummary> {
    const costSummary = calculateCost(modelName, tokens);

    await this.database.logAiPricing({ callerFunctionName, modelName, totalCost: costSummary.totalCost });

    return costSummary;
  }

  async visionDescription(base64Image: string) {
    try {
      const visionCompletion = await this.client.chat.completions.create({
        model: "gpt-4-vision-preview",
        messages: [
          {
            role: "system",
            content: `
            L'objectif est de vendre cet objet sur un marché de l'occasion.
            Décrivez l'objet principal de la photo. Décrivez-le, sa couleur, sa marque et son état.
            Indiquez la taille si elle est évidente et toute autre information pertinente que vous pouvez voir sur la photo.
            Restez précis et sincère. Ne faites pas de suppositions ou de propositions.
            N'émettez pas d'opinion.`,
          },
          {
            role: "user",
            content: [
              { type: "text", text: "Décrivez l'objet sur cette image en français." },
              {
                type: "image_url",
                image_url: {
                  url: `${base64Image}`,
                },
              },
            ],
          },
        ],
        max_tokens: 300,
      });

      await this.calculateCost("visionDescription", "gpt-4-vision-preview", { prompt: visionCompletion.usage?.prompt_tokens || 0, completion: visionCompletion.usage?.completion_tokens || 0 });

      const imageDescription = visionCompletion.choices[0].message.content;

      return imageDescription;
    } catch (error) {
      console.log(error)
      throw error;
    }
  }

  async listingCompletions(imageDescription: string) {
    try {
      const listingCompletion = await this.client.chat.completions.create({
        model: "gpt-3.5-turbo-0125",
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content: `

      L'Assistant est un chatbot IA qui aide les utilisateurs à convertir un texte en langage naturel en format JSON. Après que les utilisateurs saisissent leurs informations, vous retournez toujours l'objet JSON directement.
      Je vais te donner des informaitons a propos d'une annonce classée, en francais canadien.

          Tes réponses sont toujours composées ainsit:
          - un titre en 5 mots ou moins qui résume le contenu de l'offre
          - une courte description suivi des détials en point de forme du contenu de l'offre, indique uniquement les informations pertinentes et spécifiées par l'utilisateur.
          - prends note des termes de l'offre, si c'est service, un don, un pret, une vente, ou plusieur à la fois.
          - prépare une liste de hashtags a la pinterest représentant l'offre. Les hashtags doient etre des catégories,
            des noms, des audiences, des lifestyle, des activitées faites avec ces objets, etc
            tu vas ensuite me répondre uniquement un objet JSON validecontenant les infroamtions suivantes:
            \`\`\`
            {"title": [le titre],
            "description": [la description],
            "tags": string[][liste des tags]
          `,
          },
          {
            role: "user",
            content: `Fait une annonce basée sur la descirption de cette image: ${imageDescription}`,
          },
        ],
        max_tokens: 400,
      });

      await this.calculateCost("listingCompletions", "gpt-3.5-turbo-0125", { prompt: listingCompletion.usage?.prompt_tokens || 0, completion: listingCompletion.usage?.completion_tokens || 0 });

      const listing = listingCompletion.choices[0].message.content || '';
      return JSON.parse(listing)

    } catch (error) {
      console.log(error)
      throw error;
    }
  }

  async listingAskDetails(offerDescription: string) {
    try {
      const listingAskDetails = await this.client.chat.completions.create({
        model: "gpt-3.5-turbo-0125",
        messages: [
          {
            role: "system",
            content: `Vous êtes un assistant de marché avisé, qui aide les utilisateurs à créer des annonces détaillées et
      attrayantes pour leurs produits. Votre tâche consiste à obtenir de l'utilisateur des informations spécifiques et
      pertinentes qui amélioreront la visibilité du produit sur la place de marché et faciliteront la recherche. N'oubliez
      pas que les spécificités et les détails du produit, tels que la taille, la tranche d'âge, etc. sont importants.
      Après avoir lu la dernière ligne de la description de l'utilisateur, utilisez la méthode STAR pour trouver la question
      complémentaire la plus éclairante qui permettra d'en savoir plus sur l'article.
      Généralement, tes questions doivent couvrir les spécificité de l'item, marque, modèle, couleur, spécificités et sa condition (usée, neuf, etc).
      vous êtes joyeux, drôle et utilisez des émojis. vous avez un ton de conversation convivial et concis.
      tu sais déjà où la personne habite.
      tu ne peux pas demander de photo.
      tu dois poser quelques questions à l'utilisateur pour obtenir plus d'informations sur l'objet.
      Ne fais pas de salutations, l'utlisateur te connais déjà`,
          },
          {
            role: "user",
            content: `${offerDescription}`,
          },
        ],
        max_tokens: 150,
      });

      await this.calculateCost("listingAskDetails", "gpt-3.5-turbo-0125", { prompt: listingAskDetails.usage?.prompt_tokens || 0, completion: listingAskDetails.usage?.completion_tokens || 0 });

      const questions = listingAskDetails.choices[0].message.content || '';
      return questions;

    } catch (error) {
      console.log(error)
      throw error;
    }
  }

  async createEmbeddings (input: string): Promise<number[]> {
    const embeddingResponse = await this.client.embeddings.create({
        model: 'text-embedding-ada-002',
        input,
      })

      await this.calculateCost("createEmbeddings", "text-embedding-ada-002", { prompt: embeddingResponse.usage?.prompt_tokens || 0, completion: 0 });

      return embeddingResponse.data[0].embedding
  }

  async jsonCompletion (input: string, configuration: any): Promise<string> {
    const response = await this.client.chat.completions.create({
      model: 'gpt-3.5-turbo-0125',
      response_format: { type: "json_object" },
      messages: [...configuration.messages,
      { role: "user", content: input }
      ],
      temperature: configuration.temperature
    })

    await this.calculateCost("jsonCompletion", "gpt-3.5-turbo-0125", { prompt: response.usage?.prompt_tokens || 0, completion: response.usage?.completion_tokens || 0 });

    return response.choices[0].message.content ?? '';
  }

  public static create(supabaseClient: DatabaseClient) {
    return new OpenAiAPI(supabaseClient);
  }

}

export default OpenAiAPI;
