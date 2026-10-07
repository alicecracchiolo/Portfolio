/* Markup di card e case study, in un solo posto.
   Lo usa main.js nel browser e scripts/prerender.js per scrivere gli stessi
   testi dentro index.html (così Google li vede anche senza JavaScript).
   Dipende solo da window.I18N, niente DOM. */
(function () {
  "use strict";

  var I18N = window.I18N;
  var T = I18N.L;
  var DOODLE_PAIRS = [["d-star", "d-sparkle"], ["d-spiral", "d-heart"], ["d-flower", "d-sparkle"], ["d-sparkle", "d-star"], ["d-heart", "d-flower"]];

  function fmt(v, suffix) {
    var s;
    if (suffix) {
      s = (Math.round(v * 10) / 10).toLocaleString(I18N.locale, { maximumFractionDigits: 1 });
    } else {
      s = Math.round(v).toLocaleString(I18N.locale);
    }
    return s + (suffix || "");
  }

  function cardsHTML(projects) {
    var out = "";
    projects.forEach(function (p, i) {
      var dp = DOODLE_PAIRS[i % DOODLE_PAIRS.length];
      out +=
        '<article class="p-card" tabindex="0" role="button" data-case="' + p.id + '" data-cursor="apri" ' +
        'aria-label="' + T("Apri il progetto ", "Open the project ") + p.name + '" style="--card-bg:' + p.color + ";--card-ink:" + p.ink + '">' +
        '<div class="p-card-top"><span class="p-card-num">0' + (i + 1) + "</span><span>" + p.tag + "</span></div>" +
        '<div class="p-card-cover ' + (p.cover.fit === "logo" ? "" : p.cover.fit) + '">' +
        '<svg class="pc-doodle a"><use href="#' + dp[0] + '"/></svg>' +
        '<img src="' + p.cover.src + '" alt="' + p.cover.alt + '" draggable="false" />' +
        '<svg class="pc-doodle b"><use href="#' + dp[1] + '"/></svg>' +
        "</div>" +
        "<h3>" + p.title + "</h3>" +
        (p.hook ? '<span class="p-card-hook">' + p.hook + "</span>" : "") +
        "<p>" + p.desc + "</p>" +
        '<div class="p-card-foot"><span>' + p.name + (p.secondary ? "<br><small>" + p.secondary + "</small>" : "") + "</span>" +
        '<span class="p-card-go"><svg><use href="#i-arrow"/></svg></span></div>' +
        "</article>";
    });
    out +=
      '<div class="p-card-end"><p>' + T("Ti è venuta<br><em>un'idea?</em>", "Got an<br><em>idea?</em>") + "</p>" +
      '<a href="#contatti" class="btn-pill magnetic" data-cursor="' + I18N.cursorLabel("dai!") + '">' + T("Scrivimi", "Write to me") + ' <svg width="18" height="18"><use href="#i-arrow"/></svg></a></div>';
    return out;
  }

  /* opts.archive: versione solo testo per l'archivio pre-renderizzato
     (niente immagini né video, numeri già scritti) */
  function blockHTML(b, opts) {
    var archive = opts && opts.archive;
    var h = "";
    var kicker = b.kicker ? '<p class="cb-kicker"><svg><use href="#d-sparkle"/></svg>' + b.kicker + "</p>" : "";
    switch (b.type) {
      case "text":
        h = '<section class="cb cb-text' + (b.small ? " small" : "") + '">' + kicker +
          (b.title ? "<h2>" + b.title + "</h2>" : "") +
          b.paras.map(function (p) { return "<p>" + p + "</p>"; }).join("") + "</section>";
        break;
      case "highlight":
        h = '<blockquote class="cb cb-highlight"><svg><use href="#d-sparkle"/></svg>' + b.html + '<svg><use href="#d-star"/></svg></blockquote>';
        break;
      case "list":
        h = '<section class="cb">' + kicker + '<ul class="cb-list">' +
          b.items.map(function (it, i) {
            return '<li><span class="n">0' + (i + 1) + "</span><b>" + it[0] + "</b><span>" + it[1] + "</span></li>";
          }).join("") + "</ul></section>";
        break;
      case "steps":
        h = '<section class="cb cb-steps">' +
          b.items.map(function (s) { return "<span>" + s + "</span>"; }).join("<i>→</i>") + "</section>";
        break;
      case "stats":
        // i numeri non ancora disponibili (null) non si mostrano; se mancano tutti, sparisce il blocco
        var items = b.items.filter(function (s) { return s[0] !== null && s[0] !== undefined; });
        if (!items.length) return "";
        h = '<section class="cb">' + kicker + '<div class="cb-stats' + (b.small ? " small" : "") + '">' +
          items.map(function (s) {
            var shown = archive ? fmt(s[0], s[1]) : "0";
            // s[4] === true: la card che conferma il testo, in evidenza
            return '<div class="stat' + (s[4] ? " is-key" : "") + '"><b data-count="' + s[0] + '" data-suffix="' + (s[1] || "") + '">' + shown + "</b><span>" + s[2] + "</span>" +
              (s[3] ? "<i>" + (I18N.en ? s[3].replace(",", ".") : s[3]) + "</i>" : "") + "</div>";
          }).join("") + "</div>" +
          (b.note ? '<p class="cb-note">' + b.note + "</p>" : "") +
          "</section>";
        break;
      case "gallery":
        if (archive || !b.items.length) return "";
        // "bare": immagini libere, senza riquadro né scorrimento (per loghi e mascotte)
        h = '<section class="cb"><div class="cb-gallery' + (b.wide ? " wide" : "") + (b.bare ? " bare" : "") + (b.vertical ? " vertical" : "") + '"' +
          (b.bare ? "" : ' data-native-scroll data-cursor="trascina"') + ">" +
          b.items.map(function (n) {
            // video con poster: { src, poster }
            if (typeof n === "object") {
              return '<figure data-kind="video" data-src="' + n.src + '"><video src="' + n.src + '"' + (n.poster ? ' poster="' + n.poster + '"' : "") +
                ' muted loop playsinline preload="none"></video></figure>';
            }
            if (/\.mp4$/.test(n)) {
              return '<figure data-kind="video" data-src="' + b.dir + n + '"><video src="' + b.dir + n + '" muted loop playsinline preload="metadata"></video></figure>';
            }
            return '<figure data-kind="img" data-src="' + b.dir + n + '.webp"><img src="' + b.dir + n + '.webp" alt="" loading="lazy" draggable="false" /></figure>';
          }).join("") + "</div></section>";
        break;
      case "videos":
        if (archive) {
          h = '<ul class="cb-list">' + b.items.map(function (v) { return "<li>" + v[1] + " — " + v[2] + " · " + v[3] + "</li>"; }).join("") + "</ul>";
          break;
        }
        h = '<section class="cb cb-videos">' +
          b.items.map(function (v) {
            return '<figure class="vid" data-kind="video" data-src="' + v[0] + '" data-cursor="play"><div class="vid-box">' +
              '<video src="' + v[0] + '#t=0.5" muted loop playsinline preload="metadata"></video>' +
              '<span class="vid-play">▶ play</span></div>' +
              "<figcaption><b>" + v[1] + "</b><span>" + v[2] + " · " + v[3] + "</span></figcaption></figure>";
          }).join("") + "</section>";
        break;
      case "palette":
        h = '<section class="cb cb-palette">' +
          b.items.map(function (c) {
            var dark = ["#0F2B1E", "#1D4D34"].indexOf(c[1]) > -1;
            return '<div class="swatch" style="background:' + c[1] + ";color:" + (dark ? "#F2F2E9" : "#0F2B1E") + '"><b>' + c[0] + "</b>" + c[1] + "</div>";
          }).join("") + "</section>";
        break;
    }
    return h;
  }

  /* Case study completo. Nell'overlay: titolo h1 con id, link e "prossimo progetto".
     Nell'archivio: titolo h2, solo testo. */
  function caseHTML(p, projects, opts) {
    var archive = opts && opts.archive;
    var idx = projects.indexOf(p);
    var next = projects[(idx + 1) % projects.length];
    var links = "";
    if (!archive) {
      if (p.link) {
        links += '<a class="btn-pill magnetic" href="' + p.link.href + '" target="_blank" rel="noopener noreferrer" data-cursor="apri">' + p.link.label + ' <svg width="18" height="18"><use href="#i-arrow"/></svg></a>';
      }
      links += '<button type="button" class="btn-pill ghost magnetic" data-close-case data-cursor="chiudi">' + T("Torna ai progetti", "Back to projects") + "</button>";
    } else if (p.link) {
      links = '<a href="' + p.link.href + '" rel="noopener noreferrer">' + p.link.label + "</a>";
    }
    var tag = archive ? "h2" : "h1";

    return '<header class="case-hero">' +
      (archive ? "" : '<svg class="case-hero-doodle"><use href="#d-flower"/></svg>') +
      '<p class="case-kicker"><span>0' + (idx + 1) + " — " + p.name + "</span><span>✦</span><span>" + p.tag + "</span></p>" +
      "<" + tag + (archive ? "" : ' id="caseTitle"') + ">" + p.question + "</" + tag + ">" +
      (p.meta ? '<p class="case-kicker case-meta">' + p.meta + "</p>" : "") +
      '<div class="case-skills">' + p.skills.map(function (s) { return "<span>" + s + "</span>"; }).join("") + "</div>" +
      "</header>" +
      '<div class="case-content">' +
      '<section class="cb cb-intro">' + p.intro.map(function (t) { return "<p>" + t + "</p>"; }).join("") + "</section>" +
      p.blocks.map(function (b) { return blockHTML(b, opts); }).join("") +
      '<section class="case-closing"><h2>' + p.closing.title + "</h2>" +
      (p.closing.text ? "<p>" + p.closing.text + "</p>" : "") +
      (links ? '<div class="case-links">' + links + "</div>" : "") + "</section>" +
      (archive ? "" :
        '<a class="case-next" href="#" data-next="' + next.id + '" data-cursor="' + I18N.cursorLabel("avanti") + '"><small>' + T("prossimo progetto", "next project") + "</small><b>" + next.name + "</b></a>") +
      "</div>";
  }

  window.Render = { fmt: fmt, cardsHTML: cardsHTML, blockHTML: blockHTML, caseHTML: caseHTML };
})();
