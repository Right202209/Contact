# Contact Page (Static)

A configurable static contact page with homepage-style typography, glow effects, SVG icons, and custom cursors.

## Structure
- `index.html` Entry page
- `css/styles.css` Styles
- `js/config.js` All configurable content and theme
- `js/icons.js` Built-in SVG icon catalog
- `js/app.js` Render logic
- `assets/` Reserved for images or icons

## Quick Start
Open `index.html` directly in a browser.

## Local Preview
Run a static server (Node.js required):

```bash
npm run dev
```

## Configuration
Edit `js/config.js`:

- `page`: page title and language
- `hero`: headline/subtitle/note text and display switches
  - `hero.noteMode`: `eyes` or `text`
  - `hero.eyes`: eye interaction tuning (`maxOffsetRatio`, `eyeTiltMax`, `containerTiltMax`)
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
2. In repository settings, go to `Pages` and set source to `GitHub Actions`.
3. Push to `main` (or run the workflow manually).
4. After deployment, access:
   - `https://<username>.github.io/<repo>/` for project pages
   - `https://<username>.github.io/` for user pages
