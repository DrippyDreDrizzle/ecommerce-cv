/* ---------- Design tokens ---------- */
:root {
  --paper: #f3ecda;
  --paper-dark: #e8dcc0;
  --ink: #241a14;
  --cherry: #c8442e;
  --cherry-dark: #9c3423;
  --mustard: #e3a72b;
  --teal: #1f5c57;
  --teal-dark: #143f3b;

  --font-display: 'Bungee', system-ui, sans-serif;
  --font-body: 'Space Grotesk', system-ui, sans-serif;
  --font-mono: 'Courier Prime', 'Courier New', monospace;

  --radius: 6px;
  --shadow-hard: 6px 6px 0 var(--ink);
}

* { box-sizing: border-box; }

html {
  scroll-behavior: smooth;
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
  }
}

body {
  margin: 0;
  background: var(--paper);
  color: var(--ink);
  font-family: var(--font-body);
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3 {
  font-family: var(--font-display);
  text-transform: uppercase;
  letter-spacing: 0.02em;
  line-height: 1.15;
  margin: 0;
}

a { color: inherit; }

button {
  font-family: var(--font-body);
  cursor: pointer;
}

button:focus-visible,
a:focus-visible {
  outline: 3px solid var(--teal);
  outline-offset: 3px;
}

.section {
  padding: clamp(3rem, 8vw, 7rem) clamp(1.25rem, 6vw, 4rem);
  max-width: 1100px;
  margin: 0 auto;
}

.eyebrow {
  font-family: var(--font-mono);
  text-transform: uppercase;
  letter-spacing: 0.15em;
  font-size: 0.8rem;
  color: var(--cherry-dark);
}
