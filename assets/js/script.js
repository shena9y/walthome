"use strict";

/**
 * Navbar toggle in mobile
 * (same `.active` class hook as before, now kept in sync with aria-expanded)
 */

const $navbar = document.querySelector("[data-navbar]");
const $navToggler = document.querySelector("[data-nav-toggler]");

if ($navbar && $navToggler) {
  const setNavbarExpanded = (isExpanded) => {
    $navToggler.setAttribute("aria-expanded", `${isExpanded}`);
  };

  setNavbarExpanded($navbar.classList.contains("active"));

  $navToggler.addEventListener("click", () => {
    setNavbarExpanded($navbar.classList.toggle("active"));
  });
}

/**
 * Header scroll state
 */

const $header = document.querySelector("[data-header]");

if ($header) {
  const SCROLL_THRESHOLD = 50;

  const updateHeaderState = () => {
    $header.classList.toggle("active", window.scrollY > SCROLL_THRESHOLD);
  };

  window.addEventListener("scroll", updateHeaderState, { passive: true });

  // keep the header correct when the page is restored mid-scroll
  updateHeaderState();
}

/**
 * Add to favorite button toggle
 */

const $toggleBtns = document.querySelectorAll("[data-toggle-btn]");

$toggleBtns.forEach(($toggleBtn) => {
  $toggleBtn.addEventListener("click", () => {
    const isActive = $toggleBtn.classList.toggle("active");
    $toggleBtn.setAttribute("aria-pressed", `${isActive}`);
  });
});
