/* Typographic orphan control: keeps short function words (articles,
   prepositions, conjunctions) glued to the word that follows them with a
   non-breaking space, so they never end up alone at the end of a line.
   Never touches the source text — it only adjusts already-rendered DOM
   text nodes, after i18n.js has applied a language, inside a fixed list
   of sections. Safe to run repeatedly (idempotent: it only replaces a
   plain space/tab, never an existing non-breaking space). */
(function () {
  'use strict';

  var GLUE_WORDS = {
    it: [
      'e', 'o', 'ma', 'di', 'a', 'da', 'in', 'con', 'su', 'per', 'tra', 'fra',
      'il', 'lo', 'la', 'i', 'gli', 'le',
      'un', 'uno', 'una',
      'del', 'dello', 'della', 'dei', 'degli', 'delle',
      'al', 'allo', 'alla', 'ai', 'agli', 'alle',
      'dal', 'dallo', 'dalla', 'dai', 'dagli', 'dalle',
      'nel', 'nello', 'nella', 'nei', 'negli', 'nelle',
      'sul', 'sullo', 'sulla', 'sui', 'sugli', 'sulle'
    ],
    en: ['a', 'an', 'the', 'and', 'or', 'of', 'to', 'in', 'on', 'for', 'with', 'by']
  };

  // Any real whitespace EXCEPT a non-breaking space, so a pass never
  // re-matches text it (or a previous pass) already glued.
  var WS = '[^\\S\\u00A0]';

  var regexCache = {};
  function getRegexes(lang) {
    if (regexCache[lang]) return regexCache[lang];
    var words = GLUE_WORDS[lang] || GLUE_WORDS.it;
    var alt = words.join('|');
    var built = {
      // word + whitespace, with more text after it in the SAME node.
      inline: new RegExp('\\b(' + alt + ')(' + WS + '+)(?=\\S)', 'gi'),
      // word + whitespace at the very end of a node (the next word lives
      // in a different text node — typically a nested <span>).
      trailing: new RegExp('\\b(' + alt + ')(' + WS + '+)$', 'i')
    };
    regexCache[lang] = built;
    return built;
  }

  var SCOPE_SELECTOR = [
    '.hero', '.about', '.philosophy-pin', '.timeline-h',
    '.horizontal-section', '.case-study', '.cta', '.site-footer'
  ].join(', ');

  var SKIP_TAGS = { SCRIPT: 1, STYLE: 1, TEXTAREA: 1, INPUT: 1 };

  function collectTextNodes(root) {
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        var parent = node.parentElement;
        if (!parent || SKIP_TAGS[parent.tagName]) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var nodes = [];
    var n;
    while ((n = walker.nextNode())) nodes.push(n);
    return nodes;
  }

  function glueSection(section, re) {
    var nodes = collectTextNodes(section);

    nodes.forEach(function (node) {
      var text = node.nodeValue;
      if (!text) return;
      var glued = text.replace(re.inline, function (match, word, ws) {
        return word + ' ';
      });
      if (glued !== text) node.nodeValue = glued;
    });

    for (var i = 0; i < nodes.length; i++) {
      var text = nodes[i].nodeValue;
      if (!text) continue;
      var m = re.trailing.exec(text);
      if (!m) continue;
      for (var j = i + 1; j < nodes.length; j++) {
        var nextText = nodes[j].nodeValue;
        if (!nextText || !nextText.trim()) continue;
        if (/^\S/.test(nextText)) {
          nodes[i].nodeValue = text.slice(0, text.length - m[2].length) + ' ';
        }
        break;
      }
    }
  }

  function glueTypographicOrphans() {
    var lang = document.documentElement.getAttribute('lang') === 'en' ? 'en' : 'it';
    var re = getRegexes(lang);
    document.querySelectorAll(SCOPE_SELECTOR).forEach(function (section) {
      glueSection(section, re);
    });
  }

  glueTypographicOrphans();
  window.__onLanguageApplied = window.__onLanguageApplied || [];
  window.__onLanguageApplied.push(glueTypographicOrphans);
})();
