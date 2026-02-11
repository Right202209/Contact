# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- **Start Development Server**: `npm run dev` (runs `http-server` on port 5173)
- **Build**: No build step required (static files)
- **Test**: No test framework configured
- **Lint**: No linting configured

## Architecture

- **Type**: Static HTML/CSS/JS website
- **Entry Point**: `index.html`
- **Configuration**: `js/config.js` is the central configuration file for:
    - Page content (titles, text, links)
    - Theme settings (colors, cursors)
    - Feature toggles (hero section, contact list)
- **Core Logic**: `js/app.js` handles DOM manipulation, rendering, and interactive effects (e.g., eye movement)
- **Styling**: `css/styles.css` defines the visual layout and animations
- **Icons**: `js/icons.js` provides a catalog of SVG icons used in the contact list
- **Assets**: `assets/` directory stores static images and resources
