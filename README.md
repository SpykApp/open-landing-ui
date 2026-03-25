# SpykApps Open Landing Template

> A beautiful, fully open-source SaaS landing page template built with **Bootstrap 5**, **Pug**, and **Sass**. Clone it, customize it, and ship it — no design skills required.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?logo=bootstrap&logoColor=white)
![Pug](https://img.shields.io/badge/Pug-templating-A86454?logo=pug&logoColor=white)
![Sass](https://img.shields.io/badge/Sass-styling-CC6699?logo=sass&logoColor=white)
![Gulp](https://img.shields.io/badge/Gulp-build-CF4647?logo=gulp&logoColor=white)

---

## What's Inside

8 fully designed pages, ready to customize:

| Page | File | Description |
|------|------|-------------|
| Home | `src/pug/index.pug` | Hero, features, integrations, testimonials, pricing preview, FAQ, blog preview, CTA |
| Features | `src/pug/features.pug` | Feature detail sections with SVG illustrations |
| Pricing | `src/pug/pricing.pug` | Pricing cards, comparison table, FAQ accordion |
| About | `src/pug/about.pug` | Story, stats counters, values grid, team section |
| Blog | `src/pug/blog.pug` | Post grid with sidebar, categories |
| Blog Article | `src/pug/blog-single.pug` | Single article with share buttons |
| Contact | `src/pug/contact.pug` | Contact form + info card + quick links |
| Event | `src/pug/event.pug` | Conference/event page with live countdown timer |

---

## Tech Stack

- **[Bootstrap 5.3](https://getbootstrap.com/)** — layout, components, and utilities (via CDN)
- **[Pug](https://pugjs.org/)** — HTML templating with layouts, partials, mixins, and loops
- **[Sass (Dart Sass)](https://sass-lang.com/)** — CSS preprocessing with variables and theming
- **[Gulp 4](https://gulpjs.com/)** — build pipeline: compile Pug, compile Sass, copy JS
- **[Browser-Sync](https://browsersync.io/)** — live-reload dev server
- **[Bootstrap Icons 1.11](https://icons.getbootstrap.com/)** — icon set (via CDN)

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm (comes with Node.js)

### Install

```bash
git clone https://github.com/spykapps/open-landing-template.git
cd open-landing-template
npm install
```

### Development

```bash
npm run dev
```

Opens a live-reload server at `http://localhost:3000`. Edit any file in `src/` and the browser updates instantly.

### Production Build

```bash
npm run build
```

Compiles everything into `dist/`:

```
dist/
├── index.html
├── about.html
├── features.html
├── pricing.html
├── blog.html
├── blog-single.html
├── contact.html
├── event.html
└── assets/
    ├── css/
    │   └── main.css      ← compiled from src/scss/
    └── js/
        └── main.js       ← copied from src/js/
```

---

## Project Structure

```
├── src/
│   ├── pug/
│   │   ├── layouts/
│   │   │   └── base.pug          ← base HTML layout (head, nav, footer, scripts)
│   │   ├── partials/
│   │   │   ├── _nav.pug          ← shared navigation bar
│   │   │   └── _footer.pug       ← shared footer
│   │   ├── mixins/
│   │   │   └── _logo.pug         ← reusable SVG logo mixin
│   │   ├── index.pug
│   │   ├── about.pug
│   │   ├── features.pug
│   │   ├── pricing.pug
│   │   ├── blog.pug
│   │   ├── blog-single.pug
│   │   ├── contact.pug
│   │   └── event.pug
│   ├── scss/
│   │   ├── _variables.scss       ← all design tokens (colors, radii, shadows...)
│   │   └── main.scss             ← imports variables, defines :root, all styles
│   └── js/
│       └── main.js               ← scroll animations, navbar, FAQ, counter, etc.
├── dist/                         ← compiled output (git-ignored or committed)
├── gulpfile.js
├── package.json
└── README.md
```

---

## Customization

### Change the Brand Name

Find and replace `SpykApps` across `src/pug/` with your product name.

The nav and footer live in one place each — edit them once, they update everywhere:

- **Nav** → [src/pug/partials/_nav.pug](src/pug/partials/_nav.pug)
- **Footer** → [src/pug/partials/_footer.pug](src/pug/partials/_footer.pug)

### Change Colors (Theming)

Open [src/scss/_variables.scss](src/scss/_variables.scss) and edit the top variables:

```scss
$primary:       #6B5CE7 !default;   // main brand color
$primary-light: #8B7DF2 !default;   // lighter shade
$primary-dark:  #5044C4 !default;   // darker shade
$secondary:     #FF6B6B !default;   // accent / highlight color
```

Every CSS custom property (`--ss-primary`, `--ss-secondary`, etc.) is driven by these Sass variables via interpolation. One change re-themes the entire site.

### Add a Page

1. Create `src/pug/yourpage.pug`
2. Start with the template below:

```pug
extends layouts/base

block vars
  - activePage = 'yourpage'
  - pageTitle = 'Your Page Title'
  - pageDescription = 'SEO description for this page.'

block content
  section.page-header
    .container
      h1 Your Page Title

  section.py-5
    .container
      p Your content here.
```

3. Add a nav link in `_nav.pug` if needed
4. Run `npm run build` — the page appears in `dist/`

### Page-Specific Metadata

Each page sets its own title, description, and active nav state via `block vars`:

```pug
block vars
  - activePage = 'pricing'      // highlights the "Pricing" nav link
  - pageTitle = 'Pricing'       // renders as "Pricing — SpykApps" in <title>
  - pageDescription = '...'    // populates <meta name="description">
```

---

## Contributing

Contributions are welcome! Here's how:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-improvement`
3. Make changes in `src/` — **never edit `dist/` directly**
4. Run `npm run build` and verify the output
5. Submit a pull request

Please keep pull requests focused. Separate visual changes from structural ones.

---

## License

[MIT](LICENSE) — free for personal and commercial use. Attribution appreciated but not required.

---

Made with care by [SpykApps](https://github.com/spykapp)
