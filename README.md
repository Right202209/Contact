# Contact Page (Static)

A configurable static contact page with homepage-style typography, glow effects, SVG icons, and custom cursors.

## Structure
- `index.html` Entry page
- `css/styles.css` Styles
- `js/config.js` All configurable content and theme
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
- `theme`: background colors, text colors, alias chip, and cursor URLs
- `contactsShow`: show/hide contact section
- `contacts[]`: each item supports `show`, `label`, `url`, `newTab`, `color`, `icon`, `iconName`

## Notes
- `url` supports `https://`, `http://`, and `mailto:`.
- Invalid or empty contact links are automatically skipped during rendering.
- Built-in `iconName`: `github`, `email`, `x`, `music`, `rss`, `globe`, `linkedin`, `telegram`, `discord`, `youtube`, `bilibili`, `instagram`, `facebook`, `tiktok`, `wechat`, `lark`, `zhihu`, `juejin`, `medium`, `devto`, `leetcode`, `stackoverflow`, `gitlab`, `npm`, `codepen`, `dribbble`, `behance`, `link`, `qq`.
