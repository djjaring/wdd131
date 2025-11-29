// scripts/form.js

// Example product array – from the assignment
const products = [
  {
    id: "fc-1888",
    name: "Flux Capacitor",
    avgRating: 4.5
  },
  {
    id: "fc-2050",
    name: "Power Laces",
    avgRating: 4.7
  },
  {
    id: "fs-1987",
    name: "Hover Board",
    avgRating: 4.2
  },
  {
    id: "ac-2000",
    name: "Auto-Drying Jacket",
    avgRating: 4.0
  }
];

document.addEventListener("DOMContentLoaded", () => {
  // Populate the product <select>
  const selectElement = document.querySelector("#productName");

  if (selectElement) {
    products.forEach((product) => {
      const option = document.createElement("option");
      option.value = product.id;          // value = product id (per assignment)
      option.textContent = product.name;  // visible text
      selectElement.appendChild(option);
    });
  }

  // Footer: current year
  const yearSpan = document.getElementById("currentYear");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Footer: last modified date
  const modifiedSpan = document.getElementById("lastModified");
  if (modifiedSpan) {
    modifiedSpan.textContent = document.lastModified;
  }
});
