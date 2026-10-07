# Alice Cracchiolo — Portfolio

Sito statico, zero framework: HTML + CSS + JavaScript vanilla, con GSAP/ScrollTrigger in `js/vendor/`.

- `index.html` — struttura delle 4 sezioni (Storia, Filosofia, Progetti, Contatti) + loader, cursore, footer
- `css/style.css` — palette, tipografia, layout e responsive
- `js/i18n.js` — lingua (italiano predefinito, inglese): testi statici tradotti e pulsante IT/EN
- `js/data.js` — contenuti dei case study in italiano e inglese (testi, numeri, gallerie, video); in cima i segnaposto BuddyJob da compilare
- `js/render.js` — markup di card e case study, condiviso tra sito e pre-render
- `scripts/prerender.js` — scrive card e testi dei case study dentro `index.html`
- `js/main.js` — smooth scroll, loader, cursore, animazioni allo scroll, overlay dei progetti
- `js/physics.js` — motore fisico 2D del footer (cerchi da trascinare e lanciare)
- `assets/` — immagini (convertite in WebP) e video

La lingua scelta resta salvata nel browser; un link che finisce con `#en` apre direttamente la versione inglese.

Per vederlo in locale basta un server statico, ad esempio:

```sh
python3 -m http.server 8000
```

## Dopo aver modificato i testi dei progetti

Card e case study sono anche scritti dentro `index.html` (li leggono Google e chi non ha JavaScript).
Dopo ogni modifica a `js/data.js` o `js/render.js` rigenerali con:

```sh
node scripts/prerender.js
```

