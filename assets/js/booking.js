"use strict";

/**
 * Dream Place — booking data layer & shared UI
 * A front-end "backend": property catalogue, wishlist (localStorage),
 * stay-card renderer and booking price calculator.
 */

/* ---------------------------------- *
 * Data — the catalogue
 * ---------------------------------- */

const DP_PROPERTIES = [
  {
    id: "aurora-villa",
    name: "The Aurora Villa",
    type: "villa",
    location: "Santorini, Greece",
    price: 890,
    rating: 4.98,
    reviews: 214,
    guests: 8,
    beds: 4,
    baths: 5,
    image: "./assets/images/property-1.jpg",
    tag: "Stay of the week",
    amenities: ["Private pool", "Sea view", "Chef on call", "Fast Wi-Fi", "Air conditioning", "Airport pickup"],
    description:
      "Carved into the caldera cliff, The Aurora Villa pairs Cycladic minimalism with resort-grade service. Infinity pool at the edge of the Aegean, sunset terraces on three levels and a dedicated host for the length of your stay.",
  },
  {
    id: "noir-penthouse",
    name: "Noir Penthouse",
    type: "penthouse",
    location: "Dubai, UAE",
    price: 1240,
    rating: 4.95,
    reviews: 168,
    guests: 6,
    beds: 3,
    baths: 4,
    image: "./assets/images/property-2.jpg",
    tag: "Guest favourite",
    amenities: ["Rooftop terrace", "Skyline view", "Gym & spa", "Valet parking", "Smart home", "Concierge"],
    description:
      "Sixty floors above the Marina, Noir Penthouse is all glass, brass and midnight blue. Wraparound terrace, private elevator lobby and a skyline that performs every evening at golden hour.",
  },
  {
    id: "lumen-loft",
    name: "Lumen Loft",
    type: "loft",
    location: "Cairo, Egypt",
    price: 210,
    rating: 4.87,
    reviews: 342,
    guests: 4,
    beds: 2,
    baths: 2,
    image: "./assets/images/property-3.jpg",
    tag: "New",
    amenities: ["Nile view", "Workspace", "Fast Wi-Fi", "Breakfast included", "Air conditioning", "Self check-in"],
    description:
      "A light-drenched industrial loft on the Nile corniche — double-height windows, a proper workspace and the city's best rooftop café downstairs. The smart base for exploring Cairo.",
  },
  {
    id: "velvet-cabin",
    name: "Velvet Pines Cabin",
    type: "cabin",
    location: "Aspen, USA",
    price: 460,
    rating: 4.92,
    reviews: 197,
    guests: 6,
    beds: 3,
    baths: 2,
    image: "./assets/images/property-4.jpg",
    tag: "Rare find",
    amenities: ["Fireplace", "Hot tub", "Forest view", "Ski-in access", "Full kitchen", "EV charger"],
    description:
      "Blackened timber, velvet armchairs and nothing but pines in every direction. Ski in, soak in the cedar hot tub, and let the fireplace do the rest.",
  },
  {
    id: "halcyon-house",
    name: "Halcyon Lake House",
    type: "lake",
    location: "Lake Como, Italy",
    price: 720,
    rating: 4.96,
    reviews: 156,
    guests: 8,
    beds: 4,
    baths: 3,
    image: "./assets/images/property-5.jpg",
    tag: "Guest favourite",
    amenities: ["Private dock", "Lake view", "Kayaks", "Al fresco dining", "Wine cellar", "Housekeeping"],
    description:
      "A 19th-century lake house with its own dock on Como's quiet shore. Mornings on the water, long lunches under the pergola, evenings in the cellar. Bellissimo.",
  },
  {
    id: "copperline-retreat",
    name: "Copperline Retreat",
    type: "retreat",
    location: "Marrakech, Morocco",
    price: 380,
    rating: 4.9,
    reviews: 221,
    guests: 10,
    beds: 5,
    baths: 5,
    image: "./assets/images/property-6.jpg",
    tag: "New",
    amenities: ["Courtyard pool", "Hammam", "Rooftop lounge", "Private cook", "Garden", "Yoga deck"],
    description:
      "Behind an unmarked medina door: a restored riad of copper, cedar and zellige tile. Courtyard pool, rooftop at sunset, and a cook whose tagine guests write home about.",
  },
  {
    id: "drift-villa",
    name: "Drift Villa",
    type: "villa",
    location: "Bali, Indonesia",
    price: 295,
    rating: 4.88,
    reviews: 408,
    guests: 4,
    beds: 2,
    baths: 2,
    image: "./assets/images/property-7.jpg",
    tag: "Great value",
    amenities: ["Jungle pool", "Open living", "Breakfast included", "Scooter rental", "Fast Wi-Fi", "Yoga mats"],
    description:
      "An open-air villa drifting above the Ubud jungle canopy. Fall asleep to the river, wake to floating breakfast in your private pool.",
  },
  {
    id: "pulse-penthouse",
    name: "Pulse Penthouse",
    type: "penthouse",
    location: "New York, USA",
    price: 1480,
    rating: 4.93,
    reviews: 132,
    guests: 4,
    beds: 2,
    baths: 3,
    image: "./assets/images/property-8.jpg",
    tag: "Luxury pick",
    amenities: ["Central Park view", "Private bar", "Doorman", "Home cinema", "Smart home", "Concierge"],
    description:
      "Fifth Avenue energy with gallery-calm interiors. Floor-to-ceiling park views, a private bar and a cinema room for the nights you never leave.",
  },
  {
    id: "ember-cabin",
    name: "Ember Ridge Cabin",
    type: "cabin",
    location: "Banff, Canada",
    price: 340,
    rating: 4.85,
    reviews: 176,
    guests: 5,
    beds: 3,
    baths: 2,
    image: "./assets/images/story-1.jpg",
    tag: null,
    amenities: ["Fireplace", "Mountain view", "Sauna", "Full kitchen", "Hiking trails", "Parking"],
    description:
      "Perched on Ember Ridge with the Rockies in every window. Sauna after the trailhead, cocoa by the fire, stars you forgot existed.",
  },
  {
    id: "marina-loft",
    name: "Marina Loft",
    type: "loft",
    location: "Barcelona, Spain",
    price: 265,
    rating: 4.82,
    reviews: 289,
    guests: 3,
    beds: 2,
    baths: 1,
    image: "./assets/images/story-2.jpg",
    tag: null,
    amenities: ["Marina view", "Balcony", "Fast Wi-Fi", "Workspace", "Air conditioning", "Self check-in"],
    description:
      "A breezy loft above Port Vell — morning coffee on the balcony over the masts, vermouth hour a five-minute stroll away.",
  },
  {
    id: "solace-retreat",
    name: "Solace Desert Retreat",
    type: "retreat",
    location: "Wadi Rum, Jordan",
    price: 520,
    rating: 4.97,
    reviews: 98,
    guests: 4,
    beds: 2,
    baths: 2,
    image: "./assets/images/story-3.jpg",
    tag: "Rare find",
    amenities: ["Desert view", "Stargazing deck", "Private chef", "4x4 transfers", "Fire pit", "Full board"],
    description:
      "A glass-walled desert pavilion where the dunes meet the Milky Way. Days of silence, nights of stars — the rarest luxury there is.",
  },
  {
    id: "willow-lake",
    name: "Willow Lake House",
    type: "lake",
    location: "Queenstown, New Zealand",
    price: 610,
    rating: 4.91,
    reviews: 143,
    guests: 6,
    beds: 3,
    baths: 3,
    image: "./assets/images/story-4.jpg",
    tag: null,
    amenities: ["Lake access", "Hot tub", "Fireplace", "Kayaks", "BBQ deck", "Mountain view"],
    description:
      "Willows on the waterline, the Remarkables on the horizon. Adventure by day, hot tub and pinot noir by night.",
  },
];

const DP_TYPE_LABELS = {
  villa: "Villa",
  penthouse: "Penthouse",
  cabin: "Cabin",
  lake: "Lake house",
  loft: "Loft",
  retreat: "Retreat",
};

/* ---------------------------------- *
 * Wishlist (localStorage)
 * ---------------------------------- */

const DP_FAV_KEY = "dreamplace:favorites";

const getFavorites = () => {
  try {
    return JSON.parse(localStorage.getItem(DP_FAV_KEY)) || [];
  } catch {
    return [];
  }
};

const isFavorite = (id) => getFavorites().includes(id);

const toggleFavorite = (id) => {
  const favs = getFavorites();
  const index = favs.indexOf(id);
  if (index === -1) favs.push(id);
  else favs.splice(index, 1);
  localStorage.setItem(DP_FAV_KEY, JSON.stringify(favs));
  updateFavBadges();
  return index === -1;
};

const updateFavBadges = () => {
  const count = getFavorites().length;
  document.querySelectorAll("[data-fav-count]").forEach(($badge) => {
    $badge.textContent = `${count}`;
    $badge.hidden = count === 0;
  });
};

/**
 * Delegated wishlist-heart handling — works for dynamically rendered cards.
 */
document.addEventListener("click", (event) => {
  const $btn = event.target.closest("[data-fav-toggle]");
  if (!$btn) return;
  event.preventDefault();
  const added = toggleFavorite($btn.dataset.favToggle);
  $btn.classList.toggle("active", added);
  $btn.setAttribute("aria-pressed", `${added}`);
});

updateFavBadges();

/* ---------------------------------- *
 * Stay card renderer
 * ---------------------------------- */

const formatPrice = (value) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);

const stayCardHTML = (property) => `
  <li class="stay-card reveal revealed" data-id="${property.id}">
    <div class="stay-media">
      <a href="details.html?id=${property.id}" class="stay-media-link"
        aria-label="View ${property.name}">
        <img src="${property.image}" width="600" height="440" loading="lazy"
          alt="${property.name} — ${property.location}" class="img-cover" />
      </a>
      ${property.tag ? `<span class="stay-tag">${property.tag}</span>` : ""}
      <button class="fav-btn ${isFavorite(property.id) ? "active" : ""}" type="button"
        data-fav-toggle="${property.id}" aria-pressed="${isFavorite(property.id)}"
        aria-label="Save ${property.name} to favorites">
        <span class="material-symbols-rounded" aria-hidden="true">favorite</span>
      </button>
    </div>
    <div class="stay-body">
      <div class="stay-head">
        <div>
          <p class="stay-type">${DP_TYPE_LABELS[property.type]} · ${property.location}</p>
          <h3 class="stay-title">
            <a href="details.html?id=${property.id}">${property.name}</a>
          </h3>
        </div>
        <p class="stay-rating">
          <span class="material-symbols-rounded" aria-hidden="true">star</span>
          ${property.rating}
          <span class="stay-reviews">(${property.reviews})</span>
        </p>
      </div>
      <ul class="stay-specs" aria-label="Property details">
        <li><span class="material-symbols-rounded" aria-hidden="true">group</span>${property.guests} guests</li>
        <li><span class="material-symbols-rounded" aria-hidden="true">bed</span>${property.beds} beds</li>
        <li><span class="material-symbols-rounded" aria-hidden="true">bathtub</span>${property.baths} baths</li>
      </ul>
      <div class="stay-foot">
        <p class="stay-price">
          <strong>${formatPrice(property.price)}</strong> / night
        </p>
        <a href="details.html?id=${property.id}" class="stay-cta">
          Book now
          <span class="material-symbols-rounded" aria-hidden="true">arrow_outward</span>
        </a>
      </div>
    </div>
  </li>`;

const renderStays = ($grid, properties) => {
  $grid.innerHTML = properties.map(stayCardHTML).join("");
};

/* ---------------------------------- *
 * Home — featured stays
 * ---------------------------------- */

const $featuredGrid = document.querySelector("[data-featured-grid]");
if ($featuredGrid) {
  const featured = DP_PROPERTIES.filter((p) => p.tag !== null).slice(0, 6);
  renderStays($featuredGrid, featured);
}

/* ---------------------------------- *
 * Stays page — live filtering + sorting
 * ---------------------------------- */

const $staysGrid = document.querySelector("[data-stays-grid]");
if ($staysGrid) {
  const $destination = document.querySelector("[data-filter-destination]");
  const $type = document.querySelector("[data-filter-type]");
  const $price = document.querySelector("[data-filter-price]");
  const $guests = document.querySelector("[data-filter-guests]");
  const $sort = document.querySelector("[data-filter-sort]");
  const $count = document.querySelector("[data-results-count]");
  const $empty = document.querySelector("[data-empty-state]");
  const $clear = document.querySelector("[data-clear-filters]");

  // pre-fill from URL params (hero search / collection links)
  const params = new URLSearchParams(window.location.search);
  if (params.get("destination") && $destination) $destination.value = params.get("destination");
  if (params.get("type") && $type) $type.value = params.get("type");
  if (params.get("guests") && $guests) {
    const g = Number.parseInt(params.get("guests"), 10);
    if (!Number.isNaN(g)) $guests.value = g >= 8 ? "8" : `${g}`;
  }

  const applyFilters = () => {
    const query = ($destination?.value || "").trim().toLowerCase();
    const type = $type?.value || "all";
    const maxPrice = Number.parseInt($price?.value || "0", 10);
    const minGuests = Number.parseInt($guests?.value || "0", 10);
    const sort = $sort?.value || "featured";

    const results = DP_PROPERTIES.filter((p) => {
      const matchesQuery =
        !query ||
        p.name.toLowerCase().includes(query) ||
        p.location.toLowerCase().includes(query);
      const matchesType = type === "all" || p.type === type;
      const matchesPrice = !maxPrice || p.price <= maxPrice;
      const matchesGuests = !minGuests || p.guests >= minGuests;
      return matchesQuery && matchesType && matchesPrice && matchesGuests;
    });

    if (sort === "price-asc") results.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") results.sort((a, b) => b.price - a.price);
    else if (sort === "rating") results.sort((a, b) => b.rating - a.rating);

    renderStays($staysGrid, results);
    if ($count) $count.textContent = `${results.length}`;
    if ($empty) $empty.hidden = results.length > 0;
  };

  [$destination, $type, $price, $guests, $sort].forEach(($input) => {
    $input?.addEventListener("input", applyFilters);
  });

  $clear?.addEventListener("click", () => {
    if ($destination) $destination.value = "";
    if ($type) $type.value = "all";
    if ($price) $price.value = "0";
    if ($guests) $guests.value = "0";
    if ($sort) $sort.value = "featured";
    applyFilters();
  });

  document.querySelector("[data-filter-bar]")?.addEventListener("submit", (e) =>
    e.preventDefault()
  );

  applyFilters();
}

/* ---------------------------------- *
 * Favorites page
 * ---------------------------------- */

const $favGrid = document.querySelector("[data-favorites-grid]");
if ($favGrid) {
  const $favEmpty = document.querySelector("[data-fav-empty]");

  const renderFavorites = () => {
    const favs = DP_PROPERTIES.filter((p) => isFavorite(p.id));
    renderStays($favGrid, favs);
    if ($favEmpty) $favEmpty.hidden = favs.length > 0;
  };

  // re-render when a heart is toggled on this page
  document.addEventListener("click", (event) => {
    if (event.target.closest("[data-fav-toggle]")) renderFavorites();
  });

  renderFavorites();
}

/* ---------------------------------- *
 * Details page — render property
 * ---------------------------------- */

const $detailsRoot = document.querySelector("[data-details-root]");
if ($detailsRoot) {
  const detailsParams = new URLSearchParams(window.location.search);
  const property =
    DP_PROPERTIES.find((p) => p.id === detailsParams.get("id")) || DP_PROPERTIES[0];

  document.title = `${property.name} — Dream Place`;

  $detailsRoot.innerHTML = `
    <nav class="breadcrumb" aria-label="Breadcrumb">
      <a href="index.html">Home</a>
      <span class="material-symbols-rounded" aria-hidden="true">chevron_right</span>
      <a href="stays.html">Stays</a>
      <span class="material-symbols-rounded" aria-hidden="true">chevron_right</span>
      <span aria-current="page">${property.name}</span>
    </nav>

    <div class="details-grid">
      <div class="details-main">
        <figure class="details-media reveal revealed">
          <img src="${property.image}" width="900" height="560"
            alt="${property.name} — ${property.location}" class="img-cover" />
          ${property.tag ? `<span class="stay-tag">${property.tag}</span>` : ""}
        </figure>

        <div class="details-head reveal revealed">
          <div>
            <p class="stay-type">${DP_TYPE_LABELS[property.type]} · ${property.location}</p>
            <h1 class="details-title">${property.name}</h1>
          </div>
          <button class="fav-btn fav-btn-lg ${isFavorite(property.id) ? "active" : ""}" type="button"
            data-fav-toggle="${property.id}" aria-pressed="${isFavorite(property.id)}"
            aria-label="Save ${property.name} to favorites">
            <span class="material-symbols-rounded" aria-hidden="true">favorite</span>
          </button>
        </div>

        <ul class="stay-specs stay-specs-lg reveal revealed" aria-label="Property details">
          <li><span class="material-symbols-rounded" aria-hidden="true">group</span>${property.guests} guests</li>
          <li><span class="material-symbols-rounded" aria-hidden="true">bed</span>${property.beds} bedrooms</li>
          <li><span class="material-symbols-rounded" aria-hidden="true">bathtub</span>${property.baths} baths</li>
          <li>
            <span class="material-symbols-rounded" aria-hidden="true">star</span>
            ${property.rating} · ${property.reviews} reviews
          </li>
        </ul>

        <p class="details-text reveal revealed">${property.description}</p>

        <h2 class="details-subtitle reveal revealed">What this place offers</h2>
        <ul class="amenities-grid reveal revealed">
          ${property.amenities
            .map(
              (a) => `<li class="amenity">
                <span class="material-symbols-rounded" aria-hidden="true">check_circle</span>${a}
              </li>`
            )
            .join("")}
        </ul>

        <div class="host-card reveal revealed">
          <img src="./assets/images/avatar-4.jpg" width="56" height="56" alt="" class="quote-avatar" />
          <div>
            <p class="quote-name">Hosted by a Dream Place Verified Host</p>
            <p class="quote-role">Superhost · 6 years hosting · Responds within an hour</p>
          </div>
          <span class="host-badge">
            <span class="material-symbols-rounded" aria-hidden="true">verified</span>
            Verified
          </span>
        </div>
      </div>

      <aside class="booking-widget reveal revealed" aria-label="Book this stay">
        <p class="booking-price">
          <strong>${formatPrice(property.price)}</strong> <span>/ night</span>
        </p>
        <p class="stay-rating">
          <span class="material-symbols-rounded" aria-hidden="true">star</span>
          ${property.rating} <span class="stay-reviews">· ${property.reviews} reviews</span>
        </p>

        <form class="booking-form" data-booking-form novalidate>
          <div class="booking-dates">
            <div class="booking-field">
              <label for="b-checkin">Check-in</label>
              <input type="date" id="b-checkin" data-book-checkin required />
            </div>
            <div class="booking-field">
              <label for="b-checkout">Check-out</label>
              <input type="date" id="b-checkout" data-book-checkout required />
            </div>
          </div>
          <div class="booking-field">
            <label for="b-guests">Guests</label>
            <select id="b-guests" data-book-guests></select>
          </div>

          <dl class="booking-summary" data-booking-summary hidden>
            <div class="booking-row">
              <dt data-summary-nights></dt>
              <dd data-summary-base></dd>
            </div>
            <div class="booking-row">
              <dt>Cleaning fee</dt>
              <dd data-summary-cleaning></dd>
            </div>
            <div class="booking-row">
              <dt>Service fee (12%)</dt>
              <dd data-summary-service></dd>
            </div>
            <div class="booking-row booking-row-total">
              <dt>Total</dt>
              <dd data-summary-total></dd>
            </div>
          </dl>

          <p class="form-note" data-booking-note role="status" aria-live="polite"></p>

          <button type="submit" class="btn btn-primary btn-block">
            <span class="btn-text">Reserve</span>
            <span class="material-symbols-rounded" aria-hidden="true">lock</span>
          </button>
          <p class="booking-hint">You won&rsquo;t be charged yet · Free cancellation for 48h</p>
        </form>
      </aside>
    </div>`;

  /* populate guest options up to capacity */
  const $guestSelect = $detailsRoot.querySelector("[data-book-guests]");
  $guestSelect.innerHTML = Array.from({ length: property.guests }, (_, i) => i + 1)
    .map(
      (n) =>
        `<option value="${n}" ${n === Math.min(2, property.guests) ? "selected" : ""}>${n} guest${n > 1 ? "s" : ""}</option>`
    )
    .join("");

  /* booking calculator */
  const $checkin = $detailsRoot.querySelector("[data-book-checkin]");
  const $checkout = $detailsRoot.querySelector("[data-book-checkout]");
  const $summary = $detailsRoot.querySelector("[data-booking-summary]");
  const $note = $detailsRoot.querySelector("[data-booking-note]");
  const CLEANING_FEE = 85;
  const SERVICE_RATE = 0.12;

  const today = new Date().toISOString().split("T")[0];
  $checkin.min = today;
  $checkout.min = today;

  const nightsBetween = (a, b) =>
    Math.round((new Date(b) - new Date(a)) / 86400000);

  const updateSummary = () => {
    const nights =
      $checkin.value && $checkout.value
        ? nightsBetween($checkin.value, $checkout.value)
        : 0;

    if (nights <= 0) {
      $summary.hidden = true;
      if ($checkin.value && $checkout.value) {
        $note.textContent = "Check-out must be after check-in.";
      }
      return 0;
    }

    $note.textContent = "";
    const base = property.price * nights;
    const service = Math.round(base * SERVICE_RATE);
    const total = base + service + CLEANING_FEE;

    $detailsRoot.querySelector("[data-summary-nights]").textContent =
      `${formatPrice(property.price)} × ${nights} night${nights > 1 ? "s" : ""}`;
    $detailsRoot.querySelector("[data-summary-base]").textContent = formatPrice(base);
    $detailsRoot.querySelector("[data-summary-cleaning]").textContent = formatPrice(CLEANING_FEE);
    $detailsRoot.querySelector("[data-summary-service]").textContent = formatPrice(service);
    $detailsRoot.querySelector("[data-summary-total]").textContent = formatPrice(total);
    $summary.hidden = false;
    return nights;
  };

  $checkin.addEventListener("change", () => {
    if ($checkin.value) $checkout.min = $checkin.value;
    updateSummary();
  });
  $checkout.addEventListener("change", updateSummary);

  $detailsRoot
    .querySelector("[data-booking-form]")
    .addEventListener("submit", (event) => {
      event.preventDefault();
      const nights = updateSummary();
      if (!nights) {
        $note.textContent = "Please choose valid check-in and check-out dates.";
        return;
      }
      const guests = $guestSelect.value;
      $note.textContent =
        `✦ Reserved! ${property.name} for ${nights} night${nights > 1 ? "s" : ""}, ` +
        `${guests} guest${guests > 1 ? "s" : ""}. Check your inbox for confirmation.`;
    });
}




