(function () {
  'use strict';

  var hasGSAP = typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';
  if (hasGSAP) gsap.registerPlugin(ScrollTrigger);

  // ---------- Header scroll state ----------
  var header = document.getElementById('siteHeader');
  function onScroll() {
    if (window.scrollY > 30) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---------- Mobile nav toggle ----------
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');
  navToggle.addEventListener('click', function () {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('mobile-open');
  });
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navToggle.classList.remove('active');
      navLinks.classList.remove('mobile-open');
    });
  });

  // ---------- Count-up numbers ----------
  function formatNum(val, el) {
    var prefix = el.dataset.prefix || '';
    var suffix = el.dataset.suffix || '';
    var isInt = Number.isInteger(parseFloat(el.dataset.value));
    var shown = isInt ? Math.round(val) : val.toFixed(1);
    return prefix + shown + suffix;
  }
  var numEls = document.querySelectorAll('.num-value');
  if (hasGSAP) {
    numEls.forEach(function (el) {
      var end = parseFloat(el.dataset.value);
      var obj = { val: 0 };
      ScrollTrigger.create({
        trigger: el,
        start: 'top 90%',
        once: true,
        onEnter: function () {
          gsap.to(obj, {
            val: end,
            duration: 1.6,
            ease: 'power2.out',
            onUpdate: function () { el.textContent = formatNum(obj.val, el); }
          });
        }
      });
    });
  } else {
    numEls.forEach(function (el) { el.textContent = formatNum(parseFloat(el.dataset.value), el); });
  }

  // ---------- Scroll reveals ----------
  if (hasGSAP) {
    gsap.utils.toArray('.reveal, .service-block, .process-step').forEach(function (el, i) {
      gsap.fromTo(el, { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%' }
      });
    });
    // Hero entrance
    var tl = gsap.timeline({ delay: 0.15 });
    tl.fromTo('.hero-title .line-inner', { yPercent: 110 }, { yPercent: 0, duration: 1, ease: 'power4.out', stagger: 0.12 })
      .fromTo('.hero-fade', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power2.out' }, '-=0.5')
      .fromTo('.hero-visual', { opacity: 0, scale: 0.85 }, { opacity: 0.95, scale: 1, duration: 1.2, ease: 'power3.out' }, '-=1');

    // Hero parallax blob
    gsap.to('.hero-visual', {
      yPercent: 18, ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
    });
  } else {
    document.querySelectorAll('.reveal, .service-block, .process-step, .hero-fade').forEach(function (el) {
      el.style.opacity = 1;
    });
  }

  // ---------- Horizontal scroll-hijack (Lavori) ----------
  var track = document.getElementById('hTrack');
  var horizontalSection = document.querySelector('.horizontal-section');
  var trackWrap = document.querySelector('.h-track-wrap');

  function isDesktop() { return window.innerWidth >= 900; }

  if (hasGSAP && track && horizontalSection) {
    var mm = gsap.matchMedia();

    mm.add('(min-width: 900px)', function () {
      trackWrap.style.overflow = 'hidden';
      var scrollAmount = function () {
        return Math.max(0, track.scrollWidth - horizontalSection.offsetWidth);
      };
      var tween = gsap.to(track, {
        x: function () { return -scrollAmount(); },
        ease: 'none',
        scrollTrigger: {
          trigger: horizontalSection,
          start: 'top top',
          end: function () { return '+=' + scrollAmount(); },
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true
        }
      });
      return function () {
        gsap.set(track, { x: 0 });
      };
    });

    mm.add('(max-width: 899px)', function () {
      trackWrap.style.overflow = 'visible';
      gsap.set(track, { x: 0 });
    });
  } else if (track && trackWrap) {
    // Fallback: native horizontal scroll if GSAP failed to load
    trackWrap.style.overflow = 'visible';
    track.style.overflowX = 'auto';
    track.style.paddingBottom = '20px';
  }

  // ---------- Timeline: horizontal scroll-driven slideshow (Il Percorso) ----------
  var thPin = document.getElementById('thPin');
  var thTrack = document.getElementById('thTrack');
  var thFrames = thPin ? Array.prototype.slice.call(thPin.querySelectorAll('[data-th-frame]')) : [];

  if (hasGSAP && thPin && thFrames.length) {
    var mmTh = gsap.matchMedia();

    mmTh.add('(min-width: 981px)', function () {
      var unitPx = 420;
      var totalUnits = thFrames.length * 2 + (thFrames.length - 1);
      var tlh = gsap.timeline({
        scrollTrigger: {
          trigger: thPin,
          start: 'top top',
          end: '+=' + (totalUnits * unitPx),
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true
        }
      });

      thFrames.forEach(function (frame, i) {
        var head = frame.querySelector('.th-frame-head');
        var desc = frame.querySelector('.th-frame-desc');
        tlh.fromTo(head, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: 'power2.out' });
        tlh.fromTo(desc, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: 'power2.out' });
        if (i < thFrames.length - 1) {
          tlh.to(thTrack, { xPercent: -100 * (i + 1), duration: 1, ease: 'power2.inOut' });
        }
      });

      return function () {
        gsap.set(thTrack, { xPercent: 0 });
        thFrames.forEach(function (frame) {
          gsap.set(frame.querySelector('.th-frame-head'), { opacity: 0, y: 40 });
          gsap.set(frame.querySelector('.th-frame-desc'), { opacity: 0, y: 30 });
        });
      };
    });

    mmTh.add('(max-width: 980px)', function () {
      gsap.set(thTrack, { xPercent: 0 });
      thFrames.forEach(function (frame) {
        gsap.set(frame.querySelector('.th-frame-head'), { opacity: 1, y: 0 });
        gsap.set(frame.querySelector('.th-frame-desc'), { opacity: 1, y: 0 });
      });
    });
  } else if (thFrames.length) {
    thFrames.forEach(function (frame) {
      frame.querySelector('.th-frame-head').style.opacity = 1;
      frame.querySelector('.th-frame-head').style.transform = 'none';
      frame.querySelector('.th-frame-desc').style.opacity = 1;
      frame.querySelector('.th-frame-desc').style.transform = 'none';
    });
  }

  // ---------- Testimonial carousel ----------
  var slidesWrap = document.getElementById('testiSlides');
  var dotsWrap = document.getElementById('testiDots');
  var prevBtn = document.getElementById('testiPrev');
  var nextBtn = document.getElementById('testiNext');
  if (slidesWrap) {
    var slides = slidesWrap.children.length;
    var current = 0;
    var autoTimer;

    for (var i = 0; i < slides; i++) {
      var dot = document.createElement('button');
      if (i === 0) dot.classList.add('active');
      dot.setAttribute('aria-label', 'Vai alla testimonianza ' + (i + 1));
      (function (idx) { dot.addEventListener('click', function () { goTo(idx); resetAuto(); }); })(i);
      dotsWrap.appendChild(dot);
    }

    function goTo(idx) {
      current = (idx + slides) % slides;
      if (hasGSAP) {
        gsap.to(slidesWrap, { xPercent: -100 * current, duration: 0.6, ease: 'power3.inOut' });
      } else {
        slidesWrap.style.transform = 'translateX(-' + (current * 100) + '%)';
      }
      Array.prototype.forEach.call(dotsWrap.children, function (d, i) { d.classList.toggle('active', i === current); });
    }

    function resetAuto() {
      clearInterval(autoTimer);
      autoTimer = setInterval(function () { goTo(current + 1); }, 6500);
    }

    prevBtn.addEventListener('click', function () { goTo(current - 1); resetAuto(); });
    nextBtn.addEventListener('click', function () { goTo(current + 1); resetAuto(); });
    resetAuto();
  }

  // ---------- Contact form (front-end only demo) ----------
  var form = document.getElementById('contactForm');
  var success = document.getElementById('formSuccess');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      success.classList.add('visible');
      form.reset();
      success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }

  // ---------- Back to top ----------
  var backToTop = document.getElementById('backToTop');
  if (backToTop) {
    backToTop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
  }

  // ---------- Footer year ----------
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

})();
