import { followupQuestions, completeOffer, saveOffer } from './functions'
import { BotMessage, User } from '@/types/ChatTypes'

export const OFFER_BOT_USER: User = {
  id: "offer",
  username: '🤖 Assistant owo',
  avatar: 'https://api.multiavatar.com/make an offer.png',
}

  // BUG: ya un bug dans le botcontext qui fait que on a pas le botMemory a jour quand on appel le next message alors
  // je dois ajouter un mesage entre les 2 le temps que le state s'update 🤦‍♀️
export const OFFER_BOT_CONFIG = {
  id: 'offer',
  user: OFFER_BOT_USER,
  messages: [
    new BotMessage(OFFER_BOT_USER, "👋 Coucou ! Je suis l'assistant owo ! 🦾 Mon but est de t'aider à créer ton annonce rapidement et sans prise de tête ! ⚡️"),
    new BotMessage(OFFER_BOT_USER, "Notre plateforme te permet de publier ce que tu veux ! Objets à donner, services à offrir, artisanat à vendre... et bien d'autres choses encore ! 😊"),
    new BotMessage(OFFER_BOT_USER, "🌟 Dis-moi, qu'est-ce que tu voudrais proposer à notre super communauté aujourd'hui ? 😊", 'offer_raw'),
    new BotMessage(OFFER_BOT_USER, "🌀 Laisse-moi réfléchir aux questions à te poser...", 'ai_offer_followup_question', 'process', followupQuestions),
    new BotMessage(OFFER_BOT_USER, "✔️ Ça y est, j'ai trouvé ! Alors..."),
    new BotMessage(OFFER_BOT_USER, "{ai_offer_followup_question}", 'offer_raw_2'),
    new BotMessage(OFFER_BOT_USER, "S'agit-il d'un prêt, d'une vente ou d'un don ? Ou peut-être les trois ?", 'offer_terms_raw'),
    new BotMessage(OFFER_BOT_USER, "💭 Je cherche prépare ton annonce pour toi...", 'ai_offer_completion', 'process', completeOffer),
    new BotMessage(OFFER_BOT_USER, "😄 J'ai trouvé une solution pour toi ! Écoute : "),
    new BotMessage(OFFER_BOT_USER, "{ai_offer_completion}"),
    new BotMessage(OFFER_BOT_USER, "On enregistre ?", 'save_offer', 'listen-confirm'),
    new BotMessage(OFFER_BOT_USER, "⏳ Patientons quelques instants pendant que j'organise ta réponse", 'ai_offer_saved', 'process', saveOffer),
    new BotMessage(OFFER_BOT_USER, "🔆 Voilà, c'est fait"),
    new BotMessage(OFFER_BOT_USER, "{ai_offer_saved}"),
  ]
}
