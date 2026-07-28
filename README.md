# Ecommerce CV — "Corner Store" starter

A single-page portfolio built as a retro corner store: a swinging OPEN
sign, aisles of skills, case studies printed like a receipt, tools hung
as price tags, and a checkout-counter contact section. Built with
Vite + React + Framer Motion.

## 1. Run it locally

You need [Node.js](https://nodejs.org) (v18+) installed.

```bash
npm install
npm run dev
```

Open the URL it prints (usually `http://localhost:5173`).

## 2. Customize it

Everything is in `src/components/`:

- `Hero.jsx` — your name, tagline, the sign
- `Aisles.jsx` — your skills, grouped into categories
- `Receipt.jsx` — your case studies / metrics (this is the signature
  interactive piece — edit the `lineItems` array)
- `PriceTags.jsx` — your tool stack
- `Register.jsx` — your contact links (edit the `mailto:`,
  LinkedIn, GitHub URLs)

Colors and fonts are all defined once in `src/index.css` under
`:root` — change a value there and it updates everywhere.

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

1. Open `vite.config.js` and make sure `base` matches your repo name
   exactly, e.g. `base: '/ecommerce-cv/'`. If your repo is instead
   named `<your-username>.github.io`, set `base: '/'`.
2. Install the deploy tool (already in package.json) and deploy:
   ```bash
   npm install
   npm run deploy
   ```
   This builds the site and pushes it to a `gh-pages` branch.
3. On GitHub: go to your repo → **Settings → Pages** → under
   "Build and deployment", set **Source** to "Deploy from a branch",
   branch `gh-pages`, folder `/ (root)`. Save.
4. After a minute or two, your site is live at:
   `https://<your-username>.github.io/ecommerce-cv/`

Repeat step 2 (`npm run deploy`) any time you want to push updates.

## 5. Google indexing (on by default)

This site is set up to be indexable:
- `public/robots.txt` allows all crawlers (`Allow: /`)
- `index.html` has a canonical link, Open Graph tags, and basic
  JSON-LD structured data (a `Person` schema)
- `public/sitemap.xml` lists the one page

**Before you deploy, replace every `YOUR-USERNAME` placeholder** with
your actual GitHub username, in:
- `public/robots.txt`
- `public/sitemap.xml`
- `index.html` (the `canonical` link and the JSON-LD `url` field)

Once it's live, submit the URL to
[Google Search Console](https://search.google.com/search-console)
(free) and submit the sitemap URL there too — this is much faster
than waiting for Google to find it organically, which can take weeks.

Note: since this is a client-rendered React app, Google can generally
index it fine, but it's not as reliable as static HTML because
Googlebot has to execute JavaScript to see your content. If indexing
becomes a priority, consider migrating to Astro for pre-rendered HTML
while keeping the same React components for interactivity. To turn
indexing back off at any point, add
`<meta name="robots" content="noindex, nofollow">` back into
`index.html`'s `<head>` and change `robots.txt` back to
`Disallow: /`.
