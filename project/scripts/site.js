// scripts/site.js

// Data: schedule and gallery use objects, arrays, and array methods.

const events = [
  {
    id: 1,
    day: "Tuesday",
    time: "7:00 – 10:00 PM",
    type: "Intermediate Ladder",
    focus: "Match play & strategy",
  },
  {
    id: 2,
    day: "Thursday",
    time: "7:00 – 10:00 PM",
    type: "Open Play",
    focus: "Mixers for all levels",
  },
  {
    id: 3,
    day: "Friday",
    time: "7:00 – 10:30 PM",
    type: "Beginner Night",
    focus: "Coaching & fun drills",
  },
  {
    id: 4,
    day: "Saturday",
    time: "7:00 – 11:00 AM",
    type: "Family Morning",
    focus: "Kids, families, and social games",
  },
];

const photos = [
  {
    id: 1,
    src: "images/pb1.webp",
    alt: "Player serving during a night pickleball game",
    caption:
      "Big serves, big smiles. Pickleball combines the strategy of tennis, the quick reactions of ping-pong, and the friendly pace of badminton. Night sessions like this help players practice deep serves, safe positioning, and ready stances before the rally starts.",
    tag: "action",
  },
  {
    id: 2,
    src: "images/pb2.webp",
    alt: "Large Pickleballeros Club group photo at the courts",
    caption:
      "Our Pickleballeros family keeps growing as more friends discover how fun the game is. Group nights are perfect for rotating partners, meeting new people, and learning from different play styles—from soft dinking to aggressive drives at the kitchen line.",
    tag: "group",
  },
  {
    id: 3,
    src: "images/pb3.webp",
    alt: "Woman in a pink outfit reaching low for a pickleball",
    caption:
      "Hustle and heart in every point. Good pickleball footwork means staying light on your toes, shuffling instead of crossing your feet, and getting low for those tricky dinks. Every low ball like this is a chance to work on balance, control, and patience at the net.",
    tag: "action",
  },
  {
    id: 4,
    src: "images/pb4.webp",
    alt: "Player waiting at the baseline ready to receive a serve",
    caption:
      "Focused and ready for the return. Receiving a serve in pickleball is all about preparation: watch the server's paddle, split-step as the ball leaves the strings, and aim your return deep so you have time to move to the kitchen and take control of the rally.",
    tag: "action",
  },
  {
    id: 5,
    src: "images/pb5.webp",
    alt: "Two men playing doubles at the net during a rally",
    caption:
      "Fast hands at the kitchen line turn defense into offense. Doubles teams win more points when they move together, keep their paddles up, and use soft blocks to reset the ball. These quick exchanges at the non-volley zone are what make pickleball so exciting.",
    tag: "action",
  },
  {
    id: 6,
    src: "images/pb6.webp",
    alt: "Man in a blue shirt hitting a forehand shot",
    caption:
      "Consistency comes from repetition. Working on a smooth forehand swing, proper contact point, and follow-through helps players keep the ball in play longer. Long rallies give everyone more chances to practice strategy, communication, and court positioning.",
    tag: "action",
  },
  {
    id: 7,
    src: "images/pb7.webp",
    alt: "Smiling group selfie with pickleball players at the courts",
    caption:
      "Friends on and off the court. Between games we share tips, laugh about crazy points, and cheer for new players trying their first dinks and serves. For many members, pickleball is not just exercise—it is a weekly break that reduces stress and builds community.",
    tag: "family",
  },
];

// === Theme toggle with localStorage, DOM interaction, and event listening ===

function applyStoredTheme() {
  const savedTheme = localStorage.getItem("pb-theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
  }
}

function setupThemeToggle() {
  const button = document.querySelector("#themeToggle");
  if (!button) return;

  const updateLabel = () => {
    const isDark = document.body.classList.contains("dark");
    button.textContent = isDark ? "☀️" : "🌙";
    button.setAttribute(
      "aria-label",
      isDark ? "Switch to light mode" : "Switch to dark mode"
    );
  };

  updateLabel();

  button.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    localStorage.setItem("pb-theme", isDark ? "dark" : "light");
    updateLabel();
  });
}

// === Mobile navigation ===

function setupMobileNav() {
  const button = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#mainNav");
  if (!button || !nav) return;

  button.addEventListener("click", () => {
    const isOpen = document.body.classList.toggle("nav-open");
    button.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  nav.addEventListener("click", (event) => {
    if (event.target.matches(".nav-link")) {
      document.body.classList.remove("nav-open");
      button.setAttribute("aria-expanded", "false");
    }
  });
}

// === Home: render weekly schedule using DOM + template literals ===

function renderEvents() {
  const container = document.querySelector("#eventList");
  if (!container) return;

  container.innerHTML = events
    .map(
      (event) => `
      <li class="event-item">
        <h3>${event.day}</h3>
        <p class="event-meta">${event.time}</p>
        <p><strong>${event.type}</strong> – ${event.focus}</p>
      </li>
    `
    )
    .join("");
}

// === Gallery: filter and render photos using array methods ===

function renderGallery(filterTag = "all") {
  const grid = document.querySelector("#galleryGrid");
  if (!grid) return;

  const filteredPhotos =
    filterTag === "all"
      ? photos
      : photos.filter((photo) => photo.tag === filterTag);

  if (filteredPhotos.length === 0) {
    grid.innerHTML = `<p>No photos found for that filter yet.</p>`;
    return;
  }

  grid.innerHTML = filteredPhotos
    .map(
      (photo) => `
      <figure class="gallery-card" data-photo-id="${photo.id}">
        <img
          src="${photo.src}"
          alt="${photo.alt}"
          width="1024"
          height="768"
          loading="lazy"
          class="hover-zoom"
        />
        <figcaption>${photo.caption}</figcaption>
      </figure>
    `
    )
    .join("");
}

function setupGalleryFilters() {
  const buttons = document.querySelectorAll(".filter-btn");
  if (!buttons.length) return;

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      const tag = button.dataset.filter ?? "all";
      renderGallery(tag);
    });
  });
}

// === Slider: show photos one by one and sync with gallery ===

let currentSlide = 0;
let sliderIntervalId = null;

function renderSlider(index = 0) {
  const frameImg = document.querySelector("#sliderImage");
  const frameCaption = document.querySelector("#sliderCaption");
  if (!frameImg || !frameCaption) return;

  const total = photos.length;
  if (index < 0) index = total - 1;
  if (index >= total) index = 0;
  currentSlide = index;

  const photo = photos[currentSlide];
  frameImg.src = photo.src;
  frameImg.alt = photo.alt;
  frameCaption.textContent = photo.caption;
}

function startSliderAuto() {
  stopSliderAuto();
  sliderIntervalId = setInterval(() => {
    renderSlider(currentSlide + 1);
  }, 7000);
}

function stopSliderAuto() {
  if (sliderIntervalId !== null) {
    clearInterval(sliderIntervalId);
    sliderIntervalId = null;
  }
}

function setupSlider() {
  const prevBtn = document.querySelector(".slider-btn.prev");
  const nextBtn = document.querySelector(".slider-btn.next");
  const frame = document.querySelector(".slider-frame");
  if (!prevBtn || !nextBtn || !frame) return;

  prevBtn.addEventListener("click", () => {
    renderSlider(currentSlide - 1);
    startSliderAuto();
  });

  nextBtn.addEventListener("click", () => {
    renderSlider(currentSlide + 1);
    startSliderAuto();
  });

  const grid = document.querySelector("#galleryGrid");
  if (grid) {
    grid.addEventListener("click", (event) => {
      const card = event.target.closest("[data-photo-id]");
      if (!card) return;

      const id = Number(card.dataset.photoId);
      const index = photos.findIndex((photo) => photo.id === id);
      if (index >= 0) {
        renderSlider(index);
        startSliderAuto();
        const slider = document.querySelector(".slider");
        if (slider) {
          window.scrollTo({
            top: slider.offsetTop - 80,
            behavior: "smooth",
          });
        }
      }
    });
  }

  // Pause auto-play on hover, resume on leave
  frame.addEventListener("mouseenter", () => stopSliderAuto());
  frame.addEventListener("mouseleave", () => startSliderAuto());

  renderSlider(0);
  startSliderAuto();
}

// === Join form: DOM interaction, conditional logic, localStorage ===

function setupJoinForm() {
  const form = document.querySelector("#joinForm");
  const output = document.querySelector("#joinMessage");
  if (!form || !output) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const name = (formData.get("name") || "").toString().trim();
    const email = (formData.get("email") || "").toString().trim();
    const level = formData.get("level") || "";
    const nights = formData.getAll("nights").map((n) => n.toString());
    const goals = (formData.get("goals") || "").toString().trim();
    const newsletter = formData.get("newsletter") || "yes";

    if (!name || !email || !level) {
      output.hidden = false;
      output.innerHTML = `
        <h2>Please complete the required fields.</h2>
        <p>Full name, email address, and skill level are required to join the club.</p>
      `;
      return;
    }

    let joinCount = Number(localStorage.getItem("pb-join-count")) || 0;
    joinCount += 1;
    localStorage.setItem("pb-join-count", `${joinCount}`);

    let levelAdvice = "";
    if (level === "beginner") {
      levelAdvice = "Start with Beginner Night on Friday so we can teach you the basics.";
    } else if (level === "intermediate") {
      levelAdvice = "You will enjoy the Intermediate Ladder on Tuesday nights.";
    } else {
      levelAdvice = "Challenge courts and mini-tournaments will keep you sharp.";
    }

    const nightsText = nights.length ? nights.join(", ") : "Any night";
    const newsletterText =
      newsletter === "yes"
        ? "You will receive email updates about schedule changes and events."
        : "You chose not to receive email updates, so please watch the group chat for announcements.";

    const goalsText = goals
      ? `Your goals: <em>${goals}</em>.`
      : "You did not list specific goals yet, but we will help you have fun and improve.";

    output.hidden = false;
    output.innerHTML = `
      <h2>Welcome to Pickleballeros, ${name}!</h2>
      <p>We have recorded your membership as a <strong>${level}</strong> player.</p>
      <p>Preferred nights to play: <strong>${nightsText}</strong>.</p>
      <p>${levelAdvice}</p>
      <p>${newsletterText}</p>
      <p>${goalsText}</p>
      <p>You have submitted this form <strong>${joinCount}</strong> time${
        joinCount === 1 ? "" : "s"
      } on this device.</p>
    `;

    form.reset();
  });
}

// === Footer year ===

function setCurrentYear() {
  const yearSpan = document.querySelector("#year");
  if (yearSpan) {
    yearSpan.textContent = `${new Date().getFullYear()}`;
  }
}

// === Initialize per page ===

document.addEventListener("DOMContentLoaded", () => {
  applyStoredTheme();
  setupThemeToggle();
  setupMobileNav();
  setCurrentYear();

  const page = document.body.dataset.page ?? "";

  if (page === "home") {
    renderEvents();
  }

  if (page === "gallery") {
    renderGallery("all");
    setupGalleryFilters();
    setupSlider();
  }

  if (page === "join") {
    setupJoinForm();
  }
});
