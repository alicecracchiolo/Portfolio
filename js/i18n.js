/* Lingua del sito: italiano (predefinito) e inglese.
   - I18N.lang è fissato al caricamento: tutto il sito (animazioni, split del
     testo, case study) si costruisce già nella lingua giusta.
   - Il cambio lingua ricarica la pagina dietro un sipario, senza rifare il
     loader e tornando allo stesso punto dello scroll.
   - L'HTML resta scritto in italiano; qui c'è la versione inglese dei testi
     statici, agganciata ai selettori. */
(function () {
  "use strict";

  var KEY = "site-lang";
  var SWITCH_KEY = "site-lang-switch";

  function readLang() {
    // #en / #it nel link vince (utile per condividere la versione inglese)
    var h = (location.hash || "").slice(1);
    if (h === "en" || h === "it") return h;
    try {
      var s = localStorage.getItem(KEY);
      if (s === "en" || s === "it") return s;
    } catch (e) {}
    return "it";
  }

  var lang = readLang();
  var en = lang === "en";
  document.documentElement.lang = lang;

  // stato lasciato dal cambio lingua (posizione di scroll), letto da main.js
  var switched = null;
  try {
    var raw = sessionStorage.getItem(SWITCH_KEY);
    if (raw) {
      sessionStorage.removeItem(SWITCH_KEY);
      switched = JSON.parse(raw);
    }
  } catch (e) {}

  function L(it, enText) {
    return en ? enText : it;
  }

  /* ---------- testi statici dell'HTML, versione inglese ---------- */
  var HTML_EN = [
    [".loader-line", "the best ideas <em>don't stand still</em>"],
    ['.nav-links a[href="#storia"]', '<span data-text="Story">Story</span>'],
    ['.nav-links a[href="#filosofia"]', '<span data-text="Philosophy">Philosophy</span>'],
    ['.nav-links a[href="#progetti"]', '<span data-text="Projects">Projects</span>'],
    ['.nav-links a[href="#contatti"]', '<span data-text="Contact">Contact</span>'],
    [".nav-cta > span", "Let's talk"],
    ['.menu-links a[href="#storia"]', "<small>01</small>Story"],
    ['.menu-links a[href="#filosofia"]', "<small>02</small>Philosophy"],
    ['.menu-links a[href="#progetti"]', "<small>03</small>Projects"],
    ['.menu-links a[href="#contatti"]', "<small>04</small>Contact"],
    [".hero-kicker", '<span class="dot"></span> Alice Cracchiolo — Content Marketing · Milan'],
    ["#heroTitle",
      '<span class="ht-line"><span class="ht-word">The</span> <span class="ht-word ht-idee">best<svg class="ht-underline"><use href="#d-squiggle" /></svg></span></span>' +
      '<span class="ht-line"><span class="ht-word ht-accent">ideas</span></span>' +
      '<span class="ht-line"><span class="ht-word">don\'t</span> <span class="ht-word">stand</span></span>' +
      '<span class="ht-line"><span class="ht-word ht-ferme" id="ferme" data-cursor="shake!">still</span><span class="ht-word">.</span></span>'],
    [".hero-lead", 'I turn what a brand has to say into something <span class="scribble">worth<svg><use href="#d-circle" /></svg></span> listening to.'],
    [".badge-text textPath", "see the projects ✦ see the projects ✦ "],
    [".hero-note span", "hover over it"],
    ["#storia .sec-title", "Story"],
    [".sticker-quote", "“Everything is scalable and reinventable.”"],
    [".storia-note", 'that\'s me, more or less <svg><use href="#d-arrow" /></svg>'],
    [".storia-hello", "Hi, I'm <em>Alice.</em>"],
    [".storia-copy .reveal-words:nth-of-type(2)", "I work in content marketing, and the part I care about most is figuring out what shape an idea needs to take to actually work. Sometimes that's a format, sometimes a video, a strategy, a visual, or something I didn't know how to make yet."],
    [".storia-copy .reveal-words:nth-of-type(3)", "Outside of work the material changes, not so much the mechanism: I read, I walk uphill whenever I can, I draw, I build things with my hands, and every so often I decide a wall would look better in another color."],
    [".storia-emph", "I rarely leave things exactly as I found them."],
    [".timeline-head h3", "Five years of content marketing, <em>one step at a time.</em>"],
    [".tl-item:nth-child(1) h4", "I start getting my hands into communication"],
    [".tl-item:nth-child(1) .tl-card p", "Between content, company materials and everyday communication, I start to realize that turning information into something clear and interesting comes fairly naturally to me."],
    [".tl-item:nth-child(2) h4", "I join a communication agency"],
    [".tl-item:nth-child(2) .tl-card p", "Between copy, projects and clients, I realize the part I care about most is finding the right idea and figuring out how to turn it into something that actually works."],
    [".tl-item:nth-child(3) h4", "I add motion"],
    [".tl-item:nth-child(3) .tl-card p", "I choose to specialize in Video &amp; Digital Strategies. Filming, editing and social languages join writing: ideas start taking shape in a lot more ways."],
    [".tl-item:nth-child(4) h4", "From idea to publication"],
    // TODO: se il ruolo da SMM era in un'altra azienda, anteporre "First Social Media Manager at [company], then"
    [".tl-item:nth-child(4) .tl-card p", "Content Marketing at BuddyJob. Today I follow content through the whole journey: concept, format, graphics, video, copy, publishing and community."],
    ["#filosofia .sec-title", "Philosophy"],
    ["#filoLead",
      'Not knowing how to do something doesn\'t mean it\'s ' +
      '<span class="impossible"><span class="im">im</span>possible<svg class="strike" viewBox="0 0 100 20" preserveAspectRatio="none"><path d="M2 12C20 6 40 16 60 9s30 2 38-1" /></svg></span>, ' +
      "it just means you haven't learned how yet."],
    [".filo-cols p:nth-child(1)", "What matters to me is not stopping in front of what I still don't know how to do: staying curious, experimenting, changing direction and finding my own way, without feeling too bound by how “it's supposed to be done”."],
    [".filo-cols p:nth-child(2)", "I don't think there's always a right or a wrong: what matters is that something makes sense, works and is genuinely convincing. And even when the result is satisfying, that doesn't mean it's the finish line: <em>there's always a little further to go.</em>"],
    [".skills-note", 'the things I know how to do (for now) <svg><use href="#d-arrow" /></svg>'],
    ["#progetti .sec-title", "Projects"],
    [".progetti-title", "When an idea finds <em>its shape.</em>"],
    [".progetti-desc", "Strategy, content, video and identity: different projects, born from different problems, each one developed by finding its own shape."],
    [".progetti-note", 'scroll, then click a card <svg><use href="#d-arrow" /></svg>'],
    ["#contatti .sec-title", "Contact"],
    [".contatti-big", "Tell me about your <em>project.</em>"],
    [".mail-big-hint", "click to copy"],
    [".c-card:nth-child(1) b", "Write to me"],
    [".c-card:nth-child(2) small", "Phone"],
    [".contatti-base", '<svg><use href="#d-star" /></svg> Milan, IT — available remotely'],
    [".footer-note", "grab them, throw them, do what you like ↓"],
    [".footer-bottom span:nth-child(2)", "Content Marketing · Milan"],
    ["#toTop", "Back to top ↑"]
  ];

  var ATTR_EN = [
    ["meta[name=description]", "content", "Alice Cracchiolo, content marketing in Milan: strategy, copy, video and identity. The best ideas don't stand still."],
    [".nav-links", "aria-label", "Sections"],
    ["#burger", "aria-label", "Open menu"],
    ["#heroTitle", "aria-label", "The best ideas don't stand still."],
    [".badge", "aria-label", "See the projects"],
    [".marquee", "aria-label", "Skills"],
    [".storia-frame img", "alt", "Illustration of Alice sitting, lost in thought"],
    ["#caseClose", "aria-label", "Close project"]
  ];

  // etichette del cursore: l'HTML le ha in italiano
  var CURSOR_EN = {
    "ciao!": "hi!", "scrivimi": "write me", "scuoti!": "shake!", "vai!": "go!", "vai": "go",
    "trascina": "drag", "copia!": "copy!", "scrivi": "write", "chiama": "call", "apri": "open",
    "su!": "up!", "chiudi": "close", "guarda": "look", "avanti": "next", "dai!": "go on!",
    "cambia": "switch"
  };

  function applyStatic() {
    if (!en) return;
    document.title = "Alice Cracchiolo — Content Marketing";
    HTML_EN.forEach(function (r) {
      var el = document.querySelector(r[0]);
      if (el) el.innerHTML = r[1];
    });
    ATTR_EN.forEach(function (r) {
      var el = document.querySelector(r[0]);
      if (el) el.setAttribute(r[1], r[2]);
    });
    document.querySelectorAll("[data-cursor]").forEach(function (el) {
      var v = el.getAttribute("data-cursor");
      if (CURSOR_EN[v]) el.setAttribute("data-cursor", CURSOR_EN[v]);
    });
  }

  function cursorLabel(v) {
    return en && CURSOR_EN[v] ? CURSOR_EN[v] : v;
  }

  /* ---------- pulsante IT / EN ---------- */
  function initToggle() {
    document.querySelectorAll(".lang-toggle").forEach(function (btn) {
      btn.setAttribute("aria-label", en ? "Passa all'italiano" : "Switch to English");
      btn.querySelectorAll("[data-lang]").forEach(function (s) {
        s.classList.toggle("is-on", s.getAttribute("data-lang") === lang);
      });
      btn.addEventListener("click", function () {
        switchTo(en ? "it" : "en");
      });
    });
  }

  function switchTo(next) {
    var stored = false;
    try {
      localStorage.setItem(KEY, next);
      stored = localStorage.getItem(KEY) === next;
      sessionStorage.setItem(SWITCH_KEY, JSON.stringify({ y: window.scrollY }));
    } catch (e) {}

    var go = function () {
      // senza storage (finestra privata, frame bloccati) la lingua passa dall'hash
      if (!stored || location.hash === "#it" || location.hash === "#en") {
        history.replaceState(null, "", location.pathname + location.search + "#" + next);
      }
      location.reload();
    };

    var curtain = document.getElementById("langCurtain");
    if (!curtain || !window.gsap || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return go();
    curtain.querySelector(".lang-curtain-word").textContent = next === "en" ? "English" : "Italiano";
    curtain.hidden = false;
    gsap.fromTo(curtain, { yPercent: 100 }, { yPercent: 0, duration: 0.7, ease: "power4.inOut", onComplete: go });
    gsap.fromTo(curtain.querySelector(".lang-curtain-word"), { yPercent: 120, rotation: 8 }, { yPercent: 0, rotation: 0, duration: 0.8, delay: 0.25, ease: "expo.out" });
  }

  window.I18N = {
    lang: lang,
    en: en,
    L: L,
    switched: switched,
    cursorLabel: cursorLabel,
    applyStatic: applyStatic,
    initToggle: initToggle,
    locale: en ? "en-US" : "it-IT"
  };
})();
