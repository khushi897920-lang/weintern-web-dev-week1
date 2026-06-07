# 🎨 CSS Challenge — Advanced CSS Architecture

A pixel-perfect, highly premium CSS challenge built with pure HTML, CSS & JavaScript — no frameworks, no shortcuts.

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)

---

## 🔗 Live Demo & Screenshots

🔗 **Live Demo:** [Click here to view the live project](https://css-challenge-lake.vercel.app)

| Desktop View | Mobile View |
|---|---|
| ![Desktop](/css-challenge/screenshots/flex-desktop.png) | ![Mobile](/css-challenge/screenshots/flex-mobile.png) |

| Grid Layout | Animation Demo |
|---|---|
| ![Grid](/css-challenge/screenshots/grid-layout.png) | ![Animation](/css-challenge/screenshots/animation-demo.png) |

---

## 📖 About The Project

* This project is a dedicated CSS Challenge completed for **WeIntern Week 1 Task 3**.
* It is built using a clean, minimalist design token system, focusing on absolute visual precision.
* The application demonstrates Flexbox wrapping, CSS Grid alignment, and CSS keyframe animations within a single, cohesive developer interface.
* Implemented in 100% pure CSS and Vanilla JS — strictly avoiding helper frameworks like Bootstrap or Tailwind CSS.

---

## 🎨 Design System

### Color Palette

| Token | Value | Usage |
|---|---|---|
| Primary (Rausch) | `#ff385c` | CTAs, accents, stars |
| Canvas | `#ffffff` | Page background |
| Ink | `#222222` | Main headings |
| Body | `#3f3f3f` | Paragraph text |
| Muted | `#6a6a6a` | Secondary text |
| Hairline | `#dddddd` | Borders, dividers |
| Surface Soft | `#f7f7f7` | Card backgrounds, badges |

### Typography & Fonts
* **Inter** is used as the primary open-source typeface to deliver an elegant, highly readable, and premium layout structure.

---

## 🃏 Challenge Sections Table

| # | Section | CSS Concept | Layout |
|---|---|---|---|
| A | 🃏 Flexbox Testimonials | `display: flex`, `flex-wrap`, `gap` | 3-column → 1-column responsive layout |
| B | 🔲 CSS Grid Gallery | `display: grid`, `auto-fit`, `minmax` | 3-column → 1-column dashboard |
| C | ✨ Card Lift Effect | `@keyframes`, `cubic-bezier`, `transform` | 3-column → 1-column hover card array |

---

## 🚀 Features Table

| Feature | Description | Status |
|---|---|---|
| 📱 Fully Responsive | 744px tablet, mobile breakpoints | ✅ |
| 🎭 Ripple Effect | Click ripple using `rgba(255, 56, 92, 0.2)` | ✅ |
| 🔊 Audio Feedback | Web Audio API click sound | ✅ |
| 👁️ Scroll Reveal | `IntersectionObserver` fade-in reveals | ✅ |
| ⏱️ Staggered Delays | 100ms, 200ms, 300ms entrance anims | ✅ |
| 🖱️ Card Press | Scale `scale(0.98)` tactile feedback | ✅ |
| 🎨 Elevation Shadows | Clean, one-shadow tier system | ✅ |
| 🔤 Semantic HTML | Uses `<header>`, `<main>`, `<section>`, `<footer>` | ✅ |
| ⚡ Zero Dependencies | No Bootstrap, No Tailwind | ✅ |
| 🎵 Spring Animation | `cubic-bezier` card lift effects | ✅ |

---

## 💡 CSS Concepts Covered

### Part A — Flexbox
| Property | Value Used | Purpose |
|---|---|---|
| `display` | `flex` | Enable Flexbox layout context |
| `flex-wrap` | `wrap` | Responsive stacking of cards on small viewports |
| `gap` | `24px` | Spacing between items inside the flex row |
| `flex` | `1 1 280px` | Allow cards to shrink/grow with a base size of 280px |
| `justify-content` | `center` | Center aligned items horizontally |

### Part B — Grid
| Property | Value Used | Purpose |
|---|---|---|
| `display` | `grid` | Enable CSS Grid layout context |
| `grid-template-columns` | `repeat(auto-fit, minmax(240px, 1fr))` | Create a fluid, self-organizing responsive grid |
| `gap` | `24px` | Spacing between rows and columns |
| `aspect-ratio` | `16 / 9` | Keep cards proportional in video format |

### Part C — Animation
| Property | Value Used | Purpose |
|---|---|---|
| `@keyframes` | `cardEntrance` | Fade and translate card on page scroll |
| `transform` | `translateY(-4px)` | Smooth physical lift on card hover |
| `transition` | `cubic-bezier(...)` | Spring-loaded tactile transition easing |
| `box-shadow` | `rgba` values | Clean elevation depth simulation on hover |
| `animation-delay` | `100ms` / `200ms` / `300ms` | Stagger card loading when visible |

---

## 🛠️ Tech Stack Table

| Technology | Purpose |
|---|---|
| HTML5 Semantic | Structuring pages with `<header>`, `<nav>`, `<main>`, `<section>`, and `<footer>` |
| CSS3 Flexbox | Powering testimonial list wrapping and alignments |
| CSS3 Grid | Handling multi-column dashboards and footer layouts |
| CSS Keyframes | Powering custom entry and ripple animations |
| CSS Variables | Managing design tokens and color variables globally |
| CSS Transitions | Providing animations for clicks, hover lifts, and navigation triggers |
| Vanilla JS ES6+ | Injecting dynamic components, modal elements, and handling clicks |
| `IntersectionObserver` | Spawning card fade-ins on scroll visibility |
| Web Audio API | Generating live synthesizer beeps on card selections |
| Google Fonts Inter | Elevating typography using clean, open-source sans-serif |

---

## 📂 Folder Structure

```
css-challenge/
├── 📄 index.html          # Semantic HTML structure
├── 📁 css/
│   └── 🎨 style.css       # All styles + animations
├── 📁 js/
│   └── ⚡ script.js       # Interactions + audio
├── 📁 screenshots/
│   ├── 🖥️ flex-desktop.png
│   ├── 📱 flex-mobile.png
│   ├── 🔲 grid-layout.png
│   └── ✨ animation-demo.png
└── 📝 README.md
```

---

## 🎬 Animation Details

| Animation | Trigger | Properties | Duration |
|---|---|---|---|
| Card Entrance | `IntersectionObserver` | `opacity` + `translateY` | 0.6s ease-out |
| Hover Lift | `:hover` | `translateY(-4px)` + shadow elevation | 0.2s ease |
| Card Press | `mousedown` | `scale(0.98)` scaling | 0.15s ease |
| Ripple | click | `scale(0 → 4)` + `opacity` fade | 0.6s linear |
| Stagger | On scroll reveal | CSS `nth-child` delay: 100/200/300ms | — |

---

## 💻 Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/khushi897920-lang/css-challenge.git
   ```

2. **Navigate to the task folder:**
   ```bash
   cd weintern-web-dev-week1/css-challenge
   ```

3. **Open in browser:**
   * **Option A:** Double-click the local `index.html` file.
   * **Option B:** Launch using VS Code **Live Server** extension.
   * **Option C:** Run a local serve command:
     ```bash
     npx serve .
     ```

4. **Take screenshots:**
   * Open Chrome DevTools (`F12`).
   * Enter Device Toolbar (`Ctrl+Shift+M`) to toggle mobile view.
   * Right-click/click settings and select **"Capture screenshot"**.

---

## 📱 Responsive Breakpoints

| Breakpoint | Width | Layout |
|---|---|---|
| Desktop | `> 744px` | 3-column grids, inline horizontal navbar navigation links |
| Tablet | `744px` | 2-column gallery grid, hamburger dropdown toggle header |
| Mobile | `< 480px` | 1-column single stacked rows, vertical footer sections |

---

## 💼 Internship Context

* **Organization:** WeIntern Pvt Ltd
* **Program:** Summer Internship Program 2025
* **Track:** Full Stack Web Development
* **Week 1 Task 3:** CSS Layout & Animation Challenge
* **Evaluation Criteria:**
  * Code Quality: **25%**
  * Responsiveness: **25%**
  * UI Design: **25%**
  * Documentation: **15%**
  * Creativity: **10%**

---

## 👩💻 Author

| Field | Detail |
|---|---|
| 👩💻 Developer | Khushi |
| 🎓 Education | BCA Semester IV, MGKVP Varanasi |
| 💼 Internship | WeIntern Pvt Ltd |
| 🐙 GitHub | [github.com/khushi897920-lang](https://github.com/khushi897920-lang) |
| 💼 LinkedIn | [linkedin.com/in/khushii-singh01](https://www.linkedin.com/in/khushii-singh01) |

---

## 🎁 Acknowledgements

* **WeIntern Pvt Ltd** for providing structured task designs and guidelines.
* **Modern Minimalist Design Systems** for offering inspiration on color palettes and spacing tokens.
* **Google Fonts** for distributing the gorgeous `Inter` typeface.
* **Web Audio API** specs for making zero-dependency synthesizers possible in static browser environments.
* *This project was a fantastic learning experience in handling raw layout structures, understanding CSS grid flow engines, and working with intersection observers to build highly performant, responsive web apps.*
