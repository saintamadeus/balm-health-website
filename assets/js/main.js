/* THE BALM Health Initiative and Social Intervention — interaction layer v3 */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.addEventListener('DOMContentLoaded', function () {

    /* ---------- Scroll progress bar ---------- */
    var bar = document.createElement('div');
    bar.className = 'scroll-progress';
    document.body.appendChild(bar);

    /* ---------- Back to top ---------- */
    var top = document.createElement('button');
    top.className = 'to-top';
    top.setAttribute('aria-label', 'Back to top');
    top.innerHTML = '<svg class="icon" viewBox="0 0 24 24" style="width:21px;height:21px"><path d="M12 19V5"/><path d="m5 12 7-7 7 7"/></svg>';
    document.body.appendChild(top);
    top.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });

    var header = document.querySelector('.site-header');

    function onScroll() {
      var st = window.pageYOffset || document.documentElement.scrollTop;
      var h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (h > 0 ? (st / h) * 100 : 0) + '%';
      if (header) header.classList.toggle('stuck', st > 12);
      top.classList.toggle('show', st > 560);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* ---------- Mobile nav ---------- */
    var toggle = document.querySelector('.nav-toggle');
    var nav = document.querySelector('.main-nav');
    if (toggle && nav) {
      var scrim = document.createElement('div');
      scrim.className = 'nav-scrim';
      document.body.appendChild(scrim);

      var ICON_OPEN = '<svg class="icon" viewBox="0 0 24 24"><path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/></svg>';
      var ICON_CLOSE = '<svg class="icon" viewBox="0 0 24 24"><path d="M6 6l12 12"/><path d="M18 6 6 18"/></svg>';
      toggle.innerHTML = ICON_OPEN;

      function setNav(open) {
        nav.classList.toggle('open', open);
        scrim.classList.toggle('show', open);
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        toggle.innerHTML = open ? ICON_CLOSE : ICON_OPEN;
        document.body.style.overflow = open ? 'hidden' : '';
      }
      toggle.addEventListener('click', function () { setNav(!nav.classList.contains('open')); });
      scrim.addEventListener('click', function () { setNav(false); });
      nav.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () { setNav(false); });
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && nav.classList.contains('open')) setNav(false);
      });
    }

    /* ---------- Footer year ---------- */
    document.querySelectorAll('[data-year]').forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });

    /* ---------- Reveal on scroll ---------- */
    var revealEls = document.querySelectorAll('.rv, .rv-stagger');
    if ('IntersectionObserver' in window && !reduceMotion) {
      var ro = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add('in'); ro.unobserve(en.target); }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
      revealEls.forEach(function (el) { ro.observe(el); });
    } else {
      revealEls.forEach(function (el) { el.classList.add('in'); });
    }

    /* ---------- Animated counters ---------- */
    var counters = document.querySelectorAll('[data-count]');
    if (counters.length) {
      var animate = function (el) {
        var target = parseFloat(el.getAttribute('data-count'));
        var suffix = el.getAttribute('data-suffix') || '';
        var dur = 1500, t0 = null;
        if (reduceMotion) { el.textContent = target + suffix; return; }
        function step(ts) {
          if (!t0) t0 = ts;
          var p = Math.min((ts - t0) / dur, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.floor(eased * target) + suffix;
          if (p < 1) requestAnimationFrame(step);
          else el.textContent = target + suffix;
        }
        requestAnimationFrame(step);
      };
      if ('IntersectionObserver' in window) {
        var co = new IntersectionObserver(function (entries) {
          entries.forEach(function (en) {
            if (en.isIntersecting) { animate(en.target); co.unobserve(en.target); }
          });
        }, { threshold: 0.5 });
        counters.forEach(function (el) { co.observe(el); });
      } else {
        counters.forEach(animate);
      }
    }

    /* ---------- Accordion ---------- */
    document.querySelectorAll('.acc-btn').forEach(function (btn) {
      var panel = btn.nextElementSibling;
      if (!panel) return;
      btn.setAttribute('aria-expanded', 'false');
      btn.addEventListener('click', function () {
        var open = btn.getAttribute('aria-expanded') === 'true';
        // close siblings in same group
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

    /* ---------- Certificate lightbox ---------- */
    var certs = document.querySelectorAll('[data-lightbox]');
    if (certs.length) {
      var lb = document.createElement('div');
      lb.className = 'lightbox';
      lb.innerHTML = '<button class="lightbox-close" aria-label="Close image"><svg class="icon" viewBox="0 0 24 24" style="width:22px;height:22px"><path d="M6 6l12 12"/><path d="M18 6 6 18"/></svg></button><img alt="">';
      document.body.appendChild(lb);
      var lbImg = lb.querySelector('img');
      var close = function () {
        lb.classList.remove('open');
        document.body.style.overflow = '';
        if (lastFocused) { lastFocused.focus(); lastFocused = null; }
      };
      var lastFocused = null;
      var openLb = function (el) {
        var img = el.querySelector('img');
        if (!img) return;
        lastFocused = el;
        lbImg.src = img.src;
        lbImg.alt = img.alt;
        lb.classList.add('open');
        document.body.style.overflow = 'hidden';
        lb.querySelector('.lightbox-close').focus();
      };
      certs.forEach(function (el) {
        el.addEventListener('click', function () { openLb(el); });
        el.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
            e.preventDefault();
            openLb(el);
          }
        });
      });
      lb.addEventListener('click', function (e) { if (e.target === lb || e.target.closest('.lightbox-close')) close(); });
      document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
    }

    /* ---------- Copy to clipboard ---------- */
    document.querySelectorAll('[data-copy]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var val = btn.getAttribute('data-copy');
        var done = function () {
          var orig = btn.textContent;
          btn.textContent = 'Copied';
          setTimeout(function () { btn.textContent = orig; }, 1600);
        };
        if (navigator.clipboard) {
          navigator.clipboard.writeText(val).then(done).catch(function () {});
        } else {
          var ta = document.createElement('textarea');
          ta.value = val; document.body.appendChild(ta); ta.select();
          try { document.execCommand('copy'); done(); } catch (e) {}
          document.body.removeChild(ta);
        }
      });
    });

    /* ---------- Donation widget ---------- */
    var panel = document.querySelector('[data-donate-panel]');
    if (panel) {
      var freqBtns = panel.querySelectorAll('[data-freq]');
      var amtBtns = panel.querySelectorAll('[data-amount]');
      var custom = panel.querySelector('[data-custom-amount]');
      var note = panel.querySelector('[data-amount-note]');
      var sumFreq = panel.querySelector('[data-summary-freq]');
      var pay = panel.querySelector('[data-pay-button]');

      var outcomes = {
        '2500': 'Covers a community health-education session for one family.',
        '5000': 'Provides medical assistance and referral support for one vulnerable patient.',
        '10000': 'Funds a community health screening station for a full day.',
        '25000': 'Supports a psychosocial counselling series for one beneficiary.',
        '50000': 'Helps run a complete community outreach and awareness campaign.'
      };

      freqBtns.forEach(function (b) {
        b.addEventListener('click', function () {
          freqBtns.forEach(function (x) { x.setAttribute('aria-pressed', 'false'); });
          b.setAttribute('aria-pressed', 'true');
          if (sumFreq) sumFreq.textContent = b.getAttribute('data-freq') === 'monthly' ? 'monthly' : 'one-time';
        });
      });

      amtBtns.forEach(function (b) {
        b.addEventListener('click', function () {
          amtBtns.forEach(function (x) { x.setAttribute('aria-pressed', 'false'); });
          b.setAttribute('aria-pressed', 'true');
          if (custom) custom.value = '';
          if (note) note.textContent = outcomes[b.getAttribute('data-amount')] || '';
        });
      });

      if (custom) {
        custom.addEventListener('input', function () {
          amtBtns.forEach(function (x) { x.setAttribute('aria-pressed', 'false'); });
          if (note) note.textContent = 'Custom amount — every contribution funds direct programs.';
        });
      }

      if (pay) {
        pay.addEventListener('click', function (e) {
          e.preventDefault();
          alert('This donation form is a working preview. Live card, transfer and mobile-money processing via Paystack will be activated once the organisation’s payment gateway keys are configured.\n\nTo give right now, please use the bank transfer details shown below, or contact us directly.');
        });
      }
    }

    /* ---------- Contact form with inline validation ---------- */
    var form = document.querySelector('[data-contact-form]');
    if (form) {
      var showErr = function (input, msg) {
        input.classList.add('invalid');
        var err = input.parentElement.querySelector('.err');
        if (err) { err.textContent = msg; err.classList.add('show'); }
      };
      var clearErr = function (input) {
        input.classList.remove('invalid');
        var err = input.parentElement.querySelector('.err');
        if (err) err.classList.remove('show');
      };
      form.querySelectorAll('input, textarea').forEach(function (i) {
        i.addEventListener('input', function () { clearErr(i); });
      });

      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var name = form.querySelector('[name="name"]');
        var email = form.querySelector('[name="email"]');
        var msg = form.querySelector('[name="message"]');
        var reason = form.querySelector('[name="reason"]');
        var ok = true;

        if (!name.value.trim()) { showErr(name, 'Please enter your name.'); ok = false; }
        if (!email.value.trim()) { showErr(email, 'Please enter your email address.'); ok = false; }
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) { showErr(email, 'That email address doesn’t look right.'); ok = false; }
        if (!msg.value.trim()) { showErr(msg, 'Please write a message.'); ok = false; }

        if (!ok) {
          var first = form.querySelector('.invalid');
          if (first) first.focus();
          return;
        }

        var subject = encodeURIComponent('[' + (reason ? reason.value : 'Enquiry') + '] Website message from ' + name.value.trim());
        var body = encodeURIComponent(msg.value.trim() + '\n\n— ' + name.value.trim() + ' (' + email.value.trim() + ')');
        window.location.href = 'mailto:thebalmhealthinitiative@gmail.com?subject=' + subject + '&body=' + body;
      });
    }

  });
})();
