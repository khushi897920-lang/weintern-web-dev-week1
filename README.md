<div align="center">

```
██╗    ██╗███████╗██╗███╗   ██╗████████╗███████╗██████╗ ███╗   ██╗
██║    ██║██╔════╝██║████╗  ██║╚══██╔══╝██╔════╝██╔══██╗████╗  ██║
██║ █╗ ██║█████╗  ██║██╔██╗ ██║   ██║   █████╗  ██████╔╝██╔██╗ ██║
██║███╗██║██╔══╝  ██║██║╚██╗██║   ██║   ██╔══╝  ██╔══██╗██║╚██╗██║
╚███╔███╔╝███████╗██║██║ ╚████║   ██║   ███████╗██║  ██║██║ ╚████║
 ╚══╝╚══╝ ╚══════╝╚═╝╚═╝  ╚═══╝   ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝
```

### `week-one` — where it all begins.

<br/>

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

<br/>

> *"Every expert was once a beginner. Every pro started with Week 1."*

</div>

---

## 🧭 The Mission

**Organization:** WeIntern Pvt Ltd  
**Program:** Summer Internship 2026 — Full Stack Web Development Track  
**Intern:** Khushi · BCA Semester IV · HCPG Varanasi  
**GitHub:** [khushi897920-lang](https://github.com/khushi897920-lang)

Week 1 is about proving the fundamentals aren't boring — they're a *foundation*. Three tasks, one pure tech stack: **HTML5 · CSS3 · Vanilla JS**. No frameworks. No shortcuts. Just clean code that works.

---

## 📦 What's Inside

```
weintern-web-dev-week1/
│
├── 🧑🎨  portfolio-website/          ← Task 1: Personal Portfolio
│   ├── index.html                    (Home)
│   ├── about.html                    (About Me)
│   ├── projects.html                 (Projects)
│   ├── contact.html                  (Contact)
│   └── assets/
│
├── 🏢  business-landing-page/        ← Task 2: NexaStudio Agency Page
│   ├── index.html
│   └── assets/
│
├── 🎨  css-challenge/                ← Task 3: CSS Mastery Challenge
│   ├── index.html
│   ├── flexbox.html
│   ├── grid.html
│   ├── animations.html
│   └── screenshots/
│
└── 📄  README.md
```

---

## 🗂️ Task Breakdown

### Task 1 — Personal Portfolio Website

> *A digital identity. Not a template — a statement.*

🔗 **Live Demo:** [khushi897920-portfolio.vercel.app](https://khushi897920-portfolio.vercel.app)

A **4-page personal portfolio** built from scratch using semantic HTML5 and responsive CSS. Every section, every spacing decision, every hover state — intentional.

| Page | What It Does |
|------|-------------|
| `index.html` | Hero landing — first impression, bold intro |
| `about.html` | Story, skills, timeline |
| `projects.html` | Showcases real work with live links |
| `contact.html` | Functional contact form with JS validation |

**Key Features:**
- ✅ Fully semantic HTML5 (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- ✅ Mobile-first responsive layout using CSS Flexbox
- ✅ Smooth scroll navigation + active link highlighting
- ✅ CSS custom properties for consistent theming
- ✅ Form validation in Vanilla JS — no libraries

| Home Page (Desktop) | Mobile View |
|:---:|:---:|
| ![Desktop](/portfolio-website/screenshots/portfolio-home-desktop.png) | ![Mobile](/portfolio-website/screenshots/portfolio-home-mobile.jpeg) |

| About Page | Projects Page |
|:---:|:---:|
| ![About](/portfolio-website/screenshots/portfolio-about.png) | ![Projects](/portfolio-website/screenshots/portfolio-projects.png) |

| Contact Page |
|:---:|
| ![Contact](/portfolio-website/screenshots/portfolio-contact.png) |

---

### Task 2 — Business Landing Page: NexaStudio

> *A fictional creative agency that feels very, very real.*

🔗 **Live Demo:** [business-landing-page-lovat.vercel.app](https://business-landing-page-lovat.vercel.app)

**NexaStudio** is a modern digital agency landing page designed to convert visitors. Think bold typography, a clean grid, and a CTA you *want* to click. Built to showcase production-level UI with zero external dependencies.

**Sections Built:**
- 🔷 **Hero** — Full-width banner with headline + CTA button
- 🔷 **Services** — Icon grid with hover effects (CSS-only)
- 🔷 **Portfolio Showcase** — Filterable card layout
- 🔷 **Testimonials** — Slide-in quote cards
- 🔷 **Pricing** — 3-tier card component with recommended highlight
- 🔷 **Footer** — Social links + newsletter subscription

**Key Features:**
- ✅ CSS Grid + Flexbox hybrid layout
- ✅ Sticky responsive navbar with hamburger menu (Vanilla JS)
- ✅ Scroll-triggered reveal animations (IntersectionObserver API)
- ✅ Consistent brand color palette via CSS variables
- ✅ Cross-browser tested

| Desktop View | Mobile View |
|:---:|:---:|
| ![Desktop](/business-landing-page/screenshots/landing-desktop.png) | ![Mobile](/business-landing-page/screenshots/landing-hero-mobile.png) |

| Services Section | Contact Form |
|:---:|:---:|
| ![Services](/business-landing-page/screenshots/landing-services.png) | ![Contact](/business-landing-page/screenshots/landing-contact-form.png) |

---

### Task 3 — CSS Mastery Challenge

> *Flexbox. Grid. Animations. The holy trinity of modern CSS.*

🔗 **Live Demo:** [css-challenge-lake.vercel.app](https://css-challenge-lake.vercel.app)

This task is a deep-dive into CSS layout and motion — three distinct sections, each pushing a different CSS superpower to its limits.

#### 📐 Section A — Flexbox Layout

A real-world responsive card layout system using **Flexbox**:
- Dynamic card grid that wraps on mobile
- Centered hero with overlapping elements
- Flex-based navigation bar with space-between distribution
- Nested flex containers for complex alignment

#### 🗃️ Section B — CSS Grid

An editorial-style layout demonstrating the power of **CSS Grid**:
- Named grid areas for semantic layout control
- Auto-fit + minmax for intrinsically responsive columns
- Image gallery with asymmetric spanning cells
- Overlapping grid items using `grid-row` and `grid-column`

#### ✨ Section C — CSS Animations

Pure CSS motion — no JavaScript, no libraries:
- `@keyframes` loader with staggered timing functions
- Hover-triggered card flip with 3D `perspective` transform
- Floating elements using `animation-direction: alternate`
- Smooth page entrance with `animation-fill-mode: both`
- Button pulse effect with `box-shadow` keyframes

| Desktop View | Mobile View |
|:---:|:---:|
| ![Desktop](/css-challenge/screenshots/flex-desktop.png) | ![Mobile](/css-challenge/screenshots/flex-mobile.png) |

| Grid Layout | Animation Demo |
|:---:|:---:|
| ![Grid](/css-challenge/screenshots/grid-layout.png) | ![Animation](/css-challenge/screenshots/animation-demo.png) |

---

## 🛠️ Tech Stack

| Technology | Why It's Used |
|------------|---------------|
| **HTML5 (Semantic)** | Accessible, SEO-friendly structure |
| **CSS3 — Flexbox** | Responsive 1D layouts |
| **CSS3 — Grid** | Complex 2D page structure |
| **CSS3 — Animations** | Smooth motion, zero JS weight |
| **CSS Custom Properties** | Consistent, scalable theming |
| **Vanilla JavaScript ES6+** | Interactivity without bloat |
| **Google Fonts** | Typography that breathes |
| **Vercel** | Zero-config deployment |

---

## 🚀 Running Locally

No build tools. No `npm install`. Just open and go.

```bash
# Clone the repo
git clone https://github.com/khushi897920-lang/weintern-web-dev-week1.git

# Navigate into any task
cd weintern-web-dev-week1/css-challenge

# Open in browser
open index.html
# or just drag it into your browser
```

---

## 📊 Progress Tracker

| # | Task | Status | Live Demo |
|---|------|--------|-----------|
| 1 | 🧑🎨 Portfolio Website | ✅ Deployed | [View Live →](https://khushi897920-portfolio.vercel.app) |
| 2 | 🏢 NexaStudio Landing Page | ✅ Deployed | [View Live →](https://business-landing-page-lovat.vercel.app/) |
| 3 | 🎨 CSS Challenge | ✅ Deployed | [View Live →](https://css-challenge-lake.vercel.app) |

---

## 👩💻 About the Intern

<div align="center">

| | |
|---|---|
| **Name** | Khushi |
| **University** | HCPG Varanasi |
| **Program** | BCA — Semester IV |
| **Internship** | WeIntern Pvt Ltd · Summer 2026 |
| **GitHub** | [khushi897920-lang](https://github.com/khushi897920-lang) |
| **Track** | Full Stack Web Development |

</div>

<br/>

---

<div align="center">

*Built with focus, curiosity, and too many cups of chai ☕*

**WeIntern Pvt Ltd · Summer 2026 · Week 1**

</div>
