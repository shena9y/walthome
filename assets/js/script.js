"use strict";

/**
 * shena9y â€” work gallery
 * UI interactions: mobile nav, sticky header, scrollspy, reveal animations,
 * gallery filters, animated counters and back-to-top.
 */

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

/**
 * Mobile navbar toggle
 */

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

  // close the menu whenever a navigation link is used
  $navbar.querySelectorAll(".navbar-link").forEach(($link) => {
    $link.addEventListener("click", () => {
      $navbar.classList.remove("active");
      setNavbarExpanded(false);
    });
  });

  // close on Escape for keyboard users
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && $navbar.classList.contains("active")) {
      $navbar.classList.remove("active");
      setNavbarExpanded(false);
      $navToggler.focus();
    }
  });
}

/**
 * Header + back-to-top scroll state
 */

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

/**
 * Scrollspy — highlight the nav link of the section in view
 */

const $navLinks = document.querySelectorAll(".navbar-link");
const $sections = document.querySelectorAll("main section[id]");

if ($navLinks.length && $sections.length && "IntersectionObserver" in window) {
  const setActiveLink = (sectionId) => {
    $navLinks.forEach(($link) => {
      const isActive = $link.getAttribute("href") === `#${sectionId}`;
      $link.classList.toggle("active", isActive);
      if (isActive) {
        $link.setAttribute("aria-current", "page");
      } else {
        $link.removeAttribute("aria-current");
      }
    });
  };

  const scrollSpyObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveLink(entry.target.id);
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );

  $sections.forEach(($section) => scrollSpyObserver.observe($section));
}

/**
 * Reveal-on-scroll animations
 */

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

/**
 * Work gallery filters
 */

const $filterBtns = document.querySelectorAll("[data-filter]");
const $workCards = document.querySelectorAll("[data-category]");

if ($filterBtns.length && $workCards.length) {
  $filterBtns.forEach(($btn) => {
    $btn.addEventListener("click", () => {
      const filter = $btn.dataset.filter;

      $filterBtns.forEach(($other) => {
        const isActive = $other === $btn;
        $other.classList.toggle("active", isActive);
        $other.setAttribute("aria-pressed", `${isActive}`);
      });

      $workCards.forEach(($card) => {
        const shouldShow = filter === "all" || $card.dataset.category === filter;
        $card.classList.toggle("hidden", !shouldShow);
        // cards re-entering the grid should already be visible
        if (shouldShow) $card.classList.add("revealed");
      });
    });
  });
}

/**
 * Animated hero counters
 */

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
      // ease-out cubic for a premium feel
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

