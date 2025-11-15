
const yearSpan = document.querySelector("#currentyear");
const lastModifiedP = document.querySelector("#lastModified");

const today = new Date();

if (yearSpan) {
  yearSpan.textContent = today.getFullYear();
}

if (lastModifiedP) {
  lastModifiedP.textContent = `Last Modified: ${document.lastModified}`;
}


const temperatureF = 82;  
const windSpeedMph = 8;   

const windChillSpan = document.querySelector("#windchill");


function calculateWindChill(tempF, speedMph) {
  return (
    35.74 +
    0.6215 * tempF -
    35.75 * Math.pow(speedMph, 0.16) +
    0.4275 * tempF * Math.pow(speedMph, 0.16)
  ).toFixed(1);
}


if (windChillSpan) {
  if (temperatureF <= 50 && windSpeedMph > 3) {
    const chill = calculateWindChill(temperatureF, windSpeedMph);
    windChillSpan.textContent = `${chill} °F`;
  } else {
    windChillSpan.textContent = "N/A";
  }
}



const slides = document.querySelectorAll(".slide");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let slideIndex = 0;
let slideTimer = null;

function showSlide(index) {
  if (!slides.length) return;

  
  if (index >= slides.length) index = 0;
  if (index < 0) index = slides.length - 1;
  slideIndex = index;

  
  slides.forEach(slide => {
    slide.style.display = "none";
  });

  
  slides[slideIndex].style.display = "block";
}

function startSlideShow() {
  slideTimer = setInterval(() => {
    showSlide(slideIndex + 1);
  }, 4000); 
}

function resetSlideShow() {
  if (slideTimer) {
    clearInterval(slideTimer);
  }
  startSlideShow();
}


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
