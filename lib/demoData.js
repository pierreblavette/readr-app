import { loadGBCache, saveGBCache } from "./bookUtils";

const DAY = 24 * 60 * 60 * 1000;

function makeBooks(now) {
  const books = [
    { title: "Dune", author: "Frank Herbert", year: "2020", genre: "Sci-fi", cover: "https://is1-ssl.mzstatic.com/image/thumb/Publication221/v4/eb/25/74/eb2574fd-be3b-1bff-cc40-7c9bab9bc6bc/9782221127483.jpg/600x600bb.jpg", apple: "https://books.apple.com/fr/book/dune-tome-1/id1531039307?uo=4", state: "finished", daysAgoFinish: 30, daysAgoStart: 45, rating: 5, note: "Politique, écologie, mysticisme.", synopsis: "Le chef-d'œuvre absolu de la science-fiction, adapté au cinéma par Denis Villeneuve. Traduction revue et corrigée. Il n'y a pas, dans tout l'Empire, de planète plus inhospitalière que Dune. Partout des sables à perte de vue. Une seule richesse : l'épice de longue vie, née du…" },
    { title: "1984", author: "George Orwell", year: "2024", genre: "Dystopie", cover: "https://is1-ssl.mzstatic.com/image/thumb/Publication122/v4/c1/53/dc/c153dcf9-dedf-ccae-ea6c-7d0339911de6/1984-OG-2022-5.png/600x600bb.jpg", apple: "https://books.apple.com/fr/book/1984/id1517999417?uo=4", state: "finished", daysAgoFinish: 48, daysAgoStart: 63, rating: 5, note: "Plus pertinent que jamais.", synopsis: "1984 is a dystopian novel by George Orwell written in 1948, which follows the life of Winston Smith, a low ranking member of ‘the Party’, who is frustrated by the omnipresent eyes of the party, and its ominous ruler Big Brother. ‘Big Brother’ controls every aspect of people’s…" },
    { title: "L'Étranger", author: "Albert Camus", year: "2012", genre: "Classique", cover: "https://is1-ssl.mzstatic.com/image/thumb/Publication221/v4/57/7e/f0/577ef0d8-38fa-cf1a-ceba-2c0ead263f76/9782072376429.jpg/600x600bb.jpg", apple: "https://books.apple.com/fr/book/l%C3%A9tranger/id524853057?uo=4", state: "finished", daysAgoFinish: 66, daysAgoStart: 81, rating: 5, note: "L'absurde, glaçant.", synopsis: "\"Quand la sonnerie a encore retenti, que la porte du box s'est ouverte, c'est le silence de la salle qui est monté vers moi, le silence, et cette singulière sensation que j'ai eue lorsque j'ai constaté que le jeune journaliste avait détourné les yeux. Je n'ai pas regardé du côté…" },
    { title: "Le Petit Prince", author: "Antoine de Saint-Exupéry", year: "2012", genre: "Classique", cover: "https://is1-ssl.mzstatic.com/image/thumb/Publication124/v4/0e/b4/1a/0eb41ac2-ddfa-004e-2f36-1486d87d2009/9782072431258.jpg/600x600bb.jpg", apple: "https://books.apple.com/fr/book/le-petit-prince/id545611394?uo=4", state: "finished", daysAgoFinish: 84, daysAgoStart: 99, rating: 5, synopsis: "\"J'ai ainsi vécu seul, sans personne avec qui parler véritablement, jusqu'à une panne dans le désert du Sahara, il y a six ans. Quelque chose s'était cassé dans mon moteur. Et comme je n'avais avec moi ni mécanicien, ni passagers, je me préparai à essayer de réussir, tout seul,…" },
    { title: "Les Misérables", author: "Victor Hugo", year: "1885", genre: "Classique", cover: "https://is1-ssl.mzstatic.com/image/thumb/Publication7/v4/c3/ea/2e/c3ea2e71-e8a6-7b2e-38b2-9133445afef2/coverArt.2311cd.jpg/600x600bb.jpg", apple: "https://books.apple.com/fr/book/les-mis%C3%A9rables-tome-i/id510969617?uo=4", state: "finished", daysAgoFinish: 102, daysAgoStart: 117, rating: 5, synopsis: "Le livre s'ouvre sur le portrait long et détaillé de monseigneur Myriel, l'évêque du diocèse de Digne, où il vit très modestement en compagnie de sa sœur Baptistine et d'une servante, Madame Magloire. Ce religieux est un juste qui se contente du strict nécessaire pour distribuer…" },
    { title: "Fahrenheit 451", author: "Ray Bradbury", year: "2023", genre: "Sci-fi", cover: "https://is1-ssl.mzstatic.com/image/thumb/Publication123/v4/98/88/f0/9888f03c-b8d2-268b-4f46-0e3347675cc4/9782207170809.jpg/600x600bb.jpg", apple: "https://books.apple.com/fr/book/fahrenheit-451/id6445459771?uo=4", state: "finished", daysAgoFinish: 120, daysAgoStart: 135, rating: 5, synopsis: "451 degrés Fahrenheit représentent la température à laquelle un livre s’enflamme et se consume. Dans cette société future où la lecture est considérée comme un acte antisocial, un corps spécial de pompiers est chargé de brûler tous les livres, dont la détention est interdite. Le…" },
    { title: "Pride and Prejudice", author: "Jane Austen", year: "1813", genre: "Classique", cover: "https://is1-ssl.mzstatic.com/image/thumb/Publication211/v4/c2/d3/13/c2d3135e-89c9-d032-12e3-46be81d32f50/BKS-WW-ABC-Pride_and_Prejudice-Jane_Austen.png/600x600bb.jpg", apple: "https://books.apple.com/fr/book/pride-and-prejudice/id395534643?uo=4", state: "finished", daysAgoFinish: 138, daysAgoStart: 153, rating: 5, synopsis: "An Apple Books Classic edition. Jane Austen’s beloved classic opens with this witty and very memorable line: “It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.” With all the twists and turns of a soap opera,…" },
    { title: "The Hobbit", author: "J.R.R. Tolkien", year: "2009", genre: "Fantasy", cover: "https://is1-ssl.mzstatic.com/image/thumb/Publication116/v4/dc/b9/16/dcb91663-fb27-71ce-e49e-c842e10406ad/9780007322602.jpg/600x600bb.jpg", apple: "https://books.apple.com/fr/book/the-hobbit/id375035258?uo=4", state: "finished", daysAgoFinish: 156, daysAgoStart: 171, rating: 5, synopsis: "This is the story of how a Baggins had an adventure, and found himself doing and saying things altogether unexpected… ‘A flawless masterpiece’ The Times Bilbo Baggins is a hobbit who enjoys a comfortable, unambitious life, rarely travelling further than the pantry of his…" },
    { title: "Le Casse du siècle", author: "Sarah Knafo", year: "2026", genre: "Essai", cover: "https://is1-ssl.mzstatic.com/image/thumb/Publication221/v4/9b/1e/6d/9b1e6d76-5361-493d-8093-1c7c5a48843c/9782213732329-001-x.jpeg/600x600bb.jpg", apple: "https://books.apple.com/fr/book/le-casse-du-si%C3%A8cle/id6795193017?uo=4", state: "reading", daysAgoStart: 3, synopsis: "Ils vous ont tout volé. Ils ont tout détruit. Et ils tiennent tout le système. Ils ont réussi le casse du siècle. Sarah Knafo s'est lancée sur leurs traces. Elle a réuni tous les indices, toutes les preuves, l'identité de tous les coupables, l'organigramme de toute leur…" },
    { title: "Kings of sin - tome 06", author: "Ana Huang", year: "2026", genre: "Romance", cover: "https://is1-ssl.mzstatic.com/image/thumb/Publication221/v4/5b/6c/78/5b6c78d9-7b0f-05f6-86e7-6ad284c4667b/9791042906023-001-x.jpeg/600x600bb.jpg", apple: "https://books.apple.com/fr/book/kings-of-sin-tome-06/id6761269066?uo=4", state: "reading", daysAgoStart: 9, synopsis: "Plongez dans la saga Kings Of Sin , sur les sept péchés capitaux, avec La colère (Tome 1), L'Orgueil (Tome 2), L'Avarice (Tome 3), La Paresse (Tome 4), L'Envie (Tome 5), La Gourmandise (Tome 6) et La Luxure (Tome 7), des romances à découvrir indépendamment, dans l'ordre que vous…" },
    { title: "The Sons of Death - tome 4", author: "Laura Ezrena", year: "2026", genre: "Romance", cover: "https://is1-ssl.mzstatic.com/image/thumb/Publication221/v4/73/80/1c/73801c7b-8f9f-d7cd-9764-81ded480221b/9782017307259-001-x.jpeg/600x600bb.jpg", apple: "https://books.apple.com/fr/book/the-sons-of-death-tome-4/id6783736831?uo=4", state: "reading", daysAgoStart: 5, synopsis: "Il pensait qu’elle était morte. Il avait tort. Huit cent quatre-vingt-huit jours. C’est le temps qu’il a fallu à Taylor Blake, nouveau président des Sons of Death, pour apprendre à survivre à l’absence de Maxine. Huit cent quatre-vingt-huit jours à veiller sur leur fils, bâtir…" },
    { title: "C'était ça ou mourir", author: "Thélyson Orélien", year: "2026", genre: "Roman", cover: "https://is1-ssl.mzstatic.com/image/thumb/Publication221/v4/e4/ad/e3/e4ade377-d87f-df92-ceee-28a1f6998ad6/9782246847076-001-x.jpeg/600x600bb.jpg", apple: "https://books.apple.com/fr/book/c%C3%A9tait-%C3%A7a-ou-mourir/id6779188241?uo=4", state: "finished", daysAgoFinish: 5, daysAgoStart: 18, rating: 5, note: "Lu d'une traite.", synopsis: "Le premier roman de Thélyson Orélien est déjà le phénomène littéraire de l’année 2026. En cours de traduction dans plus d’une vingtaine de langues, C’était ça ou mourir a conquis le Québec et bientôt le monde entier, en racontant l’Odyssée de Jonas Dorléon. Après l’embrasement…" },
    { title: "J'aurais aimé te tuer", author: "Pétronille Rostagnat", year: "2022", genre: "Roman", cover: "https://is1-ssl.mzstatic.com/image/thumb/Publication211/v4/86/79/70/8679708a-acc2-cb6b-caa1-499ec20411a2/9782501160995-001-x.jpeg/600x600bb.jpg", apple: "https://books.apple.com/fr/book/jaurais-aim%C3%A9-te-tuer/id1603609001?uo=4", state: "finished", daysAgoFinish: 12, daysAgoStart: 25, rating: 4, note: "Loubry au sommet.", synopsis: "Une jeune femme, Laura Turrel, se présente un matin au commissariat de Versailles pour s’accuser du meurtre de Bruno Delaunay, un homme qui aurait tenté de la violer. Le commandant Damien Deguire et son second Jonathan Pigeon, recueillent ses aveux. Légitime défense ? Crime…" },
    { title: "Pas de secrets entre nous", author: "Samantha Downing", year: "2021", genre: "Roman", cover: "https://is1-ssl.mzstatic.com/image/thumb/Publication211/v4/a8/24/b7/a824b7df-ff6c-c9dd-d118-31d8a9a5414c/9791093835778-001-x.jpeg/600x600bb.jpg", apple: "https://books.apple.com/fr/book/pas-de-secrets-entre-nous-prix-des-lectrices-2021/id6476982875?uo=4", state: "finished", daysAgoFinish: 19, daysAgoStart: 32, rating: 5, synopsis: "De temps en temps, on a comme une envie de meurtre... Quand il rencontre Millicent à bord d'un avion, c'est le coup de foudre. Quinze ans plus tard, le voilà marié, avec deux enfants, dans un quartier cossu de Woodview, sous le radieux soleil de Floride. Il donne des cours de…" },
    { title: "Attirés malgré nous - Marfil tome 1", author: "Mercedes Ron", year: "2026", genre: "Romance", cover: "https://is1-ssl.mzstatic.com/image/thumb/Publication221/v4/f4/f4/a0/f4f4a097-401f-d176-ea93-ea6709121f7f/9782017397311-001-x.jpeg/600x600bb.jpg", apple: "https://books.apple.com/fr/book/attir%C3%A9s-malgr%C3%A9-nous-marfil-tome-1/id6801112386?uo=4", state: "finished", daysAgoFinish: 26, daysAgoStart: 39, rating: 4, synopsis: "Tomber amoureuse de son garde du corps pourrait bien s’avérer pire que tous les dangers. Fille d'un puissant homme d'affaires, Marfil Cortés mène une vie privilégiée entre ses études à Columbia, sa passion pour la danse et les nuits effervescentes de New York. Jusqu'au jour où…" },
    { title: "Celle qui sait", author: "Riley Sager", year: "2026", genre: "Thriller", cover: "https://is1-ssl.mzstatic.com/image/thumb/Publication221/v4/99/ee/ef/99eeef4c-1f7c-4b7f-80fb-db3427e7d7bd/9782386433474.jpg/600x600bb.jpg", apple: "https://books.apple.com/fr/book/celle-qui-sait/id6767224898?uo=4", state: "finished", daysAgoFinish: 33, daysAgoStart: 46, rating: 3, note: "Feel-good malin.", synopsis: "TOUT LE MONDE EST CONVAINCU QUE LENORA HOPE EST LA TUEUSE. ET VOUS ? Le massacre de la famille Hope, lors d'une nuit sanglante de 1929, a bouleversé les habitants du Maine. Si la plupart des gens sont persuadés que Lenora, dix-sept ans, en est responsable, la police n’a jamais…" },
    { title: "Lieutenant Eve Dallas (Tome 60) - Liens du crime", author: "Nora Roberts", year: "2026", genre: "Thriller", cover: "https://is1-ssl.mzstatic.com/image/thumb/Publication211/v4/c7/cc/6a/c7cc6ad0-16c4-eedf-c983-e72f66ba52e8/9782290438404.jpg/600x600bb.jpg", apple: "https://books.apple.com/fr/book/lieutenant-eve-dallas-tome-60-liens-du-crime/id6802682722?uo=4", state: "finished", daysAgoFinish: 40, daysAgoStart: 53, rating: 5, synopsis: "Le dénommé Giovanni Rossi faisait autrefois partie d’une organisation secrète appelée « les Douze ». Répondant à un appel urgent, il se rend à New York. Et meurt quelques minutes après son arrivée... Le lieutenant Eve Dallas trouve l’affaire Rossi frustrante. Elle a une victime…" },
    { title: "Le Cercle de Kern - \"Impossible à oublier \" Maxime Chattam", author: "Alexis Laipsker", year: "2026", genre: "Thriller", cover: "https://is1-ssl.mzstatic.com/image/thumb/Publication211/v4/8e/fa/4b/8efa4b56-92b5-23b1-5ccd-c24784a7a0a3/9782749966120.jpg/600x600bb.jpg", apple: "https://books.apple.com/fr/book/le-cercle-de-kern-impossible-%C3%A0-oublier-maxime-chattam/id6794539908?uo=4", state: "finished", daysAgoFinish: 47, daysAgoStart: 60, rating: 4, synopsis: "Le nouveau thriller événement d'Alexis Laipkser. \"Un récit choral qui devient vite un infernal cercle vicieux\" Madame Figaro Un père qui cherche sa fille. Des villageois liés par un terrible secret. Une enquêtrice qui porte malheur. Un simple d'esprit qui dessine d'étranges…" },
    { title: "Intertwined Crowns", author: "Emma Saucet", year: "2026", genre: "Romance", cover: "https://is1-ssl.mzstatic.com/image/thumb/Publication221/v4/8c/f8/5b/8cf85b95-3c6b-5d50-0d04-701bb967e4d0/cover.jpg/600x600bb.jpg", apple: "https://books.apple.com/fr/book/intertwined-crowns/id6760346409?uo=4", state: "finished", daysAgoFinish: 54, daysAgoStart: 67, rating: 4, note: "Twist final imparable.", synopsis: "Fille illégitime du roi d’Elandor et orpheline de mère, Kamaya a passé sa vie à survivre dans un château où elle n’a jamais eu sa place. Mais le jour où le roi lui ordonne d’endosser l’identité de sa sœur aînée, l’héritière du trône, tout bascule : elle devra épouser le prince…" },
    { title: "Le dîner", author: "Freida McFadden", year: "2026", genre: "Thriller", cover: "https://is1-ssl.mzstatic.com/image/thumb/Publication221/v4/14/b3/b9/14b3b984-d34f-6e8a-4448-531e67e40d80/9782824624471-001-x.jpeg/600x600bb.jpg", apple: "https://books.apple.com/fr/book/le-d%C3%AEner/id6775776681?uo=4", state: "finished", daysAgoFinish: 61, daysAgoStart: 74, rating: 5, synopsis: "Vous êtes fauchée et vous risquez d’être expulsée de votre appartement. Alors quand une amie vous propose un job de serveuse lors d’un dîner chic dans un manoir totalement isolé, vous croyez rêver. Le salaire pour la soirée ? De quoi couvrir deux mois de loyer et vous remettre…" },
    { title: "Le Garçon éternel", author: "Jérôme Loubry", year: "2026", genre: "Thriller", cover: "https://is1-ssl.mzstatic.com/image/thumb/Publication221/v4/ff/49/2a/ff492ab2-8260-5236-47e8-adb60333a001/cover.jpg/600x600bb.jpg", apple: "https://books.apple.com/fr/book/le-gar%C3%A7on-%C3%A9ternel-prix-polar-2026/id6756896608?uo=4", state: "finished", daysAgoFinish: 68, daysAgoStart: 81, rating: 3, synopsis: "« L’une des plumes les plus fortes du thriller français » FranceInfo Culture « Des intrigues savamment construites » La Provence Une forêt en pleine nuit recèle bien des mystères. Ces deux adolescents partis chercher le succès en filmant leur aventure vont y trouver…" },
    { title: "Le Souffle des rêves", author: "Clarisse Sabard", year: "2023", genre: "Roman", cover: "https://is1-ssl.mzstatic.com/image/thumb/Publication221/v4/8c/8f/ac/8c8fac95-e23f-c872-abf1-5d1d58901aba/9782368127834.jpg/600x600bb.jpg", apple: "https://books.apple.com/fr/book/le-souffle-des-r%C3%AAves/id6445600778?uo=4", state: "finished", daysAgoFinish: 75, daysAgoStart: 88, rating: 4, synopsis: "1987. Abby a besoin de souffler. Depuis qu’elle essaye désespérément de tomber enceinte, ses relations avec son mari sont de plus en plus tendues. Alors, sur un coup de tête, elle fait ses valises pour la région de Cork, en Irlande, à la recherche de sa mère Caitlin, qui l’a…" },
    { title: "Mate", author: "Ali Hazelwood", year: "2026", genre: "Fantasy", cover: "https://is1-ssl.mzstatic.com/image/thumb/Publication221/v4/27/cd/ef/27cdef3c-bef7-a483-40d1-391d5d4ac22d/9782811228897-001-x.jpeg/600x600bb.jpg", apple: "https://books.apple.com/fr/book/mate/id6760400915?uo=4", state: "finished", daysAgoFinish: 82, daysAgoStart: 95, rating: 5, synopsis: "Par l'autrice de Bride et The Love Hypothesis Serena Paris est orpheline, sans meute, et unique en son genre. En révélant son statut de première hybride humaine-louve-garou, elle était censée remédier à une division vieille de plusieurs siècles entre les espèces. À la place,…" },
    { title: "La ballade de Pern - intégrale", author: "Anne Inez McCaffrey", year: "2020", genre: "Épopées fantasy", cover: "https://is1-ssl.mzstatic.com/image/thumb/Publication211/v4/63/b5/53/63b55305-fa09-0cd4-e965-f758e6495be3/12287fa9-ac2c-4712-ab8f-956b7521b791_cover_image.png/600x600bb.jpg", apple: "https://books.apple.com/fr/book/la-ballade-de-pern-int%C3%A9grale/id6769233830?uo=4", state: "finished", daysAgoFinish: 89, daysAgoStart: 102, rating: 4, note: "Page-turner.", synopsis: "Découvrez La Ballade de Pern, l’univers légendaire créé par Anne McCaffrey, une œuvre incontournable de la fantasy et de la science-fiction. Cette intégrale fascinante transporte les lecteurs sur la planète Pern, un monde extraordinaire où les dragons télépathes et leurs…" },
    { title: "Kings of the Ice - tome 4 - Save your breath", author: "Kandi Steiner", year: "2026", genre: "Romance", cover: "https://is1-ssl.mzstatic.com/image/thumb/Publication211/v4/66/2b/8e/662b8e6a-7289-535e-afb5-276944378df6/9782226515131.jpg/600x600bb.jpg", apple: "https://books.apple.com/fr/book/kings-of-the-ice-tome-4-save-your-breath/id6784465876?uo=4", state: "finished", daysAgoFinish: 96, daysAgoStart: 109, rating: 3, synopsis: "Aleks Suter est son meilleur ami d’enfance. Mais pour Mia, il est tellement plus... Juste avant la sortie de son nouvel album, Mia Love – pop star mondialement connue – est désespérée de voir un critique influent décrier son art. C’est pourtant son album le moins commercial ,…" },
    { title: "L'Adolescence du perroquet", author: "Amélie Nothomb", year: "2026", genre: "Roman", cover: "https://is1-ssl.mzstatic.com/image/thumb/Publication221/v4/68/15/17/6815177d-c1a7-89e5-1059-52c511caf85e/9782226514929.jpg/600x600bb.jpg", apple: "https://books.apple.com/fr/book/ladolescence-du-perroquet/id6771580174?uo=4", state: "finished", daysAgoFinish: 103, daysAgoStart: 116, rating: 4, synopsis: "« L’amour n’est pas un dû. » Amélie Nothomb Amélie Nothomb est née à Kobé en 1967. Dès son premier roman, Hygiène de l’assassin , elle s’est imposée comme une écrivaine singulière. En 1999, elle a obtenu le Grand Prix de l’Académie française pour Stupeur et tremblement et, en…" },
    { title: "Briar university - Tome 02", author: "Elle Kennedy", year: "2019", genre: "Romance", cover: "https://is1-ssl.mzstatic.com/image/thumb/Publication123/v4/b6/9f/11/b69f11a8-b0f7-6088-179f-8c07af470eae/9782755646207-001-x.jpeg/600x600bb.jpg", apple: "https://books.apple.com/fr/book/briar-university-tome-02/id6445271010?uo=4", state: "finished", daysAgoFinish: 110, daysAgoStart: 123, rating: 5, synopsis: "Brenna sera-t-elle assez téméraire pour se mettre à dos son père ainsi que tous ses amis ? Brenna, la fille de l'entraîneur de l'équipe de hockey de Briar, a un caractère bien trempé. Elle ne se laisse jamais marcher sur les pieds et se fiche totalement de ce que les gens…" },
    { title: "Le Pacte des Héritières - Livre 1, Alina", author: "Lucie Castel", year: "2026", genre: "Roman", cover: "https://is1-ssl.mzstatic.com/image/thumb/Publication211/v4/57/d9/be/57d9be90-7494-d1fb-3b41-f2d29cefacd5/9782378155544-001-x.jpeg/600x600bb.jpg", apple: "https://books.apple.com/fr/book/le-pacte-des-h%C3%A9riti%C3%A8res-livre-1-alina/id6759716886?uo=4", state: "finished", daysAgoFinish: 117, daysAgoStart: 130, rating: 4, synopsis: "Alina a grandi sans attaches, traçant seule son chemin. À Paris, de retour dans son modeste appartement après avoir été renvoyée de son travail, elle découvre une mystérieuse enveloppe — une invitation au mariage le plus fastueux de Venise, accompagnée d’une phrase troublante :…" },
    { title: "Nous aussi", author: "Anne Godard", year: "2026", genre: "Roman", cover: "https://is1-ssl.mzstatic.com/image/thumb/Publication221/v4/60/da/ef/60daef57-d7a6-07d5-54d6-387e423f8eaf/9782330225612.jpg/600x600bb.jpg", apple: "https://books.apple.com/fr/book/nous-aussi/id6768961194?uo=4", state: "finished", daysAgoFinish: 124, daysAgoStart: 137, rating: 4, synopsis: "On fait partie d’une grande famille. On sait qu’on est privilégiés. On vit ensemble, dans notre immeuble au centre de Paris, on se retrouve l’été dans notre maison à la montagne. On trouve que c’est normal. C’est chez nous, c’est à nous, c’est pour nous. On se ressemble, on se…" },
    { title: "Lakestone - tome 1", author: "Sarah Rivens", year: "2023", genre: "Romance", cover: "https://is1-ssl.mzstatic.com/image/thumb/Publication126/v4/e4/6e/0c/e46e0ccd-c3ea-6245-b5be-a23ab26ab1c7/9782017207801-001-x.jpeg/600x600bb.jpg", apple: "https://books.apple.com/fr/book/lakestone-tome-1/id6463405987?uo=4", state: "finished", daysAgoFinish: 131, daysAgoStart: 144, rating: 3, synopsis: "Dans la tranquillité trompeuse de la ville d'Ewing aux États-Unis, Iris, confinée à la bibliothèque, est plongée dans ses révisions. À des kilomètres de là, un mercenaire affronte le froid tranchant de la nuit, aussi glaciale que le cadavre qu'il vient d’enterrer. Ils n’ont rien…" },
    { title: "Lords en péril (Tome 1)", author: "Sabrina Jeffries", year: "2026", genre: "Romance", cover: "https://is1-ssl.mzstatic.com/image/thumb/Publication211/v4/ed/07/9b/ed079b7d-f99e-070e-bbc9-675d33fa9686/9782290429662.jpg/600x600bb.jpg", apple: "https://books.apple.com/fr/book/lords-en-p%C3%A9ril-tome-1-un-esprit-libre/id6802703804?uo=4", state: "finished", daysAgoFinish: 138, daysAgoStart: 151, rating: 5, synopsis: "De retour dans un Londres qu’il ne reconnaît plus après avoir passé des années en détention, Jonathan Leighton apprend qu’il a hérité d’un duché. Rongé par la culpabilité de ne pas avoir pu sauver son ancien mentor, il s’est promis de trouver un époux à la fille de celui-ci,…" },
    { title: "Leave me behind", author: "K. M. Moronova", year: "2026", genre: "Romance", cover: "https://is1-ssl.mzstatic.com/image/thumb/Publication221/v4/69/83/98/698398bf-0a0e-bda7-693c-4403ef69d180/9782385791766.jpg/600x600bb.jpg", apple: "https://books.apple.com/fr/book/leave-me-behind/id6765688228?uo=4", state: "finished", daysAgoFinish: 145, daysAgoStart: 158, rating: 4, synopsis: "\" Ensemble, même brisés, on peut tout affronter. \" Seule survivante de l'escouade d'élite Riøt, décimée lors d'une mission en Patagonie, Nell Gallows est déterminée à découvrir qui a ordonné le massacre de ses camarades. Envoyée dans l'unité la plus redoutée des Forces Obscures,…" },
    { title: "Verity", author: "Colleen Hoover", year: "2026", genre: "Thriller", cover: "https://is1-ssl.mzstatic.com/image/thumb/Publication211/v4/d7/1f/14/d71f1406-a1b1-8ac6-25cd-4ae138b481ed/9782755648720-001-x.jpeg/600x600bb.jpg", apple: "https://books.apple.com/fr/book/verity/id6445271135?uo=4", state: "finished", daysAgoFinish: 152, daysAgoStart: 165, rating: 3, synopsis: "Toute vériTé n'est pas bonne à dire La vie a toujours souri à Verity Crawford.ses livres font d'elle une auteur star, sa maison du Vermont est splendideet elle forme avec Jeremy, son mari, un couple parfait. Mais un jour, sur une route, son rêve tourne au cauchemar. L'accident…" },
    { title: "Code Yesterday", author: "Michel Bussi", year: "2026", genre: "Thriller", cover: "https://is1-ssl.mzstatic.com/image/thumb/Publication211/v4/82/bc/5f/82bc5f78-d193-42ed-7ec1-7620c98eb4ba/9782258215283.jpg/600x600bb.jpg", apple: "https://books.apple.com/fr/book/code-yesterday-le-nouveau-polar-de-michel-bussi/id6786531747?uo=4", state: "finished", daysAgoFinish: 159, daysAgoStart: 172, rating: 4, synopsis: "Et si le mythe des Beatles cachait un secret inimaginable ? Michel Bussi nous ouvre les coulisses du groupe le plus légendaire du rock, dans un suspense jubilatoire. John, Paul, George, Ringo : ils étaient quatre. Enfin, c'est ce qu'on a toujours voulu vous faire croire...…" },
    { title: "Le boyfriend", author: "Freida McFadden", year: "2025", genre: "Thriller", cover: "https://is1-ssl.mzstatic.com/image/thumb/Publication221/v4/fb/b5/e2/fbb5e27f-40c1-cebf-2e5e-571f268235f9/9782824626598-001-x.jpeg/600x600bb.jpg", apple: "https://books.apple.com/fr/book/le-boyfriend/id6749051701?uo=4", state: "finished", daysAgoFinish: 166, daysAgoStart: 179, rating: 5, synopsis: "Célibataire, Sydney n’a jamais eu vraiment de chance en amour. Jusqu’au jour où elle rencontre Tom. Il est charmant, séduisant, et médecin dans un hôpital. C’est l’homme idéal et Sydney est conquise. Et puis, un jour, le meurtre barbare d’une femme sème la terreur dans la ville.…" },
    { title: "La Révolte de la reine", author: "Morgane Moncomble", year: "2026", genre: "Romance", cover: "https://is1-ssl.mzstatic.com/image/thumb/Publication211/v4/da/31/8b/da318b1a-fe38-0855-d46f-5876e1b8dee8/9791042905842-001-x.jpeg/600x600bb.jpg", apple: "https://books.apple.com/fr/book/la-r%C3%A9volte-de-la-reine/id6758663001?uo=4", state: "finished", daysAgoFinish: 173, daysAgoStart: 186, rating: 4, synopsis: "La Révolte de la Reine est le premier tome d' Inhéritance , la nouvelle trilogie de Morgane Moncomble. 1788, Versailles. Acacia se voit endosser un rôle qu’elle aurait tout donné pour éviter : reine de France. Pour le peuple, elle incarne l’espoir d’un pays à bout de souffle.…" },
    { title: "La Sorcière & le Loup - Intégrale", author: "Léa Trys", year: "2026", genre: "Fantasy", cover: "https://is1-ssl.mzstatic.com/image/thumb/Publication211/v4/43/20/4d/43204d89-f9bc-fd5b-e2d4-df79aa19a4fc/cover.jpg/600x600bb.jpg", apple: "https://books.apple.com/fr/book/la-sorci%C3%A8re-le-loup-int%C3%A9grale/id6804736511?uo=4", synopsis: "À Brocéliande, les légendes ne racontent qu’une partie de la vérité. Morwën Le Fay est thanatopractrice, sorcière et passeuse d’âmes. Lorsqu’un défunt arrive sur sa table, elle ne se contente pas de préparer son corps : elle accompagne aussi son esprit vers l’Autre Monde. Alors…" },
    { title: "Love Me - Hate Me Tome 3", author: "Oxanna SK", year: "2026", genre: "Romance", cover: "https://is1-ssl.mzstatic.com/image/thumb/Publication221/v4/fe/26/b2/fe26b2d2-d3bb-be1a-c1b2-9dd2e5dfce6a/9782017269991-001-x.jpeg/600x600bb.jpg", apple: "https://books.apple.com/fr/book/love-me-hate-me-tome-3/id6795881509?uo=4", synopsis: "Il l’a fuie pour la protéger… mais certains liens ne se brisent jamais. Après seize mois d'exil volontaire à Paris, hanté par les fantômes d'une enfance marquée par la violence et la culpabilité, Aaron rentre enfin à Chicago. Il sait qu'il est toxique, qu'il ressemble trop à son…" },
    { title: "Windy City # 2 - The Right Move - Tome 2", author: "Liz Tomforde", year: "2025", genre: "Romance", cover: "https://is1-ssl.mzstatic.com/image/thumb/Publication221/v4/73/d3/66/73d36634-e8c7-d06b-29b7-a2054f972196/9782385790462.jpg/600x600bb.jpg", apple: "https://books.apple.com/fr/book/windy-city-2-the-right-move-tome-2/id6739447847?uo=4", synopsis: "Ryan Je suis le nouveau capitaine des Devils, l'équipe NBA de Chicago, et la dernière chose dont j'avais besoin cette année était qu'Indy Ivers, la meilleure amie de ma soeur, emménage dans mon appartement. Elle est désordonnée, émotive et bien trop tentante. Mais lorsque le…" },
    { title: "Les Liens de la reine", author: "Charmaine Pauls", year: "2026", genre: "Romance", cover: "https://is1-ssl.mzstatic.com/image/thumb/Publication211/v4/3a/0c/8c/3a0c8ce1-3653-b65b-853c-8fca3b021ad2/93f0db2f-6f80-4524-aa21-c86471a4fbee_cover_image.jpg/600x600bb.jpg", apple: "https://books.apple.com/fr/book/les-liens-de-la-reine/id6799269215?uo=4", synopsis: "Il m’offre sa protection, mais le lit d’un tueur, ce n’est pas vraiment un endroit sûr. Je me suis mise dans une situation délicate. Des gens puissants, des deux côtés de la loi, veulent ma peau. Un tueur a besoin que je reste en vie pour ses propres raisons égoïstes, des…" },
    { title: "Atlas : L'Histoire de Pa Salt", author: "Lucinda Riley", year: "2024", genre: "Romance", cover: "https://is1-ssl.mzstatic.com/image/thumb/Publication221/v4/61/3a/a1/613aa16b-d82c-0a67-498a-b5dd728f5a30/9782368127902.jpg/600x600bb.jpg", apple: "https://books.apple.com/fr/book/atlas-lhistoire-de-pa-salt/id6445639919?uo=4", synopsis: "La conclusion des Sept Sœurs, la série qui a conquis 30 millions de lecteurs ! 1928, Paris. Un jeune garçon est découvert, presque mort, au détour d’une ruelle. Doux et talentueux, il devient bien vite un membre à part entière de la famille qui l’a recueilli et découvre à son…" },
    { title: "JE", author: "Lilia Hassaine", year: "2026", genre: "Roman", cover: "https://is1-ssl.mzstatic.com/image/thumb/Publication211/v4/60/c1/9a/60c19ae9-e3d6-793e-d2af-98512515af3d/9782073099976.jpg/600x600bb.jpg", apple: "https://books.apple.com/fr/book/je/id6778836212?uo=4", synopsis: "\" — Que savez-vous de la beauté, Antoinette ? Il se tourna vers moi, suspendu à ma réponse. — Pas grand-chose. Mais je sais la reconnaître quand elle est là. — Eh bien moi, chaque fois que je la vois, elle me blesse. Quand je vois votre visage, par exemple, quelque chose en moi…" },
    { title: "Ta mère et moi", author: "Guillaume de Tonquédec", year: "2026", genre: "Roman", cover: "https://is1-ssl.mzstatic.com/image/thumb/Publication211/v4/41/20/81/41208183-f167-0278-72f3-6f7876793ca7/9782234111493-001-x.jpeg/600x600bb.jpg", apple: "https://books.apple.com/fr/book/ta-m%C3%A8re-et-moi/id6796647900?uo=4", synopsis: "« Papa a été clair, “Je t’aime, je veux faire ma vie avec toi. Alors soit on se marie, soit on ne se voit plus.” L’ultimatum est sans appel pour toi maman. Tout a rejailli : la rencontre à la gare, la naissance des chats, le bain de mer, le rôti brûlé, l’année passée sans…" },
    { title: "L'inconnue du quai de Javel", author: "Philippe Jaenada", year: "2026", genre: "Roman", cover: "https://is1-ssl.mzstatic.com/image/thumb/Publication221/v4/68/0a/7f/680a7f44-82f0-de43-f84b-c417565a9869/9782080490902.jpg/600x600bb.jpg", apple: "https://books.apple.com/fr/book/linconnue-du-quai-de-javel/id6769685932?uo=4", synopsis: "Le 6 septembre 1949, une jeune femme est retrouvée morte quai de Javel, à Paris, sans sac ni chaussures, manifestement rhabillée à la hâte puis déposée là par son assassin. Elle est identifiée le lendemain : c’est Louise Cansot, le modèle le plus demandé par les peintres de…" },
    { title: "Friday Hard Play", author: "Sara Ney", year: "2026", genre: "Romance", cover: "https://is1-ssl.mzstatic.com/image/thumb/Publication211/v4/4b/cd/54/4bcd5483-725c-0b75-52c2-ba4d4537ce2e/cover.jpg/600x600bb.jpg", apple: "https://books.apple.com/fr/book/friday-hard-play/id6761184993?uo=4", synopsis: "Teddy a un plan : décrocher son diplôme d’ingénierie, payer son loyer et éviter les gars problématiques. Ce qui exclut les rugbymen de la résidence du campus, surtout qu’ils sont immenses et semblent regarder les autres de haut. Sauf que ses amies l’abandonnent systématiquement…" },
    { title: "Off-campus - Tome 02", author: "Elle Kennedy", year: "2026", genre: "Romance", cover: "https://is1-ssl.mzstatic.com/image/thumb/Publication221/v4/84/2b/f3/842bf306-a2de-5547-a20c-ace81dc5b86f/9782755626933-001-x.jpeg/600x600bb.jpg", apple: "https://books.apple.com/fr/book/off-campus-tome-02/id6445271925?uo=4", synopsis: "C'est un joueur et pas uniquement sur le terrain... John Logan est un star de l'équipe de Hockey ce qui lui permet d'avoir toutes les filles qu'il veut. Mais derrière ses sourires de tueurs et son charme ravageur, se cache un être blessé et inquiet de son avenir qui ne s'annonce…" },
    { title: "La femme de ménage voit tout", author: "Freida McFadden", year: "2024", genre: "Thriller", cover: "https://is1-ssl.mzstatic.com/image/thumb/Publication211/v4/4a/8c/c7/4a8cc7e3-41c6-4fca-4c89-7bf6d910740b/9782824627946-001-x.jpeg/600x600bb.jpg", apple: "https://books.apple.com/fr/book/la-femme-de-m%C3%A9nage-voit-tout/id6670250261?uo=4", synopsis: "Après avoir été au service des autres en tant que femme de ménage, Millie s’est enfin construit une vie à elle. Elle vient même d’emménager dans une belle maison, dans une petite impasse chic et tranquille, avec son mari et ses deux enfants. Mais son rêve d’une vie paisible est…" },
    { title: "The Sons of Death - tome 3", author: "Laura Ezrena", year: "2026", genre: "Romance", cover: "https://is1-ssl.mzstatic.com/image/thumb/Publication221/v4/98/88/7c/98887c8d-4348-27d5-8174-fed683ae474d/9782017269892-001-x.jpeg/600x600bb.jpg", apple: "https://books.apple.com/fr/book/the-sons-of-death-tome-3/id6755879555?uo=4", synopsis: "Ils pensaient avoir tout perdu. Mais le pire reste à venir. Quand Taylor découvre l’état de santé de Maxine, il disparaît. Trois mois de silence. À son retour, plus rien n’est comme avant : Maxine a changé, lui aussi. Le temps presse. Le cœur de Maxine flanche, et la mort rôde,…" },
  ];

  const wishlistRaw = [
    { title: "Campus drivers - Tome 01", author: "C S Quill", year: "2020", genre: "Romance", cover: "https://is1-ssl.mzstatic.com/image/thumb/Publication123/v4/f8/94/73/f8947340-9b7b-2f2e-d142-81659f3747a7/9782755684339-001-x.jpeg/600x600bb.jpg", apple: "https://books.apple.com/fr/book/campus-drivers-tome-01/id6445270990?uo=4", synopsis: "L'année universitaire qui débute promet d'être radieuse pour Lane O'Neill. Campus Drivers, l'application qu'il a fondée avec ses meilleurs amis, cartonne. Le concept est simple : jouer les taxis pour étudiant, au volant de voitures de collection. Les filles en raffolent, et les…" },
    { title: "Captive - tome 2", author: "Sarah Rivens", year: "2022", genre: "Romance", cover: "https://is1-ssl.mzstatic.com/image/thumb/Publication122/v4/de/59/4f/de594f9c-d58d-86de-9051-7fccaf150eed/9782017207603-001-x.jpeg/600x600bb.jpg", apple: "https://books.apple.com/fr/book/captive-tome-2/id6443354003?uo=4", synopsis: "Entre guerres de pouvoir, famille de cœur, nouvelles chances et trahisons, la dynastie des Scott est sur le point de vivre un nouveau tournant. Une année s’est écoulée depuis qu’Asher a arraché Ella à sa nouvelle vie. Et tandis que la jeune femme essaie de panser ses blessures,…" },
    { title: "Réclamée par le Roi des Loups: Une Romance Paranormale Sombre entre Compagnons Destinés et Rejetés", author: "Gwen Roselyn", year: "2026", genre: "Fantasy", cover: "https://is1-ssl.mzstatic.com/image/thumb/Publication221/v4/e6/b8/eb/e6b8eb30-cb85-fb93-96d7-f6903f906de0/0004420441.jpg/600x600bb.jpg", apple: "https://books.apple.com/fr/book/r%C3%A9clam%C3%A9e-par-le-roi-des-loups-une-romance-paranormale/id6811337544?uo=4", synopsis: "Elle a été rejetée devant toute sa meute et s'est entendu dire qu'elle ne serait jamais à la hauteur. Il était l'Alpha le plus redouté du Nord-Est — emprisonné, trahi et laissé à pourrir sous terre pendant plus d'un siècle. Aucun des deux n'était censé survivre à la nuit où elle…" },
    { title: "La Route du Diable", author: "Franck Thilliez", year: "2026", genre: "Horreur", cover: "https://is1-ssl.mzstatic.com/image/thumb/Publication211/v4/c3/1b/3e/c31b3ec6-0c17-c72e-7c18-545f29af525e/9782265160187.jpg/600x600bb.jpg", apple: "https://books.apple.com/fr/book/la-route-du-diable/id6781140307?uo=4", synopsis: "Embarquez pour un voyage sans retour... Taïga nord-américaine, été 2017. Abigaël se dirige enfin vers la fameuse route du Diable. Un an plus tôt, c'est sur cette voie isolée longue de 666 kilomètres que sa fille Iris et son petit-ami Mathis ont cessé de donner signe de vie.…" },
    { title: "La prof", author: "Freida McFadden", year: "2025", genre: "Thriller", cover: "https://is1-ssl.mzstatic.com/image/thumb/Publication211/v4/ac/0f/12/ac0f1265-6ffc-935a-71aa-052ffea5b9f7/9782824629766-001-x.jpeg/600x600bb.jpg", apple: "https://books.apple.com/fr/book/la-prof/id6742742482?uo=4", synopsis: "Chaque matin, Eve se lève et embrasse tendrement son mari, Nate. Ils partent au travail ensemble, au lycée où elle enseigne les mathématiques et où Nate est professeur d’anglais. Une vie parfaite, réglée comme du papier à musique. Tranquille. Pourtant, l’année dernière, l’école…" },
    { title: "Kings of sin - tome 01", author: "Ana Huang", year: "2025", genre: "Romance", cover: "https://is1-ssl.mzstatic.com/image/thumb/Publication211/v4/fa/56/b7/fa56b73f-8acc-bda4-4cdf-b09aa39791f5/9782755681611-001-x.jpeg/600x600bb.jpg", apple: "https://books.apple.com/fr/book/kings-of-sin-tome-01/id6736684652?uo=4", synopsis: "Plongez dans la saga Kings Of Sin , sur les sept péchés capitaux, avec La colère (Tome 1), L'Orgueil (Tome 2), L'Avarice (Tome 3), La Paresse (Tome 4), L'Envie (Tome 5), La Gourmandise (Tome 6) et La Luxure (Tome 7), des romances à découvrir indépendamment, dans l'ordre que vous…" },
    { title: "Le Retour du Revenant", author: "Kross Shadows", year: "2026", genre: "Fantasy", cover: "https://is1-ssl.mzstatic.com/image/thumb/Publication221/v4/b2/14/50/b214508e-569f-1d5d-585a-f4cba4602228/0004316342.jpg/600x600bb.jpg", apple: "https://books.apple.com/fr/book/le-retour-du-revenant/id6811079021?uo=4", synopsis: "La Terre a changé. Lui aussi. Après un séjour tumultueux dans l'étrange école interdimensionnelle du Quartet, Max est enfin de retour sur sa planète natale. Mais le monde qu'il connaissait n'existe plus. Ravagée par l'invasion implacable des monstres, la société s'est…" },
    { title: "Guide utilisateur iOS 27", author: "Rose E. Jackson", year: "2026", genre: "Systèmes d’exploitation", cover: "https://is1-ssl.mzstatic.com/image/thumb/Publication211/v4/59/70/ec/5970ec65-f6b6-a9f5-62fe-3a3584e7f45f/142db15f-9919-4b89-bf2c-2b2dfb9b39bb_cover_image.jpg/600x600bb.jpg", apple: "https://books.apple.com/fr/book/guide-utilisateur-ios-27/id6785231158?uo=4", synopsis: "Avez-vous déjà mis à jour votre iPhone pour constater que les réglages que vous connaissiez ont changé de place, que de nouvelles fonctionnalités sont apparues et que des tâches pourtant simples semblent soudain plus compliquées ? Vous avez peut-être entendu parler d’Apple…" },
    { title: "Et la joie de vivre", author: "Gisèle Pelicot", year: "2026", genre: "Sciences sociales", cover: "https://is1-ssl.mzstatic.com/image/thumb/Publication211/v4/69/5e/0c/695e0c6e-54a9-ab74-5fea-1f94100d4a2c/9782080497307.jpg/600x600bb.jpg", apple: "https://books.apple.com/fr/book/et-la-joie-de-vivre/id6752358472?uo=4", synopsis: "Le 2 septembre 2024 s’ouvre le procès de Mazan et la France découvre le visage de Gisèle Pelicot. Décidée à ce que \"la honte change de camp\", elle a voulu et obtenu que ce procès soit public. Son courage bouleverse le monde entier à mesure que l’horreur des crimes qu’elle a…" },
    { title: "Vers la beauté", author: "David Foenkinos", year: "2019", genre: "Roman", cover: "https://is1-ssl.mzstatic.com/image/thumb/Publication113/v4/10/49/57/104957bc-8981-dc62-9c73-9c753ab51efc/9782072824432.jpg/600x600bb.jpg", apple: "https://books.apple.com/fr/book/vers-la-beaut%C3%A9/id1459405860?uo=4", synopsis: "Antoine Duris est professeur aux Beaux-Arts de Lyon. Du jour au lendemain, il décide de tout quitter pour devenir gardien de salle au musée d’Orsay. Personne ne comprend cette surprenante reconversion de la part d’un spécialiste de Modigliani. Qu’a-t-il vécu pour fuir ainsi ?…" },
    { title: "Guide du Routard Kenya Tanzanie 2026/27", author: "Collectif", year: "2025", genre: "Tourisme et voyages", cover: "https://is1-ssl.mzstatic.com/image/thumb/Publication211/v4/97/1a/41/971a416f-c388-574a-76d8-c4d8d6cf0fe6/9782017323938-001-x.jpeg/600x600bb.jpg", apple: "https://books.apple.com/fr/book/guide-du-routard-kenya-tanzanie-2026-27/id6752702578?uo=4", synopsis: "Cet ebook est la version numérique du guide. Réserves des superlatifs, ces pays d’une beauté époustouflante ont de quoi satisfaire les rêves d’évasion : plages de sable blanc, volcan, savanes, forêts et déserts, plongées, safaris… Autant qu’un voyage dans l’espace, une incursion…" },
    { title: "Un sombre été", author: "Vera Buck", year: "2026", genre: "Thriller", cover: "https://is1-ssl.mzstatic.com/image/thumb/Publication211/v4/20/9c/13/209c1308-b194-869c-9e28-1d7874fe97b5/9782404022291-001-x.jpeg/600x600bb.jpg", apple: "https://books.apple.com/fr/book/un-sombre-%C3%A9t%C3%A9/id6775776930?uo=4", synopsis: "Une villa délabrée vendue un euro dans un village fantôme en Sardaigne : pour Tilda, architecte allemande, c’est une aubaine. À la recherche d’un nouveau départ, elle souhaite rénover l’endroit et tourner la page sur son douloureux passé. Mais l’apparence idyllique du lieu est…" },
    { title: "Kings of sin - tome 04", author: "Ana Huang", year: "2025", genre: "Romance", cover: "https://is1-ssl.mzstatic.com/image/thumb/Publication221/v4/d6/3d/3d/d63d3dfc-ad80-1cfd-324d-07aa5ec07edb/9791042900403-001-x.jpeg/600x600bb.jpg", apple: "https://books.apple.com/fr/book/kings-of-sin-tome-04/id6747751363?uo=4", synopsis: "Plongez dans la saga Kings Of Sin , sur les sept péchés capitaux, avec La colère (Tome 1), L'Orgueil (Tome 2), L'Avarice (Tome 3), La Paresse (Tome 4), L'Envie (Tome 5), La Gourmandise (Tome 6) et La Luxure (Tome 7), des romances à découvrir indépendamment, dans l'ordre que vous…" },
    { title: "Comme toi", author: "Lisa Jewell", year: "2019", genre: "Roman", cover: "https://is1-ssl.mzstatic.com/image/thumb/Publication116/v4/19/e5/8e/19e58e8c-c059-0173-4385-f48f153f4cf1/9782811229412-001-x.jpeg/600x600bb.jpg", apple: "https://books.apple.com/fr/book/comme-toi/id6476985150?uo=4", synopsis: "Une troublante impression de déjà-vu... Ellie a disparu à l'âge de quinze ans. Sa mère n'a jamais réussi à faire son deuil, d'autant plus que la police n'a retrouvé ni le coupable ni le corps. Dix ans plus tard, cette femme brisée doit pourtant se résoudre à tourner la page.…" },
    { title: "La femme de ménage", author: "Freida McFadden", year: "2023", genre: "Thriller", cover: "https://is1-ssl.mzstatic.com/image/thumb/Publication112/v4/df/c6/61/dfc661fb-7824-9cd8-7601-26b94a6439fb/9782824637167-001-x.jpeg/600x600bb.jpg", apple: "https://books.apple.com/fr/book/la-femme-de-m%C3%A9nage/id6444698763?uo=4", synopsis: "Chaque jour, Millie fait le ménage dans la belle maison des Winchester, une riche famille new-yorkaise. Elle récupère aussi leur fille à l'école et prépare les repas avant d'aller se coucher dans sa chambre, au grenier. Pour la jeune femme, ce nouveau travail est une chance…" },
    { title: "La Sœur du soleil", author: "Lucinda Riley", year: "2021", genre: "Romance", cover: "https://is1-ssl.mzstatic.com/image/thumb/Publication221/v4/d0/e3/b4/d0e3b493-7397-7dc0-1134-662b6f974c77/9782368125601.jpg/600x600bb.jpg", apple: "https://books.apple.com/fr/book/la-s%C5%93ur-du-soleil/id6445595891?uo=4", synopsis: "Electra d’Apliese a tout pour elle : mannequin le plus en vue de la planète, elle est belle, riche et célèbre. Mais derrière cette image idéale, c’est une jeune femme perdue depuis la mort de son père, Pa Salt, un milliardaire excentrique qui l’a adoptée avec ses six sœurs.…" },
  ];

  let id = now;
  const owned = books.map((b, i) => {
    const bookId = id++;
    const startedAt = b.daysAgoStart != null ? now - b.daysAgoStart * DAY : null;
    const finishedAt = b.daysAgoFinish != null ? now - b.daysAgoFinish * DAY : null;
    return {
      id: bookId,
      title: b.title,
      author: b.author,
      year: b.year,
      genre: b.genre,
      cover: b.cover,
      apple: b.apple ?? null,
      startedAt,
      finishedAt,
      rating: b.rating ?? null,
      note: b.note ?? null,
      addedToLibraryAt: startedAt ? startedAt - 2 * DAY : now - (60 + i) * DAY,
    };
  });

  const wishlist = wishlistRaw.map((b, i) => ({
    id: id++,
    title: b.title,
    author: b.author,
    year: b.year,
    genre: b.genre,
    cover: b.cover,
    apple: b.apple ?? null,
    startedAt: null,
    finishedAt: null,
    rating: null,
    note: null,
  }));

  const coverCache = {};
  const addToCache = (b) => {
    coverCache[`${b.title}||${b.author}`] = {
      thumb: b.cover,
      year: b.year,
      description: b.synopsis || null,
      appleUrl: b.apple ?? null,
      source: b.apple ? 'applebooks' : null,
    };
  };
  books.forEach(addToCache);
  wishlistRaw.forEach(addToCache);

  return { owned, wishlist, nextId: id, coverCache };
}

function makeQuotes(owned, now, startId) {
  const quotesByTitle = {
    "Dune": [
      { text: "Fear is the mind-killer. Fear is the little-death that brings total obliteration.", page: "12" },
      { text: "He who controls the spice controls the universe.", page: "187" },
    ],
    "1984": [
      { text: "Big Brother is watching you.", page: "3" },
      { text: "War is peace. Freedom is slavery. Ignorance is strength.", page: "18" },
    ],
    "L'Étranger": [
      { text: "Aujourd'hui, maman est morte. Ou peut-être hier, je ne sais pas.", page: "1" },
      { text: "Comme si cette grande colère m'avait purgé du mal, vidé d'espoir.", page: "184" },
    ],
    "Le Petit Prince": [
      { text: "On ne voit bien qu'avec le cœur. L'essentiel est invisible pour les yeux.", page: "72" },
      { text: "Tu deviens responsable pour toujours de ce que tu as apprivoisé.", page: "74" },
    ],
    "Les Misérables": [
      { text: "Aimer ou avoir aimé, cela suffit. Ne demandez rien ensuite.", page: "928" },
      { text: "La suprême félicité de la vie, c'est la conviction qu'on est aimé.", page: "141" },
    ],
    "Fahrenheit 451": [
      { text: "It was a pleasure to burn.", page: "1" },
      { text: "We need not to be let alone. We need to be really bothered once in a while.", page: "82" },
    ],
    "Pride and Prejudice": [
      { text: "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.", page: "1" },
      { text: "I could easily forgive his pride, if he had not mortified mine.", page: "20" },
    ],
    "The Hobbit": [
      { text: "In a hole in the ground there lived a hobbit.", page: "1" },
      { text: "It's a dangerous business, going out your door.", page: "82" },
    ],
  };

  let id = startId;
  const quotes = [];
  let dayOffset = 0;
  for (const book of owned) {
    const quotesForBook = quotesByTitle[book.title];
    if (!quotesForBook) continue;
    for (const q of quotesForBook) {
      const createdAt = (book.finishedAt ?? book.startedAt ?? now) + dayOffset * DAY * 0.3;
      quotes.push({
        id: id++,
        text: q.text,
        bookTitle: book.title,
        bookAuthor: book.author,
        bookId: book.id,
        page: q.page,
        saved: Math.random() < 0.35,
        createdAt: Math.min(createdAt, now),
      });
      dayOffset++;
    }
  }
  return { quotes, nextId: id };
}

function makeWords(now, startId) {
  const raw = [
    { word: "ephemeral", lang: "en", defs: [{ pos: "adj.", meaning: "Lasting for a very short time.", example: "An ephemeral moment of joy." }] },
    { word: "petrichor", lang: "en", defs: [{ pos: "n.", meaning: "The pleasant earthy smell after rain falls on dry soil." }] },
    { word: "sonder", lang: "en", defs: [{ pos: "n.", meaning: "The realization that each random passerby is living a life as vivid as your own." }] },
    { word: "limerence", lang: "en", defs: [{ pos: "n.", meaning: "A state of intense romantic infatuation." }] },
    { word: "saudade", lang: "en", defs: [{ pos: "n.", meaning: "A deep emotional state of nostalgic longing for an absent something." }] },
    { word: "ineffable", lang: "en", defs: [{ pos: "adj.", meaning: "Too great to be expressed in words." }] },
    { word: "serendipity", lang: "en", defs: [{ pos: "n.", meaning: "The occurrence of events by chance in a happy way." }] },
    { word: "ataraxia", lang: "en", defs: [{ pos: "n.", meaning: "A state of serene calmness, freedom from emotional disturbance." }] },
    { word: "mellifluous", lang: "en", defs: [{ pos: "adj.", meaning: "Sweet or musical; pleasant to hear." }] },
    { word: "susurrus", lang: "en", defs: [{ pos: "n.", meaning: "A whispering, murmuring, or rustling sound." }] },
    { word: "halcyon", lang: "en", defs: [{ pos: "adj.", meaning: "Denoting a period of time in the past that was idyllically happy and peaceful." }] },
    { word: "quixotic", lang: "en", defs: [{ pos: "adj.", meaning: "Exceedingly idealistic; unrealistic and impractical." }] },
    { word: "nefarious", lang: "en", defs: [{ pos: "adj.", meaning: "Wicked or criminal." }] },
    { word: "flâner", lang: "fr", defs: [{ pos: "v.", meaning: "Se promener sans but, en prenant son temps." }] },
    { word: "dépaysement", lang: "fr", defs: [{ pos: "n.m.", meaning: "Sentiment de se retrouver dans un environnement totalement différent." }] },
    { word: "anachorète", lang: "fr", defs: [{ pos: "n.m.", meaning: "Personne qui se retire du monde pour vivre dans la solitude." }] },
    { word: "ressac", lang: "fr", defs: [{ pos: "n.m.", meaning: "Retour violent des vagues sur elles-mêmes après avoir frappé un obstacle." }] },
    { word: "atavisme", lang: "fr", defs: [{ pos: "n.m.", meaning: "Réapparition d'un caractère ancestral après plusieurs générations." }] },
    { word: "estran", lang: "fr", defs: [{ pos: "n.m.", meaning: "Zone littorale alternativement couverte et découverte par la marée." }] },
    { word: "lambiner", lang: "fr", defs: [{ pos: "v.", meaning: "Agir avec lenteur, traîner." }] },
    { word: "onirique", lang: "fr", defs: [{ pos: "adj.", meaning: "Qui évoque le rêve, qui a le caractère du rêve." }] },
    { word: "palimpseste", lang: "fr", defs: [{ pos: "n.m.", meaning: "Manuscrit dont on a effacé la première écriture pour en tracer une nouvelle." }] },
    { word: "nyctalope", lang: "fr", defs: [{ pos: "adj.", meaning: "Qui voit dans l'obscurité, la nuit." }] },
    { word: "sérendipité", lang: "fr", defs: [{ pos: "n.f.", meaning: "Fait de découvrir par hasard, et avec bonheur, ce que l'on ne cherchait pas." }] },
  ];

  let id = startId;
  return raw.map((w, i) => ({
    id: id++,
    word: w.word,
    lang: w.lang,
    definitions: w.defs,
    createdAt: now - (i * 3 + Math.floor(Math.random() * 2)) * DAY,
  }));
}

function makeCollections(owned, startId) {
  const byTitle = Object.fromEntries(owned.map(b => [b.title, b.id]));
  const raw = [
    { name: "Classiques", titles: ["Dune", "1984", "L'Étranger", "Le Petit Prince", "Les Misérables", "Fahrenheit 451", "Pride and Prejudice", "The Hobbit"] },
    { name: "Thrillers 2026", titles: ["Celle qui sait", "Le dîner", "Le Garçon éternel", "Verity", "Code Yesterday"] },
    { name: "Romance", titles: ["Intertwined Crowns", "Leave me behind", "La Révolte de la reine", "Les Liens de la reine", "Friday Hard Play"] },
  ];

  let id = startId;
  return raw.map(c => ({
    id: id++,
    name: c.name,
    bookIds: c.titles.map(t => byTitle[t]).filter(Boolean),
  }));
}

export function loadDemoData() {
  const now = Date.now();
  const { owned, wishlist, nextId: idAfterBooks, coverCache } = makeBooks(now);
  const { quotes, nextId: idAfterQuotes } = makeQuotes(owned, now, idAfterBooks);
  const words = makeWords(now, idAfterQuotes);
  const collections = makeCollections(owned, idAfterQuotes + words.length);
  const goal = { year: new Date(now).getFullYear(), count: 30 };

  try {
    localStorage.setItem("readr-data", JSON.stringify({ owned, wishlist }));
    localStorage.setItem("readr-quotes", JSON.stringify(quotes));
    localStorage.setItem("readr-dict-words", JSON.stringify(words));
    localStorage.setItem("readr-collections", JSON.stringify(collections));
    localStorage.setItem("readr-reading-goal", JSON.stringify(goal));
    saveGBCache({ ...loadGBCache(), ...coverCache });
    return { ok: true, counts: { books: owned.length, wishlist: wishlist.length, quotes: quotes.length, words: words.length, collections: collections.length } };
  } catch (e) {
    return { ok: false, error: String(e) };
  }
}

export function wipeAllData() {
  const keys = [
    "readr-data",
    "readr-quotes",
    "readr-dict-words",
    "readr-collections",
    "readr-reading-goal",
    "readr-tab",
    "readr-active-collection",
    "readr-sidebar-collapsed",
  ];
  try {
    keys.forEach(k => localStorage.removeItem(k));
    return { ok: true };
  } catch (e) {
    return { ok: false, error: String(e) };
  }
}
