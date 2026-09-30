/* Contenuti dei case study.
   Ogni progetto è una sequenza di "blocchi" che main.js trasforma in markup:
   text · list · steps · stats · gallery · videos · highlight · palette. */
window.PROJECTS = [
  {
    id: "buddyjob",
    name: "BuddyJob",
    tag: "Social Media · Content Strategy",
    color: "var(--lavender)",
    ink: "var(--mist)",
    cover: { src: "assets/buddyjob/brand/logo.webp", alt: "Logo BuddyJob", fit: "logo" },
    title: "Leggere il lavoro. Poi raccontarlo.",
    desc: "Per BuddyJob trasformo conversazioni, trend e situazioni quotidiane in contenuti capaci di informare, creare riconoscimento e far partecipare la community.",
    link: { href: "https://www.instagram.com/buddyjob_it/", label: "Instagram" },
    skills: ["Research & Social Listening", "Concept", "Copywriting", "Format", "Editorial Design", "Social Media Management"],
    question: "Come rendere interessante un argomento di cui parlano già tutti?",
    intro: [
      "Il lavoro è ovunque sui social: colloqui, burnout, stipendi, carriera, colleghi, dimissioni.",
      "La sfida non era trovare qualcosa di cui parlare, ma trovare ogni volta un modo diverso di farlo.",
      "Per BuddyJob lavoro sui contenuti social dalla ricerca all'idea, fino a copy e sviluppo visivo, cercando un equilibrio tra informazione, attualità, riconoscibilità ed engagement."
    ],
    blocks: [
      { type: "text", kicker: "Il mio ruolo", paras: ["Osservo conversazioni, trend e notizie sul mondo del lavoro e cerco l'angolo che può diventare BuddyJob. A volte significa approfondire. A volte spiegare. A volte basta un meme fatto nel momento giusto."] },
      { type: "text", title: "Un profilo non si costruisce post per post.", paras: [
        "Per BuddyJob ho lavorato alla costruzione di un sistema editoriale che non riguarda solo cosa pubblicare nel feed, ma anche come accompagnare chi arriva sul profilo.",
        "Ho sviluppato un piano editoriale capace di alternare informazione, attualità, format ricorrenti, conversazioni della community e contenuti più leggeri, lasciando allo stesso tempo spazio a trend e temi che emergono nel momento.",
        "Anche le Stories e le raccolte in evidenza fanno parte di questo lavoro: sono pensate per orientare chi scopre BuddyJob, spiegare servizi e strumenti e rendere il profilo più facile da esplorare."
      ] },
      { type: "highlight", html: "Ogni contenuto ha un ruolo. <em>Anche quando non finisce nel feed.</em>" },
      { type: "list", kicker: "Cosa raccontiamo", items: [
        ["Informare", "Dati, trend e dinamiche del lavoro."],
        ["Approfondire", "Carriera, coaching e situazioni professionali."],
        ["Intercettare", "News, conversazioni e social listening."],
        ["Creare relazione", "Meme, community e contenuti riconoscibili."],
        ["Sperimentare", "Format e nuovi linguaggi visuali."]
      ] },
      { type: "list", kicker: "Come organizziamo il profilo", items: [
        ["Feed", "Contenuti editoriali, format e contenuti pianificati."],
        ["Stories", "Attualità, interazione, approfondimento e contenuti di servizio."],
        ["Highlights", "Contenuti evergreen pensati per orientare chi arriva sul profilo, spiegare BuddyJob, i servizi e gli strumenti disponibili."]
      ] },
      { type: "stats", kicker: "I numeri · 1 giugno — 10 settembre 2026", items: [
        [3.7, "M", "visualizzazioni organiche", "+127,4%"],
        [2.6, "M", "persone raggiunte", "+128,2%"],
        [288.8, "K", "interazioni con i contenuti", "+176,5%"],
        [10395, "", "nuovi follow", "+255,3%"]
      ] },
      { type: "text", kicker: "Parte del sistema: Intercettare", title: "Leggere i commenti prima di scrivere il post.", paras: [
        "Una notizia molto discussa aveva acceso online una conversazione sui comportamenti normalizzati sul posto di lavoro.",
        "Invece di fermarmi alla notizia, sono andata a vedere come ne stavano parlando le persone. Nei commenti ricorrevano continuamente le stesse frasi."
      ] },
      { type: "highlight", html: "Da lì è nato: <em>“10 frasi che in un ambiente di lavoro sono red flags”</em>." },
      { type: "gallery", dir: "assets/buddyjob/redflags/", items: ["cover", "tutti-devono-saper-fare-tutto", "siamo-una-grande-famiglia", "io-non-faccio-pausa-pranzo", "ringrazia-di-avere-un-lavoro", "deve-essere-pronto-per-ieri", "puoi-rimanere-tanto", "ora-si-ricomincia", "faccio-questo-lavoro-da-20-anni", "sei-pagato-per-lavorare", "impegno-e-passione"] },
      { type: "stats", small: true, items: [[1.5, "M", "persone raggiunte"], [113, "K", "interazioni"], [29, "K", "condivisioni"], [19.8, "K", "salvataggi"], [5068, "", "follow generati"]] },
      { type: "text", paras: ["Il contenuto non nasceva dal trend in sé, ma da quello che le persone stavano dicendo intorno al trend."] },
      { type: "text", kicker: "Parte del sistema: Creare relazione", title: "Non tutti i contenuti devono spiegare qualcosa.", paras: [
        "Dopo una settimana di temi più densi, il feed ha anche bisogno di respirare.",
        "I meme fanno parte del content mix di BuddyJob proprio per questo: intercettano situazioni quotidiane, creano riconoscimento e danno alla community qualcosa da mandare immediatamente a un collega."
      ] },
      { type: "gallery", dir: "assets/buddyjob/meme/", items: ["drama", "work", "september"] },
      { type: "stats", small: true, items: [[223, "K", "persone raggiunte"], [29.6, "K", "interazioni"], [14.6, "K", "condivisioni"], [13.1, "K", "like/reazioni"], [1390, "", "salvataggi"], [113, "", "nuovi follow"]] },
      { type: "text", paras: ["In questo caso le condivisioni hanno superato i like: il contenuto non è stato soltanto apprezzato, è diventato qualcosa da mandare a qualcun altro."] },
      { type: "text", kicker: "Parte del sistema: Informare + Sperimentare", title: "Un trend nuovo ha bisogno anche di una forma nuova.", paras: [
        "Quando soft-on day e soft-off day hanno iniziato a entrare nella conversazione online sul lavoro, ho approfondito il fenomeno e costruito un contenuto che ne spiegasse significato e contesto.",
        "Fotografia, tipografia, collage, riferimenti digitali e movimento cambiano lungo il carosello seguendo il contenuto, invece di costringerlo dentro un unico template."
      ] },
      { type: "gallery", dir: "assets/buddyjob/softdays/", items: ["cover", "switch", "pink", "equity", "animation-01.mp4", "soft-off-day", "fast-company", "non-sappiamo-ancora", "animation-02.mp4", "preferiresti"] }
    ],
    closing: {
      title: "Trasformare quello che succede nel mondo del lavoro in contenuti che valga la pena fermarsi a leggere.",
      text: "Per BuddyJob costruisco contenuti partendo da conversazioni, trend, dati e situazioni quotidiane. Il formato cambia ogni volta; l'obiettivo resta costruire una voce riconoscibile e una community che abbia voglia di partecipare."
    }
  },
  {
    id: "epicode",
    name: "EPICODE",
    tag: "Social Media · Content Strategy",
    color: "var(--graphite)",
    ink: "var(--mist)",
    cover: { src: "assets/epicode/brand/logo-cover.webp", alt: "Logo EPICODE", fit: "logo" },
    title: "Capire il tech abbastanza da saperlo raccontare.",
    desc: "Ricerca, contenuti e community management per costruire una voce tech competente, accessibile e riconoscibile.",
    link: { href: "https://www.instagram.com/epicode.official/", label: "Instagram" },
    skills: ["News Research", "Content Ideation", "Copywriting", "Editorial Design", "Publishing", "Community Management"],
    question: "Come racconti il tech se non è il tuo settore?",
    intro: [
      "Quando ho iniziato a lavorare su EPICODE, il tech non era il mio settore.",
      "La sfida quindi non era fingere di conoscere ciò che non conoscevo, ma trovare un metodo per capire prima di raccontare.",
      "Ricerca, fonti verticali, newsletter e confronto con il team sono diventati il punto di partenza per trasformare temi spesso tecnici in contenuti comprensibili, attuali e coerenti con la voce del brand.",
      "La direzione editoriale, sviluppata insieme al team, ruotava intorno a un concetto preciso: lo “zio tech”. Qualcuno che il settore lo conosce, ma te lo racconta senza mettersi in cattedra."
    ],
    blocks: [
      { type: "highlight", html: "Non dovevo sapere tutto. <em>Dovevo sapere dove cercare, cosa verificare e come renderlo comprensibile.</em>" },
      { type: "text", kicker: "Cosa faccio", paras: [
        "Cerco temi e notizie attraverso newsletter e fonti di settore, individuo quelli che possono diventare contenuto, sviluppo concept, copy e visual e seguo la pubblicazione.",
        "Mi occupo anche della gestione della community, con particolare attenzione ai contenuti ADV, dove commenti, dubbi e obiezioni diventano una parte importante del rapporto tra brand e pubblico."
      ] },
      { type: "text", title: "Prima capire. Poi tradurre.", paras: [
        "Non arrivando dal settore tech, ho costruito una routine di ricerca che mi permettesse di orientarmi tra temi, linguaggi e notizie prima di trasformarli in contenuti.",
        "Newsletter verticali, fonti di settore e approfondimenti diventano il punto di partenza. Il lavoro successivo consiste nel capire quale parte della storia è davvero interessante per la community e trovare il modo più semplice — ma non semplicistico — per raccontarla."
      ] },
      { type: "steps", items: ["Fonti", "Ricerca", "Selezione", "Angolo editoriale", "Contenuto"] },
      { type: "list", kicker: "Una voce, più modi di farla vivere", items: [
        ["Relevance", "News e cultura tech."],
        ["Community", "Meme, partecipazione e linguaggio condiviso."],
        ["Trust", "Alumni e storie reali."]
      ] },
      { type: "text", kicker: "Parte del sistema: Relevance", title: "Portare l'attualità tech dentro il feed, in modo comprensibile.", paras: [
        "La ricerca partiva da newsletter e fonti verticali. Il lavoro non consisteva semplicemente nel riportare una notizia, ma nel capire quali temi potessero essere rilevanti per la community e trovare un angolo capace di renderli accessibili e interessanti."
      ] },
      { type: "highlight", html: "Il post su Joseph Weizenbaum ed ELIZA parte dalla storia del primo chatbot per arrivare a una domanda contemporanea: <em>quale confine umano non dovrebbe mai superare l'intelligenza artificiale?</em>" },
      { type: "gallery", dir: "assets/epicode/eliza/", items: ["cover", "slide-2", "slide-3", "slide-4", "cta"] },
      { type: "stats", small: true, items: [[1067, "", "interazioni nette"], [289, "", "salvataggi"], [137, "", "condivisioni"], [31, "", "follow"]] },
      { type: "text", kicker: "Parte del sistema: Community", title: "Quando il contenuto lo sceglie anche la community.", paras: [
        "Ogni sabato il feed lasciava spazio ai meme creati dalla community EPICODE: parlare la lingua di chi il mondo tech lo vive davvero e creare un appuntamento riconoscibile.",
        "Il format è poi diventato un vero torneo. Ogni martedì alcuni meme venivano messi in sfida nelle Stories: la community votava i preferiti e il risultato determinava anche l'ordine di pubblicazione."
      ] },
      { type: "gallery", dir: "assets/epicode/meme/", items: ["cybersecurity", "switch-compleanno", "token-ai", "windows-defender", "feature-produzione"] },
      { type: "highlight", html: "Community crea.<br>Community vota.<br><em>Il brand rimette tutto in circolo.</em>" },
      { type: "gallery", dir: "assets/epicode/meme-tournament/", items: ["cover", "meme-1", "meme-2", "meme-3", "meme-4", "poll"] },
      { type: "stats", small: true, items: [[123963, "", "visualizzazioni"], [78.5, "K", "persone raggiunte"], [4875, "", "interazioni"], [1580, "", "condivisioni"], [87, "", "follow"]] },
      { type: "text", kicker: "Parte del sistema: Trust", title: "Far parlare il brand attraverso chi l'ha vissuto.", paras: [
        "Le storie degli alumni rendono la promessa del brand più concreta attraverso persone, percorsi e lavori reali.",
        "Il format parte dalla persona, racconta cosa fa oggi, traduce il suo ruolo in attività comprensibili e ricostruisce il percorso che l'ha portata fin lì."
      ] },
      { type: "gallery", dir: "assets/epicode/alumni/", items: ["cover", "linkedin-vs-davvero", "giornata-tipo", "panettiere-a-developer", "percorso-epicode", "lavoro-oggi", "cosa-ha-imparato", "final-story"] },
      { type: "text", title: "A volte la risposta a un commento può diventare contenuto.", paras: [
        "I video ADV di EPICODE generavano molti commenti: domande, dubbi, critiche. Insieme al team abbiamo trasformato alcune obiezioni ricorrenti in un set di Stories, con le persone di EPICODE a metterci la faccia."
      ] },
      { type: "highlight", html: "Dietro al logo, <em>persone riconoscibili.</em>" },
      { type: "stats", kicker: "Risultati generali · 1 giugno — 7 settembre 2026", items: [
        [36.3, "M", "visualizzazioni", "+7,4%"],
        [4.9, "M", "copertura", "+16,8%"],
        [89.9, "K", "interazioni con i contenuti", "+54,7%"],
        [7661, "", "nuovi follow", "+24,6%"],
        [148, "K", "clic sul link", "+15,2%"],
        [67, "K", "visite al profilo", "+36,3%"]
      ] },
      { type: "text", small: true, paras: ["Alcuni contenuti sono stati supportati da campagne paid: le metriche generali comprendono distribuzione organica e a pagamento."] }
    ],
    closing: {
      title: "Non serve appartenere a un settore per imparare a raccontarlo bene.",
      text: "Su EPICODE ho imparato a costruire credibilità attraverso ricerca, ascolto e traduzione. Capire prima di scrivere, trovare fonti affidabili, scegliere l'angolo giusto e cambiare formato in base all'obiettivo."
    }
  },
  {
    id: "sinapss",
    name: "Video",
    tag: "Video Production · Motion",
    color: "var(--olive)",
    ink: "var(--mist)",
    cover: { src: "assets/sinapss/brand/veramente-cover.webp", alt: "Logo Veramente · Abitudini Italiane", fit: "logo" },
    title: "Montare con la musica, non sopra.",
    desc: "Shooting, montaggio e motion per contenuti social sviluppati per brand e linguaggi diversi.",
    secondary: "Esperienza in agenzia · Sinapss",
    skills: ["Shooting List", "Shooting", "Editing", "Motion"],
    question: "Il ritmo si costruisce prima ancora del montaggio.",
    intro: [
      "In Sinapss ho lavorato alla produzione e allo sviluppo di contenuti social per clienti molto diversi tra loro, con un focus particolare sul video.",
      "Partivo dagli obiettivi di comunicazione per costruire le shooting list e trasformarli in sequenze visive coerenti con il linguaggio del brand. Seguivo poi direttamente riprese, inquadrature e montaggio finale.",
      "In alcuni progetti sono stata anche davanti alla camera, quando serviva una presenza più diretta e spontanea nel contenuto."
    ],
    blocks: [
      { type: "list", kicker: "Dal brief al video finito", items: [
        ["Shooting List", "Dall'obiettivo alle scene da girare."],
        ["Shooting", "Riprese, inquadrature e costruzione del materiale."],
        ["Editing", "Montaggio, timing e flusso narrativo."],
        ["Motion", "Testi, transizioni e micro-animazioni."]
      ] },
      { type: "text", title: "Non montare sulla musica. Montare con la musica.", paras: [
        "Tagli, cambi di scala, testi, transizioni e micro-animazioni seguono il sound e contribuiscono a costruire il movimento del video.",
        "A seconda del cliente il ritmo può diventare più veloce, più morbido o più elastico. Il punto non era applicare lo stesso stile a tutto, ma trovare ogni volta il movimento giusto."
      ] },
      { type: "videos", items: [
        ["assets/sinapss/video-01.mp4", "Veramente", "Video reel", "Shooting · Editing · Beat Sync"],
        ["assets/sinapss/video-02.mp4", "Veramente", "Reel dimostrazione shooting", "Editing · Motion · After Effects"],
        ["assets/sinapss/video-03.mp4", "Bagni di Montecristo", "Teasing apertura", "Editing"],
        ["assets/sinapss/video-04.mp4", "Felicetta Bistrò", "Intervista TikTok", "Editing"],
        ["assets/sinapss/video-05.mp4", "More work", "Social video", "Editing"],
        ["assets/sinapss/video-06.mp4", "More work", "Social video", "Editing"],
        ["assets/sinapss/video-07.mp4", "More work", "Social video", "Editing"],
        ["assets/sinapss/video-08.mp4", "More work", "Social video", "Editing"]
      ] },
      { type: "list", kicker: "Tools", items: [
        ["Adobe Premiere Pro", "Montaggio, sound sync, timing e struttura."],
        ["Adobe After Effects", "Motion graphics, testi animati, transizioni e micro-animazioni."]
      ] },
      { type: "text", title: "Stesso processo. Ogni volta un linguaggio diverso.", paras: [
        "Lavorare in agenzia significava passare rapidamente da un cliente all'altro, con identità, pubblici e obiettivi differenti.",
        "Il mio lavoro non era portare lo stesso stile ovunque, ma capire quanto ritmo, movimento e presenza visiva servissero ogni volta."
      ] }
    ],
    closing: { title: "Ogni video ha il suo ritmo.<br>Il lavoro è trovarlo." }
  },
  {
    id: "leonardis",
    name: "Strategia",
    tag: "Communication Strategy · Content · Video",
    color: "var(--mauve)",
    ink: "var(--mist)",
    cover: { src: "assets/leonardis/brand/preview.webp", alt: "Enrica Leonardis · Architetto Interior Designer", fit: "whole" },
    title: "Prima capire cosa dire. Poi decidere come.",
    desc: "Dall'analisi del posizionamento alla strategia social, fino alla produzione di un video corporate multicamera.",
    secondary: "In team per Enrica Leonardis · Architetto Interior Designer",
    skills: ["Strategy", "Content System", "Visual Direction", "Video Production", "Video Editing"],
    question: "Prima di comunicare, capire cosa vale davvero la pena raccontare.",
    intro: [
      "Il progetto nasce dalla necessità di rendere la comunicazione dello Studio Leonardis più riconoscibile, coerente e capace di trasmettere il suo metodo.",
      "Abbiamo lavorato sull'identità del professionista, sui valori dello studio, sul target, sul posizionamento e sulla presenza digitale per costruire una strategia capace di raccontare non solo cosa fa, ma come lavora e cosa la rende diversa."
    ],
    blocks: [
      { type: "steps", items: ["Analisi", "Strategia", "Sistema editoriale", "Produzione"] },
      { type: "text", title: "Capire prima di costruire.", paras: ["Prima di definire contenuti e formati abbiamo analizzato il contesto: competitor, target e buyer personas, valori e punti distintivi dello studio, mission, posizionamento e presenza digitale del settore."] },
      { type: "list", items: [
        ["Target", "Capire cosa cerca davvero il cliente: ascolto, accompagnamento, affidabilità e un progetto che rispecchi la propria identità."],
        ["Competitor", "Come il settore costruisce autorevolezza attraverso qualità visiva, contenuti educativi, rubriche, bio chiare, CTA e presenza coerente."],
        ["Posizionamento", "Il punto distintivo non era proporre uno stile da imporre, ma costruire spazi insieme alle persone."]
      ] },
      { type: "highlight", html: "“Non seguiamo uno stile. <em>Costruiamo il tuo.</em>”" },
      { type: "gallery", dir: "assets/leonardis/strategia/", items: ["instagram-mockup"] },
      { type: "text", title: "Trasformare il posizionamento in un sistema di contenuti.", paras: [
        "Dopo la fase di analisi abbiamo costruito una strategia social completa, definendo obiettivi, formati, rubriche e direzione visiva: un piano editoriale con rubriche ricorrenti capace di raccontare progetti, metodo, competenze, persona e processo."
      ] },
      { type: "list", kicker: "Le rubriche", items: [
        ["Prima / Dopo", "Case history sintetiche per mostrare la trasformazione degli spazi."],
        ["Il Glossario dell'Architetto", "Termini tecnici spiegati in modo accessibile."],
        ["ArchitetTips", "Consigli pratici su spazi, materiali e progettazione."],
        ["Conosciamoci", "Contenuti dedicati a Enrica, al team, ai valori e alla storia dello studio."],
        ["In viaggio con l'architetto", "Il modo in cui un architetto osserva e interpreta i luoghi."]
      ] },
      { type: "text", title: "Dal piano editoriale a un contenuto reale.", paras: ["Uno dei contenuti sviluppati è stato un post dedicato alla trasformazione degli spazi, coerente con la rubrica Prima / Dopo."] },
      { type: "gallery", dir: "assets/leonardis/post-prima-dopo/", items: ["slide-02", "slide-03", "slide-04", "slide-05", "slide-06", "slide-07", "slide-08", "slide-09"] },
      { type: "text", title: "La strategia arriva sul set.", paras: [
        "Il progetto si è concluso con la produzione di un video corporate emozionale di circa 4 minuti, con vere riprese multicamera e interviste.",
        "Mi sono occupata direttamente del montaggio finale: selezione delle interviste, alternanza delle camere, ritmo narrativo, musica e costruzione emotiva del video."
      ] },
      { type: "highlight", html: "Dall'analisi al set.<br><em>Dalla strategia al racconto.</em>" },
      { type: "list", kicker: "Il mio contributo", items: [
        ["Strategy · in team", "Analisi, posizionamento, target e sviluppo della strategia insieme a una collega."],
        ["Content System · in team", "Definizione di rubriche, formati e piano editoriale."],
        ["Visual Direction · in team", "Scelta dei font, direzione grafica e adattamento dei contenuti."],
        ["Video Production · in team", "Riprese multicamera e interviste."],
        ["Video Editing · a mia cura", "Montaggio completo del video corporate."]
      ] }
    ],
    closing: {
      title: "Prima capire cosa rende un professionista diverso.<br>Poi trovare il modo di farlo percepire.",
      text: "La strategia funziona davvero quando riesce a diventare contenuto."
    }
  },
  {
    id: "fresko",
    name: "Fresko",
    tag: "Naming · Visual Identity · Product Concept",
    color: "#C8FF00",
    ink: "#0F2B1E",
    cover: { src: "assets/fresko/wordmark.webp", alt: "Logo Fresko", fit: "logo" },
    title: "Fresco, ma con la K.",
    desc: "Naming e identità visiva per una web app che aiuta a ricordare cosa c'è in frigo, monitorare le scadenze e utilizzare gli alimenti prima che vengano sprecati.",
    secondary: "Fresko · Web app anti-spreco",
    link: { href: "https://fresko-hazel.vercel.app/", label: "Web app" },
    skills: ["Naming", "Logo", "Mascot Design", "Visual Direction", "Brand Language", "Product Application"],
    question: "Lo spreco non doveva essere il protagonista.<br>Il cibo sì.",
    intro: [
      "Fresko nasce come web app anti-spreco pensata per aiutare le persone a sapere cosa hanno già in casa, tenere sotto controllo le scadenze e trovare modi per utilizzare gli alimenti prima che vengano dimenticati o buttati.",
      "L'obiettivo non era costruire una comunicazione moralista o troppo “green”, ma rendere il tema dello spreco alimentare più vicino, giovane e appetibile."
    ],
    blocks: [
      { type: "text", title: "Fresco, ma con la K.", paras: [
        "Il naming doveva essere breve, facile da ricordare, internazionale, giovane e coerente con un prodotto digitale legato al cibo.",
        "Il nome richiama immediatamente il concetto di freschezza, mentre la K lo rende più distintivo, contemporaneo e riconoscibile."
      ] },
      { type: "highlight", html: "KEEP IT <em>FRESKO.</em>" },
      { type: "gallery", bare: true, dir: "assets/fresko/", items: ["wordmark", "mascot"] },
      { type: "text", title: "Dare un volto al brand.", paras: [
        "Il limone sostituisce visivamente la “O” di Fresko e da lui nasce anche la mascotte: cappellino e occhiali aggiungono personalità e trasformano il simbolo in un personaggio riconoscibile, giovane e informale."
      ] },
      { type: "palette", items: [["Verde scuro", "#0F2B1E"], ["Verde secondario", "#1D4D34"], ["Lime", "#C8FF00"], ["Off-white", "#F2F2E9"], ["Giallo", "#FFD600"]] },
      { type: "text", title: "L'identità entra nel prodotto.", paras: [
        "Logo, palette, tipografia, immagini food e tone of voice sono stati applicati alla web app per mantenere la stessa personalità anche nell'esperienza digitale.",
        "Un'interfaccia che parla di anti-spreco attraverso il desiderio di utilizzare il cibo, non attraverso il senso di colpa."
      ] },
      { type: "gallery", wide: true, dir: "assets/fresko/", items: ["homepage", "mission-vision"] },
      { type: "list", kicker: "Il mio contributo", items: [
        ["Naming", "Definizione del nome Fresko e del suo posizionamento verbale."],
        ["Logo", "Sviluppo del wordmark e utilizzo del limone come elemento distintivo."],
        ["Mascot Design", "Creazione della mascotte e del suo tono giovane e riconoscibile."],
        ["Visual Direction", "Palette, typography e linguaggio grafico."],
        ["Brand Language", "Payoff, mission e vision."],
        ["Product Application", "Applicazione dell'identità alla web app."]
      ] }
    ],
    closing: { title: "Far venire voglia di usare quello che hai già." }
  }
];
