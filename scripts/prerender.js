#!/usr/bin/env node
/* Scrive dentro index.html, in italiano, le card dei progetti e il testo
   completo dei case study, usando lo stesso markup del sito (js/render.js).
   Così i contenuti sono nell'HTML servito: li vedono Google e chi non ha
   JavaScript. Nel browser main.js rigenera le card nella lingua attiva e i
   case study continuano ad aprirsi nell'overlay.

   Da rilanciare dopo ogni modifica a js/data.js o js/render.js:
     node scripts/prerender.js                                         */
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.join(__dirname, "..");
const read = (f) => fs.readFileSync(path.join(root, f), "utf8");

// finestra minima per i18n.js (lingua italiana, nessuno storage)
const ctx = {
  location: { hash: "", pathname: "/", search: "" },
  document: { documentElement: {} },
};
ctx.window = ctx;
vm.createContext(ctx);
for (const f of ["js/i18n.js", "js/data.js", "js/render.js"]) {
  vm.runInContext(read(f), ctx, { filename: f });
}
const { PROJECTS, Render, I18N } = ctx;
if (I18N.lang !== "it") throw new Error("il pre-render deve essere in italiano");

const cards = Render.cardsHTML(PROJECTS);
const archive =
  "<h2>Progetti</h2>" +
  PROJECTS.map((p) =>
    '<article id="progetto-' + p.id + '">' + Render.caseHTML(p, PROJECTS, { archive: true }) + "</article>"
  ).join("");

function inject(html, name, content) {
  const re = new RegExp("(<!-- prerender:" + name + " -->)[\\s\\S]*?(<!-- /prerender:" + name + " -->)");
  if (!re.test(html)) throw new Error("segnaposto prerender:" + name + " non trovato in index.html");
  return html.replace(re, (m, a, b) => a + content + b);
}

let html = read("index.html");
html = inject(html, "cards", cards);
html = inject(html, "archive", archive);
fs.writeFileSync(path.join(root, "index.html"), html);

const words = archive.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
console.log("index.html aggiornato: " + PROJECTS.length + " card, case study ~" + words + " parole");
