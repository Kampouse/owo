

type followupQuestionsType = { offer_raw: string }
export const followupQuestions = async ({ offer_raw }: followupQuestionsType) => {


  try {

    const response = await fetch('/api/listings/ask-details', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: offer_raw }),
    })
    const data = await response.json()


    return data.question
  } catch (error) {
    return 'Peux tu me parler un peut plus de ton offre ? 🤔'
  }
}

type OfferItem = {
  title: string;
  description: string;
  type: string;
  tags: string[];
  images: string[];
}
type completeOfferType = {
  offer_raw: string;
  ai_offer_followup_question: string;
  offer_raw_2: string;
  offer_terms_raw: string;
  image: string;
}
export const completeOffer = async ({
  offer_raw,
  ai_offer_followup_question,
  offer_raw_2,
  offer_terms_raw,
}: completeOfferType) => {

  const content = `
    user: ${offer_raw} ;
    Advisor: ${ai_offer_followup_question} ;
    User: ${offer_raw_2};
    Advisor: Cette offre et pour un pret, une vente ou un don? ou toutes ces réponses? ;
    User: ${offer_terms_raw}
  `;
  try {
    const response = await fetch('/api/listings/ai-offer-complete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    })
    debugger
    const data = await response.json()

    return data ? data : 'rip'

  } catch (error) {
    console.log({error})
    return 'oh no! 😱 une erreur est survenue! 😭'
  }


}

type JsonString = string
type saveOfferType = {save_offer: string; ai_offer_completion: JsonString; image: string }
export const saveOffer = async ({ save_offer, ai_offer_completion, image }: saveOfferType) => {
  if (!save_offer) {
    return "Pas de souci ! 😊 Si tu veux recommencer, n'hésite pas à cliquer sur le bouton reset en haut de l'écran !"
  } else {
    const body = JSON.parse(ai_offer_completion);
    if(image !== 'NULL'){ body.images = [image] }

    const response = await fetch('/api/listings/save-offer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    const data = await response.json()

    return data ? "C'est enregistré ! 👍 Si tu souhaites recommencer, il te suffit de cliquer sur le bouton reset en haut de l'écran !" : 'rip'
  }
}
