function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function handleSubmit(form, event) {
  const nameInput = form.querySelector('input[type="text"]');
  const emailInput = form.querySelector('input[type="email"]');
  const note = form.parentElement.querySelector('[data-form-note]') || document.getElementById('formNote');
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();

  if (!name) {
    event.preventDefault();
    form.classList.add('invalid');
    if (note) {
      note.textContent = 'Please enter your first name.';
      note.classList.remove('success');
      note.classList.add('error');
    }
    nameInput.focus();
    return;
  }

  if (!isValidEmail(email)) {
    event.preventDefault();
    form.classList.add('invalid');
    if (note) {
      note.textContent = 'Please enter a valid email address.';
      note.classList.remove('success');
      note.classList.add('error');
    }
    emailInput.focus();
    return;
  }

  // Valid: let the form submit to SmartEmailing, which redirects to /thank-you/
  form.classList.remove('invalid');
}

document.querySelectorAll('form.waitlist-form').forEach((form) => {
  // SmartEmailing records which page the signup came from
  const referrer = form.querySelector('[data-se-referrer]');
  if (referrer) referrer.value = document.URL;

  form.addEventListener('submit', (e) => {
    handleSubmit(form, e);
  });
});

/* Scroll reveal: fade + rise text in as it enters the viewport */
(function () {
  const revealSelectors = [
    '.hero-title', '.hero-lead', '.calling-label',
    '.essay-eyebrow', '.essay-questions li', '.essay-question',
    '.community-title', '.community-lead', '.community-list li',
    '.belonging-inner .np-line', '.belonging-lead',
    '.faq-title', '.faq-item',
    '.cta-word', '.cta-create', '.cta-sub', '.np-line--small'
  ];

  const items = document.querySelectorAll(revealSelectors.join(', '));
  items.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = (i % 6) * 70 + 'ms';
  });

  if (!('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('reveal-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
  );

  items.forEach((el) => observer.observe(el));
})();
