import { followupQuestions, completeOffer, saveOffer } from './functions'
import { BotMessage, User } from '@/types/ChatTypes'

export const SEARCH_BOT_USER: User = {
  id: "search",
  username: '🤖 Assistant owo',
  avatar: 'https://api.multiavatar.com/make an search.png',
}

  // BUG: ya un bug dans le botcontext qui fait que on a pas le botMemory a jour quand on appel le next message alors
  // je dois ajouter un mesage entre les 2 le temps que le state s'update 🤦‍♀️
export const SEARCH_BOT_CONFIG = {
  id: 'search',
  user: SEARCH_BOT_USER,
  messages: [
    new BotMessage(SEARCH_BOT_USER, "YESSS -- er à créer ton annonce rapidement et sans prise de tête ! ⚡️"),
    new BotMessage(SEARCH_BOT_USER, "Notre plateforme te permet de publier ce que tu veux ! Objets à donner, services à offrir, artisanat à vendre... et bien d'autres choses encore ! 😊"),
    new BotMessage(SEARCH_BOT_USER, "🌟 Dis-moi, qu'est-ce que tu voudrais proposer à notre super communauté aujourd'hui ? 😊", 'offer_raw'),
    new BotMessage(SEARCH_BOT_USER, "🌀 Laisse-moi réfléchir...je vais te poser des questions pour améliorer ton annonce.", 'ai_offer_followup_question', 'process', followupQuestions),
    new BotMessage(SEARCH_BOT_USER, "✔️ Ça y est, j'ai trouvé ! Alors..."),
    new BotMessage(SEARCH_BOT_USER, "{ai_offer_followup_question}", 'offer_raw_2'),
    new BotMessage(SEARCH_BOT_USER, "S'agit-il d'un prêt, d'une vente ou d'un don ? Ou peut-être les trois ?", 'offer_terms_raw'),
    new BotMessage(SEARCH_BOT_USER, "💭 Je prépare ton annonce...", 'ai_offer_completion', 'process', completeOffer),
    new BotMessage(SEARCH_BOT_USER, "😄 J'ai une proposition pour toi ! Écoute : "),
    new BotMessage(SEARCH_BOT_USER, "{ai_offer_completion}"),
    new BotMessage(SEARCH_BOT_USER, "On enregistre ?", 'save_offer', 'listen-confirm'),
    new BotMessage(SEARCH_BOT_USER, "⏳ Attends quelques instants, pendant que je sauvegarde (ou pas) ta réponse", 'ai_offer_saved', 'process', saveOffer),
    new BotMessage(SEARCH_BOT_USER, "🔆 Voilà, c'est fait"),
    new BotMessage(SEARCH_BOT_USER, "{ai_offer_saved}", '', 'end'),
  ]
}
