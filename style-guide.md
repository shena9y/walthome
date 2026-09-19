# shena9y â€” Work Gallery Design System

## Html import links

Google fonts

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500&display=swap"
  rel="stylesheet" />
```

Material icons

```html
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,0..1,0" />
```

---

## CSS Variables

### Colors

```css
--bg: #0a0a0f;
--bg-elevated: #12121a;
--bg-surface: #17171f;
--ink: #f4f2ec;
--ink-soft: #b9b7b0;
--muted: #8a8a94;
--accent: #d4a853;
--accent-strong: #e8c076;
--accent-ink: #1a1408;
--line: #ffffff14;
--line-strong: #ffffff26;
--star: #f6bd26;
```

### Typography

Font family

```css
--font-sans: "Inter", system-ui, sans-serif;
--font-serif: "Playfair Display", Georgia, serif;
```

Font size (fluid)

```css
--fs-base: 62.5%;
--fs-display: clamp(4rem, 6.5vw, 7.2rem);
--fs-headline: clamp(3.2rem, 4.5vw, 4.8rem);
--fs-title: clamp(2.2rem, 3vw, 2.8rem);
--fs-body-large: 1.8rem;
--fs-body: 1.6rem;
--fs-label: 1.4rem;
--fs-micro: 1.2rem;
```

Letter spacing

```css
--tracking-wide: 0.14em;
--tracking-wider: 0.22em;
```

### Border Radius

```css
--radius-small: 8px;
--radius-medium: 14px;
--radius-large: 22px;
--radius-full: 1000px;
--radius-circle: 50%;
```

### Box Shadow

```css
--shadow-soft: 0 10px 30px #00000040;
--shadow-lift: 0 24px 60px #00000059;
--shadow-accent: 0 12px 40px #d4a85333;
```

### Motion

```css
--ease-out: cubic-bezier(0.16, 1, 0.3, 1);
--duration-quick: 250ms;
--duration-smooth: 600ms;
```

### Layout

```css
--container: 1200px;
--gutter: 24px;
--header-height: 84px;
```

---

## Conventions

- Dark-first palette: every surface sits on `--bg`, elevated with `--bg-elevated` / `--bg-surface`.
- `--accent` (gold) is reserved for primary actions, highlights and editorial serif italics.
- Reveal animations use the `.reveal` / `.revealed` classes with an optional `--reveal-delay` custom property.
- All animations respect `prefers-reduced-motion`.
- Interactive elements keep visible `:focus-visible` outlines in the accent color.
