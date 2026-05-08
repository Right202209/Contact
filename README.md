# Contact Page Template

A configurable static contact page template with homepage-style typography, glow effects, SVG icons, custom cursors, and an interactive eye widget. Edit a single config file to make it your own — no build step required.

## Features
- Single-file configuration (`js/config.js`)
- Built-in SVG icon catalog for popular platforms
- Themeable colors and cursors via CSS variables
- Optional interactive eyes that follow the pointer
- Auto-skips contact entries with empty or invalid URLs
- Zero build tooling — pure HTML/CSS/JS

## Structure
- `index.html` Entry page
- `css/styles.css` Styles
- `js/config.js` All configurable content and theme (start here)
- `js/icons.js` Built-in SVG icon catalog
- `js/app.js` Render logic
- `assets/` Reserved for images or icons

## Use as a Template
1. Click **Use this template** on GitHub (or fork/clone the repo).
2. Open `js/config.js` and replace placeholder values with your own.
3. Optionally tweak `theme` colors and the `hero` section.
4. Toggle each entry in `contacts[]` with `show: true/false`.
5. Deploy as a static site (GitHub Pages, Netlify, Vercel, Cloudflare Pages, etc.).

## Quick Start
Open `index.html` directly in a browser, or run a local static server:

```bash
npm run dev
```

Then visit <http://localhost:5173>.

## Configuration
Edit `js/config.js`:

- `page`: page title and language
- `hero`: headline/subtitle/note text and display switches
  - `hero.noteMode`: `eyes` or `text`
  - `hero.eyes`: eye interaction tuning (`maxOffsetRatio`, `eyeTiltMax`, `containerTiltMax`, `autoBlink`)
- `theme`: background colors, text colors, alias chip, and cursor URLs
- `contactsShow`: show/hide contact section
- `emptyStateText`: text shown when no valid contact links are available
- `contacts[]`: each item supports `show`, `label`, `url`, `newTab`, `color`, `icon`, `iconName`

## Notes
- `url` supports `https://`, `http://`, and `mailto:`.
- Invalid or empty contact links are automatically skipped during rendering.
- Built-in `iconName`: `github`, `email`, `x`, `music`, `rss`, `globe`, `linkedin`, `telegram`, `discord`, `youtube`, `bilibili`, `instagram`, `ins`, `facebook`, `tiktok`, `wechat`, `lark`, `feishu`, `zhihu`, `juejin`, `medium`, `devto`, `leetcode`, `stackoverflow`, `gitlab`, `npm`, `codepen`, `dribbble`, `behance`, `link`, `qq`.

## GitHub Pages Deployment
1. Ensure your default branch is `main`.
2. In repository settings, go to `Pages` and set source to `GitHub Actions` (or `Deploy from a branch` → `main` / root).
3. Push to `main` (or run the workflow manually).
4. After deployment, access:
   - `https://<username>.github.io/<repo>/` for project pages
   - `https://<username>.github.io/` for user pages

## License
Use freely as a starting point for your own contact page.
