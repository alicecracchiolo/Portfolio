# Alice Cracchiolo — Portfolio

Sito statico, zero framework: HTML + CSS + JavaScript vanilla, con GSAP/ScrollTrigger in `js/vendor/`.

- `index.html` — struttura delle 4 sezioni (Storia, Filosofia, Progetti, Contatti) + loader, cursore, footer
- `css/style.css` — palette, tipografia, layout e responsive
- `js/data.js` — contenuti dei case study (testi, numeri, gallerie, video)
- `js/main.js` — smooth scroll, loader, cursore, animazioni allo scroll, overlay dei progetti
- `js/physics.js` — motore fisico 2D del footer (cerchi da trascinare e lanciare)
- `assets/` — immagini (convertite in WebP) e video

Per vederlo in locale basta un server statico, ad esempio:

```sh
python3 -m http.server 8000
```
