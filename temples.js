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

// Footer JS you likely already plan to add
document.getElementById('currentyear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = `Last Modified: ${document.lastModified}`;
