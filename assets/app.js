const dropdowns = document.querySelectorAll('[data-dropdown]');
dropdowns.forEach(dd => {
  const btn = dd.querySelector('button');
  btn.addEventListener('click', () => {
    const open = dd.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
  });
});
document.addEventListener('click', (e) => {
  dropdowns.forEach(dd => {
    if (!dd.contains(e.target)) {
      dd.classList.remove('open');
      dd.querySelector('button')?.setAttribute('aria-expanded', 'false');
    }
  });
});

const drawer = document.getElementById('mobileDrawer');
const overlay = document.querySelector('.drawer-overlay');
const openBtn = document.querySelector('.burger');
const closeBtn = document.querySelector('.drawer-close');
let focusable = [];

function openDrawer() {
  drawer.classList.add('open');
  openBtn.setAttribute('aria-expanded', 'true');
  drawer.setAttribute('aria-hidden', 'false');
  document.body.classList.add('no-scroll');
  focusable = [...drawer.querySelectorAll('a,button')];
  focusable[0]?.focus();
}
function closeDrawer() {
  drawer.classList.remove('open');
  openBtn.setAttribute('aria-expanded', 'false');
  drawer.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('no-scroll');
}
openBtn?.addEventListener('click', openDrawer);
closeBtn?.addEventListener('click', closeDrawer);
overlay?.addEventListener('click', closeDrawer);
drawer?.addEventListener('click', (e) => {
  if (e.target === drawer) closeDrawer();
});

const modal = document.getElementById('privacyModal');
const openPrivacy = document.querySelector('[data-open-privacy]');
const closePrivacy = document.querySelectorAll('[data-close-privacy]');
openPrivacy?.addEventListener('click', () => {
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('no-scroll');
});
closePrivacy.forEach(btn => btn.addEventListener('click', () => {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('no-scroll');
}));

const faq = document.querySelector('[data-faq]');
faq?.querySelectorAll('details').forEach((item) => {
  item.addEventListener('toggle', () => {
    if (item.open) {
      faq.querySelectorAll('details').forEach((other) => {
        if (other !== item) other.open = false;
      });
    }
  });
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeDrawer();
    modal?.classList.remove('open');
    modal?.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('no-scroll');
  }
  if (e.key === 'Tab' && drawer?.classList.contains('open') && focusable.length) {
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.animate([{ opacity: 0, transform: 'translateY(24px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 550, fill: 'forwards' });
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('section article, .visual-card, .lead-form').forEach(el => {
  el.style.opacity = 0;
  observer.observe(el);
});
