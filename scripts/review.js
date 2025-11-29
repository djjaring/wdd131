// scripts/review.js

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);

  // Get data from query string (using name attributes from form.html)
  const productName = params.get("productName");
  const rating = params.get("rating");
  const installDate = params.get("installDate");
  const features = params.getAll("features");  // multiple checkboxes
  const writtenReview = params.get("writtenReview");
  const userName = params.get("userName");

  // Display data
  const summaryProduct = document.querySelector("#summaryProduct");
  const summaryRating = document.querySelector("#summaryRating");
  const summaryInstallDate = document.querySelector("#summaryInstallDate");
  const summaryFeatures = document.querySelector("#summaryFeatures");
  const summaryWrittenReview = document.querySelector("#summaryWrittenReview");
  const summaryUserName = document.querySelector("#summaryUserName");

  // fallbacks in case a field is empty / optional
  summaryProduct.textContent = productName || "Not provided";
  summaryRating.textContent = rating ? `${rating} / 5` : "Not provided";
  summaryInstallDate.textContent = installDate || "Not provided";
  summaryFeatures.textContent = features.length ? features.join(", ") : "None selected";
  summaryWrittenReview.textContent = writtenReview || "No written review.";
  summaryUserName.textContent = userName || "Anonymous";

  // LocalStorage review counter
  const counterKey = "reviewCount";
  const currentCount = Number(localStorage.getItem(counterKey)) || 0;
  const newCount = currentCount + 1;
  localStorage.setItem(counterKey, newCount);

  const reviewCountSpan = document.querySelector("#reviewCount");
  reviewCountSpan.textContent = newCount;
});
