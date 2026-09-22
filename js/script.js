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

  // ---------- Anchor navigation: precise scroll targeting ----------
  // A plain browser anchor jump (even with scroll-behavior: smooth) lands
  // at the target element's own top, which for a section whose content is
  // revealed by a scrubbed, pinned ScrollTrigger (e.g. Filosofia) can be
  // well before that reveal has played out, leaving the section looking
  // empty until the visitor scrolls further. Sections registered here
  // instead land at the scroll position where their reveal has already
  // completed, computed straight from the ScrollTrigger's own start/end
  // (so it stays correct across refresh/resize); everything else falls
  // back to a header-aware offset of the element's natural position.
  var pinnedSectionReveal = {};

  function scrollToId(id) {
    var target = document.getElementById(id);
    if (!target) return;
    var top;
    var reveal = pinnedSectionReveal[id];
    var st = reveal && reveal.getScrollTrigger && reveal.getScrollTrigger();
    if (st) {
      top = st.start + reveal.revealFraction * (st.end - st.start);
    } else {
      var headerOffset = header ? header.getBoundingClientRect().height : 0;
      top = target.getBoundingClientRect().top + window.scrollY - headerOffset - 16;
    }
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    if (window.history && history.pushState) history.pushState(null, '', '#' + id);
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    var id = link.getAttribute('href').slice(1);
    if (!id || !document.getElementById(id)) return;
    link.addEventListener('click', function (e) {
      e.preventDefault();
      scrollToId(id);
    });
  });

  if (window.location.hash) {
    window.addEventListener('load', function () {
      // Give ScrollTrigger instances (created synchronously above, but
      // measured against final layout/fonts) a moment to settle before
      // computing a pinned-section target off their start/end values.
      setTimeout(function () { scrollToId(window.location.hash.slice(1)); }, hasGSAP ? 300 : 0);
    });
  }

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
    var mainReveals = Array.prototype.filter.call(document.querySelectorAll('.reveal'), function (el) {
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
    document.querySelectorAll('.reveal, .hero-fade').forEach(function (el) {
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

      // Register where an anchor jump to #servizi should land: comfortably
      // past the 0.2/1.2 point in the timeline where the reveal finishes,
      // read live off this instance's ScrollTrigger start/end.
      pinnedSectionReveal.servizi = {
        getScrollTrigger: function () { return philoTl.scrollTrigger; },
        revealFraction: 0.22
      };

      return function () {
        gsap.set(philoInner, { xPercent: 0, opacity: 1 });
      };
    });

    mmPhilo.add('(max-width: 980px)', function () {
      gsap.set(philoInner, { xPercent: 0, opacity: 1 });
      pinnedSectionReveal.servizi = null;
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
      // A fast scroll gesture landing right as the section pins can carry
      // the scroll position past the very start of the range before the
      // next tick, making the first card appear to be skipped instantly.
      // Reserve a leading chunk of the scroll range as a dead zone (track
      // held at x:0) to absorb that momentum before any horizontal motion
      // starts, so the first card always gets its full dwell time.
      var leadIn = 350;
      var tween = gsap.timeline({
        scrollTrigger: {
          trigger: horizontalSection,
          start: 'top top',
          end: function () { return '+=' + (scrollAmount() * scrollStretch + leadIn); },
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
          fastScrollEnd: true,
          invalidateOnRefresh: true
        }
      });
      tween.to(track, { x: 0, duration: leadIn });
      tween.to(track, { x: function () { return -scrollAmount(); }, ease: 'none', duration: function () { return scrollAmount() * scrollStretch; } });
      return function () {
        gsap.set(track, { x: 0 });
      };
    });

    mm.add('(max-width: 899px)', function () {
      trackWrap.style.overflow = 'hidden';
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

    // Each project video starts paused with a play button overlay; it only
    // plays once the visitor clicks it, and auto-pauses if scrolled out of
    // view (so it never resumes on its own once out of sight again).
    var localVideos = overlay.querySelectorAll('.cs-video-box video, .cs-gallery-item-video video');
    localVideos.forEach(function (video) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'cs-video-play';
      btn.setAttribute('aria-label', 'Riproduci video');
      btn.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
      video.insertAdjacentElement('afterend', btn);

      function togglePlay() {
        if (video.paused) { video.muted = false; video.play().catch(function () {}); }
        else { video.pause(); }
      }
      btn.addEventListener('click', function (e) { e.stopPropagation(); togglePlay(); });
      video.addEventListener('click', togglePlay);
      video.addEventListener('play', function () { btn.classList.add('is-hidden'); });
      video.addEventListener('pause', function () { btn.classList.remove('is-hidden'); });
      video.addEventListener('ended', function () { btn.classList.remove('is-hidden'); });
    });

    if (localVideos.length && 'IntersectionObserver' in window) {
      var videoObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) { entry.target.pause(); }
        });
      }, { root: scrollEl, threshold: 0.5 });
      localVideos.forEach(function (video) { videoObserver.observe(video); });
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
      overlay.querySelectorAll('video.cs-zoomable-video').forEach(function (v) { v.play().catch(function () {}); });
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
          lightboxVideo.muted = false;
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

  // ---------- Back to top ----------
  var backToTop = document.getElementById('backToTop');
  if (backToTop) {
    backToTop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
  }

  // ---------- Footer year ----------
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

})();
