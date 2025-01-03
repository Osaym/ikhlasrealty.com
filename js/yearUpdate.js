document.addEventListener("DOMContentLoaded", () => {
    const currentYear = new Date().getFullYear(); // get current year
    const footerYear = document.querySelector("#footer-year"); // select span for year
    if (footerYear) {
      footerYear.textContent = currentYear; // set current year
    }
  });
  