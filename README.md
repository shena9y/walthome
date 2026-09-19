# Dream Place - Luxury Stay Booking Platform

A high-end booking website for exceptional homes - villas, penthouses, cabins, lake houses and retreats. Dark, editorial design (noir + gold) built with pure HTML, CSS and vanilla JavaScript across 6 connected pages, with a front-end data layer powering real booking flows.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Responsive](https://img.shields.io/badge/Responsive-Yes-brightgreen?style=flat)

## Pages

- **index.html** - hero with a full booking search bar (destination / dates / guests), collections, featured stays, trust section, experience film, guest stories, newsletter
- **stays.html** - complete catalogue with live filtering (destination, type, price, guests) + sorting, pre-filled from URL params
- **details.html** - property page with amenities, verified-host card and a sticky booking widget that calculates nights x rate + cleaning + 12 percent service fee in real time
- **favorites.html** - wishlist synced across pages via localStorage, with header badge counter
- **about.html** - story, verification standard, animated stats, host program
- **contact.html** - concierge contact cards + validated message form

## How it works (front-end backend)

- **assets/js/booking.js** - a 12-property catalogue object, stay-card renderer, live filters/sort, booking price calculator and localStorage wishlist
- **assets/js/main.js** - shared UI: mobile nav, sticky header, scroll-reveal animations, counters, date guards, form validation

## Tech Stack

- **HTML5** - 6 semantic pages, no build step
- **CSS3** - design tokens, Grid/Flexbox, fluid clamp typography, dark color-scheme date pickers
- **Vanilla JavaScript** - zero dependencies, zero frameworks
- **Google Fonts** - Playfair Display, Inter and Material Symbols

## Getting Started

```
git clone https://github.com/shena9y/walthome.git
cd walthome
npx serve .
```

## License

MIT License.
