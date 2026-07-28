# Ecommerce CV — "Menu" starter

A single-page portfolio styled like a game pause menu: a click-to-enter
intro screen, a numbered side-tab navigation, diagonal wipe transitions
between sections, and a glitchy RGB-split title reveal on each panel.
Built with Vite + React + Framer Motion.

## 1. Run it locally

You need [Node.js](https://nodejs.org) (v18+) installed.

```bash
npm install
npm run dev
```

Open the URL it prints (usually `http://localhost:5173`).

## 2. Customize it

- `src/components/Intro.jsx` — the click-to-enter screen (name, tagline)
- `src/components/SideNav.jsx` — the tab menu (labels, order)
- `src/components/panels/` — one file per section:
  - `Profile.jsx` — your intro/stats
  - `Skills.jsx` — your skills, grouped into categories
  - `Record.jsx` — case studies / metrics
  - `Equipment.jsx` — your tool stack
  - `Contact.jsx` — your contact links
- `src/components/Panel.jsx` — shared wrapper: every panel uses this for
  the diagonal wipe transition and glitch title, so you only style it once
- `src/index.css` — all colors and fonts as CSS variables under `:root`

## 3. Put it on GitHub

1. Create a new repo on GitHub, e.g. `ecommerce-cv`.
2. In this project folder:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/<your-username>/ecommerce-cv.git
   git push -u origin main
   ```

## 4. Deploy to GitHub Pages (free)

If you're using the GitHub Actions workflow (`.github/workflows/deploy.yml`),
just push to `main` — it builds and deploys automatically. Otherwise:

1. Make sure `vite.config.js`'s `base` matches your repo name, e.g.
   `base: '/ecommerce-cv/'`.
2. ```bash
   npm install
   npm run deploy
   ```
3. On GitHub: **Settings → Pages** → Source → `gh-pages` branch.

Your site will be live at `https://<your-username>.github.io/ecommerce-cv/`.

## 5. Google indexing (on by default)

- `public/robots.txt` allows all crawlers
- `index.html` has a canonical link and JSON-LD structured data
- `public/sitemap.xml` lists the page

Replace every `YOUR-USERNAME` placeholder (in `robots.txt`, `sitemap.xml`,
and `index.html`) with your actual GitHub username before deploying, then
submit the URL to [Google Search Console](https://search.google.com/search-console).
