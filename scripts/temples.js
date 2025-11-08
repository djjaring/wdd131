// Hamburger toggle for mobile
const toggle = document.querySelector('.menu-toggle');
const nav = document.getElementById('primary-nav');

if (toggle && nav) {
  const setState = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    nav.dataset.state = open ? 'open' : 'closed';
  };

  // default collapsed on mobile
  setState(false);

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    setState(!isOpen);
  });

  // Close menu when a link is clicked (mobile UX nicety)
  nav.addEventListener('click', (e) => {
    if (e.target.closest('a')) setState(false);
  });
}

// Footer JS
const yearEl = document.getElementById('currentyear');
if (yearEl) yearEl.textContent = new Date().getFullYear();

const modEl = document.getElementById('lastModified');
if (modEl) modEl.textContent = `Last Modified: ${document.lastModified}`;
