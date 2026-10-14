const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.main-nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }));
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Name fields: letters and spaces only, including Chinese and other Unicode letters.
document.querySelectorAll('[data-letters-only]').forEach(input => {
  input.addEventListener('input', () => {
    input.value = input.value.replace(/[^\p{L}\s]/gu, '');
  });
});

// WhatsApp/phone fields: digits only.
document.querySelectorAll('[data-numbers-only]').forEach(input => {
  input.addEventListener('input', () => {
    input.value = input.value.replace(/\D/g, '');
  });
});

const JBL_WHATSAPP = '60192648802';

function clean(value) {
  return String(value || '').trim();
}

function openWhatsApp(message) {
  const url = `https://wa.me/${JBL_WHATSAPP}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener');
}

const trialForm = document.getElementById('free-trial-form');
if (trialForm) {
  trialForm.addEventListener('submit', event => {
    event.preventDefault();
    if (!trialForm.reportValidity()) return;

    const data = new FormData(trialForm);
    const message = [
      'Hi Joyful Bilingual Learning Academy,',
      '',
      'I would like to book a free trial.',
      '',
      `Parent / Guardian Name: ${clean(data.get('parent-name'))}`,
      `Child’s Name: ${clean(data.get('child-name'))}`,
      `Child’s Age: ${clean(data.get('child-age'))}`,
      `Parent WhatsApp Number: ${clean(data.get('whatsapp'))}`,
      `Programme / Learning Interest: ${clean(data.get('programme-interest'))}`,
      `Preferred Day / Time: ${clean(data.get('preferred-time')) || 'Not specified'}`,
      `Learning Interests: ${clean(data.get('learning-interests')) || 'Not specified'}`
    ].join('\n');

    openWhatsApp(message);
  });
}

const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', event => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;

    const data = new FormData(contactForm);
    const message = [
      'Hi Joyful Bilingual Learning Academy,',
      '',
      'I have an enquiry.',
      '',
      `Name: ${clean(data.get('name'))}`,
      `WhatsApp / Phone: ${clean(data.get('phone'))}`,
      `Child’s Age: ${clean(data.get('child-age')) || 'Not specified'}`,
      `Enquiry: ${clean(data.get('message'))}`
    ].join('\n');

    openWhatsApp(message);
  });
}
