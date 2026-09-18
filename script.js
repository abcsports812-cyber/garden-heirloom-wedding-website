/* ==================================================================
   THE GARDEN HEIRLOOM — SITE BEHAVIOR
   Reads content from wedding-config.js (the `wedding` object) and
   renders it into the page, then wires up navigation, the countdown,
   the FAQ accordion, and scroll-reveal animations.

   You should not need to edit this file to customize your website —
   edit wedding-config.js instead.
   ================================================================== */

(function () {
  'use strict';

  // wedding-config.js declares `const wedding = {...}` at the top level.
  // Top-level const/let in a classic script does not attach to `window`,
  // but it IS shared across classic <script> tags on the same page, so
  // referencing the bare identifier here works as long as wedding-config.js
  // is loaded before this file (see index.html).
  var cfg = wedding;

  document.addEventListener('DOMContentLoaded', function () {
    renderContent();
    initMobileMenu();
    initFaq();
    initReveal();
    initCountdown();
    initHeaderScroll();
    initActiveNav();
    initRsvpForm();
    initLightbox();

    var yearEl = document.getElementById('footer-year');
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());
  });

  /* ---------------------------------------------------------------
     Rendering — pulls every editable value from wedding-config.js
     --------------------------------------------------------------- */
  function renderContent() {
    if (!cfg) return;

    var names = cfg.couple.partner1 + ' & ' + cfg.couple.partner2;

    // Document head
    document.title = cfg.meta.siteTitle;
    setMeta('name', 'description', cfg.meta.description);
    setMeta('property', 'og:title', cfg.meta.siteTitle);
    setMeta('property', 'og:description', cfg.meta.description);
    setMeta('name', 'theme-color', cfg.meta.themeColor);

    // Header
    setText('nav-monogram', cfg.couple.monogram);

    // Hero
    setText('hero-eyebrow', cfg.hero.eyebrow);
    setText('hero-names', names);
    setText('hero-date', cfg.date.display);
    setText('hero-venue', cfg.venue.name);
    setText('hero-address', cfg.venue.addressLine1 + ', ' + cfg.venue.addressLine2);
    setText('hero-tagline', cfg.hero.tagline);
    setImg('hero-image', cfg.hero.image, names + ' — ' + cfg.venue.name);

    // Story
    setText('story-text', cfg.story.paragraph);
    setText('story-heading', cfg.story.heading);
    setImg('story-image', cfg.story.image, names);
    renderList('story-timeline', cfg.story.timeline, function (item) {
      return renderEl('li', {}, [
        renderEl('span', { class: 'timeline__year' }, [document.createTextNode(item.year)]),
        renderEl('span', { class: 'timeline__title' }, [document.createTextNode(item.title)])
      ]);
    });

    // The Wedding
    setImg('wedding-image', cfg.ceremony.image, names + ' — wedding details');
    setText('ceremony-time', cfg.ceremony.time);
    setText('wedding-venue-name', cfg.venue.name);
    setAddress('wedding-address', cfg.venue.addressLine1, cfg.venue.addressLine2);
    setHref('wedding-map-link', cfg.venue.mapsUrl);
    setText('reception-time', cfg.reception.time);
    setText('reception-venue-name', cfg.venue.name);
    setText('reception-details', cfg.reception.details);

    // Day timeline
    setImg('day-image', cfg.day && cfg.day.image, '');
    renderList('day-timeline', cfg.daySchedule, function (item) {
      return renderEl('li', {}, [
        renderEl('span', { class: 'day-timeline__time' }, [document.createTextNode(item.time)]),
        renderEl('span', { class: 'day-timeline__title' }, [document.createTextNode(item.title)])
      ]);
    });

    // Venue
    setText('venue-heading', cfg.venue.name);
    setText('venue-description', cfg.venue.description);
    setAddress('venue-address', cfg.venue.addressLine1, cfg.venue.addressLine2);
    setHref('venue-map-link', cfg.venue.mapsUrl);
    setImg('venue-image', cfg.venue.image, cfg.venue.name);

    // Travel
    setImg('travel-image', cfg.travel.image, 'The road to ' + cfg.venue.name);
    setText('airport-name', cfg.travel.airport.name);
    setText('airport-duration', cfg.travel.airport.duration);
    setHref('airport-link', cfg.travel.airport.url);
    setText('hotel-name', cfg.travel.hotel.name);
    setAddress('hotel-address', cfg.travel.hotel.addressLine1, cfg.travel.hotel.addressLine2);
    setHref('hotel-link', cfg.travel.hotel.url);
    renderList('travel-tips-list', cfg.travel.tips, function (tip) {
      return renderEl('li', {}, [document.createTextNode(tip)]);
    });

    // People
    setText('bridesmaids-heading', cfg.people.bridesmaids.heading);
    renderList('bridesmaids-grid', cfg.people.bridesmaids.members, renderPersonCard);
    setText('groomsmen-heading', cfg.people.groomsmen.heading);
    renderList('groomsmen-grid', cfg.people.groomsmen.members, renderPersonCard);

    // Gallery
    renderList('gallery-grid', cfg.gallery, function (item, index) {
      var figure = renderEl('figure', { class: 'gallery__item gallery__item--' + item.size }, []);
      var button = renderEl('button', {
        type: 'button',
        class: 'gallery__trigger',
        'aria-label': 'View larger image' + (item.alt ? ': ' + item.alt : ' ' + (index + 1))
      }, []);
      var img = document.createElement('img');
      img.src = item.image;
      img.alt = item.alt || '';
      img.loading = 'lazy';
      button.appendChild(img);
      figure.appendChild(button);
      return figure;
    });

    // Registry
    renderList('registry-grid', cfg.registry, function (item) {
      return renderEl('div', { class: 'registry__item' }, [
        renderEl('p', { class: 'registry__name' }, [document.createTextNode(item.name)]),
        renderEl('a', {
          class: 'btn btn--outline',
          href: item.url,
          target: '_blank',
          rel: 'noopener noreferrer'
        }, [document.createTextNode('View Registry')])
      ]);
    });

    // RSVP
    setImg('rsvp-image', cfg.rsvp.image, '');
    setText('rsvp-message', cfg.rsvp.message);
    setText('rsvp-deadline', cfg.rsvp.deadline);

    // FAQ
    setImg('faq-image', cfg.faqImage, '');
    renderFaq(cfg.faq);

    // Closing
    setText('closing-names', names);
    setText('closing-date', cfg.date.display.replace(/^[A-Za-z]+,\s*/, ''));
    setText('closing-message', cfg.closing.message);
    setImg('closing-image', cfg.closing.image, names);
    setText('footer-names', names);
  }

  function renderPersonCard(person) {
    var card = renderEl('div', { class: 'people__card' }, []);
    var img = document.createElement('img');
    img.className = 'people__photo';
    img.src = person.image;
    img.alt = person.name;
    img.loading = 'lazy';
    card.appendChild(img);
    card.appendChild(renderEl('p', { class: 'people__name' }, [document.createTextNode(person.name)]));
    card.appendChild(renderEl('p', { class: 'people__role' }, [document.createTextNode(person.role)]));
    return card;
  }

  function renderFaq(items) {
    var container = document.getElementById('faq-list');
    if (!container) return;
    container.innerHTML = '';

    items.forEach(function (item, index) {
      var qId = 'faq-q-' + index;
      var pId = 'faq-p-' + index;

      var button = renderEl('button', {
        class: 'faq__question',
        id: qId,
        type: 'button',
        'aria-expanded': 'false',
        'aria-controls': pId
      }, [
        renderEl('span', {}, [document.createTextNode(item.question)]),
        renderEl('span', { class: 'faq__icon', 'aria-hidden': 'true' }, [])
      ]);

      var panel = renderEl('div', {
        class: 'faq__panel',
        id: pId,
        role: 'region',
        'aria-labelledby': qId,
        'data-open': 'false'
      }, [
        renderEl('div', { class: 'faq__panel-inner' }, [
          renderEl('p', { class: 'faq__answer' }, [document.createTextNode(item.answer)])
        ])
      ]);

      var heading = renderEl('h3', {}, [button]);
      var wrapper = renderEl('div', { class: 'faq__item' }, [heading, panel]);
      container.appendChild(wrapper);
    });
  }

  function initFaq() {
    var container = document.getElementById('faq-list');
    if (!container) return;

    container.addEventListener('click', function (event) {
      var button = event.target.closest('.faq__question');
      if (!button) return;

      var panel = document.getElementById(button.getAttribute('aria-controls'));
      var willOpen = button.getAttribute('aria-expanded') !== 'true';

      // Close any other open item (single-open accordion).
      container.querySelectorAll('.faq__question[aria-expanded="true"]').forEach(function (openButton) {
        if (openButton !== button) {
          openButton.setAttribute('aria-expanded', 'false');
          document.getElementById(openButton.getAttribute('aria-controls')).setAttribute('data-open', 'false');
        }
      });

      button.setAttribute('aria-expanded', String(willOpen));
      if (panel) panel.setAttribute('data-open', String(willOpen));
    });
  }

  /* ---------------------------------------------------------------
     Mobile menu
     --------------------------------------------------------------- */
  function initMobileMenu() {
    var toggle = document.getElementById('menu-toggle');
    var menu = document.getElementById('mobile-menu');
    if (!toggle || !menu) return;

    var links = Array.prototype.slice.call(menu.querySelectorAll('a'));

    function openMenu() {
      menu.classList.add('is-open');
      menu.setAttribute('aria-hidden', 'false');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Close menu');
      document.body.style.overflow = 'hidden';
      // Deferred slightly: calling focus() synchronously (or even via
      // requestAnimationFrame) right after the visibility/opacity change
      // can silently fail to move focus, since the browser hasn't fully
      // settled the just-unhidden element's state yet. A short timeout
      // — after the paint has committed — focuses reliably.
      if (links[0]) {
        setTimeout(function () { links[0].focus(); }, 50);
      }
    }

    function closeMenu() {
      menu.classList.remove('is-open');
      menu.setAttribute('aria-hidden', 'true');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
      document.body.style.overflow = '';
    }

    toggle.addEventListener('click', function () {
      if (menu.classList.contains('is-open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    links.forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', function (event) {
      if (!menu.classList.contains('is-open')) return;

      if (event.key === 'Escape') {
        closeMenu();
        toggle.focus();
        return;
      }

      // Simple focus trap: while the full-screen menu is open, Tab should
      // cycle only through its own links rather than escaping to content
      // hidden behind it.
      if (event.key === 'Tab' && links.length) {
        var first = links[0];
        var last = links[links.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    });
  }

  /* ---------------------------------------------------------------
     Header: subtle background/shadow once the page has scrolled,
     and an active-section indicator on the nav links.
     --------------------------------------------------------------- */
  function initHeaderScroll() {
    var header = document.getElementById('site-header');
    if (!header) return;

    function update() {
      if (window.scrollY > 24) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    }

    update();
    window.addEventListener('scroll', update, { passive: true });
  }

  function initActiveNav() {
    var navLinks = Array.prototype.slice.call(document.querySelectorAll('.primary-nav__list a[href^="#"]'));
    if (!navLinks.length || !('IntersectionObserver' in window)) return;

    var sections = navLinks
      .map(function (link) {
        var id = link.getAttribute('href').slice(1);
        var section = document.getElementById(id);
        return section ? { link: link, section: section } : null;
      })
      .filter(Boolean);
    if (!sections.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var match = sections.find(function (s) { return s.section === entry.target; });
        if (!match) return;
        if (entry.isIntersecting) {
          navLinks.forEach(function (l) { l.classList.remove('is-active'); l.removeAttribute('aria-current'); });
          match.link.classList.add('is-active');
          match.link.setAttribute('aria-current', 'true');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    sections.forEach(function (s) { observer.observe(s.section); });
  }

  /* ---------------------------------------------------------------
     Countdown
     cfg.date.iso includes an explicit UTC offset (e.g. "...-07:00"),
     so `new Date(...)` resolves to one fixed instant in time — every
     visitor sees an accurate countdown to your actual ceremony
     moment, regardless of their own device's timezone.
     --------------------------------------------------------------- */
  function initCountdown() {
    if (!cfg) return;
    var target = new Date(cfg.date.iso).getTime();
    if (isNaN(target)) return;

    var daysEl = document.getElementById('cd-days');
    var hoursEl = document.getElementById('cd-hours');
    var minutesEl = document.getElementById('cd-minutes');
    var secondsEl = document.getElementById('cd-seconds');
    var displayEl = document.getElementById('countdown-display');
    var arrivedEl = document.getElementById('countdown-arrived');
    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

    var timerId = null;

    function pad(n) {
      return n < 10 ? '0' + n : String(n);
    }

    function tick() {
      var diff = target - Date.now();

      if (diff <= 0) {
        if (displayEl) displayEl.hidden = true;
        if (arrivedEl) arrivedEl.hidden = false;
        if (timerId) clearInterval(timerId);
        return;
      }

      var days = Math.floor(diff / 86400000);
      var hours = Math.floor((diff % 86400000) / 3600000);
      var minutes = Math.floor((diff % 3600000) / 60000);
      var seconds = Math.floor((diff % 60000) / 1000);

      daysEl.textContent = pad(days);
      hoursEl.textContent = pad(hours);
      minutesEl.textContent = pad(minutes);
      secondsEl.textContent = pad(seconds);
    }

    tick();
    timerId = setInterval(tick, 1000);
  }

  /* ---------------------------------------------------------------
     Scroll reveal (IntersectionObserver, respects reduced motion)
     --------------------------------------------------------------- */
  function initReveal() {
    var items = document.querySelectorAll('.reveal-up');
    var prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    // A small, permissive threshold/rootMargin: this is a decorative fade-in,
    // not a gate on content, so it should trigger as soon as any sliver of
    // the element is visible rather than requiring most of it in view. A
    // stricter threshold could leave a tall element (e.g. a 3-column block
    // near a section's bottom edge) stuck at opacity:0 if a visitor's
    // scroll position happens to land with it only partially on-screen.
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.01, rootMargin: '0px 0px 100px 0px' });

    items.forEach(function (el) { observer.observe(el); });

    // Safety net: content must never stay invisible. If anything is still
    // unrevealed shortly after load (an edge case the observer missed),
    // reveal it outright rather than risk it staying hidden forever.
    setTimeout(function () {
      document.querySelectorAll('.reveal-up:not(.is-visible)').forEach(function (el) {
        var rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add('is-visible');
        }
      });
    }, 2500);
  }

  /* ---------------------------------------------------------------
     RSVP form
     This is a static site with no backend, so it cannot actually
     receive or store form submissions — pretending otherwise would
     be dishonest to guests. The fields here let a guest prepare
     their response; submitting hands off to the real external RSVP
     service configured in wedding-config.js (rsvp.url), where the
     response is actually collected.
     --------------------------------------------------------------- */
  function initRsvpForm() {
    var form = document.getElementById('rsvp-form');
    var note = document.getElementById('rsvp-form-note');
    if (!form || !cfg) return;

    var nameInput = document.getElementById('rsvp-name');
    var nameError = document.getElementById('rsvp-name-error');
    var attendingFieldset = form.querySelector('.rsvp__field--attending');
    var attendingError = document.getElementById('rsvp-attending-error');
    var attendingInputs = Array.prototype.slice.call(form.querySelectorAll('input[name="attending"]'));

    function setFieldError(field, errorEl, show) {
      if (!field || !errorEl) return;
      errorEl.hidden = !show;
      if (show) {
        field.setAttribute('aria-invalid', 'true');
      } else {
        field.removeAttribute('aria-invalid');
      }
    }

    function setGroupError(group, inputs, errorEl, show) {
      if (!errorEl) return;
      errorEl.hidden = !show;
      inputs.forEach(function (input) {
        if (show) input.setAttribute('aria-invalid', 'true');
        else input.removeAttribute('aria-invalid');
      });
      if (group) {
        if (show) group.classList.add('rsvp__field--has-error');
        else group.classList.remove('rsvp__field--has-error');
      }
    }

    // Clear a field's error as soon as the guest starts fixing it —
    // waiting for the next submit to clear stale errors reads as broken.
    if (nameInput) {
      nameInput.addEventListener('input', function () {
        if (nameInput.value.trim()) setFieldError(nameInput, nameError, false);
      });
    }
    attendingInputs.forEach(function (input) {
      input.addEventListener('change', function () {
        setGroupError(attendingFieldset, attendingInputs, attendingError, false);
      });
    });

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      var firstInvalid = null;
      var nameValid = !nameInput || nameInput.value.trim() !== '';
      var attendingValid = !attendingInputs.length || attendingInputs.some(function (i) { return i.checked; });

      setFieldError(nameInput, nameError, !nameValid);
      if (!nameValid && !firstInvalid) firstInvalid = nameInput;

      setGroupError(attendingFieldset, attendingInputs, attendingError, !attendingValid);
      if (!attendingValid && !firstInvalid) firstInvalid = attendingInputs[0];

      if (firstInvalid) {
        firstInvalid.focus();
        return;
      }

      var opened = window.open(cfg.rsvp.url, '_blank', 'noopener,noreferrer');
      if (note) {
        note.textContent = opened
          ? 'Thank you! We opened our RSVP form in a new tab — please finish up there.'
          : 'Thank you! Please open our RSVP form to finish up: ' + cfg.rsvp.url;
      }
    });
  }

  /* ---------------------------------------------------------------
     Gallery lightbox
     --------------------------------------------------------------- */
  function initLightbox() {
    var grid = document.getElementById('gallery-grid');
    var lightbox = document.getElementById('lightbox');
    var backdrop = document.getElementById('lightbox-backdrop');
    var closeBtn = document.getElementById('lightbox-close');
    var lightboxImg = document.getElementById('lightbox-image');
    var menuToggle = document.getElementById('menu-toggle');
    if (!grid || !lightbox || !lightboxImg) return;

    var lastTrigger = null;

    function open(trigger) {
      var img = trigger.querySelector('img');
      if (!img) return;
      lastTrigger = trigger;
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add('is-open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      // The mobile hamburger toggle sits in the same fixed top-right
      // corner as the lightbox close button, on top of a now-hidden
      // page — hide it from view and from the tab order while the
      // lightbox owns that corner, so the two controls never visually
      // or interactively collide.
      if (menuToggle) {
        menuToggle.style.visibility = 'hidden';
        menuToggle.setAttribute('tabindex', '-1');
      }
      // Same class of bug as the mobile menu's initial focus: calling
      // .focus() synchronously right after toggling the class that
      // starts the lightbox's visibility/opacity transition can
      // silently fail to move focus in this environment. A short
      // deferral after the paint has committed focuses reliably.
      setTimeout(function () { closeBtn.focus(); }, 50);
    }

    function close() {
      lightbox.classList.remove('is-open');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      lightboxImg.src = '';
      if (menuToggle) {
        menuToggle.style.visibility = '';
        menuToggle.removeAttribute('tabindex');
      }
      if (lastTrigger) lastTrigger.focus();
    }

    grid.addEventListener('click', function (event) {
      var trigger = event.target.closest('.gallery__trigger');
      if (trigger) open(trigger);
    });

    if (closeBtn) closeBtn.addEventListener('click', close);
    if (backdrop) backdrop.addEventListener('click', close);

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && lightbox.classList.contains('is-open')) close();
    });
  }

  /* ---------------------------------------------------------------
     Small DOM helpers
     --------------------------------------------------------------- */
  function setText(id, value) {
    var el = document.getElementById(id);
    if (el && value != null) el.textContent = value;
  }

  function setHref(id, value) {
    var el = document.getElementById(id);
    if (el && value) el.setAttribute('href', value);
  }

  function setImg(id, src, alt) {
    var el = document.getElementById(id);
    if (!el) return;
    if (src) el.setAttribute('src', src);
    if (alt != null) el.setAttribute('alt', alt);
  }

  function setAddress(id, line1, line2) {
    var el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = '';
    el.appendChild(document.createTextNode(line1));
    el.appendChild(document.createElement('br'));
    el.appendChild(document.createTextNode(line2));
  }

  function setMeta(attr, key, value) {
    if (!value) return;
    var el = document.querySelector('meta[' + attr + '="' + key + '"]');
    if (el) el.setAttribute('content', value);
  }

  function renderList(containerId, items, itemRenderer) {
    var container = document.getElementById(containerId);
    if (!container || !items) return;
    container.innerHTML = '';
    items.forEach(function (item, index) {
      container.appendChild(itemRenderer(item, index));
    });
  }

  function renderEl(tag, attrs, children) {
    var el = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (key) {
      el.setAttribute(key, attrs[key]);
    });
    (children || []).forEach(function (child) {
      el.appendChild(child);
    });
    return el;
  }

})();
