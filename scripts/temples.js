
const toggle = document.querySelector('.menu-toggle');
const nav = document.getElementById('primary-nav');

if (toggle && nav) {
  const setState = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    nav.dataset.state = open ? 'open' : 'closed';
  };

  
  setState(false);

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    setState(!isOpen);
  });

  
  nav.addEventListener('click', (e) => {
    if (e.target.closest('a')) setState(false);
  });
}

const yearEl = document.getElementById('currentyear');
if (yearEl) yearEl.textContent = new Date().getFullYear();

const modEl = document.getElementById('lastModified');
if (modEl) modEl.textContent = `Last Modified: ${document.lastModified}`;
