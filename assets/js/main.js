// THE BALM Health Initiative and Social Intervention — shared site behaviour

document.addEventListener('DOMContentLoaded', function () {
  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      toggle.textContent = isOpen ? '✕ Close' : '☰ Menu';
    });
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        if (window.matchMedia('(max-width: 640px)').matches) {
          nav.classList.remove('open');
          toggle.setAttribute('aria-expanded', 'false');
          toggle.textContent = '☰ Menu';
        }
      });
    });
  }

  // Footer year
  var yearEls = document.querySelectorAll('[data-year]');
  yearEls.forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // Scroll-reveal animation
  var revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
  if ('IntersectionObserver' in window && revealEls.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in-view'); });
  }

  // Donation form widget (Get Involved page)
  var donatePanel = document.querySelector('[data-donate-panel]');
  if (donatePanel) {
    var freqButtons = donatePanel.querySelectorAll('[data-freq]');
    var amountButtons = donatePanel.querySelectorAll('[data-amount]');
    var customInput = donatePanel.querySelector('[data-custom-amount]');
    var amountNote = donatePanel.querySelector('[data-amount-note]');
    var summaryFreq = donatePanel.querySelector('[data-summary-freq]');
    var payButton = donatePanel.querySelector('[data-pay-button]');

    var amountOutcomes = {
      '2500': 'Covers a health-education session for one family.',
      '5000': 'Provides basic medical assistance and referral support for one vulnerable patient.',
      '10000': 'Funds a community health screening station for a day.',
      '25000': 'Supports a psychosocial counselling session series for one beneficiary.',
      '50000': 'Helps run a full community outreach and awareness campaign.'
    };

    freqButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        freqButtons.forEach(function (b) { b.setAttribute('aria-pressed', 'false'); });
        btn.setAttribute('aria-pressed', 'true');
        if (summaryFreq) {
          summaryFreq.textContent = btn.getAttribute('data-freq') === 'monthly' ? 'per month' : 'one-time';
        }
      });
    });

    amountButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        amountButtons.forEach(function (b) { b.setAttribute('aria-pressed', 'false'); });
        btn.setAttribute('aria-pressed', 'true');
        if (customInput) customInput.value = '';
        var amt = btn.getAttribute('data-amount');
        if (amountNote) amountNote.textContent = amountOutcomes[amt] || '';
      });
    });

    if (customInput) {
      customInput.addEventListener('input', function () {
        amountButtons.forEach(function (b) { b.setAttribute('aria-pressed', 'false'); });
        if (amountNote) amountNote.textContent = 'Custom amount — every contribution funds direct programs.';
      });
    }

    if (payButton) {
      payButton.addEventListener('click', function (e) {
        e.preventDefault();
        alert('This is a demo donation form. Live payment processing (Paystack) will be connected here once the organisation\'s payment gateway keys are set up. For now, please use the bank transfer details below or contact us directly to give.');
      });
    }
  }

  // Simple contact / volunteer form handler (no backend yet — mailto fallback)
  var contactForm = document.querySelector('[data-contact-form]');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = contactForm.querySelector('[name="name"]').value.trim();
      var email = contactForm.querySelector('[name="email"]').value.trim();
      var message = contactForm.querySelector('[name="message"]').value.trim();
      var subject = encodeURIComponent('Website enquiry from ' + name);
      var body = encodeURIComponent(message + '\n\nFrom: ' + name + ' (' + email + ')');
      window.location.href = 'mailto:thebalmhealthinitiative@gmail.com?subject=' + subject + '&body=' + body;
    });
  }
});
