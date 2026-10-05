/* THE BALM Health Initiative and Social Intervention — interaction layer v4
   Loaded in <head> (small file) so the page knows JS is on before it paints. */
(function () {
  'use strict';

  var root = document.documentElement;
  root.classList.add('js');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var ICON = {
    up: '<svg class="icon" viewBox="0 0 24 24" style="width:21px;height:21px" aria-hidden="true"><path d="M12 19V5"/><path d="m5 12 7-7 7 7"/></svg>',
    menu: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/></svg>',
    close: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12"/><path d="M18 6 6 18"/></svg>'
  };

  document.addEventListener('DOMContentLoaded', function () {

    /* ---------- Images that fail to load: hide so the art panel behind shows ---------- */
    document.querySelectorAll('.frame img, .hero-photo img').forEach(function (img) {
      var fail = function () { img.classList.add('img-missing'); };
      if (img.complete && img.naturalWidth === 0) fail();
      img.addEventListener('error', fail);
    });

    /* ---------- Back to top + mobile give bar + sticky header ---------- */
    var top = document.createElement('button');
    top.className = 'to-top';
    top.type = 'button';
    top.setAttribute('aria-label', 'Back to top');
    top.innerHTML = ICON.up;
    document.body.appendChild(top);
    top.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });

    var header = document.querySelector('.site-header');
    var giveBar = document.querySelector('.give-bar');
    var ticking = false;
    function onScroll() {
      var st = window.pageYOffset || root.scrollTop;
      if (header) header.classList.toggle('stuck', st > 10);
      top.classList.toggle('show', st > 700);
      if (giveBar) {
        var nearEnd = (window.innerHeight + st) > (document.body.scrollHeight - 500);
        giveBar.classList.toggle('show', st > 600 && !nearEnd);
      }
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { window.requestAnimationFrame(onScroll); ticking = true; }
    }, { passive: true });
    onScroll();

    /* ---------- Mobile nav ---------- */
    var toggle = document.querySelector('.nav-toggle');
    var nav = document.querySelector('.main-nav');
    if (toggle && nav) {
      var scrim = document.createElement('div');
      scrim.className = 'nav-scrim';
      document.body.appendChild(scrim);
      toggle.innerHTML = ICON.menu;

      var inertTargets = [document.querySelector('.brand'), document.querySelector('main'),
        document.querySelector('.page-hero'), document.querySelector('.site-footer'), top, giveBar].filter(Boolean);

      var setNav = function (open) {
        nav.classList.toggle('open', open);
        scrim.classList.toggle('show', open);
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
        toggle.innerHTML = open ? ICON.close : ICON.menu;
        document.body.style.overflow = open ? 'hidden' : '';
        inertTargets.forEach(function (el) {
          if (open) el.setAttribute('inert', ''); else el.removeAttribute('inert');
        });
        if (open) nav.querySelector('a').focus();
      };
      toggle.addEventListener('click', function () { setNav(!nav.classList.contains('open')); });
      scrim.addEventListener('click', function () { setNav(false); toggle.focus(); });
      nav.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { setNav(false); }); });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && nav.classList.contains('open')) { setNav(false); toggle.focus(); }
      });
      window.addEventListener('resize', function () {
        if (window.innerWidth > 920 && nav.classList.contains('open')) setNav(false);
      });
    }

    /* ---------- Footer year ---------- */
    document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

    /* ---------- Reveal on scroll ---------- */
    var revealEls = document.querySelectorAll('.rv, .rv-stagger');
    if ('IntersectionObserver' in window && !reduceMotion) {
      var ro = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add('in'); ro.unobserve(en.target); }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
      revealEls.forEach(function (el) { ro.observe(el); });
    } else {
      revealEls.forEach(function (el) { el.classList.add('in'); });
    }

    /* ---------- Accordion ---------- */
    document.querySelectorAll('.acc-btn').forEach(function (btn, i) {
      var panel = btn.nextElementSibling;
      if (!panel) return;
      var id = panel.id || ('acc-panel-' + i);
      panel.id = id;
      btn.setAttribute('aria-controls', id);
      btn.setAttribute('aria-expanded', 'false');
      btn.addEventListener('click', function () {
        var open = btn.getAttribute('aria-expanded') === 'true';
        var group = btn.closest('[data-acc-group]');
        if (group && !open) {
          group.querySelectorAll('.acc-btn').forEach(function (o) {
            if (o !== btn) {
              o.setAttribute('aria-expanded', 'false');
              if (o.nextElementSibling) o.nextElementSibling.style.maxHeight = null;
            }
          });
        }
        btn.setAttribute('aria-expanded', open ? 'false' : 'true');
        panel.style.maxHeight = open ? null : panel.scrollHeight + 'px';
      });
    });

    /* ---------- Journey stepper (OPTRTE) — works like tabs ---------- */
    document.querySelectorAll('[data-journey]').forEach(function (j) {
      var tabs = Array.prototype.slice.call(j.querySelectorAll('[role="tab"]'));
      var select = function (tab, focus) {
        tabs.forEach(function (t) {
          var on = t === tab;
          t.setAttribute('aria-selected', on ? 'true' : 'false');
          t.tabIndex = on ? 0 : -1;
          var p = document.getElementById(t.getAttribute('aria-controls'));
          if (p) { p.hidden = !on; p.classList.toggle('show', on); }
        });
        if (focus) tab.focus();
      };
      tabs.forEach(function (t, i) {
        t.addEventListener('click', function () { select(t, false); });
        t.addEventListener('keydown', function (e) {
          var k = e.key, n = null;
          if (k === 'ArrowRight' || k === 'ArrowDown') n = tabs[(i + 1) % tabs.length];
          if (k === 'ArrowLeft' || k === 'ArrowUp') n = tabs[(i - 1 + tabs.length) % tabs.length];
          if (k === 'Home') n = tabs[0];
          if (k === 'End') n = tabs[tabs.length - 1];
          if (n) { e.preventDefault(); select(n, true); }
        });
      });
    });

    /* ---------- Certificate lightbox ---------- */
    var certs = document.querySelectorAll('[data-lightbox]');
    if (certs.length) {
      var lb = document.createElement('div');
      lb.className = 'lightbox';
      lb.setAttribute('role', 'dialog');
      lb.setAttribute('aria-modal', 'true');
      lb.setAttribute('aria-label', 'Certificate, full size');
      lb.innerHTML = '<button class="lightbox-close" type="button" aria-label="Close">' + ICON.close + '</button><img alt="">';
      document.body.appendChild(lb);
      var lbImg = lb.querySelector('img');
      var lastFocused = null;
      var closeLb = function () {
        if (!lb.classList.contains('open')) return;
        lb.classList.remove('open');
        document.body.style.overflow = '';
        if (lastFocused) { lastFocused.focus(); lastFocused = null; }
      };
      var openLb = function (el) {
        var img = el.querySelector('img');
        if (!img) return;
        lastFocused = el;
        lbImg.src = img.src; lbImg.alt = img.alt;
        lb.classList.add('open');
        document.body.style.overflow = 'hidden';
        lb.querySelector('.lightbox-close').focus();
      };
      certs.forEach(function (el) {
        el.addEventListener('click', function () { openLb(el); });
        el.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLb(el); }
        });
      });
      lb.addEventListener('click', function (e) { if (e.target === lb || e.target.closest('.lightbox-close')) closeLb(); });
      document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeLb(); });
    }

    /* ---------- Copy to clipboard ---------- */
    var copyText = function (val, done) {
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(val).then(done).catch(function () {});
      } else {
        var ta = document.createElement('textarea');
        ta.value = val; ta.setAttribute('readonly', ''); ta.style.position = 'absolute'; ta.style.left = '-9999px';
        document.body.appendChild(ta); ta.select();
        try { document.execCommand('copy'); done(); } catch (e) {}
        document.body.removeChild(ta);
      }
    };
    document.querySelectorAll('[data-copy]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var val = btn.getAttribute('data-copy');
        if (val === '@ref') val = currentRef;
        var label = btn.querySelector('span');
        copyText(val, function () {
          btn.classList.add('done');
          if (label) { var o = label.textContent; label.textContent = 'Copied'; setTimeout(function () { label.textContent = o; btn.classList.remove('done'); }, 1800); }
        });
      });
    });

    /* ---------- Gift reference code ----------
       Each visitor gets a short code (e.g. BALM-7KQ2) to put in the transfer
       description. The same code is filled into the confirmation form, so the
       team can match a bank alert to a person in seconds. */
    var currentRef = '';
    var refEls = document.querySelectorAll('[data-ref-code]');
    if (refEls.length) {
      var chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // no 0/O/1/I to avoid mix-ups
      var buf = new Uint8Array(4);
      (window.crypto || window.msCrypto).getRandomValues(buf);
      currentRef = 'BALM-' + Array.prototype.map.call(buf, function (b) { return chars[b % chars.length]; }).join('');
      refEls.forEach(function (el) {
        if (el.tagName === 'INPUT') el.value = currentRef; else el.textContent = currentRef;
      });
    }

    /* ---------- Prefill amount from ?amount= and today's date ---------- */
    var amt = document.querySelector('[data-amount-field]');
    if (amt) {
      var q = new URLSearchParams(window.location.search).get('amount');
      if (q && /^\d{2,9}$/.test(q)) amt.value = q;
    }
    var reasonSel = document.querySelector('select[name="reason"]');
    if (reasonSel) {
      var r = new URLSearchParams(window.location.search).get('reason');
      if (r) Array.prototype.forEach.call(reasonSel.options, function (o) {
        if (o.value.toLowerCase().indexOf(r.toLowerCase()) === 0) reasonSel.value = o.value;
      });
    }
    document.querySelectorAll('input[data-today]').forEach(function (d) {
      var t = new Date();
      var iso = t.getFullYear() + '-' + String(t.getMonth() + 1).padStart(2, '0') + '-' + String(t.getDate()).padStart(2, '0');
      d.max = iso;
      if (!d.value) d.value = iso;
    });

    /* ---------- Forms (Netlify Forms) with inline checks ---------- */
    var EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    document.querySelectorAll('form[data-form]').forEach(function (form) {
      var statusEl = form.querySelector('[data-form-status]');
      var submitBtn = form.querySelector('button[type="submit"]');

      var showErr = function (input, msg) {
        input.classList.add('invalid');
        input.setAttribute('aria-invalid', 'true');
        var err = input.closest('.field') && input.closest('.field').querySelector('.err');
        if (err) { err.textContent = msg; err.classList.add('show'); }
      };
      var clearErr = function (input) {
        input.classList.remove('invalid');
        input.removeAttribute('aria-invalid');
        var err = input.closest('.field') && input.closest('.field').querySelector('.err');
        if (err) err.classList.remove('show');
      };
      form.querySelectorAll('input, textarea, select').forEach(function (i) {
        i.addEventListener('input', function () { clearErr(i); });
      });
      var setStatus = function (kind, text) {
        if (!statusEl) return;
        statusEl.textContent = text;
        statusEl.className = 'form-status show ' + kind;
      };

      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var ok = true;
        form.querySelectorAll('[required]').forEach(function (i) {
          if (i.type === 'checkbox' ? !i.checked : !String(i.value).trim()) {
            showErr(i, i.getAttribute('data-msg') || 'Please fill this in.'); ok = false;
          }
        });
        form.querySelectorAll('input[type="email"]').forEach(function (i) {
          if (i.value.trim() && !EMAIL.test(i.value.trim())) { showErr(i, 'That email address doesn’t look right.'); ok = false; }
        });
        if (!ok) { var first = form.querySelector('.invalid'); if (first) first.focus(); return; }

        var data = new FormData(form);
        var body = new URLSearchParams();
        data.forEach(function (v, k) { body.append(k, v); });

        if (submitBtn) submitBtn.disabled = true;
        setStatus('pending', 'Sending…');

        fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: body.toString() })
          .then(function (res) {
            if (!res.ok) throw new Error('Status ' + res.status);
            setStatus('success', form.getAttribute('data-success') || 'Sent — thank you.');
            var keep = form.querySelector('[data-ref-code]');
            var keepVal = keep ? keep.value : null;
            form.reset();
            if (keep) keep.value = keepVal;
          })
          .catch(function () {
            setStatus('error', 'That didn’t go through. Please try again, or email thebalmhealthinitiative@gmail.com.');
          })
          .finally(function () { if (submitBtn) submitBtn.disabled = false; });
      });
    });

  });
})();
