export const aiBehavior = {
  "messages": [
    {
      "role": "system",
      "content": `
      L'Assistant est un chatbot IA qui aide les utilisateurs à convertir un texte en langage naturel en format JSON. Après que les utilisateurs saisissent leurs informations, vous retournez toujours l'objet JSON directement.
      Je vais te donner des informaitons a propos d'une annonce classée,
      silentieusement tu vas penser a rédiger:
      - un titre en 5 mots ou moins qui résume le contenu de l'offre
      - une courte description suivi des détials en point de forme du contenu de l'offre
      - prends note des termes de l'offre, si c'est service, un don, un pret, une vente, ou plusieur à la fois.
      - prépare une liste de hashtags a la pinterest représentant l'offre. Les hashtags doient etre des catégories,
        des noms, des audiences, des lifestyle, des activitées faites avec ces objets, etc.  gratuit paddlebeard rivière camping
        tu vas ensuite me répondre uniquement un objet JSON validecontenant les infroamtions suivantes:
        \`\`\`
        {"title": [le titre],
        "description": [la description],
        "proposition_terms": {
          "don": boolean[si c'est un don],
          "pret": boolean[si c'est un pret],
          "vente": boolean[si c'est une vente],
          "service": boolean[si c'est un service],
          "location": boolean[si c'est un service],
        },
        price: integer,
        "tags": string[][liste des tags]
      }\`\`\``,
    },
    {
      "role": "user",
      "content": "    user: Des bas bleu ;\n    Advisor: Quelle est la taille des bas bleus que vous proposez ? 🧦\nQuel est le matériau des bas bleus ? 🧶\nQuelle est la tranche d'âge recommandée pour ces bas bleus ? 👶👧👩👵 ;\n    User: XL pour homme, sont fait en cotton et élastane, pour adulte;\n    Advisor: Cette offre et pour un pret, une vente ou un don? ou toutes ces réponses? ;\n    User: un don!"
    },
    {
      "role": "assistant",
      "content": "{\n\"title\": \"Bas bleus XL pour homme\",\n\"description\": \"Offre de don de bas bleus XL pour homme, en cotton et élastane. Convient aux adultes. \\n\\n- Taille : XL\\n- Matériau : Cotton et élastane\\n- Tranche d'âge recommandée : Adulte\\n\\n\",\n\"proposition_terms\": {\n\"don\": true,\n\"pret\": false,\n\"vente\": false,\n\"service\": false,\n \"location\": false\n},\n\"tags\": [\"don\", \"bas\", \"bleu\",  \"XL\", \"homme\", \"vêtements\", \"cotton\"], \n\"price\": 0\n}"
    },
    {
      "role": "user",
      "content": "    user: Une échelle de 8pieds, plable en genre de A  ;\n    Advisor: Quelle est la marque de l'échelle de 8 pieds que vous proposez ? 🏷️\nQuel est le matériau de fabrication de l'échelle ? 🔨\nEst-ce que l'échelle est équipée de pieds antidérapants pour assurer la sécurité ? 🚫👣 ;\n    User: je ne sais pas. Fibre de verre, et non.;\n    Advisor: Cette offre et pour un pret, une vente ou un don? ou toutes ces réponses? ;\n    User: vente a 12.49$"
    },
    {
      "role": "assistant",
      "content": "{\n\"title\": \"Échelle pliable 8 pieds\",\n\"description\": \"Offre de prêt d'une échelle pliable de 8 pieds en fibre de verre, de marque inconnue. Elle n'est pas équipée de pieds antidérapants pour assurer la sécurité. \\n\\n- Échelle de 8 pieds\\n- Marque: Inconnue\\n- Matériau: Fibre de verre\\n- Non équipée de pieds antidérapants\",\n\"proposition_terms\": {\n\"don\": false,\n\"pret\": false,\n\"vente\": true,\n\"service\": false,\n \"location\": false\n},\n\"tags\": [\n\"echelle\",\n\"prêt\",\n\"outils\",\n\"bricolage\",\n\"construction\"\n], \n\"price\": 13\n}"
    },
    {
      "role": "user",
      "content": "    user: une orange en plastique;    Advisor: Quelle est la taille de l'orange en plastique que vous proposez ? 🍊\nQuelle est la couleur de l'orange en plastique ? 🎨\nEst-ce que l'orange en plastique est résistante aux chocs ? 🤔💥\n    User: Elle est de taille d'une orange, de couleur orange et ressemble aune orange..;\n    Advisor: Cette offre et pour un pret, une vente ou un don? ou toutes ces réponses? ;\n    User: vente a 5$"
    },
    {
      "role": "assistant",
      "content": "{\n\"title\": \"Orange en plastique\",\n\"description\": \"Une orange en plastique de taille standard. Elle est de couleur orange et ressemble à une véritable orange. L'orange en plastique est légère et résistante aux chocs. C'est un objet parfait pour la décoration. Je la donne gratuitement.\",\n\"proposition_terms\": {\n\"don\": false,\n\"pret\": false,\n\"vente\": true,\n\"service\": false\n},\n\"tags\": [\"gratuit\", \"décoration\", \"orange\", \"fruit\", \"plastique\"], \n\"price\": 5\n}"
    }
  ],
  "temperature": 0.5,
  "top_p": 0.95,
  "frequency_penalty": 0,
  "presence_penalty": 0,
  "max_tokens": 350,
  "stop": null
}
