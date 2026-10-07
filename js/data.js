/* Contenuti dei case study, in italiano e inglese.
   L(it, en) restituisce il testo nella lingua attiva (vedi i18n.js).
   Ogni progetto è una sequenza di "blocchi" che main.js trasforma in markup:
   text · list · steps · stats · gallery · videos · highlight · palette. */
(function () {
  var L = window.I18N.L;

  /* ---------------------------------------------------------------
     SEGNAPOSTO BUDDYJOB — da compilare.
     Finché un valore è vuoto (""), la parte di frase che lo contiene
     non compare sul sito: il testo resta corretto anche senza.
     --------------------------------------------------------------- */
  var BJ = {
    // TODO: [Da sola / In un team di X persone] — "Il mio ruolo".
    // IT senza punto finale (es. "Da sola", "In un team di 4 persone");
    // EN con la virgola finale (es. "On my own,", "As part of a team of four,").
    team: L("", ""),
    // TODO: [periodo di confronto, es. i tre mesi precedenti] — nota sotto "I numeri".
    // IT es. "i tre mesi precedenti"; EN es. "the previous three months".
    comparePeriod: L("", ""),
    // TODO: [es. interviste ai Buddy, POV, mini-guide…] — sezione Video.
    // IT es. "interviste ai Buddy, POV, mini-guide"; EN es. "interviews with the Buddies, POVs, mini-guides".
    videoFormats: L("", ""),
    // TODO: [obiettivo, es. iscrizioni alla community / prime call con i coach] — "Oltre il feed".
    // IT dopo "campagne ADV per" (es. "le iscrizioni alla community");
    // EN dopo "ad campaigns to" (es. "drive community sign-ups").
    adsGoal: L("", ""),
    // TODO: [assets/buddyjob/video-1.mp4], [video-2.mp4], [video-3.mp4] — 2–3 video verticali 9:16,
    // mp4 H.264 compressi + poster. Finché la lista è vuota il carosello non compare.
    // Formato: { src: "assets/buddyjob/video/video-1.mp4", poster: "assets/buddyjob/video/video-1.jpg" }
    videos: [],
    // TODO: [views] · [reach] · [condivisioni] · [follow] dei video (facoltativi).
    // Lascia null quelli che non hai: se sono tutti null il blocco non compare.
    // Numeri interi, es. 120000 (sul sito diventa 120.000).
    videoStats: { views: null, reach: null, shares: null, follows: null }
  };

  window.PROJECTS = [
    {
      id: "buddyjob",
      name: "BuddyJob",
      tag: "Social Media · Content Strategy",
      color: "var(--lavender)",
      ink: "var(--mist)",
      cover: { src: "assets/buddyjob/brand/logo.webp", alt: L("Logo BuddyJob", "BuddyJob logo"), fit: "logo" },
      title: L("Leggere il lavoro. Poi raccontarlo.", "Reading the work. Then telling it."),
      // dato d'aggancio sotto il titolo della card
      hook: L("+10.395 follower in poco più di tre mesi", "+10,395 followers in just over three months"),
      desc: L(
        "Per BuddyJob trasformo conversazioni, trend e situazioni quotidiane in contenuti capaci di informare, creare riconoscimento e far partecipare la community.",
        "For BuddyJob I turn conversations, trends and everyday situations into content that informs, builds recognition and gets the community involved."
      ),
      link: { href: "https://www.instagram.com/buddyjob_it/", label: "Instagram" },
      skills: ["Research & Social Listening", "Concept", "Copywriting", "Format", "Editorial Design", "Social Media Management", "Video Production", "ADV", "Community Management"],
      question: L("Come rendere interessante un argomento di cui parlano già tutti?", "How do you make an already-crowded topic interesting?"),
      // riga di sintesi sotto il titolo del case study
      meta: L("Instagram · giugno – settembre 2026 · 3,7M visualizzazioni organiche · +10.395 follower",
        "Instagram · June – September 2026 · 3.7M organic views · +10,395 followers"),
      intro: [
        L("Il lavoro è ovunque sui social: colloqui, burnout, stipendi, carriera, colleghi, dimissioni.",
          "Work is everywhere on social: interviews, burnout, salaries, careers, colleagues, resignations."),
        L("La sfida non era trovare qualcosa di cui parlare, ma trovare ogni volta un modo diverso di farlo.",
          "The challenge was never finding something to talk about, but finding a different way to say it every time."),
        L("Per BuddyJob lavoro sui contenuti social dalla ricerca all'idea, fino a copy e sviluppo visivo, cercando un equilibrio tra informazione, attualità, riconoscibilità ed engagement.",
          "For BuddyJob I work on social content from research to concept, through copy and visual development, balancing information, relevance, recognizability and engagement.")
      ],
      blocks: [
        { type: "text", kicker: L("Il mio ruolo", "My role"), paras: [
          L("Osservo conversazioni, trend e notizie sul mondo del lavoro e cerco l'angolo che può diventare BuddyJob. A volte significa approfondire. A volte spiegare. A volte basta un meme fatto nel momento giusto.",
            "I watch conversations, trends and news about the world of work and look for the angle that can become BuddyJob. Sometimes that means digging deeper. Sometimes explaining. Sometimes it's just a meme made at the right moment."),
          L("Poi lo porto fino in fondo. " + (BJ.team ? BJ.team + " seguo" : "Seguo") +
            " ricerca, concept, copy e grafica; per i video scrivo lo script, giro, monto e a volte ci metto la faccia. Curo anche le campagne ADV, i contenuti per LinkedIn e la community nei commenti.",
            "Then I see it through to the end. " + (BJ.team ? BJ.team + " I handle" : "I handle") +
            " research, concept, copy and design; for video I write the script, shoot, edit and sometimes appear on camera. I also run ad campaigns, LinkedIn content and the community in the comments.")
        ] },
        { type: "text", title: L("Un profilo non si costruisce post per post.", "A profile isn't built post by post."), paras: [
          L("Per BuddyJob ho lavorato alla costruzione di un sistema editoriale che non riguarda solo cosa pubblicare nel feed, ma anche come accompagnare chi arriva sul profilo.",
            "For BuddyJob I worked on building an editorial system that isn't just about what goes in the feed, but also how to guide people who land on the profile."),
          L("Ho sviluppato un piano editoriale capace di alternare informazione, attualità, format ricorrenti, conversazioni della community e contenuti più leggeri, lasciando allo stesso tempo spazio a trend e temi che emergono nel momento.",
            "I developed an editorial plan able to alternate information, current events, recurring formats, community conversations and lighter content, while still leaving room for trends and topics that emerge in the moment."),
          L("Anche le Stories e le raccolte in evidenza fanno parte di questo lavoro: sono pensate per orientare chi scopre BuddyJob, spiegare servizi e strumenti e rendere il profilo più facile da esplorare.",
            "Stories and highlight reels are part of this work too: they're designed to orient people discovering BuddyJob, explain services and tools, and make the profile easier to explore.")
        ] },
        { type: "highlight", html: L("Ogni contenuto ha un ruolo. <em>Anche quando non finisce nel feed.</em>", "Every piece of content has a role. <em>Even when it never makes the feed.</em>") },
        { type: "list", kicker: L("Cosa raccontiamo", "What we talk about"), items: [
          [L("Informare", "Inform"), L("Dati, trend e dinamiche del lavoro.", "Data, trends and workplace dynamics.")],
          [L("Approfondire", "Go deeper"), L("Carriera, coaching e situazioni professionali.", "Careers, coaching and professional situations.")],
          [L("Intercettare", "Intercept"), L("News, conversazioni e social listening.", "News, conversations and social listening.")],
          [L("Creare relazione", "Build connection"), L("Meme, community e contenuti riconoscibili.", "Memes, community and recognizable content.")],
          [L("Sperimentare", "Experiment"), L("Format e nuovi linguaggi visuali.", "Formats and new visual languages.")]
        ] },
        { type: "list", kicker: L("Come organizziamo il profilo", "How we organize the profile"), items: [
          ["Feed", L("Contenuti editoriali, format e contenuti pianificati.", "Editorial content, formats and scheduled posts.")],
          ["Stories", L("Attualità, interazione, approfondimento e contenuti di servizio.", "Current events, interaction, deep dives and service content.")],
          ["Highlights", L("Contenuti evergreen pensati per orientare chi arriva sul profilo, spiegare BuddyJob, i servizi e gli strumenti disponibili.",
            "Evergreen content designed to orient people landing on the profile, explaining BuddyJob, its services and the tools available.")]
        ] },
        { type: "stats", kicker: L("I numeri · Instagram · 1 giugno — 10 settembre 2026", "The numbers · Instagram · June 1 — September 10, 2026"), items: [
          [3.7, "M", L("visualizzazioni organiche", "organic views"), "+127,4%"],
          [2.6, "M", L("persone raggiunte", "people reached"), "+128,2%"],
          [288.8, "K", L("interazioni con i contenuti", "content interactions"), "+176,5%"],
          [10395, "", L("nuovi follow", "new follows"), "+255,3%"]
        ],
          // nota sul confronto: compare solo quando il periodo è compilato
          note: BJ.comparePeriod ? L("Variazioni rispetto a " + BJ.comparePeriod + ".", "Changes compared with " + BJ.comparePeriod + ".") : "" },

        /* --- 1. Red flags --- */
        { type: "text", kicker: L("Parte del sistema: Intercettare", "Part of the system: Intercept"), title: L("Leggere i commenti prima di scrivere il post.", "Reading the comments before writing the post."), paras: [
          L("Una notizia molto discussa aveva acceso online una conversazione sui comportamenti normalizzati sul posto di lavoro.",
            "A widely-discussed news story had sparked an online conversation about normalized workplace behaviors."),
          L("Invece di fermarmi alla notizia, sono andata a vedere come ne stavano parlando le persone. Nei commenti ricorrevano continuamente le stesse frasi.",
            "Instead of stopping at the headline, I went to see how people were actually talking about it. The same phrases kept coming up in the comments, over and over.")
        ] },
        { type: "highlight", html: L("Da lì è nato: <em>“10 frasi che in un ambiente di lavoro sono red flags”</em>.", "That's where <em>“10 phrases that are red flags in a workplace”</em> came from.") },
        { type: "gallery", dir: "assets/buddyjob/redflags/", items: ["cover", "tutti-devono-saper-fare-tutto", "siamo-una-grande-famiglia", "io-non-faccio-pausa-pranzo", "ringrazia-di-avere-un-lavoro", "deve-essere-pronto-per-ieri", "puoi-rimanere-tanto", "ora-si-ricomincia", "faccio-questo-lavoro-da-20-anni", "sei-pagato-per-lavorare", "impegno-e-passione"] },
        { type: "stats", small: true, items: [
          [1.5, "M", L("persone raggiunte", "people reached")], [113, "K", L("interazioni", "interactions")], [29, "K", L("condivisioni", "shares")],
          [19.8, "K", L("salvataggi", "saves")], [5068, "", L("follow generati", "follows generated")]
        ] },
        // 5.068 su 10.395 nuovi follower del periodo = 48,8%
        { type: "highlight", html: L("Un solo post, nessuna sponsorizzazione: <em>quasi metà dei nuovi follower del periodo è arrivata da qui.</em>",
          "One post, no paid promotion: <em>almost half of the period's new followers came from here.</em>") },
        { type: "text", paras: [L("Il contenuto non nasceva dal trend in sé, ma da quello che le persone stavano dicendo intorno al trend.",
          "The content didn't come from the trend itself, but from what people were actually saying around it.")] },

        /* --- 2. Soft-on day --- */
        { type: "text", kicker: L("Parte del sistema: Informare + Sperimentare", "Part of the system: Inform + Experiment"), title: L("Un trend nuovo ha bisogno anche di una forma nuova.", "A new trend also needs a new format."), paras: [
          L("Quando soft-on day e soft-off day hanno iniziato a entrare nella conversazione online sul lavoro, ho approfondito il fenomeno e costruito un contenuto che ne spiegasse significato e contesto.",
            "When soft-on days and soft-off days started entering the online conversation about work, I dug into the phenomenon and built a piece that explained its meaning and context."),
          L("Fotografia, tipografia, collage, riferimenti digitali e movimento cambiano lungo il carosello seguendo il contenuto, invece di costringerlo dentro un unico template.",
            "Photography, typography, collage, digital references and motion shift throughout the carousel following the content, instead of forcing it into a single template.")
        ] },
        { type: "gallery", dir: "assets/buddyjob/softdays/", items: ["cover", "switch", "pink", "equity", "animation-01.mp4", "soft-off-day", "fast-company", "non-sappiamo-ancora", "animation-02.mp4", "preferiresti"] },

        /* --- 3. Meme --- */
        { type: "text", kicker: L("Parte del sistema: Creare relazione", "Part of the system: Build connection"), title: L("Non tutti i contenuti devono spiegare qualcosa.", "Not every piece of content has to explain something."), paras: [
          L("Dopo una settimana di temi più densi, il feed ha anche bisogno di respirare.", "After a week of denser topics, the feed also needs to breathe."),
          L("I meme fanno parte del content mix di BuddyJob proprio per questo: intercettano situazioni quotidiane, creano riconoscimento e danno alla community qualcosa da mandare immediatamente a un collega.",
            "Memes are part of BuddyJob's content mix for exactly this reason: they tap into everyday situations, build recognition and give the community something to send straight to a colleague.")
        ] },
        { type: "gallery", dir: "assets/buddyjob/meme/", items: ["drama", "work", "september"] },
        { type: "stats", small: true, items: [
          [223, "K", L("persone raggiunte", "people reached")], [29.6, "K", L("interazioni", "interactions")],
          // in evidenza: è il dato che conferma il testo (le condivisioni superano i like)
          [14.6, "K", L("condivisioni", "shares"), "", true],
          [13.1, "K", L("like/reazioni", "likes/reactions")], [1390, "", L("salvataggi", "saves")], [113, "", L("nuovi follow", "new follows")]
        ] },
        { type: "text", paras: [L("In questo caso le condivisioni hanno superato i like: il contenuto non è stato soltanto apprezzato, è diventato qualcosa da mandare a qualcun altro.",
          "Here shares outpaced likes: the content wasn't just appreciated, it became something worth sending to someone else.")] },

        /* --- Video --- */
        { type: "text", kicker: L("Parte del sistema: Sperimentare", "Part of the system: Experiment"), title: L("Alcune idee hanno bisogno di muoversi.", "Some ideas need to move."), paras: [
          L("Per i video seguo tutto il processo: scrivo lo script, giro, monto e a volte ci metto la faccia. Il formato cambia" +
            (BJ.videoFormats ? ", " + BJ.videoFormats + "," : "") +
            " ma il criterio è lo stesso dei caroselli: partire da quello che le persone vivono davvero al lavoro.",
            "For video I handle the whole process: I write the script, shoot, edit and sometimes appear on camera. The format changes" +
            (BJ.videoFormats ? " — " + BJ.videoFormats + " —" : "") +
            " but the approach is the same as the carousels: start from what people actually go through at work.")
        ] },
        { type: "gallery", vertical: true, items: BJ.videos },
        { type: "stats", small: true, items: [
          [BJ.videoStats.views, "", L("visualizzazioni", "views")],
          [BJ.videoStats.reach, "", L("persone raggiunte", "people reached")],
          [BJ.videoStats.shares, "", L("condivisioni", "shares")],
          [BJ.videoStats.follows, "", L("follow", "follows")]
        ] },

        /* --- Oltre il feed --- */
        { type: "text", kicker: L("Ogni contenuto ha un ruolo", "Every piece of content has a role"), title: L("Oltre il feed.", "Beyond the feed."), paras: [
          L("Contenuti per LinkedIn pensati per un pubblico più professionale, campagne ADV" + (BJ.adsGoal ? " per " + BJ.adsGoal : "") +
            " e, ogni giorno, le risposte nei commenti: la parte meno visibile del lavoro, ma quella che trasforma un pubblico in una community.",
            "LinkedIn content made for a more professional audience, ad campaigns" + (BJ.adsGoal ? " to " + BJ.adsGoal : "") +
            " and, every day, the replies in the comments: the least visible part of the work, but the one that turns an audience into a community.")
        ] }
      ],
      closing: {
        title: L("Trasformare quello che succede nel mondo del lavoro in contenuti che valga la pena fermarsi a leggere.",
          "Turning what happens in the world of work into content worth stopping to read."),
        text: L("Per BuddyJob costruisco contenuti partendo da conversazioni, trend, dati e situazioni quotidiane. Il formato cambia ogni volta; l'obiettivo resta costruire una voce riconoscibile e una community che abbia voglia di partecipare.",
          "For BuddyJob I build content starting from conversations, trends, data and everyday situations. The format changes every time; the goal stays the same: a recognizable voice and a community that wants to take part.")
      }
    },
    {
      id: "epicode",
      name: "EPICODE",
      tag: "Social Media · Content Strategy",
      color: "var(--graphite)",
      ink: "var(--mist)",
      cover: { src: "assets/epicode/brand/logo-cover.webp", alt: L("Logo EPICODE", "EPICODE logo"), fit: "logo" },
      title: L("Capire il tech abbastanza da saperlo raccontare.", "Understanding tech well enough to explain it."),
      desc: L("Ricerca, contenuti e community management per costruire una voce tech competente, accessibile e riconoscibile.",
        "Research, content and community management to build a tech voice that's competent, accessible and recognizable."),
      link: { href: "https://www.instagram.com/epicode.official/", label: "Instagram" },
      skills: ["News Research", "Content Ideation", "Copywriting", "Editorial Design", "Publishing", "Community Management"],
      question: L("Come racconti il tech se non è il tuo settore?", "How do you talk about tech when it's not your field?"),
      intro: [
        L("Quando ho iniziato a lavorare su EPICODE, il tech non era il mio settore.", "When I started working on EPICODE, tech wasn't my field."),
        L("La sfida quindi non era fingere di conoscere ciò che non conoscevo, ma trovare un metodo per capire prima di raccontare.",
          "So the challenge wasn't pretending to know what I didn't, but finding a method to understand before explaining."),
        L("Ricerca, fonti verticali, newsletter e confronto con il team sono diventati il punto di partenza per trasformare temi spesso tecnici in contenuti comprensibili, attuali e coerenti con la voce del brand.",
          "Research, vertical sources, newsletters and back-and-forth with the team became the starting point for turning often-technical topics into content that was understandable, current and true to the brand's voice."),
        L("La direzione editoriale, sviluppata insieme al team, ruotava intorno a un concetto preciso: lo “zio tech”. Qualcuno che il settore lo conosce, ma te lo racconta senza mettersi in cattedra.",
          "The editorial direction, developed with the team, revolved around one precise idea: the “tech uncle”. Someone who knows the field but explains it to you without lecturing.")
      ],
      blocks: [
        { type: "highlight", html: L("Non dovevo sapere tutto. <em>Dovevo sapere dove cercare, cosa verificare e come renderlo comprensibile.</em>",
          "I didn't need to know everything. <em>I needed to know where to look, what to verify and how to make it understandable.</em>") },
        { type: "text", kicker: L("Cosa faccio", "What I do"), paras: [
          L("Cerco temi e notizie attraverso newsletter e fonti di settore, individuo quelli che possono diventare contenuto, sviluppo concept, copy e visual e seguo la pubblicazione.",
            "I look for topics and news through newsletters and industry sources, spot the ones that can become content, develop concept, copy and visuals, and follow through to publishing."),
          L("Mi occupo anche della gestione della community, con particolare attenzione ai contenuti ADV, dove commenti, dubbi e obiezioni diventano una parte importante del rapporto tra brand e pubblico.",
            "I also handle community management, with particular attention to ad content, where comments, doubts and objections become an important part of the relationship between brand and audience.")
        ] },
        { type: "text", title: L("Prima capire. Poi tradurre.", "Understand first. Then translate."), paras: [
          L("Non arrivando dal settore tech, ho costruito una routine di ricerca che mi permettesse di orientarmi tra temi, linguaggi e notizie prima di trasformarli in contenuti.",
            "Not coming from the tech field, I built a research routine that let me navigate topics, languages and news before turning them into content."),
          L("Newsletter verticali, fonti di settore e approfondimenti diventano il punto di partenza. Il lavoro successivo consiste nel capire quale parte della storia è davvero interessante per la community e trovare il modo più semplice — ma non semplicistico — per raccontarla.",
            "Vertical newsletters, industry sources and deep dives became the starting point. The next step was understanding which part of the story was genuinely interesting for the community and finding the simplest — but not simplistic — way to tell it.")
        ] },
        { type: "steps", items: [L("Fonti", "Sources"), L("Ricerca", "Research"), L("Selezione", "Selection"), L("Angolo editoriale", "Editorial angle"), L("Contenuto", "Content")] },
        { type: "list", kicker: L("Una voce, più modi di farla vivere", "One voice, many ways to bring it to life"), items: [
          ["Relevance", L("News e cultura tech.", "Tech news and culture.")],
          ["Community", L("Meme, partecipazione e linguaggio condiviso.", "Memes, participation and shared language.")],
          ["Trust", L("Alumni e storie reali.", "Alumni and real stories.")]
        ] },
        { type: "text", kicker: L("Parte del sistema: Relevance", "Part of the system: Relevance"), title: L("Portare l'attualità tech dentro il feed, in modo comprensibile.", "Bringing tech current events into the feed, in an understandable way."), paras: [
          L("La ricerca partiva da newsletter e fonti verticali. Il lavoro non consisteva semplicemente nel riportare una notizia, ma nel capire quali temi potessero essere rilevanti per la community e trovare un angolo capace di renderli accessibili e interessanti.",
            "The research started from newsletters and vertical sources. The work wasn't just reporting a piece of news, but understanding which topics could be relevant to the community and finding an angle that made them accessible and interesting.")
        ] },
        { type: "highlight", html: L("Il post su Joseph Weizenbaum ed ELIZA parte dalla storia del primo chatbot per arrivare a una domanda contemporanea: <em>quale confine umano non dovrebbe mai superare l'intelligenza artificiale?</em>",
          "The post about Joseph Weizenbaum and ELIZA starts from the story of the first chatbot to arrive at a strikingly current question: <em>where is the human line that AI should never cross?</em>") },
        { type: "gallery", dir: "assets/epicode/eliza/", items: ["cover", "slide-2", "slide-3", "slide-4", "cta"] },
        { type: "stats", small: true, items: [[1067, "", L("interazioni nette", "net interactions")], [289, "", L("salvataggi", "saves")], [137, "", L("condivisioni", "shares")], [31, "", "follow"]] },
        { type: "text", kicker: L("Parte del sistema: Community", "Part of the system: Community"), title: L("Quando il contenuto lo sceglie anche la community.", "When the community picks the content too."), paras: [
          L("Ogni sabato il feed lasciava spazio ai meme creati dalla community EPICODE: parlare la lingua di chi il mondo tech lo vive davvero e creare un appuntamento riconoscibile.",
            "Every Saturday the feed made room for memes created by the EPICODE community: speaking the language of people who actually live in the tech world, and creating a recognizable weekly appointment."),
          L("Il format è poi diventato un vero torneo. Ogni martedì alcuni meme venivano messi in sfida nelle Stories: la community votava i preferiti e il risultato determinava anche l'ordine di pubblicazione.",
            "The format later became a real tournament. Every Tuesday a few memes were pitted against each other in Stories: the community voted for their favorites, and the vote also set the publishing order.")
        ] },
        { type: "gallery", dir: "assets/epicode/meme/", items: ["cybersecurity", "switch-compleanno", "token-ai", "windows-defender", "feature-produzione"] },
        { type: "highlight", html: L("Community crea.<br>Community vota.<br><em>Il brand rimette tutto in circolo.</em>", "Community creates.<br>Community votes.<br><em>The brand puts it all back into circulation.</em>") },
        { type: "gallery", dir: "assets/epicode/meme-tournament/", items: ["cover", "meme-1", "meme-2", "meme-3", "meme-4", "poll"] },
        { type: "stats", small: true, items: [
          [123963, "", L("visualizzazioni", "views")], [78.5, "K", L("persone raggiunte", "people reached")], [4875, "", L("interazioni", "interactions")],
          [1580, "", L("condivisioni", "shares")], [87, "", "follow"]
        ] },
        { type: "text", kicker: L("Parte del sistema: Trust", "Part of the system: Trust"), title: L("Far parlare il brand attraverso chi l'ha vissuto.", "Letting the brand speak through the people who lived it."), paras: [
          L("Le storie degli alumni rendono la promessa del brand più concreta attraverso persone, percorsi e lavori reali.",
            "Alumni stories ground the brand's promise in real people, real paths and real jobs."),
          L("Il format parte dalla persona, racconta cosa fa oggi, traduce il suo ruolo in attività comprensibili e ricostruisce il percorso che l'ha portata fin lì.",
            "The format starts from the person, tells what they do today, translates their role into understandable activities and retraces the path that got them there.")
        ] },
        { type: "gallery", dir: "assets/epicode/alumni/", items: ["cover", "linkedin-vs-davvero", "giornata-tipo", "panettiere-a-developer", "percorso-epicode", "lavoro-oggi", "cosa-ha-imparato", "final-story"] },
        { type: "text", title: L("A volte la risposta a un commento può diventare contenuto.", "Sometimes a reply to a comment can become content."), paras: [
          L("I video ADV di EPICODE generavano molti commenti: domande, dubbi, critiche. Insieme al team abbiamo trasformato alcune obiezioni ricorrenti in un set di Stories, con le persone di EPICODE a metterci la faccia.",
            "EPICODE's ad videos generated a lot of comments: questions, doubts, criticism. Together with the team we turned some recurring objections into a set of Stories, with the people of EPICODE putting their own faces to it.")
        ] },
        { type: "highlight", html: L("Dietro al logo, <em>persone riconoscibili.</em>", "Behind the logo, <em>recognizable people.</em>") },
        { type: "stats", kicker: L("Risultati generali · 1 giugno — 7 settembre 2026", "Overall results · June 1 — September 7, 2026"), items: [
          [36.3, "M", L("visualizzazioni", "views"), "+7,4%"],
          [4.9, "M", L("copertura", "reach"), "+16,8%"],
          [89.9, "K", L("interazioni con i contenuti", "content interactions"), "+54,7%"],
          [7661, "", L("nuovi follow", "new follows"), "+24,6%"],
          [148, "K", L("clic sul link", "link clicks"), "+15,2%"],
          [67, "K", L("visite al profilo", "profile visits"), "+36,3%"]
        ] },
        { type: "text", small: true, paras: [L("Alcuni contenuti sono stati supportati da campagne paid: le metriche generali comprendono distribuzione organica e a pagamento.",
          "Some content was supported by paid campaigns: the overall metrics include both organic and paid distribution.")] }
      ],
      closing: {
        title: L("Non serve appartenere a un settore per imparare a raccontarlo bene.", "You don't need to belong to an industry to learn how to tell its story well."),
        text: L("Su EPICODE ho imparato a costruire credibilità attraverso ricerca, ascolto e traduzione. Capire prima di scrivere, trovare fonti affidabili, scegliere l'angolo giusto e cambiare formato in base all'obiettivo.",
          "On EPICODE I learned to build credibility through research, listening and translation. Understanding before writing, finding reliable sources, choosing the right angle and changing format depending on the goal.")
      }
    },
    {
      id: "sinapss",
      name: "Video",
      tag: "Video Production · Motion",
      color: "var(--olive)",
      ink: "var(--mist)",
      cover: { src: "assets/sinapss/brand/veramente-cover.webp", alt: L("Logo Veramente · Abitudini Italiane", "Veramente · Abitudini Italiane logo"), fit: "logo" },
      title: L("Montare con la musica, non sopra.", "Editing with the music, not over it."),
      desc: L("Shooting, montaggio e motion per contenuti social sviluppati per brand e linguaggi diversi.",
        "Shooting, editing and motion for social content developed for different brands and languages."),
      secondary: L("Esperienza in agenzia · Sinapss", "Agency experience · Sinapss"),
      skills: ["Shooting List", "Shooting", "Editing", "Motion"],
      question: L("Il ritmo si costruisce prima ancora del montaggio.", "The rhythm is built before the edit even begins."),
      intro: [
        L("In Sinapss ho lavorato alla produzione e allo sviluppo di contenuti social per clienti molto diversi tra loro, con un focus particolare sul video.",
          "At Sinapss I worked on producing and developing social content for very different clients, with a particular focus on video."),
        L("Partivo dagli obiettivi di comunicazione per costruire le shooting list e trasformarli in sequenze visive coerenti con il linguaggio del brand. Seguivo poi direttamente riprese, inquadrature e montaggio finale.",
          "I started from communication goals to build shot lists and turn them into visual sequences consistent with the brand's language. I then handled filming, framing and final editing directly."),
        L("In alcuni progetti sono stata anche davanti alla camera, quando serviva una presenza più diretta e spontanea nel contenuto.",
          "On some projects I was also in front of the camera, when a more direct and spontaneous presence was needed in the content.")
      ],
      blocks: [
        { type: "list", kicker: L("Dal brief al video finito", "From brief to finished video"), items: [
          ["Shooting List", L("Dall'obiettivo alle scene da girare.", "From the goal to the scenes to shoot.")],
          ["Shooting", L("Riprese, inquadrature e costruzione del materiale.", "Filming, framing and building the material.")],
          ["Editing", L("Montaggio, timing e flusso narrativo.", "Editing, timing and narrative flow.")],
          ["Motion", L("Testi, transizioni e micro-animazioni.", "Text, transitions and micro-animations.")]
        ] },
        { type: "text", title: L("Non montare sulla musica. Montare con la musica.", "Don't edit to the music. Edit with the music."), paras: [
          L("Tagli, cambi di scala, testi, transizioni e micro-animazioni seguono il sound e contribuiscono a costruire il movimento del video.",
            "Cuts, scale changes, text, transitions and micro-animations follow the sound and help build the video's momentum."),
          L("A seconda del cliente il ritmo può diventare più veloce, più morbido o più elastico. Il punto non era applicare lo stesso stile a tutto, ma trovare ogni volta il movimento giusto.",
            "Depending on the client, the pace can become faster, softer or more elastic. The point was never applying the same style to everything, but finding the right movement every time.")
        ] },
        { type: "videos", items: [
          ["assets/sinapss/video-01.mp4", "Veramente", "Video reel", "Shooting · Editing · Beat Sync"],
          ["assets/sinapss/video-02.mp4", "Veramente", L("Reel dimostrazione shooting", "Shooting demo reel"), "Editing · Motion · After Effects"],
          ["assets/sinapss/video-03.mp4", "Bagni di Montecristo", L("Teasing apertura", "Opening teaser"), "Editing"],
          ["assets/sinapss/video-04.mp4", "Felicetta Bistrò", L("Intervista TikTok", "TikTok interview"), "Editing"],
          ["assets/sinapss/video-05.mp4", "More work", "Social video", "Editing"],
          ["assets/sinapss/video-06.mp4", "More work", "Social video", "Editing"],
          ["assets/sinapss/video-07.mp4", "More work", "Social video", "Editing"],
          ["assets/sinapss/video-08.mp4", "More work", "Social video", "Editing"]
        ] },
        { type: "list", kicker: "Tools", items: [
          ["Adobe Premiere Pro", L("Montaggio, sound sync, timing e struttura.", "Editing, sound sync, timing and structure.")],
          ["Adobe After Effects", L("Motion graphics, testi animati, transizioni e micro-animazioni.", "Motion graphics, animated text, transitions and micro-animations.")]
        ] },
        { type: "text", title: L("Stesso processo. Ogni volta un linguaggio diverso.", "Same process. A different language every time."), paras: [
          L("Lavorare in agenzia significava passare rapidamente da un cliente all'altro, con identità, pubblici e obiettivi differenti.",
            "Working at an agency meant moving quickly from one client to another, each with different identities, audiences and goals."),
          L("Il mio lavoro non era portare lo stesso stile ovunque, ma capire quanto ritmo, movimento e presenza visiva servissero ogni volta.",
            "My job wasn't to bring the same style everywhere, but to understand how much rhythm, motion and visual presence each one needed.")
        ] }
      ],
      closing: { title: L("Ogni video ha il suo ritmo.<br>Il lavoro è trovarlo.", "Every video has its own rhythm.<br>The work is finding it.") }
    },
    {
      id: "leonardis",
      name: L("Strategia", "Strategy"),
      tag: "Communication Strategy · Content · Video",
      color: "var(--mauve)",
      ink: "var(--mist)",
      cover: { src: "assets/leonardis/brand/preview.webp", alt: L("Enrica Leonardis · Architetto Interior Designer", "Enrica Leonardis · Architect Interior Designer"), fit: "whole" },
      title: L("Prima capire cosa dire. Poi decidere come.", "First understand what to say. Then decide how."),
      desc: L("Dall'analisi del posizionamento alla strategia social, fino alla produzione di un video corporate multicamera.",
        "From positioning analysis to social strategy, all the way to producing a multi-camera corporate video."),
      secondary: L("In team per Enrica Leonardis · Architetto Interior Designer", "Team project for Enrica Leonardis · Architect Interior Designer"),
      skills: ["Strategy", "Content System", "Visual Direction", "Video Production", "Video Editing"],
      question: L("Prima di comunicare, capire cosa vale davvero la pena raccontare.", "Before communicating, understand what's actually worth saying."),
      intro: [
        L("Il progetto nasce dalla necessità di rendere la comunicazione dello Studio Leonardis più riconoscibile, coerente e capace di trasmettere il suo metodo.",
          "The project was born out of the need to make Studio Leonardis's communication more recognizable, consistent and able to convey its method."),
        L("Abbiamo lavorato sull'identità del professionista, sui valori dello studio, sul target, sul posizionamento e sulla presenza digitale per costruire una strategia capace di raccontare non solo cosa fa, ma come lavora e cosa la rende diversa.",
          "We worked on the professional's identity, the studio's values, its target audience, positioning and digital presence to build a strategy able to tell not just what she does, but how she works and what sets her apart.")
      ],
      blocks: [
        { type: "steps", items: [L("Analisi", "Analysis"), L("Strategia", "Strategy"), L("Sistema editoriale", "Editorial system"), L("Produzione", "Production")] },
        { type: "text", title: L("Capire prima di costruire.", "Understand before building."), paras: [
          L("Prima di definire contenuti e formati abbiamo analizzato il contesto: competitor, target e buyer personas, valori e punti distintivi dello studio, mission, posizionamento e presenza digitale del settore.",
            "Before defining content and formats we analyzed the context: competitors, target audience and buyer personas, the studio's values and distinctive points, mission, positioning and the industry's digital presence.")
        ] },
        { type: "list", items: [
          ["Target", L("Capire cosa cerca davvero il cliente: ascolto, accompagnamento, affidabilità e un progetto che rispecchi la propria identità.",
            "Understanding what the client is really looking for: being heard, guided, and trusting a project that reflects their own identity.")],
          [L("Competitor", "Competitors"), L("Come il settore costruisce autorevolezza attraverso qualità visiva, contenuti educativi, rubriche, bio chiare, CTA e presenza coerente.",
            "How the industry builds authority through visual quality, educational content, recurring columns, clear bios, CTAs and a consistent presence.")],
          [L("Posizionamento", "Positioning"), L("Il punto distintivo non era proporre uno stile da imporre, ma costruire spazi insieme alle persone.",
            "The distinctive point wasn't imposing a style, but building spaces together with people.")]
        ] },
        { type: "highlight", html: L("“Non seguiamo uno stile. <em>Costruiamo il tuo.</em>”", "“We don't follow a style. <em>We build yours.</em>”") },
        { type: "gallery", dir: "assets/leonardis/strategia/", items: ["instagram-mockup"] },
        { type: "text", title: L("Trasformare il posizionamento in un sistema di contenuti.", "Turning positioning into a content system."), paras: [
          L("Dopo la fase di analisi abbiamo costruito una strategia social completa, definendo obiettivi, formati, rubriche e direzione visiva: un piano editoriale con rubriche ricorrenti capace di raccontare progetti, metodo, competenze, persona e processo.",
            "After the analysis phase we built a complete social strategy, defining goals, formats, recurring columns and visual direction: an editorial plan able to tell the story of projects, method, expertise, personality and process.")
        ] },
        { type: "list", kicker: L("Le rubriche", "The columns"), items: [
          [L("Prima / Dopo", "Before / After"), L("Case history sintetiche per mostrare la trasformazione degli spazi.", "Short case histories showing the transformation of a space.")],
          [L("Il Glossario dell'Architetto", "The Architect's Glossary"), L("Termini tecnici spiegati in modo accessibile.", "Technical terms explained in an accessible way.")],
          ["ArchitetTips", L("Consigli pratici su spazi, materiali e progettazione.", "Practical tips on spaces, materials and design.")],
          [L("Conosciamoci", "Let's meet"), L("Contenuti dedicati a Enrica, al team, ai valori e alla storia dello studio.", "Content dedicated to Enrica, the team, the studio's values and its story.")],
          [L("In viaggio con l'architetto", "Traveling with the architect"), L("Il modo in cui un architetto osserva e interpreta i luoghi.", "The way an architect observes and reads places.")]
        ] },
        { type: "text", title: L("Dal piano editoriale a un contenuto reale.", "From editorial plan to real content."), paras: [
          L("Uno dei contenuti sviluppati è stato un post dedicato alla trasformazione degli spazi, coerente con la rubrica Prima / Dopo.",
            "One of the pieces developed was a post dedicated to a space transformation, consistent with the Before / After column.")
        ] },
        { type: "gallery", dir: "assets/leonardis/post-prima-dopo/", items: ["slide-02", "slide-03", "slide-04", "slide-05", "slide-06", "slide-07", "slide-08", "slide-09"] },
        { type: "text", title: L("La strategia arriva sul set.", "The strategy reaches the set."), paras: [
          L("Il progetto si è concluso con la produzione di un video corporate emozionale di circa 4 minuti, con vere riprese multicamera e interviste.",
            "The project wrapped up with the production of an emotional corporate video, about 4 minutes long, with real multi-camera footage and interviews."),
          L("Mi sono occupata direttamente del montaggio finale: selezione delle interviste, alternanza delle camere, ritmo narrativo, musica e costruzione emotiva del video.",
            "I handled the final edit myself: selecting the interviews, alternating between cameras, narrative pacing, music and the video's emotional build.")
        ] },
        { type: "highlight", html: L("Dall'analisi al set.<br><em>Dalla strategia al racconto.</em>", "From analysis to set.<br><em>From strategy to storytelling.</em>") },
        { type: "list", kicker: L("Il mio contributo", "My contribution"), items: [
          [L("Strategy · in team", "Strategy · as a team"), L("Analisi, posizionamento, target e sviluppo della strategia insieme a una collega.", "Analysis, positioning, target audience and strategy development together with a colleague.")],
          [L("Content System · in team", "Content System · as a team"), L("Definizione di rubriche, formati e piano editoriale.", "Defining recurring columns, formats and the editorial plan.")],
          [L("Visual Direction · in team", "Visual Direction · as a team"), L("Scelta dei font, direzione grafica e adattamento dei contenuti.", "Choosing fonts, art direction and adapting content.")],
          [L("Video Production · in team", "Video Production · as a team"), L("Riprese multicamera e interviste.", "Multi-camera footage and interviews.")],
          [L("Video Editing · a mia cura", "Video Editing · my own work"), L("Montaggio completo del video corporate.", "Full edit of the corporate video.")]
        ] }
      ],
      closing: {
        title: L("Prima capire cosa rende un professionista diverso.<br>Poi trovare il modo di farlo percepire.",
          "First understand what makes a professional different.<br>Then find a way to make it felt."),
        text: L("La strategia funziona davvero quando riesce a diventare contenuto.", "Strategy really works when it manages to become content.")
      }
    },
    {
      id: "fresko",
      name: "Fresko",
      tag: "Naming · Visual Identity · Product Concept",
      color: "#C8FF00",
      ink: "#0F2B1E",
      cover: { src: "assets/fresko/wordmark.webp", alt: L("Logo Fresko", "Fresko logo"), fit: "logo" },
      title: L("Fresco, ma con la K.", "Fresh, but with a K."),
      desc: L("Naming e identità visiva per una web app che aiuta a ricordare cosa c'è in frigo, monitorare le scadenze e utilizzare gli alimenti prima che vengano sprecati.",
        "Naming and visual identity for a web app that helps you remember what's in the fridge, track expiration dates and use food before it goes to waste."),
      secondary: L("Fresko · Web app anti-spreco", "Fresko · Anti-food-waste web app"),
      link: { href: "https://fresko-hazel.vercel.app/", label: "Web app" },
      skills: ["Naming", "Logo", "Mascot Design", "Visual Direction", "Brand Language", "Product Application"],
      question: L("Lo spreco non doveva essere il protagonista.<br>Il cibo sì.", "Waste wasn't meant to be the protagonist.<br>Food was."),
      intro: [
        L("Fresko nasce come web app anti-spreco pensata per aiutare le persone a sapere cosa hanno già in casa, tenere sotto controllo le scadenze e trovare modi per utilizzare gli alimenti prima che vengano dimenticati o buttati.",
          "Fresko was born as an anti-food-waste web app designed to help people know what they already have at home, keep track of expiration dates, and find ways to use ingredients before they're forgotten or thrown away."),
        L("L'obiettivo non era costruire una comunicazione moralista o troppo “green”, ma rendere il tema dello spreco alimentare più vicino, giovane e appetibile.",
          "The goal wasn't to build a preachy or overly “green” message, but to make food waste feel closer, younger and more appetizing.")
      ],
      blocks: [
        { type: "text", title: L("Fresco, ma con la K.", "Fresh, but with a K."), paras: [
          L("Il naming doveva essere breve, facile da ricordare, internazionale, giovane e coerente con un prodotto digitale legato al cibo.",
            "The name had to be short, easy to remember, international, young and consistent with a digital product tied to food."),
          L("Il nome richiama immediatamente il concetto di freschezza, mentre la K lo rende più distintivo, contemporaneo e riconoscibile.",
            "The name immediately evokes freshness, while the K makes it more distinctive, contemporary and recognizable.")
        ] },
        { type: "highlight", html: "KEEP IT <em>FRESKO.</em>" },
        { type: "gallery", bare: true, dir: "assets/fresko/", items: ["wordmark", "mascot"] },
        { type: "text", title: L("Dare un volto al brand.", "Giving the brand a face."), paras: [
          L("Il limone sostituisce visivamente la “O” di Fresko e da lui nasce anche la mascotte: cappellino e occhiali aggiungono personalità e trasformano il simbolo in un personaggio riconoscibile, giovane e informale.",
            "The lemon visually replaces the “O” in Fresko, and the mascot is born from it too: a cap and sunglasses add personality and turn the symbol into a recognizable, young and informal character.")
        ] },
        { type: "palette", items: [[L("Verde scuro", "Dark green"), "#0F2B1E"], [L("Verde secondario", "Secondary green"), "#1D4D34"], ["Lime", "#C8FF00"], ["Off-white", "#F2F2E9"], [L("Giallo", "Yellow"), "#FFD600"]] },
        { type: "text", title: L("L'identità entra nel prodotto.", "The identity moves into the product."), paras: [
          L("Logo, palette, tipografia, immagini food e tone of voice sono stati applicati alla web app per mantenere la stessa personalità anche nell'esperienza digitale.",
            "Logo, palette, typography, food imagery and tone of voice were all applied to the web app to keep the same personality in the digital experience too."),
          L("Un'interfaccia che parla di anti-spreco attraverso il desiderio di utilizzare il cibo, non attraverso il senso di colpa.",
            "An interface that talks about anti-waste through the desire to use food, not through guilt.")
        ] },
        { type: "gallery", wide: true, dir: "assets/fresko/", items: ["homepage", "mission-vision"] },
        { type: "list", kicker: L("Il mio contributo", "My contribution"), items: [
          ["Naming", L("Definizione del nome Fresko e del suo posizionamento verbale.", "Defining the name Fresko and its verbal positioning.")],
          ["Logo", L("Sviluppo del wordmark e utilizzo del limone come elemento distintivo.", "Developing the wordmark and using the lemon as a distinctive element.")],
          ["Mascot Design", L("Creazione della mascotte e del suo tono giovane e riconoscibile.", "Creating the mascot and defining its young, recognizable tone.")],
          ["Visual Direction", L("Palette, typography e linguaggio grafico.", "Palette, typography and graphic language.")],
          ["Brand Language", L("Payoff, mission e vision.", "Payoff, mission and vision.")],
          ["Product Application", L("Applicazione dell'identità alla web app.", "Applying the identity to the web app.")]
        ] }
      ],
      closing: { title: L("Far venire voglia di usare quello che hai già.", "Making you want to use what you already have.") }
    }
  ];
})();
