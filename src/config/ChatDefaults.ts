
export const DEFAULT_USERS = [{
  id: "offer",
  username: 'Assistant owo',
  avatar: 'https://api.multiavatar.com/make an offer.png',
}, {
  id: "2",
  username: 'ChatGPT-4',
  avatar: 'https://api.multiavatar.com/gpt-4.png',
}, {
  id: "3",
  username: 'Innovation OnePager Assistant',
  avatar: 'https://api.multiavatar.com/One pager.png',
}]

export const DEFAULT_WELCOME_MESSAGE = (user) => ({
  id: "m-0",
  user,
  content: 'Welcome! Say something :)',
  timestamp: Date.now(),
})

export const DEFAULT_CONVERSATIONS = [{
  id: "offer",
  title: 'Poster une offre',
  user: DEFAULT_USERS[0],
  messages: [],
}]

export const CURRENT_USER = {
  id: "you",
  username: 'You',
  avatar: 'https://api.multiavatar.com/You.png',
}

export const DEFAULT_BOT_CONFIG = {
  'offer' : {
    id: 'offer',
    user: DEFAULT_USERS[0],
    messages: ["What is your name?", "How old are you?", "What's your favorite color?"]
  }
}
