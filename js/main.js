/* =========================================================
   Alice Cracchiolo — portfolio
   Vanilla JS + GSAP/ScrollTrigger. Nessun framework.
   ========================================================= */
(function () {
  "use strict";

  gsap.registerPlugin(ScrollTrigger);

  var html = document.documentElement;
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var rand = function (a, b) { return a + Math.random() * (b - a); };
  var T = window.I18N.L;
  var PALETTE = ["#737e4e", "#996888", "#5e4955", "#d6b3ca", "#b5bf8a"];
  var DOODLES = ["d-sparkle", "d-star", "d-flower", "d-heart", "d-spiral"];

  /* ---------------------------------------------------------
     Split del testo: lettere e parole in <span>, lasciando
     intatti gli elementi figli (svg, em, ecc.)
     --------------------------------------------------------- */
  function splitChars(el) {
    $$(":scope > *", el).forEach(function (child) {
      if (child.tagName.toLowerCase() !== "svg") splitChars(child);
    });
    Array.prototype.slice.call(el.childNodes).forEach(function (node) {
      if (node.nodeType !== 3 || !node.textContent.trim()) return;
      var frag = document.createDocumentFragment();
      node.textContent.split("").forEach(function (c) {
        if (/\s/.test(c)) {
          frag.appendChild(document.createTextNode(" "));
        } else {
          var s = document.createElement("span");
          s.className = "ch";
          s.textContent = c;
          frag.appendChild(s);
        }
      });
      el.replaceChild(frag, node);
    });
    return $$(".ch", el);
  }

  function splitWords(el) {
    Array.prototype.slice.call(el.childNodes).forEach(function (node) {
      if (node.nodeType === 1) {
        if (node.classList.contains("impossible") || node.tagName.toLowerCase() === "svg") {
          node.classList.add("w");
        } else {
          splitWords(node);
        }
        return;
      }
      if (node.nodeType !== 3) return;
      var frag = document.createDocumentFragment();
      node.textContent.split(/(\s+)/).forEach(function (part) {
        if (!part) return;
        if (/^\s+$/.test(part)) {
          frag.appendChild(document.createTextNode(" "));
        } else {
          var s = document.createElement("span");
          s.className = "w";
          s.textContent = part;
          frag.appendChild(s);
        }
      });
      el.replaceChild(frag, node);
    });
    return $$(".w", el);
  }

  /* ---------------------------------------------------------
     SMOOTH SCROLL — lerp sulla rotella, niente librerie.
     Touch e tastiera restano nativi.
     --------------------------------------------------------- */
  var SmoothScroll = {
    current: window.scrollY,
    target: window.scrollY,
    ease: 0.085,
    moving: false,
    tween: null,
    enabled: finePointer && !reduced,
    limit: function () {
      return Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    },
    init: function () {
      var self = this;
      if (this.enabled) {
        window.addEventListener("wheel", function (e) { self.onWheel(e); }, { passive: false });
      }
      window.addEventListener("scroll", function () {
        // scroll esterno (tastiera, scrollbar, script): lo smooth si mette da parte
        if (self.tween) return;
        if (!self.moving || Math.abs(window.scrollY - self.current) > 2) {
          self.moving = false;
          self.current = self.target = window.scrollY;
        }
      }, { passive: true });
      gsap.ticker.add(function (time, dt) { self.tick(dt); });
    },
    onWheel: function (e) {
      if (e.ctrlKey) return; // zoom del browser
      if (html.classList.contains("is-loading") || html.classList.contains("is-locked")) return;
      if (e.target.closest && e.target.closest("[data-native-scroll]")) return;
      e.preventDefault();
      if (this.tween) { this.tween.kill(); this.tween = null; this.current = window.scrollY; this.target = this.current; }
      var d = e.deltaY;
      if (e.deltaMode === 1) d *= 40;
      else if (e.deltaMode === 2) d *= window.innerHeight;
      this.target = Math.max(0, Math.min(this.limit(), this.target + d));
      this.moving = true;
    },
    tick: function (dtMs) {
      if (!this.moving) return;
      var k = 1 - Math.pow(1 - this.ease, (dtMs || 16.7) / 16.7);
      this.current += (this.target - this.current) * k;
      if (Math.abs(this.target - this.current) < 0.4) {
        this.current = this.target;
        this.moving = false;
      }
      window.scrollTo(0, this.current);
    },
    to: function (dest, opts) {
      var self = this;
      var y = typeof dest === "number" ? dest : dest.getBoundingClientRect().top + window.scrollY;
      y = Math.max(0, Math.min(this.limit(), y - ((opts && opts.offset) || 0)));
      this.moving = false;
      if (this.tween) this.tween.kill();
      var dist = Math.abs(y - window.scrollY);
      if (reduced) { window.scrollTo(0, y); this.current = this.target = y; return; }
      var proxy = { y: window.scrollY };
      this.tween = gsap.to(proxy, {
        y: y,
        duration: Math.min(2.2, 0.8 + dist / 3000),
        ease: "expo.inOut",
        onUpdate: function () { window.scrollTo(0, proxy.y); },
        onComplete: function () { self.tween = null; self.current = self.target = y; }
      });
    }
  };
  window.SmoothScroll = SmoothScroll;
  SmoothScroll.init();

  // tutti i link interni passano dallo smooth scroll
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a || a.closest(".physics")) return;
    var id = a.getAttribute("href");
    if (id.length < 2 && id !== "#") return;
    var t = id === "#" || id === "#top" ? 0 : $(id);
    if (t === null) return;
    e.preventDefault();
    closeMenu();
    SmoothScroll.to(t);
  });

  /* ---------------------------------------------------------
     CONFETTI di doodle (per click, copia email, "ferme"…)
     --------------------------------------------------------- */
  function burst(x, y, n) {
    if (reduced) return;
    n = n || 14;
    for (var i = 0; i < n; i++) {
      (function () {
        var s = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        s.setAttribute("class", "confetti");
        s.innerHTML = '<use href="#' + DOODLES[(Math.random() * DOODLES.length) | 0] + '"/>';
        s.style.color = PALETTE[(Math.random() * PALETTE.length) | 0];
        var size = rand(14, 34);
        s.style.width = s.style.height = size + "px";
        document.body.appendChild(s);
        var dx = rand(-220, 220);
        var up = rand(-260, -80);
        gsap.set(s, { x: x - size / 2, y: y - size / 2, scale: 0, rotation: rand(-90, 90) });
        var tl = gsap.timeline({ onComplete: function () { s.remove(); } });
        tl.to(s, { scale: 1, duration: 0.25, ease: "back.out(3)" }, 0)
          .to(s, { x: "+=" + dx, duration: 1.4, ease: "power1.out" }, 0)
          .to(s, { y: "+=" + up, duration: 0.5, ease: "power2.out" }, 0)
          .to(s, { y: "+=" + (-up + rand(200, 360)), duration: 0.9, ease: "power2.in" }, 0.5)
          .to(s, { rotation: "+=" + rand(-360, 360), duration: 1.4 }, 0)
          .to(s, { opacity: 0, duration: 0.35 }, 1.05);
      })();
    }
  }

  function toast(msg) {
    var t = $("#toast");
    t.textContent = msg;
    t.classList.add("is-on");
    clearTimeout(toast._t);
    toast._t = setTimeout(function () { t.classList.remove("is-on"); }, 2200);
  }

  /* ---------------------------------------------------------
     CURSORE — punto + anello con etichetta + scia di stelline
     --------------------------------------------------------- */
  function initCursor() {
    if (!finePointer) return;
    html.classList.add("has-cursor");
    var dot = $("#cursorDot");
    var ring = $("#cursorRing");
    var label = $("#cursorLabel");
    var layer = $("#trailLayer");
    var mouse = { x: innerWidth / 2, y: innerHeight / 2 };
    var pos = { x: mouse.x, y: mouse.y };
    var last = { x: mouse.x, y: mouse.y };
    var travelled = 0;
    var setDotX = gsap.quickSetter(dot, "x", "px");
    var setDotY = gsap.quickSetter(dot, "y", "px");
    var setRingX = gsap.quickSetter(ring, "x", "px");
    var setRingY = gsap.quickSetter(ring, "y", "px");

    window.addEventListener("pointermove", function (e) {
      if (e.pointerType !== "mouse") return;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      html.classList.remove("cursor-hidden");
      setDotX(mouse.x);
      setDotY(mouse.y);
      if (reduced) return;
      travelled += Math.hypot(mouse.x - last.x, mouse.y - last.y);
      last.x = mouse.x;
      last.y = mouse.y;
      if (travelled > 46) {
        travelled = 0;
        spawnTrail(mouse.x, mouse.y);
      }
    });

    document.addEventListener("mouseleave", function () { html.classList.add("cursor-hidden"); });
    window.addEventListener("pointerdown", function () { ring.classList.add("is-down"); });
    window.addEventListener("pointerup", function () { ring.classList.remove("is-down"); });

    gsap.ticker.add(function (t, dt) {
      var k = 1 - Math.pow(1 - 0.2, dt / 16.7);
      pos.x += (mouse.x - pos.x) * k;
      pos.y += (mouse.y - pos.y) * k;
      setRingX(pos.x);
      setRingY(pos.y);
    });

    document.addEventListener("mouseover", function (e) {
      var t = e.target.closest && e.target.closest("a, button, [data-cursor], .p-card, figure");
      if (t) {
        var txt = t.getAttribute("data-cursor");
        if (txt === null) txt = t.matches("figure") ? "guarda" : "✦";
        label.textContent = I18N.cursorLabel(txt);
        ring.classList.add("is-hover");
      } else {
        ring.classList.remove("is-hover");
      }
    });

    var live = 0;
    function spawnTrail(x, y) {
      if (live > 26) return;
      live++;
      var s = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      s.setAttribute("class", "trail");
      s.innerHTML = '<use href="#' + (Math.random() > 0.3 ? "d-sparkle" : "d-star") + '"/>';
      s.style.color = PALETTE[(Math.random() * PALETTE.length) | 0];
      layer.appendChild(s);
      gsap.fromTo(s, { x: x, y: y, scale: rand(0.6, 1.2), rotation: 0, opacity: 1 }, {
        x: x + rand(-30, 30),
        y: y + rand(30, 80),
        rotation: rand(-200, 200),
        scale: 0,
        opacity: 0.2,
        duration: rand(0.8, 1.2),
        ease: "power2.in",
        onComplete: function () { s.remove(); live--; }
      });
    }
  }

  /* ---------------------------------------------------------
     MAGNETICI — bottoni e icone che inseguono il puntatore
     --------------------------------------------------------- */
  function initMagnetic(scope) {
    if (!finePointer || reduced) return;
    $$(".magnetic", scope).forEach(function (el) {
      if (el._mag) return;
      el._mag = true;
      var xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3" });
      var yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3" });
      var strength = el.classList.contains("c-card") ? 0.12 : 0.35;
      el.addEventListener("pointermove", function (e) {
        var r = el.getBoundingClientRect();
        xTo((e.clientX - (r.left + r.width / 2)) * strength);
        yTo((e.clientY - (r.top + r.height / 2)) * strength);
      });
      el.addEventListener("pointerleave", function () {
        gsap.to(el, { x: 0, y: 0, duration: 1, ease: "elastic.out(1, 0.35)" });
      });
    });
  }

  /* ---------------------------------------------------------
     DRAGGABLE — gli sticker si possono spostare
     --------------------------------------------------------- */
  function initDraggables() {
    $$(".draggable").forEach(function (el) {
      var start = null;
      el.addEventListener("pointerdown", function (e) {
        e.preventDefault();
        start = { x: e.clientX, y: e.clientY, ox: gsap.getProperty(el, "x"), oy: gsap.getProperty(el, "y") };
        try { el.setPointerCapture(e.pointerId); } catch (_) {}
        gsap.to(el, { scale: 1.08, rotation: -4, duration: 0.3, ease: "back.out(3)" });
      });
      el.addEventListener("pointermove", function (e) {
        if (!start) return;
        gsap.set(el, { x: start.ox + e.clientX - start.x, y: start.oy + e.clientY - start.y });
      });
      var end = function () {
        if (!start) return;
        start = null;
        gsap.to(el, { scale: 1, rotation: 6, duration: 0.9, ease: "elastic.out(1, 0.4)" });
      };
      el.addEventListener("pointerup", end);
      el.addEventListener("pointercancel", end);
    });
  }

  /* ---------------------------------------------------------
     NAV, MENU MOBILE, SCROLL METER
     --------------------------------------------------------- */
  function closeMenu() {
    if (!html.classList.contains("menu-open")) return;
    html.classList.remove("menu-open", "is-locked");
    $("#burger").setAttribute("aria-expanded", "false");
    $("#menu").setAttribute("aria-hidden", "true");
  }

  function initNav() {
    var nav = $("#nav");
    var lastY = 0;
    ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: function (self) {
        var y = self.scroll();
        nav.classList.toggle("is-scrolled", y > 40);
        if (!html.classList.contains("menu-open")) {
          nav.classList.toggle("is-hidden", y > 300 && y > lastY + 2);
          if (y < lastY - 2) nav.classList.remove("is-hidden");
        }
        lastY = y;
        var p = self.progress;
        $("#scrollFill").style.strokeDashoffset = String(164 * (1 - p));
        $("#scrollStar").style.transform = "rotate(" + (p * 720).toFixed(1) + "deg)";
      }
    });

    $$("[data-theme='dark'], #footer").forEach(function (sec) {
      ScrollTrigger.create({
        trigger: sec,
        start: "top 40px",
        end: "bottom 40px",
        toggleClass: { targets: nav, className: "on-dark" }
      });
      ScrollTrigger.create({
        trigger: sec,
        start: "top bottom-=80",
        end: "bottom bottom-=80",
        toggleClass: { targets: document.body, className: "dark-zone" }
      });
    });

    $$(".nav-links a").forEach(function (a) {
      var sec = $(a.getAttribute("href"));
      if (!sec) return;
      ScrollTrigger.create({
        trigger: sec,
        start: "top center",
        end: "bottom center",
        onToggle: function (self) { a.classList.toggle("is-active", self.isActive); }
      });
    });

    $("#burger").addEventListener("click", function () {
      var open = !html.classList.contains("menu-open");
      html.classList.toggle("menu-open", open);
      html.classList.toggle("is-locked", open);
      this.setAttribute("aria-expanded", String(open));
      $("#menu").setAttribute("aria-hidden", String(!open));
      if (open) {
        gsap.fromTo("#menu .menu-links a", { yPercent: 120, rotation: 6, opacity: 0 }, {
          yPercent: 0, rotation: 0, opacity: 1, stagger: 0.07, duration: 0.9, delay: 0.2, ease: "expo.out"
        });
      }
    });
    $$("#menu a").forEach(function (a) { a.addEventListener("click", closeMenu); });
  }

  /* ---------------------------------------------------------
     HERO — lettere che scappano dal mouse, "ferme" che si scuote
     --------------------------------------------------------- */
  var heroChars = [];

  function prepHero() {
    $$(".ht-word").forEach(function (w) { heroChars = heroChars.concat(splitChars(w)); });
    gsap.set(heroChars, { yPercent: 115, rotation: 12 });
    gsap.set(".hero-fade", { y: 30, opacity: 0 });
    gsap.set(".hd", { scale: 0, rotation: -40 });
    gsap.set([".social-rail", ".scroll-meter"], { opacity: 0 });
  }

  function heroIntro() {
    var tl = gsap.timeline();
    tl.to(heroChars, {
      yPercent: 0,
      rotation: 0,
      duration: 1.3,
      ease: "expo.out",
      stagger: 0.028
    }, 0)
      .to(".ht-underline use", { strokeDashoffset: 0, duration: 1.1, ease: "power2.inOut" }, 0.7)
      .to(".hero-fade", { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out" }, 0.55)
      .to(".scribble use", { strokeDashoffset: 0, duration: 1.2, ease: "power2.inOut" }, 1.1)
      .to(".hd", { scale: 1, rotation: 0, duration: 1.2, stagger: 0.07, ease: "elastic.out(1, 0.5)" }, 0.5)
      .to([".social-rail", ".scroll-meter"], { opacity: 1, duration: 0.8 }, 1)
      .from(".social-rail a", { x: -40, rotation: -90, stagger: 0.08, duration: 0.9, ease: "back.out(2)" }, 1)
      .add(function () {
        gsap.set(".ht-line", { overflow: "visible" });
        initHeroInteractions();
      });
    return tl;
  }

  function initHeroInteractions() {
    var hero = $("#hero");

    // doodle: galleggiano per conto loro…
    $$(".hd").forEach(function (d, i) {
      gsap.to(d, {
        rotation: i % 2 ? 14 : -14,
        duration: rand(2.4, 4),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });

    // …e seguono il mouse con profondità diverse
    if (finePointer && !reduced) {
      var doodles = $$(".hd").map(function (d) {
        return {
          depth: parseFloat(d.getAttribute("data-depth")) || 1,
          x: gsap.quickTo(d, "x", { duration: 1.2, ease: "power3" }),
          y: gsap.quickTo(d, "y", { duration: 1.2, ease: "power3" })
        };
      });
      hero.addEventListener("pointermove", function (e) {
        var nx = e.clientX / innerWidth - 0.5;
        var ny = e.clientY / innerHeight - 0.5;
        doodles.forEach(function (d) {
          d.x(-nx * 60 * d.depth);
          d.y(-ny * 60 * d.depth);
        });
      });

      // le lettere del titolo si spostano quando il cursore si avvicina
      var chars = heroChars.map(function (c) {
        return {
          el: c,
          x: gsap.quickTo(c, "x", { duration: 0.6, ease: "power3" }),
          y: gsap.quickTo(c, "y", { duration: 0.6, ease: "power3" }),
          sx: gsap.quickTo(c, "scaleX", { duration: 0.6, ease: "power3" }),
          sy: gsap.quickTo(c, "scaleY", { duration: 0.6, ease: "power3" }),
          cx: 0,
          cy: 0
        };
      });
      var measure = function () {
        chars.forEach(function (c) {
          var r = c.el.getBoundingClientRect();
          c.cx = r.left + r.width / 2 - gsap.getProperty(c.el, "x") + window.scrollX;
          c.cy = r.top + r.height / 2 - gsap.getProperty(c.el, "y") + window.scrollY;
        });
      };
      measure();
      ScrollTrigger.addEventListener("refresh", measure);
      var mx = -9999, my = -9999, dirty = false;
      hero.addEventListener("pointermove", function (e) {
        mx = e.clientX + window.scrollX;
        my = e.clientY + window.scrollY;
        dirty = true;
      });
      hero.addEventListener("pointerleave", function () {
        mx = my = -9999;
        dirty = true;
      });
      var R = Math.max(120, innerWidth * 0.1);
      gsap.ticker.add(function () {
        if (!dirty) return;
        dirty = false;
        chars.forEach(function (c) {
          var dx = c.cx - mx, dy = c.cy - my;
          var d = Math.sqrt(dx * dx + dy * dy);
          if (d < R) {
            var f = 1 - d / R;
            f = f * f;
            c.x((dx / (d || 1)) * f * 46);
            c.y((dy / (d || 1)) * f * 46);
            c.sx(1 + f * 0.25); c.sy(1 + f * 0.25);
          } else {
            c.x(0); c.y(0); c.sx(1); c.sy(1);
          }
        });
      });
    }

    // "ferme" non sta ferma: si scuote al passaggio o al tocco
    var ferme = $("#ferme");
    var fChars = $$(".ch", ferme);
    var shaking = false;
    var shake = function (withBurst) {
      if (shaking) return;
      shaking = true;
      var tl = gsap.timeline({ onComplete: function () { shaking = false; } });
      tl.to(fChars, {
        yPercent: function () { return rand(-45, -15); },
        rotation: function () { return rand(-28, 28); },
        duration: 0.28,
        ease: "power2.out",
        stagger: { each: 0.04, from: "random" }
      }).to(fChars, {
        yPercent: 0,
        rotation: 0,
        duration: 1.1,
        ease: "elastic.out(1.1, 0.3)",
        stagger: { each: 0.04, from: "random" }
      });
      if (withBurst) {
        var r = ferme.getBoundingClientRect();
        burst(r.left + r.width / 2, r.top + r.height / 2, 16);
      }
    };
    ferme.addEventListener("mouseenter", function () { shake(false); });
    ferme.addEventListener("click", function () { shake(true); });
    if (!reduced) {
      // anche da sola, ogni tanto, per ricordare che è viva
      setInterval(function () { if (!document.hidden && window.scrollY < innerHeight) shake(false); }, 4800);
    }

    // scroll: le righe del titolo si separano, i doodle salgono
    if (!reduced) {
      var lines = $$(".ht-line");
      var tl = gsap.timeline({
        scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 0.8 }
      });
      lines.forEach(function (l, i) {
        tl.to(l, { xPercent: i % 2 ? 14 : -10, ease: "none" }, 0);
      });
      tl.to(".hero-doodles .hd", { yPercent: function (i, el) { return -120 * (parseFloat(el.getAttribute("data-depth")) || 1); }, ease: "none" }, 0)
        .to(".hero-bottom", { y: -80, opacity: 0.2, ease: "none" }, 0);
    }
  }

  /* ---------------------------------------------------------
     MARQUEE — la velocità segue lo scroll, e cambia verso
     --------------------------------------------------------- */
  function initMarquee() {
    $$("[data-marquee]").forEach(function (track) {
      var kids = Array.prototype.slice.call(track.children);
      // duplico finché il nastro non è lungo almeno il doppio dello schermo
      var guard = 0;
      while (track.scrollWidth < innerWidth * 2.2 && guard++ < 6) {
        kids.forEach(function (k) { track.appendChild(k.cloneNode(true)); });
      }
      kids = Array.prototype.slice.call(track.children);
      kids.forEach(function (k) { track.appendChild(k.cloneNode(true)); });
      var half = track.scrollWidth / 2;
      var x = 0, dir = -1, boost = 0;
      ScrollTrigger.create({
        onUpdate: function (self) {
          dir = self.direction === 1 ? -1 : 1;
          boost = Math.min(18, Math.abs(self.getVelocity()) / 120);
        }
      });
      window.addEventListener("resize", function () { half = track.scrollWidth / 2; });
      gsap.ticker.add(function (t, dt) {
        if (reduced) return;
        boost *= 0.94;
        x += dir * (1 + boost) * dt * 0.06;
        if (x <= -half) x += half;
        if (x > 0) x -= half;
        track.style.transform = "translate3d(" + x.toFixed(2) + "px,0,0)";
      });
    });
  }

  /* ---------------------------------------------------------
     ANIMAZIONI ALLO SCROLL (sezioni)
     --------------------------------------------------------- */
  function initSectionTitles() {
    $$(".split-chars").forEach(function (t) {
      var chars = splitChars(t);
      gsap.fromTo(chars, { yPercent: 110, rotation: function (i) { return i % 2 ? 14 : -14; }, opacity: 0 }, {
        yPercent: 0,
        rotation: 0,
        opacity: 1,
        ease: "power2.out",
        stagger: 0.06,
        scrollTrigger: { trigger: t, start: "top 95%", end: "top 55%", scrub: 1 }
      });
    });
    $$(".sec-doodle").forEach(function (d) {
      gsap.fromTo(d, { rotation: -180, scale: 0.3 }, {
        rotation: 180,
        scale: 1,
        ease: "none",
        scrollTrigger: { trigger: d, start: "top bottom", end: "bottom top", scrub: 1 }
      });
    });
  }

  function initStoria() {
    // parole che si accendono mentre leggi
    $$(".reveal-words").forEach(function (p) {
      var words = splitWords(p);
      gsap.to(words, {
        opacity: 1,
        ease: "none",
        stagger: 0.05,
        scrollTrigger: { trigger: p, start: "top 85%", end: "bottom 60%", scrub: 1 }
      });
    });

    var hello = $(".storia-hello");
    var hc = splitChars(hello);
    gsap.from(hc, {
      yPercent: 80,
      rotation: function () { return rand(-30, 30); },
      opacity: 0,
      duration: 1,
      stagger: 0.035,
      ease: "back.out(2.4)",
      scrollTrigger: { trigger: hello, start: "top 85%" }
    });

    gsap.fromTo(".storia-frame", { yPercent: 12, rotation: -6 }, {
      yPercent: -8,
      rotation: 4,
      ease: "none",
      scrollTrigger: { trigger: ".storia-grid", start: "top bottom", end: "bottom top", scrub: 1 }
    });
    gsap.from(".sticker-quote", {
      scale: 0,
      rotation: -40,
      duration: 1.2,
      ease: "elastic.out(1, 0.45)",
      scrollTrigger: { trigger: ".storia-visual", start: "top 70%" }
    });
    gsap.from(".storia-note", {
      opacity: 0,
      x: -30,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: { trigger: ".storia-visual", start: "top 70%" }
    });
    gsap.from(".storia-emph", {
      opacity: 0,
      y: 30,
      rotation: 4,
      ease: "power2.out",
      scrollTrigger: { trigger: ".storia-emph", start: "top 95%", end: "top 75%", scrub: 1 }
    });

    // timeline: il filo si disegna, le tappe entrano con lo scroll
    var draw = $(".tp-draw");
    var len = draw.getTotalLength();
    gsap.set(draw, { strokeDasharray: len, strokeDashoffset: len });
    gsap.to(draw, {
      strokeDashoffset: 0,
      ease: "none",
      scrollTrigger: { trigger: ".timeline-body", start: "top 70%", end: "bottom 70%", scrub: 1 }
    });
    gsap.from(".timeline-head h3", {
      y: 60,
      opacity: 0,
      ease: "power2.out",
      scrollTrigger: { trigger: ".timeline-head", start: "top 90%", end: "top 60%", scrub: 1 }
    });
    $$(".tl-item").forEach(function (item, i) {
      var even = i % 2 === 1;
      var mobile = innerWidth < 900;
      var tl = gsap.timeline({
        scrollTrigger: { trigger: item, start: "top 92%", end: "top 45%", scrub: 1.1 }
      });
      tl.from($(".tl-year", item), {
        x: mobile ? -40 : (even ? 160 : -160),
        opacity: 0,
        scale: 0.7,
        ease: "power2.out"
      }, 0)
        .from($(".tl-card", item), {
          y: 110,
          x: mobile ? 0 : (even ? -60 : 60),
          rotation: even ? -6 : 6,
          opacity: 0,
          ease: "power2.out"
        }, 0.1)
        .from($(".tl-icon", item), { scale: 0, rotation: -180, ease: "back.out(2)" }, 0.4);
    });
  }

  function initFilosofia() {
    var sec = $("#filosofia");
    if (!reduced) {
      gsap.fromTo(sec, { scale: 0.86, rotation: -1.5 }, {
        scale: 1,
        rotation: 0,
        ease: "none",
        scrollTrigger: { trigger: sec, start: "top bottom", end: "top 25%", scrub: 1 }
      });
    }

    // la frase si accende parola per parola, poi "im" cade da "impossibile"
    var lead = $("#filoLead");
    var words = splitWords(lead);
    var im = $(".impossible .im", lead);
    var strike = $(".impossible .strike path", lead);
    var tl = gsap.timeline({
      scrollTrigger: { trigger: lead, start: "top 80%", end: "bottom 30%", scrub: 1 }
    });
    tl.to(words, { opacity: 1, stagger: 0.12, ease: "none", duration: 0.5 })
      .to(strike, { strokeDashoffset: 0, duration: 0.6, ease: "power1.inOut" })
      .to(im, { yPercent: 140, rotation: 55, opacity: 0, duration: 0.8, ease: "power2.in" })
      .to(strike.parentNode, { opacity: 0, duration: 0.3 }, "<0.3")
      .to(im, { width: 0, duration: 0.5, ease: "power2.inOut" })
      .to(".impossible", { color: "#b5bf8a", duration: 0.3 }, "<");

    // la larghezza di "im" va misurata a font caricati
    var setImWidth = function () {
      if (tl.progress() === 0) gsap.set(im, { width: "auto" });
      var w = im.getBoundingClientRect().width;
      tl.invalidate();
      gsap.set(im, { width: w });
    };
    setImWidth();
    ScrollTrigger.addEventListener("refreshInit", function () {
      if (tl.progress() === 0) gsap.set(im, { width: "auto" });
    });
    ScrollTrigger.addEventListener("refresh", function () {
      if (tl.progress() === 0) setImWidth();
    });

    $$(".filo-cols p").forEach(function (p, i) {
      gsap.from(p, {
        y: 80,
        opacity: 0,
        ease: "power2.out",
        scrollTrigger: { trigger: p, start: "top 95%", end: "top 70%", scrub: 1 }
      });
    });

    // elenco competenze: ogni riga entra da un lato diverso
    $$(".skills-list li").forEach(function (li, i) {
      gsap.fromTo(li, {
        xPercent: i % 2 ? 40 : -40,
        rotation: i % 2 ? 4 : -4,
        opacity: 0
      }, {
        xPercent: 0,
        rotation: 0,
        opacity: 1,
        ease: "power2.out",
        scrollTrigger: { trigger: li, start: "top 98%", end: "top 62%", scrub: 1 }
      });
    });
    gsap.from(".skills-note", {
      opacity: 0,
      y: 20,
      scrollTrigger: { trigger: ".skills", start: "top 90%", end: "top 70%", scrub: 1 }
    });

    gsap.from(".tool-badge", {
      scale: 0,
      rotation: function () { return rand(-40, 40); },
      duration: 0.9,
      stagger: 0.06,
      ease: "elastic.out(1, 0.5)",
      scrollTrigger: { trigger: ".tools", start: "top 85%" }
    });
  }

  /* ---------------------------------------------------------
     PROGETTI — card + scroll orizzontale
     --------------------------------------------------------- */
  var DOODLE_PAIRS = [["d-star", "d-sparkle"], ["d-spiral", "d-heart"], ["d-flower", "d-sparkle"], ["d-sparkle", "d-star"], ["d-heart", "d-flower"]];

  function buildCards() {
    var track = $("#progettiTrack");
    var out = "";
    PROJECTS.forEach(function (p, i) {
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
        "<p>" + p.desc + "</p>" +
        '<div class="p-card-foot"><span>' + p.name + (p.secondary ? "<br><small>" + p.secondary + "</small>" : "") + "</span>" +
        '<span class="p-card-go"><svg><use href="#i-arrow"/></svg></span></div>' +
        "</article>";
    });
    out +=
      '<div class="p-card-end"><p>' + T("Ti è venuta<br><em>un'idea?</em>", "Got an<br><em>idea?</em>") + "</p>" +
      '<a href="#contatti" class="btn-pill magnetic" data-cursor="' + I18N.cursorLabel("dai!") + '">' + T("Scrivimi", "Write to me") + ' <svg width="18" height="18"><use href="#i-arrow"/></svg></a></div>';
    track.innerHTML = out;

    $$(".p-card", track).forEach(function (card) {
      card.addEventListener("click", function () { openCase(card.getAttribute("data-case")); });
      card.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openCase(card.getAttribute("data-case"));
        }
      });
      // inclinazione 3D al passaggio del mouse
      if (finePointer && !reduced) {
        var rx = gsap.quickTo(card, "rotationX", { duration: 0.6, ease: "power3" });
        var ry = gsap.quickTo(card, "rotationY", { duration: 0.6, ease: "power3" });
        gsap.set(card, { transformPerspective: 900 });
        card.addEventListener("pointermove", function (e) {
          var r = card.getBoundingClientRect();
          ry(((e.clientX - r.left) / r.width - 0.5) * 16);
          rx(-((e.clientY - r.top) / r.height - 0.5) * 16);
        });
        card.addEventListener("pointerleave", function () { rx(0); ry(0); });
      }
    });
  }

  function initProgetti() {
    var mm = gsap.matchMedia();
    mm.add("(min-width: 900px)", function () {
      var sec = $("#progetti");
      var pin = $("#progettiPin");
      var dist = function () { return Math.max(0, pin.scrollWidth - pin.clientWidth); };
      var horiz = gsap.to(pin, {
        x: function () { return -dist(); },
        ease: "none",
        scrollTrigger: {
          trigger: sec,
          start: "top top",
          end: function () { return "+=" + dist(); },
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1
        }
      });
      // ogni card ondeggia mentre scorre, a velocità diverse
      $$(".p-card").forEach(function (card, i) {
        gsap.fromTo(card, { y: i % 2 ? -50 : 50, rotation: i % 2 ? 5 : -5 }, {
          y: i % 2 ? 40 : -40,
          rotation: i % 2 ? -3 : 3,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            containerAnimation: horiz,
            start: "left right",
            end: "right left",
            scrub: 1
          }
        });
      });
      gsap.from(".progetti-intro > *", {
        y: 60,
        opacity: 0,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: { trigger: sec, start: "top 80%", end: "top 20%", scrub: 1 }
      });
    });
    mm.add("(max-width: 899px)", function () {
      $$(".p-card, .p-card-end").forEach(function (card, i) {
        gsap.from(card, {
          y: 120,
          rotation: i % 2 ? 6 : -6,
          opacity: 0,
          ease: "power2.out",
          scrollTrigger: { trigger: card, start: "top 100%", end: "top 65%", scrub: 1 }
        });
      });
    });
  }

  /* ---------------------------------------------------------
     CASE STUDY — overlay a tutto schermo con sipario
     --------------------------------------------------------- */
  var caseEl = $("#case");
  var caseScroll = $("#caseScroll");
  var caseBody = $("#caseBody");
  var curtain = $("#caseCurtain");
  var caseTriggers = [];
  var currentCase = null;
  var lastFocus = null;

  function fmt(v, suffix) {
    var s;
    if (suffix) {
      s = (Math.round(v * 10) / 10).toLocaleString(I18N.locale, { maximumFractionDigits: 1 });
    } else {
      s = Math.round(v).toLocaleString(I18N.locale);
    }
    return s + (suffix || "");
  }

  function renderBlock(b) {
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
        h = '<section class="cb">' + kicker + '<div class="cb-stats' + (b.small ? " small" : "") + '">' +
          b.items.map(function (s) {
            return '<div class="stat"><b data-count="' + s[0] + '" data-suffix="' + (s[1] || "") + '">0</b><span>' + s[2] + "</span>" +
              (s[3] ? "<i>" + (I18N.en ? s[3].replace(",", ".") : s[3]) + "</i>" : "") + "</div>";
          }).join("") + "</div></section>";
        break;
      case "gallery":
        // "bare": immagini libere, senza riquadro né scorrimento (per loghi e mascotte)
        h = '<section class="cb"><div class="cb-gallery' + (b.wide ? " wide" : "") + (b.bare ? " bare" : "") + '"' +
          (b.bare ? "" : ' data-native-scroll data-cursor="trascina"') + ">" +
          b.items.map(function (n) {
            if (/\.mp4$/.test(n)) {
              return '<figure data-kind="video" data-src="' + b.dir + n + '"><video src="' + b.dir + n + '" muted loop playsinline preload="metadata"></video></figure>';
            }
            return '<figure data-kind="img" data-src="' + b.dir + n + '.webp"><img src="' + b.dir + n + '.webp" alt="" loading="lazy" draggable="false" /></figure>';
          }).join("") + "</div></section>";
        break;
      case "videos":
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

  function renderCase(p) {
    var idx = PROJECTS.indexOf(p);
    var next = PROJECTS[(idx + 1) % PROJECTS.length];
    var links = "";
    if (p.link) {
      links += '<a class="btn-pill magnetic" href="' + p.link.href + '" target="_blank" rel="noopener noreferrer" data-cursor="apri">' + p.link.label + ' <svg width="18" height="18"><use href="#i-arrow"/></svg></a>';
    }
    links += '<button type="button" class="btn-pill ghost magnetic" data-close-case data-cursor="chiudi">' + T("Torna ai progetti", "Back to projects") + "</button>";

    caseBody.innerHTML =
      '<header class="case-hero">' +
      '<svg class="case-hero-doodle"><use href="#d-flower"/></svg>' +
      '<p class="case-kicker"><span>0' + (idx + 1) + " — " + p.name + "</span><span>✦</span><span>" + p.tag + "</span></p>" +
      '<h1 id="caseTitle">' + p.question + "</h1>" +
      '<div class="case-skills">' + p.skills.map(function (s) { return "<span>" + s + "</span>"; }).join("") + "</div>" +
      "</header>" +
      '<div class="case-content">' +
      '<section class="cb cb-intro">' + p.intro.map(function (t) { return "<p>" + t + "</p>"; }).join("") + "</section>" +
      p.blocks.map(renderBlock).join("") +
      '<section class="case-closing"><h2>' + p.closing.title + "</h2>" +
      (p.closing.text ? "<p>" + p.closing.text + "</p>" : "") +
      '<div class="case-links">' + links + "</div></section>" +
      '<a class="case-next" href="#" data-next="' + next.id + '" data-cursor="' + I18N.cursorLabel("avanti") + '"><small>' + T("prossimo progetto", "next project") + "</small><b>" + next.name + "</b></a>" +
      "</div>";

    caseEl.style.setProperty("--case-bg", p.color);
    caseEl.style.setProperty("--case-ink", p.ink);
  }

  function initCaseAnimations() {
    var S = caseScroll;
    var mk = function (vars) {
      var targets = vars.targets;
      delete vars.targets;
      vars.scrollTrigger.scroller = S;
      var t = gsap.from(targets, vars);
      caseTriggers.push(t);
    };

    var h1 = $(".case-hero h1", caseBody);
    var words = splitWords(h1);
    caseTriggers.push(gsap.from(words, { yPercent: 100, opacity: 0, rotation: 6, stagger: 0.04, duration: 1, ease: "expo.out", delay: 0.15 }));
    caseTriggers.push(gsap.from(".case-kicker, .case-skills span", { y: 20, opacity: 0, stagger: 0.04, duration: 0.8, ease: "power3.out", delay: 0.3 }));

    $$(".cb-intro p, .cb-text, .cb-highlight, .cb-kicker", caseBody).forEach(function (el) {
      mk({ targets: el, y: 70, opacity: 0, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 96%", end: "top 72%", scrub: 1 } });
    });
    $$(".cb-list li", caseBody).forEach(function (li, i) {
      mk({ targets: li, xPercent: i % 2 ? 12 : -12, opacity: 0, ease: "power2.out", scrollTrigger: { trigger: li, start: "top 98%", end: "top 78%", scrub: 1 } });
    });
    $$(".cb-steps", caseBody).forEach(function (el) {
      mk({ targets: $$("span, i", el), scale: 0, rotation: -20, stagger: 0.1, ease: "back.out(2)", scrollTrigger: { trigger: el, start: "top 95%", end: "top 65%", scrub: 1 } });
    });
    $$(".cb-stats", caseBody).forEach(function (el) {
      mk({ targets: $$(".stat", el), y: 80, rotation: function (i) { return i % 2 ? 5 : -5; }, opacity: 0, stagger: 0.12, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 96%", end: "top 66%", scrub: 1 } });
      // contatori che salgono
      $$("b[data-count]", el).forEach(function (b) {
        var target = parseFloat(b.getAttribute("data-count"));
        var suf = b.getAttribute("data-suffix");
        var o = { v: 0 };
        var t = gsap.to(o, {
          v: target,
          duration: 2,
          ease: "expo.out",
          onUpdate: function () { b.textContent = fmt(o.v, suf); },
          scrollTrigger: { trigger: b, scroller: S, start: "top 92%", once: true }
        });
        caseTriggers.push(t);
      });
    });
    $$(".cb-gallery", caseBody).forEach(function (el) {
      mk({ targets: $$("figure", el), x: 160, rotation: 8, opacity: 0, stagger: 0.08, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 98%", end: "top 55%", scrub: 1 } });
    });
    $$(".cb-videos", caseBody).forEach(function (el) {
      mk({ targets: $$(".vid", el), y: 100, rotation: function (i) { return i % 2 ? 6 : -6; }, opacity: 0, stagger: 0.1, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 98%", end: "top 40%", scrub: 1 } });
    });
    $$(".cb-palette", caseBody).forEach(function (el) {
      mk({ targets: $$(".swatch", el), scale: 0, rotation: -90, stagger: 0.1, ease: "back.out(1.6)", scrollTrigger: { trigger: el, start: "top 95%", end: "top 60%", scrub: 1 } });
    });
    mk({ targets: ".case-closing", scale: 0.85, opacity: 0, ease: "power2.out", scrollTrigger: { trigger: ".case-closing", start: "top 98%", end: "top 60%", scrub: 1 } });
  }

  function wireCaseMedia() {
    // gallerie: trascina per scorrere (mouse), clicca per ingrandire
    $$(".cb-gallery", caseBody).forEach(function (g) {
      var down = null;
      g.addEventListener("pointerdown", function (e) {
        if (e.pointerType !== "mouse") return;
        down = { x: e.clientX, left: g.scrollLeft, moved: false };
        g.style.scrollSnapType = "none";
      });
      window.addEventListener("pointermove", function (e) {
        if (!down) return;
        var dx = e.clientX - down.x;
        if (Math.abs(dx) > 5) down.moved = true;
        g.scrollLeft = down.left - dx;
      });
      window.addEventListener("pointerup", function () {
        if (!down) return;
        g._justDragged = down.moved;
        down = null;
        g.style.scrollSnapType = "";
      });
      // rotella verticale → scorrimento orizzontale dentro la galleria
      g.addEventListener("wheel", function (e) {
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX) && g.scrollWidth > g.clientWidth) {
          var atStart = g.scrollLeft <= 0 && e.deltaY < 0;
          var atEnd = g.scrollLeft + g.clientWidth >= g.scrollWidth - 1 && e.deltaY > 0;
          if (atStart || atEnd) return;
          e.preventDefault();
          g.scrollLeft += e.deltaY;
        }
      }, { passive: false });
    });

    $$("figure[data-kind]", caseBody).forEach(function (f) {
      f.addEventListener("click", function () {
        var g = f.closest(".cb-gallery");
        if (g && g._justDragged) { g._justDragged = false; return; }
        openLightbox(f.getAttribute("data-kind"), f.getAttribute("data-src"));
      });
    });

    // video: anteprima muta al passaggio del mouse
    $$(".vid", caseBody).forEach(function (v) {
      var video = $("video", v);
      v.addEventListener("mouseenter", function () {
        var p = video.play();
        if (p && p.catch) p.catch(function () {});
        v.classList.add("is-playing");
      });
      v.addEventListener("mouseleave", function () {
        video.pause();
        v.classList.remove("is-playing");
      });
    });

    // i video delle gallerie partono solo quando sono visibili
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var vid = en.target;
        if (en.isIntersecting) { var p = vid.play(); if (p && p.catch) p.catch(function () {}); }
        else vid.pause();
      });
    }, { root: caseScroll, threshold: 0.3 });
    $$(".cb-gallery video", caseBody).forEach(function (v) { io.observe(v); });
    caseTriggers.push({ kill: function () { io.disconnect(); } });

    $$("[data-close-case]", caseBody).forEach(function (b) { b.addEventListener("click", closeCase); });
    $(".case-next", caseBody).addEventListener("click", function (e) {
      e.preventDefault();
      switchCase(this.getAttribute("data-next"));
    });
    initMagnetic(caseBody);
  }

  function killCaseStuff() {
    caseTriggers.forEach(function (t) {
      if (t.scrollTrigger) t.scrollTrigger.kill();
      t.kill();
    });
    caseTriggers = [];
    $$("video", caseBody).forEach(function (v) { v.pause(); v.removeAttribute("src"); v.load(); });
  }

  function openCase(id) {
    var p = PROJECTS.filter(function (x) { return x.id === id; })[0];
    if (!p || currentCase) return;
    currentCase = id;
    lastFocus = document.activeElement;
    renderCase(p);
    html.classList.add("is-locked");
    caseEl.classList.add("is-open");
    caseEl.setAttribute("aria-hidden", "false");
    caseScroll.scrollTop = 0;
    SmoothScroll.moving = false;

    var tl = gsap.timeline();
    tl.set(caseScroll, { opacity: 0 })
      .fromTo(curtain, { yPercent: 100, borderRadius: "50% 50% 0 0 / 14vh 14vh 0 0" }, {
        yPercent: 0,
        borderRadius: "0% 0% 0 0 / 0vh 0vh 0 0",
        duration: 0.9,
        ease: "power4.inOut"
      })
      .add(function () {
        wireCaseMedia();
        initCaseAnimations();
        ScrollTrigger.refresh();
      })
      .to(caseScroll, { opacity: 1, duration: 0.35 })
      .add(function () { $("#caseClose").focus({ preventScroll: true }); });
  }

  function closeCase() {
    if (!currentCase) return;
    var tl = gsap.timeline({
      onComplete: function () {
        killCaseStuff();
        caseBody.innerHTML = "";
        caseEl.classList.remove("is-open");
        caseEl.setAttribute("aria-hidden", "true");
        html.classList.remove("is-locked");
        currentCase = null;
        ScrollTrigger.refresh();
        if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
      }
    });
    // stesso gesto del loader: il sipario viene trascinato verso l'alto
    tl.set(curtain, { yPercent: 0, borderRadius: 0 })
      .to(caseScroll, { opacity: 0, duration: 0.3 })
      .to(curtain, {
        yPercent: -100,
        borderRadius: "0 0 50% 50% / 0 0 14vh 14vh",
        duration: 0.9,
        ease: "power4.inOut"
      });
  }

  function switchCase(id) {
    var p = PROJECTS.filter(function (x) { return x.id === id; })[0];
    if (!p) return;
    var tl = gsap.timeline();
    tl.to(caseScroll, { opacity: 0, duration: 0.35 })
      .add(function () {
        killCaseStuff();
        currentCase = id;
        renderCase(p);
        caseScroll.scrollTop = 0;
        gsap.set(curtain, { yPercent: 0, borderRadius: 0 });
      })
      .add(function () {
        wireCaseMedia();
        initCaseAnimations();
        ScrollTrigger.refresh();
      })
      .to(caseScroll, { opacity: 1, duration: 0.4 });
  }

  $("#caseClose").addEventListener("click", closeCase);

  /* ---------- Lightbox ---------- */
  var lb = $("#lightbox");
  function openLightbox(kind, src) {
    lb.innerHTML = kind === "video"
      ? '<video src="' + src + '" controls autoplay playsinline></video>'
      : '<img src="' + src + '" alt="" />';
    lb.classList.add("is-open");
    lb.setAttribute("aria-hidden", "false");
  }
  function closeLightbox() {
    var v = $("video", lb);
    if (v) v.pause();
    lb.classList.remove("is-open");
    lb.setAttribute("aria-hidden", "true");
    setTimeout(function () { if (!lb.classList.contains("is-open")) lb.innerHTML = ""; }, 400);
  }
  lb.addEventListener("click", function (e) {
    if (e.target.tagName.toLowerCase() === "video") return;
    closeLightbox();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    if (lb.classList.contains("is-open")) closeLightbox();
    else if (currentCase) closeCase();
    else closeMenu();
  });

  /* ---------------------------------------------------------
     CONTATTI
     --------------------------------------------------------- */
  function initContatti() {
    var big = $(".contatti-big");
    var words = splitWords(big);
    gsap.from(words, {
      yPercent: 100,
      rotation: function (i) { return i % 2 ? 8 : -8; },
      opacity: 0,
      stagger: 0.08,
      ease: "power2.out",
      scrollTrigger: { trigger: big, start: "top 95%", end: "top 60%", scrub: 1 }
    });
    gsap.from(".mail-big", {
      y: 60,
      opacity: 0,
      ease: "power2.out",
      scrollTrigger: { trigger: ".mail-big", start: "top 98%", end: "top 75%", scrub: 1 }
    });
    gsap.from(".c-card", {
      y: 100,
      rotation: function (i) { return i % 2 ? 6 : -6; },
      opacity: 0,
      stagger: 0.1,
      ease: "power2.out",
      scrollTrigger: { trigger: ".contatti-grid", start: "top 98%", end: "top 65%", scrub: 1 }
    });

    var email = "alice.cracchiolo@gmail.com";
    $("#mailBig").addEventListener("click", function (e) {
      var x = e.clientX || innerWidth / 2;
      var y = e.clientY || innerHeight / 2;
      var ok = function () {
        toast(T("copiata! ✦ ora scrivimi", "copied! ✦ now write to me"));
        burst(x, y, 22);
      };
      // se il browser rifiuta gli appunti, seleziono il testo così si copia a mano
      var fallback = function () {
        var sel = window.getSelection();
        var range = document.createRange();
        range.selectNodeContents($(".mail-big-text"));
        sel.removeAllRanges();
        sel.addRange(range);
        toast(T("selezionata ✦ premi Ctrl/Cmd+C", "selected ✦ press Ctrl/Cmd+C"));
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(ok, fallback);
      } else {
        fallback();
      }
    });
  }

  /* ---------------------------------------------------------
     FOOTER — nome gigante + fisica
     --------------------------------------------------------- */
  function initFooter() {
    $("#year").textContent = new Date().getFullYear();
    var name = $("#footerName");
    var chars = splitChars(name);
    gsap.from(chars, {
      yPercent: 110,
      rotation: function (i) { return i % 2 ? 12 : -12; },
      stagger: 0.04,
      duration: 1.2,
      ease: "expo.out",
      scrollTrigger: { trigger: name, start: "top 98%", toggleActions: "play none none reverse" }
    });
    ScrollTrigger.create({
      trigger: "#footer",
      start: "top 70%",
      toggleClass: { targets: document.body, className: "in-footer" }
    });
    chars.forEach(function (c) {
      c.addEventListener("mouseenter", function () {
        gsap.to(c, { yPercent: -12, rotation: rand(-12, 12), duration: 0.25, ease: "power2.out", yoyo: true, repeat: 1, overwrite: "auto" });
        var r = c.getBoundingClientRect();
        if (Math.random() > 0.6) burst(r.left + r.width / 2, r.top + r.height / 3, 3);
      });
    });

    $("#toTop").addEventListener("click", function () { SmoothScroll.to(0); });

    var M = "#fdf3ff", G = "#2a2b2a", O = "#737e4e", L = "#996888", P = "#d6b3ca", S = "#c4cc9f";
    var items = [
      { label: T("Storia", "Story"), href: "#storia", bg: M, ink: G, size: 1.25, cursor: T("vai", "go") },
      { label: T("Filosofia", "Philosophy"), href: "#filosofia", bg: O, ink: M, size: 1.35, cursor: T("vai", "go"), fs: T(0.36, 0.3) },
      { label: T("Progetti", "Projects"), href: "#progetti", bg: G, ink: M, size: 1.45, cursor: T("vai", "go") },
      { label: T("Contatti", "Contact"), href: "#contatti", bg: L, ink: M, size: 1.3, cursor: T("vai", "go") },
      { icon: "i-linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/alice-cracchiolo/", bg: P, ink: G, size: 0.95, cursor: "LinkedIn" },
      { icon: "i-instagram", label: "Instagram", href: "https://www.instagram.com/alice.cracchiolo/", bg: S, ink: G, size: 0.95, cursor: "Instagram" },
      { icon: "i-mail", label: "Email", href: "mailto:alice.cracchiolo@gmail.com", bg: M, ink: L, size: 0.95, cursor: "email" },
      { label: T("idee ✦", "ideas ✦"), bg: P, ink: G, size: 1.05 },
      { label: T("curiosità", "curiosity"), bg: M, ink: O, size: 1.15, fs: 0.3 },
      { label: "content", bg: S, ink: G, size: 1 },
      { label: "copy", bg: G, ink: P, size: 0.85 },
      { label: "video", bg: O, ink: M, size: 0.9 },
      { label: T("caffè?", "coffee?"), bg: L, ink: M, size: 0.8 },
      { icon: "d-star", bg: M, ink: O, size: 0.7 },
      { icon: "d-flower", bg: G, ink: P, size: 0.75 },
      { icon: "d-heart", bg: P, ink: "#5e4955", size: 0.65 },
      { icon: "d-spiral", bg: S, ink: G, size: 0.7 },
      { icon: "d-sparkle", bg: O, ink: M, size: 0.6 }
    ];
    // su schermi piccoli meno oggetti, altrimenti non c'è spazio
    if (innerWidth < 600) items = items.filter(function (it, i) { return i < 13; });

    var world = new FooterPhysics($("#physics"), items);
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) world.start();
        else world.stop();
      });
    }, { threshold: 0.25 });
    io.observe($("#physics"));
  }

  /* ---------------------------------------------------------
     LOADER — conteggio reale degli asset + uscita a sipario
     --------------------------------------------------------- */
  function runLoader() {
    var loader = $("#loader");
    var countEl = $("#loaderCount");
    var fill = $("#loaderFill");
    var curve = $("#loaderCurve");
    var len = fill.getTotalLength();
    gsap.set(fill, { strokeDasharray: len, strokeDashoffset: len });

    // ingresso
    var letters = $$(".loader-name span");
    gsap.set(letters, { yPercent: 120, rotation: function (i) { return i % 2 ? 20 : -20; } });
    gsap.set(".loader-kicker, .loader-line", { opacity: 0, y: 20 });
    var intro = gsap.timeline();
    intro.to(letters, { yPercent: 0, rotation: 0, duration: 1.1, stagger: 0.08, ease: "elastic.out(1, 0.55)" })
      .to(".loader-kicker, .loader-line", { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power3.out" }, 0.3)
      .to(".ld", { opacity: 1, scale: 1, duration: 0.8, stagger: 0.12, ease: "back.out(3)" }, 0.2);
    gsap.set(".ld", { scale: 0 });
    // le lettere ballano mentre si aspetta
    var dance = gsap.to(letters, {
      yPercent: -8,
      rotation: function (i) { return i % 2 ? -6 : 6; },
      duration: 0.6,
      ease: "sine.inOut",
      stagger: { each: 0.1, repeat: -1, yoyo: true },
      delay: 1.1
    });
    var spin = gsap.to(".ld", { rotation: 360, duration: 9, repeat: -1, ease: "none" });

    // asset da attendere: immagini nel DOM + font
    var imgs = $$("img").filter(function (i) { return !i.complete; });
    var total = imgs.length + 1;
    var done = 0;
    var tick = function () { done = Math.min(total, done + 1); };
    imgs.forEach(function (img) {
      img.addEventListener("load", tick, { once: true });
      img.addEventListener("error", tick, { once: true });
    });
    (document.fonts ? document.fonts.ready : Promise.resolve()).then(tick);
    // rete lenta: dopo 7s si parte comunque
    setTimeout(function () { done = total; }, 7000);

    var shown = 0;
    var t0 = performance.now();
    var minTime = reduced ? 400 : 2300;
    var finished = false;

    function update() {
      var real = done / total;
      var timeCap = Math.min(1, (performance.now() - t0) / minTime);
      var target = Math.min(real, timeCap) * 100;
      shown += (target - shown) * 0.08;
      if (target === 100 && shown > 99.4) shown = 100;
      countEl.textContent = Math.floor(shown);
      fill.style.strokeDashoffset = String(len * (1 - shown / 100));
      if (shown === 100 && !finished) {
        finished = true;
        gsap.ticker.remove(update);
        exit();
      }
    }
    gsap.ticker.add(update);

    function exit() {
      // fermo il "ballo" in attesa, altrimenti continua a riportare giù le lettere
      // mentre l'uscita le lancia verso l'alto e "Alice" ricompare
      dance.kill();
      spin.kill();
      intro.kill();
      var c = { v: 0 };
      var setCurve = function () {
        curve.setAttribute("d", "M0 0 L100 0 Q50 " + c.v.toFixed(2) + " 0 0Z");
      };
      var tl = gsap.timeline({
        onComplete: function () {
          loader.remove();
        }
      });
      tl.to(letters, {
        yPercent: -130,
        rotation: function (i) { return i % 2 ? -25 : 25; },
        duration: 0.7,
        stagger: 0.05,
        ease: "back.in(1.7)"
      })
        .to(".ld", { scale: 0, rotation: "+=180", duration: 0.5, stagger: 0.04, ease: "back.in(2)" }, 0)
        .to(".loader-kicker, .loader-line, .loader-bottom", { opacity: 0, y: -30, duration: 0.5, ease: "power2.in" }, 0.1)
        // il sipario viene trascinato verso l'alto: il bordo si curva e poi si distende
        .to(loader, { yPercent: -100, duration: 1.3, ease: "power4.inOut" }, 0.55)
        .to(c, { v: 20, duration: 0.65, ease: "power2.in", onUpdate: setCurve }, 0.55)
        .to(c, { v: 0, duration: 0.65, ease: "power2.out", onUpdate: setCurve }, 1.2)
        .add(function () {
          html.classList.remove("is-loading");
          window.scrollTo(0, 0);
          SmoothScroll.current = SmoothScroll.target = 0;
          ScrollTrigger.refresh();
        }, 1.0)
        .add(heroIntro(), 1.05);
    }
  }

  /* ---------------------------------------------------------
     RITORNO DAL CAMBIO LINGUA — niente loader: il sipario della
     lingua copre la pagina, torno allo stesso punto e lo sollevo
     --------------------------------------------------------- */
  function returnFromLangSwitch(state) {
    var loader = $("#loader");
    if (loader) loader.remove();
    var curtain = $("#langCurtain");
    $(".lang-curtain-word", curtain).textContent = I18N.en ? "English" : "Italiano";
    curtain.hidden = false;
    gsap.set(curtain, { yPercent: 0 });
    html.classList.remove("is-loading");
    heroIntro();

    var lifted = false;
    var lift = function () {
      if (lifted) return;
      lifted = true;
      ScrollTrigger.refresh();
      var y = Math.max(0, Math.min(SmoothScroll.limit(), (state && state.y) || 0));
      window.scrollTo(0, y);
      SmoothScroll.current = SmoothScroll.target = y;
      ScrollTrigger.update();
      gsap.to(".lang-curtain-word", { yPercent: -120, rotation: -6, duration: 0.6, ease: "power3.in" });
      gsap.to(curtain, {
        yPercent: -100,
        duration: 0.9,
        delay: 0.25,
        ease: "power4.inOut",
        onComplete: function () { curtain.hidden = true; }
      });
    };
    // aspetto i font (cambiano le misure del layout), ma non all'infinito
    (document.fonts ? document.fonts.ready : Promise.resolve()).then(function () { setTimeout(lift, 150); });
    setTimeout(lift, 2500);
  }

  /* ---------------------------------------------------------
     AVVIO
     --------------------------------------------------------- */
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  window.scrollTo(0, 0);

  // la lingua va applicata prima di qualsiasi split del testo
  I18N.applyStatic();
  I18N.initToggle();

  buildCards();
  prepHero();
  initCursor();
  initNav();
  initMarquee();
  initSectionTitles();
  initStoria();
  initFilosofia();
  initProgetti();
  initContatti();
  initFooter();
  initDraggables();
  initMagnetic();
  if (I18N.switched) returnFromLangSwitch(I18N.switched);
  else runLoader();

  if (document.fonts) document.fonts.ready.then(function () { ScrollTrigger.refresh(); });
  window.addEventListener("load", function () { ScrollTrigger.refresh(); });
})();
