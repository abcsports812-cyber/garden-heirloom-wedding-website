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
    renderList('day-timeline', cfg.daySchedule, function (item) {
      return renderEl('li', {}, [
        renderEl('span', { class: 'day-timeline__time' }, [document.createTextNode(item.time)]),
        renderEl('span', { class: 'day-timeline__title' }, [document.createTextNode(item.title)])
      ]);
    });

    // Venue
    setText('venue-heading', cfg.venue.name);
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
    renderList('gallery-grid', cfg.gallery, function (item) {
      var figure = renderEl('figure', { class: 'gallery__item gallery__item--' + item.size }, []);
      var img = document.createElement('img');
      img.src = item.image;
      img.alt = item.alt || '';
      img.loading = 'lazy';
      figure.appendChild(img);
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
    setHref('rsvp-link', cfg.rsvp.url);

    // FAQ
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

    var links = menu.querySelectorAll('a');

    function openMenu() {
      menu.classList.add('is-open');
      menu.setAttribute('aria-hidden', 'false');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Close menu');
      document.body.style.overflow = 'hidden';
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
      if (event.key === 'Escape' && menu.classList.contains('is-open')) {
        closeMenu();
        toggle.focus();
      }
    });
  }

  /* ---------------------------------------------------------------
     Countdown
     Note: the wedding date/time in wedding-config.js is treated as
     wall-clock time and compared against each visitor's own device
     clock — the same approach used by most wedding countdown sites.
     Out-of-town guests will see a countdown to that clock time in
     their own timezone unless you convert the date yourself.
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
    items.forEach(function (item) {
      container.appendChild(itemRenderer(item));
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
