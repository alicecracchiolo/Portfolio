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
    var shown;
    if (isInt) {
      var rounded = Math.round(val);
      shown = Math.abs(rounded) >= 1000 ? rounded.toLocaleString('it-IT') : String(rounded);
    } else {
      shown = val.toFixed(1).replace('.', ',');
    }
    return prefix + shown + suffix;
  }
  // Elements inside the case-study overlay get their count-up wired up
  // separately (see "Case study overlay" below), scoped to its own
  // scroll container instead of the page — the overlay sits at
  // position:fixed so the default window scroller can't place them.
  var numEls = Array.prototype.filter.call(document.querySelectorAll('.num-value'), function (el) {
    return !el.closest('.case-study');
  });
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
    var mainReveals = Array.prototype.filter.call(document.querySelectorAll('.reveal, .process-step'), function (el) {
      return !el.closest('.case-study');
    });
    mainReveals.forEach(function (el, i) {
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
    document.querySelectorAll('.reveal, .process-step, .hero-fade').forEach(function (el) {
      el.style.opacity = 1;
    });
  }

  // ---------- Timeline: horizontal scroll-driven slideshow (Il Percorso) ----------
  // Set up before the Lavori pin below: Il Percorso sits earlier in the
  // document, and ScrollTrigger resolves pinned sections' scroll positions
  // in creation order — creating a later section's pin first would measure
  // Lavori's position before Il Percorso's own pin-spacer exists, leaving
  // it permanently stale (activating far too early, over Servizi).
  var thPin = document.getElementById('thPin');
  var thTrack = document.getElementById('thTrack');
  var thFrames = thPin ? Array.prototype.slice.call(thPin.querySelectorAll('[data-th-frame]')) : [];

  if (hasGSAP && thPin && thFrames.length) {
    var mmTh = gsap.matchMedia();

    mmTh.add('(min-width: 981px)', function () {
      var unitPx = 420;
      var n = thFrames.length;
      var revealDuration = 1;
      var holdDuration = 1.5; // dwell time to actually read the text before it slides away
      var lastHoldDuration = 0.75; // shorter: the last frame also gets a natural pause once it unpins
      var slideDuration = 0.35; // faster: the horizontal slide has no text, just the black background moving
      var totalUnits = n * 2 * revealDuration + (n - 1) * (holdDuration + slideDuration) + lastHoldDuration;
      // Frames are laid out right-to-left (row-reverse): the first frame
      // sits at xPercent 0, and each later frame sits further in the
      // negative-local direction. Animating the track to a positive
      // xPercent brings the next frame into view from the left while the
      // current one exits toward the right — motion moves right as you
      // scroll down, per request.
      var xFor = function (frameIndex) { return frameIndex * 100; };

      gsap.set(thTrack, { xPercent: xFor(0) });

      var tlh = gsap.timeline({
        scrollTrigger: {
          trigger: thPin,
          start: 'top top',
          end: '+=' + (totalUnits * unitPx),
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
          fastScrollEnd: true,
          invalidateOnRefresh: true
        }
      });

      thFrames.forEach(function (frame, i) {
        var head = frame.querySelector('.th-frame-head');
        var desc = frame.querySelector('.th-frame-desc');
        tlh.fromTo(head, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: revealDuration, ease: 'power2.out' });
        tlh.fromTo(desc, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: revealDuration, ease: 'power2.out' });
        // The last frame still gets a held reading pause (shorter, since it
        // also gets a natural one once the pin releases and it sits in
        // normal flow for its own viewport height before Filosofia begins).
        // Without any pinned hold at all, that stretch scrolls by at normal
        // 1:1 speed instead of the throttled pace the other frames get.
        tlh.to({}, { duration: i < n - 1 ? holdDuration : lastHoldDuration });
        if (i < n - 1) {
          tlh.to(thTrack, { xPercent: xFor(i + 1), duration: slideDuration, ease: 'power2.inOut' });
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

  // ---------- Philosophy: pinned frame, horizontal jump-in from Il Percorso ----------
  // Set up after Il Percorso (above it in the DOM) and before Lavori (below
  // it), for the same creation-order reason noted above. Mirrors the same
  // pin/slide mechanic as the Percorso frames: pin the viewport, slide the
  // content in horizontally like a quick jump, then reveal the text while
  // still pinned, before releasing back into normal vertical scroll.
  var philoPin = document.getElementById('philoPin');
  var philoFrame = document.getElementById('philoFrame');
  var philoInner = document.querySelector('.philosophy-inner');

  if (hasGSAP && philoPin && philoFrame) {
    var mmPhilo = gsap.matchMedia();

    mmPhilo.add('(min-width: 981px)', function () {
      // Slide the centered content block itself (not the full-width frame)
      // so the jump-in distance is short and snappy, then hold in place
      // for most of the pinned scroll range, giving time to read before
      // the pin releases.
      gsap.set(philoInner, { xPercent: 45, opacity: 0 });

      var philoTl = gsap.timeline({
        scrollTrigger: {
          trigger: philoPin,
          start: 'top top',
          end: '+=1600',
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
          fastScrollEnd: true,
          invalidateOnRefresh: true
        }
      });
      philoTl
        .to(philoInner, { xPercent: 0, opacity: 1, duration: 0.2, ease: 'power2.out' })
        .to({}, { duration: 1 });

      return function () {
        gsap.set(philoInner, { xPercent: 0, opacity: 1 });
      };
    });

    mmPhilo.add('(max-width: 980px)', function () {
      gsap.set(philoInner, { xPercent: 0, opacity: 1 });
    });
  } else if (philoInner) {
    philoInner.style.opacity = 1;
  }

  // ---------- Horizontal scroll-hijack (Lavori) ----------
  var track = document.getElementById('hTrack');
  var horizontalSection = document.querySelector('.horizontal-section');
  var trackWrap = document.querySelector('.h-track-wrap');

  if (hasGSAP && track && horizontalSection) {
    var mm = gsap.matchMedia();

    mm.add('(min-width: 900px)', function () {
      trackWrap.style.overflow = 'hidden';
      var scrollAmount = function () {
        return Math.max(0, track.scrollWidth - horizontalSection.offsetWidth);
      };
      // Stretch the scroll distance needed to cross the cards (without
      // changing how far they actually travel), so the horizontal slide
      // reads at a comfortable, readable pace instead of rushing by.
      var scrollStretch = 2.8;
      var tween = gsap.to(track, {
        x: function () { return -scrollAmount(); },
        ease: 'none',
        scrollTrigger: {
          trigger: horizontalSection,
          start: 'top top',
          end: function () { return '+=' + (scrollAmount() * scrollStretch); },
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
          fastScrollEnd: true,
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

  // ---------- Case study overlay (BuddyJob) ----------
  // The card is the only entry point: clicking (or Enter/Space) opens a
  // full-screen in-page overlay with its own internal scroll container.
  // The overlay is position:fixed, so its content can't use the page's
  // default ScrollTrigger scroller — reveals and count-ups inside it are
  // wired up lazily, scoped to its own scroll element, the first time it
  // opens (avoiding bogus positions from measuring a hidden fixed element
  // at page load).
  function initCaseStudyContent(overlay, scrollEl) {
    var localNumEls = overlay.querySelectorAll('.num-value');
    var localReveals = overlay.querySelectorAll('.reveal');

    if (hasGSAP) {
      localReveals.forEach(function (el) {
        gsap.fromTo(el, { y: 30, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', scroller: scrollEl }
        });
      });
      localNumEls.forEach(function (el) {
        var end = parseFloat(el.dataset.value);
        var obj = { val: 0 };
        ScrollTrigger.create({
          trigger: el,
          start: 'top 90%',
          once: true,
          scroller: scrollEl,
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
      requestAnimationFrame(function () { ScrollTrigger.refresh(); });
    } else {
      localReveals.forEach(function (el) { el.style.opacity = 1; });
      localNumEls.forEach(function (el) { el.textContent = formatNum(parseFloat(el.dataset.value), el); });
    }
  }

  var caseStudyOverlays = document.querySelectorAll('.case-study');
  if (caseStudyOverlays.length) {
    var openCaseStudy = function (key, trigger) {
      var overlay = document.querySelector('.case-study[data-case-study="' + key + '"]');
      if (!overlay) return;
      var scrollEl = overlay.querySelector('.case-study-scroll');
      scrollEl.scrollTop = 0;
      overlay.dataset.opener = '';
      if (trigger && trigger.id) overlay.dataset.opener = trigger.id;
      document.documentElement.classList.add('cs-open');
      overlay.setAttribute('aria-hidden', 'false');
      overlay.style.visibility = 'visible';
      if (hasGSAP) {
        gsap.to(overlay, { opacity: 1, duration: 0.5, ease: 'power2.out' });
      } else {
        overlay.style.opacity = 1;
      }
      if (!overlay.dataset.csInit) {
        overlay.dataset.csInit = '1';
        initCaseStudyContent(overlay, scrollEl);
      } else if (hasGSAP) {
        ScrollTrigger.refresh();
      }
      var closeBtn = overlay.querySelector('.cs-close');
      if (closeBtn) closeBtn.focus();
      overlay.querySelectorAll('video').forEach(function (v) { v.play().catch(function () {}); });
    };

    var closeCaseStudy = function (overlay) {
      document.documentElement.classList.remove('cs-open');
      overlay.setAttribute('aria-hidden', 'true');
      overlay.querySelectorAll('video').forEach(function (v) { v.pause(); });
      if (hasGSAP) {
        gsap.to(overlay, {
          opacity: 0,
          duration: 0.35,
          ease: 'power2.in',
          onComplete: function () { overlay.style.visibility = 'hidden'; }
        });
      } else {
        overlay.style.opacity = 0;
        overlay.style.visibility = 'hidden';
      }
      var opener = overlay.dataset.opener && document.getElementById(overlay.dataset.opener);
      if (opener) opener.focus();
    };

    document.querySelectorAll('[data-case-open]').forEach(function (trigger) {
      trigger.addEventListener('click', function () { openCaseStudy(trigger.dataset.caseOpen, trigger); });
      trigger.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openCaseStudy(trigger.dataset.caseOpen, trigger);
        }
      });
    });

    document.querySelectorAll('[data-case-close]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var overlay = btn.closest('.case-study');
        if (overlay) closeCaseStudy(overlay);
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      caseStudyOverlays.forEach(function (overlay) {
        if (overlay.getAttribute('aria-hidden') === 'false') closeCaseStudy(overlay);
      });
    });
  }

  var lightbox = document.getElementById('csLightbox');
  var lightboxImg = document.getElementById('csLightboxImg');
  var lightboxVideo = document.getElementById('csLightboxVideo');
  if (lightbox && lightboxImg) {
    var closeLightbox = function () {
      lightbox.setAttribute('aria-hidden', 'true');
      if (lightboxVideo) lightboxVideo.pause();
    };
    document.querySelectorAll('.cs-zoomable').forEach(function (img) {
      img.addEventListener('click', function () {
        lightboxImg.src = img.currentSrc || img.src;
        lightboxImg.alt = img.alt;
        lightboxImg.hidden = false;
        if (lightboxVideo) { lightboxVideo.pause(); lightboxVideo.hidden = true; }
        lightbox.setAttribute('aria-hidden', 'false');
      });
    });
    if (lightboxVideo) {
      document.querySelectorAll('.cs-zoomable-video').forEach(function (video) {
        video.addEventListener('click', function () {
          lightboxVideo.src = video.currentSrc || video.src;
          lightboxImg.hidden = true;
          lightboxVideo.hidden = false;
          lightbox.setAttribute('aria-hidden', 'false');
          lightboxVideo.play().catch(function () {});
        });
      });
    }
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
    var lightboxCloseBtn = lightbox.querySelector('[data-lightbox-close]');
    if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', closeLightbox);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lightbox.getAttribute('aria-hidden') === 'false') closeLightbox();
    });
  }

  // With multiple large pinned sections on the page, a late layout shift
  // (web fonts swapping in, images/SVGs finishing load) can leave
  // ScrollTrigger start/end positions stale. Force a clean recalculation
  // once everything has settled, as a safety net alongside the creation
  // order above.
  if (hasGSAP) {
    window.addEventListener('load', function () { ScrollTrigger.refresh(); });
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () { ScrollTrigger.refresh(); });
    }
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
