// scripts/form.js

// Example product array – replace with the one from the instructions if needed.
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
  const selectElement = document.querySelector("#productName");

  if (!selectElement) return;

  // For each product: use "name" for display and "id" for value
  products.forEach(product => {
    const option = document.createElement("option");
    option.value = product.id;      // value = product id (per assignment JS section)
    option.textContent = product.name; // visible text
    selectElement.appendChild(option);
  });
});
