// ✅ Display current year
const currentYear = document.getElementById("currentyear");
currentYear.textContent = new Date().getFullYear();

// ✅ Display last modified date of this file/page
const lastModified = document.getElementById("lastModified");
lastModified.textContent = `Last Modified: ${document.lastModified}`;
