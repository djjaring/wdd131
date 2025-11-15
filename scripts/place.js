// ========== Footer: current year & last modified ==========
const yearSpan = document.querySelector("#currentyear");
const lastModifiedP = document.querySelector("#lastModified");

const today = new Date();

if (yearSpan) {
  yearSpan.textContent = today.getFullYear();
}

if (lastModifiedP) {
  lastModifiedP.textContent = `Last Modified: ${document.lastModified}`;
}

// ========== Wind Chill Calculation ==========
// Static values – keep these matching the HTML content
const temperatureF = 82;  // same as #current-temp
const windSpeedMph = 8;   // same as #current-wind

const windChillSpan = document.querySelector("#windchill");

/**
 * calculateWindChill
 * Uses the standard US National Weather Service formula for °F / mph.
 * Returns a string with one decimal place.
 */
function calculateWindChill(tempF, speedMph) {
  return (
    35.74 +
    0.6215 * tempF -
    35.75 * Math.pow(speedMph, 0.16) +
    0.4275 * tempF * Math.pow(speedMph, 0.16)
  ).toFixed(1);
}

// Only calculate wind chill if:
// temp <= 50°F AND wind speed > 3 mph
if (windChillSpan) {
  if (temperatureF <= 50 && windSpeedMph > 3) {
    const chill = calculateWindChill(temperatureF, windSpeedMph);
    windChillSpan.textContent = `${chill} °F`;
  } else {
    windChillSpan.textContent = "N/A";
  }
}

// ========== HERO IMAGE SLIDER ==========

const slides = document.querySelectorAll(".slide");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let slideIndex = 0;
let slideTimer = null;

function showSlide(index) {
  if (!slides.length) return;

  // Wrap index
  if (index >= slides.length) index = 0;
  if (index < 0) index = slides.length - 1;
  slideIndex = index;

  // Hide all slides
  slides.forEach(slide => {
    slide.style.display = "none";
  });

  // Show current slide
  slides[slideIndex].style.display = "block";
}

function startSlideShow() {
  slideTimer = setInterval(() => {
    showSlide(slideIndex + 1);
  }, 4000); // 4 seconds
}

function resetSlideShow() {
  if (slideTimer) {
    clearInterval(slideTimer);
  }
  startSlideShow();
}

// Initialize slider (script is deferred, DOM is ready)
if (slides.length > 0) {
  showSlide(slideIndex);
  startSlideShow();

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      showSlide(slideIndex - 1);
      resetSlideShow();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      showSlide(slideIndex + 1);
      resetSlideShow();
    });
  }
}
