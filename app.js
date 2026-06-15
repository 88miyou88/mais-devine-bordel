(() => {
  "use strict";

  const APP_VERSION = "0.2.0";
  const SWIPE_ANIMATION_MS = 180;
  const UNCATEGORIZED_ID = "uncategorized";

  const MODE_CONFIG = {
    lyrics: {
      id: "lyrics",
      name: "Deviner les paroles",
      gameLabel: "DEVINER LES PAROLES",
      description: "Chanter le début et retrouver la suite",
      color: "#b981ff",
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
      description: "Faire deviner la consigne uniquement par gestes",
      color: "#ffad45",
      libraryUrl: "./mimes.json",
      type: "mime",
      storage: {
        boxes: "mdb-mime-boxes-v1",
        cards: "mdb-mime-cards-v1",
        meta: "mdb-mime-library-meta-v1",
        selection: "mdb-mime-selection-v1"
      }
    }
  };

  const MODE_ORDER = ["lyrics", "mime"];
  const GLOBAL_SETTINGS_KEY = "mdb-global-settings-v2";
  const LEGACY_SETTINGS_KEY = "mdb-settings-v1";
  const FALLBACK_LIBRARIES = {"lyrics":{"schemaVersion":1,"libraryVersion":"2026.06.15-2","updatedAt":"2026-06-15","modeId":"lyrics","modeName":"Deviner les paroles","boxes":[{"id":"disney","name":"Disney"},{"id":"comptines","name":"Comptines et chansons traditionnelles"},{"id":"comedies-musicales","name":"Comédies musicales"},{"id":"variete-francaise","name":"Variété française"},{"id":"tubes-soiree","name":"Tubes rétro et de soirée"},{"id":"pop-rap-francais","name":"Pop et rap français"},{"id":"rock-francais","name":"Rock français"},{"id":"anglais","name":"Anglais — difficulté"},{"id":"uncategorized","name":"Sans catégorie","protected":true}],"cards":[{"id":"lyrics-001","boxId":"disney","active":true,"prompt":"Libérée, délivrée","answer":"Je ne mentirai plus jamais","title":"Libérée, délivrée","source":"La Reine des Neiges"},{"id":"lyrics-002","boxId":"variete-francaise","active":true,"prompt":"Terres brûlées au vent","answer":"Des landes de pierre","title":"Les Lacs du Connemara","source":"Michel Sardou"},{"id":"lyrics-003","boxId":"comptines","active":true,"prompt":"Frère Jacques, Frère Jacques","answer":"Dormez-vous ? Dormez-vous ?","title":"Frère Jacques","source":"Comptine"},{"id":"lyrics-004","boxId":"variete-francaise","active":true,"prompt":"Je te donne toutes mes différences","answer":"Tous ces défauts qui sont autant de chances","title":"Je te donne","source":"Jean-Jacques Goldman & Michael Jones"},{"id":"lyrics-013","boxId":"pop-rap-francais","active":true,"prompt":"Dites-moi d’où il vient","answer":"Enfin, je saurai où je vais","title":"Papaoutai","source":"Stromae"},{"id":"lyrics-005","boxId":"disney","active":true,"prompt":"Ce rêve bleu","answer":"Je n’y crois pas, c’est merveilleux","title":"Ce rêve bleu","source":"Aladdin"},{"id":"lyrics-006","boxId":"rock-francais","active":true,"prompt":"J’ai demandé à la lune","answer":"Et le soleil ne le sait pas","title":"J’ai demandé à la lune","source":"Indochine"},{"id":"lyrics-007","boxId":"comptines","active":true,"prompt":"Une souris verte","answer":"Qui courait dans l’herbe","title":"Une souris verte","source":"Comptine"},{"id":"lyrics-008","boxId":"variete-francaise","active":true,"prompt":"J’irai chercher ton cœur","answer":"Si tu l’emportes ailleurs","title":"Pour que tu m’aimes encore","source":"Céline Dion"},{"id":"lyrics-009","boxId":"disney","active":true,"prompt":"Hakuna Matata","answer":"Quelle phrase magnifique","title":"Hakuna Matata","source":"Le Roi Lion"},{"id":"lyrics-014","boxId":"variete-francaise","active":true,"prompt":"J’irai au bout de mes rêves","answer":"Où la raison s’achève","title":"Au bout de mes rêves","source":"Jean-Jacques Goldman"},{"id":"lyrics-015","boxId":"comptines","active":true,"prompt":"Au clair de la lune","answer":"Mon ami Pierrot","title":"Au clair de la lune","source":"Comptine"},{"id":"lyrics-016","boxId":"variete-francaise","active":true,"prompt":"Je vais t’aimer comme on ne t’a jamais aimée","answer":"Je vais t’aimer","title":"Je vais t’aimer","source":"Michel Sardou"},{"id":"lyrics-017","boxId":"comedies-musicales","active":true,"prompt":"Il est venu le temps des cathédrales","answer":"Le monde est entré dans un nouveau millénaire","title":"Le Temps des cathédrales","source":"Notre-Dame de Paris"},{"id":"lyrics-018","boxId":"tubes-soiree","active":true,"prompt":"Voyage, voyage","answer":"Plus loin que la nuit et le jour","title":"Voyage, voyage","source":"Desireless"},{"id":"lyrics-010","boxId":"comedies-musicales","active":true,"prompt":"Je voue mes nuits à l’assasymphonie","answer":"Aux requiems anatomiques","title":"L’Assasymphonie","source":"Mozart, l’Opéra Rock"},{"id":"lyrics-012","boxId":"variete-francaise","active":true,"prompt":"Aux Champs-Élysées, aux Champs-Élysées","answer":"Au soleil, sous la pluie","title":"Les Champs-Élysées","source":"Joe Dassin"},{"id":"lyrics-019","boxId":"disney","active":true,"prompt":"Il en faut peu pour être heureux","answer":"Vraiment très peu pour être heureux","title":"Il en faut peu pour être heureux","source":"Le Livre de la Jungle"},{"id":"lyrics-011","boxId":"comedies-musicales","active":true,"prompt":"Tatoue-moi sur ta peau","answer":"À l’encre de tes mots","title":"Tatoue-moi","source":"Mozart, l’Opéra Rock"},{"id":"lyrics-020","boxId":"tubes-soiree","active":true,"prompt":"Résiste, prouve que tu existes","answer":"Cherche ton bonheur partout, va","title":"Résiste","source":"France Gall"},{"id":"lyrics-021","boxId":"comptines","active":true,"prompt":"Promenons-nous dans les bois","answer":"Pendant que le loup n’y est pas","title":"Promenons-nous dans les bois","source":"Comptine"},{"id":"lyrics-022","boxId":"tubes-soiree","active":true,"prompt":"Ne la laisse pas tomber","answer":"Elle est si fragile","title":"Femme libérée","source":"Cookie Dingler"},{"id":"lyrics-023","boxId":"variete-francaise","active":true,"prompt":"Je suis malade","answer":"Complètement malade","title":"Je suis malade","source":"Serge Lama"},{"id":"lyrics-024","boxId":"variete-francaise","active":true,"prompt":"J’irai où tu iras","answer":"Mon pays sera toi","title":"J’irai où tu iras","source":"Céline Dion & Jean-Jacques Goldman"},{"id":"lyrics-025","boxId":"comptines","active":true,"prompt":"Savez-vous planter les choux","answer":"À la mode, à la mode","title":"Savez-vous planter les choux","source":"Comptine"},{"id":"lyrics-026","boxId":"variete-francaise","active":true,"prompt":"Quand la musique est bonne","answer":"Quand la musique donne","title":"Quand la musique est bonne","source":"Jean-Jacques Goldman"},{"id":"lyrics-027","boxId":"pop-rap-francais","active":true,"prompt":"Jeune demoiselle recherche un mec mortel","answer":"Un mec qui pourrait me donner des ailes","title":"Jeune demoiselle","source":"Diam’s"},{"id":"lyrics-028","boxId":"pop-rap-francais","active":true,"prompt":"Dans la vallée, oh oh","answer":"De Dana, la li la la","title":"La Tribu de Dana","source":"Manau"},{"id":"lyrics-029","boxId":"comptines","active":true,"prompt":"Sur le pont d’Avignon","answer":"On y danse, on y danse","title":"Sur le pont d’Avignon","source":"Comptine"},{"id":"lyrics-030","boxId":"comedies-musicales","active":true,"prompt":"Je fais de toi mon essentiel","answer":"Tu me fais naître parmi les hommes","title":"Mon essentiel","source":"Emmanuel Moire / Le Roi Soleil"},{"id":"lyrics-031","boxId":"pop-rap-francais","active":true,"prompt":"Elle répondait au nom de Bella","answer":"Les gens du coin ne voulaient pas la lâcher","title":"Bella","source":"Gims"},{"id":"lyrics-032","boxId":"rock-francais","active":true,"prompt":"Le vent l’emportera","answer":"Tout disparaîtra","title":"Le vent nous portera","source":"Noir Désir"},{"id":"lyrics-033","boxId":"comptines","active":true,"prompt":"Meunier, tu dors","answer":"Ton moulin va trop vite","title":"Meunier, tu dors","source":"Comptine"},{"id":"lyrics-034","boxId":"variete-francaise","active":true,"prompt":"Et j’ai crié, crié, Aline","answer":"Pour qu’elle revienne","title":"Aline","source":"Christophe"},{"id":"lyrics-035","boxId":"comedies-musicales","active":true,"prompt":"Vivre à en crever","answer":"Pour décrocher les étoiles","title":"Vivre à en crever","source":"Mozart, l’Opéra Rock"},{"id":"lyrics-036","boxId":"disney","active":true,"prompt":"Tout le monde veut devenir un cat","answer":"Parce qu’un chat quand il est cat","title":"Tout le monde veut devenir un cat","source":"Les Aristochats"},{"id":"lyrics-037","boxId":"pop-rap-francais","active":true,"prompt":"J’en ai marre de ceux qui pleurent","answer":"Qui ne roulent qu’à deux à l’heure","title":"J’en ai marre !","source":"Alizée"},{"id":"lyrics-038","boxId":"rock-francais","active":true,"prompt":"Égaré dans la vallée infernale","answer":"Le héros s’appelle Bob Morane","title":"L’Aventurier","source":"Indochine"},{"id":"lyrics-039","boxId":"comptines","active":true,"prompt":"Ainsi font, font, font","answer":"Les petites marionnettes","title":"Ainsi font, font, font","source":"Comptine"},{"id":"lyrics-040","boxId":"pop-rap-francais","active":true,"prompt":"Je remue le ciel, le jour, la nuit","answer":"Je danse avec le vent, la pluie","title":"Dernière danse","source":"Indila"},{"id":"lyrics-041","boxId":"variete-francaise","active":true,"prompt":"Non, je ne regrette rien","answer":"Ni le bien qu’on m’a fait","title":"Non, je ne regrette rien","source":"Édith Piaf"},{"id":"lyrics-042","boxId":"comptines","active":true,"prompt":"Il était un petit navire","answer":"Qui n’avait jamais navigué","title":"Il était un petit navire","source":"Comptine"},{"id":"lyrics-043","boxId":"pop-rap-francais","active":true,"prompt":"Toi plus moi, plus eux","answer":"Plus tous ceux qui le veulent","title":"Toi + Moi","source":"Grégoire"},{"id":"lyrics-044","boxId":"tubes-soiree","active":true,"prompt":"Alexandrie, Alexandra","answer":"Alexandrie où l’amour danse avec la nuit","title":"Alexandrie Alexandra","source":"Claude François"},{"id":"lyrics-045","boxId":"pop-rap-francais","active":true,"prompt":"On écrit sur les murs","answer":"Le nom de ceux qu’on aime","title":"On écrit sur les murs","source":"Demis Roussos / Kids United"},{"id":"lyrics-046","boxId":"variete-francaise","active":true,"prompt":"Deux étrangers au bout du monde","answer":"Si différents","title":"Manhattan-Kaboul","source":"Renaud & Axelle Red"},{"id":"lyrics-047","boxId":"comptines","active":true,"prompt":"Il était un petit homme","answer":"Pirouette, cacahuète","title":"Pirouette Cacahuète","source":"Comptine"},{"id":"lyrics-048","boxId":"variete-francaise","active":true,"prompt":"Pour un flirt avec toi","answer":"Je ferais n’importe quoi","title":"Pour un flirt","source":"Michel Delpech"},{"id":"lyrics-049","boxId":"variete-francaise","active":true,"prompt":"Envole-moi, envole-moi","answer":"Loin de cette fatalité","title":"Envole-moi","source":"Jean-Jacques Goldman"},{"id":"lyrics-050","boxId":"comptines","active":true,"prompt":"Une poule sur un mur","answer":"Qui picote du pain dur","title":"Une poule sur un mur","source":"Comptine"},{"id":"lyrics-051","boxId":"comedies-musicales","active":true,"prompt":"Belle","answer":"C’est un mot qu’on dirait inventé pour elle","title":"Belle","source":"Notre-Dame de Paris"},{"id":"lyrics-052","boxId":"variete-francaise","active":true,"prompt":"Là-bas, tout est neuf et tout est sauvage","answer":"Libre continent sans grillage","title":"Là-bas","source":"Jean-Jacques Goldman & Sirima"},{"id":"lyrics-053","boxId":"tubes-soiree","active":true,"prompt":"Les démons de minuit","answer":"M’entraînent jusqu’à l’insomnie","title":"Les Démons de minuit","source":"Images"},{"id":"lyrics-054","boxId":"pop-rap-francais","active":true,"prompt":"Est-ce que tu m’aimes ?","answer":"J’sais pas si je t’aime","title":"Est-ce que tu m’aimes ?","source":"Gims"},{"id":"lyrics-055","boxId":"comptines","active":true,"prompt":"Alouette, gentille alouette","answer":"Alouette, je te plumerai","title":"Alouette","source":"Comptine"},{"id":"lyrics-056","boxId":"tubes-soiree","active":true,"prompt":"Et dans ces soirées-là","answer":"On drague, on branche","title":"Ces soirées-là","source":"Yannick"},{"id":"lyrics-057","boxId":"variete-francaise","active":true,"prompt":"Mes chers parents, je pars","answer":"Je vous aime, mais je pars","title":"Je vole","source":"Michel Sardou"},{"id":"lyrics-058","boxId":"variete-francaise","active":true,"prompt":"La bohème, la bohème","answer":"Ça voulait dire on est heureux","title":"La Bohème","source":"Charles Aznavour"},{"id":"lyrics-059","boxId":"comptines","active":true,"prompt":"À la pêche aux moules","answer":"Je ne veux plus y aller, maman","title":"À la pêche aux moules","source":"Comptine"},{"id":"lyrics-060","boxId":"tubes-soiree","active":true,"prompt":"Le lundi au soleil","answer":"C’est une chose qu’on n’aura jamais","title":"Le lundi au soleil","source":"Claude François"},{"id":"lyrics-061","boxId":"rock-francais","active":true,"prompt":"Un autre monde","answer":"Où la Terre serait ronde","title":"Un autre monde","source":"Téléphone"},{"id":"lyrics-062","boxId":"rock-francais","active":true,"prompt":"À la faveur de l’automne","answer":"Revient cette douce mélancolie","title":"À la faveur de l’automne","source":"Tété"},{"id":"lyrics-063","boxId":"variete-francaise","active":true,"prompt":"Il suffira d’une étincelle","answer":"D’un rien, d’un geste","title":"Allumer le feu","source":"Johnny Hallyday"},{"id":"lyrics-064","boxId":"pop-rap-francais","active":true,"prompt":"Je veux","answer":"D’l’amour, d’la joie, de la bonne humeur","title":"Je veux","source":"Zaz"},{"id":"lyrics-065","boxId":"comptines","active":true,"prompt":"Dansons la capucine","answer":"Y a pas de pain chez nous","title":"Dansons la capucine","source":"Comptine"},{"id":"lyrics-066","boxId":"pop-rap-francais","active":true,"prompt":"Tu étais formidable","answer":"J’étais fort minable","title":"Formidable","source":"Stromae"},{"id":"lyrics-067","boxId":"tubes-soiree","active":true,"prompt":"On va s’aimer","answer":"Sur une étoile ou sur un oreiller","title":"On va s’aimer","source":"Gilbert Montagné"},{"id":"lyrics-068","boxId":"tubes-soiree","active":true,"prompt":"Sous les sunlights des tropiques","answer":"L’amour se raconte en musique","title":"Les Sunlights des tropiques","source":"Gilbert Montagné"},{"id":"lyrics-069","boxId":"rock-francais","active":true,"prompt":"Cendrillon, pour ses vingt ans","answer":"Est la plus jolie des enfants","title":"Cendrillon","source":"Téléphone"},{"id":"lyrics-070","boxId":"tubes-soiree","active":true,"prompt":"J’ai encore rêvé d’elle","answer":"C’est bête, elle n’a rien fait pour ça","title":"J’ai encore rêvé d’elle","source":"Il était une fois"},{"id":"lyrics-071","boxId":"variete-francaise","active":true,"prompt":"Les mots bleus","answer":"Les mots qu’on dit avec les yeux","title":"Les Mots bleus","source":"Christophe"},{"id":"lyrics-072","boxId":"variete-francaise","active":true,"prompt":"Emmenez-moi au bout de la Terre","answer":"Emmenez-moi au pays des merveilles","title":"Emmenez-moi","source":"Charles Aznavour"},{"id":"lyrics-073","boxId":"tubes-soiree","active":true,"prompt":"Partenaire particulier","answer":"Cherche partenaire particulière","title":"Partenaire particulier","source":"Partenaire Particulier"},{"id":"lyrics-074","boxId":"disney","active":true,"prompt":"Sous l’océan, sous l’océan","answer":"Doudou, c’est bien mieux","title":"Sous l’océan","source":"La Petite Sirène"},{"id":"lyrics-075","boxId":"disney","active":true,"prompt":"Prince Ali, oui, c’est bien lui","answer":"Ali Ababwa","title":"Prince Ali","source":"Aladdin"},{"id":"lyrics-076","boxId":"pop-rap-francais","active":true,"prompt":"Mon amour, dis-moi à quoi tu penses","answer":"Si tout ça a un sens","title":"Mon amour","source":"Slimane"},{"id":"lyrics-077","boxId":"pop-rap-francais","active":true,"prompt":"Il fait toujours beau au-dessus des nuages","answer":"Mais moi, si j’étais un oiseau","title":"La Symphonie des éclairs","source":"Zaho de Sagazan"},{"id":"lyrics-078","boxId":"pop-rap-francais","active":true,"prompt":"Bande organisée","answer":"Personne peut nous canaliser","title":"Bande organisée","source":"Jul et collectif 13 Organisé"},{"id":"lyrics-079","boxId":"pop-rap-francais","active":true,"prompt":"Il faudrait tout oublier","answer":"Pour y croire","title":"Tout oublier","source":"Angèle & Roméo Elvis"},{"id":"lyrics-080","boxId":"pop-rap-francais","active":true,"prompt":"Balance ton quoi","answer":"Même si tu parles mal des filles","title":"Balance ton quoi","source":"Angèle"},{"id":"lyrics-081","boxId":"pop-rap-francais","active":true,"prompt":"Y a pas moyen, Djadja","answer":"J’suis pas ta catin, Djadja","title":"Djadja","source":"Aya Nakamura"},{"id":"lyrics-082","boxId":"variete-francaise","active":true,"prompt":"On ne change pas","answer":"On met juste les costumes d’autres sur soi","title":"On ne change pas","source":"Céline Dion"},{"id":"lyrics-083","boxId":"variete-francaise","active":true,"prompt":"Et si tu crois que j’ai eu peur","answer":"C’est faux","title":"Sous le vent","source":"Garou & Céline Dion"},{"id":"lyrics-084","boxId":"pop-rap-francais","active":true,"prompt":"Je danse le Mia","answer":"Pas de pacotille","title":"Je danse le Mia","source":"IAM"},{"id":"lyrics-085","boxId":"tubes-soiree","active":true,"prompt":"Et tu chantes, chantes, chantes","answer":"Ce refrain qui te plaît","title":"Nuit de folie","source":"Début de Soirée"},{"id":"lyrics-086","boxId":"disney","active":true,"prompt":"Tu crois que la Terre","answer":"T’appartient tout entière","title":"L’Air du vent","source":"Pocahontas"},{"id":"lyrics-087","boxId":"disney","active":true,"prompt":"Je donnerais tout ce que j’ai","answer":"Pour partir d’ici","title":"Partir là-bas","source":"La Petite Sirène"},{"id":"lyrics-088","boxId":"disney","active":true,"prompt":"Attaquons l’exercice","answer":"Pour défaire les Huns","title":"Comme un homme","source":"Mulan"},{"id":"lyrics-089","boxId":"anglais","active":true,"prompt":"Mamma Mia","answer":"Here I go again","title":"Mamma Mia","source":"ABBA"},{"id":"lyrics-090","boxId":"anglais","active":true,"prompt":"You are the Dancing Queen","answer":"Young and sweet, only seventeen","title":"Dancing Queen","source":"ABBA"},{"id":"lyrics-091","boxId":"anglais","active":true,"prompt":"Is this the real life?","answer":"Is this just fantasy?","title":"Bohemian Rhapsody","source":"Queen"},{"id":"lyrics-092","boxId":"anglais","active":true,"prompt":"We are the champions","answer":"My friends","title":"We Are the Champions","source":"Queen"},{"id":"lyrics-093","boxId":"anglais","active":true,"prompt":"Billie Jean is not my lover","answer":"She’s just a girl who claims that I am the one","title":"Billie Jean","source":"Michael Jackson"},{"id":"lyrics-094","boxId":"anglais","active":true,"prompt":"’Cause this is thriller, thriller night","answer":"And no one’s gonna save you","title":"Thriller","source":"Michael Jackson"},{"id":"lyrics-095","boxId":"anglais","active":true,"prompt":"Beat it, beat it","answer":"No one wants to be defeated","title":"Beat It","source":"Michael Jackson"},{"id":"lyrics-096","boxId":"anglais","active":true,"prompt":"You’ve been hit by","answer":"You’ve been struck by a smooth criminal","title":"Smooth Criminal","source":"Michael Jackson"},{"id":"lyrics-097","boxId":"anglais","active":true,"prompt":"Oops, I did it again","answer":"I played with your heart","title":"Oops!... I Did It Again","source":"Britney Spears"},{"id":"lyrics-098","boxId":"anglais","active":true,"prompt":"My loneliness is killing me","answer":"I must confess I still believe","title":"...Baby One More Time","source":"Britney Spears"},{"id":"lyrics-099","boxId":"anglais","active":true,"prompt":"With a taste of your lips","answer":"I’m on a ride","title":"Toxic","source":"Britney Spears"},{"id":"lyrics-100","boxId":"anglais","active":true,"prompt":"Umbrella, ella, ella","answer":"Eh, eh, eh","title":"Umbrella","source":"Rihanna"},{"id":"lyrics-101","boxId":"anglais","active":true,"prompt":"Rah-rah-ah-ah-ah","answer":"Roma-roma-ma","title":"Bad Romance","source":"Lady Gaga"},{"id":"lyrics-102","boxId":"anglais","active":true,"prompt":"Can’t read my, can’t read my","answer":"No, he can’t read my poker face","title":"Poker Face","source":"Lady Gaga"},{"id":"lyrics-103","boxId":"anglais","active":true,"prompt":"I kissed a girl","answer":"And I liked it","title":"I Kissed a Girl","source":"Katy Perry"},{"id":"lyrics-104","boxId":"anglais","active":true,"prompt":"I got the eye of the tiger","answer":"A fighter, dancing through the fire","title":"Roar","source":"Katy Perry"},{"id":"lyrics-105","boxId":"anglais","active":true,"prompt":"Hello from the other side","answer":"I must’ve called a thousand times","title":"Hello","source":"Adele"},{"id":"lyrics-106","boxId":"anglais","active":true,"prompt":"Never mind, I’ll find","answer":"Someone like you","title":"Someone Like You","source":"Adele"},{"id":"lyrics-107","boxId":"anglais","active":true,"prompt":"The club isn’t the best place","answer":"To find a lover","title":"Shape of You","source":"Ed Sheeran"},{"id":"lyrics-108","boxId":"anglais","active":true,"prompt":"I found a love for me","answer":"Darling, just dive right in","title":"Perfect","source":"Ed Sheeran"},{"id":"lyrics-109","boxId":"anglais","active":true,"prompt":"Hey, I just met you","answer":"And this is crazy","title":"Call Me Maybe","source":"Carly Rae Jepsen"},{"id":"lyrics-110","boxId":"anglais","active":true,"prompt":"I can buy myself flowers","answer":"Write my name in the sand","title":"Flowers","source":"Miley Cyrus"},{"id":"lyrics-111","boxId":"anglais","active":true,"prompt":"You know it’s not the same","answer":"As it was","title":"As It Was","source":"Harry Styles"},{"id":"lyrics-112","boxId":"anglais","active":true,"prompt":"If you don’t wanna see me","answer":"Dancing with somebody","title":"Don’t Start Now","source":"Dua Lipa"},{"id":"lyrics-113","boxId":"anglais","active":true,"prompt":"I used to rule the world","answer":"Seas would rise when I gave the word","title":"Viva la Vida","source":"Coldplay"},{"id":"lyrics-114","boxId":"anglais","active":true,"prompt":"Look at the stars","answer":"Look how they shine for you","title":"Yellow","source":"Coldplay"},{"id":"lyrics-115","boxId":"anglais","active":true,"prompt":"With the lights out","answer":"It’s less dangerous","title":"Smells Like Teen Spirit","source":"Nirvana"},{"id":"lyrics-116","boxId":"anglais","active":true,"prompt":"Wake me up inside","answer":"I can’t wake up","title":"Bring Me to Life","source":"Evanescence"},{"id":"lyrics-117","boxId":"anglais","active":true,"prompt":"I tried so hard","answer":"And got so far","title":"In the End","source":"Linkin Park"},{"id":"lyrics-118","boxId":"anglais","active":true,"prompt":"I’m a Barbie girl","answer":"In the Barbie world","title":"Barbie Girl","source":"Aqua"},{"id":"lyrics-119","boxId":"anglais","active":true,"prompt":"Tell me why","answer":"Ain’t nothing but a heartache","title":"I Want It That Way","source":"Backstreet Boys"},{"id":"lyrics-120","boxId":"anglais","active":true,"prompt":"Everybody, yeah","answer":"Rock your body, yeah","title":"Everybody (Backstreet’s Back)","source":"Backstreet Boys"},{"id":"lyrics-121","boxId":"anglais","active":true,"prompt":"Because I’m happy","answer":"Clap along if you feel like a room without a roof","title":"Happy","source":"Pharrell Williams"},{"id":"lyrics-122","boxId":"anglais","active":true,"prompt":"I’m off the deep end","answer":"Watch as I dive in","title":"Shallow","source":"Lady Gaga & Bradley Cooper"},{"id":"lyrics-123","boxId":"anglais","active":true,"prompt":"Never gonna give you up","answer":"Never gonna let you down","title":"Never Gonna Give You Up","source":"Rick Astley"},{"id":"lyrics-124","active":true,"prompt":"Un crocodile s'en allant à la guerre","answer":"Disait au revoir à ses petits enfants","title":"Ah ! les crocodiles","source":"Comptine","boxId":"comptines"},{"id":"lyrics-125","active":true,"prompt":"Il court, il court, le furet","answer":"Le furet du bois, mesdames","title":"Il court, il court, le furet","source":"Comptine","boxId":"comptines"},{"id":"lyrics-126","active":true,"prompt":"À la claire fontaine","answer":"M'en allant promener","title":"À la claire fontaine","source":"Chanson traditionnelle","boxId":"comptines"},{"id":"lyrics-127","active":true,"prompt":"Malbrough s'en va-t-en guerre","answer":"Mironton, mironton, mirontaine","title":"Malbrough s'en va-t-en guerre","source":"Chanson traditionnelle","boxId":"comptines"},{"id":"lyrics-128","active":true,"prompt":"Cadet Rousselle a trois maisons","answer":"Qui n'ont ni poutres ni chevrons","title":"Cadet Rousselle","source":"Chanson traditionnelle","boxId":"comptines"},{"id":"lyrics-129","active":true,"prompt":"Auprès de ma blonde","answer":"Qu'il fait bon, fait bon, fait bon","title":"Auprès de ma blonde","source":"Chanson traditionnelle","boxId":"comptines"},{"id":"lyrics-130","active":true,"prompt":"Nous n'irons plus au bois","answer":"Les lauriers sont coupés","title":"Nous n'irons plus au bois","source":"Chanson traditionnelle","boxId":"comptines"},{"id":"lyrics-131","active":true,"prompt":"J'ai descendu dans mon jardin","answer":"Pour y cueillir du romarin","title":"Gentil coquelicot","source":"Chanson traditionnelle","boxId":"comptines"},{"id":"lyrics-132","active":true,"prompt":"C'est la mère Michel qui a perdu son chat","answer":"Qui crie par la fenêtre à qui le lui rendra","title":"La Mère Michel","source":"Comptine","boxId":"comptines"},{"id":"lyrics-133","active":true,"prompt":"Il pleut, il pleut, bergère","answer":"Presse tes blancs moutons","title":"Il pleut, il pleut, bergère","source":"Chanson traditionnelle","boxId":"comptines"},{"id":"lyrics-134","active":true,"prompt":"Mon beau sapin, roi des forêts","answer":"Que j'aime ta verdure","title":"Mon beau sapin","source":"Chanson traditionnelle","boxId":"comptines"},{"id":"lyrics-135","active":true,"prompt":"Au feu, les pompiers","answer":"La maison qui brûle","title":"Au feu, les pompiers","source":"Comptine","boxId":"comptines"},{"id":"lyrics-136","active":true,"prompt":"Il était un p'tit homme","answer":"Appelé Guilleri","title":"Compère Guilleri","source":"Chanson traditionnelle","boxId":"comptines"},{"id":"lyrics-137","active":true,"prompt":"Pomme de reinette et pomme d'api","answer":"Tapis, tapis rouge","title":"Pomme de reinette","source":"Comptine","boxId":"comptines"},{"id":"lyrics-138","active":true,"prompt":"Un, deux, trois, nous irons au bois","answer":"Quatre, cinq, six, cueillir des cerises","title":"Un, deux, trois, nous irons au bois","source":"Comptine","boxId":"comptines"},{"id":"lyrics-139","active":true,"prompt":"Twinkle, twinkle, little star","answer":"How I wonder what you are","title":"Twinkle, Twinkle, Little Star","source":"Traditional","boxId":"anglais"},{"id":"lyrics-140","active":true,"prompt":"Row, row, row your boat","answer":"Gently down the stream","title":"Row, Row, Row Your Boat","source":"Traditional","boxId":"anglais"},{"id":"lyrics-141","active":true,"prompt":"Old MacDonald had a farm","answer":"E-I-E-I-O","title":"Old MacDonald Had a Farm","source":"Traditional","boxId":"anglais"},{"id":"lyrics-142","active":true,"prompt":"London Bridge is falling down","answer":"Falling down, falling down","title":"London Bridge Is Falling Down","source":"Traditional","boxId":"anglais"},{"id":"lyrics-143","active":true,"prompt":"Mary had a little lamb","answer":"Its fleece was white as snow","title":"Mary Had a Little Lamb","source":"Traditional","boxId":"anglais"}]},"mime":{"schemaVersion":1,"libraryVersion":"2026.06.15-1","updatedAt":"2026-06-15","modeId":"mime","modeName":"Mimer","boxes":[{"id":"animals","name":"Animaux"},{"id":"jobs","name":"Métiers"},{"id":"sports","name":"Sports et loisirs"},{"id":"daily","name":"Actions du quotidien"},{"id":"emotions","name":"Réactions et émotions"},{"id":"characters","name":"Personnages et univers connus"},{"id":"objects","name":"Objets et machines"},{"id":"absurd","name":"Situations absurdes"},{"id":"expressions","name":"Expressions et situations à interpréter"},{"id":"parties","name":"Soirées et fêtes"},{"id":"tech","name":"Galères technologiques"},{"id":"transport","name":"Transports et voyages"},{"id":"food","name":"Cuisine et nourriture"},{"id":"awkward","name":"Situations gênantes et catastrophes"},{"id":"uncategorized","name":"Sans catégorie","protected":true}],"cards":[{"id":"mime-001","boxId":"animals","active":true,"prompt":"Un éléphant","difficulty":"easy"},{"id":"mime-002","boxId":"animals","active":true,"prompt":"Un singe","difficulty":"easy"},{"id":"mime-003","boxId":"animals","active":true,"prompt":"Un kangourou","difficulty":"easy"},{"id":"mime-004","boxId":"animals","active":true,"prompt":"Un serpent","difficulty":"easy"},{"id":"mime-005","boxId":"animals","active":true,"prompt":"Un pingouin","difficulty":"easy"},{"id":"mime-006","boxId":"animals","active":true,"prompt":"Une poule","difficulty":"easy"},{"id":"mime-007","boxId":"animals","active":true,"prompt":"Un poisson","difficulty":"easy"},{"id":"mime-008","boxId":"animals","active":true,"prompt":"Un gorille qui se frappe la poitrine","difficulty":"easy"},{"id":"mime-009","boxId":"animals","active":true,"prompt":"Un canard qui marche en se dandinant","difficulty":"easy"},{"id":"mime-010","boxId":"animals","active":true,"prompt":"Un lapin qui mange une carotte","difficulty":"easy"},{"id":"mime-011","boxId":"animals","active":true,"prompt":"Un chien qui réclame une friandise","difficulty":"easy"},{"id":"mime-012","boxId":"animals","active":true,"prompt":"Un chat qui joue avec une pelote de laine","difficulty":"easy"},{"id":"mime-013","boxId":"animals","active":true,"prompt":"Un paresseux","difficulty":"medium"},{"id":"mime-014","boxId":"animals","active":true,"prompt":"Un crabe","difficulty":"medium"},{"id":"mime-015","boxId":"animals","active":true,"prompt":"Un flamant rose","difficulty":"medium"},{"id":"mime-016","boxId":"animals","active":true,"prompt":"Une grenouille","difficulty":"medium"},{"id":"mime-017","boxId":"animals","active":true,"prompt":"Un écureuil","difficulty":"medium"},{"id":"mime-018","boxId":"animals","active":true,"prompt":"Un cheval qui galope","difficulty":"medium"},{"id":"mime-019","boxId":"animals","active":true,"prompt":"Un chat qui fait sa toilette","difficulty":"medium"},{"id":"mime-020","boxId":"animals","active":true,"prompt":"Un lama qui crache","difficulty":"medium"},{"id":"mime-021","boxId":"animals","active":true,"prompt":"Un hérisson qui se met en boule","difficulty":"medium"},{"id":"mime-022","boxId":"animals","active":true,"prompt":"Un coq qui réveille tout le monde","difficulty":"medium"},{"id":"mime-023","boxId":"animals","active":true,"prompt":"Une loutre qui casse un coquillage","difficulty":"medium"},{"id":"mime-024","boxId":"animals","active":true,"prompt":"Un cheval qui refuse d’avancer","difficulty":"medium"},{"id":"mime-025","boxId":"animals","active":true,"prompt":"Un chien qui poursuit sa queue","difficulty":"hard"},{"id":"mime-026","boxId":"animals","active":true,"prompt":"Un paon qui fait la roue","difficulty":"hard"},{"id":"mime-027","boxId":"animals","active":true,"prompt":"Une chauve-souris suspendue la tête en bas","difficulty":"hard"},{"id":"mime-028","boxId":"animals","active":true,"prompt":"Un caméléon qui attrape une mouche avec sa langue","difficulty":"hard"},{"id":"mime-029","boxId":"animals","active":true,"prompt":"Un ours qui cherche du miel","difficulty":"hard"},{"id":"mime-030","boxId":"animals","active":true,"prompt":"Une araignée qui tisse sa toile","difficulty":"hard"},{"id":"mime-031","boxId":"animals","active":true,"prompt":"Un chien qui se secoue après son bain","difficulty":"hard"},{"id":"mime-032","boxId":"animals","active":true,"prompt":"Un chat qui essaie d’attraper un point lumineux","difficulty":"hard"},{"id":"mime-033","boxId":"animals","active":true,"prompt":"Un ours qui se gratte le dos contre un arbre","difficulty":"hard"},{"id":"mime-034","boxId":"animals","active":true,"prompt":"Une poule qui pond un œuf","difficulty":"hard"},{"id":"mime-035","boxId":"animals","active":true,"prompt":"Un flamant rose qui perd l’équilibre sur une patte","difficulty":"hard"},{"id":"mime-036","boxId":"jobs","active":true,"prompt":"Un médecin","difficulty":"easy"},{"id":"mime-037","boxId":"jobs","active":true,"prompt":"Un pompier","difficulty":"easy"},{"id":"mime-038","boxId":"jobs","active":true,"prompt":"Un policier","difficulty":"easy"},{"id":"mime-039","boxId":"jobs","active":true,"prompt":"Un cuisinier","difficulty":"easy"},{"id":"mime-040","boxId":"jobs","active":true,"prompt":"Un coiffeur","difficulty":"easy"},{"id":"mime-041","boxId":"jobs","active":true,"prompt":"Un professeur","difficulty":"easy"},{"id":"mime-042","boxId":"jobs","active":true,"prompt":"Un serveur","difficulty":"easy"},{"id":"mime-043","boxId":"jobs","active":true,"prompt":"Un boulanger qui pétrit du pain","difficulty":"easy"},{"id":"mime-044","boxId":"jobs","active":true,"prompt":"Un barman qui prépare un cocktail","difficulty":"easy"},{"id":"mime-045","boxId":"jobs","active":true,"prompt":"Un DJ qui mixe de la musique","difficulty":"easy"},{"id":"mime-046","boxId":"jobs","active":true,"prompt":"Un peintre qui repeint un mur","difficulty":"easy"},{"id":"mime-047","boxId":"jobs","active":true,"prompt":"Un pilote d’avion","difficulty":"easy"},{"id":"mime-048","boxId":"jobs","active":true,"prompt":"Un photographe","difficulty":"medium"},{"id":"mime-049","boxId":"jobs","active":true,"prompt":"Un mécanicien","difficulty":"medium"},{"id":"mime-050","boxId":"jobs","active":true,"prompt":"Un dentiste","difficulty":"medium"},{"id":"mime-051","boxId":"jobs","active":true,"prompt":"Un facteur","difficulty":"medium"},{"id":"mime-052","boxId":"jobs","active":true,"prompt":"Un jardinier","difficulty":"medium"},{"id":"mime-053","boxId":"jobs","active":true,"prompt":"Un magicien","difficulty":"medium"},{"id":"mime-054","boxId":"jobs","active":true,"prompt":"Un chef d’orchestre","difficulty":"medium"},{"id":"mime-055","boxId":"jobs","active":true,"prompt":"Un caissier qui scanne les articles rapidement","difficulty":"medium"},{"id":"mime-056","boxId":"jobs","active":true,"prompt":"Un plombier qui répare une fuite","difficulty":"medium"},{"id":"mime-057","boxId":"jobs","active":true,"prompt":"Un maître-nageur qui surveille une piscine","difficulty":"medium"},{"id":"mime-058","boxId":"jobs","active":true,"prompt":"Un serveur qui porte beaucoup d’assiettes","difficulty":"medium"},{"id":"mime-059","boxId":"jobs","active":true,"prompt":"Un journaliste qui interviewe quelqu’un","difficulty":"medium"},{"id":"mime-060","boxId":"jobs","active":true,"prompt":"Un contrôleur de train qui vérifie les billets","difficulty":"hard"},{"id":"mime-061","boxId":"jobs","active":true,"prompt":"Un vétérinaire qui soigne un cheval","difficulty":"hard"},{"id":"mime-062","boxId":"jobs","active":true,"prompt":"Un archéologue qui découvre un trésor","difficulty":"hard"},{"id":"mime-063","boxId":"jobs","active":true,"prompt":"Un agent secret en mission","difficulty":"hard"},{"id":"mime-064","boxId":"jobs","active":true,"prompt":"Un astronaute qui marche sur la Lune","difficulty":"hard"},{"id":"mime-065","boxId":"jobs","active":true,"prompt":"Un présentateur météo en pleine tempête","difficulty":"hard"},{"id":"mime-066","boxId":"jobs","active":true,"prompt":"Un coiffeur qui coupe une mèche beaucoup trop courte","difficulty":"hard"},{"id":"mime-067","boxId":"jobs","active":true,"prompt":"Un serveur qui manque de faire tomber son plateau","difficulty":"hard"},{"id":"mime-068","boxId":"jobs","active":true,"prompt":"Un plombier qui reçoit de l’eau en plein visage","difficulty":"hard"},{"id":"mime-069","boxId":"jobs","active":true,"prompt":"Un photographe qui fait prendre la pose à tout le monde","difficulty":"hard"},{"id":"mime-070","boxId":"jobs","active":true,"prompt":"Un dentiste qui essaie d’arracher une dent résistante","difficulty":"hard"},{"id":"mime-071","boxId":"sports","active":true,"prompt":"Jouer au football","difficulty":"easy"},{"id":"mime-072","boxId":"sports","active":true,"prompt":"Jouer au tennis","difficulty":"easy"},{"id":"mime-073","boxId":"sports","active":true,"prompt":"Faire du vélo","difficulty":"easy"},{"id":"mime-074","boxId":"sports","active":true,"prompt":"Nager","difficulty":"easy"},{"id":"mime-075","boxId":"sports","active":true,"prompt":"Faire du ski","difficulty":"easy"},{"id":"mime-076","boxId":"sports","active":true,"prompt":"Jouer au basket","difficulty":"easy"},{"id":"mime-077","boxId":"sports","active":true,"prompt":"Faire de la boxe","difficulty":"easy"},{"id":"mime-078","boxId":"sports","active":true,"prompt":"Jouer au badminton","difficulty":"easy"},{"id":"mime-079","boxId":"sports","active":true,"prompt":"Faire de la musculation","difficulty":"easy"},{"id":"mime-080","boxId":"sports","active":true,"prompt":"Jouer au billard","difficulty":"easy"},{"id":"mime-081","boxId":"sports","active":true,"prompt":"Aller à la pêche","difficulty":"easy"},{"id":"mime-082","boxId":"sports","active":true,"prompt":"Danser la salsa","difficulty":"easy"},{"id":"mime-083","boxId":"sports","active":true,"prompt":"Faire de l’escalade","difficulty":"medium"},{"id":"mime-084","boxId":"sports","active":true,"prompt":"Faire du bowling","difficulty":"medium"},{"id":"mime-085","boxId":"sports","active":true,"prompt":"Jouer au golf","difficulty":"medium"},{"id":"mime-086","boxId":"sports","active":true,"prompt":"Faire du patinage artistique","difficulty":"medium"},{"id":"mime-087","boxId":"sports","active":true,"prompt":"Tirer à l’arc","difficulty":"medium"},{"id":"mime-088","boxId":"sports","active":true,"prompt":"Faire du surf","difficulty":"medium"},{"id":"mime-089","boxId":"sports","active":true,"prompt":"Jouer au ping-pong","difficulty":"medium"},{"id":"mime-090","boxId":"sports","active":true,"prompt":"Participer à une course en sac","difficulty":"medium"},{"id":"mime-091","boxId":"sports","active":true,"prompt":"Faire une partie de pétanque","difficulty":"medium"},{"id":"mime-092","boxId":"sports","active":true,"prompt":"Jongler avec plusieurs balles","difficulty":"medium"},{"id":"mime-093","boxId":"sports","active":true,"prompt":"Chanter au karaoké","difficulty":"medium"},{"id":"mime-094","boxId":"sports","active":true,"prompt":"Rater toutes ses quilles au bowling","difficulty":"medium"},{"id":"mime-095","boxId":"sports","active":true,"prompt":"Courir un marathon complètement épuisé","difficulty":"hard"},{"id":"mime-096","boxId":"sports","active":true,"prompt":"Faire du trampoline avec le vertige","difficulty":"hard"},{"id":"mime-097","boxId":"sports","active":true,"prompt":"Participer à une course de chevaux","difficulty":"hard"},{"id":"mime-098","boxId":"sports","active":true,"prompt":"Faire du yoga sans réussir à tenir l’équilibre","difficulty":"hard"},{"id":"mime-099","boxId":"sports","active":true,"prompt":"Jouer à un jeu vidéo très stressant","difficulty":"hard"},{"id":"mime-100","boxId":"sports","active":true,"prompt":"Un footballeur qui rate un penalty","difficulty":"hard"},{"id":"mime-101","boxId":"sports","active":true,"prompt":"Un cycliste qui découvre qu’il a crevé","difficulty":"hard"},{"id":"mime-102","boxId":"sports","active":true,"prompt":"Un skieur qui tombe et essaie de se relever","difficulty":"hard"},{"id":"mime-103","boxId":"sports","active":true,"prompt":"Un boxeur qui esquive plusieurs coups","difficulty":"hard"},{"id":"mime-104","boxId":"sports","active":true,"prompt":"Un joueur de tennis qui envoie la balle dans le filet","difficulty":"hard"},{"id":"mime-105","boxId":"sports","active":true,"prompt":"Un gardien de but qui arrête le ballon avec son visage","difficulty":"hard"},{"id":"mime-106","boxId":"daily","active":true,"prompt":"Se brosser les dents","difficulty":"easy"},{"id":"mime-107","boxId":"daily","active":true,"prompt":"Prendre une douche","difficulty":"easy"},{"id":"mime-108","boxId":"daily","active":true,"prompt":"Se maquiller","difficulty":"easy"},{"id":"mime-109","boxId":"daily","active":true,"prompt":"Faire la vaisselle","difficulty":"easy"},{"id":"mime-110","boxId":"daily","active":true,"prompt":"Passer l’aspirateur","difficulty":"easy"},{"id":"mime-111","boxId":"daily","active":true,"prompt":"Se réveiller","difficulty":"easy"},{"id":"mime-112","boxId":"daily","active":true,"prompt":"S’habiller","difficulty":"easy"},{"id":"mime-113","boxId":"daily","active":true,"prompt":"Se sécher les cheveux","difficulty":"easy"},{"id":"mime-114","boxId":"daily","active":true,"prompt":"Mettre ses chaussures","difficulty":"easy"},{"id":"mime-115","boxId":"daily","active":true,"prompt":"Préparer un café","difficulty":"easy"},{"id":"mime-116","boxId":"daily","active":true,"prompt":"Se couper les ongles","difficulty":"easy"},{"id":"mime-117","boxId":"daily","active":true,"prompt":"Fermer les rideaux","difficulty":"easy"},{"id":"mime-118","boxId":"daily","active":true,"prompt":"Monter un meuble","difficulty":"medium"},{"id":"mime-119","boxId":"daily","active":true,"prompt":"Changer une ampoule","difficulty":"medium"},{"id":"mime-120","boxId":"daily","active":true,"prompt":"Chercher ses clés","difficulty":"medium"},{"id":"mime-121","boxId":"daily","active":true,"prompt":"Ouvrir un cadeau","difficulty":"medium"},{"id":"mime-122","boxId":"daily","active":true,"prompt":"Faire ses courses","difficulty":"medium"},{"id":"mime-123","boxId":"daily","active":true,"prompt":"Prendre un selfie","difficulty":"medium"},{"id":"mime-124","boxId":"daily","active":true,"prompt":"Essayer un pantalon trop petit","difficulty":"medium"},{"id":"mime-125","boxId":"daily","active":true,"prompt":"Essayer de démêler ses cheveux","difficulty":"medium"},{"id":"mime-126","boxId":"daily","active":true,"prompt":"Faire cuire des pâtes qui débordent","difficulty":"medium"},{"id":"mime-127","boxId":"daily","active":true,"prompt":"Mettre une housse de couette","difficulty":"medium"},{"id":"mime-128","boxId":"daily","active":true,"prompt":"Essayer de fermer une valise trop pleine","difficulty":"medium"},{"id":"mime-129","boxId":"daily","active":true,"prompt":"Enfiler une chaussette encore humide","difficulty":"medium"},{"id":"mime-130","boxId":"daily","active":true,"prompt":"Marcher sur un Lego","difficulty":"hard"},{"id":"mime-131","boxId":"daily","active":true,"prompt":"Essayer d’attraper quelque chose sous un meuble","difficulty":"hard"},{"id":"mime-132","boxId":"daily","active":true,"prompt":"Sortir discrètement d’une pièce","difficulty":"hard"},{"id":"mime-133","boxId":"daily","active":true,"prompt":"Porter trop de sacs de courses","difficulty":"hard"},{"id":"mime-134","boxId":"daily","active":true,"prompt":"Tenter de dormir avec un moustique dans la chambre","difficulty":"hard"},{"id":"mime-135","boxId":"daily","active":true,"prompt":"Essayer de retirer un vêtement trop serré","difficulty":"hard"},{"id":"mime-136","boxId":"daily","active":true,"prompt":"Chercher son téléphone alors qu’on l’a dans la main","difficulty":"hard"},{"id":"mime-137","boxId":"daily","active":true,"prompt":"Se lever sans réveiller quelqu’un","difficulty":"hard"},{"id":"mime-138","boxId":"daily","active":true,"prompt":"Tenter d’attraper un insecte sans le toucher","difficulty":"hard"},{"id":"mime-139","boxId":"daily","active":true,"prompt":"Faire tomber quelque chose et essayer de le rattraper avec le pied","difficulty":"hard"},{"id":"mime-140","boxId":"daily","active":true,"prompt":"Ouvrir un sac-poubelle qui se déchire","difficulty":"hard"},{"id":"mime-141","boxId":"emotions","active":true,"prompt":"Être très heureux","difficulty":"easy"},{"id":"mime-142","boxId":"emotions","active":true,"prompt":"Être triste","difficulty":"easy"},{"id":"mime-143","boxId":"emotions","active":true,"prompt":"Être en colère","difficulty":"easy"},{"id":"mime-144","boxId":"emotions","active":true,"prompt":"Avoir peur","difficulty":"easy"},{"id":"mime-145","boxId":"emotions","active":true,"prompt":"Être surpris","difficulty":"easy"},{"id":"mime-146","boxId":"emotions","active":true,"prompt":"Être amoureux","difficulty":"easy"},{"id":"mime-147","boxId":"emotions","active":true,"prompt":"Être fatigué","difficulty":"easy"},{"id":"mime-148","boxId":"emotions","active":true,"prompt":"S’ennuyer énormément","difficulty":"easy"},{"id":"mime-149","boxId":"emotions","active":true,"prompt":"Être complètement paniqué","difficulty":"easy"},{"id":"mime-150","boxId":"emotions","active":true,"prompt":"Être extrêmement concentré","difficulty":"easy"},{"id":"mime-151","boxId":"emotions","active":true,"prompt":"Être très détendu","difficulty":"easy"},{"id":"mime-152","boxId":"emotions","active":true,"prompt":"Être dégoûté","difficulty":"easy"},{"id":"mime-153","boxId":"emotions","active":true,"prompt":"Être jaloux","difficulty":"medium"},{"id":"mime-154","boxId":"emotions","active":true,"prompt":"Être gêné","difficulty":"medium"},{"id":"mime-155","boxId":"emotions","active":true,"prompt":"Être impatient d’ouvrir un cadeau","difficulty":"medium"},{"id":"mime-156","boxId":"emotions","active":true,"prompt":"Être fier de soi","difficulty":"medium"},{"id":"mime-157","boxId":"emotions","active":true,"prompt":"Être complètement perdu","difficulty":"medium"},{"id":"mime-158","boxId":"emotions","active":true,"prompt":"Être très méfiant","difficulty":"medium"},{"id":"mime-159","boxId":"emotions","active":true,"prompt":"Faire semblant d’écouter quelqu’un","difficulty":"medium"},{"id":"mime-160","boxId":"emotions","active":true,"prompt":"Essayer de rester calme alors qu’on est énervé","difficulty":"medium"},{"id":"mime-161","boxId":"emotions","active":true,"prompt":"Être vexé après avoir perdu","difficulty":"medium"},{"id":"mime-162","boxId":"emotions","active":true,"prompt":"Être terrifié mais essayer de le cacher","difficulty":"medium"},{"id":"mime-163","boxId":"emotions","active":true,"prompt":"Essayer de ne pas rire","difficulty":"medium"},{"id":"mime-164","boxId":"emotions","active":true,"prompt":"Être soulagé après une grosse frayeur","difficulty":"medium"},{"id":"mime-165","boxId":"emotions","active":true,"prompt":"Faire semblant d’être innocent","difficulty":"hard"},{"id":"mime-166","boxId":"emotions","active":true,"prompt":"Réaliser qu’on a oublié quelque chose d’important","difficulty":"hard"},{"id":"mime-167","boxId":"emotions","active":true,"prompt":"Recevoir un cadeau affreux et faire semblant d’être content","difficulty":"hard"},{"id":"mime-168","boxId":"emotions","active":true,"prompt":"Entendre un bruit inquiétant derrière soi","difficulty":"hard"},{"id":"mime-169","boxId":"emotions","active":true,"prompt":"Découvrir une araignée juste à côté de soi","difficulty":"hard"},{"id":"mime-170","boxId":"emotions","active":true,"prompt":"Attendre un résultat avec beaucoup de stress","difficulty":"hard"},{"id":"mime-171","boxId":"emotions","active":true,"prompt":"Réaliser qu’on vient de dire quelque chose de gênant","difficulty":"hard"},{"id":"mime-172","boxId":"emotions","active":true,"prompt":"Essayer de cacher une grosse déception","difficulty":"hard"},{"id":"mime-173","boxId":"emotions","active":true,"prompt":"Se rendre compte qu’on a parlé beaucoup trop fort","difficulty":"hard"},{"id":"mime-174","boxId":"emotions","active":true,"prompt":"Hésiter entre rire et avoir peur","difficulty":"hard"},{"id":"mime-175","boxId":"emotions","active":true,"prompt":"Casser quelque chose et faire comme si de rien n’était","difficulty":"hard"},{"id":"mime-176","boxId":"characters","active":true,"prompt":"Spider-Man","difficulty":"easy"},{"id":"mime-177","boxId":"characters","active":true,"prompt":"Harry Potter","difficulty":"easy"},{"id":"mime-178","boxId":"characters","active":true,"prompt":"Dark Vador","difficulty":"easy"},{"id":"mime-179","boxId":"characters","active":true,"prompt":"Elsa dans La Reine des Neiges","difficulty":"easy"},{"id":"mime-180","boxId":"characters","active":true,"prompt":"Superman","difficulty":"easy"},{"id":"mime-181","boxId":"characters","active":true,"prompt":"Barbie","difficulty":"easy"},{"id":"mime-182","boxId":"characters","active":true,"prompt":"Mickey Mouse","difficulty":"easy"},{"id":"mime-183","boxId":"characters","active":true,"prompt":"Batman","difficulty":"easy"},{"id":"mime-184","boxId":"characters","active":true,"prompt":"Wonder Woman","difficulty":"easy"},{"id":"mime-185","boxId":"characters","active":true,"prompt":"Tarzan","difficulty":"easy"},{"id":"mime-186","boxId":"characters","active":true,"prompt":"Pinocchio","difficulty":"easy"},{"id":"mime-187","boxId":"characters","active":true,"prompt":"Aladdin sur son tapis volant","difficulty":"easy"},{"id":"mime-188","boxId":"characters","active":true,"prompt":"Shrek","difficulty":"medium"},{"id":"mime-189","boxId":"characters","active":true,"prompt":"Jack Sparrow","difficulty":"medium"},{"id":"mime-190","boxId":"characters","active":true,"prompt":"Mercredi Addams","difficulty":"medium"},{"id":"mime-191","boxId":"characters","active":true,"prompt":"Hulk","difficulty":"medium"},{"id":"mime-192","boxId":"characters","active":true,"prompt":"Indiana Jones","difficulty":"medium"},{"id":"mime-193","boxId":"characters","active":true,"prompt":"Mr Bean","difficulty":"medium"},{"id":"mime-194","boxId":"characters","active":true,"prompt":"Mario","difficulty":"medium"},{"id":"mime-195","boxId":"characters","active":true,"prompt":"Wolverine qui sort ses griffes","difficulty":"medium"},{"id":"mime-196","boxId":"characters","active":true,"prompt":"Mary Poppins qui vole avec son parapluie","difficulty":"medium"},{"id":"mime-197","boxId":"characters","active":true,"prompt":"Buzz l’Éclair qui décolle","difficulty":"medium"},{"id":"mime-198","boxId":"characters","active":true,"prompt":"Dobby qui reçoit une chaussette","difficulty":"medium"},{"id":"mime-199","boxId":"characters","active":true,"prompt":"Forrest Gump qui court","difficulty":"medium"},{"id":"mime-200","boxId":"characters","active":true,"prompt":"Gollum qui cherche son précieux","difficulty":"hard"},{"id":"mime-201","boxId":"characters","active":true,"prompt":"Voldemort qui lance un sort","difficulty":"hard"},{"id":"mime-202","boxId":"characters","active":true,"prompt":"Rocky qui monte les escaliers","difficulty":"hard"},{"id":"mime-203","boxId":"characters","active":true,"prompt":"Neo qui évite les balles dans Matrix","difficulty":"hard"},{"id":"mime-204","boxId":"characters","active":true,"prompt":"Le Joker qui mélange des cartes en riant","difficulty":"hard"},{"id":"mime-205","boxId":"characters","active":true,"prompt":"Un Minion qui fait une énorme bêtise","difficulty":"hard"},{"id":"mime-206","boxId":"characters","active":true,"prompt":"Gandalf qui empêche quelqu’un de passer","difficulty":"hard"},{"id":"mime-207","boxId":"characters","active":true,"prompt":"E.T. qui tend son doigt lumineux","difficulty":"hard"},{"id":"mime-208","boxId":"characters","active":true,"prompt":"Marty McFly qui joue de la guitare","difficulty":"hard"},{"id":"mime-209","boxId":"characters","active":true,"prompt":"Ghostface qui téléphone à quelqu’un","difficulty":"hard"},{"id":"mime-210","boxId":"characters","active":true,"prompt":"Le Grinch qui vole des cadeaux","difficulty":"hard"},{"id":"mime-211","boxId":"objects","active":true,"prompt":"Utiliser un téléphone","difficulty":"easy"},{"id":"mime-212","boxId":"objects","active":true,"prompt":"Passer l’aspirateur","difficulty":"easy"},{"id":"mime-213","boxId":"objects","active":true,"prompt":"Conduire une voiture","difficulty":"easy"},{"id":"mime-214","boxId":"objects","active":true,"prompt":"Éteindre un réveil","difficulty":"easy"},{"id":"mime-215","boxId":"objects","active":true,"prompt":"Ouvrir un parapluie","difficulty":"easy"},{"id":"mime-216","boxId":"objects","active":true,"prompt":"Utiliser une machine à laver","difficulty":"easy"},{"id":"mime-217","boxId":"objects","active":true,"prompt":"Se placer devant un ventilateur","difficulty":"easy"},{"id":"mime-218","boxId":"objects","active":true,"prompt":"Utiliser un grille-pain","difficulty":"easy"},{"id":"mime-219","boxId":"objects","active":true,"prompt":"Se sécher les cheveux avec un sèche-cheveux","difficulty":"easy"},{"id":"mime-220","boxId":"objects","active":true,"prompt":"Faire de la trottinette électrique","difficulty":"easy"},{"id":"mime-221","boxId":"objects","active":true,"prompt":"Passer une tondeuse à gazon","difficulty":"easy"},{"id":"mime-222","boxId":"objects","active":true,"prompt":"Faire chauffer une bouilloire","difficulty":"easy"},{"id":"mime-223","boxId":"objects","active":true,"prompt":"Une imprimante en panne","difficulty":"medium"},{"id":"mime-224","boxId":"objects","active":true,"prompt":"Un robot qui marche","difficulty":"medium"},{"id":"mime-225","boxId":"objects","active":true,"prompt":"Utiliser une tronçonneuse","difficulty":"medium"},{"id":"mime-226","boxId":"objects","active":true,"prompt":"Chercher quelque chose avec un détecteur de métaux","difficulty":"medium"},{"id":"mime-227","boxId":"objects","active":true,"prompt":"Utiliser une machine à café","difficulty":"medium"},{"id":"mime-228","boxId":"objects","active":true,"prompt":"Acheter quelque chose à un distributeur automatique","difficulty":"medium"},{"id":"mime-229","boxId":"objects","active":true,"prompt":"Piloter un drone","difficulty":"medium"},{"id":"mime-230","boxId":"objects","active":true,"prompt":"Un grille-pain qui éjecte la tartine trop haut","difficulty":"medium"},{"id":"mime-231","boxId":"objects","active":true,"prompt":"Un sèche-cheveux beaucoup trop puissant","difficulty":"medium"},{"id":"mime-232","boxId":"objects","active":true,"prompt":"Un robot aspirateur coincé contre un mur","difficulty":"medium"},{"id":"mime-233","boxId":"objects","active":true,"prompt":"Une porte automatique qui refuse de s’ouvrir","difficulty":"medium"},{"id":"mime-234","boxId":"objects","active":true,"prompt":"Un micro qui produit un énorme larsen","difficulty":"medium"},{"id":"mime-235","boxId":"objects","active":true,"prompt":"Suivre un GPS qui donne une mauvaise direction","difficulty":"hard"},{"id":"mime-236","boxId":"objects","active":true,"prompt":"Débloquer une feuille coincée dans une photocopieuse","difficulty":"hard"},{"id":"mime-237","boxId":"objects","active":true,"prompt":"Être coincé dans un ascenseur","difficulty":"hard"},{"id":"mime-238","boxId":"objects","active":true,"prompt":"Essayer de démarrer une voiture qui refuse de démarrer","difficulty":"hard"},{"id":"mime-239","boxId":"objects","active":true,"prompt":"Utiliser un aspirateur qui avale un objet important","difficulty":"hard"},{"id":"mime-240","boxId":"objects","active":true,"prompt":"Une borne de paiement qui refuse la carte bancaire","difficulty":"hard"},{"id":"mime-241","boxId":"objects","active":true,"prompt":"Tirer une valise à roulettes qui part dans tous les sens","difficulty":"hard"},{"id":"mime-242","boxId":"objects","active":true,"prompt":"Utiliser un casque de réalité virtuelle et perdre l’équilibre","difficulty":"hard"},{"id":"mime-243","boxId":"objects","active":true,"prompt":"Frapper une télécommande pour qu’elle fonctionne","difficulty":"hard"},{"id":"mime-244","boxId":"objects","active":true,"prompt":"Un appareil photo qui prend la photo au mauvais moment","difficulty":"hard"},{"id":"mime-245","boxId":"objects","active":true,"prompt":"Utiliser un parapluie retourné par le vent","difficulty":"hard"},{"id":"mime-246","boxId":"absurd","active":true,"prompt":"Un kangourou qui fait ses courses","difficulty":"easy"},{"id":"mime-247","boxId":"absurd","active":true,"prompt":"Un chat qui conduit une voiture","difficulty":"easy"},{"id":"mime-248","boxId":"absurd","active":true,"prompt":"Un vampire chez le dentiste","difficulty":"easy"},{"id":"mime-249","boxId":"absurd","active":true,"prompt":"Un fantôme qui a peur","difficulty":"easy"},{"id":"mime-250","boxId":"absurd","active":true,"prompt":"Un chien qui fait du yoga","difficulty":"easy"},{"id":"mime-251","boxId":"absurd","active":true,"prompt":"Un bébé qui conduit un camion","difficulty":"easy"},{"id":"mime-252","boxId":"absurd","active":true,"prompt":"Un zombie qui danse","difficulty":"easy"},{"id":"mime-253","boxId":"absurd","active":true,"prompt":"Un vampire qui met de la crème solaire","difficulty":"easy"},{"id":"mime-254","boxId":"absurd","active":true,"prompt":"Un zombie qui passe un entretien d’embauche","difficulty":"easy"},{"id":"mime-255","boxId":"absurd","active":true,"prompt":"Un robot qui fait la sieste","difficulty":"easy"},{"id":"mime-256","boxId":"absurd","active":true,"prompt":"Un cheval qui utilise un téléphone","difficulty":"easy"},{"id":"mime-257","boxId":"absurd","active":true,"prompt":"Un dinosaure qui fait du vélo","difficulty":"easy"},{"id":"mime-258","boxId":"absurd","active":true,"prompt":"Un pingouin qui prend un bain de soleil","difficulty":"medium"},{"id":"mime-259","boxId":"absurd","active":true,"prompt":"Une licorne coincée dans un ascenseur","difficulty":"medium"},{"id":"mime-260","boxId":"absurd","active":true,"prompt":"Un extraterrestre qui découvre un téléphone","difficulty":"medium"},{"id":"mime-261","boxId":"absurd","active":true,"prompt":"Un requin qui se brosse les dents","difficulty":"medium"},{"id":"mime-262","boxId":"absurd","active":true,"prompt":"Un roi qui nettoie ses toilettes","difficulty":"medium"},{"id":"mime-263","boxId":"absurd","active":true,"prompt":"Un squelette qui cherche ses os","difficulty":"medium"},{"id":"mime-264","boxId":"absurd","active":true,"prompt":"Une sorcière dont le balai refuse de démarrer","difficulty":"medium"},{"id":"mime-265","boxId":"absurd","active":true,"prompt":"Une momie qui essaie de dérouler ses bandages","difficulty":"medium"},{"id":"mime-266","boxId":"absurd","active":true,"prompt":"Un extraterrestre qui apprend à danser","difficulty":"medium"},{"id":"mime-267","boxId":"absurd","active":true,"prompt":"Un fantôme qui essaie de faire peur mais échoue","difficulty":"medium"},{"id":"mime-268","boxId":"absurd","active":true,"prompt":"Un super-héros qui n’arrive pas à ouvrir un bocal","difficulty":"medium"},{"id":"mime-269","boxId":"absurd","active":true,"prompt":"Un pirate qui cherche son perroquet","difficulty":"medium"},{"id":"mime-270","boxId":"absurd","active":true,"prompt":"Un espion qui éternue pendant une mission secrète","difficulty":"hard"},{"id":"mime-271","boxId":"absurd","active":true,"prompt":"Un astronaute qui essaie de manger dans l’espace","difficulty":"hard"},{"id":"mime-272","boxId":"absurd","active":true,"prompt":"Un super-héros qui essaie de voler mais retombe","difficulty":"hard"},{"id":"mime-273","boxId":"absurd","active":true,"prompt":"Un pirate qui a le mal de mer","difficulty":"hard"},{"id":"mime-274","boxId":"absurd","active":true,"prompt":"Un magicien qui rate complètement son tour","difficulty":"hard"},{"id":"mime-275","boxId":"absurd","active":true,"prompt":"Un dinosaure qui essaie de passer une porte","difficulty":"hard"},{"id":"mime-276","boxId":"absurd","active":true,"prompt":"Un chevalier qui n’arrive pas à se relever à cause de son armure","difficulty":"hard"},{"id":"mime-277","boxId":"absurd","active":true,"prompt":"Un fantôme qui essaie de faire peur mais se fait peur lui-même","difficulty":"hard"},{"id":"mime-278","boxId":"absurd","active":true,"prompt":"Un dinosaure qui essaie de s’asseoir sur une toute petite chaise","difficulty":"hard"},{"id":"mime-279","boxId":"absurd","active":true,"prompt":"Un vampire qui essaie de se regarder dans un miroir","difficulty":"hard"},{"id":"mime-280","boxId":"absurd","active":true,"prompt":"Un zombie qui essaie de marcher normalement","difficulty":"hard"},{"id":"mime-281","boxId":"expressions","active":true,"prompt":"Avoir le coup de foudre","difficulty":"easy"},{"id":"mime-282","boxId":"expressions","active":true,"prompt":"Dormir comme un bébé","difficulty":"easy"},{"id":"mime-283","boxId":"expressions","active":true,"prompt":"Avoir très faim","difficulty":"easy"},{"id":"mime-284","boxId":"expressions","active":true,"prompt":"Être mort de rire","difficulty":"easy"},{"id":"mime-285","boxId":"expressions","active":true,"prompt":"Avoir froid","difficulty":"easy"},{"id":"mime-286","boxId":"expressions","active":true,"prompt":"Avoir chaud","difficulty":"easy"},{"id":"mime-287","boxId":"expressions","active":true,"prompt":"Être dans la lune","difficulty":"easy"},{"id":"mime-288","boxId":"expressions","active":true,"prompt":"Avoir un chat dans la gorge","difficulty":"easy"},{"id":"mime-289","boxId":"expressions","active":true,"prompt":"Coûter un bras","difficulty":"easy"},{"id":"mime-290","boxId":"expressions","active":true,"prompt":"Pleuvoir des cordes","difficulty":"easy"},{"id":"mime-291","boxId":"expressions","active":true,"prompt":"Avoir les yeux plus gros que le ventre","difficulty":"easy"},{"id":"mime-292","boxId":"expressions","active":true,"prompt":"Donner sa langue au chat","difficulty":"easy"},{"id":"mime-293","boxId":"expressions","active":true,"prompt":"Chercher une aiguille dans une botte de foin","difficulty":"medium"},{"id":"mime-294","boxId":"expressions","active":true,"prompt":"Tomber dans les pommes","difficulty":"medium"},{"id":"mime-295","boxId":"expressions","active":true,"prompt":"Avoir la tête dans les nuages","difficulty":"medium"},{"id":"mime-296","boxId":"expressions","active":true,"prompt":"Mettre les pieds dans le plat","difficulty":"medium"},{"id":"mime-297","boxId":"expressions","active":true,"prompt":"Être à côté de la plaque","difficulty":"medium"},{"id":"mime-298","boxId":"expressions","active":true,"prompt":"Avoir un poil dans la main","difficulty":"medium"},{"id":"mime-299","boxId":"expressions","active":true,"prompt":"Prendre ses jambes à son cou","difficulty":"medium"},{"id":"mime-300","boxId":"expressions","active":true,"prompt":"Marcher sur des œufs","difficulty":"medium"},{"id":"mime-301","boxId":"expressions","active":true,"prompt":"Prendre le taureau par les cornes","difficulty":"medium"},{"id":"mime-302","boxId":"expressions","active":true,"prompt":"Jeter de l’huile sur le feu","difficulty":"medium"},{"id":"mime-303","boxId":"expressions","active":true,"prompt":"Couper les cheveux en quatre","difficulty":"medium"},{"id":"mime-304","boxId":"expressions","active":true,"prompt":"Mettre de l’eau dans son vin","difficulty":"medium"},{"id":"mime-305","boxId":"expressions","active":true,"prompt":"Jeter l’éponge","difficulty":"hard"},{"id":"mime-306","boxId":"expressions","active":true,"prompt":"Casser les pieds à quelqu’un","difficulty":"hard"},{"id":"mime-307","boxId":"expressions","active":true,"prompt":"Se mettre le doigt dans l’œil","difficulty":"hard"},{"id":"mime-308","boxId":"expressions","active":true,"prompt":"Avoir la main verte","difficulty":"hard"},{"id":"mime-309","boxId":"expressions","active":true,"prompt":"Se serrer la ceinture","difficulty":"hard"},{"id":"mime-310","boxId":"expressions","active":true,"prompt":"Faire l’autruche","difficulty":"hard"},{"id":"mime-311","boxId":"expressions","active":true,"prompt":"Avoir les mains liées","difficulty":"hard"},{"id":"mime-312","boxId":"expressions","active":true,"prompt":"Prendre la mouche","difficulty":"hard"},{"id":"mime-313","boxId":"expressions","active":true,"prompt":"Avoir un coup de barre","difficulty":"hard"},{"id":"mime-314","boxId":"expressions","active":true,"prompt":"Mettre la main à la pâte","difficulty":"hard"},{"id":"mime-315","boxId":"expressions","active":true,"prompt":"Retomber sur ses pieds","difficulty":"hard"},{"id":"mime-316","boxId":"parties","active":true,"prompt":"Danser tout seul au milieu de la piste","difficulty":"easy"},{"id":"mime-317","boxId":"parties","active":true,"prompt":"Souffler les bougies d’un gâteau","difficulty":"easy"},{"id":"mime-318","boxId":"parties","active":true,"prompt":"Ouvrir une bouteille de champagne","difficulty":"easy"},{"id":"mime-319","boxId":"parties","active":true,"prompt":"Prendre une photo de groupe","difficulty":"easy"},{"id":"mime-320","boxId":"parties","active":true,"prompt":"Lancer des confettis","difficulty":"easy"},{"id":"mime-321","boxId":"parties","active":true,"prompt":"Danser alors qu’on ne connaît pas la chorégraphie","difficulty":"medium"},{"id":"mime-322","boxId":"parties","active":true,"prompt":"Chanter très faux au karaoké","difficulty":"medium"},{"id":"mime-323","boxId":"parties","active":true,"prompt":"Faire une chenille en soirée","difficulty":"medium"},{"id":"mime-324","boxId":"parties","active":true,"prompt":"Faire semblant d’aimer la musique","difficulty":"medium"},{"id":"mime-325","boxId":"parties","active":true,"prompt":"Essayer de manger discrètement le dernier gâteau","difficulty":"medium"},{"id":"mime-326","boxId":"parties","active":true,"prompt":"Danser avec une chaussure cassée","difficulty":"hard"},{"id":"mime-327","boxId":"parties","active":true,"prompt":"Souffler des bougies qui se rallument","difficulty":"hard"},{"id":"mime-328","boxId":"parties","active":true,"prompt":"Ouvrir une bouteille dont le bouchon part brusquement","difficulty":"hard"},{"id":"mime-329","boxId":"parties","active":true,"prompt":"Prendre une photo de groupe où personne ne rentre dans le cadre","difficulty":"hard"},{"id":"mime-330","boxId":"parties","active":true,"prompt":"Faire tomber son verre en essayant de danser","difficulty":"hard"},{"id":"mime-331","boxId":"tech","active":true,"prompt":"Prendre un selfie","difficulty":"easy"},{"id":"mime-332","boxId":"tech","active":true,"prompt":"Jouer avec un casque de réalité virtuelle","difficulty":"easy"},{"id":"mime-333","boxId":"tech","active":true,"prompt":"Écrire très vite sur un téléphone","difficulty":"easy"},{"id":"mime-334","boxId":"tech","active":true,"prompt":"Brancher un chargeur","difficulty":"easy"},{"id":"mime-335","boxId":"tech","active":true,"prompt":"Utiliser une souris d’ordinateur","difficulty":"easy"},{"id":"mime-336","boxId":"tech","active":true,"prompt":"Chercher du réseau avec son téléphone","difficulty":"medium"},{"id":"mime-337","boxId":"tech","active":true,"prompt":"Déverrouiller son téléphone avec la reconnaissance faciale","difficulty":"medium"},{"id":"mime-338","boxId":"tech","active":true,"prompt":"Essayer de prendre une photo avec des gants","difficulty":"medium"},{"id":"mime-339","boxId":"tech","active":true,"prompt":"Faire une visioconférence qui bugue","difficulty":"medium"},{"id":"mime-340","boxId":"tech","active":true,"prompt":"Taper un mot de passe très compliqué","difficulty":"medium"},{"id":"mime-341","boxId":"tech","active":true,"prompt":"Faire tomber son téléphone sur son visage dans le lit","difficulty":"hard"},{"id":"mime-342","boxId":"tech","active":true,"prompt":"Utiliser un casque de réalité virtuelle et cogner un meuble","difficulty":"hard"},{"id":"mime-343","boxId":"tech","active":true,"prompt":"Démêler des écouteurs complètement noués","difficulty":"hard"},{"id":"mime-344","boxId":"tech","active":true,"prompt":"Voir son ordinateur se bloquer juste avant de sauvegarder","difficulty":"hard"},{"id":"mime-345","boxId":"tech","active":true,"prompt":"Bouger son chargeur dans tous les sens pour qu’il fonctionne","difficulty":"hard"},{"id":"mime-346","boxId":"transport","active":true,"prompt":"Conduire une voiture","difficulty":"easy"},{"id":"mime-347","boxId":"transport","active":true,"prompt":"Faire du stop","difficulty":"easy"},{"id":"mime-348","boxId":"transport","active":true,"prompt":"Attendre un bus","difficulty":"easy"},{"id":"mime-349","boxId":"transport","active":true,"prompt":"Tirer une valise","difficulty":"easy"},{"id":"mime-350","boxId":"transport","active":true,"prompt":"Prendre l’avion","difficulty":"easy"},{"id":"mime-351","boxId":"transport","active":true,"prompt":"Courir pour ne pas rater son train","difficulty":"medium"},{"id":"mime-352","boxId":"transport","active":true,"prompt":"Essayer de dormir dans un avion","difficulty":"medium"},{"id":"mime-353","boxId":"transport","active":true,"prompt":"Conduire sur une route pleine de virages","difficulty":"medium"},{"id":"mime-354","boxId":"transport","active":true,"prompt":"Porter une valise beaucoup trop lourde","difficulty":"medium"},{"id":"mime-355","boxId":"transport","active":true,"prompt":"Essayer de lire une carte à l’envers","difficulty":"medium"},{"id":"mime-356","boxId":"transport","active":true,"prompt":"Se rendre compte que le train part dans la mauvaise direction","difficulty":"hard"},{"id":"mime-357","boxId":"transport","active":true,"prompt":"Essayer de récupérer une valise lourde sur un tapis roulant","difficulty":"hard"},{"id":"mime-358","boxId":"transport","active":true,"prompt":"S’endormir sur l’épaule d’un inconnu dans le bus","difficulty":"hard"},{"id":"mime-359","boxId":"transport","active":true,"prompt":"Passer un contrôle de sécurité avec les poches pleines","difficulty":"hard"},{"id":"mime-360","boxId":"transport","active":true,"prompt":"Chercher sa voiture dans un immense parking","difficulty":"hard"},{"id":"mime-361","boxId":"food","active":true,"prompt":"Éplucher une banane","difficulty":"easy"},{"id":"mime-362","boxId":"food","active":true,"prompt":"Manger des spaghettis","difficulty":"easy"},{"id":"mime-363","boxId":"food","active":true,"prompt":"Faire sauter une crêpe","difficulty":"easy"},{"id":"mime-364","boxId":"food","active":true,"prompt":"Couper un oignon","difficulty":"easy"},{"id":"mime-365","boxId":"food","active":true,"prompt":"Goûter une soupe brûlante","difficulty":"easy"},{"id":"mime-366","boxId":"food","active":true,"prompt":"Essayer d’ouvrir un bocal très serré","difficulty":"medium"},{"id":"mime-367","boxId":"food","active":true,"prompt":"Manger quelque chose de beaucoup trop épicé","difficulty":"medium"},{"id":"mime-368","boxId":"food","active":true,"prompt":"Faire tomber une boule de glace","difficulty":"medium"},{"id":"mime-369","boxId":"food","active":true,"prompt":"Essayer de manger un hamburger trop gros","difficulty":"medium"},{"id":"mime-370","boxId":"food","active":true,"prompt":"Cuisiner avec une poêle qui éclabousse","difficulty":"medium"},{"id":"mime-371","boxId":"food","active":true,"prompt":"Faire semblant d’aimer un plat immangeable","difficulty":"hard"},{"id":"mime-372","boxId":"food","active":true,"prompt":"Essayer de manger proprement des spaghettis","difficulty":"hard"},{"id":"mime-373","boxId":"food","active":true,"prompt":"Goûter un aliment périmé et le recracher","difficulty":"hard"},{"id":"mime-374","boxId":"food","active":true,"prompt":"Préparer une recette sans comprendre les instructions","difficulty":"hard"},{"id":"mime-375","boxId":"food","active":true,"prompt":"Faire sauter une crêpe qui retombe sur la tête","difficulty":"hard"},{"id":"mime-376","boxId":"awkward","active":true,"prompt":"Faire tomber son téléphone dans les toilettes","difficulty":"easy"},{"id":"mime-377","boxId":"awkward","active":true,"prompt":"Arriver en retard à un rendez-vous","difficulty":"easy"},{"id":"mime-378","boxId":"awkward","active":true,"prompt":"Oublier le prénom de quelqu’un","difficulty":"easy"},{"id":"mime-379","boxId":"awkward","active":true,"prompt":"Se rendre compte que sa braguette est ouverte","difficulty":"easy"},{"id":"mime-380","boxId":"awkward","active":true,"prompt":"Ouvrir une bouteille qui explose","difficulty":"easy"},{"id":"mime-381","boxId":"awkward","active":true,"prompt":"Tenter de tuer un moustique dans le noir","difficulty":"easy"},{"id":"mime-382","boxId":"awkward","active":true,"prompt":"Recevoir une mauvaise note","difficulty":"easy"},{"id":"mime-383","boxId":"awkward","active":true,"prompt":"Envoyer un message à la mauvaise personne","difficulty":"medium"},{"id":"mime-384","boxId":"awkward","active":true,"prompt":"Croiser quelqu’un qu’on essaie d’éviter","difficulty":"medium"},{"id":"mime-385","boxId":"awkward","active":true,"prompt":"Faire semblant de reconnaître quelqu’un","difficulty":"medium"},{"id":"mime-386","boxId":"awkward","active":true,"prompt":"Essayer de retirer discrètement quelque chose coincé entre ses dents","difficulty":"medium"},{"id":"mime-387","boxId":"awkward","active":true,"prompt":"Être surpris en train de parler tout seul","difficulty":"medium"},{"id":"mime-388","boxId":"awkward","active":true,"prompt":"Perdre l’équilibre dans un bus","difficulty":"medium"},{"id":"mime-389","boxId":"awkward","active":true,"prompt":"Essayer d’ouvrir un emballage impossible","difficulty":"medium"},{"id":"mime-390","boxId":"awkward","active":true,"prompt":"Se tromper de porte et entrer chez un inconnu","difficulty":"hard"},{"id":"mime-391","boxId":"awkward","active":true,"prompt":"Faire tomber un gâteau juste avant une fête","difficulty":"hard"},{"id":"mime-392","boxId":"awkward","active":true,"prompt":"Se faire poursuivre par une oie","difficulty":"hard"},{"id":"mime-393","boxId":"awkward","active":true,"prompt":"Faire semblant de travailler quand quelqu’un arrive","difficulty":"hard"},{"id":"mime-394","boxId":"awkward","active":true,"prompt":"Découvrir une énorme araignée dans son lit","difficulty":"hard"},{"id":"mime-395","boxId":"awkward","active":true,"prompt":"Réaliser qu’on est monté dans le mauvais train","difficulty":"hard"}]}};

  const DIFFICULTY_LABELS = {
    easy: "Facile",
    medium: "Moyen",
    hard: "Difficile"
  };

  const el = {
    app: document.querySelector("#app"),
    screens: [...document.querySelectorAll(".screen")],
    homeScreen: document.querySelector("#homeScreen"),
    manageScreen: document.querySelector("#manageScreen"),
    countdownScreen: document.querySelector("#countdownScreen"),
    gameScreen: document.querySelector("#gameScreen"),
    resultsScreen: document.querySelector("#resultsScreen"),

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
    promptText: document.querySelector("#promptText"),
    answerText: document.querySelector("#answerText"),
    mimePromptText: document.querySelector("#mimePromptText"),
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
    resultPassed: document.querySelector("#resultPassed"),
    resultTotal: document.querySelector("#resultTotal"),
    resultDetails: document.querySelector("#resultDetails"),
    replayButton: document.querySelector("#replayButton"),
    homeButton: document.querySelector("#homeButton"),

    cardDialog: document.querySelector("#cardDialog"),
    cardForm: document.querySelector("#cardForm"),
    cardDialogTitle: document.querySelector("#cardDialogTitle"),
    closeCardDialogButton: document.querySelector("#closeCardDialogButton"),
    cancelCardButton: document.querySelector("#cancelCardButton"),
    cardIdInput: document.querySelector("#cardIdInput"),
    cardModeInput: document.querySelector("#cardModeInput"),
    lyricsEditorFields: document.querySelector("#lyricsEditorFields"),
    mimeEditorFields: document.querySelector("#mimeEditorFields"),
    cardPromptInput: document.querySelector("#cardPromptInput"),
    cardAnswerInput: document.querySelector("#cardAnswerInput"),
    cardTitleInput: document.querySelector("#cardTitleInput"),
    cardSourceInput: document.querySelector("#cardSourceInput"),
    mimePromptInput: document.querySelector("#mimePromptInput"),
    mimeDifficultyInput: document.querySelector("#mimeDifficultyInput"),
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
    copyDiagnosticButton: document.querySelector("#copyDiagnosticButton")
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
    settings: {
      selectedModeIds: ["lyrics", "mime"],
      vibrationEnabled: true,
      lastLibraryCheckAt: ""
    },
    modes: {}
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
        active: card.active !== false
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

      return {
        ...common,
        prompt: String(card.prompt || ""),
        difficulty: ["easy", "medium", "hard"].includes(card.difficulty) ? card.difficulty : "medium"
      };
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
      localCard.prompt !== officialCard.prompt
    ) return false;

    if (config.type === "lyrics") {
      return localCard.answer === officialCard.answer &&
        localCard.title === officialCard.title &&
        localCard.source === officialCard.source;
    }

    return localCard.difficulty === officialCard.difficulty;
  }

  function freshModeState(library) {
    return {
      officialLibrary: library,
      boxes: library.boxes.map(officialBoxFrom),
      cards: library.cards.map(officialCardFrom),
      selectedBoxIds: library.boxes.map(box => box.id),
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

    mode.cards = mode.cards.map(card => ({
      ...card,
      boxId: boxIds.has(card.boxId) ? card.boxId : UNCATEGORIZED_ID,
      active: card.active !== false,
      origin: card.origin || (officialCardIds.has(card.id) ? "official" : "personal"),
      locallyModified: card.locallyModified === true
    }));

    mode.selectedBoxIds = cleanIdList(mode.selectedBoxIds).filter(id => boxIds.has(id));

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
      state.modes[modeId] = freshModeState(library);
      return;
    }

    const officialBoxes = new Map(library.boxes.map(box => [box.id, box]));
    const officialCards = new Map(library.cards.map(card => [card.id, card]));

    const boxes = storedBoxes.map(box => {
      const official = officialBoxes.get(box.id);
      if (!official) {
        return {
          ...box,
          origin: box.origin || "personal",
          locallyModified: true,
          protected: box.id === UNCATEGORIZED_ID || box.protected === true
        };
      }

      return {
        ...box,
        origin: "official",
        locallyModified: box.locallyModified === true || !sameBoxAsOfficial(box, official),
        protected: box.id === UNCATEGORIZED_ID || box.protected === true
      };
    });

    const cards = storedCards.map(card => {
      const official = officialCards.get(card.id);
      if (!official) {
        return {
          ...card,
          active: card.active !== false,
          origin: card.origin || "personal",
          locallyModified: true
        };
      }

      return {
        ...card,
        active: card.active !== false,
        origin: "official",
        locallyModified: card.locallyModified === true || !sameCardAsOfficial(modeId, card, official)
      };
    });

    const localBoxIds = new Set(boxes.map(box => box.id));
    const localCardIds = new Set(cards.map(card => card.id));

    const selectedBoxIds = Array.isArray(storedSelection)
      ? storedSelection
      : (
          modeId === "lyrics" && Array.isArray(legacySettings?.selectedBoxIds)
            ? legacySettings.selectedBoxIds
            : boxes.map(box => box.id)
        );

    state.modes[modeId] = {
      officialLibrary: library,
      boxes,
      cards,
      selectedBoxIds,
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
          library.boxes
            .filter(box => box.id !== UNCATEGORIZED_ID && !localBoxIds.has(box.id))
            .map(box => box.id)
        )
      }
    };

    sanitizeMode(modeId, state.modes[modeId], library);
  }

  async function loadContent() {
    const legacySettings = safeParse(localStorage.getItem(LEGACY_SETTINGS_KEY), null);
    const globalSettings = safeParse(localStorage.getItem(GLOBAL_SETTINGS_KEY), null);

    state.settings = {
      selectedModeIds: Array.isArray(globalSettings?.selectedModeIds)
        ? globalSettings.selectedModeIds.filter(id => MODE_ORDER.includes(id))
        : [...MODE_ORDER],
      vibrationEnabled: globalSettings?.vibrationEnabled ?? legacySettings?.vibrationEnabled ?? true,
      lastLibraryCheckAt: String(globalSettings?.lastLibraryCheckAt || "")
    };

    if (state.settings.selectedModeIds.length === 0 && !globalSettings) {
      state.settings.selectedModeIds = [...MODE_ORDER];
    }

    for (const modeId of MODE_ORDER) {
      await loadMode(modeId, legacySettings);
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
    localStorage.setItem(config.storage.selection, JSON.stringify(mode.selectedBoxIds));
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

    return mode.cards
      .filter(card => card.active && selectedBoxes.has(card.boxId))
      .map(card => ({ ...card, modeId }));
  }

  function getPlayableCards() {
    return MODE_ORDER.flatMap(selectedCardsForMode);
  }

  function renderHomeData() {
    renderModeSelection();
    renderAdvancedSettings();
    el.vibrationToggle.checked = state.settings.vibrationEnabled;

    const count = getPlayableCards().length;
    el.availableCount.textContent =
      `${count} carte${count > 1 ? "s" : ""} disponible${count > 1 ? "s" : ""}`;
    el.startButton.disabled = count === 0;
  }

  function renderModeSelection() {
    el.modeSelectionList.innerHTML = "";

    MODE_ORDER.forEach(modeId => {
      const config = modeConfig(modeId);
      const mode = modeState(modeId);
      const selected = state.settings.selectedModeIds.includes(modeId);
      const playableCount = selectedCardsForMode(modeId).length;

      const block = document.createElement("section");
      block.className = `mode-selector${selected ? " selected" : ""}`;
      block.style.setProperty("--mode-color", config.color);

      const header = document.createElement("div");
      header.className = "mode-selector-header";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = selected;
      checkbox.setAttribute("aria-label", `Activer le mode ${config.name}`);
      checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
          if (!state.settings.selectedModeIds.includes(modeId)) {
            state.settings.selectedModeIds.push(modeId);
          }
        } else {
          state.settings.selectedModeIds =
            state.settings.selectedModeIds.filter(id => id !== modeId);
        }
        saveGlobalSettings();
        renderHomeData();
      });

      const title = document.createElement("div");
      title.className = "mode-selector-title";

      const strong = document.createElement("strong");
      strong.textContent = config.name;

      const small = document.createElement("small");
      small.textContent = config.description;

      title.append(strong, small);

      const count = document.createElement("span");
      count.className = "mode-selector-count";
      count.textContent = playableCount;

      header.append(checkbox, title, count);

      const boxes = document.createElement("div");
      boxes.className = "mode-box-list";

      mode.boxes.forEach(box => {
        const label = document.createElement("label");
        label.className = "box-choice";
        label.style.setProperty("--mode-color", config.color);

        const boxCheckbox = document.createElement("input");
        boxCheckbox.type = "checkbox";
        boxCheckbox.checked = mode.selectedBoxIds.includes(box.id);
        boxCheckbox.addEventListener("change", () => {
          if (boxCheckbox.checked) {
            if (!mode.selectedBoxIds.includes(box.id)) {
              mode.selectedBoxIds.push(box.id);
            }
          } else {
            mode.selectedBoxIds = mode.selectedBoxIds.filter(id => id !== box.id);
          }
          saveMode(modeId);
          renderHomeData();
        });

        const name = document.createElement("span");
        name.textContent = box.name;

        const boxCount = document.createElement("small");
        boxCount.textContent = activeCountForBox(modeId, box.id);

        label.append(boxCheckbox, name, boxCount);
        boxes.append(label);
      });

      block.append(header, boxes);
      el.modeSelectionList.append(block);
    });
  }

  function selectEverything() {
    state.settings.selectedModeIds = [...MODE_ORDER];
    MODE_ORDER.forEach(modeId => {
      modeState(modeId).selectedBoxIds = modeState(modeId).boxes.map(box => box.id);
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
      const values = config.type === "lyrics"
        ? [card.prompt, card.answer, card.title, card.source, getBoxName(modeId, card.boxId)]
        : [card.prompt, DIFFICULTY_LABELS[card.difficulty], getBoxName(modeId, card.boxId)];

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
      } else {
        title.textContent = card.prompt;
        subtitle.textContent = `${config.name} · ${DIFFICULTY_LABELS[card.difficulty]}`;
      }

      const badges = document.createElement("div");
      badges.className = "card-badges";

      const boxBadge = document.createElement("span");
      boxBadge.className = "box-badge";
      boxBadge.textContent = getBoxName(modeId, card.boxId);
      badges.append(boxBadge);

      if (config.type === "mime") {
        const difficulty = document.createElement("span");
        difficulty.className = `difficulty-badge ${card.difficulty}`;
        difficulty.textContent = DIFFICULTY_LABELS[card.difficulty];
        badges.append(difficulty);
      }

      main.append(title, subtitle, badges);

      const actions = document.createElement("div");
      actions.className = "manage-card-actions";
      actions.append(
        makeActionButton("Modifier", () => openCardEditor(modeId, card.id)),
        makeActionButton("Dupliquer", () => duplicateCard(modeId, card.id)),
        makeActionButton(
          card.active ? "Désactiver" : "Activer",
          () => toggleCard(modeId, card.id)
        ),
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

    el.cardDialogTitle.textContent =
      `${card ? "Modifier" : "Ajouter"} — ${config.name}`;
    el.cardIdInput.value = card?.id || "";
    el.cardModeInput.value = modeId;
    el.cardActiveInput.checked = card?.active !== false;

    el.lyricsEditorFields.classList.toggle("hidden", config.type !== "lyrics");
    el.mimeEditorFields.classList.toggle("hidden", config.type !== "mime");

    if (config.type === "lyrics") {
      el.cardPromptInput.value = card?.prompt || "";
      el.cardAnswerInput.value = card?.answer || "";
      el.cardTitleInput.value = card?.title || "";
      el.cardSourceInput.value = card?.source || "";
    } else {
      el.mimePromptInput.value = card?.prompt || "";
      el.mimeDifficultyInput.value = card?.difficulty || "medium";
    }

    populateBoxSelect(
      modeId,
      card?.boxId || mode.boxes[0]?.id || UNCATEGORIZED_ID
    );

    el.cardDialog.showModal();

    setTimeout(() => {
      if (config.type === "lyrics") el.cardPromptInput.focus();
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

    let data;

    if (config.type === "lyrics") {
      data = {
        prompt: el.cardPromptInput.value.trim(),
        answer: el.cardAnswerInput.value.trim(),
        title: el.cardTitleInput.value.trim(),
        source: el.cardSourceInput.value.trim(),
        boxId: el.cardBoxInput.value,
        active: el.cardActiveInput.checked
      };

      if (!data.prompt || !data.answer || !data.title || !data.source) {
        alert("Remplis tous les champs de la carte.");
        return;
      }
    } else {
      data = {
        prompt: el.mimePromptInput.value.trim(),
        difficulty: el.mimeDifficultyInput.value,
        boxId: el.cardBoxInput.value,
        active: el.cardActiveInput.checked
      };

      if (!data.prompt) {
        alert("Écris une consigne à mimer.");
        return;
      }
    }

    const id = el.cardIdInput.value;

    if (id) {
      const index = mode.cards.findIndex(card => card.id === id);
      if (index >= 0) {
        mode.cards[index] = {
          ...mode.cards[index],
          ...data,
          locallyModified: true
        };
      }
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
      backupSchemaVersion: 2,
      appVersion: APP_VERSION,
      exportedAt: new Date().toISOString(),
      settings: state.settings,
      modes: Object.fromEntries(
        MODE_ORDER.map(modeId => {
          const mode = modeState(modeId);

          return [modeId, {
            boxes: mode.boxes,
            cards: mode.cards,
            selectedBoxIds: mode.selectedBoxIds,
            libraryMeta: mode.libraryMeta
          }];
        })
      )
    };

    const blob = new Blob(
      [JSON.stringify(backup, null, 2)],
      { type: "application/json;charset=utf-8" }
    );

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `mdb-sauvegarde-${new Date().toISOString().slice(0,10)}.json`;
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function validBackup(data) {
    if (Number(data?.backupSchemaVersion) === 2) {
      return (
        data.settings &&
        data.modes &&
        MODE_ORDER.every(modeId =>
          Array.isArray(data.modes[modeId]?.boxes) &&
          Array.isArray(data.modes[modeId]?.cards)
        )
      );
    }

    if (Number(data?.backupSchemaVersion) === 1) {
      return (
        Array.isArray(data.boxes) &&
        Array.isArray(data.cards) &&
        data.settings &&
        data.libraryMeta
      );
    }

    return false;
  }

  async function restoreBackupFile(event) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    try {
      const data = JSON.parse(await file.text());

      if (!validBackup(data)) {
        throw new Error("Ce fichier n’est pas une sauvegarde MDB valide.");
      }

      if (!confirm(
        `Restaurer cette sauvegarde du ${formatDate(data.exportedAt)} ?\n\n` +
        "Les données actuellement présentes sur ce téléphone seront remplacées."
      )) return;

      if (Number(data.backupSchemaVersion) === 2) {
        state.settings = clone(data.settings);

        MODE_ORDER.forEach(modeId => {
          const restored = data.modes[modeId];
          const mode = modeState(modeId);

          mode.boxes = clone(restored.boxes);
          mode.cards = clone(restored.cards);
          mode.selectedBoxIds = clone(restored.selectedBoxIds || []);
          mode.libraryMeta = clone(restored.libraryMeta);

          sanitizeMode(modeId, mode, mode.officialLibrary);
        });
      } else {
        const lyrics = modeState("lyrics");
        lyrics.boxes = clone(data.boxes);
        lyrics.cards = clone(data.cards);
        lyrics.selectedBoxIds = clone(data.settings.selectedBoxIds || []);
        lyrics.libraryMeta = clone(data.libraryMeta);
        sanitizeMode("lyrics", lyrics, lyrics.officialLibrary);
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

    const isLyrics = config.type === "lyrics";
    el.lyricsGameContent.classList.toggle("hidden", !isLyrics);
    el.mimeGameContent.classList.toggle("hidden", isLyrics);

    if (isLyrics) {
      el.promptText.textContent = card.prompt;
      el.answerText.textContent = card.answer;
      el.cardMetaPrimary.textContent = card.title;
      el.cardMetaSecondary.textContent = card.source;
    } else {
      el.mimePromptText.textContent = card.prompt;
      el.cardMetaPrimary.textContent = getBoxName(card.modeId, card.boxId);
      el.cardMetaSecondary.textContent =
        DIFFICULTY_LABELS[card.difficulty] || "Moyen";
    }

    resetCardPosition();
    requestAnimationFrame(fitCardContent);
  }

  function fitCardContent() {
    el.gameCard.classList.remove("card-medium", "card-compact", "card-tiny");

    const card = state.currentCard;
    if (!card) return;

    const config = modeConfig(card.modeId);
    const length = config.type === "lyrics"
      ? card.prompt.length + card.answer.length
      : card.prompt.length;

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
      alert(
        "Sélectionne au moins un mode contenant une boîte " +
        "et une carte active."
      );
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
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true;

    const modeLines = MODE_ORDER.flatMap(modeId => {
      const config = modeConfig(modeId);
      const mode = modeState(modeId);

      return [
        `${config.name} — cartes : ${mode.cards.length}`,
        `${config.name} — boîtes : ${mode.boxes.length}`,
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
      `IndexedDB : ${"indexedDB" in window ? "Pris en charge" : "Non pris en charge"}`,
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
      button.addEventListener("click", () => {
        updateDurationSelection(
          Number(button.dataset.seconds)
        );
      });
    });

    el.customSeconds.addEventListener("input", () => {
      if (el.customSeconds.value !== "") {
        el.durationButtons.forEach(button =>
          button.classList.remove("selected")
        );
      }
    });

    el.startButton.addEventListener("click", startFlow);
    el.manageCardsButton.addEventListener(
      "click",
      openManageScreen
    );
    el.manageBackButton.addEventListener(
      "click",
      closeManageScreen
    );
    el.selectAllButton.addEventListener(
      "click",
      selectEverything
    );
    el.selectNoneButton.addEventListener(
      "click",
      selectNothing
    );

    el.vibrationToggle.addEventListener("change", () => {
      state.settings.vibrationEnabled =
        el.vibrationToggle.checked;
      saveGlobalSettings();
    });

    el.testValidVibrationButton.addEventListener(
      "click",
      () => vibrateForResult("valid", true)
    );

    el.testPassVibrationButton.addEventListener(
      "click",
      () => vibrateForResult("pass", true)
    );

    el.checkLibrariesButton.addEventListener(
      "click",
      checkLibraries
    );

    el.updateLibrariesButton.addEventListener(
      "click",
      updateLibraries
    );

    el.exportBackupButton.addEventListener(
      "click",
      exportBackup
    );

    el.restoreBackupButton.addEventListener(
      "click",
      () => el.restoreBackupInput.click()
    );

    el.restoreBackupInput.addEventListener(
      "change",
      restoreBackupFile
    );

    el.resetLibrariesButton.addEventListener(
      "click",
      resetLibraries
    );

    el.diagnosticButton.addEventListener(
      "click",
      openDiagnostic
    );

    el.cardSearchInput.addEventListener(
      "input",
      renderCardList
    );

    el.manageBoxFilter.addEventListener(
      "change",
      renderCardList
    );

    el.addCardButton.addEventListener(
      "click",
      () => openCardEditor(state.activeManageModeId)
    );

    el.manageBoxesButton.addEventListener(
      "click",
      openBoxesManager
    );

    el.cardForm.addEventListener(
      "submit",
      saveCard
    );

    el.closeCardDialogButton.addEventListener(
      "click",
      closeCardEditor
    );

    el.cancelCardButton.addEventListener(
      "click",
      closeCardEditor
    );

    el.closeBoxesDialogButton.addEventListener(
      "click",
      closeBoxesManager
    );

    el.doneBoxesButton.addEventListener(
      "click",
      closeBoxesManager
    );

    el.addBoxButton.addEventListener(
      "click",
      addBox
    );

    el.newBoxNameInput.addEventListener(
      "keydown",
      event => {
        if (event.key === "Enter") {
          event.preventDefault();
          addBox();
        }
      }
    );

    el.flipHomeButton.addEventListener(
      "click",
      toggleFlipped
    );

    el.flipGameButton.addEventListener(
      "click",
      toggleFlipped
    );

    el.undoButton.addEventListener(
      "click",
      undoLast
    );

    el.pauseButton.addEventListener(
      "click",
      () => togglePause()
    );

    el.resumeOverlayButton.addEventListener(
      "click",
      () => togglePause(false)
    );

    el.endButton.addEventListener(
      "click",
      () => finishGame("manual")
    );

    el.replayButton.addEventListener(
      "click",
      startFlow
    );

    el.homeButton.addEventListener(
      "click",
      goHome
    );

    el.copyDiagnosticButton.addEventListener(
      "click",
      copyDiagnostic
    );

    el.gameCard.addEventListener(
      "pointerdown",
      onPointerDown
    );

    el.gameCard.addEventListener(
      "pointermove",
      onPointerMove
    );

    el.gameCard.addEventListener(
      "pointerup",
      onPointerEnd
    );

    el.gameCard.addEventListener(
      "pointercancel",
      onPointerEnd
    );

    window.addEventListener(
      "beforeinstallprompt",
      event => {
        event.preventDefault();
        state.installPrompt = event;
        el.installButton.classList.remove("hidden");
      }
    );

    el.installButton.addEventListener(
      "click",
      async () => {
        if (!state.installPrompt) return;

        state.installPrompt.prompt();
        await state.installPrompt.userChoice;
        state.installPrompt = null;
        el.installButton.classList.add("hidden");
      }
    );

    window.addEventListener("appinstalled", () => {
      el.installButton.classList.add("hidden");
    });

    document.addEventListener(
      "visibilitychange",
      () => {
        if (
          document.visibilityState === "hidden" &&
          state.running &&
          !state.paused
        ) {
          togglePause(true);
        } else if (
          document.visibilityState === "visible" &&
          state.running
        ) {
          requestWakeLock();
        }
      }
    );

    window.addEventListener(
      "error",
      event => recordError(event.error || event.message)
    );

    window.addEventListener(
      "unhandledrejection",
      event => recordError(event.reason)
    );

    window.addEventListener(
      "keydown",
      event => {
        if (!state.running || state.paused) return;

        if (event.key === "ArrowRight") {
          commitSwipe("valid");
        }

        if (event.key === "ArrowLeft") {
          commitSwipe("pass");
        }

        if (event.key === "Backspace") {
          event.preventDefault();
          undoLast();
        }

        if (event.key === " ") {
          event.preventDefault();
          togglePause();
        }
      }
    );
  }

  async function init() {
    await loadContent();
    setFlipped(state.flipped);
    bindEvents();
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
