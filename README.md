# 🏡 WaltHome — Real Estate Website

WaltHome is a fully responsive real-estate landing website for renting, buying and selling homes. Built with pure HTML, CSS and vanilla JavaScript, it features a hero search bar (Buy / Sell / Rent), featured property listings with favorite toggles, customer stories, and a video showcase — all styled with a modern design system based on CSS custom properties and Google Fonts (Montserrat + Material Symbols).

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Responsive](https://img.shields.io/badge/Responsive-Yes-brightgreen?style=flat)

## ✨ Features

- 🔍 **Search bar** with Buy / Sell / Rent mode selector in the hero section
- 🏠 **Featured properties** grid with 8 property cards (images, prices, ratings)
- ❤️ **Add-to-favorite** toggle buttons on property cards
- 📱 **Fully responsive** layout with a mobile navbar toggle
- 🎢 **Sticky header** that changes state on scroll
- 💬 **Customer stories** section with avatars
- 🎬 **Video showcase** card and social links (Facebook, Instagram, Twitter)
- 🎨 Design system documented in `style-guide.md`

## 🛠️ Tech Stack

- **HTML5** — semantic markup
- **CSS3** — custom properties, Flexbox/Grid, responsive design
- **Vanilla JavaScript** — navbar toggle, header scroll state, favorite buttons
- **Google Fonts** — Montserrat & Material Symbols Rounded

## 📂 Project Structure

```
walthome/
├── index.html              # Main page
├── style-guide.md          # Design system reference
├── favicon.svg
└── assets/
    ├── css/style.css       # All styles
    ├── js/script.js        # UI interactions
    └── images/             # Properties, stories, icons
```

## 🚀 Getting Started

No build step required — it's a static site:

```bash
git clone https://github.com/shena9y/walthome.git
cd walthome
```

Then open `index.html` in your browser, or serve it locally:

```bash
npx serve .
```

## 📝 License

This project is licensed under the MIT License.
