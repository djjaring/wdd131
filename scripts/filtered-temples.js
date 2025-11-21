// ============ Temple data ============
// Base temples (provided in assignment) + your custom ones.
const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },

  // ========= Your 3 custom temples =========
  {
    templeName: "San Diego California",
    location: "San Diego, California, United States",
    dedicated: "1993, April, 30",
    area: 72000,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/san-diego-california-temple/san-diego-california-temple-59829.jpg"
  },
  {
    templeName: "Tokyo Japan",
    location: "Tokyo, Japan",
    dedicated: "1980, October, 18",
    area: 52590,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/tokyo-japan-temple/tokyo-japan-temple-25746.jpg"
  },
  {
    templeName: "Cebu City Philippines",
    location: "Cebu City, Philippines",
    dedicated: "2010, June, 13",
    area: 29866,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/cebu-city-philippines-temple/cebu-city-philippines-temple-4000.jpg"
  }
];

// Helper: get the dedicated year as a number
const getDedicatedYear = (temple) =>
  parseInt(temple.dedicated.split(",")[0].trim(), 10);

// ============ DOM references ============
const gallery = document.querySelector("#temple-gallery");
const nav = document.getElementById("primary-nav");
const navLinks = document.querySelectorAll(".nav a");

// ============ Render function ============
function renderTemples(templeList) {
  if (!gallery) return;

  // Clear previous cards
  gallery.innerHTML = "";

  templeList.forEach((temple) => {
    const figure = document.createElement("figure");

    const img = document.createElement("img");
    img.src = temple.imageUrl;
    img.alt = `${temple.templeName} Temple`;
    img.loading = "lazy"; // native lazy loading
    img.width = 400;
    img.height = 250;

    const figcaption = document.createElement("figcaption");

    const name = document.createElement("h2");
    name.textContent = temple.templeName;

    const location = document.createElement("p");
    location.innerHTML = `<strong>Location:</strong> ${temple.location}`;

    const dedicated = document.createElement("p");
    dedicated.innerHTML = `<strong>Dedicated:</strong> ${temple.dedicated}`;

    const area = document.createElement("p");
    area.innerHTML = `<strong>Area:</strong> ${temple.area.toLocaleString()} sq ft`;

    figcaption.appendChild(name);
    figcaption.appendChild(location);
    figcaption.appendChild(dedicated);
    figcaption.appendChild(area);

    figure.appendChild(img);
    figure.appendChild(figcaption);

    gallery.appendChild(figure);
  });
}

// ============ Filtering logic ============
function filterTemples(filter) {
  let filtered = temples;

  switch (filter) {
    case "old":
      // Old – temples built before 1900
      filtered = temples.filter((t) => getDedicatedYear(t) < 1900);
      break;
    case "new":
      // New – temples built after 2000
      filtered = temples.filter((t) => getDedicatedYear(t) > 2000);
      break;
    case "large":
      // Large – temples larger than 90,000 sq ft
      filtered = temples.filter((t) => t.area > 90000);
      break;
    case "small":
      // Small – temples smaller than 10,000 sq ft
      filtered = temples.filter((t) => t.area < 10000);
      break;
    case "home":
    default:
      // Home – show all
      filtered = temples;
      break;
  }

  renderTemples(filtered);
}

// ============ Nav interactions (filters) ============
navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    const filter = link.dataset.filter || "home";
    filterTemples(filter);

    // Update aria-current for accessibility
    navLinks.forEach((l) => l.removeAttribute("aria-current"));
    link.setAttribute("aria-current", "page");
  });
});

// ============ Hamburger behavior ============
const toggle = document.querySelector(".menu-toggle");

if (toggle && nav) {
  const setState = (open) => {
    toggle.setAttribute("aria-expanded", String(open));
    nav.dataset.state = open ? "open" : "closed";
  };

  // default closed
  setState(false);

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    setState(!isOpen);
  });

  // Close menu when a link is clicked (on mobile)
  nav.addEventListener("click", (e) => {
    if (e.target.closest("a")) setState(false);
  });
}

// ============ Footer dynamic year & last modified ============
const yearEl = document.getElementById("currentyear");
if (yearEl) yearEl.textContent = new Date().getFullYear();

const modEl = document.getElementById("lastModified");
if (modEl) modEl.textContent = `Last Modified: ${document.lastModified}`;

// ============ Initial render ============
renderTemples(temples); // Home view on load
