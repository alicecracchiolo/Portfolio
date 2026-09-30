/* Mini motore fisico 2D per il footer: cerchi con gravità, urti,
   rotolamento, trascinamento/lancio e "spinta" del mouse.
   Niente librerie: integrazione a passo fisso + risoluzione degli urti. */
(function () {
  "use strict";

  var GRAVITY = 2400; // px/s²
  var RESTITUTION = 0.38;
  var AIR = 0.999;
  var FLOOR_FRICTION = 0.985;
  var SUBSTEPS = 4;
  var DT = 1 / 60;

  function FooterPhysics(container, items) {
    this.container = container;
    this.items = items;
    this.bodies = [];
    this.running = false;
    this.started = false;
    this.drag = null;
    this.mouse = { x: 0, y: 0, vx: 0, vy: 0, inside: false, t: 0 };
    this._loop = this._loop.bind(this);
    this._measure();
    this._build();
    this._bind();
  }

  FooterPhysics.prototype._measure = function () {
    var rect = this.container.getBoundingClientRect();
    this.W = rect.width;
    this.H = rect.height;
    // raggio base proporzionale alla larghezza: su mobile i cerchi restano leggibili
    this.base = Math.max(34, Math.min(84, this.W / 15));
  };

  FooterPhysics.prototype._build = function () {
    var self = this;
    this.items.forEach(function (it, i) {
      var el = document.createElement(it.href ? "a" : "div");
      el.className = "body" + (it.href ? " is-link" : "");
      if (it.href) {
        el.href = it.href;
        if (/^https?:/.test(it.href)) {
          el.target = "_blank";
          el.rel = "noopener noreferrer";
        }
        el.setAttribute("data-cursor", it.cursor || "apri");
        el.setAttribute("draggable", "false");
      }
      el.style.background = it.bg;
      el.style.color = it.ink;
      el.style.touchAction = "none";
      if (it.icon) {
        el.innerHTML = '<svg aria-hidden="true"><use href="#' + it.icon + '"/></svg>';
        if (it.label) el.setAttribute("aria-label", it.label);
      } else {
        el.innerHTML = "<span>" + it.label + "</span>";
      }
      self.container.appendChild(el);
      var b = { el: el, k: it.size || 1, x: 0, y: 0, vx: 0, vy: 0, a: (Math.random() - 0.5) * 0.6, item: it, i: i };
      self._size(b);
      self._park(b, i);
      self.bodies.push(b);
    });
    this._render();
  };

  FooterPhysics.prototype._size = function (b) {
    b.r = this.base * b.k;
    b.m = b.r * b.r;
    var d = b.r * 2;
    b.el.style.width = d + "px";
    b.el.style.height = d + "px";
    b.el.style.fontSize = Math.max(12, b.r * (b.item.fs || 0.36)) + "px";
  };

  // posizione iniziale: sopra il contenitore, pronti a cadere
  FooterPhysics.prototype._park = function (b, i) {
    b.x = b.r + Math.random() * Math.max(1, this.W - b.r * 2);
    b.y = -b.r - 40 - i * 70 - Math.random() * 60;
    b.vx = (Math.random() - 0.5) * 200;
    b.vy = 0;
  };

  FooterPhysics.prototype._bind = function () {
    var self = this;
    var c = this.container;

    this.bodies.forEach(function (b) {
      b.el.addEventListener("pointerdown", function (e) {
        if (e.button !== 0) return;
        e.preventDefault();
        var p = self._local(e);
        self.drag = { b: b, ox: p.x - b.x, oy: p.y - b.y, tx: b.x, ty: b.y, sx: e.clientX, sy: e.clientY, moved: false, id: e.pointerId, hist: [] };
        try { b.el.setPointerCapture(e.pointerId); } catch (_) {}
        b.el.style.zIndex = 5;
        document.documentElement.classList.add("is-grabbing");
      });
      b.el.addEventListener("pointermove", function (e) {
        var d = self.drag;
        if (!d || d.b !== b) return;
        var p = self._local(e);
        d.tx = p.x - d.ox;
        d.ty = p.y - d.oy;
        if (Math.abs(e.clientX - d.sx) + Math.abs(e.clientY - d.sy) > 6) d.moved = true;
      });
      var end = function (e) {
        var d = self.drag;
        if (!d || d.b !== b) return;
        self.drag = null;
        b.el.style.zIndex = "";
        document.documentElement.classList.remove("is-grabbing");
        // limite alla velocità di lancio, altrimenti i cerchi escono dal mondo
        var max = 2600;
        b.vx = Math.max(-max, Math.min(max, b.vx));
        b.vy = Math.max(-max, Math.min(max, b.vy));
        b.dragged = d.moved;
        // i link interni scorrono con lo smooth scroll; gli esterni restano click nativi
        if (!d.moved && b.item.href && b.item.href.charAt(0) === "#" && e.type === "pointerup") self._follow(b.item.href);
      };
      b.el.addEventListener("pointerup", end);
      b.el.addEventListener("pointercancel", end);
      // il click nativo sul link è gestito da _follow (evita doppi click dopo un drag)
      b.el.addEventListener("click", function (e) {
        if (b.dragged || !b.item.href || b.item.href.charAt(0) === "#") e.preventDefault();
        b.dragged = false;
      });
    });

    c.addEventListener("pointermove", function (e) {
      if (e.pointerType !== "mouse") return;
      var p = self._local(e);
      var now = performance.now();
      var dt = Math.max(8, now - (self.mouse.t || now - 16)) / 1000;
      self.mouse.vx = (p.x - self.mouse.x) / dt;
      self.mouse.vy = (p.y - self.mouse.y) / dt;
      self.mouse.x = p.x;
      self.mouse.y = p.y;
      self.mouse.t = now;
      self.mouse.inside = true;
    });
    c.addEventListener("pointerleave", function () {
      self.mouse.inside = false;
    });

    var rt;
    window.addEventListener("resize", function () {
      clearTimeout(rt);
      rt = setTimeout(function () {
        self._measure();
        self.bodies.forEach(function (b) {
          self._size(b);
          b.x = Math.min(Math.max(b.x, b.r), self.W - b.r);
          b.y = Math.min(b.y, self.H - b.r);
        });
      }, 120);
    });
  };

  FooterPhysics.prototype._follow = function (href) {
    if (href.charAt(0) === "#") {
      var t = document.querySelector(href);
      if (t && window.SmoothScroll) window.SmoothScroll.to(t);
      else if (t) t.scrollIntoView({ behavior: "smooth" });
    } else if (/^https?:/.test(href)) {
      window.open(href, "_blank", "noopener");
    } else {
      window.location.href = href;
    }
  };

  FooterPhysics.prototype._local = function (e) {
    var r = this.container.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  FooterPhysics.prototype.start = function () {
    if (!this.started) {
      this.started = true;
      this._measure();
      var self = this;
      this.bodies.forEach(function (b, i) {
        self._size(b);
        self._park(b, i);
      });
    }
    if (this.running) return;
    this.running = true;
    this.last = performance.now();
    this.acc = 0;
    requestAnimationFrame(this._loop);
  };

  FooterPhysics.prototype.stop = function () {
    this.running = false;
  };

  FooterPhysics.prototype._loop = function (now) {
    if (!this.running) return;
    var frame = Math.min(0.05, (now - this.last) / 1000);
    this.last = now;
    this.acc += frame;
    while (this.acc >= DT) {
      for (var s = 0; s < SUBSTEPS; s++) this._step(DT / SUBSTEPS);
      this.acc -= DT;
    }
    this._render();
    requestAnimationFrame(this._loop);
  };

  FooterPhysics.prototype._step = function (dt) {
    var W = this.W, H = this.H, bodies = this.bodies, n = bodies.length, i, j, b;
    var d = this.drag;
    var m = this.mouse;

    for (i = 0; i < n; i++) {
      b = bodies[i];
      if (d && d.b === b) {
        // il corpo trascinato insegue il puntatore come una molla morbida
        var nvx = (d.tx - b.x) / dt * 0.12;
        var nvy = (d.ty - b.y) / dt * 0.12;
        b.vx = b.vx * 0.6 + nvx * 0.4;
        b.vy = b.vy * 0.6 + nvy * 0.4;
      } else {
        b.vy += GRAVITY * dt;
        b.vx *= AIR;
        b.vy *= AIR;
        // spinta del mouse: chi viene sfiorato prende la velocità del cursore
        if (m.inside) {
          var dx = b.x - m.x, dy = b.y - m.y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          var reach = b.r + 26;
          if (dist < reach && dist > 0.001) {
            var f = (1 - dist / reach);
            b.vx += (m.vx * 1.2 + (dx / dist) * 1400) * f * dt * 6;
            b.vy += (m.vy * 1.2 + (dy / dist) * 1400) * f * dt * 6;
          }
        }
      }
      b.x += b.vx * dt;
      b.y += b.vy * dt;
    }
    // la velocità del mouse si smorza se il cursore si ferma
    m.vx *= 0.9;
    m.vy *= 0.9;

    // urti tra cerchi (posizione + impulso)
    for (var it = 0; it < 2; it++) {
      for (i = 0; i < n; i++) {
        var A = bodies[i];
        for (j = i + 1; j < n; j++) {
          var B = bodies[j];
          var ddx = B.x - A.x, ddy = B.y - A.y;
          var rr = A.r + B.r;
          var d2 = ddx * ddx + ddy * ddy;
          if (d2 >= rr * rr || d2 === 0) continue;
          var dd = Math.sqrt(d2);
          var nx = ddx / dd, ny = ddy / dd;
          var overlap = rr - dd;
          var ia = d && d.b === A ? 0 : 1 / A.m;
          var ib = d && d.b === B ? 0 : 1 / B.m;
          var sum = ia + ib;
          if (sum === 0) continue;
          A.x -= nx * overlap * (ia / sum);
          A.y -= ny * overlap * (ia / sum);
          B.x += nx * overlap * (ib / sum);
          B.y += ny * overlap * (ib / sum);
          var rvx = B.vx - A.vx, rvy = B.vy - A.vy;
          var vn = rvx * nx + rvy * ny;
          if (vn < 0) {
            var jimp = -(1 + RESTITUTION) * vn / sum;
            A.vx -= jimp * ia * nx;
            A.vy -= jimp * ia * ny;
            B.vx += jimp * ib * nx;
            B.vy += jimp * ib * ny;
            // attrito tangenziale: fa girare i cerchi che si strofinano
            var tx = -ny, ty = nx;
            var vt = rvx * tx + rvy * ty;
            var fr = vt * 0.04 / sum;
            A.vx += fr * ia * tx; A.vy += fr * ia * ty;
            B.vx -= fr * ib * tx; B.vy -= fr * ib * ty;
          }
        }
      }
    }

    // pareti, pavimento e un soffitto alto (si possono lanciare ma tornano giù)
    for (i = 0; i < n; i++) {
      b = bodies[i];
      if (b.x < b.r) { b.x = b.r; if (b.vx < 0) b.vx = -b.vx * RESTITUTION; }
      if (b.x > W - b.r) { b.x = W - b.r; if (b.vx > 0) b.vx = -b.vx * RESTITUTION; }
      if (b.y > H - b.r) {
        b.y = H - b.r;
        if (b.vy > 0) b.vy = -b.vy * RESTITUTION;
        if (Math.abs(b.vy) < 30) b.vy = 0;
        b.vx *= FLOOR_FRICTION;
      }
      if (this.started && b.y < -H * 1.2 && b.vy < 0) { b.vy = -b.vy * 0.3; }
      // rotolamento: l'angolo segue lo spostamento orizzontale
      b.a += (b.vx * dt) / b.r;
    }
  };

  FooterPhysics.prototype._render = function () {
    for (var i = 0; i < this.bodies.length; i++) {
      var b = this.bodies[i];
      b.el.style.transform = "translate3d(" + (b.x - b.r).toFixed(2) + "px," + (b.y - b.r).toFixed(2) + "px,0) rotate(" + b.a.toFixed(3) + "rad)";
    }
  };

  window.FooterPhysics = FooterPhysics;
})();
