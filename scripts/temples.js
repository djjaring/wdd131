document.addEventListener('DOMContentLoaded', function() {
    const yearSpan = document.getElementById('year');
    const lastModifiedSpan = document.getElementById('last-modified');
    const menuToggle = document.getElementById('menu-toggle');
    const menu = document.getElementById('menu');

    // Set current year
    const currentYear = new Date().getFullYear();
    yearSpan.textContent = currentYear;

    // Set last modified date
    const lastModified = document.lastModified;
    lastModifiedSpan.textContent = lastModified;

    // Hamburger menu toggle
    menuToggle.addEventListener('click', function() {
        if (menu.style.display === 'block') {
            menu.style.display = 'none';
            menuToggle.innerHTML = '&#9776;';
        } else {
            menu.style.display = 'block';
            menuToggle.innerHTML = '&times;';
        }
    });
});
