(() => {
  "use strict";

  const APP_VERSION = "0.4.1";
  const SWIPE_ANIMATION_MS = 180;
  const UNCATEGORIZED_ID = "uncategorized";

  const MODE_CONFIG = {
    lyrics: {
      id: "lyrics",
      name: "Deviner les paroles",
      gameLabel: "DEVINER LES PAROLES",
      description: "Chanter le début et retrouver la suite",
      color: "#b981ff",
      icon: "lyrics",
      rules: [
        "Les autres lisent le début des paroles et le chantent sur le bon air.",
        "La personne qui tient le téléphone doit retrouver immédiatement la suite affichée en vert.",
        "Aucun indice parlé : seule la chanson doit permettre de reconnaître le morceau."
      ],
      libraryUrl: "./data.json",
      type: "lyrics",
      storage: {
        boxes: "mdb-lyrics-boxes-v1",
        cards: "mdb-lyrics-cards-v1",
        meta: "mdb-library-meta-v1",
        selection: "mdb-lyrics-selection-v2"
      }
    },
    mime: {
      id: "mime",
      name: "Mimer",
      gameLabel: "MIMER",
      description: "Faire deviner une scène uniquement par gestes",
      color: "#ffad45",
      icon: "mime",
      rules: [
        "Les autres voient la consigne affichée sur le téléphone.",
        "Ils doivent la mimer sans parler, sans écrire et sans faire de bruit volontaire.",
        "La personne qui tient le téléphone annonce ce qu’elle pense avoir reconnu."
      ],
      libraryUrl: "./mimes.json",
      type: "mime",
      storage: {
        boxes: "mdb-mime-boxes-v1",
        cards: "mdb-mime-cards-v1",
        meta: "mdb-mime-library-meta-v1",
        selection: "mdb-mime-selection-v1"
      }
    },
    words: {
      id: "words",
      name: "Sans le dire !",
      gameLabel: "SANS LE DIRE !",
      description: "Faire deviner un mot sans prononcer les indices interdits",
      color: "#ff6b9c",
      icon: "words",
      rules: [
        "Les autres décrivent le mot affiché pour le faire deviner à la personne qui tient le téléphone.",
        "Il est interdit de prononcer le mot lui-même, un mot de la même famille ou les mots interdits affichés en rouge.",
        "Dans les réglages du mode, les mots interdits peuvent être masqués pour jouer en version plus libre."
      ],
      libraryUrl: "./words.json",
      type: "words",
      storage: {
        boxes: "mdb-words-boxes-v1",
        cards: "mdb-words-cards-v1",
        meta: "mdb-words-library-meta-v1",
        selection: "mdb-words-selection-v1"
      }
    },
    draw: {
      id: "draw",
      name: "Dessine-moi ça !",
      gameLabel: "DESSINE-MOI ÇA !",
      description: "Faire deviner une consigne en la dessinant sur le téléphone ou sur papier",
      color: "#20c9be",
      icon: "draw",
      rules: [
        "Le dessinateur lit la consigne, puis confirme avec « Picasso est prêt ».",
        "Il choisit « Je gribouille ici » ou « Je massacre une feuille ».",
        "Aucune lettre, aucun mot et aucun chiffre ne doit donner directement la réponse."
      ],
      libraryUrl: "./drawings.json",
      type: "draw",
      storage: {
        boxes: "mdb-draw-boxes-v1",
        cards: "mdb-draw-cards-v1",
        meta: "mdb-draw-library-meta-v1",
        selection: "mdb-draw-selection-v1"
      }
    }
  };

  const MODE_ORDER = ["lyrics", "mime", "words", "draw"];
  const GLOBAL_SETTINGS_KEY = "mdb-global-settings-v2";
  const LEGACY_SETTINGS_KEY = "mdb-settings-v1";
  const FALLBACK_LIBRARIES = {"lyrics":{"schemaVersion":1,"libraryVersion":"2026.06.15-3","updatedAt":"2026-06-15","modeId":"lyrics","modeName":"Deviner les paroles","boxes":[{"id":"disney","name":"Disney"},{"id":"comptines","name":"Comptines et chansons traditionnelles"},{"id":"comedies-musicales","name":"Comédies musicales"},{"id":"variete-francaise","name":"Variété française"},{"id":"tubes-soiree","name":"Tubes rétro et de soirée"},{"id":"pop-rap-francais","name":"Pop et rap français"},{"id":"rock-francais","name":"Rock français"},{"id":"anglais","name":"Anglais — difficulté"},{"id":"uncategorized","name":"Sans catégorie","protected":true}],"cards":[{"id":"lyrics-001","boxId":"disney","active":true,"prompt":"Libérée, délivrée","answer":"Je ne mentirai plus jamais","title":"Libérée, délivrée","source":"La Reine des Neiges","difficulty":"easy"},{"id":"lyrics-002","boxId":"variete-francaise","active":true,"prompt":"Terres brûlées au vent","answer":"Des landes de pierre","title":"Les Lacs du Connemara","source":"Michel Sardou","difficulty":"medium"},{"id":"lyrics-003","boxId":"comptines","active":true,"prompt":"Frère Jacques, Frère Jacques","answer":"Dormez-vous ? Dormez-vous ?","title":"Frère Jacques","source":"Comptine","difficulty":"easy"},{"id":"lyrics-004","boxId":"variete-francaise","active":true,"prompt":"Je te donne toutes mes différences","answer":"Tous ces défauts qui sont autant de chances","title":"Je te donne","source":"Jean-Jacques Goldman & Michael Jones","difficulty":"medium"},{"id":"lyrics-013","boxId":"pop-rap-francais","active":true,"prompt":"Dites-moi d’où il vient","answer":"Enfin, je saurai où je vais","title":"Papaoutai","source":"Stromae","difficulty":"medium"},{"id":"lyrics-005","boxId":"disney","active":true,"prompt":"Ce rêve bleu","answer":"Je n’y crois pas, c’est merveilleux","title":"Ce rêve bleu","source":"Aladdin","difficulty":"easy"},{"id":"lyrics-006","boxId":"rock-francais","active":true,"prompt":"J’ai demandé à la lune","answer":"Et le soleil ne le sait pas","title":"J’ai demandé à la lune","source":"Indochine","difficulty":"medium"},{"id":"lyrics-007","boxId":"comptines","active":true,"prompt":"Une souris verte","answer":"Qui courait dans l’herbe","title":"Une souris verte","source":"Comptine","difficulty":"easy"},{"id":"lyrics-008","boxId":"variete-francaise","active":true,"prompt":"J’irai chercher ton cœur","answer":"Si tu l’emportes ailleurs","title":"Pour que tu m’aimes encore","source":"Céline Dion","difficulty":"medium"},{"id":"lyrics-009","boxId":"disney","active":true,"prompt":"Hakuna Matata","answer":"Quelle phrase magnifique","title":"Hakuna Matata","source":"Le Roi Lion","difficulty":"easy"},{"id":"lyrics-014","boxId":"variete-francaise","active":true,"prompt":"J’irai au bout de mes rêves","answer":"Où la raison s’achève","title":"Au bout de mes rêves","source":"Jean-Jacques Goldman","difficulty":"medium"},{"id":"lyrics-015","boxId":"comptines","active":true,"prompt":"Au clair de la lune","answer":"Mon ami Pierrot","title":"Au clair de la lune","source":"Comptine","difficulty":"easy"},{"id":"lyrics-016","boxId":"variete-francaise","active":true,"prompt":"Je vais t’aimer comme on ne t’a jamais aimée","answer":"Je vais t’aimer","title":"Je vais t’aimer","source":"Michel Sardou","difficulty":"medium"},{"id":"lyrics-017","boxId":"comedies-musicales","active":true,"prompt":"Il est venu le temps des cathédrales","answer":"Le monde est entré dans un nouveau millénaire","title":"Le Temps des cathédrales","source":"Notre-Dame de Paris","difficulty":"medium"},{"id":"lyrics-018","boxId":"tubes-soiree","active":true,"prompt":"Voyage, voyage","answer":"Plus loin que la nuit et le jour","title":"Voyage, voyage","source":"Desireless","difficulty":"easy"},{"id":"lyrics-010","boxId":"comedies-musicales","active":true,"prompt":"Je voue mes nuits à l’assasymphonie","answer":"Aux requiems anatomiques","title":"L’Assasymphonie","source":"Mozart, l’Opéra Rock","difficulty":"medium"},{"id":"lyrics-012","boxId":"variete-francaise","active":true,"prompt":"Aux Champs-Élysées, aux Champs-Élysées","answer":"Au soleil, sous la pluie","title":"Les Champs-Élysées","source":"Joe Dassin","difficulty":"medium"},{"id":"lyrics-019","boxId":"disney","active":true,"prompt":"Il en faut peu pour être heureux","answer":"Vraiment très peu pour être heureux","title":"Il en faut peu pour être heureux","source":"Le Livre de la Jungle","difficulty":"easy"},{"id":"lyrics-011","boxId":"comedies-musicales","active":true,"prompt":"Tatoue-moi sur ta peau","answer":"À l’encre de tes mots","title":"Tatoue-moi","source":"Mozart, l’Opéra Rock","difficulty":"medium"},{"id":"lyrics-020","boxId":"tubes-soiree","active":true,"prompt":"Résiste, prouve que tu existes","answer":"Cherche ton bonheur partout, va","title":"Résiste","source":"France Gall","difficulty":"easy"},{"id":"lyrics-021","boxId":"comptines","active":true,"prompt":"Promenons-nous dans les bois","answer":"Pendant que le loup n’y est pas","title":"Promenons-nous dans les bois","source":"Comptine","difficulty":"easy"},{"id":"lyrics-022","boxId":"tubes-soiree","active":true,"prompt":"Ne la laisse pas tomber","answer":"Elle est si fragile","title":"Femme libérée","source":"Cookie Dingler","difficulty":"easy"},{"id":"lyrics-023","boxId":"variete-francaise","active":true,"prompt":"Je suis malade","answer":"Complètement malade","title":"Je suis malade","source":"Serge Lama","difficulty":"medium"},{"id":"lyrics-024","boxId":"variete-francaise","active":true,"prompt":"J’irai où tu iras","answer":"Mon pays sera toi","title":"J’irai où tu iras","source":"Céline Dion & Jean-Jacques Goldman","difficulty":"medium"},{"id":"lyrics-025","boxId":"comptines","active":true,"prompt":"Savez-vous planter les choux","answer":"À la mode, à la mode","title":"Savez-vous planter les choux","source":"Comptine","difficulty":"easy"},{"id":"lyrics-026","boxId":"variete-francaise","active":true,"prompt":"Quand la musique est bonne","answer":"Quand la musique donne","title":"Quand la musique est bonne","source":"Jean-Jacques Goldman","difficulty":"medium"},{"id":"lyrics-027","boxId":"pop-rap-francais","active":true,"prompt":"Jeune demoiselle recherche un mec mortel","answer":"Un mec qui pourrait me donner des ailes","title":"Jeune demoiselle","source":"Diam’s","difficulty":"medium"},{"id":"lyrics-028","boxId":"pop-rap-francais","active":true,"prompt":"Dans la vallée, oh oh","answer":"De Dana, la li la la","title":"La Tribu de Dana","source":"Manau","difficulty":"medium"},{"id":"lyrics-029","boxId":"comptines","active":true,"prompt":"Sur le pont d’Avignon","answer":"On y danse, on y danse","title":"Sur le pont d’Avignon","source":"Comptine","difficulty":"easy"},{"id":"lyrics-030","boxId":"comedies-musicales","active":true,"prompt":"Je fais de toi mon essentiel","answer":"Tu me fais naître parmi les hommes","title":"Mon essentiel","source":"Emmanuel Moire / Le Roi Soleil","difficulty":"medium"},{"id":"lyrics-031","boxId":"pop-rap-francais","active":true,"prompt":"Elle répondait au nom de Bella","answer":"Les gens du coin ne voulaient pas la lâcher","title":"Bella","source":"Gims","difficulty":"medium"},{"id":"lyrics-032","boxId":"rock-francais","active":true,"prompt":"Le vent l’emportera","answer":"Tout disparaîtra","title":"Le vent nous portera","source":"Noir Désir","difficulty":"medium"},{"id":"lyrics-033","boxId":"comptines","active":true,"prompt":"Meunier, tu dors","answer":"Ton moulin va trop vite","title":"Meunier, tu dors","source":"Comptine","difficulty":"easy"},{"id":"lyrics-034","boxId":"variete-francaise","active":true,"prompt":"Et j’ai crié, crié, Aline","answer":"Pour qu’elle revienne","title":"Aline","source":"Christophe","difficulty":"medium"},{"id":"lyrics-035","boxId":"comedies-musicales","active":true,"prompt":"Vivre à en crever","answer":"Pour décrocher les étoiles","title":"Vivre à en crever","source":"Mozart, l’Opéra Rock","difficulty":"medium"},{"id":"lyrics-036","boxId":"disney","active":true,"prompt":"Tout le monde veut devenir un cat","answer":"Parce qu’un chat quand il est cat","title":"Tout le monde veut devenir un cat","source":"Les Aristochats","difficulty":"easy"},{"id":"lyrics-037","boxId":"pop-rap-francais","active":true,"prompt":"J’en ai marre de ceux qui pleurent","answer":"Qui ne roulent qu’à deux à l’heure","title":"J’en ai marre !","source":"Alizée","difficulty":"medium"},{"id":"lyrics-038","boxId":"rock-francais","active":true,"prompt":"Égaré dans la vallée infernale","answer":"Le héros s’appelle Bob Morane","title":"L’Aventurier","source":"Indochine","difficulty":"medium"},{"id":"lyrics-039","boxId":"comptines","active":true,"prompt":"Ainsi font, font, font","answer":"Les petites marionnettes","title":"Ainsi font, font, font","source":"Comptine","difficulty":"easy"},{"id":"lyrics-040","boxId":"pop-rap-francais","active":true,"prompt":"Je remue le ciel, le jour, la nuit","answer":"Je danse avec le vent, la pluie","title":"Dernière danse","source":"Indila","difficulty":"medium"},{"id":"lyrics-041","boxId":"variete-francaise","active":true,"prompt":"Non, je ne regrette rien","answer":"Ni le bien qu’on m’a fait","title":"Non, je ne regrette rien","source":"Édith Piaf","difficulty":"medium"},{"id":"lyrics-042","boxId":"comptines","active":true,"prompt":"Il était un petit navire","answer":"Qui n’avait jamais navigué","title":"Il était un petit navire","source":"Comptine","difficulty":"easy"},{"id":"lyrics-043","boxId":"pop-rap-francais","active":true,"prompt":"Toi plus moi, plus eux","answer":"Plus tous ceux qui le veulent","title":"Toi + Moi","source":"Grégoire","difficulty":"medium"},{"id":"lyrics-044","boxId":"tubes-soiree","active":true,"prompt":"Alexandrie, Alexandra","answer":"Alexandrie où l’amour danse avec la nuit","title":"Alexandrie Alexandra","source":"Claude François","difficulty":"easy"},{"id":"lyrics-045","boxId":"pop-rap-francais","active":true,"prompt":"On écrit sur les murs","answer":"Le nom de ceux qu’on aime","title":"On écrit sur les murs","source":"Demis Roussos / Kids United","difficulty":"medium"},{"id":"lyrics-046","boxId":"variete-francaise","active":true,"prompt":"Deux étrangers au bout du monde","answer":"Si différents","title":"Manhattan-Kaboul","source":"Renaud & Axelle Red","difficulty":"medium"},{"id":"lyrics-047","boxId":"comptines","active":true,"prompt":"Il était un petit homme","answer":"Pirouette, cacahuète","title":"Pirouette Cacahuète","source":"Comptine","difficulty":"easy"},{"id":"lyrics-048","boxId":"variete-francaise","active":true,"prompt":"Pour un flirt avec toi","answer":"Je ferais n’importe quoi","title":"Pour un flirt","source":"Michel Delpech","difficulty":"medium"},{"id":"lyrics-049","boxId":"variete-francaise","active":true,"prompt":"Envole-moi, envole-moi","answer":"Loin de cette fatalité","title":"Envole-moi","source":"Jean-Jacques Goldman","difficulty":"medium"},{"id":"lyrics-050","boxId":"comptines","active":true,"prompt":"Une poule sur un mur","answer":"Qui picote du pain dur","title":"Une poule sur un mur","source":"Comptine","difficulty":"easy"},{"id":"lyrics-051","boxId":"comedies-musicales","active":true,"prompt":"Belle","answer":"C’est un mot qu’on dirait inventé pour elle","title":"Belle","source":"Notre-Dame de Paris","difficulty":"medium"},{"id":"lyrics-052","boxId":"variete-francaise","active":true,"prompt":"Là-bas, tout est neuf et tout est sauvage","answer":"Libre continent sans grillage","title":"Là-bas","source":"Jean-Jacques Goldman & Sirima","difficulty":"medium"},{"id":"lyrics-053","boxId":"tubes-soiree","active":true,"prompt":"Les démons de minuit","answer":"M’entraînent jusqu’à l’insomnie","title":"Les Démons de minuit","source":"Images","difficulty":"easy"},{"id":"lyrics-054","boxId":"pop-rap-francais","active":true,"prompt":"Est-ce que tu m’aimes ?","answer":"J’sais pas si je t’aime","title":"Est-ce que tu m’aimes ?","source":"Gims","difficulty":"medium"},{"id":"lyrics-055","boxId":"comptines","active":true,"prompt":"Alouette, gentille alouette","answer":"Alouette, je te plumerai","title":"Alouette","source":"Comptine","difficulty":"easy"},{"id":"lyrics-056","boxId":"tubes-soiree","active":true,"prompt":"Et dans ces soirées-là","answer":"On drague, on branche","title":"Ces soirées-là","source":"Yannick","difficulty":"easy"},{"id":"lyrics-057","boxId":"variete-francaise","active":true,"prompt":"Mes chers parents, je pars","answer":"Je vous aime, mais je pars","title":"Je vole","source":"Michel Sardou","difficulty":"medium"},{"id":"lyrics-058","boxId":"variete-francaise","active":true,"prompt":"La bohème, la bohème","answer":"Ça voulait dire on est heureux","title":"La Bohème","source":"Charles Aznavour","difficulty":"medium"},{"id":"lyrics-059","boxId":"comptines","active":true,"prompt":"À la pêche aux moules","answer":"Je ne veux plus y aller, maman","title":"À la pêche aux moules","source":"Comptine","difficulty":"easy"},{"id":"lyrics-060","boxId":"tubes-soiree","active":true,"prompt":"Le lundi au soleil","answer":"C’est une chose qu’on n’aura jamais","title":"Le lundi au soleil","source":"Claude François","difficulty":"easy"},{"id":"lyrics-061","boxId":"rock-francais","active":true,"prompt":"Un autre monde","answer":"Où la Terre serait ronde","title":"Un autre monde","source":"Téléphone","difficulty":"medium"},{"id":"lyrics-062","boxId":"rock-francais","active":true,"prompt":"À la faveur de l’automne","answer":"Revient cette douce mélancolie","title":"À la faveur de l’automne","source":"Tété","difficulty":"medium"},{"id":"lyrics-063","boxId":"variete-francaise","active":true,"prompt":"Il suffira d’une étincelle","answer":"D’un rien, d’un geste","title":"Allumer le feu","source":"Johnny Hallyday","difficulty":"medium"},{"id":"lyrics-064","boxId":"pop-rap-francais","active":true,"prompt":"Je veux","answer":"D’l’amour, d’la joie, de la bonne humeur","title":"Je veux","source":"Zaz","difficulty":"medium"},{"id":"lyrics-065","boxId":"comptines","active":true,"prompt":"Dansons la capucine","answer":"Y a pas de pain chez nous","title":"Dansons la capucine","source":"Comptine","difficulty":"easy"},{"id":"lyrics-066","boxId":"pop-rap-francais","active":true,"prompt":"Tu étais formidable","answer":"J’étais fort minable","title":"Formidable","source":"Stromae","difficulty":"medium"},{"id":"lyrics-067","boxId":"tubes-soiree","active":true,"prompt":"On va s’aimer","answer":"Sur une étoile ou sur un oreiller","title":"On va s’aimer","source":"Gilbert Montagné","difficulty":"easy"},{"id":"lyrics-068","boxId":"tubes-soiree","active":true,"prompt":"Sous les sunlights des tropiques","answer":"L’amour se raconte en musique","title":"Les Sunlights des tropiques","source":"Gilbert Montagné","difficulty":"easy"},{"id":"lyrics-069","boxId":"rock-francais","active":true,"prompt":"Cendrillon, pour ses vingt ans","answer":"Est la plus jolie des enfants","title":"Cendrillon","source":"Téléphone","difficulty":"medium"},{"id":"lyrics-070","boxId":"tubes-soiree","active":true,"prompt":"J’ai encore rêvé d’elle","answer":"C’est bête, elle n’a rien fait pour ça","title":"J’ai encore rêvé d’elle","source":"Il était une fois","difficulty":"easy"},{"id":"lyrics-071","boxId":"variete-francaise","active":true,"prompt":"Les mots bleus","answer":"Les mots qu’on dit avec les yeux","title":"Les Mots bleus","source":"Christophe","difficulty":"medium"},{"id":"lyrics-072","boxId":"variete-francaise","active":true,"prompt":"Emmenez-moi au bout de la Terre","answer":"Emmenez-moi au pays des merveilles","title":"Emmenez-moi","source":"Charles Aznavour","difficulty":"medium"},{"id":"lyrics-073","boxId":"tubes-soiree","active":true,"prompt":"Partenaire particulier","answer":"Cherche partenaire particulière","title":"Partenaire particulier","source":"Partenaire Particulier","difficulty":"easy"},{"id":"lyrics-074","boxId":"disney","active":true,"prompt":"Sous l’océan, sous l’océan","answer":"Doudou, c’est bien mieux","title":"Sous l’océan","source":"La Petite Sirène","difficulty":"easy"},{"id":"lyrics-075","boxId":"disney","active":true,"prompt":"Prince Ali, oui, c’est bien lui","answer":"Ali Ababwa","title":"Prince Ali","source":"Aladdin","difficulty":"easy"},{"id":"lyrics-076","boxId":"pop-rap-francais","active":true,"prompt":"Mon amour, dis-moi à quoi tu penses","answer":"Si tout ça a un sens","title":"Mon amour","source":"Slimane","difficulty":"medium"},{"id":"lyrics-077","boxId":"pop-rap-francais","active":true,"prompt":"Il fait toujours beau au-dessus des nuages","answer":"Mais moi, si j’étais un oiseau","title":"La Symphonie des éclairs","source":"Zaho de Sagazan","difficulty":"medium"},{"id":"lyrics-078","boxId":"pop-rap-francais","active":true,"prompt":"Bande organisée","answer":"Personne peut nous canaliser","title":"Bande organisée","source":"Jul et collectif 13 Organisé","difficulty":"medium"},{"id":"lyrics-079","boxId":"pop-rap-francais","active":true,"prompt":"Il faudrait tout oublier","answer":"Pour y croire","title":"Tout oublier","source":"Angèle & Roméo Elvis","difficulty":"medium"},{"id":"lyrics-080","boxId":"pop-rap-francais","active":true,"prompt":"Balance ton quoi","answer":"Même si tu parles mal des filles","title":"Balance ton quoi","source":"Angèle","difficulty":"medium"},{"id":"lyrics-081","boxId":"pop-rap-francais","active":true,"prompt":"Y a pas moyen, Djadja","answer":"J’suis pas ta catin, Djadja","title":"Djadja","source":"Aya Nakamura","difficulty":"medium"},{"id":"lyrics-082","boxId":"variete-francaise","active":true,"prompt":"On ne change pas","answer":"On met juste les costumes d’autres sur soi","title":"On ne change pas","source":"Céline Dion","difficulty":"medium"},{"id":"lyrics-083","boxId":"variete-francaise","active":true,"prompt":"Et si tu crois que j’ai eu peur","answer":"C’est faux","title":"Sous le vent","source":"Garou & Céline Dion","difficulty":"medium"},{"id":"lyrics-084","boxId":"pop-rap-francais","active":true,"prompt":"Je danse le Mia","answer":"Pas de pacotille","title":"Je danse le Mia","source":"IAM","difficulty":"medium"},{"id":"lyrics-085","boxId":"tubes-soiree","active":true,"prompt":"Et tu chantes, chantes, chantes","answer":"Ce refrain qui te plaît","title":"Nuit de folie","source":"Début de Soirée","difficulty":"easy"},{"id":"lyrics-086","boxId":"disney","active":true,"prompt":"Tu crois que la Terre","answer":"T’appartient tout entière","title":"L’Air du vent","source":"Pocahontas","difficulty":"easy"},{"id":"lyrics-087","boxId":"disney","active":true,"prompt":"Je donnerais tout ce que j’ai","answer":"Pour partir d’ici","title":"Partir là-bas","source":"La Petite Sirène","difficulty":"easy"},{"id":"lyrics-088","boxId":"disney","active":true,"prompt":"Attaquons l’exercice","answer":"Pour défaire les Huns","title":"Comme un homme","source":"Mulan","difficulty":"easy"},{"id":"lyrics-089","boxId":"anglais","active":true,"prompt":"Mamma Mia","answer":"Here I go again","title":"Mamma Mia","source":"ABBA","difficulty":"hard"},{"id":"lyrics-090","boxId":"anglais","active":true,"prompt":"You are the Dancing Queen","answer":"Young and sweet, only seventeen","title":"Dancing Queen","source":"ABBA","difficulty":"hard"},{"id":"lyrics-091","boxId":"anglais","active":true,"prompt":"Is this the real life?","answer":"Is this just fantasy?","title":"Bohemian Rhapsody","source":"Queen","difficulty":"hard"},{"id":"lyrics-092","boxId":"anglais","active":true,"prompt":"We are the champions","answer":"My friends","title":"We Are the Champions","source":"Queen","difficulty":"hard"},{"id":"lyrics-093","boxId":"anglais","active":true,"prompt":"Billie Jean is not my lover","answer":"She’s just a girl who claims that I am the one","title":"Billie Jean","source":"Michael Jackson","difficulty":"hard"},{"id":"lyrics-094","boxId":"anglais","active":true,"prompt":"’Cause this is thriller, thriller night","answer":"And no one’s gonna save you","title":"Thriller","source":"Michael Jackson","difficulty":"hard"},{"id":"lyrics-095","boxId":"anglais","active":true,"prompt":"Beat it, beat it","answer":"No one wants to be defeated","title":"Beat It","source":"Michael Jackson","difficulty":"hard"},{"id":"lyrics-096","boxId":"anglais","active":true,"prompt":"You’ve been hit by","answer":"You’ve been struck by a smooth criminal","title":"Smooth Criminal","source":"Michael Jackson","difficulty":"hard"},{"id":"lyrics-097","boxId":"anglais","active":true,"prompt":"Oops, I did it again","answer":"I played with your heart","title":"Oops!... I Did It Again","source":"Britney Spears","difficulty":"hard"},{"id":"lyrics-098","boxId":"anglais","active":true,"prompt":"My loneliness is killing me","answer":"I must confess I still believe","title":"...Baby One More Time","source":"Britney Spears","difficulty":"hard"},{"id":"lyrics-099","boxId":"anglais","active":true,"prompt":"With a taste of your lips","answer":"I’m on a ride","title":"Toxic","source":"Britney Spears","difficulty":"hard"},{"id":"lyrics-100","boxId":"anglais","active":true,"prompt":"Umbrella, ella, ella","answer":"Eh, eh, eh","title":"Umbrella","source":"Rihanna","difficulty":"hard"},{"id":"lyrics-101","boxId":"anglais","active":true,"prompt":"Rah-rah-ah-ah-ah","answer":"Roma-roma-ma","title":"Bad Romance","source":"Lady Gaga","difficulty":"hard"},{"id":"lyrics-102","boxId":"anglais","active":true,"prompt":"Can’t read my, can’t read my","answer":"No, he can’t read my poker face","title":"Poker Face","source":"Lady Gaga","difficulty":"hard"},{"id":"lyrics-103","boxId":"anglais","active":true,"prompt":"I kissed a girl","answer":"And I liked it","title":"I Kissed a Girl","source":"Katy Perry","difficulty":"hard"},{"id":"lyrics-104","boxId":"anglais","active":true,"prompt":"I got the eye of the tiger","answer":"A fighter, dancing through the fire","title":"Roar","source":"Katy Perry","difficulty":"hard"},{"id":"lyrics-105","boxId":"anglais","active":true,"prompt":"Hello from the other side","answer":"I must’ve called a thousand times","title":"Hello","source":"Adele","difficulty":"hard"},{"id":"lyrics-106","boxId":"anglais","active":true,"prompt":"Never mind, I’ll find","answer":"Someone like you","title":"Someone Like You","source":"Adele","difficulty":"hard"},{"id":"lyrics-107","boxId":"anglais","active":true,"prompt":"The club isn’t the best place","answer":"To find a lover","title":"Shape of You","source":"Ed Sheeran","difficulty":"hard"},{"id":"lyrics-108","boxId":"anglais","active":true,"prompt":"I found a love for me","answer":"Darling, just dive right in","title":"Perfect","source":"Ed Sheeran","difficulty":"hard"},{"id":"lyrics-109","boxId":"anglais","active":true,"prompt":"Hey, I just met you","answer":"And this is crazy","title":"Call Me Maybe","source":"Carly Rae Jepsen","difficulty":"hard"},{"id":"lyrics-110","boxId":"anglais","active":true,"prompt":"I can buy myself flowers","answer":"Write my name in the sand","title":"Flowers","source":"Miley Cyrus","difficulty":"hard"},{"id":"lyrics-111","boxId":"anglais","active":true,"prompt":"You know it’s not the same","answer":"As it was","title":"As It Was","source":"Harry Styles","difficulty":"hard"},{"id":"lyrics-112","boxId":"anglais","active":true,"prompt":"If you don’t wanna see me","answer":"Dancing with somebody","title":"Don’t Start Now","source":"Dua Lipa","difficulty":"hard"},{"id":"lyrics-113","boxId":"anglais","active":true,"prompt":"I used to rule the world","answer":"Seas would rise when I gave the word","title":"Viva la Vida","source":"Coldplay","difficulty":"hard"},{"id":"lyrics-114","boxId":"anglais","active":true,"prompt":"Look at the stars","answer":"Look how they shine for you","title":"Yellow","source":"Coldplay","difficulty":"hard"},{"id":"lyrics-115","boxId":"anglais","active":true,"prompt":"With the lights out","answer":"It’s less dangerous","title":"Smells Like Teen Spirit","source":"Nirvana","difficulty":"hard"},{"id":"lyrics-116","boxId":"anglais","active":true,"prompt":"Wake me up inside","answer":"I can’t wake up","title":"Bring Me to Life","source":"Evanescence","difficulty":"hard"},{"id":"lyrics-117","boxId":"anglais","active":true,"prompt":"I tried so hard","answer":"And got so far","title":"In the End","source":"Linkin Park","difficulty":"hard"},{"id":"lyrics-118","boxId":"anglais","active":true,"prompt":"I’m a Barbie girl","answer":"In the Barbie world","title":"Barbie Girl","source":"Aqua","difficulty":"hard"},{"id":"lyrics-119","boxId":"anglais","active":true,"prompt":"Tell me why","answer":"Ain’t nothing but a heartache","title":"I Want It That Way","source":"Backstreet Boys","difficulty":"hard"},{"id":"lyrics-120","boxId":"anglais","active":true,"prompt":"Everybody, yeah","answer":"Rock your body, yeah","title":"Everybody (Backstreet’s Back)","source":"Backstreet Boys","difficulty":"hard"},{"id":"lyrics-121","boxId":"anglais","active":true,"prompt":"Because I’m happy","answer":"Clap along if you feel like a room without a roof","title":"Happy","source":"Pharrell Williams","difficulty":"hard"},{"id":"lyrics-122","boxId":"anglais","active":true,"prompt":"I’m off the deep end","answer":"Watch as I dive in","title":"Shallow","source":"Lady Gaga & Bradley Cooper","difficulty":"hard"},{"id":"lyrics-123","boxId":"anglais","active":true,"prompt":"Never gonna give you up","answer":"Never gonna let you down","title":"Never Gonna Give You Up","source":"Rick Astley","difficulty":"hard"},{"id":"lyrics-124","active":true,"prompt":"Un crocodile s'en allant à la guerre","answer":"Disait au revoir à ses petits enfants","title":"Ah ! les crocodiles","source":"Comptine","boxId":"comptines","difficulty":"easy"},{"id":"lyrics-125","active":true,"prompt":"Il court, il court, le furet","answer":"Le furet du bois, mesdames","title":"Il court, il court, le furet","source":"Comptine","boxId":"comptines","difficulty":"easy"},{"id":"lyrics-126","active":true,"prompt":"À la claire fontaine","answer":"M'en allant promener","title":"À la claire fontaine","source":"Chanson traditionnelle","boxId":"comptines","difficulty":"easy"},{"id":"lyrics-127","active":true,"prompt":"Malbrough s'en va-t-en guerre","answer":"Mironton, mironton, mirontaine","title":"Malbrough s'en va-t-en guerre","source":"Chanson traditionnelle","boxId":"comptines","difficulty":"easy"},{"id":"lyrics-128","active":true,"prompt":"Cadet Rousselle a trois maisons","answer":"Qui n'ont ni poutres ni chevrons","title":"Cadet Rousselle","source":"Chanson traditionnelle","boxId":"comptines","difficulty":"easy"},{"id":"lyrics-129","active":true,"prompt":"Auprès de ma blonde","answer":"Qu'il fait bon, fait bon, fait bon","title":"Auprès de ma blonde","source":"Chanson traditionnelle","boxId":"comptines","difficulty":"easy"},{"id":"lyrics-130","active":true,"prompt":"Nous n'irons plus au bois","answer":"Les lauriers sont coupés","title":"Nous n'irons plus au bois","source":"Chanson traditionnelle","boxId":"comptines","difficulty":"easy"},{"id":"lyrics-131","active":true,"prompt":"J'ai descendu dans mon jardin","answer":"Pour y cueillir du romarin","title":"Gentil coquelicot","source":"Chanson traditionnelle","boxId":"comptines","difficulty":"easy"},{"id":"lyrics-132","active":true,"prompt":"C'est la mère Michel qui a perdu son chat","answer":"Qui crie par la fenêtre à qui le lui rendra","title":"La Mère Michel","source":"Comptine","boxId":"comptines","difficulty":"easy"},{"id":"lyrics-133","active":true,"prompt":"Il pleut, il pleut, bergère","answer":"Presse tes blancs moutons","title":"Il pleut, il pleut, bergère","source":"Chanson traditionnelle","boxId":"comptines","difficulty":"easy"},{"id":"lyrics-134","active":true,"prompt":"Mon beau sapin, roi des forêts","answer":"Que j'aime ta verdure","title":"Mon beau sapin","source":"Chanson traditionnelle","boxId":"comptines","difficulty":"easy"},{"id":"lyrics-135","active":true,"prompt":"Au feu, les pompiers","answer":"La maison qui brûle","title":"Au feu, les pompiers","source":"Comptine","boxId":"comptines","difficulty":"easy"},{"id":"lyrics-136","active":true,"prompt":"Il était un p'tit homme","answer":"Appelé Guilleri","title":"Compère Guilleri","source":"Chanson traditionnelle","boxId":"comptines","difficulty":"easy"},{"id":"lyrics-137","active":true,"prompt":"Pomme de reinette et pomme d'api","answer":"Tapis, tapis rouge","title":"Pomme de reinette","source":"Comptine","boxId":"comptines","difficulty":"easy"},{"id":"lyrics-138","active":true,"prompt":"Un, deux, trois, nous irons au bois","answer":"Quatre, cinq, six, cueillir des cerises","title":"Un, deux, trois, nous irons au bois","source":"Comptine","boxId":"comptines","difficulty":"easy"},{"id":"lyrics-139","active":true,"prompt":"Twinkle, twinkle, little star","answer":"How I wonder what you are","title":"Twinkle, Twinkle, Little Star","source":"Traditional","boxId":"anglais","difficulty":"hard"},{"id":"lyrics-140","active":true,"prompt":"Row, row, row your boat","answer":"Gently down the stream","title":"Row, Row, Row Your Boat","source":"Traditional","boxId":"anglais","difficulty":"hard"},{"id":"lyrics-141","active":true,"prompt":"Old MacDonald had a farm","answer":"E-I-E-I-O","title":"Old MacDonald Had a Farm","source":"Traditional","boxId":"anglais","difficulty":"hard"},{"id":"lyrics-142","active":true,"prompt":"London Bridge is falling down","answer":"Falling down, falling down","title":"London Bridge Is Falling Down","source":"Traditional","boxId":"anglais","difficulty":"hard"},{"id":"lyrics-143","active":true,"prompt":"Mary had a little lamb","answer":"Its fleece was white as snow","title":"Mary Had a Little Lamb","source":"Traditional","boxId":"anglais","difficulty":"hard"}]},"mime":{"schemaVersion":1,"libraryVersion":"2026.06.15-1","updatedAt":"2026-06-15","modeId":"mime","modeName":"Mimer","boxes":[{"id":"animals","name":"Animaux"},{"id":"jobs","name":"Métiers"},{"id":"sports","name":"Sports et loisirs"},{"id":"daily","name":"Actions du quotidien"},{"id":"emotions","name":"Réactions et émotions"},{"id":"characters","name":"Personnages et univers connus"},{"id":"objects","name":"Objets et machines"},{"id":"absurd","name":"Situations absurdes"},{"id":"expressions","name":"Expressions et situations à interpréter"},{"id":"parties","name":"Soirées et fêtes"},{"id":"tech","name":"Galères technologiques"},{"id":"transport","name":"Transports et voyages"},{"id":"food","name":"Cuisine et nourriture"},{"id":"awkward","name":"Situations gênantes et catastrophes"},{"id":"uncategorized","name":"Sans catégorie","protected":true}],"cards":[{"id":"mime-001","boxId":"animals","active":true,"prompt":"Un éléphant","difficulty":"easy"},{"id":"mime-002","boxId":"animals","active":true,"prompt":"Un singe","difficulty":"easy"},{"id":"mime-003","boxId":"animals","active":true,"prompt":"Un kangourou","difficulty":"easy"},{"id":"mime-004","boxId":"animals","active":true,"prompt":"Un serpent","difficulty":"easy"},{"id":"mime-005","boxId":"animals","active":true,"prompt":"Un pingouin","difficulty":"easy"},{"id":"mime-006","boxId":"animals","active":true,"prompt":"Une poule","difficulty":"easy"},{"id":"mime-007","boxId":"animals","active":true,"prompt":"Un poisson","difficulty":"easy"},{"id":"mime-008","boxId":"animals","active":true,"prompt":"Un gorille qui se frappe la poitrine","difficulty":"easy"},{"id":"mime-009","boxId":"animals","active":true,"prompt":"Un canard qui marche en se dandinant","difficulty":"easy"},{"id":"mime-010","boxId":"animals","active":true,"prompt":"Un lapin qui mange une carotte","difficulty":"easy"},{"id":"mime-011","boxId":"animals","active":true,"prompt":"Un chien qui réclame une friandise","difficulty":"easy"},{"id":"mime-012","boxId":"animals","active":true,"prompt":"Un chat qui joue avec une pelote de laine","difficulty":"easy"},{"id":"mime-013","boxId":"animals","active":true,"prompt":"Un paresseux","difficulty":"medium"},{"id":"mime-014","boxId":"animals","active":true,"prompt":"Un crabe","difficulty":"medium"},{"id":"mime-015","boxId":"animals","active":true,"prompt":"Un flamant rose","difficulty":"medium"},{"id":"mime-016","boxId":"animals","active":true,"prompt":"Une grenouille","difficulty":"medium"},{"id":"mime-017","boxId":"animals","active":true,"prompt":"Un écureuil","difficulty":"medium"},{"id":"mime-018","boxId":"animals","active":true,"prompt":"Un cheval qui galope","difficulty":"medium"},{"id":"mime-019","boxId":"animals","active":true,"prompt":"Un chat qui fait sa toilette","difficulty":"medium"},{"id":"mime-020","boxId":"animals","active":true,"prompt":"Un lama qui crache","difficulty":"medium"},{"id":"mime-021","boxId":"animals","active":true,"prompt":"Un hérisson qui se met en boule","difficulty":"medium"},{"id":"mime-022","boxId":"animals","active":true,"prompt":"Un coq qui réveille tout le monde","difficulty":"medium"},{"id":"mime-023","boxId":"animals","active":true,"prompt":"Une loutre qui casse un coquillage","difficulty":"medium"},{"id":"mime-024","boxId":"animals","active":true,"prompt":"Un cheval qui refuse d’avancer","difficulty":"medium"},{"id":"mime-025","boxId":"animals","active":true,"prompt":"Un chien qui poursuit sa queue","difficulty":"hard"},{"id":"mime-026","boxId":"animals","active":true,"prompt":"Un paon qui fait la roue","difficulty":"hard"},{"id":"mime-027","boxId":"animals","active":true,"prompt":"Une chauve-souris suspendue la tête en bas","difficulty":"hard"},{"id":"mime-028","boxId":"animals","active":true,"prompt":"Un caméléon qui attrape une mouche avec sa langue","difficulty":"hard"},{"id":"mime-029","boxId":"animals","active":true,"prompt":"Un ours qui cherche du miel","difficulty":"hard"},{"id":"mime-030","boxId":"animals","active":true,"prompt":"Une araignée qui tisse sa toile","difficulty":"hard"},{"id":"mime-031","boxId":"animals","active":true,"prompt":"Un chien qui se secoue après son bain","difficulty":"hard"},{"id":"mime-032","boxId":"animals","active":true,"prompt":"Un chat qui essaie d’attraper un point lumineux","difficulty":"hard"},{"id":"mime-033","boxId":"animals","active":true,"prompt":"Un ours qui se gratte le dos contre un arbre","difficulty":"hard"},{"id":"mime-034","boxId":"animals","active":true,"prompt":"Une poule qui pond un œuf","difficulty":"hard"},{"id":"mime-035","boxId":"animals","active":true,"prompt":"Un flamant rose qui perd l’équilibre sur une patte","difficulty":"hard"},{"id":"mime-036","boxId":"jobs","active":true,"prompt":"Un médecin","difficulty":"easy"},{"id":"mime-037","boxId":"jobs","active":true,"prompt":"Un pompier","difficulty":"easy"},{"id":"mime-038","boxId":"jobs","active":true,"prompt":"Un policier","difficulty":"easy"},{"id":"mime-039","boxId":"jobs","active":true,"prompt":"Un cuisinier","difficulty":"easy"},{"id":"mime-040","boxId":"jobs","active":true,"prompt":"Un coiffeur","difficulty":"easy"},{"id":"mime-041","boxId":"jobs","active":true,"prompt":"Un professeur","difficulty":"easy"},{"id":"mime-042","boxId":"jobs","active":true,"prompt":"Un serveur","difficulty":"easy"},{"id":"mime-043","boxId":"jobs","active":true,"prompt":"Un boulanger qui pétrit du pain","difficulty":"easy"},{"id":"mime-044","boxId":"jobs","active":true,"prompt":"Un barman qui prépare un cocktail","difficulty":"easy"},{"id":"mime-045","boxId":"jobs","active":true,"prompt":"Un DJ qui mixe de la musique","difficulty":"easy"},{"id":"mime-046","boxId":"jobs","active":true,"prompt":"Un peintre qui repeint un mur","difficulty":"easy"},{"id":"mime-047","boxId":"jobs","active":true,"prompt":"Un pilote d’avion","difficulty":"easy"},{"id":"mime-048","boxId":"jobs","active":true,"prompt":"Un photographe","difficulty":"medium"},{"id":"mime-049","boxId":"jobs","active":true,"prompt":"Un mécanicien","difficulty":"medium"},{"id":"mime-050","boxId":"jobs","active":true,"prompt":"Un dentiste","difficulty":"medium"},{"id":"mime-051","boxId":"jobs","active":true,"prompt":"Un facteur","difficulty":"medium"},{"id":"mime-052","boxId":"jobs","active":true,"prompt":"Un jardinier","difficulty":"medium"},{"id":"mime-053","boxId":"jobs","active":true,"prompt":"Un magicien","difficulty":"medium"},{"id":"mime-054","boxId":"jobs","active":true,"prompt":"Un chef d’orchestre","difficulty":"medium"},{"id":"mime-055","boxId":"jobs","active":true,"prompt":"Un caissier qui scanne les articles rapidement","difficulty":"medium"},{"id":"mime-056","boxId":"jobs","active":true,"prompt":"Un plombier qui répare une fuite","difficulty":"medium"},{"id":"mime-057","boxId":"jobs","active":true,"prompt":"Un maître-nageur qui surveille une piscine","difficulty":"medium"},{"id":"mime-058","boxId":"jobs","active":true,"prompt":"Un serveur qui porte beaucoup d’assiettes","difficulty":"medium"},{"id":"mime-059","boxId":"jobs","active":true,"prompt":"Un journaliste qui interviewe quelqu’un","difficulty":"medium"},{"id":"mime-060","boxId":"jobs","active":true,"prompt":"Un contrôleur de train qui vérifie les billets","difficulty":"hard"},{"id":"mime-061","boxId":"jobs","active":true,"prompt":"Un vétérinaire qui soigne un cheval","difficulty":"hard"},{"id":"mime-062","boxId":"jobs","active":true,"prompt":"Un archéologue qui découvre un trésor","difficulty":"hard"},{"id":"mime-063","boxId":"jobs","active":true,"prompt":"Un agent secret en mission","difficulty":"hard"},{"id":"mime-064","boxId":"jobs","active":true,"prompt":"Un astronaute qui marche sur la Lune","difficulty":"hard"},{"id":"mime-065","boxId":"jobs","active":true,"prompt":"Un présentateur météo en pleine tempête","difficulty":"hard"},{"id":"mime-066","boxId":"jobs","active":true,"prompt":"Un coiffeur qui coupe une mèche beaucoup trop courte","difficulty":"hard"},{"id":"mime-067","boxId":"jobs","active":true,"prompt":"Un serveur qui manque de faire tomber son plateau","difficulty":"hard"},{"id":"mime-068","boxId":"jobs","active":true,"prompt":"Un plombier qui reçoit de l’eau en plein visage","difficulty":"hard"},{"id":"mime-069","boxId":"jobs","active":true,"prompt":"Un photographe qui fait prendre la pose à tout le monde","difficulty":"hard"},{"id":"mime-070","boxId":"jobs","active":true,"prompt":"Un dentiste qui essaie d’arracher une dent résistante","difficulty":"hard"},{"id":"mime-071","boxId":"sports","active":true,"prompt":"Jouer au football","difficulty":"easy"},{"id":"mime-072","boxId":"sports","active":true,"prompt":"Jouer au tennis","difficulty":"easy"},{"id":"mime-073","boxId":"sports","active":true,"prompt":"Faire du vélo","difficulty":"easy"},{"id":"mime-074","boxId":"sports","active":true,"prompt":"Nager","difficulty":"easy"},{"id":"mime-075","boxId":"sports","active":true,"prompt":"Faire du ski","difficulty":"easy"},{"id":"mime-076","boxId":"sports","active":true,"prompt":"Jouer au basket","difficulty":"easy"},{"id":"mime-077","boxId":"sports","active":true,"prompt":"Faire de la boxe","difficulty":"easy"},{"id":"mime-078","boxId":"sports","active":true,"prompt":"Jouer au badminton","difficulty":"easy"},{"id":"mime-079","boxId":"sports","active":true,"prompt":"Faire de la musculation","difficulty":"easy"},{"id":"mime-080","boxId":"sports","active":true,"prompt":"Jouer au billard","difficulty":"easy"},{"id":"mime-081","boxId":"sports","active":true,"prompt":"Aller à la pêche","difficulty":"easy"},{"id":"mime-082","boxId":"sports","active":true,"prompt":"Danser la salsa","difficulty":"easy"},{"id":"mime-083","boxId":"sports","active":true,"prompt":"Faire de l’escalade","difficulty":"medium"},{"id":"mime-084","boxId":"sports","active":true,"prompt":"Faire du bowling","difficulty":"medium"},{"id":"mime-085","boxId":"sports","active":true,"prompt":"Jouer au golf","difficulty":"medium"},{"id":"mime-086","boxId":"sports","active":true,"prompt":"Faire du patinage artistique","difficulty":"medium"},{"id":"mime-087","boxId":"sports","active":true,"prompt":"Tirer à l’arc","difficulty":"medium"},{"id":"mime-088","boxId":"sports","active":true,"prompt":"Faire du surf","difficulty":"medium"},{"id":"mime-089","boxId":"sports","active":true,"prompt":"Jouer au ping-pong","difficulty":"medium"},{"id":"mime-090","boxId":"sports","active":true,"prompt":"Participer à une course en sac","difficulty":"medium"},{"id":"mime-091","boxId":"sports","active":true,"prompt":"Faire une partie de pétanque","difficulty":"medium"},{"id":"mime-092","boxId":"sports","active":true,"prompt":"Jongler avec plusieurs balles","difficulty":"medium"},{"id":"mime-093","boxId":"sports","active":true,"prompt":"Chanter au karaoké","difficulty":"medium"},{"id":"mime-094","boxId":"sports","active":true,"prompt":"Rater toutes ses quilles au bowling","difficulty":"medium"},{"id":"mime-095","boxId":"sports","active":true,"prompt":"Courir un marathon complètement épuisé","difficulty":"hard"},{"id":"mime-096","boxId":"sports","active":true,"prompt":"Faire du trampoline avec le vertige","difficulty":"hard"},{"id":"mime-097","boxId":"sports","active":true,"prompt":"Participer à une course de chevaux","difficulty":"hard"},{"id":"mime-098","boxId":"sports","active":true,"prompt":"Faire du yoga sans réussir à tenir l’équilibre","difficulty":"hard"},{"id":"mime-099","boxId":"sports","active":true,"prompt":"Jouer à un jeu vidéo très stressant","difficulty":"hard"},{"id":"mime-100","boxId":"sports","active":true,"prompt":"Un footballeur qui rate un penalty","difficulty":"hard"},{"id":"mime-101","boxId":"sports","active":true,"prompt":"Un cycliste qui découvre qu’il a crevé","difficulty":"hard"},{"id":"mime-102","boxId":"sports","active":true,"prompt":"Un skieur qui tombe et essaie de se relever","difficulty":"hard"},{"id":"mime-103","boxId":"sports","active":true,"prompt":"Un boxeur qui esquive plusieurs coups","difficulty":"hard"},{"id":"mime-104","boxId":"sports","active":true,"prompt":"Un joueur de tennis qui envoie la balle dans le filet","difficulty":"hard"},{"id":"mime-105","boxId":"sports","active":true,"prompt":"Un gardien de but qui arrête le ballon avec son visage","difficulty":"hard"},{"id":"mime-106","boxId":"daily","active":true,"prompt":"Se brosser les dents","difficulty":"easy"},{"id":"mime-107","boxId":"daily","active":true,"prompt":"Prendre une douche","difficulty":"easy"},{"id":"mime-108","boxId":"daily","active":true,"prompt":"Se maquiller","difficulty":"easy"},{"id":"mime-109","boxId":"daily","active":true,"prompt":"Faire la vaisselle","difficulty":"easy"},{"id":"mime-110","boxId":"daily","active":true,"prompt":"Passer l’aspirateur","difficulty":"easy"},{"id":"mime-111","boxId":"daily","active":true,"prompt":"Se réveiller","difficulty":"easy"},{"id":"mime-112","boxId":"daily","active":true,"prompt":"S’habiller","difficulty":"easy"},{"id":"mime-113","boxId":"daily","active":true,"prompt":"Se sécher les cheveux","difficulty":"easy"},{"id":"mime-114","boxId":"daily","active":true,"prompt":"Mettre ses chaussures","difficulty":"easy"},{"id":"mime-115","boxId":"daily","active":true,"prompt":"Préparer un café","difficulty":"easy"},{"id":"mime-116","boxId":"daily","active":true,"prompt":"Se couper les ongles","difficulty":"easy"},{"id":"mime-117","boxId":"daily","active":true,"prompt":"Fermer les rideaux","difficulty":"easy"},{"id":"mime-118","boxId":"daily","active":true,"prompt":"Monter un meuble","difficulty":"medium"},{"id":"mime-119","boxId":"daily","active":true,"prompt":"Changer une ampoule","difficulty":"medium"},{"id":"mime-120","boxId":"daily","active":true,"prompt":"Chercher ses clés","difficulty":"medium"},{"id":"mime-121","boxId":"daily","active":true,"prompt":"Ouvrir un cadeau","difficulty":"medium"},{"id":"mime-122","boxId":"daily","active":true,"prompt":"Faire ses courses","difficulty":"medium"},{"id":"mime-123","boxId":"daily","active":true,"prompt":"Prendre un selfie","difficulty":"medium"},{"id":"mime-124","boxId":"daily","active":true,"prompt":"Essayer un pantalon trop petit","difficulty":"medium"},{"id":"mime-125","boxId":"daily","active":true,"prompt":"Essayer de démêler ses cheveux","difficulty":"medium"},{"id":"mime-126","boxId":"daily","active":true,"prompt":"Faire cuire des pâtes qui débordent","difficulty":"medium"},{"id":"mime-127","boxId":"daily","active":true,"prompt":"Mettre une housse de couette","difficulty":"medium"},{"id":"mime-128","boxId":"daily","active":true,"prompt":"Essayer de fermer une valise trop pleine","difficulty":"medium"},{"id":"mime-129","boxId":"daily","active":true,"prompt":"Enfiler une chaussette encore humide","difficulty":"medium"},{"id":"mime-130","boxId":"daily","active":true,"prompt":"Marcher sur un Lego","difficulty":"hard"},{"id":"mime-131","boxId":"daily","active":true,"prompt":"Essayer d’attraper quelque chose sous un meuble","difficulty":"hard"},{"id":"mime-132","boxId":"daily","active":true,"prompt":"Sortir discrètement d’une pièce","difficulty":"hard"},{"id":"mime-133","boxId":"daily","active":true,"prompt":"Porter trop de sacs de courses","difficulty":"hard"},{"id":"mime-134","boxId":"daily","active":true,"prompt":"Tenter de dormir avec un moustique dans la chambre","difficulty":"hard"},{"id":"mime-135","boxId":"daily","active":true,"prompt":"Essayer de retirer un vêtement trop serré","difficulty":"hard"},{"id":"mime-136","boxId":"daily","active":true,"prompt":"Chercher son téléphone alors qu’on l’a dans la main","difficulty":"hard"},{"id":"mime-137","boxId":"daily","active":true,"prompt":"Se lever sans réveiller quelqu’un","difficulty":"hard"},{"id":"mime-138","boxId":"daily","active":true,"prompt":"Tenter d’attraper un insecte sans le toucher","difficulty":"hard"},{"id":"mime-139","boxId":"daily","active":true,"prompt":"Faire tomber quelque chose et essayer de le rattraper avec le pied","difficulty":"hard"},{"id":"mime-140","boxId":"daily","active":true,"prompt":"Ouvrir un sac-poubelle qui se déchire","difficulty":"hard"},{"id":"mime-141","boxId":"emotions","active":true,"prompt":"Être très heureux","difficulty":"easy"},{"id":"mime-142","boxId":"emotions","active":true,"prompt":"Être triste","difficulty":"easy"},{"id":"mime-143","boxId":"emotions","active":true,"prompt":"Être en colère","difficulty":"easy"},{"id":"mime-144","boxId":"emotions","active":true,"prompt":"Avoir peur","difficulty":"easy"},{"id":"mime-145","boxId":"emotions","active":true,"prompt":"Être surpris","difficulty":"easy"},{"id":"mime-146","boxId":"emotions","active":true,"prompt":"Être amoureux","difficulty":"easy"},{"id":"mime-147","boxId":"emotions","active":true,"prompt":"Être fatigué","difficulty":"easy"},{"id":"mime-148","boxId":"emotions","active":true,"prompt":"S’ennuyer énormément","difficulty":"easy"},{"id":"mime-149","boxId":"emotions","active":true,"prompt":"Être complètement paniqué","difficulty":"easy"},{"id":"mime-150","boxId":"emotions","active":true,"prompt":"Être extrêmement concentré","difficulty":"easy"},{"id":"mime-151","boxId":"emotions","active":true,"prompt":"Être très détendu","difficulty":"easy"},{"id":"mime-152","boxId":"emotions","active":true,"prompt":"Être dégoûté","difficulty":"easy"},{"id":"mime-153","boxId":"emotions","active":true,"prompt":"Être jaloux","difficulty":"medium"},{"id":"mime-154","boxId":"emotions","active":true,"prompt":"Être gêné","difficulty":"medium"},{"id":"mime-155","boxId":"emotions","active":true,"prompt":"Être impatient d’ouvrir un cadeau","difficulty":"medium"},{"id":"mime-156","boxId":"emotions","active":true,"prompt":"Être fier de soi","difficulty":"medium"},{"id":"mime-157","boxId":"emotions","active":true,"prompt":"Être complètement perdu","difficulty":"medium"},{"id":"mime-158","boxId":"emotions","active":true,"prompt":"Être très méfiant","difficulty":"medium"},{"id":"mime-159","boxId":"emotions","active":true,"prompt":"Faire semblant d’écouter quelqu’un","difficulty":"medium"},{"id":"mime-160","boxId":"emotions","active":true,"prompt":"Essayer de rester calme alors qu’on est énervé","difficulty":"medium"},{"id":"mime-161","boxId":"emotions","active":true,"prompt":"Être vexé après avoir perdu","difficulty":"medium"},{"id":"mime-162","boxId":"emotions","active":true,"prompt":"Être terrifié mais essayer de le cacher","difficulty":"medium"},{"id":"mime-163","boxId":"emotions","active":true,"prompt":"Essayer de ne pas rire","difficulty":"medium"},{"id":"mime-164","boxId":"emotions","active":true,"prompt":"Être soulagé après une grosse frayeur","difficulty":"medium"},{"id":"mime-165","boxId":"emotions","active":true,"prompt":"Faire semblant d’être innocent","difficulty":"hard"},{"id":"mime-166","boxId":"emotions","active":true,"prompt":"Réaliser qu’on a oublié quelque chose d’important","difficulty":"hard"},{"id":"mime-167","boxId":"emotions","active":true,"prompt":"Recevoir un cadeau affreux et faire semblant d’être content","difficulty":"hard"},{"id":"mime-168","boxId":"emotions","active":true,"prompt":"Entendre un bruit inquiétant derrière soi","difficulty":"hard"},{"id":"mime-169","boxId":"emotions","active":true,"prompt":"Découvrir une araignée juste à côté de soi","difficulty":"hard"},{"id":"mime-170","boxId":"emotions","active":true,"prompt":"Attendre un résultat avec beaucoup de stress","difficulty":"hard"},{"id":"mime-171","boxId":"emotions","active":true,"prompt":"Réaliser qu’on vient de dire quelque chose de gênant","difficulty":"hard"},{"id":"mime-172","boxId":"emotions","active":true,"prompt":"Essayer de cacher une grosse déception","difficulty":"hard"},{"id":"mime-173","boxId":"emotions","active":true,"prompt":"Se rendre compte qu’on a parlé beaucoup trop fort","difficulty":"hard"},{"id":"mime-174","boxId":"emotions","active":true,"prompt":"Hésiter entre rire et avoir peur","difficulty":"hard"},{"id":"mime-175","boxId":"emotions","active":true,"prompt":"Casser quelque chose et faire comme si de rien n’était","difficulty":"hard"},{"id":"mime-176","boxId":"characters","active":true,"prompt":"Spider-Man","difficulty":"easy"},{"id":"mime-177","boxId":"characters","active":true,"prompt":"Harry Potter","difficulty":"easy"},{"id":"mime-178","boxId":"characters","active":true,"prompt":"Dark Vador","difficulty":"easy"},{"id":"mime-179","boxId":"characters","active":true,"prompt":"Elsa dans La Reine des Neiges","difficulty":"easy"},{"id":"mime-180","boxId":"characters","active":true,"prompt":"Superman","difficulty":"easy"},{"id":"mime-181","boxId":"characters","active":true,"prompt":"Barbie","difficulty":"easy"},{"id":"mime-182","boxId":"characters","active":true,"prompt":"Mickey Mouse","difficulty":"easy"},{"id":"mime-183","boxId":"characters","active":true,"prompt":"Batman","difficulty":"easy"},{"id":"mime-184","boxId":"characters","active":true,"prompt":"Wonder Woman","difficulty":"easy"},{"id":"mime-185","boxId":"characters","active":true,"prompt":"Tarzan","difficulty":"easy"},{"id":"mime-186","boxId":"characters","active":true,"prompt":"Pinocchio","difficulty":"easy"},{"id":"mime-187","boxId":"characters","active":true,"prompt":"Aladdin sur son tapis volant","difficulty":"easy"},{"id":"mime-188","boxId":"characters","active":true,"prompt":"Shrek","difficulty":"medium"},{"id":"mime-189","boxId":"characters","active":true,"prompt":"Jack Sparrow","difficulty":"medium"},{"id":"mime-190","boxId":"characters","active":true,"prompt":"Mercredi Addams","difficulty":"medium"},{"id":"mime-191","boxId":"characters","active":true,"prompt":"Hulk","difficulty":"medium"},{"id":"mime-192","boxId":"characters","active":true,"prompt":"Indiana Jones","difficulty":"medium"},{"id":"mime-193","boxId":"characters","active":true,"prompt":"Mr Bean","difficulty":"medium"},{"id":"mime-194","boxId":"characters","active":true,"prompt":"Mario","difficulty":"medium"},{"id":"mime-195","boxId":"characters","active":true,"prompt":"Wolverine qui sort ses griffes","difficulty":"medium"},{"id":"mime-196","boxId":"characters","active":true,"prompt":"Mary Poppins qui vole avec son parapluie","difficulty":"medium"},{"id":"mime-197","boxId":"characters","active":true,"prompt":"Buzz l’Éclair qui décolle","difficulty":"medium"},{"id":"mime-198","boxId":"characters","active":true,"prompt":"Dobby qui reçoit une chaussette","difficulty":"medium"},{"id":"mime-199","boxId":"characters","active":true,"prompt":"Forrest Gump qui court","difficulty":"medium"},{"id":"mime-200","boxId":"characters","active":true,"prompt":"Gollum qui cherche son précieux","difficulty":"hard"},{"id":"mime-201","boxId":"characters","active":true,"prompt":"Voldemort qui lance un sort","difficulty":"hard"},{"id":"mime-202","boxId":"characters","active":true,"prompt":"Rocky qui monte les escaliers","difficulty":"hard"},{"id":"mime-203","boxId":"characters","active":true,"prompt":"Neo qui évite les balles dans Matrix","difficulty":"hard"},{"id":"mime-204","boxId":"characters","active":true,"prompt":"Le Joker qui mélange des cartes en riant","difficulty":"hard"},{"id":"mime-205","boxId":"characters","active":true,"prompt":"Un Minion qui fait une énorme bêtise","difficulty":"hard"},{"id":"mime-206","boxId":"characters","active":true,"prompt":"Gandalf qui empêche quelqu’un de passer","difficulty":"hard"},{"id":"mime-207","boxId":"characters","active":true,"prompt":"E.T. qui tend son doigt lumineux","difficulty":"hard"},{"id":"mime-208","boxId":"characters","active":true,"prompt":"Marty McFly qui joue de la guitare","difficulty":"hard"},{"id":"mime-209","boxId":"characters","active":true,"prompt":"Ghostface qui téléphone à quelqu’un","difficulty":"hard"},{"id":"mime-210","boxId":"characters","active":true,"prompt":"Le Grinch qui vole des cadeaux","difficulty":"hard"},{"id":"mime-211","boxId":"objects","active":true,"prompt":"Utiliser un téléphone","difficulty":"easy"},{"id":"mime-212","boxId":"objects","active":true,"prompt":"Passer l’aspirateur","difficulty":"easy"},{"id":"mime-213","boxId":"objects","active":true,"prompt":"Conduire une voiture","difficulty":"easy"},{"id":"mime-214","boxId":"objects","active":true,"prompt":"Éteindre un réveil","difficulty":"easy"},{"id":"mime-215","boxId":"objects","active":true,"prompt":"Ouvrir un parapluie","difficulty":"easy"},{"id":"mime-216","boxId":"objects","active":true,"prompt":"Utiliser une machine à laver","difficulty":"easy"},{"id":"mime-217","boxId":"objects","active":true,"prompt":"Se placer devant un ventilateur","difficulty":"easy"},{"id":"mime-218","boxId":"objects","active":true,"prompt":"Utiliser un grille-pain","difficulty":"easy"},{"id":"mime-219","boxId":"objects","active":true,"prompt":"Se sécher les cheveux avec un sèche-cheveux","difficulty":"easy"},{"id":"mime-220","boxId":"objects","active":true,"prompt":"Faire de la trottinette électrique","difficulty":"easy"},{"id":"mime-221","boxId":"objects","active":true,"prompt":"Passer une tondeuse à gazon","difficulty":"easy"},{"id":"mime-222","boxId":"objects","active":true,"prompt":"Faire chauffer une bouilloire","difficulty":"easy"},{"id":"mime-223","boxId":"objects","active":true,"prompt":"Une imprimante en panne","difficulty":"medium"},{"id":"mime-224","boxId":"objects","active":true,"prompt":"Un robot qui marche","difficulty":"medium"},{"id":"mime-225","boxId":"objects","active":true,"prompt":"Utiliser une tronçonneuse","difficulty":"medium"},{"id":"mime-226","boxId":"objects","active":true,"prompt":"Chercher quelque chose avec un détecteur de métaux","difficulty":"medium"},{"id":"mime-227","boxId":"objects","active":true,"prompt":"Utiliser une machine à café","difficulty":"medium"},{"id":"mime-228","boxId":"objects","active":true,"prompt":"Acheter quelque chose à un distributeur automatique","difficulty":"medium"},{"id":"mime-229","boxId":"objects","active":true,"prompt":"Piloter un drone","difficulty":"medium"},{"id":"mime-230","boxId":"objects","active":true,"prompt":"Un grille-pain qui éjecte la tartine trop haut","difficulty":"medium"},{"id":"mime-231","boxId":"objects","active":true,"prompt":"Un sèche-cheveux beaucoup trop puissant","difficulty":"medium"},{"id":"mime-232","boxId":"objects","active":true,"prompt":"Un robot aspirateur coincé contre un mur","difficulty":"medium"},{"id":"mime-233","boxId":"objects","active":true,"prompt":"Une porte automatique qui refuse de s’ouvrir","difficulty":"medium"},{"id":"mime-234","boxId":"objects","active":true,"prompt":"Un micro qui produit un énorme larsen","difficulty":"medium"},{"id":"mime-235","boxId":"objects","active":true,"prompt":"Suivre un GPS qui donne une mauvaise direction","difficulty":"hard"},{"id":"mime-236","boxId":"objects","active":true,"prompt":"Débloquer une feuille coincée dans une photocopieuse","difficulty":"hard"},{"id":"mime-237","boxId":"objects","active":true,"prompt":"Être coincé dans un ascenseur","difficulty":"hard"},{"id":"mime-238","boxId":"objects","active":true,"prompt":"Essayer de démarrer une voiture qui refuse de démarrer","difficulty":"hard"},{"id":"mime-239","boxId":"objects","active":true,"prompt":"Utiliser un aspirateur qui avale un objet important","difficulty":"hard"},{"id":"mime-240","boxId":"objects","active":true,"prompt":"Une borne de paiement qui refuse la carte bancaire","difficulty":"hard"},{"id":"mime-241","boxId":"objects","active":true,"prompt":"Tirer une valise à roulettes qui part dans tous les sens","difficulty":"hard"},{"id":"mime-242","boxId":"objects","active":true,"prompt":"Utiliser un casque de réalité virtuelle et perdre l’équilibre","difficulty":"hard"},{"id":"mime-243","boxId":"objects","active":true,"prompt":"Frapper une télécommande pour qu’elle fonctionne","difficulty":"hard"},{"id":"mime-244","boxId":"objects","active":true,"prompt":"Un appareil photo qui prend la photo au mauvais moment","difficulty":"hard"},{"id":"mime-245","boxId":"objects","active":true,"prompt":"Utiliser un parapluie retourné par le vent","difficulty":"hard"},{"id":"mime-246","boxId":"absurd","active":true,"prompt":"Un kangourou qui fait ses courses","difficulty":"easy"},{"id":"mime-247","boxId":"absurd","active":true,"prompt":"Un chat qui conduit une voiture","difficulty":"easy"},{"id":"mime-248","boxId":"absurd","active":true,"prompt":"Un vampire chez le dentiste","difficulty":"easy"},{"id":"mime-249","boxId":"absurd","active":true,"prompt":"Un fantôme qui a peur","difficulty":"easy"},{"id":"mime-250","boxId":"absurd","active":true,"prompt":"Un chien qui fait du yoga","difficulty":"easy"},{"id":"mime-251","boxId":"absurd","active":true,"prompt":"Un bébé qui conduit un camion","difficulty":"easy"},{"id":"mime-252","boxId":"absurd","active":true,"prompt":"Un zombie qui danse","difficulty":"easy"},{"id":"mime-253","boxId":"absurd","active":true,"prompt":"Un vampire qui met de la crème solaire","difficulty":"easy"},{"id":"mime-254","boxId":"absurd","active":true,"prompt":"Un zombie qui passe un entretien d’embauche","difficulty":"easy"},{"id":"mime-255","boxId":"absurd","active":true,"prompt":"Un robot qui fait la sieste","difficulty":"easy"},{"id":"mime-256","boxId":"absurd","active":true,"prompt":"Un cheval qui utilise un téléphone","difficulty":"easy"},{"id":"mime-257","boxId":"absurd","active":true,"prompt":"Un dinosaure qui fait du vélo","difficulty":"easy"},{"id":"mime-258","boxId":"absurd","active":true,"prompt":"Un pingouin qui prend un bain de soleil","difficulty":"medium"},{"id":"mime-259","boxId":"absurd","active":true,"prompt":"Une licorne coincée dans un ascenseur","difficulty":"medium"},{"id":"mime-260","boxId":"absurd","active":true,"prompt":"Un extraterrestre qui découvre un téléphone","difficulty":"medium"},{"id":"mime-261","boxId":"absurd","active":true,"prompt":"Un requin qui se brosse les dents","difficulty":"medium"},{"id":"mime-262","boxId":"absurd","active":true,"prompt":"Un roi qui nettoie ses toilettes","difficulty":"medium"},{"id":"mime-263","boxId":"absurd","active":true,"prompt":"Un squelette qui cherche ses os","difficulty":"medium"},{"id":"mime-264","boxId":"absurd","active":true,"prompt":"Une sorcière dont le balai refuse de démarrer","difficulty":"medium"},{"id":"mime-265","boxId":"absurd","active":true,"prompt":"Une momie qui essaie de dérouler ses bandages","difficulty":"medium"},{"id":"mime-266","boxId":"absurd","active":true,"prompt":"Un extraterrestre qui apprend à danser","difficulty":"medium"},{"id":"mime-267","boxId":"absurd","active":true,"prompt":"Un fantôme qui essaie de faire peur mais échoue","difficulty":"medium"},{"id":"mime-268","boxId":"absurd","active":true,"prompt":"Un super-héros qui n’arrive pas à ouvrir un bocal","difficulty":"medium"},{"id":"mime-269","boxId":"absurd","active":true,"prompt":"Un pirate qui cherche son perroquet","difficulty":"medium"},{"id":"mime-270","boxId":"absurd","active":true,"prompt":"Un espion qui éternue pendant une mission secrète","difficulty":"hard"},{"id":"mime-271","boxId":"absurd","active":true,"prompt":"Un astronaute qui essaie de manger dans l’espace","difficulty":"hard"},{"id":"mime-272","boxId":"absurd","active":true,"prompt":"Un super-héros qui essaie de voler mais retombe","difficulty":"hard"},{"id":"mime-273","boxId":"absurd","active":true,"prompt":"Un pirate qui a le mal de mer","difficulty":"hard"},{"id":"mime-274","boxId":"absurd","active":true,"prompt":"Un magicien qui rate complètement son tour","difficulty":"hard"},{"id":"mime-275","boxId":"absurd","active":true,"prompt":"Un dinosaure qui essaie de passer une porte","difficulty":"hard"},{"id":"mime-276","boxId":"absurd","active":true,"prompt":"Un chevalier qui n’arrive pas à se relever à cause de son armure","difficulty":"hard"},{"id":"mime-277","boxId":"absurd","active":true,"prompt":"Un fantôme qui essaie de faire peur mais se fait peur lui-même","difficulty":"hard"},{"id":"mime-278","boxId":"absurd","active":true,"prompt":"Un dinosaure qui essaie de s’asseoir sur une toute petite chaise","difficulty":"hard"},{"id":"mime-279","boxId":"absurd","active":true,"prompt":"Un vampire qui essaie de se regarder dans un miroir","difficulty":"hard"},{"id":"mime-280","boxId":"absurd","active":true,"prompt":"Un zombie qui essaie de marcher normalement","difficulty":"hard"},{"id":"mime-281","boxId":"expressions","active":true,"prompt":"Avoir le coup de foudre","difficulty":"easy"},{"id":"mime-282","boxId":"expressions","active":true,"prompt":"Dormir comme un bébé","difficulty":"easy"},{"id":"mime-283","boxId":"expressions","active":true,"prompt":"Avoir très faim","difficulty":"easy"},{"id":"mime-284","boxId":"expressions","active":true,"prompt":"Être mort de rire","difficulty":"easy"},{"id":"mime-285","boxId":"expressions","active":true,"prompt":"Avoir froid","difficulty":"easy"},{"id":"mime-286","boxId":"expressions","active":true,"prompt":"Avoir chaud","difficulty":"easy"},{"id":"mime-287","boxId":"expressions","active":true,"prompt":"Être dans la lune","difficulty":"easy"},{"id":"mime-288","boxId":"expressions","active":true,"prompt":"Avoir un chat dans la gorge","difficulty":"easy"},{"id":"mime-289","boxId":"expressions","active":true,"prompt":"Coûter un bras","difficulty":"easy"},{"id":"mime-290","boxId":"expressions","active":true,"prompt":"Pleuvoir des cordes","difficulty":"easy"},{"id":"mime-291","boxId":"expressions","active":true,"prompt":"Avoir les yeux plus gros que le ventre","difficulty":"easy"},{"id":"mime-292","boxId":"expressions","active":true,"prompt":"Donner sa langue au chat","difficulty":"easy"},{"id":"mime-293","boxId":"expressions","active":true,"prompt":"Chercher une aiguille dans une botte de foin","difficulty":"medium"},{"id":"mime-294","boxId":"expressions","active":true,"prompt":"Tomber dans les pommes","difficulty":"medium"},{"id":"mime-295","boxId":"expressions","active":true,"prompt":"Avoir la tête dans les nuages","difficulty":"medium"},{"id":"mime-296","boxId":"expressions","active":true,"prompt":"Mettre les pieds dans le plat","difficulty":"medium"},{"id":"mime-297","boxId":"expressions","active":true,"prompt":"Être à côté de la plaque","difficulty":"medium"},{"id":"mime-298","boxId":"expressions","active":true,"prompt":"Avoir un poil dans la main","difficulty":"medium"},{"id":"mime-299","boxId":"expressions","active":true,"prompt":"Prendre ses jambes à son cou","difficulty":"medium"},{"id":"mime-300","boxId":"expressions","active":true,"prompt":"Marcher sur des œufs","difficulty":"medium"},{"id":"mime-301","boxId":"expressions","active":true,"prompt":"Prendre le taureau par les cornes","difficulty":"medium"},{"id":"mime-302","boxId":"expressions","active":true,"prompt":"Jeter de l’huile sur le feu","difficulty":"medium"},{"id":"mime-303","boxId":"expressions","active":true,"prompt":"Couper les cheveux en quatre","difficulty":"medium"},{"id":"mime-304","boxId":"expressions","active":true,"prompt":"Mettre de l’eau dans son vin","difficulty":"medium"},{"id":"mime-305","boxId":"expressions","active":true,"prompt":"Jeter l’éponge","difficulty":"hard"},{"id":"mime-306","boxId":"expressions","active":true,"prompt":"Casser les pieds à quelqu’un","difficulty":"hard"},{"id":"mime-307","boxId":"expressions","active":true,"prompt":"Se mettre le doigt dans l’œil","difficulty":"hard"},{"id":"mime-308","boxId":"expressions","active":true,"prompt":"Avoir la main verte","difficulty":"hard"},{"id":"mime-309","boxId":"expressions","active":true,"prompt":"Se serrer la ceinture","difficulty":"hard"},{"id":"mime-310","boxId":"expressions","active":true,"prompt":"Faire l’autruche","difficulty":"hard"},{"id":"mime-311","boxId":"expressions","active":true,"prompt":"Avoir les mains liées","difficulty":"hard"},{"id":"mime-312","boxId":"expressions","active":true,"prompt":"Prendre la mouche","difficulty":"hard"},{"id":"mime-313","boxId":"expressions","active":true,"prompt":"Avoir un coup de barre","difficulty":"hard"},{"id":"mime-314","boxId":"expressions","active":true,"prompt":"Mettre la main à la pâte","difficulty":"hard"},{"id":"mime-315","boxId":"expressions","active":true,"prompt":"Retomber sur ses pieds","difficulty":"hard"},{"id":"mime-316","boxId":"parties","active":true,"prompt":"Danser tout seul au milieu de la piste","difficulty":"easy"},{"id":"mime-317","boxId":"parties","active":true,"prompt":"Souffler les bougies d’un gâteau","difficulty":"easy"},{"id":"mime-318","boxId":"parties","active":true,"prompt":"Ouvrir une bouteille de champagne","difficulty":"easy"},{"id":"mime-319","boxId":"parties","active":true,"prompt":"Prendre une photo de groupe","difficulty":"easy"},{"id":"mime-320","boxId":"parties","active":true,"prompt":"Lancer des confettis","difficulty":"easy"},{"id":"mime-321","boxId":"parties","active":true,"prompt":"Danser alors qu’on ne connaît pas la chorégraphie","difficulty":"medium"},{"id":"mime-322","boxId":"parties","active":true,"prompt":"Chanter très faux au karaoké","difficulty":"medium"},{"id":"mime-323","boxId":"parties","active":true,"prompt":"Faire une chenille en soirée","difficulty":"medium"},{"id":"mime-324","boxId":"parties","active":true,"prompt":"Faire semblant d’aimer la musique","difficulty":"medium"},{"id":"mime-325","boxId":"parties","active":true,"prompt":"Essayer de manger discrètement le dernier gâteau","difficulty":"medium"},{"id":"mime-326","boxId":"parties","active":true,"prompt":"Danser avec une chaussure cassée","difficulty":"hard"},{"id":"mime-327","boxId":"parties","active":true,"prompt":"Souffler des bougies qui se rallument","difficulty":"hard"},{"id":"mime-328","boxId":"parties","active":true,"prompt":"Ouvrir une bouteille dont le bouchon part brusquement","difficulty":"hard"},{"id":"mime-329","boxId":"parties","active":true,"prompt":"Prendre une photo de groupe où personne ne rentre dans le cadre","difficulty":"hard"},{"id":"mime-330","boxId":"parties","active":true,"prompt":"Faire tomber son verre en essayant de danser","difficulty":"hard"},{"id":"mime-331","boxId":"tech","active":true,"prompt":"Prendre un selfie","difficulty":"easy"},{"id":"mime-332","boxId":"tech","active":true,"prompt":"Jouer avec un casque de réalité virtuelle","difficulty":"easy"},{"id":"mime-333","boxId":"tech","active":true,"prompt":"Écrire très vite sur un téléphone","difficulty":"easy"},{"id":"mime-334","boxId":"tech","active":true,"prompt":"Brancher un chargeur","difficulty":"easy"},{"id":"mime-335","boxId":"tech","active":true,"prompt":"Utiliser une souris d’ordinateur","difficulty":"easy"},{"id":"mime-336","boxId":"tech","active":true,"prompt":"Chercher du réseau avec son téléphone","difficulty":"medium"},{"id":"mime-337","boxId":"tech","active":true,"prompt":"Déverrouiller son téléphone avec la reconnaissance faciale","difficulty":"medium"},{"id":"mime-338","boxId":"tech","active":true,"prompt":"Essayer de prendre une photo avec des gants","difficulty":"medium"},{"id":"mime-339","boxId":"tech","active":true,"prompt":"Faire une visioconférence qui bugue","difficulty":"medium"},{"id":"mime-340","boxId":"tech","active":true,"prompt":"Taper un mot de passe très compliqué","difficulty":"medium"},{"id":"mime-341","boxId":"tech","active":true,"prompt":"Faire tomber son téléphone sur son visage dans le lit","difficulty":"hard"},{"id":"mime-342","boxId":"tech","active":true,"prompt":"Utiliser un casque de réalité virtuelle et cogner un meuble","difficulty":"hard"},{"id":"mime-343","boxId":"tech","active":true,"prompt":"Démêler des écouteurs complètement noués","difficulty":"hard"},{"id":"mime-344","boxId":"tech","active":true,"prompt":"Voir son ordinateur se bloquer juste avant de sauvegarder","difficulty":"hard"},{"id":"mime-345","boxId":"tech","active":true,"prompt":"Bouger son chargeur dans tous les sens pour qu’il fonctionne","difficulty":"hard"},{"id":"mime-346","boxId":"transport","active":true,"prompt":"Conduire une voiture","difficulty":"easy"},{"id":"mime-347","boxId":"transport","active":true,"prompt":"Faire du stop","difficulty":"easy"},{"id":"mime-348","boxId":"transport","active":true,"prompt":"Attendre un bus","difficulty":"easy"},{"id":"mime-349","boxId":"transport","active":true,"prompt":"Tirer une valise","difficulty":"easy"},{"id":"mime-350","boxId":"transport","active":true,"prompt":"Prendre l’avion","difficulty":"easy"},{"id":"mime-351","boxId":"transport","active":true,"prompt":"Courir pour ne pas rater son train","difficulty":"medium"},{"id":"mime-352","boxId":"transport","active":true,"prompt":"Essayer de dormir dans un avion","difficulty":"medium"},{"id":"mime-353","boxId":"transport","active":true,"prompt":"Conduire sur une route pleine de virages","difficulty":"medium"},{"id":"mime-354","boxId":"transport","active":true,"prompt":"Porter une valise beaucoup trop lourde","difficulty":"medium"},{"id":"mime-355","boxId":"transport","active":true,"prompt":"Essayer de lire une carte à l’envers","difficulty":"medium"},{"id":"mime-356","boxId":"transport","active":true,"prompt":"Se rendre compte que le train part dans la mauvaise direction","difficulty":"hard"},{"id":"mime-357","boxId":"transport","active":true,"prompt":"Essayer de récupérer une valise lourde sur un tapis roulant","difficulty":"hard"},{"id":"mime-358","boxId":"transport","active":true,"prompt":"S’endormir sur l’épaule d’un inconnu dans le bus","difficulty":"hard"},{"id":"mime-359","boxId":"transport","active":true,"prompt":"Passer un contrôle de sécurité avec les poches pleines","difficulty":"hard"},{"id":"mime-360","boxId":"transport","active":true,"prompt":"Chercher sa voiture dans un immense parking","difficulty":"hard"},{"id":"mime-361","boxId":"food","active":true,"prompt":"Éplucher une banane","difficulty":"easy"},{"id":"mime-362","boxId":"food","active":true,"prompt":"Manger des spaghettis","difficulty":"easy"},{"id":"mime-363","boxId":"food","active":true,"prompt":"Faire sauter une crêpe","difficulty":"easy"},{"id":"mime-364","boxId":"food","active":true,"prompt":"Couper un oignon","difficulty":"easy"},{"id":"mime-365","boxId":"food","active":true,"prompt":"Goûter une soupe brûlante","difficulty":"easy"},{"id":"mime-366","boxId":"food","active":true,"prompt":"Essayer d’ouvrir un bocal très serré","difficulty":"medium"},{"id":"mime-367","boxId":"food","active":true,"prompt":"Manger quelque chose de beaucoup trop épicé","difficulty":"medium"},{"id":"mime-368","boxId":"food","active":true,"prompt":"Faire tomber une boule de glace","difficulty":"medium"},{"id":"mime-369","boxId":"food","active":true,"prompt":"Essayer de manger un hamburger trop gros","difficulty":"medium"},{"id":"mime-370","boxId":"food","active":true,"prompt":"Cuisiner avec une poêle qui éclabousse","difficulty":"medium"},{"id":"mime-371","boxId":"food","active":true,"prompt":"Faire semblant d’aimer un plat immangeable","difficulty":"hard"},{"id":"mime-372","boxId":"food","active":true,"prompt":"Essayer de manger proprement des spaghettis","difficulty":"hard"},{"id":"mime-373","boxId":"food","active":true,"prompt":"Goûter un aliment périmé et le recracher","difficulty":"hard"},{"id":"mime-374","boxId":"food","active":true,"prompt":"Préparer une recette sans comprendre les instructions","difficulty":"hard"},{"id":"mime-375","boxId":"food","active":true,"prompt":"Faire sauter une crêpe qui retombe sur la tête","difficulty":"hard"},{"id":"mime-376","boxId":"awkward","active":true,"prompt":"Faire tomber son téléphone dans les toilettes","difficulty":"easy"},{"id":"mime-377","boxId":"awkward","active":true,"prompt":"Arriver en retard à un rendez-vous","difficulty":"easy"},{"id":"mime-378","boxId":"awkward","active":true,"prompt":"Oublier le prénom de quelqu’un","difficulty":"easy"},{"id":"mime-379","boxId":"awkward","active":true,"prompt":"Se rendre compte que sa braguette est ouverte","difficulty":"easy"},{"id":"mime-380","boxId":"awkward","active":true,"prompt":"Ouvrir une bouteille qui explose","difficulty":"easy"},{"id":"mime-381","boxId":"awkward","active":true,"prompt":"Tenter de tuer un moustique dans le noir","difficulty":"easy"},{"id":"mime-382","boxId":"awkward","active":true,"prompt":"Recevoir une mauvaise note","difficulty":"easy"},{"id":"mime-383","boxId":"awkward","active":true,"prompt":"Envoyer un message à la mauvaise personne","difficulty":"medium"},{"id":"mime-384","boxId":"awkward","active":true,"prompt":"Croiser quelqu’un qu’on essaie d’éviter","difficulty":"medium"},{"id":"mime-385","boxId":"awkward","active":true,"prompt":"Faire semblant de reconnaître quelqu’un","difficulty":"medium"},{"id":"mime-386","boxId":"awkward","active":true,"prompt":"Essayer de retirer discrètement quelque chose coincé entre ses dents","difficulty":"medium"},{"id":"mime-387","boxId":"awkward","active":true,"prompt":"Être surpris en train de parler tout seul","difficulty":"medium"},{"id":"mime-388","boxId":"awkward","active":true,"prompt":"Perdre l’équilibre dans un bus","difficulty":"medium"},{"id":"mime-389","boxId":"awkward","active":true,"prompt":"Essayer d’ouvrir un emballage impossible","difficulty":"medium"},{"id":"mime-390","boxId":"awkward","active":true,"prompt":"Se tromper de porte et entrer chez un inconnu","difficulty":"hard"},{"id":"mime-391","boxId":"awkward","active":true,"prompt":"Faire tomber un gâteau juste avant une fête","difficulty":"hard"},{"id":"mime-392","boxId":"awkward","active":true,"prompt":"Se faire poursuivre par une oie","difficulty":"hard"},{"id":"mime-393","boxId":"awkward","active":true,"prompt":"Faire semblant de travailler quand quelqu’un arrive","difficulty":"hard"},{"id":"mime-394","boxId":"awkward","active":true,"prompt":"Découvrir une énorme araignée dans son lit","difficulty":"hard"},{"id":"mime-395","boxId":"awkward","active":true,"prompt":"Réaliser qu’on est monté dans le mauvais train","difficulty":"hard"}]},"words":{"schemaVersion":1,"libraryVersion":"2026.06.15-1","updatedAt":"2026-06-15","modeId":"words","modeName":"Sans le dire !","boxes":[{"id":"animals","name":"Animaux"},{"id":"jobs","name":"Métiers"},{"id":"objects","name":"Objets du quotidien"},{"id":"food","name":"Nourriture et boissons"},{"id":"places","name":"Lieux et transports"},{"id":"health","name":"Corps, santé et sport"},{"id":"daily","name":"Actions et situations quotidiennes"},{"id":"emotions","name":"Émotions, personnalité et relations"},{"id":"technology","name":"Technologie et Internet"},{"id":"culture","name":"Culture populaire et divertissement"},{"id":"nature","name":"Nature et monde"},{"id":"expressions","name":"Expressions françaises"},{"id":"uncategorized","name":"Sans catégorie","protected":true}],"cards":[{"id":"words-001","boxId":"animals","active":true,"prompt":"Chien","forbiddenWords":["aboyer","laisse","maître","chat","niche"],"difficulty":"easy"},{"id":"words-002","boxId":"animals","active":true,"prompt":"Chat","forbiddenWords":["miauler","moustaches","souris","chien","litière"],"difficulty":"easy"},{"id":"words-003","boxId":"animals","active":true,"prompt":"Lion","forbiddenWords":["jungle","crinière","rugir","roi","félin"],"difficulty":"easy"},{"id":"words-004","boxId":"animals","active":true,"prompt":"Éléphant","forbiddenWords":["trompe","défenses","Afrique","gros","gris"],"difficulty":"easy"},{"id":"words-005","boxId":"animals","active":true,"prompt":"Lapin","forbiddenWords":["carotte","oreilles","Pâques","terrier","sauter"],"difficulty":"easy"},{"id":"words-006","boxId":"animals","active":true,"prompt":"Cheval","forbiddenWords":["galoper","selle","crinière","écurie","sabots"],"difficulty":"easy"},{"id":"words-007","boxId":"animals","active":true,"prompt":"Vache","forbiddenWords":["lait","ferme","meugler","cornes","prairie"],"difficulty":"easy"},{"id":"words-008","boxId":"animals","active":true,"prompt":"Poule","forbiddenWords":["œuf","coq","ferme","plume","caqueter"],"difficulty":"easy"},{"id":"words-009","boxId":"animals","active":true,"prompt":"Poisson","forbiddenWords":["eau","nager","aquarium","nageoires","mer"],"difficulty":"easy"},{"id":"words-010","boxId":"animals","active":true,"prompt":"Singe","forbiddenWords":["banane","arbre","grimper","primate","zoo"],"difficulty":"easy"},{"id":"words-011","boxId":"animals","active":true,"prompt":"Kangourou","forbiddenWords":["Australie","poche","sauter","bébé","boxe"],"difficulty":"medium"},{"id":"words-012","boxId":"animals","active":true,"prompt":"Girafe","forbiddenWords":["cou","taches","Afrique","grande","savane"],"difficulty":"medium"},{"id":"words-013","boxId":"animals","active":true,"prompt":"Crocodile","forbiddenWords":["dents","reptile","marais","vert","Nil"],"difficulty":"medium"},{"id":"words-014","boxId":"animals","active":true,"prompt":"Hérisson","forbiddenWords":["piquants","boule","jardin","petit","dos"],"difficulty":"medium"},{"id":"words-015","boxId":"animals","active":true,"prompt":"Flamant rose","forbiddenWords":["oiseau","patte","couleur","bec","eau"],"difficulty":"medium"},{"id":"words-016","boxId":"animals","active":true,"prompt":"Dauphin","forbiddenWords":["mer","intelligent","sauter","mammifère","nageoire"],"difficulty":"medium"},{"id":"words-017","boxId":"animals","active":true,"prompt":"Renard","forbiddenWords":["roux","rusé","poule","forêt","terrier"],"difficulty":"medium"},{"id":"words-018","boxId":"animals","active":true,"prompt":"Gorille","forbiddenWords":["singe","poitrine","jungle","primate","puissant"],"difficulty":"medium"},{"id":"words-019","boxId":"animals","active":true,"prompt":"Paresseux","forbiddenWords":["lent","arbre","dormir","accroché","griffes"],"difficulty":"medium"},{"id":"words-020","boxId":"animals","active":true,"prompt":"Caméléon","forbiddenWords":["couleur","camouflage","lézard","langue","changer"],"difficulty":"medium"},{"id":"words-021","boxId":"animals","active":true,"prompt":"Ornithorynque","forbiddenWords":["bec","canard","Australie","mammifère","castor"],"difficulty":"hard"},{"id":"words-022","boxId":"animals","active":true,"prompt":"Hippocampe","forbiddenWords":["mer","cheval","queue","poisson","petit"],"difficulty":"hard"},{"id":"words-023","boxId":"animals","active":true,"prompt":"Suricate","forbiddenWords":["debout","désert","garde","groupe","terrier"],"difficulty":"hard"},{"id":"words-024","boxId":"animals","active":true,"prompt":"Pélican","forbiddenWords":["bec","poche","poisson","oiseau","mer"],"difficulty":"hard"},{"id":"words-025","boxId":"animals","active":true,"prompt":"Tatou","forbiddenWords":["carapace","boule","blindé","animal","Amérique"],"difficulty":"hard"},{"id":"words-026","boxId":"animals","active":true,"prompt":"Méduse","forbiddenWords":["tentacules","piquer","transparente","mer","nager"],"difficulty":"hard"},{"id":"words-027","boxId":"animals","active":true,"prompt":"Panda roux","forbiddenWords":["bambou","Chine","roux","arbre","panda"],"difficulty":"hard"},{"id":"words-028","boxId":"animals","active":true,"prompt":"Loutre","forbiddenWords":["rivière","coquillage","nager","moustaches","ventre"],"difficulty":"hard"},{"id":"words-029","boxId":"animals","active":true,"prompt":"Narval","forbiddenWords":["licorne","mer","défense","baleine","Arctique"],"difficulty":"hard"},{"id":"words-030","boxId":"animals","active":true,"prompt":"Axolotl","forbiddenWords":["rose","amphibien","branchies","Mexique","salamandre"],"difficulty":"hard"},{"id":"words-031","boxId":"jobs","active":true,"prompt":"Médecin","forbiddenWords":["hôpital","malade","soigner","docteur","santé"],"difficulty":"easy"},{"id":"words-032","boxId":"jobs","active":true,"prompt":"Pompier","forbiddenWords":["feu","incendie","camion","éteindre","secours"],"difficulty":"easy"},{"id":"words-033","boxId":"jobs","active":true,"prompt":"Professeur","forbiddenWords":["école","élèves","cours","classe","enseigner"],"difficulty":"easy"},{"id":"words-034","boxId":"jobs","active":true,"prompt":"Policier","forbiddenWords":["arrestation","uniforme","voleur","enquête","commissariat"],"difficulty":"easy"},{"id":"words-035","boxId":"jobs","active":true,"prompt":"Cuisinier","forbiddenWords":["cuisine","plat","restaurant","chef","repas"],"difficulty":"easy"},{"id":"words-036","boxId":"jobs","active":true,"prompt":"Coiffeur","forbiddenWords":["cheveux","couper","salon","ciseaux","coiffure"],"difficulty":"easy"},{"id":"words-037","boxId":"jobs","active":true,"prompt":"Serveur","forbiddenWords":["restaurant","plateau","client","commande","table"],"difficulty":"easy"},{"id":"words-038","boxId":"jobs","active":true,"prompt":"Facteur","forbiddenWords":["courrier","lettre","poste","colis","boîte"],"difficulty":"easy"},{"id":"words-039","boxId":"jobs","active":true,"prompt":"Infirmier","forbiddenWords":["hôpital","patient","soin","piqûre","médecin"],"difficulty":"easy"},{"id":"words-040","boxId":"jobs","active":true,"prompt":"Boulanger","forbiddenWords":["pain","farine","baguette","four","pâtisserie"],"difficulty":"easy"},{"id":"words-041","boxId":"jobs","active":true,"prompt":"Dentiste","forbiddenWords":["dents","bouche","carie","fraise","cabinet"],"difficulty":"medium"},{"id":"words-042","boxId":"jobs","active":true,"prompt":"Photographe","forbiddenWords":["photo","appareil","image","objectif","poser"],"difficulty":"medium"},{"id":"words-043","boxId":"jobs","active":true,"prompt":"Mécanicien","forbiddenWords":["voiture","garage","moteur","panne","réparer"],"difficulty":"medium"},{"id":"words-044","boxId":"jobs","active":true,"prompt":"Vétérinaire","forbiddenWords":["animaux","chien","chat","soigner","clinique"],"difficulty":"medium"},{"id":"words-045","boxId":"jobs","active":true,"prompt":"Jardinier","forbiddenWords":["jardin","fleurs","plantes","arroser","terre"],"difficulty":"medium"},{"id":"words-046","boxId":"jobs","active":true,"prompt":"Journaliste","forbiddenWords":["information","article","interview","journal","télévision"],"difficulty":"medium"},{"id":"words-047","boxId":"jobs","active":true,"prompt":"Astronaute","forbiddenWords":["espace","Lune","fusée","combinaison","planète"],"difficulty":"medium"},{"id":"words-048","boxId":"jobs","active":true,"prompt":"Architecte","forbiddenWords":["bâtiment","plan","maison","dessiner","construction"],"difficulty":"medium"},{"id":"words-049","boxId":"jobs","active":true,"prompt":"Psychologue","forbiddenWords":["écouter","patient","émotions","thérapie","parler"],"difficulty":"medium"},{"id":"words-050","boxId":"jobs","active":true,"prompt":"Chauffeur de taxi","forbiddenWords":["voiture","client","conduire","course","compteur"],"difficulty":"medium"},{"id":"words-051","boxId":"jobs","active":true,"prompt":"Apiculteur","forbiddenWords":["abeilles","miel","ruche","combinaison","essaim"],"difficulty":"hard"},{"id":"words-052","boxId":"jobs","active":true,"prompt":"Serrurier","forbiddenWords":["clé","porte","serrure","ouvrir","dépannage"],"difficulty":"hard"},{"id":"words-053","boxId":"jobs","active":true,"prompt":"Notaire","forbiddenWords":["contrat","signature","héritage","immobilier","acte"],"difficulty":"hard"},{"id":"words-054","boxId":"jobs","active":true,"prompt":"Scénariste","forbiddenWords":["film","histoire","écrire","dialogue","cinéma"],"difficulty":"hard"},{"id":"words-055","boxId":"jobs","active":true,"prompt":"Archéologue","forbiddenWords":["fouilles","passé","trésor","histoire","os"],"difficulty":"hard"},{"id":"words-056","boxId":"jobs","active":true,"prompt":"Douanier","forbiddenWords":["frontière","contrôle","passeport","valise","marchandises"],"difficulty":"hard"},{"id":"words-057","boxId":"jobs","active":true,"prompt":"Cascadeur","forbiddenWords":["cinéma","danger","chute","doublure","acteur"],"difficulty":"hard"},{"id":"words-058","boxId":"jobs","active":true,"prompt":"Œnologue","forbiddenWords":["vin","raisin","bouteille","cave","goûter"],"difficulty":"hard"},{"id":"words-059","boxId":"jobs","active":true,"prompt":"Cartographe","forbiddenWords":["carte","géographie","territoire","pays","dessiner"],"difficulty":"hard"},{"id":"words-060","boxId":"jobs","active":true,"prompt":"Commissaire-priseur","forbiddenWords":["enchères","marteau","vendre","prix","objet"],"difficulty":"hard"},{"id":"words-061","boxId":"objects","active":true,"prompt":"Téléphone","forbiddenWords":["appeler","écran","portable","message","smartphone"],"difficulty":"easy"},{"id":"words-062","boxId":"objects","active":true,"prompt":"Chaise","forbiddenWords":["s’asseoir","meuble","table","pieds","dossier"],"difficulty":"easy"},{"id":"words-063","boxId":"objects","active":true,"prompt":"Miroir","forbiddenWords":["reflet","visage","regarder","verre","salle de bain"],"difficulty":"easy"},{"id":"words-064","boxId":"objects","active":true,"prompt":"Ciseaux","forbiddenWords":["couper","papier","lames","pointu","coiffure"],"difficulty":"easy"},{"id":"words-065","boxId":"objects","active":true,"prompt":"Valise","forbiddenWords":["voyage","vêtements","vacances","roulettes","bagages"],"difficulty":"easy"},{"id":"words-066","boxId":"objects","active":true,"prompt":"Parapluie","forbiddenWords":["pluie","mouillé","ouvrir","protéger","météo"],"difficulty":"easy"},{"id":"words-067","boxId":"objects","active":true,"prompt":"Oreiller","forbiddenWords":["dormir","lit","tête","nuit","coussin"],"difficulty":"easy"},{"id":"words-068","boxId":"objects","active":true,"prompt":"Fourchette","forbiddenWords":["manger","dents","couvert","assiette","couteau"],"difficulty":"easy"},{"id":"words-069","boxId":"objects","active":true,"prompt":"Bougie","forbiddenWords":["flamme","cire","anniversaire","souffler","lumière"],"difficulty":"easy"},{"id":"words-070","boxId":"objects","active":true,"prompt":"Télécommande","forbiddenWords":["télévision","bouton","chaîne","canapé","changer"],"difficulty":"easy"},{"id":"words-071","boxId":"objects","active":true,"prompt":"Tire-bouchon","forbiddenWords":["bouteille","vin","bouchon","ouvrir","vis"],"difficulty":"medium"},{"id":"words-072","boxId":"objects","active":true,"prompt":"Agrafeuse","forbiddenWords":["papier","bureau","attacher","métal","feuille"],"difficulty":"medium"},{"id":"words-073","boxId":"objects","active":true,"prompt":"Passoire","forbiddenWords":["pâtes","trous","eau","égoutter","cuisine"],"difficulty":"medium"},{"id":"words-074","boxId":"objects","active":true,"prompt":"Extincteur","forbiddenWords":["feu","incendie","rouge","éteindre","sécurité"],"difficulty":"medium"},{"id":"words-075","boxId":"objects","active":true,"prompt":"Bouillotte","forbiddenWords":["chaud","eau","lit","hiver","réchauffer"],"difficulty":"medium"},{"id":"words-076","boxId":"objects","active":true,"prompt":"Cadenas","forbiddenWords":["clé","fermer","serrure","sécurité","code"],"difficulty":"medium"},{"id":"words-077","boxId":"objects","active":true,"prompt":"Entonnoir","forbiddenWords":["verser","liquide","bouteille","trou","récipient"],"difficulty":"medium"},{"id":"words-078","boxId":"objects","active":true,"prompt":"Thermomètre","forbiddenWords":["température","fièvre","degrés","malade","mesurer"],"difficulty":"medium"},{"id":"words-079","boxId":"objects","active":true,"prompt":"Lampe torche","forbiddenWords":["lumière","nuit","piles","sombre","éclairer"],"difficulty":"medium"},{"id":"words-080","boxId":"objects","active":true,"prompt":"Casque audio","forbiddenWords":["musique","oreilles","écouter","son","écouteurs"],"difficulty":"medium"},{"id":"words-081","boxId":"objects","active":true,"prompt":"Niveau à bulle","forbiddenWords":["droit","outil","travaux","horizontal","mesurer"],"difficulty":"hard"},{"id":"words-082","boxId":"objects","active":true,"prompt":"Moustiquaire","forbiddenWords":["moustique","fenêtre","filet","insecte","protéger"],"difficulty":"hard"},{"id":"words-083","boxId":"objects","active":true,"prompt":"Pied-de-biche","forbiddenWords":["outil","porte","forcer","métal","levier"],"difficulty":"hard"},{"id":"words-084","boxId":"objects","active":true,"prompt":"Décapsuleur","forbiddenWords":["bouteille","capsule","bière","ouvrir","métal"],"difficulty":"hard"},{"id":"words-085","boxId":"objects","active":true,"prompt":"Pince à épiler","forbiddenWords":["poil","sourcil","retirer","beauté","petit"],"difficulty":"hard"},{"id":"words-086","boxId":"objects","active":true,"prompt":"Sablier","forbiddenWords":["sable","temps","verre","retourner","minute"],"difficulty":"hard"},{"id":"words-087","boxId":"objects","active":true,"prompt":"Escabeau","forbiddenWords":["monter","hauteur","marches","échelle","travaux"],"difficulty":"hard"},{"id":"words-088","boxId":"objects","active":true,"prompt":"Perforatrice","forbiddenWords":["papier","trous","feuilles","classeur","bureau"],"difficulty":"hard"},{"id":"words-089","boxId":"objects","active":true,"prompt":"Mousqueton","forbiddenWords":["escalade","corde","accrocher","métal","sécurité"],"difficulty":"hard"},{"id":"words-090","boxId":"objects","active":true,"prompt":"Essuie-glace","forbiddenWords":["voiture","pluie","pare-brise","nettoyer","balayer"],"difficulty":"hard"},{"id":"words-091","boxId":"food","active":true,"prompt":"Pizza","forbiddenWords":["Italie","fromage","tomate","pâte","part"],"difficulty":"easy"},{"id":"words-092","boxId":"food","active":true,"prompt":"Chocolat","forbiddenWords":["cacao","tablette","sucré","noir","bonbon"],"difficulty":"easy"},{"id":"words-093","boxId":"food","active":true,"prompt":"Banane","forbiddenWords":["fruit","jaune","singe","peau","éplucher"],"difficulty":"easy"},{"id":"words-094","boxId":"food","active":true,"prompt":"Hamburger","forbiddenWords":["pain","viande","fast-food","frites","sandwich"],"difficulty":"easy"},{"id":"words-095","boxId":"food","active":true,"prompt":"Café","forbiddenWords":["boire","chaud","matin","tasse","caféine"],"difficulty":"easy"},{"id":"words-096","boxId":"food","active":true,"prompt":"Glace","forbiddenWords":["froid","été","cornet","parfum","fondre"],"difficulty":"easy"},{"id":"words-097","boxId":"food","active":true,"prompt":"Pomme","forbiddenWords":["fruit","rouge","arbre","croquer","compote"],"difficulty":"easy"},{"id":"words-098","boxId":"food","active":true,"prompt":"Fromage","forbiddenWords":["lait","souris","odeur","plateau","manger"],"difficulty":"easy"},{"id":"words-099","boxId":"food","active":true,"prompt":"Œuf","forbiddenWords":["poule","coquille","jaune","omelette","cuire"],"difficulty":"easy"},{"id":"words-100","boxId":"food","active":true,"prompt":"Frites","forbiddenWords":["pomme de terre","huile","sel","ketchup","fast-food"],"difficulty":"easy"},{"id":"words-101","boxId":"food","active":true,"prompt":"Raclette","forbiddenWords":["fromage","hiver","charcuterie","fondre","pomme de terre"],"difficulty":"medium"},{"id":"words-102","boxId":"food","active":true,"prompt":"Sushi","forbiddenWords":["Japon","poisson","riz","cru","baguettes"],"difficulty":"medium"},{"id":"words-103","boxId":"food","active":true,"prompt":"Guacamole","forbiddenWords":["avocat","Mexique","vert","sauce","chips"],"difficulty":"medium"},{"id":"words-104","boxId":"food","active":true,"prompt":"Tiramisu","forbiddenWords":["dessert","café","mascarpone","biscuit","Italie"],"difficulty":"medium"},{"id":"words-105","boxId":"food","active":true,"prompt":"Croissant","forbiddenWords":["boulangerie","beurre","matin","viennoiserie","lune"],"difficulty":"medium"},{"id":"words-106","boxId":"food","active":true,"prompt":"Mojito","forbiddenWords":["cocktail","menthe","rhum","citron","alcool"],"difficulty":"medium"},{"id":"words-107","boxId":"food","active":true,"prompt":"Fondue","forbiddenWords":["fromage","pain","tremper","montagne","casserole"],"difficulty":"medium"},{"id":"words-108","boxId":"food","active":true,"prompt":"Lasagnes","forbiddenWords":["pâtes","couches","Italie","viande","fromage"],"difficulty":"medium"},{"id":"words-109","boxId":"food","active":true,"prompt":"Couscous","forbiddenWords":["semoule","légumes","merguez","Maghreb","plat"],"difficulty":"medium"},{"id":"words-110","boxId":"food","active":true,"prompt":"Omelette","forbiddenWords":["œufs","poêle","battre","cuire","repas"],"difficulty":"medium"},{"id":"words-111","boxId":"food","active":true,"prompt":"Crème brûlée","forbiddenWords":["dessert","caramel","sucre","casser","cuillère"],"difficulty":"hard"},{"id":"words-112","boxId":"food","active":true,"prompt":"Œuf à la coque","forbiddenWords":["mouillette","jaune","coquille","cuire","matin"],"difficulty":"hard"},{"id":"words-113","boxId":"food","active":true,"prompt":"Bœuf bourguignon","forbiddenWords":["viande","vin","sauce","France","mijoter"],"difficulty":"hard"},{"id":"words-114","boxId":"food","active":true,"prompt":"Île flottante","forbiddenWords":["dessert","œuf","neige","crème","caramel"],"difficulty":"hard"},{"id":"words-115","boxId":"food","active":true,"prompt":"Chouquette","forbiddenWords":["sucre","pâtisserie","chou","petite","boulangerie"],"difficulty":"hard"},{"id":"words-116","boxId":"food","active":true,"prompt":"Cordon-bleu","forbiddenWords":["poulet","jambon","fromage","pané","viande"],"difficulty":"hard"},{"id":"words-117","boxId":"food","active":true,"prompt":"Pain perdu","forbiddenWords":["lait","œuf","tranche","dessert","vieux"],"difficulty":"hard"},{"id":"words-118","boxId":"food","active":true,"prompt":"Ratatouille","forbiddenWords":["légumes","courgette","aubergine","tomate","Provence"],"difficulty":"hard"},{"id":"words-119","boxId":"food","active":true,"prompt":"Profiteroles","forbiddenWords":["dessert","chocolat","glace","choux","sauce"],"difficulty":"hard"},{"id":"words-120","boxId":"food","active":true,"prompt":"Risotto","forbiddenWords":["riz","Italie","crémeux","parmesan","cuisson"],"difficulty":"hard"},{"id":"words-121","boxId":"places","active":true,"prompt":"École","forbiddenWords":["élèves","professeur","classe","apprendre","récréation"],"difficulty":"easy"},{"id":"words-122","boxId":"places","active":true,"prompt":"Plage","forbiddenWords":["sable","mer","soleil","vacances","nager"],"difficulty":"easy"},{"id":"words-123","boxId":"places","active":true,"prompt":"Hôpital","forbiddenWords":["médecin","malade","soins","urgence","infirmier"],"difficulty":"easy"},{"id":"words-124","boxId":"places","active":true,"prompt":"Cinéma","forbiddenWords":["film","écran","pop-corn","salle","regarder"],"difficulty":"easy"},{"id":"words-125","boxId":"places","active":true,"prompt":"Avion","forbiddenWords":["voler","ciel","pilote","aéroport","ailes"],"difficulty":"easy"},{"id":"words-126","boxId":"places","active":true,"prompt":"Train","forbiddenWords":["gare","rails","wagon","voyage","locomotive"],"difficulty":"easy"},{"id":"words-127","boxId":"places","active":true,"prompt":"Supermarché","forbiddenWords":["courses","magasin","caisse","chariot","produits"],"difficulty":"easy"},{"id":"words-128","boxId":"places","active":true,"prompt":"Restaurant","forbiddenWords":["manger","serveur","table","menu","cuisine"],"difficulty":"easy"},{"id":"words-129","boxId":"places","active":true,"prompt":"Zoo","forbiddenWords":["animaux","cages","visiter","parc","sauvages"],"difficulty":"easy"},{"id":"words-130","boxId":"places","active":true,"prompt":"Bus","forbiddenWords":["transport","arrêt","conducteur","ticket","ville"],"difficulty":"easy"},{"id":"words-131","boxId":"places","active":true,"prompt":"Aéroport","forbiddenWords":["avion","valise","passeport","voyage","décoller"],"difficulty":"medium"},{"id":"words-132","boxId":"places","active":true,"prompt":"Camping","forbiddenWords":["tente","vacances","nature","caravane","dormir"],"difficulty":"medium"},{"id":"words-133","boxId":"places","active":true,"prompt":"Musée","forbiddenWords":["art","tableau","exposition","visite","histoire"],"difficulty":"medium"},{"id":"words-134","boxId":"places","active":true,"prompt":"Métro","forbiddenWords":["souterrain","station","ville","train","transport"],"difficulty":"medium"},{"id":"words-135","boxId":"places","active":true,"prompt":"Parc d’attractions","forbiddenWords":["manège","montagnes russes","billet","sensations","parc"],"difficulty":"medium"},{"id":"words-136","boxId":"places","active":true,"prompt":"Commissariat","forbiddenWords":["police","plainte","policier","enquête","arrestation"],"difficulty":"medium"},{"id":"words-137","boxId":"places","active":true,"prompt":"Désert","forbiddenWords":["sable","chaud","chameau","Sahara","eau"],"difficulty":"medium"},{"id":"words-138","boxId":"places","active":true,"prompt":"Phare","forbiddenWords":["mer","lumière","bateau","tour","côte"],"difficulty":"medium"},{"id":"words-139","boxId":"places","active":true,"prompt":"Gare","forbiddenWords":["train","quai","billet","départ","voyage"],"difficulty":"medium"},{"id":"words-140","boxId":"places","active":true,"prompt":"Bibliothèque","forbiddenWords":["livres","lire","silence","emprunter","rayons"],"difficulty":"medium"},{"id":"words-141","boxId":"places","active":true,"prompt":"Aire d’autoroute","forbiddenWords":["voiture","pause","route","toilettes","station-service"],"difficulty":"hard"},{"id":"words-142","boxId":"places","active":true,"prompt":"Salle d’attente","forbiddenWords":["patienter","médecin","chaise","rendez-vous","attendre"],"difficulty":"hard"},{"id":"words-143","boxId":"places","active":true,"prompt":"Péage","forbiddenWords":["autoroute","payer","barrière","ticket","voiture"],"difficulty":"hard"},{"id":"words-144","boxId":"places","active":true,"prompt":"Consigne à bagages","forbiddenWords":["valise","casier","gare","déposer","voyage"],"difficulty":"hard"},{"id":"words-145","boxId":"places","active":true,"prompt":"Funiculaire","forbiddenWords":["montagne","rail","cabine","monter","transport"],"difficulty":"hard"},{"id":"words-146","boxId":"places","active":true,"prompt":"Rond-point","forbiddenWords":["voiture","tourner","route","sortie","giratoire"],"difficulty":"hard"},{"id":"words-147","boxId":"places","active":true,"prompt":"Passage piéton","forbiddenWords":["traverser","route","blanc","voiture","marcher"],"difficulty":"hard"},{"id":"words-148","boxId":"places","active":true,"prompt":"Station-service","forbiddenWords":["essence","voiture","carburant","pompe","autoroute"],"difficulty":"hard"},{"id":"words-149","boxId":"places","active":true,"prompt":"Auberge de jeunesse","forbiddenWords":["dormir","voyage","chambre","hôtel","jeunes"],"difficulty":"hard"},{"id":"words-150","boxId":"places","active":true,"prompt":"Téléphérique","forbiddenWords":["montagne","cabine","câble","monter","hauteur"],"difficulty":"hard"},{"id":"words-151","boxId":"health","active":true,"prompt":"Main","forbiddenWords":["doigts","bras","toucher","paume","cinq"],"difficulty":"easy"},{"id":"words-152","boxId":"health","active":true,"prompt":"Cœur","forbiddenWords":["battre","amour","sang","poitrine","organe"],"difficulty":"easy"},{"id":"words-153","boxId":"health","active":true,"prompt":"Dent","forbiddenWords":["bouche","mâcher","dentiste","blanc","carie"],"difficulty":"easy"},{"id":"words-154","boxId":"health","active":true,"prompt":"Football","forbiddenWords":["ballon","but","pied","équipe","stade"],"difficulty":"easy"},{"id":"words-155","boxId":"health","active":true,"prompt":"Natation","forbiddenWords":["piscine","nager","eau","maillot","crawl"],"difficulty":"easy"},{"id":"words-156","boxId":"health","active":true,"prompt":"Mal de tête","forbiddenWords":["douleur","migraine","crâne","médicament","front"],"difficulty":"easy"},{"id":"words-157","boxId":"health","active":true,"prompt":"Rhume","forbiddenWords":["nez","mouchoir","malade","éternuer","froid"],"difficulty":"easy"},{"id":"words-158","boxId":"health","active":true,"prompt":"Muscle","forbiddenWords":["force","corps","sport","contracter","bras"],"difficulty":"easy"},{"id":"words-159","boxId":"health","active":true,"prompt":"Genou","forbiddenWords":["jambe","articulation","plier","rotule","marcher"],"difficulty":"easy"},{"id":"words-160","boxId":"health","active":true,"prompt":"Épaule","forbiddenWords":["bras","articulation","porter","cou","corps"],"difficulty":"easy"},{"id":"words-161","boxId":"health","active":true,"prompt":"Entorse","forbiddenWords":["cheville","blessure","douleur","tordre","sport"],"difficulty":"medium"},{"id":"words-162","boxId":"health","active":true,"prompt":"Allergie","forbiddenWords":["pollen","réaction","éternuer","médicament","peau"],"difficulty":"medium"},{"id":"words-163","boxId":"health","active":true,"prompt":"Insomnie","forbiddenWords":["dormir","nuit","sommeil","fatigue","réveillé"],"difficulty":"medium"},{"id":"words-164","boxId":"health","active":true,"prompt":"Plâtre","forbiddenWords":["fracture","bras","jambe","cassé","hôpital"],"difficulty":"medium"},{"id":"words-165","boxId":"health","active":true,"prompt":"Escalade","forbiddenWords":["grimper","mur","corde","hauteur","rocher"],"difficulty":"medium"},{"id":"words-166","boxId":"health","active":true,"prompt":"Marathon","forbiddenWords":["courir","kilomètres","course","fatigue","sportif"],"difficulty":"medium"},{"id":"words-167","boxId":"health","active":true,"prompt":"Échauffement","forbiddenWords":["sport","muscles","préparer","avant","exercice"],"difficulty":"medium"},{"id":"words-168","boxId":"health","active":true,"prompt":"Hoquet","forbiddenWords":["bruit","respirer","boire","diaphragme","arrêter"],"difficulty":"medium"},{"id":"words-169","boxId":"health","active":true,"prompt":"Crampe","forbiddenWords":["muscle","douleur","sport","contracter","jambe"],"difficulty":"medium"},{"id":"words-170","boxId":"health","active":true,"prompt":"Fièvre","forbiddenWords":["température","chaud","malade","thermomètre","degrés"],"difficulty":"medium"},{"id":"words-171","boxId":"health","active":true,"prompt":"Claustrophobie","forbiddenWords":["peur","enfermé","ascenseur","petit","espace"],"difficulty":"hard"},{"id":"words-172","boxId":"health","active":true,"prompt":"Courbatures","forbiddenWords":["muscles","douleur","sport","lendemain","corps"],"difficulty":"hard"},{"id":"words-173","boxId":"health","active":true,"prompt":"Somnambulisme","forbiddenWords":["dormir","marcher","nuit","inconscient","lit"],"difficulty":"hard"},{"id":"words-174","boxId":"health","active":true,"prompt":"Déshydratation","forbiddenWords":["eau","boire","soif","chaleur","corps"],"difficulty":"hard"},{"id":"words-175","boxId":"health","active":true,"prompt":"Tendinite","forbiddenWords":["tendon","douleur","sport","inflammation","mouvement"],"difficulty":"hard"},{"id":"words-176","boxId":"health","active":true,"prompt":"Point de côté","forbiddenWords":["courir","douleur","ventre","respirer","sport"],"difficulty":"hard"},{"id":"words-177","boxId":"health","active":true,"prompt":"Crise d’angoisse","forbiddenWords":["peur","panique","respirer","stress","cœur"],"difficulty":"hard"},{"id":"words-178","boxId":"health","active":true,"prompt":"Hypertension","forbiddenWords":["tension","sang","pression","cœur","médecin"],"difficulty":"hard"},{"id":"words-179","boxId":"health","active":true,"prompt":"Commotion cérébrale","forbiddenWords":["tête","choc","cerveau","accident","sport"],"difficulty":"hard"},{"id":"words-180","boxId":"health","active":true,"prompt":"Apnée du sommeil","forbiddenWords":["dormir","respirer","nuit","arrêt","ronfler"],"difficulty":"hard"},{"id":"words-181","boxId":"daily","active":true,"prompt":"Dormir","forbiddenWords":["lit","nuit","yeux","fatigue","réveil"],"difficulty":"easy"},{"id":"words-182","boxId":"daily","active":true,"prompt":"Cuisiner","forbiddenWords":["repas","cuisine","préparer","casserole","manger"],"difficulty":"easy"},{"id":"words-183","boxId":"daily","active":true,"prompt":"Téléphoner","forbiddenWords":["appeler","portable","numéro","parler","téléphone"],"difficulty":"easy"},{"id":"words-184","boxId":"daily","active":true,"prompt":"Danser","forbiddenWords":["musique","bouger","soirée","rythme","corps"],"difficulty":"easy"},{"id":"words-185","boxId":"daily","active":true,"prompt":"Faire les courses","forbiddenWords":["magasin","chariot","acheter","liste","supermarché"],"difficulty":"easy"},{"id":"words-186","boxId":"daily","active":true,"prompt":"Prendre une douche","forbiddenWords":["eau","savon","laver","propre","salle de bain"],"difficulty":"easy"},{"id":"words-187","boxId":"daily","active":true,"prompt":"Se maquiller","forbiddenWords":["visage","miroir","beauté","rouge à lèvres","fond de teint"],"difficulty":"easy"},{"id":"words-188","boxId":"daily","active":true,"prompt":"Faire le ménage","forbiddenWords":["nettoyer","aspirateur","maison","poussière","propre"],"difficulty":"easy"},{"id":"words-189","boxId":"daily","active":true,"prompt":"Éternuer","forbiddenWords":["nez","mouchoir","allergie","rhume","bruit"],"difficulty":"easy"},{"id":"words-190","boxId":"daily","active":true,"prompt":"Faire un câlin","forbiddenWords":["bras","serrer","affection","personne","tendresse"],"difficulty":"easy"},{"id":"words-191","boxId":"daily","active":true,"prompt":"Rater son réveil","forbiddenWords":["dormir","retard","matin","alarme","heure"],"difficulty":"medium"},{"id":"words-192","boxId":"daily","active":true,"prompt":"Perdre ses clés","forbiddenWords":["chercher","porte","trousseau","serrure","retrouver"],"difficulty":"medium"},{"id":"words-193","boxId":"daily","active":true,"prompt":"Monter un meuble","forbiddenWords":["notice","vis","assembler","bois","outil"],"difficulty":"medium"},{"id":"words-194","boxId":"daily","active":true,"prompt":"Faire une sieste","forbiddenWords":["dormir","après-midi","repos","lit","court"],"difficulty":"medium"},{"id":"words-195","boxId":"daily","active":true,"prompt":"Rater son bus","forbiddenWords":["transport","courir","retard","arrêt","partir"],"difficulty":"medium"},{"id":"words-196","boxId":"daily","active":true,"prompt":"Oublier un anniversaire","forbiddenWords":["date","cadeau","fête","souvenir","personne"],"difficulty":"medium"},{"id":"words-197","boxId":"daily","active":true,"prompt":"Faire la queue","forbiddenWords":["attendre","file","magasin","personnes","tour"],"difficulty":"medium"},{"id":"words-198","boxId":"daily","active":true,"prompt":"Changer une ampoule","forbiddenWords":["lumière","lampe","plafond","visser","électricité"],"difficulty":"medium"},{"id":"words-199","boxId":"daily","active":true,"prompt":"Annuler un rendez-vous","forbiddenWords":["prévenir","date","téléphone","venir","empêchement"],"difficulty":"medium"},{"id":"words-200","boxId":"daily","active":true,"prompt":"Se perdre","forbiddenWords":["chemin","carte","direction","retrouver","lieu"],"difficulty":"medium"},{"id":"words-201","boxId":"daily","active":true,"prompt":"Faire semblant de travailler","forbiddenWords":["patron","ordinateur","bureau","cacher","arriver"],"difficulty":"hard"},{"id":"words-202","boxId":"daily","active":true,"prompt":"Envoyer un message à la mauvaise personne","forbiddenWords":["téléphone","destinataire","erreur","SMS","honte"],"difficulty":"hard"},{"id":"words-203","boxId":"daily","active":true,"prompt":"Se tromper de porte","forbiddenWords":["entrer","maison","erreur","pièce","ouvrir"],"difficulty":"hard"},{"id":"words-204","boxId":"daily","active":true,"prompt":"Oublier pourquoi on est entré dans une pièce","forbiddenWords":["mémoire","porte","raison","chercher","oublier"],"difficulty":"hard"},{"id":"words-205","boxId":"daily","active":true,"prompt":"Croiser quelqu’un qu’on évite","forbiddenWords":["rencontrer","personne","fuir","cacher","regard"],"difficulty":"hard"},{"id":"words-206","boxId":"daily","active":true,"prompt":"Manger quelque chose tombé par terre","forbiddenWords":["nourriture","sol","sale","ramasser","secondes"],"difficulty":"hard"},{"id":"words-207","boxId":"daily","active":true,"prompt":"Faire tomber son téléphone sur son visage","forbiddenWords":["lit","portable","nez","main","douleur"],"difficulty":"hard"},{"id":"words-208","boxId":"daily","active":true,"prompt":"Inventer une excuse","forbiddenWords":["mentir","raison","expliquer","faux","éviter"],"difficulty":"hard"},{"id":"words-209","boxId":"daily","active":true,"prompt":"Oublier son code PIN","forbiddenWords":["téléphone","chiffres","débloquer","mémoire","carte"],"difficulty":"hard"},{"id":"words-210","boxId":"daily","active":true,"prompt":"Faire semblant de dormir","forbiddenWords":["yeux","lit","réveillé","ronfler","faux"],"difficulty":"hard"},{"id":"words-211","boxId":"emotions","active":true,"prompt":"Joie","forbiddenWords":["heureux","sourire","bonheur","content","émotion"],"difficulty":"easy"},{"id":"words-212","boxId":"emotions","active":true,"prompt":"Colère","forbiddenWords":["énervé","crier","fâché","rouge","émotion"],"difficulty":"easy"},{"id":"words-213","boxId":"emotions","active":true,"prompt":"Peur","forbiddenWords":["effrayé","danger","trembler","horreur","émotion"],"difficulty":"easy"},{"id":"words-214","boxId":"emotions","active":true,"prompt":"Tristesse","forbiddenWords":["pleurer","larmes","malheureux","émotion","déprimé"],"difficulty":"easy"},{"id":"words-215","boxId":"emotions","active":true,"prompt":"Amour","forbiddenWords":["cœur","couple","amoureux","sentiment","relation"],"difficulty":"easy"},{"id":"words-216","boxId":"emotions","active":true,"prompt":"Timidité","forbiddenWords":["gêné","parler","rouge","discret","personnes"],"difficulty":"easy"},{"id":"words-217","boxId":"emotions","active":true,"prompt":"Jalousie","forbiddenWords":["envier","couple","possessif","autre","sentiment"],"difficulty":"easy"},{"id":"words-218","boxId":"emotions","active":true,"prompt":"Courage","forbiddenWords":["peur","brave","affronter","héros","oser"],"difficulty":"easy"},{"id":"words-219","boxId":"emotions","active":true,"prompt":"Honte","forbiddenWords":["gêné","rouge","embarrassé","cacher","sentiment"],"difficulty":"easy"},{"id":"words-220","boxId":"emotions","active":true,"prompt":"Surprise","forbiddenWords":["inattendu","cadeau","étonné","réaction","découvrir"],"difficulty":"easy"},{"id":"words-221","boxId":"emotions","active":true,"prompt":"Mauvaise foi","forbiddenWords":["tort","reconnaître","excuse","raison","mentir"],"difficulty":"medium"},{"id":"words-222","boxId":"emotions","active":true,"prompt":"Hypocrisie","forbiddenWords":["faux","gentil","derrière","penser","personne"],"difficulty":"medium"},{"id":"words-223","boxId":"emotions","active":true,"prompt":"Impatience","forbiddenWords":["attendre","vite","temps","agacé","pressé"],"difficulty":"medium"},{"id":"words-224","boxId":"emotions","active":true,"prompt":"Nostalgie","forbiddenWords":["passé","souvenir","enfance","ancien","regret"],"difficulty":"medium"},{"id":"words-225","boxId":"emotions","active":true,"prompt":"Culpabilité","forbiddenWords":["faute","mal","regret","responsable","conscience"],"difficulty":"medium"},{"id":"words-226","boxId":"emotions","active":true,"prompt":"Soulagement","forbiddenWords":["peur","terminé","respirer","rassuré","stress"],"difficulty":"medium"},{"id":"words-227","boxId":"emotions","active":true,"prompt":"Fierté","forbiddenWords":["réussite","content","soi","victoire","honneur"],"difficulty":"medium"},{"id":"words-228","boxId":"emotions","active":true,"prompt":"Solitude","forbiddenWords":["seul","personne","isolement","compagnie","triste"],"difficulty":"medium"},{"id":"words-229","boxId":"emotions","active":true,"prompt":"Frustration","forbiddenWords":["énervé","échec","bloqué","obtenir","sentiment"],"difficulty":"medium"},{"id":"words-230","boxId":"emotions","active":true,"prompt":"Admiration","forbiddenWords":["impressionné","modèle","talent","apprécier","personne"],"difficulty":"medium"},{"id":"words-231","boxId":"emotions","active":true,"prompt":"Passif-agressif","forbiddenWords":["colère","indirect","remarque","gentil","reproche"],"difficulty":"hard"},{"id":"words-232","boxId":"emotions","active":true,"prompt":"Rancunier","forbiddenWords":["pardonner","oublier","vengeance","longtemps","colère"],"difficulty":"hard"},{"id":"words-233","boxId":"emotions","active":true,"prompt":"Susceptible","forbiddenWords":["vexé","critique","remarque","facilement","prendre mal"],"difficulty":"hard"},{"id":"words-234","boxId":"emotions","active":true,"prompt":"Perfectionniste","forbiddenWords":["parfait","détail","erreur","exigeant","travail"],"difficulty":"hard"},{"id":"words-235","boxId":"emotions","active":true,"prompt":"Manipulateur","forbiddenWords":["contrôler","influencer","mensonge","personne","convaincre"],"difficulty":"hard"},{"id":"words-236","boxId":"emotions","active":true,"prompt":"Indécis","forbiddenWords":["choisir","hésiter","décision","option","savoir"],"difficulty":"hard"},{"id":"words-237","boxId":"emotions","active":true,"prompt":"Maladroit","forbiddenWords":["tomber","casser","geste","accident","gauche"],"difficulty":"hard"},{"id":"words-238","boxId":"emotions","active":true,"prompt":"Lunatique","forbiddenWords":["humeur","changer","rapidement","caractère","émotion"],"difficulty":"hard"},{"id":"words-239","boxId":"emotions","active":true,"prompt":"Empathie","forbiddenWords":["comprendre","émotions","ressentir","autre","compassion"],"difficulty":"hard"},{"id":"words-240","boxId":"emotions","active":true,"prompt":"Procrastination","forbiddenWords":["reporter","demain","travail","tâche","attendre"],"difficulty":"hard"},{"id":"words-241","boxId":"technology","active":true,"prompt":"Ordinateur","forbiddenWords":["écran","clavier","souris","PC","travailler"],"difficulty":"easy"},{"id":"words-242","boxId":"technology","active":true,"prompt":"Internet","forbiddenWords":["réseau","connexion","site","Wi-Fi","en ligne"],"difficulty":"easy"},{"id":"words-243","boxId":"technology","active":true,"prompt":"Mot de passe","forbiddenWords":["secret","compte","code","connexion","lettres"],"difficulty":"easy"},{"id":"words-244","boxId":"technology","active":true,"prompt":"Selfie","forbiddenWords":["photo","téléphone","visage","bras","caméra"],"difficulty":"easy"},{"id":"words-245","boxId":"technology","active":true,"prompt":"Wi-Fi","forbiddenWords":["Internet","connexion","réseau","box","sans fil"],"difficulty":"easy"},{"id":"words-246","boxId":"technology","active":true,"prompt":"Jeu vidéo","forbiddenWords":["console","jouer","manette","écran","gamer"],"difficulty":"easy"},{"id":"words-247","boxId":"technology","active":true,"prompt":"Réseau social","forbiddenWords":["Internet","publier","abonnés","profil","application"],"difficulty":"easy"},{"id":"words-248","boxId":"technology","active":true,"prompt":"Chargeur","forbiddenWords":["batterie","téléphone","câble","prise","brancher"],"difficulty":"easy"},{"id":"words-249","boxId":"technology","active":true,"prompt":"Clavier","forbiddenWords":["touches","ordinateur","écrire","lettres","taper"],"difficulty":"easy"},{"id":"words-250","boxId":"technology","active":true,"prompt":"Imprimante","forbiddenWords":["papier","encre","document","feuille","ordinateur"],"difficulty":"easy"},{"id":"words-251","boxId":"technology","active":true,"prompt":"Reconnaissance faciale","forbiddenWords":["visage","déverrouiller","téléphone","caméra","identifier"],"difficulty":"medium"},{"id":"words-252","boxId":"technology","active":true,"prompt":"Intelligence artificielle","forbiddenWords":["robot","ChatGPT","ordinateur","humain","technologie"],"difficulty":"medium"},{"id":"words-253","boxId":"technology","active":true,"prompt":"Capture d’écran","forbiddenWords":["photo","écran","téléphone","image","enregistrer"],"difficulty":"medium"},{"id":"words-254","boxId":"technology","active":true,"prompt":"Mode avion","forbiddenWords":["téléphone","connexion","réseau","voler","activer"],"difficulty":"medium"},{"id":"words-255","boxId":"technology","active":true,"prompt":"Mise à jour","forbiddenWords":["logiciel","installer","nouvelle","version","attendre"],"difficulty":"medium"},{"id":"words-256","boxId":"technology","active":true,"prompt":"Bug informatique","forbiddenWords":["problème","ordinateur","erreur","logiciel","fonctionner"],"difficulty":"medium"},{"id":"words-257","boxId":"technology","active":true,"prompt":"Virus informatique","forbiddenWords":["ordinateur","piratage","programme","antivirus","infecté"],"difficulty":"medium"},{"id":"words-258","boxId":"technology","active":true,"prompt":"Visioconférence","forbiddenWords":["caméra","réunion","écran","distance","parler"],"difficulty":"medium"},{"id":"words-259","boxId":"technology","active":true,"prompt":"QR code","forbiddenWords":["carré","scanner","téléphone","lien","noir"],"difficulty":"medium"},{"id":"words-260","boxId":"technology","active":true,"prompt":"Notification","forbiddenWords":["téléphone","message","alerte","écran","son"],"difficulty":"medium"},{"id":"words-261","boxId":"technology","active":true,"prompt":"Authentification à deux facteurs","forbiddenWords":["code","téléphone","sécurité","compte","connexion"],"difficulty":"hard"},{"id":"words-262","boxId":"technology","active":true,"prompt":"Algorithme","forbiddenWords":["calcul","programme","recommandations","données","informatique"],"difficulty":"hard"},{"id":"words-263","boxId":"technology","active":true,"prompt":"Stockage dans le cloud","forbiddenWords":["Internet","fichiers","sauvegarde","serveur","nuage"],"difficulty":"hard"},{"id":"words-264","boxId":"technology","active":true,"prompt":"Navigation privée","forbiddenWords":["Internet","historique","navigateur","secret","onglet"],"difficulty":"hard"},{"id":"words-265","boxId":"technology","active":true,"prompt":"Hameçonnage","forbiddenWords":["arnaque","mail","lien","pirate","mot de passe"],"difficulty":"hard"},{"id":"words-266","boxId":"technology","active":true,"prompt":"Géolocalisation","forbiddenWords":["position","GPS","téléphone","carte","lieu"],"difficulty":"hard"},{"id":"words-267","boxId":"technology","active":true,"prompt":"Reconnaissance vocale","forbiddenWords":["voix","parler","téléphone","assistant","comprendre"],"difficulty":"hard"},{"id":"words-268","boxId":"technology","active":true,"prompt":"Contrôle parental","forbiddenWords":["enfant","Internet","parents","bloquer","contenu"],"difficulty":"hard"},{"id":"words-269","boxId":"technology","active":true,"prompt":"Pare-feu","forbiddenWords":["sécurité","ordinateur","réseau","protection","bloquer"],"difficulty":"hard"},{"id":"words-270","boxId":"technology","active":true,"prompt":"Deepfake","forbiddenWords":["vidéo","faux","visage","truqué","intelligence artificielle"],"difficulty":"hard"},{"id":"words-271","boxId":"culture","active":true,"prompt":"Harry Potter","forbiddenWords":["sorcier","magie","Poudlard","baguette","lunettes"],"difficulty":"easy"},{"id":"words-272","boxId":"culture","active":true,"prompt":"Spider-Man","forbiddenWords":["araignée","toile","héros","Marvel","mur"],"difficulty":"easy"},{"id":"words-273","boxId":"culture","active":true,"prompt":"Dark Vador","forbiddenWords":["Star Wars","masque","père","noir","sabre"],"difficulty":"easy"},{"id":"words-274","boxId":"culture","active":true,"prompt":"Mario","forbiddenWords":["Nintendo","plombier","Luigi","moustache","jeu vidéo"],"difficulty":"easy"},{"id":"words-275","boxId":"culture","active":true,"prompt":"Barbie","forbiddenWords":["poupée","rose","Ken","blonde","jouet"],"difficulty":"easy"},{"id":"words-276","boxId":"culture","active":true,"prompt":"Mickey","forbiddenWords":["souris","Disney","oreilles","Minnie","dessin animé"],"difficulty":"easy"},{"id":"words-277","boxId":"culture","active":true,"prompt":"Batman","forbiddenWords":["chauve-souris","Gotham","héros","Joker","noir"],"difficulty":"easy"},{"id":"words-278","boxId":"culture","active":true,"prompt":"La Reine des Neiges","forbiddenWords":["Elsa","Disney","neige","sœur","libérée"],"difficulty":"easy"},{"id":"words-279","boxId":"culture","active":true,"prompt":"Pokémon","forbiddenWords":["Pikachu","attraper","créature","jeu","dessin animé"],"difficulty":"easy"},{"id":"words-280","boxId":"culture","active":true,"prompt":"Cendrillon","forbiddenWords":["princesse","chaussure","minuit","bal","Disney"],"difficulty":"easy"},{"id":"words-281","boxId":"culture","active":true,"prompt":"Shrek","forbiddenWords":["ogre","vert","Fiona","âne","marais"],"difficulty":"medium"},{"id":"words-282","boxId":"culture","active":true,"prompt":"Le Seigneur des anneaux","forbiddenWords":["Frodon","anneau","Hobbit","Gandalf","Tolkien"],"difficulty":"medium"},{"id":"words-283","boxId":"culture","active":true,"prompt":"Pirates des Caraïbes","forbiddenWords":["Jack Sparrow","bateau","pirate","mer","rhum"],"difficulty":"medium"},{"id":"words-284","boxId":"culture","active":true,"prompt":"Titanic","forbiddenWords":["bateau","iceberg","couler","Rose","Jack"],"difficulty":"medium"},{"id":"words-285","boxId":"culture","active":true,"prompt":"Jurassic Park","forbiddenWords":["dinosaure","parc","T-Rex","île","film"],"difficulty":"medium"},{"id":"words-286","boxId":"culture","active":true,"prompt":"Mercredi Addams","forbiddenWords":["famille","noire","école","danse","main"],"difficulty":"medium"},{"id":"words-287","boxId":"culture","active":true,"prompt":"Avengers","forbiddenWords":["Marvel","super-héros","équipe","Thanos","film"],"difficulty":"medium"},{"id":"words-288","boxId":"culture","active":true,"prompt":"Dragon Ball","forbiddenWords":["Goku","manga","combat","boules","Super Saiyan"],"difficulty":"medium"},{"id":"words-289","boxId":"culture","active":true,"prompt":"Toy Story","forbiddenWords":["jouets","Woody","Buzz","Pixar","film"],"difficulty":"medium"},{"id":"words-290","boxId":"culture","active":true,"prompt":"Le Roi Lion","forbiddenWords":["Simba","Mufasa","Disney","Afrique","lion"],"difficulty":"medium"},{"id":"words-291","boxId":"culture","active":true,"prompt":"Matrix","forbiddenWords":["Neo","pilule","réalité","ordinateur","lunettes"],"difficulty":"hard"},{"id":"words-292","boxId":"culture","active":true,"prompt":"Retour vers le futur","forbiddenWords":["voiture","temps","Marty","passé","DeLorean"],"difficulty":"hard"},{"id":"words-293","boxId":"culture","active":true,"prompt":"Le Truman Show","forbiddenWords":["télévision","caméra","vie","faux","Jim Carrey"],"difficulty":"hard"},{"id":"words-294","boxId":"culture","active":true,"prompt":"Charlie et la chocolaterie","forbiddenWords":["chocolat","usine","Wonka","enfant","ticket"],"difficulty":"hard"},{"id":"words-295","boxId":"culture","active":true,"prompt":"SOS Fantômes","forbiddenWords":["fantôme","chasseurs","paranormal","film","aspirateur"],"difficulty":"hard"},{"id":"words-296","boxId":"culture","active":true,"prompt":"Les Dents de la mer","forbiddenWords":["requin","plage","attaque","océan","film"],"difficulty":"hard"},{"id":"words-297","boxId":"culture","active":true,"prompt":"Kaamelott","forbiddenWords":["Arthur","chevaliers","Table ronde","Perceval","série"],"difficulty":"hard"},{"id":"words-298","boxId":"culture","active":true,"prompt":"Hunger Games","forbiddenWords":["Katniss","arène","district","arc","compétition"],"difficulty":"hard"},{"id":"words-299","boxId":"culture","active":true,"prompt":"Breaking Bad","forbiddenWords":["Walter White","chimie","drogue","professeur","série"],"difficulty":"hard"},{"id":"words-300","boxId":"culture","active":true,"prompt":"Inception","forbiddenWords":["rêve","toupie","esprit","DiCaprio","film"],"difficulty":"hard"},{"id":"words-301","boxId":"nature","active":true,"prompt":"Soleil","forbiddenWords":["chaud","ciel","lumière","étoile","jour"],"difficulty":"easy"},{"id":"words-302","boxId":"nature","active":true,"prompt":"Lune","forbiddenWords":["nuit","ciel","satellite","espace","ronde"],"difficulty":"easy"},{"id":"words-303","boxId":"nature","active":true,"prompt":"Pluie","forbiddenWords":["eau","nuage","mouillé","parapluie","tomber"],"difficulty":"easy"},{"id":"words-304","boxId":"nature","active":true,"prompt":"Montagne","forbiddenWords":["sommet","neige","grimper","Alpes","haut"],"difficulty":"easy"},{"id":"words-305","boxId":"nature","active":true,"prompt":"Océan","forbiddenWords":["mer","eau","poisson","profond","vague"],"difficulty":"easy"},{"id":"words-306","boxId":"nature","active":true,"prompt":"Forêt","forbiddenWords":["arbres","bois","nature","animaux","promenade"],"difficulty":"easy"},{"id":"words-307","boxId":"nature","active":true,"prompt":"Volcan","forbiddenWords":["lave","éruption","montagne","feu","fumée"],"difficulty":"easy"},{"id":"words-308","boxId":"nature","active":true,"prompt":"Arc-en-ciel","forbiddenWords":["couleurs","pluie","ciel","soleil","sept"],"difficulty":"easy"},{"id":"words-309","boxId":"nature","active":true,"prompt":"Neige","forbiddenWords":["blanc","froid","hiver","flocon","montagne"],"difficulty":"easy"},{"id":"words-310","boxId":"nature","active":true,"prompt":"Rivière","forbiddenWords":["eau","couler","fleuve","poisson","rive"],"difficulty":"easy"},{"id":"words-311","boxId":"nature","active":true,"prompt":"Tornade","forbiddenWords":["vent","tourner","tempête","destruction","cyclone"],"difficulty":"medium"},{"id":"words-312","boxId":"nature","active":true,"prompt":"Avalanche","forbiddenWords":["neige","montagne","tomber","danger","ski"],"difficulty":"medium"},{"id":"words-313","boxId":"nature","active":true,"prompt":"Éclipse","forbiddenWords":["Soleil","Lune","cacher","ciel","ombre"],"difficulty":"medium"},{"id":"words-314","boxId":"nature","active":true,"prompt":"Marée","forbiddenWords":["mer","monter","descendre","Lune","plage"],"difficulty":"medium"},{"id":"words-315","boxId":"nature","active":true,"prompt":"Geyser","forbiddenWords":["eau","chaud","jaillir","Islande","sol"],"difficulty":"medium"},{"id":"words-316","boxId":"nature","active":true,"prompt":"Banquise","forbiddenWords":["glace","froid","pôle","ours","fondre"],"difficulty":"medium"},{"id":"words-317","boxId":"nature","active":true,"prompt":"Sécheresse","forbiddenWords":["eau","pluie","chaleur","manque","terre"],"difficulty":"medium"},{"id":"words-318","boxId":"nature","active":true,"prompt":"Tremblement de terre","forbiddenWords":["sol","secouer","séisme","catastrophe","fissure"],"difficulty":"medium"},{"id":"words-319","boxId":"nature","active":true,"prompt":"Iceberg","forbiddenWords":["glace","mer","Titanic","froid","flotter"],"difficulty":"medium"},{"id":"words-320","boxId":"nature","active":true,"prompt":"Oasis","forbiddenWords":["désert","eau","palmier","chaleur","voyageurs"],"difficulty":"medium"},{"id":"words-321","boxId":"nature","active":true,"prompt":"Aurore boréale","forbiddenWords":["ciel","couleurs","Nord","lumière","nuit"],"difficulty":"hard"},{"id":"words-322","boxId":"nature","active":true,"prompt":"Sables mouvants","forbiddenWords":["sable","enfoncer","sol","piège","désert"],"difficulty":"hard"},{"id":"words-323","boxId":"nature","active":true,"prompt":"Récif corallien","forbiddenWords":["mer","corail","poissons","couleurs","océan"],"difficulty":"hard"},{"id":"words-324","boxId":"nature","active":true,"prompt":"Glissement de terrain","forbiddenWords":["terre","montagne","pluie","tomber","catastrophe"],"difficulty":"hard"},{"id":"words-325","boxId":"nature","active":true,"prompt":"Étoile filante","forbiddenWords":["ciel","vœu","nuit","lumière","tomber"],"difficulty":"hard"},{"id":"words-326","boxId":"nature","active":true,"prompt":"Trou noir","forbiddenWords":["espace","aspirer","lumière","galaxie","gravité"],"difficulty":"hard"},{"id":"words-327","boxId":"nature","active":true,"prompt":"Effet de serre","forbiddenWords":["climat","chaleur","planète","gaz","réchauffement"],"difficulty":"hard"},{"id":"words-328","boxId":"nature","active":true,"prompt":"Mousson","forbiddenWords":["pluie","saison","Asie","abondante","climat"],"difficulty":"hard"},{"id":"words-329","boxId":"nature","active":true,"prompt":"Stalactite","forbiddenWords":["grotte","plafond","pierre","calcaire","pointe"],"difficulty":"hard"},{"id":"words-330","boxId":"nature","active":true,"prompt":"Mangrove","forbiddenWords":["arbres","eau","racines","tropical","marais"],"difficulty":"hard"},{"id":"words-331","boxId":"expressions","active":true,"prompt":"Avoir la pêche","forbiddenWords":["énergie","forme","fruit","motivé","bien"],"difficulty":"easy"},{"id":"words-332","boxId":"expressions","active":true,"prompt":"Casser les pieds","forbiddenWords":["énerver","déranger","agacer","corps","personne"],"difficulty":"easy"},{"id":"words-333","boxId":"expressions","active":true,"prompt":"Être rouge comme une tomate","forbiddenWords":["gêné","couleur","légume","visage","honte"],"difficulty":"easy"},{"id":"words-334","boxId":"expressions","active":true,"prompt":"Avoir la tête dans les nuages","forbiddenWords":["rêver","inattentif","ciel","penser","ailleurs"],"difficulty":"easy"},{"id":"words-335","boxId":"expressions","active":true,"prompt":"Avoir un chat dans la gorge","forbiddenWords":["voix","tousser","animal","parler","gorge"],"difficulty":"easy"},{"id":"words-336","boxId":"expressions","active":true,"prompt":"Tomber dans les pommes","forbiddenWords":["évanouir","fruit","malaise","sol","conscience"],"difficulty":"easy"},{"id":"words-337","boxId":"expressions","active":true,"prompt":"Dormir comme un bébé","forbiddenWords":["sommeil","nuit","enfant","profondément","lit"],"difficulty":"easy"},{"id":"words-338","boxId":"expressions","active":true,"prompt":"Être dans la lune","forbiddenWords":["rêver","inattentif","ciel","penser","ailleurs"],"difficulty":"easy"},{"id":"words-339","boxId":"expressions","active":true,"prompt":"Avoir le coup de foudre","forbiddenWords":["amour","éclair","amoureux","rencontrer","immédiatement"],"difficulty":"easy"},{"id":"words-340","boxId":"expressions","active":true,"prompt":"Donner sa langue au chat","forbiddenWords":["réponse","deviner","animal","abandonner","question"],"difficulty":"easy"},{"id":"words-341","boxId":"expressions","active":true,"prompt":"Mettre les pieds dans le plat","forbiddenWords":["maladroit","parler","gêner","sujet","nourriture"],"difficulty":"medium"},{"id":"words-342","boxId":"expressions","active":true,"prompt":"Prendre ses jambes à son cou","forbiddenWords":["courir","fuir","peur","partir","corps"],"difficulty":"medium"},{"id":"words-343","boxId":"expressions","active":true,"prompt":"Avoir un poil dans la main","forbiddenWords":["paresseux","travailler","fainéant","effort","corps"],"difficulty":"medium"},{"id":"words-344","boxId":"expressions","active":true,"prompt":"Chercher une aiguille dans une botte de foin","forbiddenWords":["trouver","petit","difficile","paille","couture"],"difficulty":"medium"},{"id":"words-345","boxId":"expressions","active":true,"prompt":"Marcher sur des œufs","forbiddenWords":["prudent","fragile","avancer","poule","attention"],"difficulty":"medium"},{"id":"words-346","boxId":"expressions","active":true,"prompt":"Jeter de l’huile sur le feu","forbiddenWords":["aggraver","dispute","incendie","colère","liquide"],"difficulty":"medium"},{"id":"words-347","boxId":"expressions","active":true,"prompt":"Couper les cheveux en quatre","forbiddenWords":["compliquer","détail","réfléchir","inutile","coiffeur"],"difficulty":"medium"},{"id":"words-348","boxId":"expressions","active":true,"prompt":"Prendre le taureau par les cornes","forbiddenWords":["affronter","problème","animal","courage","agir"],"difficulty":"medium"},{"id":"words-349","boxId":"expressions","active":true,"prompt":"Prendre la grosse tête","forbiddenWords":["prétentieux","succès","ego","fier","crâne"],"difficulty":"medium"},{"id":"words-350","boxId":"expressions","active":true,"prompt":"Être sur son trente-et-un","forbiddenWords":["élégant","habillé","costume","chic","vêtements"],"difficulty":"medium"},{"id":"words-351","boxId":"expressions","active":true,"prompt":"Noyer le poisson","forbiddenWords":["éviter","sujet","réponse","détourner","eau"],"difficulty":"hard"},{"id":"words-352","boxId":"expressions","active":true,"prompt":"Avoir le cul entre deux chaises","forbiddenWords":["choisir","hésiter","décision","assis","deux"],"difficulty":"hard"},{"id":"words-353","boxId":"expressions","active":true,"prompt":"Mettre la puce à l’oreille","forbiddenWords":["soupçon","insecte","doute","comprendre","alerter"],"difficulty":"hard"},{"id":"words-354","boxId":"expressions","active":true,"prompt":"Tirer les vers du nez","forbiddenWords":["question","avouer","parler","information","obtenir"],"difficulty":"hard"},{"id":"words-355","boxId":"expressions","active":true,"prompt":"Retourner sa veste","forbiddenWords":["changer","opinion","camp","trahir","vêtement"],"difficulty":"hard"},{"id":"words-356","boxId":"expressions","active":true,"prompt":"Se faire rouler dans la farine","forbiddenWords":["arnaquer","tromper","poudre","naïf","mensonge"],"difficulty":"hard"},{"id":"words-357","boxId":"expressions","active":true,"prompt":"Avoir plusieurs cordes à son arc","forbiddenWords":["talents","compétences","flèche","plusieurs","savoir-faire"],"difficulty":"hard"},{"id":"words-358","boxId":"expressions","active":true,"prompt":"Faire chou blanc","forbiddenWords":["échouer","résultat","réussir","légume","rien"],"difficulty":"hard"},{"id":"words-359","boxId":"expressions","active":true,"prompt":"Ne pas être sorti de l’auberge","forbiddenWords":["problème","difficulté","terminé","hôtel","encore"],"difficulty":"hard"},{"id":"words-360","boxId":"expressions","active":true,"prompt":"Pousser mémé dans les orties","forbiddenWords":["exagérer","grand-mère","plante","limite","trop"],"difficulty":"hard"}]}};


  const MODE_ICONS = {
    lyrics: `
      <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
        <circle cx="34" cy="18" r="11" fill="currentColor" opacity=".95"/>
        <path d="M27 27h14l-4 21H23l4-21Z" fill="currentColor" opacity=".85"/>
        <path d="M25 32h14M24 38h14M23 44h14M29 28l-4 20M35 28l-4 20" stroke="#111318" stroke-width="2" opacity=".8"/>
        <path d="M24 48 15 58" stroke="currentColor" stroke-width="6" stroke-linecap="round"/>
        <circle cx="51" cy="16" r="2.2" fill="currentColor"/><circle cx="56" cy="22" r="2.2" fill="currentColor" opacity=".75"/>
        <path d="m52 4 1.4 3.2L57 8.5l-3.6 1.3L52 13l-1.4-3.2L47 8.5l3.6-1.3L52 4Z" fill="currentColor"/>
      </svg>`,
    mime: `
      <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
        <path d="M17 18c5-10 24-12 34-1-9 0-17 2-25 7l-9-6Z" fill="currentColor"/>
        <path d="M24 18c-3 3-5 8-5 13 0 10 7 18 16 18s16-8 16-18c0-5-2-9-5-12" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>
        <path d="M26 32c2 2 4 2 6 0M39 32c2 2 4 2 6 0M31 41c3 2 7 2 10 0" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
        <path d="M22 42C16 37 12 31 13 23" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>
        <path d="M13 23 8 18M13 23l1-8M13 23l7-5" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M43 44c5 4 10 7 16 6" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>
        <path d="M59 50l-1-7M59 50l-6 4M59 50l-7-1" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      </svg>`,
    words: `
      <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
        <path d="M9 10h46v33H31L18 54V43H9V10Z" stroke="currentColor" stroke-width="4" stroke-linejoin="round"/>
        <circle cx="22" cy="27" r="3" fill="currentColor"/><circle cx="32" cy="27" r="3" fill="currentColor"/><circle cx="42" cy="27" r="3" fill="currentColor"/>
        <circle cx="49" cy="48" r="10" fill="#111318" stroke="currentColor" stroke-width="3"/>
        <path d="m43 54 12-12" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"/>
      </svg>`,
    draw: `
      <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
        <path d="M13 49c9-9 15 7 24-1 7-6 8-15 17-12" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>
        <path d="m11 43 7 7 30-30-7-7-30 30Z" fill="currentColor"/>
        <path d="m41 13 7 7 5-5c2-2 2-5 0-7s-5-2-7 0l-5 5Z" fill="currentColor" opacity=".78"/>
        <path d="m11 43-2 10 10-3-8-7Z" fill="currentColor" opacity=".8"/>
        <circle cx="51" cy="47" r="3" fill="currentColor"/><circle cx="57" cy="41" r="2" fill="currentColor" opacity=".8"/>
      </svg>`
  };

  const DIFFICULTY_LABELS = {
    easy: "Facile",
    medium: "Moyen",
    hard: "Difficile"
  };

  const el = {
    app: document.querySelector("#app"),
    screens: [...document.querySelectorAll(".screen")],
    homeScreen: document.querySelector("#homeScreen"),
    globalTimerSettings: document.querySelector("#globalTimerSettings"),
    manageScreen: document.querySelector("#manageScreen"),
    countdownScreen: document.querySelector("#countdownScreen"),
    gameScreen: document.querySelector("#gameScreen"),
    resultsScreen: document.querySelector("#resultsScreen"),
    drawRevealScreen: document.querySelector("#drawRevealScreen"),
    drawPlayScreen: document.querySelector("#drawPlayScreen"),

    startButton: document.querySelector("#startButton"),
    manageCardsButton: document.querySelector("#manageCardsButton"),
    installButton: document.querySelector("#installButton"),
    durationButtons: [...document.querySelectorAll(".duration-btn")],
    customSeconds: document.querySelector("#customSeconds"),
    availableCount: document.querySelector("#availableCount"),
    selectAllButton: document.querySelector("#selectAllButton"),
    selectNoneButton: document.querySelector("#selectNoneButton"),
    modeSelectionList: document.querySelector("#modeSelectionList"),

    vibrationToggle: document.querySelector("#vibrationToggle"),
    testValidVibrationButton: document.querySelector("#testValidVibrationButton"),
    testPassVibrationButton: document.querySelector("#testPassVibrationButton"),
    libraryVersionList: document.querySelector("#libraryVersionList"),
    libraryLastChecked: document.querySelector("#libraryLastChecked"),
    libraryStatusMessage: document.querySelector("#libraryStatusMessage"),
    checkLibrariesButton: document.querySelector("#checkLibrariesButton"),
    updateLibrariesButton: document.querySelector("#updateLibrariesButton"),
    exportBackupButton: document.querySelector("#exportBackupButton"),
    restoreBackupButton: document.querySelector("#restoreBackupButton"),
    restoreBackupInput: document.querySelector("#restoreBackupInput"),
    resetLibrariesButton: document.querySelector("#resetLibrariesButton"),
    diagnosticButton: document.querySelector("#diagnosticButton"),
    flipHomeButton: document.querySelector("#flipHomeButton"),

    manageBackButton: document.querySelector("#manageBackButton"),
    manageModeTabs: document.querySelector("#manageModeTabs"),
    cardSearchInput: document.querySelector("#cardSearchInput"),
    manageBoxFilter: document.querySelector("#manageBoxFilter"),
    addCardButton: document.querySelector("#addCardButton"),
    manageBoxesButton: document.querySelector("#manageBoxesButton"),
    manageStats: document.querySelector("#manageStats"),
    cardList: document.querySelector("#cardList"),

    countdownValue: document.querySelector("#countdownValue"),
    timeDisplay: document.querySelector("#timeDisplay"),
    validScore: document.querySelector("#validScore"),
    passScore: document.querySelector("#passScore"),
    gameCard: document.querySelector("#gameCard"),
    leftSwipeGuide: document.querySelector("#leftSwipeGuide"),
    rightSwipeGuide: document.querySelector("#rightSwipeGuide"),
    gameModeLabel: document.querySelector("#gameModeLabel"),
    lyricsGameContent: document.querySelector("#lyricsGameContent"),
    mimeGameContent: document.querySelector("#mimeGameContent"),
    wordsGameContent: document.querySelector("#wordsGameContent"),
    promptText: document.querySelector("#promptText"),
    answerText: document.querySelector("#answerText"),
    mimePromptText: document.querySelector("#mimePromptText"),
    wordPromptText: document.querySelector("#wordPromptText"),
    forbiddenWordsBlock: document.querySelector("#forbiddenWordsBlock"),
    forbiddenWordsList: document.querySelector("#forbiddenWordsList"),
    cardMeta: document.querySelector("#cardMeta"),
    cardMetaPrimary: document.querySelector("#cardMetaPrimary"),
    cardMetaSecondary: document.querySelector("#cardMetaSecondary"),
    undoButton: document.querySelector("#undoButton"),
    pauseButton: document.querySelector("#pauseButton"),
    flipGameButton: document.querySelector("#flipGameButton"),
    endButton: document.querySelector("#endButton"),
    pauseOverlay: document.querySelector("#pauseOverlay"),
    resumeOverlayButton: document.querySelector("#resumeOverlayButton"),

    resultValid: document.querySelector("#resultValid"),
    resultValidLabel: document.querySelector("#resultValidLabel"),
    resultPassed: document.querySelector("#resultPassed"),
    resultPassedLabel: document.querySelector("#resultPassedLabel"),
    resultTotal: document.querySelector("#resultTotal"),
    resultTotalLabel: document.querySelector("#resultTotalLabel"),
    resultDetails: document.querySelector("#resultDetails"),
    replayButton: document.querySelector("#replayButton"),
    homeButton: document.querySelector("#homeButton"),

    modeConfigDialog: document.querySelector("#modeConfigDialog"),
    modeDialogHero: document.querySelector("#modeDialogHero"),
    modeDialogIcon: document.querySelector("#modeDialogIcon"),
    modeDialogTitle: document.querySelector("#modeDialogTitle"),
    modeDialogDescription: document.querySelector("#modeDialogDescription"),
    closeModeDialogButton: document.querySelector("#closeModeDialogButton"),
    doneModeDialogButton: document.querySelector("#doneModeDialogButton"),
    modeEnabledInput: document.querySelector("#modeEnabledInput"),
    modeDialogCount: document.querySelector("#modeDialogCount"),
    modeRulesList: document.querySelector("#modeRulesList"),
    modeDifficultyChoices: document.querySelector("#modeDifficultyChoices"),
    wordsSpecialSettings: document.querySelector("#wordsSpecialSettings"),
    showForbiddenWordsInput: document.querySelector("#showForbiddenWordsInput"),
    drawSpecialSettings: document.querySelector("#drawSpecialSettings"),
    drawAttemptCountInput: document.querySelector("#drawAttemptCountInput"),
    drawEasySecondsInput: document.querySelector("#drawEasySecondsInput"),
    drawMediumSecondsInput: document.querySelector("#drawMediumSecondsInput"),
    drawHardSecondsInput: document.querySelector("#drawHardSecondsInput"),
    drawSoundEnabledInput: document.querySelector("#drawSoundEnabledInput"),
    modeSelectAllBoxesButton: document.querySelector("#modeSelectAllBoxesButton"),
    modeSelectNoBoxesButton: document.querySelector("#modeSelectNoBoxesButton"),
    modeBoxChoices: document.querySelector("#modeBoxChoices"),

    cardDialog: document.querySelector("#cardDialog"),
    cardForm: document.querySelector("#cardForm"),
    cardDialogTitle: document.querySelector("#cardDialogTitle"),
    closeCardDialogButton: document.querySelector("#closeCardDialogButton"),
    cancelCardButton: document.querySelector("#cancelCardButton"),
    cardIdInput: document.querySelector("#cardIdInput"),
    cardModeInput: document.querySelector("#cardModeInput"),
    lyricsEditorFields: document.querySelector("#lyricsEditorFields"),
    mimeEditorFields: document.querySelector("#mimeEditorFields"),
    wordsEditorFields: document.querySelector("#wordsEditorFields"),
    cardPromptInput: document.querySelector("#cardPromptInput"),
    cardAnswerInput: document.querySelector("#cardAnswerInput"),
    cardTitleInput: document.querySelector("#cardTitleInput"),
    cardSourceInput: document.querySelector("#cardSourceInput"),
    mimePromptInput: document.querySelector("#mimePromptInput"),
    simplePromptLabel: document.querySelector("#simplePromptLabel"),
    wordPromptInput: document.querySelector("#wordPromptInput"),
    forbiddenWordsInput: document.querySelector("#forbiddenWordsInput"),
    cardDifficultyInput: document.querySelector("#cardDifficultyInput"),
    cardBoxInput: document.querySelector("#cardBoxInput"),
    cardActiveInput: document.querySelector("#cardActiveInput"),

    boxesDialog: document.querySelector("#boxesDialog"),
    boxesDialogTitle: document.querySelector("#boxesDialogTitle"),
    closeBoxesDialogButton: document.querySelector("#closeBoxesDialogButton"),
    doneBoxesButton: document.querySelector("#doneBoxesButton"),
    newBoxNameInput: document.querySelector("#newBoxNameInput"),
    addBoxButton: document.querySelector("#addBoxButton"),
    boxesList: document.querySelector("#boxesList"),

    diagnosticDialog: document.querySelector("#diagnosticDialog"),
    diagnosticOutput: document.querySelector("#diagnosticOutput"),
    copyDiagnosticButton: document.querySelector("#copyDiagnosticButton"),

    drawPromptPanel: document.querySelector("#drawPromptPanel"),
    drawAttemptLabel: document.querySelector("#drawAttemptLabel"),
    drawRevealPrompt: document.querySelector("#drawRevealPrompt"),
    drawRevealMeta: document.querySelector("#drawRevealMeta"),
    drawSkipRevealButton: document.querySelector("#drawSkipRevealButton"),
    drawOnPhoneButton: document.querySelector("#drawOnPhoneButton"),
    drawOnPaperButton: document.querySelector("#drawOnPaperButton"),
    drawPlayProgress: document.querySelector("#drawPlayProgress"),
    drawLiveScore: document.querySelector("#drawLiveScore"),
    drawTimerDisplay: document.querySelector("#drawTimerDisplay"),
    drawCanvasArea: document.querySelector("#drawCanvasArea"),
    drawPaperArea: document.querySelector("#drawPaperArea"),
    drawingCanvas: document.querySelector("#drawingCanvas"),
    drawColorChoices: document.querySelector("#drawColorChoices"),
    drawBrushSize: document.querySelector("#drawBrushSize"),
    drawEraserButton: document.querySelector("#drawEraserButton"),
    drawToolIcon: document.querySelector("#drawToolIcon"),
    drawUndoButton: document.querySelector("#drawUndoButton"),
    drawClearButton: document.querySelector("#drawClearButton"),
    drawFoundButton: document.querySelector("#drawFoundButton"),
    drawPassButton: document.querySelector("#drawPassButton")
  };

  const state = {
    selectedSeconds: 60,
    durationMs: 60000,
    remainingMs: 60000,
    deadline: 0,
    rafId: 0,
    countdownTimer: 0,
    running: false,
    paused: false,
    flipped: false,
    queue: [],
    currentCard: null,
    history: [],
    valid: 0,
    passed: 0,
    pointer: null,
    wakeLock: null,
    installPrompt: null,
    lastError: "Aucune",
    activeManageModeId: "lyrics",
    activeModeDialogId: null,
    settings: {
      selectedModeIds: ["lyrics", "mime", "words"],
      vibrationEnabled: true,
      lastLibraryCheckAt: "",
      modeOptions: {
        words: { showForbiddenWords: true },
        draw: {
          attemptCount: 3,
          durations: { easy: 30, medium: 45, hard: 60 },
          soundEnabled: true
        }
      }
    },
    modes: {},
    drawRound: null,
    drawPointer: null,
    drawAudioContext: null
  };

  function safeParse(value, fallback) {
    if (!value) return fallback;
    try {
      return JSON.parse(value);
    } catch (error) {
      recordError(error);
      return fallback;
    }
  }

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function uniqueId(prefix) {
    if (globalThis.crypto?.randomUUID) return `${prefix}-${crypto.randomUUID()}`;
    return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }

  function modeState(modeId) {
    return state.modes[modeId];
  }

  function modeConfig(modeId) {
    return MODE_CONFIG[modeId];
  }

  function cleanIdList(value) {
    return Array.isArray(value) ? [...new Set(value.map(String))] : [];
  }

  function normalizeDifficulty(value, modeId, card = {}) {
    if (["easy", "medium", "hard"].includes(value)) return value;
    if (modeId === "lyrics") {
      if (card.boxId === "anglais") return "hard";
      if (["comptines", "disney", "tubes-soiree"].includes(card.boxId)) return "easy";
    }
    return "medium";
  }

  function normalizeLibrary(modeId, raw) {
    const config = modeConfig(modeId);
    if (!raw || raw.modeId !== modeId || !Array.isArray(raw.boxes) || !Array.isArray(raw.cards) || !raw.libraryVersion) {
      throw new Error(`Bibliothèque invalide pour le mode ${config.name}.`);
    }

    const boxes = raw.boxes.map(box => ({
      id: String(box.id),
      name: String(box.name),
      protected: box.id === UNCATEGORIZED_ID || box.protected === true
    }));
    const boxIds = new Set(boxes.map(box => box.id));

    const cards = raw.cards.map(card => {
      const common = {
        id: String(card.id),
        boxId: boxIds.has(String(card.boxId)) ? String(card.boxId) : UNCATEGORIZED_ID,
        active: card.active !== false,
        difficulty: normalizeDifficulty(card.difficulty, modeId, card)
      };

      if (config.type === "lyrics") {
        return {
          ...common,
          prompt: String(card.prompt || ""),
          answer: String(card.answer || ""),
          title: String(card.title || ""),
          source: String(card.source || "")
        };
      }

      if (config.type === "words") {
        return {
          ...common,
          prompt: String(card.prompt || ""),
          forbiddenWords: Array.isArray(card.forbiddenWords)
            ? card.forbiddenWords.map(String).filter(Boolean)
            : []
        };
      }

      return { ...common, prompt: String(card.prompt || "") };
    });

    return {
      schemaVersion: Number(raw.schemaVersion) || 1,
      libraryVersion: String(raw.libraryVersion),
      updatedAt: String(raw.updatedAt || ""),
      modeId,
      modeName: String(raw.modeName || config.name),
      boxes,
      cards
    };
  }

  async function fetchOfficialLibrary(modeId, { forceNetwork = false, allowFallback = true } = {}) {
    const config = modeConfig(modeId);
    const suffix = forceNetwork ? `?v=${Date.now()}` : "";

    try {
      const response = await fetch(`${config.libraryUrl}${suffix}`, {
        cache: forceNetwork ? "no-store" : "default"
      });
      if (!response.ok) throw new Error(`${config.name} indisponible (${response.status}).`);
      return normalizeLibrary(modeId, await response.json());
    } catch (error) {
      recordError(error);
      if (!allowFallback) throw error;
      return normalizeLibrary(modeId, FALLBACK_LIBRARIES[modeId]);
    }
  }

  function officialBoxFrom(box) {
    return {
      ...clone(box),
      origin: "official",
      locallyModified: false,
      protected: box.id === UNCATEGORIZED_ID || box.protected === true
    };
  }

  function officialCardFrom(card) {
    return {
      ...clone(card),
      origin: "official",
      locallyModified: false,
      active: card.active !== false
    };
  }

  function sameBoxAsOfficial(localBox, officialBox) {
    return localBox.name === officialBox.name &&
      Boolean(localBox.protected) === Boolean(officialBox.protected);
  }

  function sameCardAsOfficial(modeId, localCard, officialCard) {
    const config = modeConfig(modeId);
    if (
      localCard.boxId !== officialCard.boxId ||
      Boolean(localCard.active) !== Boolean(officialCard.active !== false) ||
      localCard.prompt !== officialCard.prompt ||
      normalizeDifficulty(localCard.difficulty, modeId, localCard) !== officialCard.difficulty
    ) return false;

    if (config.type === "lyrics") {
      return localCard.answer === officialCard.answer &&
        localCard.title === officialCard.title &&
        localCard.source === officialCard.source;
    }

    if (config.type === "words") {
      return JSON.stringify(localCard.forbiddenWords || []) ===
        JSON.stringify(officialCard.forbiddenWords || []);
    }

    return true;
  }

  function freshModeState(modeId, library) {
    return {
      officialLibrary: library,
      boxes: library.boxes.map(officialBoxFrom),
      cards: library.cards.map(officialCardFrom),
      selectedBoxIds: library.boxes.map(box => box.id),
      selectedDifficultyIds: ["easy", "medium", "hard"],
      libraryMeta: {
        installedVersion: library.libraryVersion,
        availableVersion: library.libraryVersion,
        lastCheckedAt: new Date().toISOString(),
        deletedOfficialCardIds: [],
        deletedOfficialBoxIds: []
      }
    };
  }

  function sanitizeMode(modeId, mode, library) {
    const officialBoxIds = new Set(library.boxes.map(box => box.id));
    const officialCardIds = new Set(library.cards.map(card => card.id));
    const config = modeConfig(modeId);

    mode.boxes = mode.boxes.map(box => ({
      ...box,
      protected: box.id === UNCATEGORIZED_ID || box.protected === true,
      origin: box.origin || (officialBoxIds.has(box.id) ? "official" : "personal"),
      locallyModified: box.locallyModified === true
    }));

    if (!mode.boxes.some(box => box.id === UNCATEGORIZED_ID)) {
      const fallback = library.boxes.find(box => box.id === UNCATEGORIZED_ID) ||
        { id: UNCATEGORIZED_ID, name: "Sans catégorie", protected: true };
      mode.boxes.push(officialBoxFrom(fallback));
    }

    const boxIds = new Set(mode.boxes.map(box => box.id));
    mode.cards = mode.cards.map(card => {
      const normalized = {
        ...card,
        boxId: boxIds.has(card.boxId) ? card.boxId : UNCATEGORIZED_ID,
        active: card.active !== false,
        difficulty: normalizeDifficulty(card.difficulty, modeId, card),
        origin: card.origin || (officialCardIds.has(card.id) ? "official" : "personal"),
        locallyModified: card.locallyModified === true
      };
      if (config.type === "words") {
        normalized.forbiddenWords = Array.isArray(card.forbiddenWords)
          ? card.forbiddenWords.map(String).filter(Boolean)
          : [];
      }
      return normalized;
    });

    mode.selectedBoxIds = cleanIdList(mode.selectedBoxIds).filter(id => boxIds.has(id));
    mode.selectedDifficultyIds = cleanIdList(mode.selectedDifficultyIds)
      .filter(id => ["easy", "medium", "hard"].includes(id));
    if (!mode.selectedDifficultyIds.length) {
      mode.selectedDifficultyIds = ["easy", "medium", "hard"];
    }

    mode.libraryMeta = {
      installedVersion: String(mode.libraryMeta?.installedVersion || library.libraryVersion),
      availableVersion: String(mode.libraryMeta?.availableVersion || library.libraryVersion),
      lastCheckedAt: String(mode.libraryMeta?.lastCheckedAt || ""),
      deletedOfficialCardIds: cleanIdList(mode.libraryMeta?.deletedOfficialCardIds),
      deletedOfficialBoxIds: cleanIdList(mode.libraryMeta?.deletedOfficialBoxIds)
    };
    mode.officialLibrary = library;
  }

  async function loadMode(modeId, legacySettings) {
    const config = modeConfig(modeId);
    const library = await fetchOfficialLibrary(modeId);
    const storedBoxes = safeParse(localStorage.getItem(config.storage.boxes), null);
    const storedCards = safeParse(localStorage.getItem(config.storage.cards), null);
    const storedMeta = safeParse(localStorage.getItem(config.storage.meta), null);
    const storedSelection = safeParse(localStorage.getItem(config.storage.selection), null);

    if (!Array.isArray(storedBoxes) || !storedBoxes.length || !Array.isArray(storedCards)) {
      state.modes[modeId] = freshModeState(modeId, library);
      return { fresh: true };
    }

    const officialBoxes = new Map(library.boxes.map(box => [box.id, box]));
    const officialCards = new Map(library.cards.map(card => [card.id, card]));

    const boxes = storedBoxes.map(box => {
      const official = officialBoxes.get(box.id);
      if (!official) return {
        ...box,
        origin: box.origin || "personal",
        locallyModified: true,
        protected: box.id === UNCATEGORIZED_ID || box.protected === true
      };
      return {
        ...box,
        origin: "official",
        locallyModified: box.locallyModified === true || !sameBoxAsOfficial(box, official),
        protected: box.id === UNCATEGORIZED_ID || box.protected === true
      };
    });

    const cards = storedCards.map(card => {
      const official = officialCards.get(card.id);
      const normalizedCard = {
        ...card,
        difficulty: normalizeDifficulty(card.difficulty, modeId, card)
      };
      if (!official) return {
        ...normalizedCard,
        active: card.active !== false,
        origin: card.origin || "personal",
        locallyModified: true
      };
      return {
        ...normalizedCard,
        active: card.active !== false,
        origin: "official",
        locallyModified: card.locallyModified === true || !sameCardAsOfficial(modeId, normalizedCard, official)
      };
    });

    const localBoxIds = new Set(boxes.map(box => box.id));
    const localCardIds = new Set(cards.map(card => card.id));
    const selectionObject = storedSelection && !Array.isArray(storedSelection)
      ? storedSelection
      : null;
    const selectedBoxIds = Array.isArray(storedSelection)
      ? storedSelection
      : (
          Array.isArray(selectionObject?.boxIds)
            ? selectionObject.boxIds
            : (modeId === "lyrics" && Array.isArray(legacySettings?.selectedBoxIds)
                ? legacySettings.selectedBoxIds
                : boxes.map(box => box.id))
        );

    state.modes[modeId] = {
      officialLibrary: library,
      boxes,
      cards,
      selectedBoxIds,
      selectedDifficultyIds: Array.isArray(selectionObject?.difficultyIds)
        ? selectionObject.difficultyIds
        : ["easy", "medium", "hard"],
      libraryMeta: {
        installedVersion: storedMeta?.installedVersion || library.libraryVersion,
        availableVersion: library.libraryVersion,
        lastCheckedAt: storedMeta?.lastCheckedAt || "",
        deletedOfficialCardIds: cleanIdList(
          storedMeta?.deletedOfficialCardIds ||
          library.cards.filter(card => !localCardIds.has(card.id)).map(card => card.id)
        ),
        deletedOfficialBoxIds: cleanIdList(
          storedMeta?.deletedOfficialBoxIds ||
          library.boxes.filter(box => box.id !== UNCATEGORIZED_ID && !localBoxIds.has(box.id)).map(box => box.id)
        )
      }
    };

    sanitizeMode(modeId, state.modes[modeId], library);
    return { fresh: false };
  }

  async function loadContent() {
    const legacySettings = safeParse(localStorage.getItem(LEGACY_SETTINGS_KEY), null);
    const globalSettings = safeParse(localStorage.getItem(GLOBAL_SETTINGS_KEY), null);

    state.settings = {
      selectedModeIds: Array.isArray(globalSettings?.selectedModeIds)
        ? globalSettings.selectedModeIds.filter(id => MODE_ORDER.includes(id))
        : [...MODE_ORDER],
      vibrationEnabled: globalSettings?.vibrationEnabled ?? legacySettings?.vibrationEnabled ?? true,
      lastLibraryCheckAt: String(globalSettings?.lastLibraryCheckAt || ""),
      modeOptions: {
        words: {
          showForbiddenWords: globalSettings?.modeOptions?.words?.showForbiddenWords !== false
        },
        draw: {
          attemptCount: [3,5,7,10].includes(Number(globalSettings?.modeOptions?.draw?.attemptCount))
            ? Number(globalSettings.modeOptions.draw.attemptCount) : 3,
          durations: {
            easy: Math.min(120, Math.max(10, Number(globalSettings?.modeOptions?.draw?.durations?.easy) || 30)),
            medium: Math.min(120, Math.max(10, Number(globalSettings?.modeOptions?.draw?.durations?.medium) || 45)),
            hard: Math.min(180, Math.max(10, Number(globalSettings?.modeOptions?.draw?.durations?.hard) || 60))
          },
          soundEnabled: globalSettings?.modeOptions?.draw?.soundEnabled !== false
        }
      }
    };

    if (state.settings.selectedModeIds.length === 0 && !globalSettings) {
      state.settings.selectedModeIds = MODE_ORDER.filter(id => id !== "draw");
    }

    const freshModes = {};
    for (const modeId of MODE_ORDER) {
      freshModes[modeId] = (await loadMode(modeId, legacySettings)).fresh;
    }

    if (freshModes.words && !state.settings.selectedModeIds.includes("words")) {
      state.settings.selectedModeIds.push("words");
    }

    state.flipped = localStorage.getItem("mdb-flipped") === "1";
    saveAllData();
  }

  function saveMode(modeId) {
    const config = modeConfig(modeId);
    const mode = modeState(modeId);
    localStorage.setItem(config.storage.boxes, JSON.stringify(mode.boxes));
    localStorage.setItem(config.storage.cards, JSON.stringify(mode.cards));
    localStorage.setItem(config.storage.meta, JSON.stringify(mode.libraryMeta));
    localStorage.setItem(config.storage.selection, JSON.stringify({
      boxIds: mode.selectedBoxIds,
      difficultyIds: mode.selectedDifficultyIds
    }));
  }

  function saveGlobalSettings() {
    localStorage.setItem(GLOBAL_SETTINGS_KEY, JSON.stringify(state.settings));
  }

  function saveAllData() {
    MODE_ORDER.forEach(saveMode);
    saveGlobalSettings();
  }

  function showScreen(target) {
    el.screens.forEach(screen => screen.classList.toggle("active", screen === target));
  }

  function getBoxName(modeId, boxId) {
    return modeState(modeId).boxes.find(box => box.id === boxId)?.name || "Sans catégorie";
  }

  function activeCountForBox(modeId, boxId) {
    return modeState(modeId).cards.filter(card => card.boxId === boxId && card.active).length;
  }

  function selectedCardsForMode(modeId) {
    if (!state.settings.selectedModeIds.includes(modeId)) return [];
    const mode = modeState(modeId);
    const selectedBoxes = new Set(mode.selectedBoxIds);
    const selectedDifficulties = new Set(mode.selectedDifficultyIds);
    return mode.cards
      .filter(card =>
        card.active &&
        selectedBoxes.has(card.boxId) &&
        selectedDifficulties.has(normalizeDifficulty(card.difficulty, modeId, card))
      )
      .map(card => ({ ...card, modeId }));
  }

  function getPlayableCards() {
    return MODE_ORDER.flatMap(selectedCardsForMode);
  }

  function renderHomeData() {
    renderModeSelection();
    renderAdvancedSettings();
    el.vibrationToggle.checked = state.settings.vibrationEnabled;

    const drawOnly = state.settings.selectedModeIds.length === 1 && state.settings.selectedModeIds[0] === "draw";
    el.globalTimerSettings.classList.toggle("hidden", drawOnly);
    const count = getPlayableCards().length;
    el.availableCount.textContent =
      `${count} carte${count > 1 ? "s" : ""} disponible${count > 1 ? "s" : ""}`;
    el.startButton.disabled = count === 0;
  }

  function renderModeSelection() {
    el.modeSelectionList.innerHTML = "";

    MODE_ORDER.forEach(modeId => {
      const config = modeConfig(modeId);
      const selected = state.settings.selectedModeIds.includes(modeId);
      const playableCount = selectedCardsForMode(modeId).length;

      const tile = document.createElement("article");
      tile.className = `mode-app-tile${selected ? " selected" : ""}`;
      tile.style.setProperty("--mode-color", config.color);

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.className = "mode-tile-check";
      checkbox.checked = selected;
      checkbox.setAttribute("aria-label", `Inclure ${config.name}`);
      checkbox.addEventListener("click", event => event.stopPropagation());
      checkbox.addEventListener("change", () => {
        setModeEnabled(modeId, checkbox.checked);
        renderHomeData();
      });

      const openButton = document.createElement("button");
      openButton.type = "button";
      openButton.className = "mode-tile-open";
      openButton.setAttribute("aria-label", `Configurer le mode ${config.name}`);
      openButton.addEventListener("click", () => openModeConfig(modeId));

      const icon = document.createElement("div");
      icon.className = "mode-tile-icon";
      icon.innerHTML = MODE_ICONS[config.icon] || "";

      const text = document.createElement("div");
      text.className = "mode-tile-text";
      const name = document.createElement("strong");
      name.textContent = config.name;
      const description = document.createElement("small");
      description.textContent = config.description;
      text.append(name, description);

      const footer = document.createElement("div");
      footer.className = "mode-tile-footer";
      const count = document.createElement("span");
      count.className = "mode-tile-count";
      count.textContent = `${playableCount} carte${playableCount > 1 ? "s" : ""}`;
      const arrow = document.createElement("span");
      arrow.className = "mode-tile-chevron";
      arrow.textContent = "Configurer ›";
      footer.append(count, arrow);

      openButton.append(icon, text, footer);
      tile.append(checkbox, openButton);
      el.modeSelectionList.append(tile);
    });
  }

  function setModeEnabled(modeId, enabled) {
    if (enabled) {
      if (modeId === "draw") {
        state.settings.selectedModeIds = ["draw"];
      } else {
        state.settings.selectedModeIds = state.settings.selectedModeIds.filter(id => id !== "draw");
        if (!state.settings.selectedModeIds.includes(modeId)) state.settings.selectedModeIds.push(modeId);
      }
    } else {
      state.settings.selectedModeIds = state.settings.selectedModeIds.filter(id => id !== modeId);
    }
    saveGlobalSettings();
  }

  function openModeConfig(modeId) {
    state.activeModeDialogId = modeId;
    renderModeConfigDialog();
    el.modeConfigDialog.showModal();
  }

  function closeModeConfig() {
    el.modeConfigDialog.close();
    state.activeModeDialogId = null;
    renderHomeData();
  }

  function updateModeDialogCount() {
    const modeId = state.activeModeDialogId;
    if (!modeId) return;
    const count = selectedCardsForMode(modeId).length;
    el.modeDialogCount.textContent = `${count} carte${count > 1 ? "s" : ""} sélectionnée${count > 1 ? "s" : ""}`;
  }

  function renderModeConfigDialog() {
    const modeId = state.activeModeDialogId;
    if (!modeId) return;
    const config = modeConfig(modeId);
    const mode = modeState(modeId);

    el.modeConfigDialog.style.setProperty("--mode-color", config.color);
    el.modeDialogIcon.innerHTML = MODE_ICONS[config.icon] || "";
    el.modeDialogTitle.textContent = config.name;
    el.modeDialogDescription.textContent = config.description;
    el.modeEnabledInput.checked = state.settings.selectedModeIds.includes(modeId);

    el.modeRulesList.innerHTML = "";
    config.rules.forEach(rule => {
      const item = document.createElement("li");
      item.textContent = rule;
      el.modeRulesList.append(item);
    });

    el.modeDifficultyChoices.innerHTML = "";
    ["easy", "medium", "hard"].forEach(difficulty => {
      const label = document.createElement("label");
      label.className = "difficulty-choice";
      const input = document.createElement("input");
      input.type = "checkbox";
      input.checked = mode.selectedDifficultyIds.includes(difficulty);
      input.addEventListener("change", () => {
        if (input.checked) {
          if (!mode.selectedDifficultyIds.includes(difficulty)) mode.selectedDifficultyIds.push(difficulty);
        } else {
          mode.selectedDifficultyIds = mode.selectedDifficultyIds.filter(id => id !== difficulty);
        }
        saveMode(modeId);
        updateModeDialogCount();
        renderModeSelection();
      });
      const span = document.createElement("span");
      span.textContent = DIFFICULTY_LABELS[difficulty];
      label.append(input, span);
      el.modeDifficultyChoices.append(label);
    });

    el.wordsSpecialSettings.classList.toggle("hidden", config.type !== "words");
    el.showForbiddenWordsInput.checked = state.settings.modeOptions.words.showForbiddenWords;

    el.drawSpecialSettings.classList.toggle("hidden", config.type !== "draw");
    const drawOptions = state.settings.modeOptions.draw;
    el.drawAttemptCountInput.value = String(drawOptions.attemptCount);
    el.drawEasySecondsInput.value = String(drawOptions.durations.easy);
    el.drawMediumSecondsInput.value = String(drawOptions.durations.medium);
    el.drawHardSecondsInput.value = String(drawOptions.durations.hard);
    el.drawSoundEnabledInput.checked = drawOptions.soundEnabled;

    el.modeBoxChoices.innerHTML = "";
    mode.boxes.forEach(box => {
      const label = document.createElement("label");
      label.className = "mode-dialog-box-choice";
      const input = document.createElement("input");
      input.type = "checkbox";
      input.checked = mode.selectedBoxIds.includes(box.id);
      input.addEventListener("change", () => {
        if (input.checked) {
          if (!mode.selectedBoxIds.includes(box.id)) mode.selectedBoxIds.push(box.id);
        } else {
          mode.selectedBoxIds = mode.selectedBoxIds.filter(id => id !== box.id);
        }
        saveMode(modeId);
        updateModeDialogCount();
        renderModeSelection();
      });
      const name = document.createElement("span");
      name.textContent = box.name;
      const count = document.createElement("small");
      count.textContent = activeCountForBox(modeId, box.id);
      label.append(input, name, count);
      el.modeBoxChoices.append(label);
    });

    updateModeDialogCount();
  }

  function selectEverything() {
    state.settings.selectedModeIds = [...MODE_ORDER];
    MODE_ORDER.forEach(modeId => {
      const mode = modeState(modeId);
      mode.selectedBoxIds = mode.boxes.map(box => box.id);
      mode.selectedDifficultyIds = ["easy", "medium", "hard"];
    });
    saveAllData();
    renderHomeData();
  }

  function selectNothing() {
    state.settings.selectedModeIds = [];
    saveGlobalSettings();
    renderHomeData();
  }

  function formatDate(value) {
    if (!value) return "Jamais";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "Jamais";

    return date.toLocaleString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  }

  function hasLibraryUpdate() {
    return MODE_ORDER.some(modeId => {
      const meta = modeState(modeId).libraryMeta;
      return meta.installedVersion !== meta.availableVersion;
    });
  }

  function renderAdvancedSettings(message = "") {
    el.libraryVersionList.innerHTML = "";

    MODE_ORDER.forEach(modeId => {
      const config = modeConfig(modeId);
      const meta = modeState(modeId).libraryMeta;

      const row = document.createElement("div");
      row.className = "library-version-row";
      row.style.setProperty("--mode-color", config.color);

      const name = document.createElement("strong");
      name.textContent = config.name;

      const installed = document.createElement("span");
      installed.innerHTML =
        `Installée<br><code>${meta.installedVersion || "Inconnue"}</code>`;

      const available = document.createElement("span");
      available.innerHTML =
        `Disponible<br><code>${meta.availableVersion || "Inconnue"}</code>`;

      row.append(name, installed, available);
      el.libraryVersionList.append(row);
    });

    el.libraryLastChecked.textContent =
      `Dernière vérification : ${formatDate(state.settings.lastLibraryCheckAt)}`;

    const updateAvailable = hasLibraryUpdate();
    el.updateLibrariesButton.disabled = !updateAvailable;
    el.libraryStatusMessage.className = "library-status-message";

    if (message) {
      el.libraryStatusMessage.textContent = message;
      return;
    }

    if (updateAvailable) {
      el.libraryStatusMessage.classList.add("update-available");
      el.libraryStatusMessage.textContent =
        "Une ou plusieurs bibliothèques peuvent être mises à jour.";
    } else {
      el.libraryStatusMessage.classList.add("up-to-date");
      el.libraryStatusMessage.textContent =
        "Toutes les bibliothèques officielles sont à jour.";
    }
  }

  function renderManageModeTabs() {
    el.manageModeTabs.innerHTML = "";

    MODE_ORDER.forEach(modeId => {
      const config = modeConfig(modeId);
      const button = document.createElement("button");
      button.type = "button";
      button.className =
        `mode-tab${state.activeManageModeId === modeId ? " selected" : ""}`;
      button.style.setProperty("--mode-color", config.color);
      button.textContent = config.name;

      button.addEventListener("click", () => {
        state.activeManageModeId = modeId;
        el.cardSearchInput.value = "";
        renderManageScreen();
      });

      el.manageModeTabs.append(button);
    });
  }

  function renderManageFilters() {
    const mode = modeState(state.activeManageModeId);
    const current = el.manageBoxFilter.value || "all";
    el.manageBoxFilter.innerHTML = "";

    const all = document.createElement("option");
    all.value = "all";
    all.textContent = "Toutes les boîtes";
    el.manageBoxFilter.append(all);

    mode.boxes.forEach(box => {
      const option = document.createElement("option");
      option.value = box.id;
      option.textContent = box.name;
      el.manageBoxFilter.append(option);
    });

    el.manageBoxFilter.value =
      [...el.manageBoxFilter.options].some(option => option.value === current)
        ? current
        : "all";
  }

  function getFilteredCards() {
    const modeId = state.activeManageModeId;
    const mode = modeState(modeId);
    const search = el.cardSearchInput.value.trim().toLocaleLowerCase("fr");
    const boxId = el.manageBoxFilter.value;

    return mode.cards.filter(card => {
      if (boxId !== "all" && card.boxId !== boxId) return false;
      if (!search) return true;
      const config = modeConfig(modeId);
      let values;
      if (config.type === "lyrics") {
        values = [card.prompt, card.answer, card.title, card.source];
      } else if (config.type === "words") {
        values = [card.prompt, ...(card.forbiddenWords || [])];
      } else {
        values = [card.prompt];
      }
      values.push(DIFFICULTY_LABELS[card.difficulty], getBoxName(modeId, card.boxId));
      return values.join(" ").toLocaleLowerCase("fr").includes(search);
    });
  }

  function renderManageScreen() {
    renderManageModeTabs();
    renderManageFilters();
    renderCardList();
  }

  function renderCardList() {
    const modeId = state.activeManageModeId;
    const config = modeConfig(modeId);
    const mode = modeState(modeId);
    const cards = getFilteredCards();
    const activeTotal = mode.cards.filter(card => card.active).length;

    el.cardSearchInput.placeholder = config.type === "lyrics"
      ? "Rechercher une chanson, un artiste…"
      : config.type === "words"
        ? "Rechercher un mot ou un interdit…"
        : config.type === "draw"
          ? "Rechercher une consigne à dessiner…"
          : "Rechercher une consigne de mime…";

    el.manageStats.textContent =
      `${mode.cards.length} carte${mode.cards.length > 1 ? "s" : ""} · ` +
      `${activeTotal} active${activeTotal > 1 ? "s" : ""} · ` +
      `${cards.length} affichée${cards.length > 1 ? "s" : ""}`;
    el.cardList.innerHTML = "";

    if (cards.length === 0) {
      const empty = document.createElement("p");
      empty.className = "empty-list";
      empty.textContent = "Aucune carte ne correspond à ce filtre.";
      el.cardList.append(empty);
      return;
    }

    cards.forEach(card => {
      const row = document.createElement("article");
      row.className = `manage-card-row${card.active ? "" : " inactive"}`;
      const main = document.createElement("div");
      main.className = "manage-card-main";
      const title = document.createElement("strong");
      const subtitle = document.createElement("span");

      if (config.type === "lyrics") {
        title.textContent = card.title;
        subtitle.textContent = `${card.prompt} … ${card.answer}`;
      } else if (config.type === "words") {
        title.textContent = card.prompt;
        subtitle.className = "forbidden-preview";
        subtitle.textContent = `Interdits : ${(card.forbiddenWords || []).join(", ") || "aucun"}`;
      } else {
        title.textContent = card.prompt;
        subtitle.textContent = config.name;
      }

      const badges = document.createElement("div");
      badges.className = "card-badges";
      const boxBadge = document.createElement("span");
      boxBadge.className = "box-badge";
      boxBadge.textContent = getBoxName(modeId, card.boxId);
      const difficulty = document.createElement("span");
      difficulty.className = `difficulty-badge ${card.difficulty}`;
      difficulty.textContent = DIFFICULTY_LABELS[card.difficulty];
      badges.append(boxBadge, difficulty);
      main.append(title, subtitle, badges);

      const actions = document.createElement("div");
      actions.className = "manage-card-actions";
      actions.append(
        makeActionButton("Modifier", () => openCardEditor(modeId, card.id)),
        makeActionButton("Dupliquer", () => duplicateCard(modeId, card.id)),
        makeActionButton(card.active ? "Désactiver" : "Activer", () => toggleCard(modeId, card.id)),
        makeActionButton("Supprimer", () => deleteCard(modeId, card.id), true)
      );
      row.append(main, actions);
      el.cardList.append(row);
    });
  }

  function makeActionButton(text, handler, danger = false) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `icon-button${danger ? " danger" : ""}`;
    button.textContent = text;
    button.addEventListener("click", handler);
    return button;
  }

  function openManageScreen() {
    renderManageScreen();
    showScreen(el.manageScreen);
  }

  function closeManageScreen() {
    renderHomeData();
    showScreen(el.homeScreen);
  }

  function populateBoxSelect(modeId, selectedId) {
    const mode = modeState(modeId);
    el.cardBoxInput.innerHTML = "";

    mode.boxes.forEach(box => {
      const option = document.createElement("option");
      option.value = box.id;
      option.textContent = box.name;
      el.cardBoxInput.append(option);
    });

    el.cardBoxInput.value =
      mode.boxes.some(box => box.id === selectedId)
        ? selectedId
        : UNCATEGORIZED_ID;
  }

  function openCardEditor(modeId, cardId = null) {
    const config = modeConfig(modeId);
    const mode = modeState(modeId);
    const card = cardId ? mode.cards.find(item => item.id === cardId) : null;

    el.cardDialogTitle.textContent = `${card ? "Modifier" : "Ajouter"} — ${config.name}`;
    el.cardIdInput.value = card?.id || "";
    el.cardModeInput.value = modeId;
    el.cardActiveInput.checked = card?.active !== false;
    el.cardDifficultyInput.value = normalizeDifficulty(card?.difficulty, modeId, card || {});

    el.lyricsEditorFields.classList.toggle("hidden", config.type !== "lyrics");
    el.mimeEditorFields.classList.toggle("hidden", !["mime", "draw"].includes(config.type));
    el.wordsEditorFields.classList.toggle("hidden", config.type !== "words");

    if (config.type === "lyrics") {
      el.cardPromptInput.value = card?.prompt || "";
      el.cardAnswerInput.value = card?.answer || "";
      el.cardTitleInput.value = card?.title || "";
      el.cardSourceInput.value = card?.source || "";
    } else if (config.type === "words") {
      el.wordPromptInput.value = card?.prompt || "";
      el.forbiddenWordsInput.value = (card?.forbiddenWords || []).join(", ");
    } else {
      el.simplePromptLabel.textContent = config.type === "draw" ? "Consigne à dessiner" : "Consigne à mimer";
      el.mimePromptInput.placeholder = config.type === "draw" ? "Un cactus portant des moufles" : "Un pigeon qui vole une frite";
      el.mimePromptInput.value = card?.prompt || "";
    }

    populateBoxSelect(modeId, card?.boxId || mode.boxes[0]?.id || UNCATEGORIZED_ID);
    el.cardDialog.showModal();
    setTimeout(() => {
      if (config.type === "lyrics") el.cardPromptInput.focus();
      else if (config.type === "words") el.wordPromptInput.focus();
      else el.mimePromptInput.focus();
    }, 50);
  }

  function closeCardEditor() {
    el.cardDialog.close();
  }

  function saveCard(event) {
    event.preventDefault();
    const modeId = el.cardModeInput.value;
    const config = modeConfig(modeId);
    const mode = modeState(modeId);
    const common = {
      difficulty: el.cardDifficultyInput.value,
      boxId: el.cardBoxInput.value,
      active: el.cardActiveInput.checked
    };
    let data;

    if (config.type === "lyrics") {
      data = {
        ...common,
        prompt: el.cardPromptInput.value.trim(),
        answer: el.cardAnswerInput.value.trim(),
        title: el.cardTitleInput.value.trim(),
        source: el.cardSourceInput.value.trim()
      };
      if (!data.prompt || !data.answer || !data.title || !data.source) {
        alert("Remplis tous les champs de la carte.");
        return;
      }
    } else if (config.type === "words") {
      data = {
        ...common,
        prompt: el.wordPromptInput.value.trim(),
        forbiddenWords: el.forbiddenWordsInput.value
          .split(/[,;\n]+/)
          .map(word => word.trim())
          .filter(Boolean)
      };
      if (!data.prompt) {
        alert("Écris le mot ou l’expression à faire deviner.");
        return;
      }
    } else {
      data = { ...common, prompt: el.mimePromptInput.value.trim() };
      if (!data.prompt) {
        alert(config.type === "draw" ? "Écris une consigne à dessiner." : "Écris une consigne à mimer.");
        return;
      }
    }

    const id = el.cardIdInput.value;
    if (id) {
      const index = mode.cards.findIndex(card => card.id === id);
      if (index >= 0) mode.cards[index] = { ...mode.cards[index], ...data, locallyModified: true };
    } else {
      mode.cards.unshift({
        id: uniqueId(modeId),
        ...data,
        origin: "personal",
        locallyModified: true
      });
    }

    saveMode(modeId);
    closeCardEditor();
    renderManageScreen();
    renderHomeData();
  }

  function duplicateCard(modeId, cardId) {
    const mode = modeState(modeId);
    const card = mode.cards.find(item => item.id === cardId);
    if (!card) return;

    const copy = {
      ...clone(card),
      id: uniqueId(modeId),
      origin: "personal",
      locallyModified: true
    };

    if (modeConfig(modeId).type === "lyrics") {
      copy.title = `${card.title} — copie`;
    } else {
      copy.prompt = `${card.prompt} — copie`;
    }

    mode.cards.unshift(copy);
    saveMode(modeId);
    renderManageScreen();
    renderHomeData();
  }

  function toggleCard(modeId, cardId) {
    const mode = modeState(modeId);
    const card = mode.cards.find(item => item.id === cardId);
    if (!card) return;

    card.active = !card.active;
    card.locallyModified = true;
    saveMode(modeId);
    renderManageScreen();
    renderHomeData();
  }

  function deleteCard(modeId, cardId) {
    const mode = modeState(modeId);
    const card = mode.cards.find(item => item.id === cardId);
    if (!card) return;

    const label = modeConfig(modeId).type === "lyrics"
      ? card.title
      : card.prompt;

    if (!confirm(`Supprimer définitivement « ${label} » ?`)) return;

    if (
      card.origin === "official" &&
      !mode.libraryMeta.deletedOfficialCardIds.includes(card.id)
    ) {
      mode.libraryMeta.deletedOfficialCardIds.push(card.id);
    }

    mode.cards = mode.cards.filter(item => item.id !== cardId);
    saveMode(modeId);
    renderManageScreen();
    renderHomeData();
  }

  function openBoxesManager() {
    const config = modeConfig(state.activeManageModeId);
    el.boxesDialogTitle.textContent = `Boîtes — ${config.name}`;
    el.newBoxNameInput.value = "";
    renderBoxesList();
    el.boxesDialog.showModal();
  }

  function closeBoxesManager() {
    el.boxesDialog.close();
    renderManageScreen();
    renderHomeData();
  }

  function renderBoxesList() {
    const modeId = state.activeManageModeId;
    const mode = modeState(modeId);
    el.boxesList.innerHTML = "";

    mode.boxes.forEach(box => {
      const row = document.createElement("div");
      row.className = "box-row";

      const main = document.createElement("div");
      main.className = "box-row-main";

      const name = document.createElement("strong");
      name.textContent = box.name;

      const count = document.createElement("small");
      const cardCount = mode.cards.filter(card => card.boxId === box.id).length;
      count.textContent = `${cardCount} carte${cardCount > 1 ? "s" : ""}`;

      main.append(name, count);

      const actions = document.createElement("div");
      actions.className = "box-row-actions";
      actions.append(makeActionButton("Renommer", () => renameBox(modeId, box.id)));

      if (!box.protected && box.id !== UNCATEGORIZED_ID) {
        actions.append(
          makeActionButton("Supprimer", () => deleteBox(modeId, box.id), true)
        );
      }

      row.append(main, actions);
      el.boxesList.append(row);
    });
  }

  function addBox() {
    const modeId = state.activeManageModeId;
    const mode = modeState(modeId);
    const name = el.newBoxNameInput.value.trim();
    if (!name) return;

    if (
      mode.boxes.some(
        box => box.name.toLocaleLowerCase("fr") === name.toLocaleLowerCase("fr")
      )
    ) {
      alert("Une boîte porte déjà ce nom.");
      return;
    }

    const box = {
      id: uniqueId(`${modeId}-box`),
      name,
      origin: "personal",
      locallyModified: true
    };

    mode.boxes.splice(Math.max(0, mode.boxes.length - 1), 0, box);
    mode.selectedBoxIds.push(box.id);
    el.newBoxNameInput.value = "";

    saveMode(modeId);
    renderBoxesList();
    renderHomeData();
  }

  function renameBox(modeId, boxId) {
    const mode = modeState(modeId);
    const box = mode.boxes.find(item => item.id === boxId);
    if (!box) return;

    const name = prompt("Nouveau nom de la boîte :", box.name)?.trim();
    if (!name || name === box.name) return;

    if (
      mode.boxes.some(
        item =>
          item.id !== boxId &&
          item.name.toLocaleLowerCase("fr") === name.toLocaleLowerCase("fr")
      )
    ) {
      alert("Une autre boîte porte déjà ce nom.");
      return;
    }

    box.name = name;
    box.locallyModified = true;
    saveMode(modeId);
    renderBoxesList();
    renderHomeData();
  }

  function deleteBox(modeId, boxId) {
    const mode = modeState(modeId);
    const box = mode.boxes.find(item => item.id === boxId);
    if (!box || box.protected || boxId === UNCATEGORIZED_ID) return;

    const cardCount = mode.cards.filter(card => card.boxId === boxId).length;
    const message = cardCount
      ? `Supprimer « ${box.name} » ? Ses ${cardCount} carte${cardCount > 1 ? "s" : ""} seront déplacées dans « Sans catégorie ».`
      : `Supprimer la boîte « ${box.name} » ?`;

    if (!confirm(message)) return;

    mode.cards.forEach(card => {
      if (card.boxId === boxId) {
        card.boxId = UNCATEGORIZED_ID;
        card.locallyModified = true;
      }
    });

    if (
      box.origin === "official" &&
      !mode.libraryMeta.deletedOfficialBoxIds.includes(box.id)
    ) {
      mode.libraryMeta.deletedOfficialBoxIds.push(box.id);
    }

    mode.boxes = mode.boxes.filter(item => item.id !== boxId);
    mode.selectedBoxIds = mode.selectedBoxIds.filter(id => id !== boxId);

    if (!mode.selectedBoxIds.includes(UNCATEGORIZED_ID)) {
      mode.selectedBoxIds.push(UNCATEGORIZED_ID);
    }

    saveMode(modeId);
    renderBoxesList();
    renderHomeData();
  }

  async function checkLibraries() {
    const originalText = el.checkLibrariesButton.textContent;
    el.checkLibrariesButton.disabled = true;
    el.checkLibrariesButton.textContent = "Vérification…";
    renderAdvancedSettings("Connexion aux bibliothèques GitHub…");

    let failed = 0;

    for (const modeId of MODE_ORDER) {
      try {
        const library = await fetchOfficialLibrary(modeId, {
          forceNetwork: true,
          allowFallback: false
        });

        const mode = modeState(modeId);
        mode.officialLibrary = library;
        mode.libraryMeta.availableVersion = library.libraryVersion;
        mode.libraryMeta.lastCheckedAt = new Date().toISOString();
        saveMode(modeId);
      } catch {
        failed += 1;
      }
    }

    state.settings.lastLibraryCheckAt = new Date().toISOString();
    saveGlobalSettings();

    el.checkLibrariesButton.disabled = false;
    el.checkLibrariesButton.textContent = originalText;

    if (failed) {
      renderAdvancedSettings(
        `${failed} bibliothèque${failed > 1 ? "s n’ont" : " n’a"} pas pu être vérifiée${failed > 1 ? "s" : ""}.`
      );
      el.libraryStatusMessage.classList.add("error");
    } else {
      renderAdvancedSettings();
    }
  }

  function mergeModeLibrary(modeId, library) {
    const mode = modeState(modeId);
    const deletedBoxIds = new Set(mode.libraryMeta.deletedOfficialBoxIds);
    const deletedCardIds = new Set(mode.libraryMeta.deletedOfficialCardIds);
    const localBoxes = new Map(mode.boxes.map(box => [box.id, box]));
    const localCards = new Map(mode.cards.map(card => [card.id, card]));

    const stats = {
      boxesAdded: 0,
      boxesUpdated: 0,
      cardsAdded: 0,
      cardsUpdated: 0,
      localPreserved: 0
    };

    library.boxes.forEach(officialBox => {
      if (deletedBoxIds.has(officialBox.id)) return;

      const existing = localBoxes.get(officialBox.id);

      if (!existing) {
        const created = officialBoxFrom(officialBox);
        mode.boxes.splice(Math.max(0, mode.boxes.length - 1), 0, created);
        localBoxes.set(created.id, created);

        if (!mode.selectedBoxIds.includes(created.id)) {
          mode.selectedBoxIds.push(created.id);
        }

        stats.boxesAdded += 1;
      } else if (existing.origin === "official" && !existing.locallyModified) {
        Object.assign(existing, officialBoxFrom(officialBox));
        stats.boxesUpdated += 1;
      } else {
        stats.localPreserved += 1;
      }
    });

    library.cards.forEach(officialCard => {
      if (
        deletedCardIds.has(officialCard.id) ||
        deletedBoxIds.has(officialCard.boxId)
      ) return;

      const existing = localCards.get(officialCard.id);

      if (!existing) {
        const created = officialCardFrom(officialCard);

        if (!mode.boxes.some(box => box.id === created.boxId)) {
          created.boxId = UNCATEGORIZED_ID;
        }

        mode.cards.push(created);
        localCards.set(created.id, created);
        stats.cardsAdded += 1;
      } else if (existing.origin === "official" && !existing.locallyModified) {
        const replacement = officialCardFrom(officialCard);

        if (!mode.boxes.some(box => box.id === replacement.boxId)) {
          replacement.boxId = UNCATEGORIZED_ID;
        }

        Object.assign(existing, replacement);
        stats.cardsUpdated += 1;
      } else {
        stats.localPreserved += 1;
      }
    });

    mode.officialLibrary = library;
    mode.libraryMeta.installedVersion = library.libraryVersion;
    mode.libraryMeta.availableVersion = library.libraryVersion;
    mode.libraryMeta.lastCheckedAt = new Date().toISOString();
    saveMode(modeId);

    return stats;
  }

  async function updateLibraries() {
    const originalText = el.updateLibrariesButton.textContent;
    el.updateLibrariesButton.disabled = true;
    el.updateLibrariesButton.textContent = "Mise à jour…";

    const totals = {
      cardsAdded: 0,
      cardsUpdated: 0,
      boxesAdded: 0,
      localPreserved: 0,
      failed: 0
    };

    for (const modeId of MODE_ORDER) {
      const mode = modeState(modeId);

      if (
        mode.libraryMeta.installedVersion ===
        mode.libraryMeta.availableVersion
      ) continue;

      try {
        const library = await fetchOfficialLibrary(modeId, {
          forceNetwork: true,
          allowFallback: false
        });

        const stats = mergeModeLibrary(modeId, library);
        totals.cardsAdded += stats.cardsAdded;
        totals.cardsUpdated += stats.cardsUpdated;
        totals.boxesAdded += stats.boxesAdded;
        totals.localPreserved += stats.localPreserved;
      } catch {
        totals.failed += 1;
      }
    }

    state.settings.lastLibraryCheckAt = new Date().toISOString();
    saveGlobalSettings();
    renderHomeData();
    renderManageScreen();
    el.updateLibrariesButton.textContent = originalText;

    alert(
      `Bibliothèques mises à jour.\n\n` +
      `${totals.cardsAdded} nouvelle(s) carte(s)\n` +
      `${totals.cardsUpdated} carte(s) officielle(s) actualisée(s)\n` +
      `${totals.boxesAdded} nouvelle(s) boîte(s)\n` +
      `${totals.localPreserved} modification(s) locale(s) conservée(s)` +
      (totals.failed ? `\n${totals.failed} échec(s)` : "")
    );
  }

  function exportBackup() {
    const backup = {
      backupSchemaVersion: 3,
      appVersion: APP_VERSION,
      exportedAt: new Date().toISOString(),
      settings: state.settings,
      modes: Object.fromEntries(MODE_ORDER.map(modeId => {
        const mode = modeState(modeId);
        return [modeId, {
          boxes: mode.boxes,
          cards: mode.cards,
          selectedBoxIds: mode.selectedBoxIds,
          selectedDifficultyIds: mode.selectedDifficultyIds,
          libraryMeta: mode.libraryMeta
        }];
      }))
    };

    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `mdb-sauvegarde-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function validBackup(data) {
    if ([2, 3].includes(Number(data?.backupSchemaVersion))) {
      return data.settings && data.modes && Object.values(data.modes).some(mode =>
        Array.isArray(mode?.boxes) && Array.isArray(mode?.cards)
      );
    }
    if (Number(data?.backupSchemaVersion) === 1) {
      return Array.isArray(data.boxes) && Array.isArray(data.cards) && data.settings && data.libraryMeta;
    }
    return false;
  }

  async function restoreBackupFile(event) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    try {
      const data = JSON.parse(await file.text());
      if (!validBackup(data)) throw new Error("Ce fichier n’est pas une sauvegarde MDB valide.");
      if (!confirm(
        `Restaurer cette sauvegarde du ${formatDate(data.exportedAt)} ?\n\n` +
        "Les données des modes présents dans le fichier remplaceront celles de ce téléphone."
      )) return;

      if ([2, 3].includes(Number(data.backupSchemaVersion))) {
        state.settings = {
          ...state.settings,
          ...clone(data.settings),
          modeOptions: {
            words: {
              showForbiddenWords: data.settings?.modeOptions?.words?.showForbiddenWords !== false
            }
          }
        };

        MODE_ORDER.forEach(modeId => {
          const restored = data.modes[modeId];
          if (!restored) return;
          const mode = modeState(modeId);
          mode.boxes = clone(restored.boxes);
          mode.cards = clone(restored.cards);
          mode.selectedBoxIds = clone(restored.selectedBoxIds || []);
          mode.selectedDifficultyIds = clone(restored.selectedDifficultyIds || ["easy", "medium", "hard"]);
          mode.libraryMeta = clone(restored.libraryMeta);
          sanitizeMode(modeId, mode, mode.officialLibrary);
        });
      } else {
        const lyricsMode = modeState("lyrics");
        lyricsMode.boxes = clone(data.boxes);
        lyricsMode.cards = clone(data.cards);
        lyricsMode.selectedBoxIds = clone(data.settings.selectedBoxIds || []);
        lyricsMode.selectedDifficultyIds = ["easy", "medium", "hard"];
        lyricsMode.libraryMeta = clone(data.libraryMeta);
        sanitizeMode("lyrics", lyricsMode, lyricsMode.officialLibrary);
        state.settings.vibrationEnabled = data.settings.vibrationEnabled !== false;
      }

      saveAllData();
      renderHomeData();
      renderManageScreen();
      alert("Sauvegarde restaurée.");
    } catch (error) {
      recordError(error);
      alert(error.message || "Impossible de restaurer cette sauvegarde.");
    }
  }

  async function resetLibraries() {
    if (!confirm(
      "Réinitialiser toutes les bibliothèques officielles ?\n\n" +
      "Les cartes officielles retrouveront leur version GitHub. " +
      "Les cartes et boîtes personnelles seront conservées."
    )) return;

    const snapshots = {};

    try {
      for (const modeId of MODE_ORDER) {
        snapshots[modeId] = await fetchOfficialLibrary(modeId, {
          forceNetwork: true,
          allowFallback: false
        });
      }

      for (const modeId of MODE_ORDER) {
        const mode = modeState(modeId);
        const library = snapshots[modeId];
        const personalBoxes = mode.boxes.filter(box => box.origin === "personal");
        const personalCards = mode.cards.filter(card => card.origin === "personal");
        const officialBoxes = library.boxes.map(officialBoxFrom);

        const allBoxes = [
          ...officialBoxes.filter(box => box.id !== UNCATEGORIZED_ID),
          ...personalBoxes
        ];

        const uncategorized =
          officialBoxes.find(box => box.id === UNCATEGORIZED_ID);

        if (uncategorized) allBoxes.push(uncategorized);

        const validBoxIds = new Set(allBoxes.map(box => box.id));

        personalCards.forEach(card => {
          if (!validBoxIds.has(card.boxId)) card.boxId = UNCATEGORIZED_ID;
        });

        mode.boxes = allBoxes;
        mode.cards = [
          ...library.cards.map(officialCardFrom),
          ...personalCards
        ];
        mode.officialLibrary = library;
        mode.libraryMeta = {
          installedVersion: library.libraryVersion,
          availableVersion: library.libraryVersion,
          lastCheckedAt: new Date().toISOString(),
          deletedOfficialCardIds: [],
          deletedOfficialBoxIds: []
        };

        mode.selectedBoxIds =
          mode.selectedBoxIds.filter(id => validBoxIds.has(id));

        library.boxes.forEach(box => {
          if (!mode.selectedBoxIds.includes(box.id)) {
            mode.selectedBoxIds.push(box.id);
          }
        });

        saveMode(modeId);
      }

      renderHomeData();
      renderManageScreen();

      alert(
        "Bibliothèques officielles réinitialisées. " +
        "Les contenus personnels ont été conservés."
      );
    } catch (error) {
      recordError(error);
      alert(
        "La réinitialisation a échoué. " +
        "Aucune bibliothèque n’a été remplacée."
      );
    }
  }

  function drawPointValue(difficulty) {
    return difficulty === "hard" ? 3 : difficulty === "medium" ? 2 : 1;
  }

  function buildBalancedDrawQueue(cards, wanted) {
    const buckets = { easy: [], medium: [], hard: [] };
    cards.forEach(card => buckets[card.difficulty]?.push(card));
    Object.keys(buckets).forEach(key => buckets[key] = shuffle(buckets[key]));
    const enabled = modeState("draw").selectedDifficultyIds.filter(id => buckets[id]?.length);
    const order = shuffle(enabled.length ? enabled : ["easy", "medium", "hard"]);
    const result = [];
    let guard = 0;
    while (result.length < wanted && guard < wanted * 20) {
      const difficulty = order[guard % order.length];
      if (buckets[difficulty]?.length) result.push({ ...buckets[difficulty].pop(), modeId: "draw" });
      else {
        const fallback = Object.keys(buckets).find(key => buckets[key].length);
        if (!fallback) break;
        result.push({ ...buckets[fallback].pop(), modeId: "draw" });
      }
      guard += 1;
    }
    return result;
  }

  async function startDrawingRound() {
    const cards = selectedCardsForMode("draw");
    if (!cards.length) {
      alert("Sélectionne au moins une catégorie et une difficulté pour le dessin.");
      return;
    }
    await requestGameDisplay();
    const wanted = Math.min(state.settings.modeOptions.draw.attemptCount, cards.length);
    state.drawRound = {
      queue: buildBalancedDrawQueue(cards, wanted),
      attemptIndex: 0,
      points: 0,
      successes: 0,
      totalUsedMs: 0,
      history: [],
      currentCard: null,
      timerRaf: 0,
      deadline: 0,
      durationMs: 0,
      remainingMs: 0,
      support: null,
      strokes: [],
      undoActions: [],
      currentStroke: null,
      color: "#111318",
      size: 7,
      eraser: false,
      canvasWidth: 0,
      canvasHeight: 0
    };
    showNextDrawingPrompt();
  }

  function showNextDrawingPrompt() {
    const round = state.drawRound;
    cancelAnimationFrame(round?.timerRaf || 0);
    if (!round || round.attemptIndex >= round.queue.length) {
      finishDrawingRound();
      return;
    }
    round.currentCard = round.queue[round.attemptIndex];
    el.drawPromptPanel.classList.remove("hidden");
    el.drawAttemptLabel.textContent = `Dessin ${round.attemptIndex + 1} sur ${round.queue.length}`;
    el.drawRevealPrompt.textContent = round.currentCard.prompt;
    el.drawRevealMeta.textContent = `${getBoxName("draw", round.currentCard.boxId)} · ${DIFFICULTY_LABELS[round.currentCard.difficulty]} · ${drawPointValue(round.currentCard.difficulty)} point${drawPointValue(round.currentCard.difficulty) > 1 ? "s" : ""}`;
    showScreen(el.drawRevealScreen);
  }

  function skipDrawingBeforeStart() {
    recordDrawingResult("passed", 0, true);
  }

  function startDrawingPlay(support) {
    const round = state.drawRound;
    if (!round?.currentCard) return;
    round.support = support;
    round.strokes = [];
    round.undoActions = [];
    round.currentStroke = null;
    round.eraser = false;
    updateDrawToolButton();
    el.drawCanvasArea.classList.toggle("hidden", support !== "phone");
    el.drawPaperArea.classList.toggle("hidden", support !== "paper");
    el.drawPlayProgress.textContent = `Dessin ${round.attemptIndex + 1}/${round.queue.length}`;
    updateDrawLiveScore();
    showScreen(el.drawPlayScreen);
    if (support === "phone") requestAnimationFrame(() => resizeDrawingCanvas(true));
    startDrawingTimer();
  }

  function updateDrawLiveScore() {
    const round = state.drawRound;
    if (!round) return;
    el.drawLiveScore.textContent = `${round.points} point${round.points > 1 ? "s" : ""}`;
  }

  function startDrawingTimer() {
    const round = state.drawRound;
    const seconds = state.settings.modeOptions.draw.durations[round.currentCard.difficulty];
    round.durationMs = seconds * 1000;
    round.remainingMs = round.durationMs;
    round.deadline = performance.now() + round.durationMs;
    cancelAnimationFrame(round.timerRaf);

    const tick = now => {
      if (!state.drawRound || state.drawRound !== round) return;
      round.remainingMs = Math.max(0, round.deadline - now);
      el.drawTimerDisplay.textContent = String(Math.ceil(round.remainingMs / 1000));
      if (round.remainingMs <= 0) {
        playDrawingEndSignal();
        recordDrawingResult("passed", round.durationMs, false, true);
        return;
      }
      round.timerRaf = requestAnimationFrame(tick);
    };
    round.timerRaf = requestAnimationFrame(tick);
  }

  function playDrawingEndSignal() {
    if (state.settings.vibrationEnabled && "vibrate" in navigator) navigator.vibrate([180,80,180,80,300]);
    if (!state.settings.modeOptions.draw.soundEnabled) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      state.drawAudioContext ||= new AudioContext();
      const ctx = state.drawAudioContext;
      const start = ctx.currentTime;
      [0, .18, .36].forEach((offset, index) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.value = index === 2 ? 440 : 660;
        gain.gain.setValueAtTime(.0001, start + offset);
        gain.gain.exponentialRampToValueAtTime(.18, start + offset + .01);
        gain.gain.exponentialRampToValueAtTime(.0001, start + offset + .14);
        osc.connect(gain).connect(ctx.destination);
        osc.start(start + offset); osc.stop(start + offset + .15);
      });
    } catch (error) { recordError(error); }
  }

  function recordDrawingResult(result, elapsedMs = null, fromReveal = false, timeout = false) {
    const round = state.drawRound;
    if (!round?.currentCard) return;
    cancelAnimationFrame(round.timerRaf);
    const used = fromReveal ? 0 : Math.max(0, elapsedMs ?? (round.durationMs - round.remainingMs));
    const gained = result === "valid" ? drawPointValue(round.currentCard.difficulty) : 0;
    if (result === "valid") {
      round.points += gained;
      round.successes += 1;
      vibrateForResult("valid");
    } else if (!timeout) {
      vibrateForResult("pass");
    }
    round.totalUsedMs += used;
    round.history.push({ card: round.currentCard, result, points: gained, usedMs: used, support: round.support || "skipped" });
    round.attemptIndex += 1;
    updateDrawLiveScore();
    window.setTimeout(showNextDrawingPrompt, 280);
  }

  function finishDrawingRound() {
    const round = state.drawRound;
    if (!round) return;
    cancelAnimationFrame(round.timerRaf);
    el.resultValid.textContent = String(round.points);
    el.resultPassed.textContent = String(round.successes);
    el.resultTotal.textContent = String(round.history.length);
    el.resultValidLabel.textContent = "points";
    el.resultPassedLabel.textContent = "trouvés";
    el.resultTotalLabel.textContent = "dessins";
    el.resultDetails.innerHTML = "";

    round.history.forEach(entry => {
      const row = document.createElement("div");
      row.className = `result-row ${entry.result === "valid" ? "valid" : "passed"}`;
      const status = document.createElement("span");
      status.className = "status";
      status.textContent = entry.result === "valid" ? "✓" : "✕";
      const details = document.createElement("div");
      details.className = "details";
      const title = document.createElement("strong");
      title.textContent = entry.card.prompt;
      const small = document.createElement("small");
      const seconds = (entry.usedMs / 1000).toFixed(1).replace(".0", "");
      small.textContent = `${DIFFICULTY_LABELS[entry.card.difficulty]} · ${entry.points} point${entry.points > 1 ? "s" : ""} · ${seconds} s`;
      details.append(title, small);
      const word = document.createElement("span");
      word.className = "result-word";
      word.textContent = entry.result === "valid" ? "TROUVÉ" : "PASSÉ";
      row.append(status, details, word);
      el.resultDetails.append(row);
    });

    state.drawRound = null;
    showScreen(el.resultsScreen);
    releaseWakeLock();
  }

  function resetResultLabels() {
    el.resultValidLabel.textContent = "validées";
    el.resultPassedLabel.textContent = "passées";
    el.resultTotalLabel.textContent = "jouées";
  }

  function resizeDrawingCanvas(clear = false) {
    const canvas = el.drawingCanvas;
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    const round = state.drawRound;
    if (round) {
      round.canvasWidth = rect.width;
      round.canvasHeight = rect.height;
      if (clear) {
        round.strokes = [];
        round.undoActions = [];
      }
    }
    redrawDrawingCanvas();
  }

  function redrawDrawingCanvas() {
    const canvas = el.drawingCanvas;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    ctx.setTransform(dpr,0,0,dpr,0,0);
    ctx.clearRect(0,0,rect.width,rect.height);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0,0,rect.width,rect.height);
    const strokes = state.drawRound?.strokes || [];
    strokes.forEach(stroke => drawStroke(ctx, stroke));
  }

  function drawStroke(ctx, stroke) {
    if (!stroke.points.length) return;
    ctx.save();
    ctx.strokeStyle = stroke.eraser ? "#ffffff" : stroke.color;
    ctx.fillStyle = ctx.strokeStyle;
    ctx.lineWidth = stroke.size;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    if (stroke.points.length === 1) {
      const p = stroke.points[0];
      ctx.beginPath(); ctx.arc(p.x,p.y,stroke.size/2,0,Math.PI*2); ctx.fill();
    } else {
      ctx.beginPath(); ctx.moveTo(stroke.points[0].x,stroke.points[0].y);
      stroke.points.slice(1).forEach(p => ctx.lineTo(p.x,p.y));
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawingPoint(event) {
    const rect = el.drawingCanvas.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  }

  function onDrawPointerDown(event) {
    if (!state.drawRound || state.drawRound.support !== "phone") return;
    event.preventDefault();
    const round = state.drawRound;
    round.currentStroke = { color: round.color, size: round.size, eraser: round.eraser, points: [drawingPoint(event)] };
    round.strokes.push(round.currentStroke);
    round.undoActions.push({ type: "stroke", stroke: round.currentStroke });
    state.drawPointer = event.pointerId;
    el.drawingCanvas.setPointerCapture?.(event.pointerId);
    redrawDrawingCanvas();
  }

  function onDrawPointerMove(event) {
    if (state.drawPointer !== event.pointerId || !state.drawRound?.currentStroke) return;
    event.preventDefault();
    state.drawRound.currentStroke.points.push(drawingPoint(event));
    redrawDrawingCanvas();
  }

  function onDrawPointerEnd(event) {
    if (state.drawPointer !== event.pointerId) return;
    state.drawPointer = null;
    if (state.drawRound) state.drawRound.currentStroke = null;
  }

  const DRAW_ERASER_ICON = `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m7.5 17.5-4-4a2 2 0 0 1 0-2.8l7.2-7.2a2 2 0 0 1 2.8 0l7 7a2 2 0 0 1 0 2.8l-4.2 4.2H7.5Z"/>
      <path d="m10 7 7 7M7.5 17.5h12"/>
    </svg>`;

  const DRAW_PENCIL_ICON = `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m4 20 4.5-1 10-10a2.1 2.1 0 0 0-3-3l-10 10L4 20Z"/>
      <path d="m13.8 7.2 3 3M5.5 16.5l2 2"/>
    </svg>`;

  function updateDrawToolButton() {
    if (!el.drawEraserButton || !el.drawToolIcon) return;
    const erasing = Boolean(state.drawRound?.eraser);
    el.drawEraserButton.classList.toggle("active", erasing);
    el.drawToolIcon.innerHTML = erasing ? DRAW_PENCIL_ICON : DRAW_ERASER_ICON;
    el.drawEraserButton.setAttribute("aria-label", erasing ? "Repasser au crayon" : "Passer à la gomme");
    el.drawEraserButton.title = erasing ? "Crayon" : "Gomme";
  }

  function chooseDrawColor(color) {
    const round = state.drawRound;
    if (!round) return;
    round.color = color;
    round.eraser = false;
    updateDrawToolButton();
    el.drawColorChoices.querySelectorAll(".draw-color").forEach(button => button.classList.toggle("selected", button.dataset.color === color));
  }

  function toggleDrawEraser() {
    if (!state.drawRound) return;
    state.drawRound.eraser = !state.drawRound.eraser;
    updateDrawToolButton();
  }

  function undoDrawingStroke() {
    const round = state.drawRound;
    if (!round?.undoActions.length) return;
    const action = round.undoActions.pop();
    if (action.type === "stroke") {
      const index = round.strokes.lastIndexOf(action.stroke);
      if (index >= 0) round.strokes.splice(index, 1);
    } else if (action.type === "clear") {
      round.strokes = action.strokes;
    }
    redrawDrawingCanvas();
  }

  function clearDrawingCanvas() {
    const round = state.drawRound;
    if (!round?.strokes.length) return;
    const snapshot = [...round.strokes];
    round.undoActions.push({ type: "clear", strokes: snapshot });
    round.strokes = [];
    redrawDrawingCanvas();
  }

  function shuffle(items) {
    const copy = [...items];

    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }

    return copy;
  }

  function refillQueue() {
    const next = shuffle(getPlayableCards());

    if (state.currentCard && next.length > 1) {
      const firstSame =
        next[0].modeId === state.currentCard.modeId &&
        next[0].id === state.currentCard.id;

      if (firstSame) [next[0], next[1]] = [next[1], next[0]];
    }

    state.queue.push(...next);
  }

  function drawNextCard() {
    if (state.queue.length === 0) refillQueue();

    if (state.queue.length === 0) {
      finishGame("empty");
      return;
    }

    state.currentCard = state.queue.shift();
    renderGameCard();
  }

  function renderGameCard() {
    const card = state.currentCard;
    if (!card) return;
    const config = modeConfig(card.modeId);
    el.gameCard.style.setProperty("--mode-color", config.color);
    el.gameModeLabel.textContent = config.gameLabel;

    el.lyricsGameContent.classList.toggle("hidden", config.type !== "lyrics");
    el.mimeGameContent.classList.toggle("hidden", config.type !== "mime");
    el.wordsGameContent.classList.toggle("hidden", config.type !== "words");
    el.gameCard.classList.remove("forbidden-hidden");

    if (config.type === "lyrics") {
      el.promptText.textContent = card.prompt;
      el.answerText.textContent = card.answer;
      el.cardMetaPrimary.textContent = card.title;
      el.cardMetaSecondary.textContent = `${card.source} · ${DIFFICULTY_LABELS[card.difficulty]}`;
    } else if (config.type === "words") {
      el.wordPromptText.textContent = card.prompt;
      el.forbiddenWordsList.innerHTML = "";
      (card.forbiddenWords || []).forEach(word => {
        const chip = document.createElement("span");
        chip.className = "forbidden-word";
        chip.textContent = word;
        el.forbiddenWordsList.append(chip);
      });
      const showForbidden = state.settings.modeOptions.words.showForbiddenWords;
      el.gameCard.classList.toggle("forbidden-hidden", !showForbidden);
      el.cardMetaPrimary.textContent = getBoxName(card.modeId, card.boxId);
      el.cardMetaSecondary.textContent = DIFFICULTY_LABELS[card.difficulty];
    } else {
      el.mimePromptText.textContent = card.prompt;
      el.cardMetaPrimary.textContent = getBoxName(card.modeId, card.boxId);
      el.cardMetaSecondary.textContent = DIFFICULTY_LABELS[card.difficulty];
    }

    resetCardPosition();
    requestAnimationFrame(fitCardContent);
  }

  function fitCardContent() {
    el.gameCard.classList.remove("card-medium", "card-compact", "card-tiny");
    const card = state.currentCard;
    if (!card) return;
    const config = modeConfig(card.modeId);
    let length = card.prompt.length;
    if (config.type === "lyrics") length += card.answer.length;
    if (config.type === "words" && state.settings.modeOptions.words.showForbiddenWords) {
      length += (card.forbiddenWords || []).join(" ").length * 0.55;
    }

    if (length > 58) el.gameCard.classList.add("card-medium");
    if (length > 88) {
      el.gameCard.classList.remove("card-medium");
      el.gameCard.classList.add("card-compact");
    }
    if (length > 125) {
      el.gameCard.classList.remove("card-medium", "card-compact");
      el.gameCard.classList.add("card-tiny");
    }
    requestAnimationFrame(() => {
      if (el.gameCard.scrollHeight > el.gameCard.clientHeight + 2) {
        el.gameCard.classList.remove("card-medium", "card-compact");
        el.gameCard.classList.add("card-tiny");
      }
    });
  }

  function getSwipeThreshold() {
    return Math.min(105, Math.max(60, window.innerWidth * 0.12));
  }

  function resetCardPosition() {
    el.gameCard.classList.remove(
      "animating",
      "swiping-valid",
      "swiping-pass"
    );
    el.gameCard.style.removeProperty("--swipe-tint");
    el.gameCard.style.transform = "";
    el.gameCard.style.opacity = "1";
  }

  function vibrateForResult(result, force = false) {
    if (!("vibrate" in navigator)) return;
    if (!force && !state.settings.vibrationEnabled) return;

    try {
      navigator.vibrate(0);

      if (result === "valid") {
        navigator.vibrate([45,45,45,45,45]);
      } else {
        navigator.vibrate(425);
      }
    } catch (error) {
      recordError(error);
    }
  }

  function getRequestedSeconds() {
    const custom = Number.parseInt(el.customSeconds.value, 10);
    if (Number.isFinite(custom)) {
      return Math.min(600, Math.max(10, custom));
    }
    return state.selectedSeconds;
  }

  function updateDurationSelection(seconds) {
    state.selectedSeconds = seconds;

    el.durationButtons.forEach(button => {
      button.classList.toggle(
        "selected",
        Number(button.dataset.seconds) === seconds
      );
    });

    el.customSeconds.value = "";
  }

  async function requestGameDisplay() {
    try {
      if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen({
          navigationUI: "hide"
        });
      }
    } catch (_) {}

    try {
      if (screen.orientation?.lock) {
        await screen.orientation.lock("landscape");
      }
    } catch (_) {}

    await requestWakeLock();
  }

  async function requestWakeLock() {
    try {
      if ("wakeLock" in navigator && document.visibilityState === "visible") {
        state.wakeLock = await navigator.wakeLock.request("screen");
      }
    } catch (error) {
      recordError(error);
    }
  }

  async function releaseWakeLock() {
    try {
      if (state.wakeLock) await state.wakeLock.release();
    } catch (_) {
    } finally {
      state.wakeLock = null;
    }
  }

  async function startFlow() {
    if (getPlayableCards().length === 0) {
      alert("Sélectionne au moins un mode contenant une boîte et une carte active.");
      return;
    }

    const drawSelected = state.settings.selectedModeIds.includes("draw");
    if (drawSelected && state.settings.selectedModeIds.length > 1) {
      alert("Pour cette version, Dessine-moi ça ! se joue seul. Désactive les autres modes ou sélectionne une autre tuile.");
      return;
    }
    if (drawSelected) {
      await startDrawingRound();
      return;
    }

    state.durationMs = getRequestedSeconds() * 1000;
    state.remainingMs = state.durationMs;
    await requestGameDisplay();
    runCountdown();
  }

  function runCountdown() {
    clearInterval(state.countdownTimer);
    showScreen(el.countdownScreen);

    let value = 3;
    el.countdownValue.textContent = value;

    state.countdownTimer = window.setInterval(() => {
      value -= 1;

      if (value > 0) {
        el.countdownValue.textContent = value;
        el.countdownValue.style.animation = "none";
        void el.countdownValue.offsetWidth;
        el.countdownValue.style.animation = "";
      } else {
        clearInterval(state.countdownTimer);
        beginGame();
      }
    }, 900);
  }

  function beginGame() {
    state.running = true;
    state.paused = false;
    state.queue = [];
    state.currentCard = null;
    state.history = [];
    state.valid = 0;
    state.passed = 0;
    state.remainingMs = state.durationMs;

    updateScores();
    refillQueue();
    drawNextCard();
    showScreen(el.gameScreen);

    state.deadline = performance.now() + state.remainingMs;
    startTimerLoop();
  }

  function startTimerLoop() {
    cancelAnimationFrame(state.rafId);

    const tick = now => {
      if (!state.running || state.paused) return;

      state.remainingMs = Math.max(0, state.deadline - now);
      renderTime();

      if (state.remainingMs <= 0) {
        finishGame("time");
        return;
      }

      state.rafId = requestAnimationFrame(tick);
    };

    state.rafId = requestAnimationFrame(tick);
  }

  function renderTime() {
    el.timeDisplay.textContent =
      String(Math.ceil(state.remainingMs / 1000));
  }

  function updateScores() {
    el.validScore.textContent = String(state.valid);
    el.passScore.textContent = String(state.passed);
    el.undoButton.disabled = state.history.length === 0;
  }

  function togglePause(forcePause) {
    if (!state.running) return;

    const shouldPause =
      typeof forcePause === "boolean"
        ? forcePause
        : !state.paused;

    if (shouldPause === state.paused) return;

    if (shouldPause) {
      state.remainingMs =
        Math.max(0, state.deadline - performance.now());
      state.paused = true;
      cancelAnimationFrame(state.rafId);
      el.pauseOverlay.classList.remove("hidden");
      el.pauseButton.textContent = "▶ Reprendre";
    } else {
      state.paused = false;
      state.deadline = performance.now() + state.remainingMs;
      el.pauseOverlay.classList.add("hidden");
      el.pauseButton.textContent = "Ⅱ Pause";
      startTimerLoop();
      requestWakeLock();
    }
  }

  function commitSwipe(result) {
    if (!state.running || state.paused || !state.currentCard) return;

    const judgedCard = state.currentCard;
    state.history.push({ card: judgedCard, result });

    if (result === "valid") state.valid += 1;
    else state.passed += 1;

    updateScores();
    vibrateForResult(result);

    el.gameCard.classList.remove("swiping-valid", "swiping-pass");
    el.gameCard.classList.add(
      result === "valid" ? "swiping-valid" : "swiping-pass"
    );
    el.gameCard.style.setProperty("--swipe-tint", "0.58");

    const direction = result === "valid" ? 1 : -1;
    const displayDirection = state.flipped ? -direction : direction;

    el.gameCard.classList.add("animating");
    el.gameCard.style.transform =
      `translateX(${displayDirection * window.innerWidth * 1.15}px) ` +
      `rotate(${displayDirection * 10}deg)`;
    el.gameCard.style.opacity = "0";

    window.setTimeout(() => {
      if (!state.running) return;
      drawNextCard();
    }, SWIPE_ANIMATION_MS);
  }

  function undoLast() {
    if (
      !state.running ||
      state.paused ||
      state.history.length === 0
    ) return;

    const last = state.history.pop();

    if (last.result === "valid") {
      state.valid = Math.max(0, state.valid - 1);
    } else {
      state.passed = Math.max(0, state.passed - 1);
    }

    if (state.currentCard) state.queue.unshift(state.currentCard);
    state.currentCard = last.card;

    updateScores();
    renderGameCard();
  }

  function finishGame(reason = "manual") {
    if (!state.running) return;

    state.running = false;
    state.paused = false;
    cancelAnimationFrame(state.rafId);
    clearInterval(state.countdownTimer);
    el.pauseOverlay.classList.add("hidden");
    el.pauseButton.textContent = "Ⅱ Pause";

    renderResults(reason);
    showScreen(el.resultsScreen);
    releaseWakeLock();
  }

  function renderResults(reason) {
    resetResultLabels();
    el.resultValid.textContent = String(state.valid);
    el.resultPassed.textContent = String(state.passed);
    el.resultTotal.textContent = String(state.history.length);
    el.resultDetails.innerHTML = "";

    if (state.history.length === 0) {
      const empty = document.createElement("p");
      empty.style.padding = "18px";
      empty.style.margin = "0";
      empty.style.color = "var(--muted)";
      empty.textContent =
        reason === "time"
          ? "Le temps est écoulé avant la première réponse."
          : "Aucune carte jouée.";

      el.resultDetails.append(empty);
      return;
    }

    state.history.forEach(entry => {
      const card = entry.card;
      const config = modeConfig(card.modeId);

      const row = document.createElement("div");
      row.className =
        `result-row ${entry.result === "valid" ? "valid" : "passed"}`;

      const status = document.createElement("span");
      status.className = "status";
      status.textContent =
        entry.result === "valid" ? "✓" : "✕";

      const details = document.createElement("div");
      details.className = "details";

      const title = document.createElement("strong");
      const source = document.createElement("small");

      if (config.type === "lyrics") {
        title.textContent = card.title;
        source.textContent = `${config.name} · ${card.source}`;
      } else {
        title.textContent = card.prompt;
        source.textContent =
          `${config.name} · ` +
          `${getBoxName(card.modeId, card.boxId)} · ` +
          `${DIFFICULTY_LABELS[card.difficulty]}`;
      }

      details.append(title, source);

      const word = document.createElement("span");
      word.className = "result-word";
      word.textContent =
        entry.result === "valid" ? "VALIDÉE" : "PASSÉE";

      row.append(status, details, word);
      el.resultDetails.append(row);
    });
  }

  function goHome() {
    if (state.drawRound) cancelAnimationFrame(state.drawRound.timerRaf || 0);
    state.drawRound = null;
    state.running = false;
    state.paused = false;
    cancelAnimationFrame(state.rafId);
    clearInterval(state.countdownTimer);
    releaseWakeLock();
    renderHomeData();
    showScreen(el.homeScreen);
  }

  function syncSwipeGuides() {
    setGuide(
      el.leftSwipeGuide,
      state.flipped ? "valid" : "pass"
    );

    setGuide(
      el.rightSwipeGuide,
      state.flipped ? "pass" : "valid"
    );
  }

  function setGuide(guide, result) {
    guide.dataset.result = result;
    guide.classList.toggle("guide-valid", result === "valid");
    guide.classList.toggle("guide-pass", result === "pass");
    guide.querySelector(".guide-word").textContent =
      result === "valid" ? "VALIDÉE" : "PASSÉE";
  }

  function setFlipped(value) {
    state.flipped = value;
    el.app.classList.toggle("flipped", value);
    localStorage.setItem("mdb-flipped", value ? "1" : "0");
    syncSwipeGuides();
  }

  function toggleFlipped() {
    setFlipped(!state.flipped);
  }

  function onPointerDown(event) {
    if (!state.running || state.paused || event.button !== 0) return;
    if (event.target.closest("button")) return;

    state.pointer = {
      id: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      currentX: event.clientX,
      currentY: event.clientY
    };

    el.gameCard.setPointerCapture?.(event.pointerId);
    el.gameCard.classList.remove("animating");
  }

  function onPointerMove(event) {
    if (
      !state.pointer ||
      event.pointerId !== state.pointer.id ||
      !state.running ||
      state.paused
    ) return;

    const rawDx = event.clientX - state.pointer.startX;
    const dy = event.clientY - state.pointer.startY;

    state.pointer.currentX = event.clientX;
    state.pointer.currentY = event.clientY;

    const horizontalEnough =
      Math.abs(rawDx) >= Math.abs(dy) * 0.65;

    if (!horizontalEnough && Math.abs(dy) > 28) {
      resetCardPosition();
      return;
    }

    const displayDx = state.flipped ? -rawDx : rawDx;
    const threshold = getSwipeThreshold();
    const progress = Math.min(1, Math.abs(rawDx) / threshold);

    el.gameCard.style.transform =
      `translateX(${displayDx}px) rotate(${displayDx / 45}deg)`;
    el.gameCard.style.opacity =
      String(1 - progress * 0.18);

    el.gameCard.classList.remove(
      "swiping-valid",
      "swiping-pass"
    );

    el.gameCard.style.setProperty(
      "--swipe-tint",
      String(0.07 + progress * 0.43)
    );

    if (rawDx > 0) {
      el.gameCard.classList.add("swiping-valid");
    } else if (rawDx < 0) {
      el.gameCard.classList.add("swiping-pass");
    }
  }

  function onPointerEnd(event) {
    if (
      !state.pointer ||
      event.pointerId !== state.pointer.id
    ) return;

    const rawDx =
      state.pointer.currentX - state.pointer.startX;
    const dy =
      state.pointer.currentY - state.pointer.startY;
    const threshold = getSwipeThreshold();
    const horizontalEnough =
      Math.abs(rawDx) >= Math.abs(dy) * 0.65;

    state.pointer = null;

    if (!state.running || state.paused) {
      resetCardPosition();
      return;
    }

    if (horizontalEnough && rawDx >= threshold) {
      commitSwipe("valid");
    } else if (horizontalEnough && rawDx <= -threshold) {
      commitSwipe("pass");
    } else {
      resetCardPosition();
    }
  }

  function recordError(error) {
    state.lastError =
      error instanceof Error
        ? `${error.name}: ${error.message}`
        : String(error);
  }

  async function serviceWorkerStatus() {
    if (!("serviceWorker" in navigator)) {
      return "Non pris en charge";
    }

    try {
      const registration =
        await navigator.serviceWorker.getRegistration();

      if (!registration) return "Non enregistré";
      if (registration.active) return "Actif";
      if (registration.waiting) return "En attente";
      if (registration.installing) return "Installation";
      return "Enregistré";
    } catch (error) {
      recordError(error);
      return "Erreur";
    }
  }

  async function buildDiagnostic() {
    const standalone = window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
    const modeLines = MODE_ORDER.flatMap(modeId => {
      const config = modeConfig(modeId);
      const mode = modeState(modeId);
      return [
        `${config.name} — cartes : ${mode.cards.length}`,
        `${config.name} — boîtes : ${mode.boxes.length}`,
        `${config.name} — difficultés : ${mode.selectedDifficultyIds.join(", ")}`,
        `${config.name} — bibliothèque installée : ${mode.libraryMeta.installedVersion}`,
        `${config.name} — bibliothèque disponible : ${mode.libraryMeta.availableVersion}`
      ];
    });

    return [
      "Application : Mais devine, bordel !",
      `Version : ${APP_VERSION}`,
      `Date : ${new Date().toISOString()}`,
      `Navigateur : ${navigator.userAgent}`,
      `En ligne : ${navigator.onLine ? "Oui" : "Non"}`,
      `Affichage autonome/installé : ${standalone ? "Oui" : "Non"}`,
      `Service worker : ${await serviceWorkerStatus()}`,
      `Orientation : ${screen.orientation?.type || "Inconnue"}`,
      `Fenêtre : ${window.innerWidth} × ${window.innerHeight}`,
      `Pointer Events : ${"PointerEvent" in window ? "Oui" : "Non"}`,
      `Vibrations : ${"vibrate" in navigator ? "Prises en charge" : "Non prises en charge"}`,
      `Vibrations activées : ${state.settings.vibrationEnabled ? "Oui" : "Non"}`,
      `Wake Lock : ${"wakeLock" in navigator ? "Pris en charge" : "Non pris en charge"}`,
      `Plein écran : ${document.fullscreenEnabled ? "Pris en charge" : "Non pris en charge"}`,
      `Mots interdits affichés : ${state.settings.modeOptions.words.showForbiddenWords ? "Oui" : "Non"}`,
      ...modeLines,
      `Cartes jouables : ${getPlayableCards().length}`,
      `Seuil du swipe : ${Math.round(getSwipeThreshold())} px`,
      `Affichage retourné : ${state.flipped ? "Oui" : "Non"}`,
      `Dernière erreur : ${state.lastError}`
    ].join("\n");
  }

  async function openDiagnostic() {
    el.diagnosticOutput.textContent =
      await buildDiagnostic();

    if (typeof el.diagnosticDialog.showModal === "function") {
      el.diagnosticDialog.showModal();
    } else {
      alert(el.diagnosticOutput.textContent);
    }
  }

  async function copyDiagnostic() {
    const text = el.diagnosticOutput.textContent;

    try {
      await navigator.clipboard.writeText(text);
      el.copyDiagnosticButton.textContent = "Copié !";

      setTimeout(() => {
        el.copyDiagnosticButton.textContent =
          "Copier le diagnostic";
      }, 1200);
    } catch (error) {
      recordError(error);

      const range = document.createRange();
      range.selectNodeContents(el.diagnosticOutput);

      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }

  async function registerServiceWorker() {
    if (!("serviceWorker" in navigator)) return;

    try {
      await navigator.serviceWorker.register(
        "./sw.js",
        { scope: "./" }
      );
    } catch (error) {
      recordError(error);
    }
  }

  function bindEvents() {
    el.durationButtons.forEach(button => {
      button.addEventListener("click", () => updateDurationSelection(Number(button.dataset.seconds)));
    });
    el.customSeconds.addEventListener("input", () => {
      if (el.customSeconds.value !== "") el.durationButtons.forEach(button => button.classList.remove("selected"));
    });

    el.startButton.addEventListener("click", startFlow);
    el.manageCardsButton.addEventListener("click", openManageScreen);
    el.manageBackButton.addEventListener("click", closeManageScreen);
    el.selectAllButton.addEventListener("click", selectEverything);
    el.selectNoneButton.addEventListener("click", selectNothing);

    el.modeEnabledInput.addEventListener("change", () => {
      const modeId = state.activeModeDialogId;
      if (!modeId) return;
      setModeEnabled(modeId, el.modeEnabledInput.checked);
      updateModeDialogCount();
      renderModeSelection();
    });
    el.closeModeDialogButton.addEventListener("click", closeModeConfig);
    el.doneModeDialogButton.addEventListener("click", closeModeConfig);
    el.modeSelectAllBoxesButton.addEventListener("click", () => {
      const modeId = state.activeModeDialogId;
      if (!modeId) return;
      const mode = modeState(modeId);
      mode.selectedBoxIds = mode.boxes.map(box => box.id);
      saveMode(modeId);
      renderModeConfigDialog();
      renderModeSelection();
    });
    el.modeSelectNoBoxesButton.addEventListener("click", () => {
      const modeId = state.activeModeDialogId;
      if (!modeId) return;
      modeState(modeId).selectedBoxIds = [];
      saveMode(modeId);
      renderModeConfigDialog();
      renderModeSelection();
    });
    el.showForbiddenWordsInput.addEventListener("change", () => {
      state.settings.modeOptions.words.showForbiddenWords = el.showForbiddenWordsInput.checked;
      saveGlobalSettings();
    });
    const saveDrawOptions = () => {
      const options = state.settings.modeOptions.draw;
      options.attemptCount = Number(el.drawAttemptCountInput.value) || 3;
      options.durations.easy = Math.min(120, Math.max(10, Number(el.drawEasySecondsInput.value) || 30));
      options.durations.medium = Math.min(120, Math.max(10, Number(el.drawMediumSecondsInput.value) || 45));
      options.durations.hard = Math.min(180, Math.max(10, Number(el.drawHardSecondsInput.value) || 60));
      options.soundEnabled = el.drawSoundEnabledInput.checked;
      saveGlobalSettings();
    };
    [el.drawAttemptCountInput, el.drawEasySecondsInput, el.drawMediumSecondsInput, el.drawHardSecondsInput, el.drawSoundEnabledInput]
      .forEach(input => input.addEventListener("change", saveDrawOptions));

    el.vibrationToggle.addEventListener("change", () => {
      state.settings.vibrationEnabled = el.vibrationToggle.checked;
      saveGlobalSettings();
    });
    el.testValidVibrationButton.addEventListener("click", () => vibrateForResult("valid", true));
    el.testPassVibrationButton.addEventListener("click", () => vibrateForResult("pass", true));

    el.checkLibrariesButton.addEventListener("click", checkLibraries);
    el.updateLibrariesButton.addEventListener("click", updateLibraries);
    el.exportBackupButton.addEventListener("click", exportBackup);
    el.restoreBackupButton.addEventListener("click", () => el.restoreBackupInput.click());
    el.restoreBackupInput.addEventListener("change", restoreBackupFile);
    el.resetLibrariesButton.addEventListener("click", resetLibraries);
    el.diagnosticButton.addEventListener("click", openDiagnostic);

    el.cardSearchInput.addEventListener("input", renderCardList);
    el.manageBoxFilter.addEventListener("change", renderCardList);
    el.addCardButton.addEventListener("click", () => openCardEditor(state.activeManageModeId));
    el.manageBoxesButton.addEventListener("click", openBoxesManager);

    el.cardForm.addEventListener("submit", saveCard);
    el.closeCardDialogButton.addEventListener("click", closeCardEditor);
    el.cancelCardButton.addEventListener("click", closeCardEditor);
    el.closeBoxesDialogButton.addEventListener("click", closeBoxesManager);
    el.doneBoxesButton.addEventListener("click", closeBoxesManager);
    el.addBoxButton.addEventListener("click", addBox);
    el.newBoxNameInput.addEventListener("keydown", event => {
      if (event.key === "Enter") {
        event.preventDefault();
        addBox();
      }
    });

    el.flipHomeButton.addEventListener("click", toggleFlipped);
    el.flipGameButton.addEventListener("click", toggleFlipped);
    el.undoButton.addEventListener("click", undoLast);
    el.pauseButton.addEventListener("click", () => togglePause());
    el.resumeOverlayButton.addEventListener("click", () => togglePause(false));
    el.endButton.addEventListener("click", () => finishGame("manual"));
    el.replayButton.addEventListener("click", startFlow);
    el.homeButton.addEventListener("click", goHome);
    el.copyDiagnosticButton.addEventListener("click", copyDiagnostic);

    el.drawSkipRevealButton.addEventListener("click", skipDrawingBeforeStart);
    el.drawOnPhoneButton.addEventListener("click", () => startDrawingPlay("phone"));
    el.drawOnPaperButton.addEventListener("click", () => startDrawingPlay("paper"));
    el.drawFoundButton.addEventListener("click", () => recordDrawingResult("valid"));
    el.drawPassButton.addEventListener("click", () => recordDrawingResult("passed"));
    el.drawColorChoices.querySelectorAll(".draw-color").forEach(button => button.addEventListener("click", () => chooseDrawColor(button.dataset.color)));
    el.drawBrushSize.addEventListener("input", () => { if (state.drawRound) state.drawRound.size = Number(el.drawBrushSize.value); });
    el.drawEraserButton.addEventListener("click", toggleDrawEraser);
    el.drawUndoButton.addEventListener("click", undoDrawingStroke);
    el.drawClearButton.addEventListener("click", clearDrawingCanvas);
    el.drawingCanvas.addEventListener("pointerdown", onDrawPointerDown);
    el.drawingCanvas.addEventListener("pointermove", onDrawPointerMove);
    el.drawingCanvas.addEventListener("pointerup", onDrawPointerEnd);
    el.drawingCanvas.addEventListener("pointercancel", onDrawPointerEnd);
    window.addEventListener("resize", () => { if (state.drawRound?.support === "phone") resizeDrawingCanvas(false); });

    el.gameCard.addEventListener("pointerdown", onPointerDown);
    el.gameCard.addEventListener("pointermove", onPointerMove);
    el.gameCard.addEventListener("pointerup", onPointerEnd);
    el.gameCard.addEventListener("pointercancel", onPointerEnd);

    window.addEventListener("beforeinstallprompt", event => {
      event.preventDefault();
      state.installPrompt = event;
      el.installButton.classList.remove("hidden");
    });
    el.installButton.addEventListener("click", async () => {
      if (!state.installPrompt) return;
      state.installPrompt.prompt();
      await state.installPrompt.userChoice;
      state.installPrompt = null;
      el.installButton.classList.add("hidden");
    });
    window.addEventListener("appinstalled", () => el.installButton.classList.add("hidden"));

    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden" && state.running && !state.paused) togglePause(true);
      else if (document.visibilityState === "visible" && state.running) requestWakeLock();
    });
    window.addEventListener("error", event => recordError(event.error || event.message));
    window.addEventListener("unhandledrejection", event => recordError(event.reason));
    window.addEventListener("keydown", event => {
      if (!state.running || state.paused) return;
      if (event.key === "ArrowRight") commitSwipe("valid");
      if (event.key === "ArrowLeft") commitSwipe("pass");
      if (event.key === "Backspace") { event.preventDefault(); undoLast(); }
      if (event.key === " ") { event.preventDefault(); togglePause(); }
    });
  }

  async function init() {
    await loadContent();
    setFlipped(state.flipped);
    bindEvents();
    updateDrawToolButton();
    renderHomeData();
    renderManageScreen();
    renderTime();
    registerServiceWorker();
  }

  init().catch(error => {
    recordError(error);
    alert(
      "L’application n’a pas pu charger ses données. " +
      "Recharge la page ou ouvre le diagnostic."
    );
  });
})();
