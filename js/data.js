/* Contenuti dei case study, in italiano e inglese.
   L(it, en) restituisce il testo nella lingua attiva (vedi i18n.js).
   Ogni progetto è una sequenza di "blocchi" che main.js trasforma in markup:
   text · list · steps · stats · gallery · videos · highlight · palette · images. */
(function () {
  var L = window.I18N.L;

  window.PROJECTS = [
    {
      id: "buddyjob",
      name: "BuddyJob",
      tag: "Content Strategy · Creative Direction",
      color: "var(--lavender)",
      ink: "var(--mist)",
      cover: { src: "assets/buddyjob/brand/logo.webp", alt: L("Logo BuddyJob", "BuddyJob logo"), fit: "logo" },
      title: L("Leggere il lavoro. Poi raccontarlo.", "Reading the work. Then telling it."),
      // dato d'aggancio sotto il titolo della card
      hook: L("3,7M visualizzazioni · 2,6M account raggiunti", "3.7M views · 2.6M accounts reached"),
      desc: L(
        "Per BuddyJob seguo la comunicazione social dalla strategia all'esecuzione: ricerca, concept, copy, grafica e video, per far crescere la community e far conoscere i servizi di consulenza.",
        "For BuddyJob I run social communication from strategy to execution: research, concept, copy, design and video, to grow the community and make the career coaching services known."
      ),
      link: { href: "https://www.instagram.com/buddyjob_it/", label: "Instagram" },
      skills: ["Content Strategy", "Creative Direction", "Social Media Management", "Graphic Design", "Copywriting", "Video Editing", "Community Management", "Performance Analysis"],
      question: L("Far crescere una community.<br>E far conoscere un servizio.", "Growing a community.<br>And making a service known."),
      // riga di sintesi sotto il titolo del case study
      meta: L("Content Marketing & Creative Direction · Career development · Team social di due persone",
        "Content Marketing & Creative Direction · Career development · Two-person social team"),
      // copertina del carosello red flags in evidenza nell'hero
      heroImg: { src: "assets/buddyjob/redflags/cover.webp", alt: L("Copertina del carosello 10 frasi che in un ambiente di lavoro sono red flags", "Cover of the carousel 10 phrases that are red flags in a workplace") },
      intro: [
        L("BuddyJob si occupa di orientamento e consulenza di carriera. Sui social parla a chi il lavoro lo sta cercando, cambiando o semplicemente vivendo: colloqui, stipendi, crescita, dinamiche aziendali.",
          "BuddyJob works in career guidance and coaching. On social it talks to people who are looking for work, changing it or simply living it: interviews, salaries, growth, office dynamics."),
        L("In un team social di due persone ho gestito in autonomia tutto il processo editoriale e creativo, dalla ricerca alla pubblicazione, contribuendo alla direzione creativa della comunicazione.",
          "In a two-person social team I ran the whole editorial and creative process on my own, from research to publishing, and helped shape the creative direction of the brand's communication.")
      ],
      blocks: [
        /* --- La sfida --- */
        { type: "text", kicker: L("La sfida", "The challenge"), title: L("Due obiettivi, un solo linguaggio.", "Two goals, one language."), paras: [
          L("Da una parte serviva visibilità: contenuti capaci di intercettare bisogni, conversazioni e trend del lavoro, e di costruire una community coinvolta. Dall'altra bisognava raccontare le consulenze di carriera e trasformare quell'attenzione in interesse per il servizio.",
            "On one side, the brand needed visibility: content that taps into the needs, conversations and trends of working life, and builds an engaged community. On the other, the career coaching had to be explained, turning that attention into interest in the service."),
          L("Ironia e attualità raggiungono tante persone; un servizio di consulenza chiede fiducia e approfondimento. Il mio lavoro è stato tenere insieme le due cose, con una voce coerente e riconoscibile.",
            "Irony and current events reach a lot of people; a coaching service asks for trust and depth. My job was to hold the two together, with a voice that stays consistent and recognizable.")
        ] },
        { type: "highlight", html: L("Prima farsi notare. <em>Poi farsi scegliere.</em>", "Get noticed first. <em>Then get chosen.</em>") },

        /* --- Il mio ruolo --- */
        { type: "list", kicker: L("Il mio ruolo · dalla strategia all'esecuzione", "My role · from strategy to execution"), items: [
          ["Content Strategy", L("Target, ricerca su trend e dati, insight, piano editoriale, format e obiettivi di ogni contenuto.", "Audience, research on trends and data, insights, editorial plan, formats and the goal of each piece.")],
          ["Creative Direction", L("Concept, rubriche ricorrenti e linguaggio visivo, adattando l'identità del brand a ogni formato.", "Concepts, recurring series and visual language, adapting the brand identity to every format.")],
          ["Content Production", L("Caroselli, grafica, hook, caption e CTA, video e reel, meme e stories interattive.", "Carousels, design, hooks, captions and CTAs, videos and reels, memes and interactive stories.")],
          ["Community Management", L("Commenti, conversazioni e meccaniche interattive, con keyword e DM per distribuire risorse.", "Comments, conversations and interactive mechanics, using keywords and DMs to share resources.")],
          ["Performance & Optimization", L("Lettura di reach, visualizzazioni e interazioni per capire cosa funziona e migliorare hook, struttura e CTA.", "Reading reach, views and interactions to see what works and refine hooks, structure and CTAs.")]
        ] },

        /* --- I numeri --- */
        { type: "stats", kicker: L("I numeri", "The numbers"), items: [
          [36703, "", L("follower attuali", "current followers")],
          [3.7, "M", L("visualizzazioni", "views")],
          [2.6, "M", L("account raggiunti", "accounts reached")],
          [289, "K", L("interazioni", "interactions")],
          // in evidenza: la reach del carosello red flags (Case 05)
          [1.5, "M", L("reach di un singolo carosello", "reach of a single carousel"), "", true],
          [722, "", L("clic al link in bio", "link-in-bio clicks")]
        ],
          note: L("Follower aggiornati al 5 novembre 2026. Visualizzazioni, account raggiunti e interazioni vengono da rilevazioni precedenti; i clic al link in bio si riferiscono agli ultimi 90 giorni del periodo misurato.",
            "Followers as of November 5, 2026. Views, accounts reached and interactions come from earlier measurements; link-in-bio clicks refer to the last 90 days of the measured period.") },

        /* --- Ecosistema --- */
        { type: "list", kicker: L("Formati diversi, obiettivi diversi, una sola voce", "Different formats, different goals, one voice"), items: [
          [L("Dati e attualità", "Data & news"), L("Ricerche e notizie sul lavoro trasformate in caroselli chiari e condivisibili.", "Research and work news turned into clear, shareable carousels."), "case01"],
          [L("Intrattenimento", "Entertainment"), L("Meme e situazioni d'ufficio in cui riconoscersi e da mandare a un collega.", "Memes and office moments to recognize yourself in and send to a colleague."), "case02"],
          [L("Consigli di carriera", "Career advice"), L("Colloqui, aumenti, red flag e nuovi fenomeni: contenuti utili da salvare.", "Interviews, raises, red flags and new trends: useful content worth saving."), "case05"],
          [L("Servizi", "Services"), L("Problemi reali del pubblico come punto di partenza per raccontare la consulenza.", "People's real problems as the starting point for explaining coaching."), "case04"],
          [L("Stories e community", "Stories & community"), L("Domande e situazioni di lavoro, con l'articolo del blog inviato in DM a chi lo chiede.", "Questions and work situations, with the blog article sent by DM to whoever asks."), "community"]
        ] },

        /* --- Case 01 · Data Storytelling ---
           TODO: segnaposto in attesa del carosello sui dati (es. salari o AI e lavoro):
           aggiornare titolo e testo quando arriva il materiale e caricare BJ-01..BJ-03 in assets/buddyjob/data/ */
        { type: "text", anchor: "case01", kicker: "Case 01 · Data Storytelling", title: L("Rendere leggibile un dato complesso.", "Making complex data readable."), paras: [
          L("Salari e potere d'acquisto, trasparenza salariale, AI e occupazione, contratti scaduti: temi densi, che sui social rischiano di passare inosservati. Il lavoro parte dalle fonti, seleziona i dati che contano, trova l'angolo narrativo e lo traduce in testi e grafica facili da leggere e da condividere.",
            "Salaries and purchasing power, pay transparency, AI and jobs, expired contracts: dense topics that can easily go unnoticed on social. The work starts from the sources, picks the data that matters, finds the narrative angle and turns it into copy and design that are easy to read and share.")
        ] },
        { type: "images", ratio: "4/5", items: [
          { code: "BJ-01", desc: L("Carosello dati · cover", "Data carousel · cover"), src: "assets/buddyjob/data/BJ-01.webp" },
          { code: "BJ-02", desc: L("Carosello dati · slide interna", "Data carousel · inside slide"), src: "assets/buddyjob/data/BJ-02.webp" },
          { code: "BJ-03", desc: L("Carosello dati · slide interna", "Data carousel · inside slide"), src: "assets/buddyjob/data/BJ-03.webp" }
        ] },

        /* --- Case 02 · Entertainment & Engagement --- */
        { type: "text", anchor: "case02", kicker: "Case 02 · Entertainment & Engagement", title: L("Non tutti i contenuti devono spiegare qualcosa.", "Not every piece of content has to explain something."), paras: [
          L("Dopo una settimana di temi densi il feed ha bisogno di respirare. I meme partono da situazioni quotidiane, colloqui, manager, colleghi, e danno alla community qualcosa da mandare subito a qualcuno.",
            "After a week of dense topics, the feed needs to breathe. The memes start from everyday situations, interviews, managers, colleagues, and give the community something to send to someone straight away.")
        ] },
        { type: "gallery", dir: "assets/buddyjob/meme/", items: ["drama", "work", "september"] },
        { type: "stats", small: true, items: [
          [223, "K", L("persone raggiunte", "people reached")], [29.6, "K", L("interazioni", "interactions")],
          // in evidenza: è il dato che conferma il testo (le condivisioni superano i like)
          [14.6, "K", L("condivisioni", "shares"), "", true],
          [13.1, "K", L("like/reazioni", "likes/reactions")], [1390, "", L("salvataggi", "saves")]
        ], note: L("Dati di un singolo meme.", "Figures for a single meme.") },
        { type: "text", small: true, paras: [L("Le condivisioni hanno superato i like: il contenuto non è stato solo apprezzato, è diventato qualcosa da mandare a un collega.",
          "Shares outpaced likes: the content wasn't just liked, it became something to send to a colleague.")] },

        /* --- Case 03 · Creative Campaign --- */
        { type: "text", kicker: "Case 03 · Creative Campaign", title: L("Un horror d'ufficio.", "An office horror."), paras: [
          L("Per Halloween le situazioni più temute della vita d'ufficio sono diventate locandine di film horror, con titolo, tagline e la stessa CTA: prenotare la prima call gratuita. Un format a struttura fissa, a cui si aggiungono nuovi titoli senza riprogettare nulla.",
            "For Halloween, the most dreaded moments of office life became horror movie posters, each with a title, a tagline and the same CTA: book your first free call. A fixed-structure format, where new titles can be added without redesigning anything."),
          '<a class="cb-link" href="#" data-next="horror" data-cursor="apri">' + L("Guarda la campagna completa", "See the full campaign") + " →</a>"
        ] },
        { type: "images", layout: "trio", ratio: "4/5", items: [
          { code: "The Ping", desc: L("L'hai letto. Ora non puoi più ignorarlo.", "You've read it. Now you can't ignore it."), src: "assets/buddyjob/halloween/the-ping.webp",
            alt: L("Locandina The Ping", "The Ping poster") },
          { code: "Smile", desc: L("Sorridi. Il manager ti sta guardando.", "Smile. Your manager is watching."), src: "assets/buddyjob/halloween/smile.webp",
            alt: L("Locandina Smile", "Smile poster") },
          { code: "Deadline", desc: L("Vuoi finire in tempo?", "Do you want to finish in time?"), src: "assets/buddyjob/halloween/deadline.webp",
            alt: L("Locandina Deadline", "Deadline poster") }
        ] },

        /* --- Case 04 · Product Communication --- */
        { type: "text", anchor: "case04", kicker: "Case 04 · Product Communication", title: L("Partire dal problema, non dal servizio.", "Start from the problem, not the service."), paras: [
          L("I contenuti sulle consulenze partono da difficoltà reali: una crescita che si blocca, un rapporto complicato con il manager, un cambio di carriera. Solo dopo arriva il ruolo della consulenza, con una narrazione autentica e coerente con il resto del profilo.",
            "The coaching content starts from real struggles: growth that stalls, a difficult relationship with a manager, a career change. Only then comes the role of coaching, told in a way that feels genuine and consistent with the rest of the profile.")
        ] },
        { type: "images", layout: "trio", ratio: "4/5", items: [
          { code: "BJ-04", desc: L("«Mi candido da mesi, ma non mi chiama nessuno.»", "“I've been applying for months, but nobody calls me back.”"), src: "assets/buddyjob/servizi/BJ-04.webp",
            alt: L("Carosello: «Mi candido da mesi, ma non mi chiama nessuno.»", "Carousel: “I've been applying for months, but nobody calls me back.”") },
          { code: "BJ-05", desc: L("Cosa facciamo in consulenza quando dici “So solo che così non posso continuare”", "What we do in coaching when you say “I just know I can't go on like this”"), src: "assets/buddyjob/servizi/BJ-05.webp",
            alt: L("Carosello: Cosa facciamo in consulenza quando dici “So solo che così non posso continuare”", "Carousel: What we do in coaching when you say “I just know I can't go on like this”") },
          { code: "BJ-06", desc: L("In quali momenti ti senti bravo nel tuo lavoro?", "When do you feel good at your job?"), src: "assets/buddyjob/servizi/BJ-06.webp",
            alt: L("Carosello: In quali momenti ti senti bravo nel tuo lavoro?", "Carousel: When do you feel good at your job?") }
        ] },

        /* --- Case 05 · Educational Storytelling --- */
        { type: "text", anchor: "case05", kicker: "Case 05 · Educational Storytelling", title: L("Leggere i commenti prima di scrivere il post.", "Reading the comments before writing the post."), paras: [
          L("Una notizia molto discussa aveva acceso una conversazione sui comportamenti normalizzati al lavoro. Invece di fermarmi alla notizia sono andata a leggere come ne parlavano le persone: nei commenti tornavano sempre le stesse frasi.",
            "A widely discussed news story had sparked a conversation about normalized behavior at work. Instead of stopping at the headline, I read how people were talking about it: the same phrases kept coming back in the comments.")
        ] },
        { type: "highlight", html: L("Da lì è nato: <em>“10 frasi che in un ambiente di lavoro sono red flags”</em>.", "That's where <em>“10 phrases that are red flags in a workplace”</em> came from.") },
        { type: "gallery", dir: "assets/buddyjob/redflags/", items: ["cover", "tutti-devono-saper-fare-tutto", "siamo-una-grande-famiglia", "io-non-faccio-pausa-pranzo", "ringrazia-di-avere-un-lavoro", "deve-essere-pronto-per-ieri", "puoi-rimanere-tanto", "ora-si-ricomincia", "faccio-questo-lavoro-da-20-anni", "sei-pagato-per-lavorare", "impegno-e-passione"] },
        { type: "stats", small: true, items: [
          [1.5, "M", L("persone raggiunte", "people reached"), "", true], [113, "K", L("interazioni", "interactions")], [29.4, "K", L("condivisioni", "shares")],
          [19.8, "K", L("salvataggi", "saves")]
        ], note: L("Un solo carosello, nessuna sponsorizzazione.", "One carousel, no paid promotion.") },
        { type: "text", title: L("Un fenomeno nuovo chiede una forma nuova.", "A new trend needs a new form."), paras: [
          L("Quando soft-on day e soft-off day sono entrati nella conversazione sul lavoro, ho approfondito il fenomeno e costruito un carosello che ne spiegasse significato e contesto. Fotografia, tipografia, collage e movimento cambiano lungo le slide seguendo il contenuto, invece di chiuderlo in un unico template.",
            "When soft-on days and soft-off days entered the conversation about work, I dug into the trend and built a carousel explaining what it means and where it comes from. Photography, type, collage and motion shift across the slides to follow the content, instead of locking it into a single template.")
        ] },
        { type: "gallery", dir: "assets/buddyjob/softdays/", items: ["cover", "switch", "pink", "equity", "animation-01.mp4", "soft-off-day", "fast-company", "non-sappiamo-ancora", "animation-02.mp4", "preferiresti"] },

        /* --- Video e community --- */
        { type: "text", anchor: "community", kicker: L("Video e community", "Video & community"), title: L("Alcune idee hanno bisogno di muoversi.", "Some ideas need to move."), paras: [
          L("Per i video scrivo lo script, giro e monto. Il criterio è lo stesso dei caroselli: partire da quello che le persone vivono davvero al lavoro, a volte proprio dai loro commenti.",
            "For video I write the script, shoot and edit. The approach is the same as the carousels: start from what people actually go through at work, sometimes straight from their comments."),
          L("Nelle stories la conversazione continua: domande e situazioni di lavoro a cui la community risponde, spesso collegate a un articolo del blog BuddyJob che arriva in DM a chi lo chiede con una keyword.",
            "In Stories the conversation keeps going: questions and work situations the community responds to, often linked to a BuddyJob blog article sent by DM to anyone who asks with a keyword.")
        ] },
        { type: "gallery", vertical: true, items: [
          { src: "assets/buddyjob/video/risposta-ai-commenti.mp4", poster: "assets/buddyjob/video/risposta-ai-commenti.webp" },
          { src: "assets/buddyjob/video/tutti-ci-lamentiamo.mp4", poster: "assets/buddyjob/video/tutti-ci-lamentiamo.webp" },
          { src: "assets/buddyjob/video/consulenza-di-carriera.mp4", poster: "assets/buddyjob/video/consulenza-di-carriera.webp" }
        ] },

        /* --- Processo --- */
        { type: "steps", kicker: L("Il processo", "The process"), items: [L("Ricerca", "Research"), "Insight", "Concept", "Design", L("Distribuzione", "Distribution"), L("Analisi", "Analysis")] },
        { type: "text", small: true, paras: [
          L("Ogni contenuto parte da un tema rilevante e da un insight trovato tra dati, notizie e conversazioni; poi angolo narrativo, format e direzione visiva, fino alla pubblicazione. I risultati decidono cosa migliorare nel contenuto successivo.",
            "Every piece starts from a relevant topic and an insight found in data, news and conversations; then the narrative angle, format and visual direction, all the way to publishing. The results decide what to improve in the next one."),
          L("Uso l'AI come supporto a ricerca, brainstorming e alcune fasi di produzione, mantenendo il controllo creativo e verificando ogni informazione. Strumenti: Illustrator, Photoshop, Premiere Pro, ChatGPT, Claude, Perplexity.",
            "I use AI to support research, brainstorming and some production steps, while keeping creative control and checking every piece of information. Tools: Illustrator, Photoshop, Premiere Pro, ChatGPT, Claude, Perplexity.")
        ] }
      ],
      closing: {
        title: L("Strategia e creatività,<br>nello stesso processo.", "Strategy and creativity,<br>in the same process."),
        text: L("Per BuddyJob ho lavorato sulla crescita della community e sulla comunicazione dei servizi, con contenuti pensati per obiettivi diversi. Dalla ricerca alla scrittura, dalla direzione creativa alla grafica e al video, fino alla lettura dei risultati: è questo il modo in cui mi piace lavorare.",
          "For BuddyJob I worked on both growing the community and communicating the services, with content built for different goals. From research to writing, from creative direction to design and video, all the way to reading the results: that's how I like to work.")
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
    /* Prova di selezione. Le immagini usano il segnaposto (ph): se un file manca
       resta il riquadro tratteggiato con codice e descrizione. */
    {
      id: "suarez",
      name: "Suarez",
      tag: L("Social Audit · Strategia di lancio · Multicanale", "Social Audit · Launch Strategy · Multichannel"),
      color: "var(--mist-3)",
      ink: "var(--graphite)",
      cover: { fit: "photo", ph: { code: "SZ-00", desc: L("Copertina del progetto", "Project cover"), src: "assets/prove/suarez/SZ-00.webp" } },
      title: L("Il layering, anche per la casa.", "Layering, for the home too."),
      hook: L("4 profili analizzati, 1 strategia di lancio, 4 canali", "4 profiles audited, 1 launch strategy, 4 channels"),
      desc: L("Audit dei profili di un gruppo di profumazioni per casa e bucato, e strategia di lancio per una nuova gamma di ammorbidenti.",
        "An audit of the profiles of a home and laundry fragrance group, and a launch strategy for a new range of fabric softeners."),
      secondary: L("Social Media & Content Creator Challenge · Suarez Company · Ottobre 2026", "Social Media & Content Creator Challenge · Suarez Company · October 2026"),
      skills: ["Social Audit", "Brand Positioning", "Launch Strategy", "Influencer Marketing", "Moodboard", "Content Creation", "Video Editing"],
      question: L("Come lanci un ammorbidente come se fosse un profumo?", "How do you launch a fabric softener as if it were a perfume?"),
      meta: L("Prova di selezione · non commissionata né pubblicata · Instagram, TikTok, Facebook, Pinterest",
        "Hiring challenge · not commissioned or published · Instagram, TikTok, Facebook, Pinterest"),
      blocks: [
        { type: "text", title: L("Da dove partivo", "Where I started"), paras: [
          L("Quattro profili, tutti sotto i 5.000 follower, ognuno con un punto di forza da valorizzare. Sweet Home aveva prodotti perfetti per i social e un mondo riconoscibile come quello di Layali: il passo successivo era dare al feed una regia e raccontare il Made in Italy dell'azienda.",
            "Four profiles, all under 5,000 followers, each with a strength worth building on. Sweet Home had products made for social and a world as recognizable as Layali's: the next step was to give the feed a sense of direction and tell the story of the company's Made in Italy.")
        ] },
        { type: "highlight", html: L("Come si stratificano i profumi sul corpo, si possono stratificare <em>anche in casa.</em>",
          "Just as you layer fragrances on your skin, you can layer them <em>at home too.</em>") },
        { type: "text", small: true, paras: [
          L("Ammorbidente, profumo per bucato, profumo per tessuti, profumatore: Sweet Home punta sulle fragranze e crea questa esigenza.",
            "Fabric softener, laundry perfume, fabric spray, home diffuser: Sweet Home leads with fragrance and creates the need.")
        ] },
        { type: "text", kicker: L("Il feed", "The feed"), title: L("Due anime ai lati, le persone al centro", "Two souls on the sides, people in the middle"), paras: [
          L("A sinistra la linea orientale, calda e preziosa. A destra la linea pop, fresca e allegra. Al centro le persone: creator, ufficio, backstage dello spot TV. Con l'AI solo per il mood, mai al posto del prodotto.",
            "On the left, the oriental line: warm and precious. On the right, the pop line: fresh and cheerful. In the middle, people: creators, the office, behind the scenes of the TV ad. AI only for mood, never in place of the product.")
        ] },
        { type: "images", layout: "pair", ratio: "16/9", items: [
          { code: "SZ-01", desc: L("Schema del feed", "Feed layout"), src: "assets/prove/suarez/SZ-01.webp" },
          { code: "SZ-02", desc: L("Moodboard", "Moodboard"), src: "assets/prove/suarez/SZ-02.webp" }
        ] },
        { type: "text", kicker: L("I contenuti", "The content"), paras: [
          L("Un carosello per la linea orientale, che fa sentire il profumo di Oudiyah attraverso la foto, e un reel reveal per la linea pop: gli spezzoni diventano i teaser prima del lancio.",
            "A carousel for the oriental line, letting you smell Oudiyah through a photo, and a reveal reel for the pop line: its cut-downs become the teasers ahead of launch.")
        ] },
        { type: "images", ratio: "4/5", items: [
          { code: "SZ-03", desc: L("Carosello Oudiyah · Che profumo ha casa tua?", "Oudiyah carousel · What does your home smell like?"), src: "assets/prove/suarez/SZ-03.webp" },
          { code: "SZ-04", desc: L("Carosello Oudiyah · Quello delle lenzuola appena cambiate", "Oudiyah carousel · Like freshly changed sheets"), src: "assets/prove/suarez/SZ-04.webp" },
          { code: "SZ-05", desc: L("Carosello Oudiyah · Per tessuti e ambienti", "Oudiyah carousel · For fabrics and rooms"), src: "assets/prove/suarez/SZ-05.webp" },
          { code: "SZ-06", desc: L("Carosello Oudiyah · Un gesto semplice", "Oudiyah carousel · One simple gesture"), src: "assets/prove/suarez/SZ-06.webp" },
          { code: "SZ-07", desc: L("Carosello Oudiyah · Caldo. Intenso. Avvolgente.", "Oudiyah carousel · Warm. Intense. Enveloping."), src: "assets/prove/suarez/SZ-07.webp" }
        ] },
        // reel reveal della linea Fiorito: parte muto quando entra nello schermo, al clic si apre con l'audio
        { type: "gallery", vertical: true, items: [
          { src: "assets/prove/suarez/fiorito-reel.mp4", poster: "assets/prove/suarez/fiorito-reel.webp" }
        ] },
        { type: "steps", kicker: L("Il lancio in quattro fasi", "A four-phase launch"),
          items: [L("Teasing", "Teasing"), L("Reveal + ADV", "Reveal + ADV"), L("Amplificazione", "Amplification"), L("Mantenimento", "Sustain")] },
        { type: "text", small: true, paras: [
          L("Prima creo desiderio, poi presento la gamma e la spingo subito, poi amplifico ciò che funziona e infine faccio vivere il prodotto attraverso le persone e i contenuti evergreen.",
            "First I build desire, then I introduce the range and push it straight away, then I amplify what works, and finally I keep the product alive through people and evergreen content.")
        ] },
        { type: "list", kicker: L("Un ruolo per ogni canale", "A role for every channel"), items: [
          ["Instagram", L("Editoriale e sensoriale.", "Editorial and sensory.")],
          ["TikTok", L("Conversazione, trend, routine del bucato.", "Conversation, trends, laundry routines.")],
          ["Facebook", L("Informativo e commerciale.", "Informative and commercial.")],
          ["Pinterest", L("Un universo visivo che resta vivo nel tempo.", "A visual world that stays alive over time.")]
        ] },
        { type: "text", small: true, paras: [
          L("E un test creativo su Meta: influencer-led contro brand-led, stesso pubblico e stesso budget, per capire quale linguaggio funziona meglio.",
            "Plus a creative test on Meta: influencer-led versus brand-led, same audience and same budget, to see which language works better.")
        ] }
      ],
      closing: {
        title: L("Non lanciamo solo una gamma di ammorbidenti.<br>Lanciamo diversi modi di far profumare la casa.",
          "We're not just launching a range of fabric softeners.<br>We're launching new ways to make a home smell good."),
        note: L("Alcune immagini di sfondo e di prodotto sono state generate con l'AI e rifinite in Illustrator.",
          "Some background and product images were generated with AI and refined in Illustrator.")
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
          ["assets/sinapss/video-05.mp4", "Veramente", "Social video", "Editing"],
          ["assets/sinapss/video-06.mp4", "Veramente", "Social video", "Editing"],
          ["assets/sinapss/video-07.mp4", "Casamare", "Social video", "Editing"],
          ["assets/sinapss/video-08.mp4", "Alfredo", "Social video", "Editing"]
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
      id: "horror",
      name: L("Un horror d'ufficio", "An Office Horror"),
      tag: "ADV · Concept · Copywriting",
      color: "#ff2d55",
      ink: "#141414",
      cover: { src: "assets/buddyjob/halloween/the-ping.webp", alt: L("Locandina The Ping della campagna Un horror d'ufficio", "The Ping poster from the An Office Horror campaign"), fit: "photo" },
      title: L("La tua carriera non deve essere un horror.", "Your career shouldn't be a horror movie."),
      hook: L("~320 lead e 74 acquisti a ~3,50 € per risultato", "~320 leads and 74 purchases at ~€3.50 per result"),
      desc: L("Campagna ADV di Halloween per BuddyJob: le situazioni più temute della vita d'ufficio diventano locandine di film horror, per far prenotare la prima call gratuita.",
        "A Halloween ad campaign for BuddyJob: the most dreaded moments of office life become horror movie posters, to get people to book their first free call."),
      secondary: L("BuddyJob · Campagna ADV di Halloween", "BuddyJob · Halloween ad campaign"),
      skills: ["Concept", "Copywriting", "Visual Design", "Meta Ads", "Social Media Management"],
      question: L("E se le paure d'ufficio fossero film horror?", "What if office fears were horror movies?"),
      meta: L("Meta Ads · feed Instagram e Facebook · Halloween · Concept, copy, creatività e gestione social",
        "Meta Ads · Instagram and Facebook feed · Halloween · Concept, copy, creative and social management"),
      // locandina in evidenza nell'hero
      heroImg: { src: "assets/buddyjob/halloween/the-ping.webp", alt: L("Locandina The Ping: L'hai letto. Ora non puoi più ignorarlo.", "The Ping poster: You've read it. Now you can't ignore it.") },
      blocks: [
        { type: "text", kicker: L("La sfida", "The challenge"), title: L("Parlare di disagio, senza pesare.", "Talking about discomfort, without the weight."), paras: [
          L("Feedback infiniti, recruiter che spariscono, reperibilità continua: il disagio lavorativo lo conoscono tutti, ma raccontarlo così com'è rischia di diventare pesante. E un servizio di coaching, nel feed, prima di tutto deve farsi notare.",
            "Endless feedback, recruiters who vanish, being reachable all the time: everyone knows what workplace discomfort feels like, but telling it straight can easily get heavy. And in the feed, a coaching service first has to get noticed.")
        ] },
        { type: "text", kicker: L("L'idea", "The idea"), title: L("Ogni frustrazione d'ufficio diventa un film horror.", "Every office frustration becomes a horror movie."), paras: [
          L("Basta un titolo e una tagline per ritrovarsi nella scena: il riconoscimento è immediato. E l'ironia abbassa la diffidenza verso un servizio di coaching, trasformando una paura in un sorriso e il sorriso in una call.",
            "A title and a tagline are all it takes to see yourself in the scene: recognition is instant. And the irony lowers people's guard toward a coaching service, turning a fear into a smile, and the smile into a call.")
        ] },
        { type: "highlight", html: L("La tua carriera non deve essere <em>un horror.</em>", "Your career shouldn't be <em>a horror movie.</em>") },
        { type: "stats", kicker: L("I risultati", "The results"), items: [
          [185, "K", L("persone raggiunte", "people reached")],
          [268, "K", L("visualizzazioni complessive", "total views")],
          [14, "K+", L("interazioni", "interactions")],
          // in evidenza: è il dato che conferma il commento sotto
          [8, "%", L("engagement rate", "engagement rate"), "", true],
          [320, "", "lead"],
          [74, "", L("acquisti", "purchases")],
          [3.5, " €", L("costo per risultato", "cost per result"), "", false, 2]
        ], note: L("Valori arrotondati.", "Rounded figures.") },
        { type: "text", small: true, paras: [
          L("Il tono ironico ha generato un engagement ben sopra la media del settore e ha convertito l'attenzione in lead e acquisti a un costo contenuto.",
            "The ironic tone drove engagement well above the industry average, and turned attention into leads and purchases at a low cost.")
        ] },
        { type: "images", layout: "trio", ratio: "4/5", kicker: L("Le locandine", "The posters"), items: [
          { code: "The Ping", desc: L("L'hai letto. Ora non puoi più ignorarlo.", "You've read it. Now you can't ignore it."), src: "assets/buddyjob/halloween/the-ping.webp",
            alt: L("Locandina The Ping: L'hai letto. Ora non puoi più ignorarlo.", "The Ping poster: You've read it. Now you can't ignore it.") },
          { code: "Smile", desc: L("Sorridi. Il manager ti sta guardando.", "Smile. Your manager is watching."), src: "assets/buddyjob/halloween/smile.webp",
            alt: L("Locandina Smile: Sorridi. Il manager ti sta guardando.", "Smile poster: Smile. Your manager is watching.") },
          { code: "Deadline", desc: L("Vuoi finire in tempo?", "Do you want to finish in time?"), src: "assets/buddyjob/halloween/deadline.webp",
            alt: L("Locandina Deadline: Vuoi finire in tempo?", "Deadline poster: Do you want to finish in time?") }
        ] },
        { type: "list", kicker: L("Il sistema", "The system"), items: [
          [L("Struttura fissa", "Fixed structure"), L("“:BUDDYJOB presenta · Un horror d'ufficio”, titolo grande, tagline e la stessa CTA su ogni locandina.", "“:BUDDYJOB presents · An office horror”, a big title, a tagline and the same CTA on every poster.")],
          [L("Palette del brand", "Brand palette"), L("Rosso corallo, giallo e nero tengono insieme la serie.", "Coral red, yellow and black hold the series together.")],
          [L("Un sottogenere per titolo", "One subgenre per title"), L("Ogni locandina ha un trattamento visivo diverso, preso da un filone horror diverso.", "Each poster gets its own visual treatment, borrowed from a different horror subgenre.")],
          [L("Format scalabile", "Scalable format"), L("Si aggiungono nuovi titoli senza riprogettare nulla.", "New titles can be added without redesigning anything.")]
        ] }
      ],
      closing: {
        title: L("La struttura resta.<br>Cambia solo la paura.", "The structure stays.<br>Only the fear changes."),
        text: L("Per questo il format funziona: chi vede una locandina riconosce subito la seconda, e ogni nuova frustrazione d'ufficio può diventare il prossimo film.",
          "That's why the format works: once you've seen one poster you recognize the next one instantly, and every new office frustration can become the next movie.")
      }
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
      secondary: L("Progetto freelance · Web app anti-spreco", "Freelance project · Anti-food-waste web app"),
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

  // separatori dei gruppi di progetti (vedi Render.cardsHTML)
  window.PROJECT_GROUPS = {
    prove: {
      title: L("Prove di strategia", "Strategy trials"),
      text: L("Progetti nati per dei colloqui: brief reali, nessuna pubblicazione. Qui si vede soprattutto come ragiono.",
        "Projects born from job interviews: real briefs, nothing published. This is mostly where you see how I think.")
    }
  };
})();
