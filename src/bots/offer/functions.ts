import { supabase } from "@/config/SupabaseClient"

type followupQuestionsType = { offer_raw: string }
export const followupQuestions = async ({ offer_raw }: followupQuestionsType) => {
    const { data: response } = await supabase.functions.invoke<string>('prompt-ai-followup-questions', {
        body: { content: offer_raw }
    })

    return response ? response : 'rip'
}
type completeOfferType = {
  offer_raw: string;
  ai_offer_followup_question: string;
  offer_raw_2: string;
  offer_terms_raw: string;
}
export const completeOffer = async ({
  offer_raw,
  ai_offer_followup_question,
  offer_raw_2,
  offer_terms_raw,
}: completeOfferType) => {

  const content = `
    user: ${offer_raw} ;
    YOU: ${ai_offer_followup_question} ;
    User: ${offer_raw_2};
    YOU: Cette offre et pour un pret, une vente ou un don? ou toutes ces réponses? ;
    User: ${offer_terms_raw}
  `;

    const { data: response } = await supabase.functions.invoke<string>('prompt-ai-complete-offer', {
        body: { content }
    })

    return response ? response : 'rip'
}

type JsonString = string
type saveOfferType = {save_offer: string; ai_offer_completion: JsonString; }
export const saveOffer = async ({ save_offer, ai_offer_completion }: saveOfferType) => {
  if (!save_offer) {
    return "Ok! Tempis! tu peux cliquer sur le bouton reset en haut pour recommencer!"
  } else {

    const { data: response } = await supabase.functions.invoke<string>('save-offer', {
        body: JSON.parse(ai_offer_completion)
    })

    return response ? "Saved! Tu peux cliquer sur le bouton reset en haut pour recommencer!" : 'rip'
  }
}
