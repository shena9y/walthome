"use strict";

/**
 * Dream Place — shared UI
 * Mobile nav, sticky header, reveal animations, counters, back-to-top,
 * newsletter validation and booking search date guards.
 */

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

/* ---------------------------------- *
 * Mobile navbar toggle
 * ---------------------------------- */

const $navbar = document.querySelector("[data-navbar]");
const $navToggler = document.querySelector("[data-nav-toggler]");

if ($navbar && $navToggler) {
  const setNavbarExpanded = (isExpanded) => {
    $navToggler.setAttribute("aria-expanded", `${isExpanded}`);
    $navToggler.classList.toggle("active", isExpanded);
    document.body.classList.toggle("nav-open", isExpanded);
  };

  setNavbarExpanded($navbar.classList.contains("active"));

  $navToggler.addEventListener("click", () => {
    setNavbarExpanded($navbar.classList.toggle("active"));
  });

  $navbar.querySelectorAll(".navbar-link").forEach(($link) => {
    $link.addEventListener("click", () => {
      $navbar.classList.remove("active");
      setNavbarExpanded(false);
    });
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && $navbar.classList.contains("active")) {
      $navbar.classList.remove("active");
      setNavbarExpanded(false);
      $navToggler.focus();
    }
  });
}

/* ---------------------------------- *
 * Header + back-to-top scroll state
 * ---------------------------------- */

const $header = document.querySelector("[data-header]");
const $backTop = document.querySelector("[data-back-top]");
const SCROLL_THRESHOLD = 50;

const updateScrollState = () => {
  const isScrolled = window.scrollY > SCROLL_THRESHOLD;
  $header?.classList.toggle("active", isScrolled);
  $backTop?.classList.toggle("active", window.scrollY > 600);
};

window.addEventListener("scroll", updateScrollState, { passive: true });
updateScrollState();

$backTop?.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: prefersReducedMotion ? "auto" : "smooth",
  });
});

/* ---------------------------------- *
 * Reveal-on-scroll animations
 * ---------------------------------- */

const $revealEls = document.querySelectorAll(".reveal");

if ($revealEls.length) {
  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    $revealEls.forEach(($el) => $el.classList.add("revealed"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    $revealEls.forEach(($el) => revealObserver.observe($el));
  }
}

/* ---------------------------------- *
 * Animated counters
 * ---------------------------------- */

const $counters = document.querySelectorAll("[data-counter]");

if ($counters.length) {
  const animateCounter = ($el) => {
    const target = Number.parseInt($el.dataset.counter, 10);
    if (Number.isNaN(target)) return;

    if (prefersReducedMotion) {
      $el.textContent = `${target}`;
      return;
    }

    const DURATION = 1400;
    const startTime = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - startTime) / DURATION, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      $el.textContent = `${Math.round(eased * target)}`;
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  };

  if ("IntersectionObserver" in window) {
    const counterObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.6 }
    );

    $counters.forEach(($el) => counterObserver.observe($el));
  } else {
    $counters.forEach(animateCounter);
  }
}

/* ---------------------------------- *
 * Booking search — date guards
 * ---------------------------------- */

const $searchForm = document.querySelector("[data-search-form]");
if ($searchForm) {
  const $checkin = $searchForm.querySelector("[data-checkin]");
  const $checkout = $searchForm.querySelector("[data-checkout]");
  const today = new Date().toISOString().split("T")[0];

  if ($checkin) $checkin.min = today;
  if ($checkout) $checkout.min = today;

  $checkin?.addEventListener("change", () => {
    if ($checkin.value && $checkout) {
      $checkout.min = $checkin.value;
      if ($checkout.value && $checkout.value < $checkin.value) {
        $checkout.value = $checkin.value;
      }
    }
  });
}

/* ---------------------------------- *
 * Newsletter form
 * ---------------------------------- */

const $newsletter = document.querySelector("[data-newsletter]");
if ($newsletter) {
  const $note = document.querySelector("[data-newsletter-note]");
  $newsletter.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = $newsletter.email.value.trim();
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValid) {
      $note.textContent = "Please enter a valid email address.";
      $newsletter.email.focus();
      return;
    }
    $note.textContent = "✦ Welcome to the club — your first member rates are on the way.";
    $newsletter.reset();
  });
}

/* ---------------------------------- *
 * Contact form
 * ---------------------------------- */

const $contactForm = document.querySelector("[data-contact-form]");
if ($contactForm) {
  const $note = document.querySelector("[data-contact-note]");
  $contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!$contactForm.checkValidity()) {
      $note.textContent = "Please fill in the required fields correctly.";
      $contactForm.reportValidity();
      return;
    }
    $note.textContent =
      "✦ Message sent — our concierge will reply within a few hours.";
    $contactForm.reset();
  });
}

