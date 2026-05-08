/**
 * @typedef {Object} PageConfig
 * @property {string} title - Browser tab title.
 * @property {string} language - HTML lang attribute (e.g. "en", "zh-CN").
 *
 * @typedef {Object} EyesConfig
 * @property {number} [maxOffsetRatio] - How far the pupil can travel inside the eye (0–1).
 * @property {number} [eyeTiltMax] - Max per-eye tilt in degrees.
 * @property {number} [containerTiltMax] - Max container tilt in degrees.
 * @property {boolean} [autoBlink] - Whether eyes blink automatically.
 *
 * @typedef {Object} HeroConfig
 * @property {boolean} [show] - Show the heading line.
 * @property {boolean} [showAlias] - Show the alias chip.
 * @property {boolean} [showNote] - Show the note (eyes or text).
 * @property {"eyes"|"text"} [noteMode] - "eyes" widget or plain "text".
 * @property {string} [intro] - Text before name (e.g. "Hi, I'm").
 * @property {string} [name] - Your displayed name.
 * @property {string} [suffix] - Punctuation after name (e.g. ".").
 * @property {string} [callToAction] - Subtitle text (e.g. "You can call me").
 * @property {string} [alias] - Alias chip text.
 * @property {string} [note] - Note text when noteMode === "text".
 * @property {EyesConfig} [eyes] - Eye widget tuning.
 *
 * @typedef {Object} ThemeConfig
 * @property {string} [backgroundStart] - Top-of-page background color.
 * @property {string} [backgroundEnd] - Bottom-of-page background color.
 * @property {string} [titleColor]
 * @property {string} [subtitleColor]
 * @property {string} [noteColor]
 * @property {string} [aliasBackground] - Alias chip background color.
 * @property {string} [eyePupilColor]
 * @property {string} [eyeWhiteColor]
 * @property {string} [cursorDefault] - CSS cursor value for the default cursor.
 * @property {string} [cursorPointer] - CSS cursor value for hover state.
 *
 * @typedef {Object} ContactItem
 * @property {boolean} [show] - Render this entry.
 * @property {string} label - Accessible label and tooltip.
 * @property {string} url - http(s):// or mailto:
 * @property {boolean} [newTab] - Open link in new tab (default true).
 * @property {string} [color] - Background color of the link button.
 * @property {string} [icon] - 1–2 letter fallback when iconName is unknown.
 * @property {string} [iconName] - One of the keys in CONTACT_ICONS (see js/icons.js).
 *
 * @typedef {Object} ContactConfig
 * @property {PageConfig} page
 * @property {HeroConfig} [hero]
 * @property {boolean} [contactsShow] - Render the contact section.
 * @property {string} [emptyStateText] - Shown when no valid contacts exist.
 * @property {ThemeConfig} [theme]
 * @property {ContactItem[]} [contacts]
 */

/** @type {ContactConfig} */
window.CONTACT_CONFIG = {
  page: {
    title: "Contact - Your Name",
    language: "en",
  },
  hero: {
    show: true,
    showAlias: true,
    showNote: true,
    noteMode: "eyes",
    intro: "Hi, I'm",
    name: "Your Name",
    suffix: ".",
    callToAction: "You can call me",
    alias: "Nickname",
    note: "Hello World~",
    eyes: {
      maxOffsetRatio: 0.22,
      eyeTiltMax: 10,
      containerTiltMax: 4,
      autoBlink: true,
    },
  },
  contactsShow: true,
  emptyStateText: "No contact methods available right now.",
  theme: {
    backgroundStart: "#313131",
    backgroundEnd: "#0a0a0a",
    titleColor: "#ffffff",
    subtitleColor: "rgba(255, 255, 255, 0.85)",
    noteColor: "rgba(255, 255, 255, 0.75)",
    aliasBackground: "rgba(255, 255, 255, 0.12)",
    eyePupilColor: "#101622",
    eyeWhiteColor: "#ffffff",
    cursorDefault: "url(https://cdn.jsdelivr.net/gh/Tomotoes/images/blog/default.cur), auto",
    cursorPointer: "url(https://cdn.jsdelivr.net/gh/Tomotoes/images/blog/pointer.cur), auto",
  },
  contacts: [
    {
      show: true,
      label: "GitHub",
      url: "https://github.com/your-username",
      newTab: true,
      color: "#181717",
      icon: "GH",
      iconName: "github",
    },
    {
      show: true,
      label: "Email",
      url: "mailto:your-email@example.com",
      newTab: true,
      color: "#d44638",
      icon: "EM",
      iconName: "email",
    },
    {
      show: false,
      label: "Music",
      url: "",
      color: "#c20c0c",
      icon: "MU",
      iconName: "music",
    },
    {
      show: false,
      label: "RSS",
      url: "https://example.com/feed.xml",
      color: "#ffa500",
      icon: "RS",
      iconName: "rss",
    },
    {
      show: false,
      label: "X",
      url: "https://x.com/your-handle",
      newTab: true,
      color: "#000000",
      icon: "X",
      iconName: "x",
    },
    {
      show: false,
      label: "Instagram",
      url: "https://www.instagram.com/your-handle/",
      newTab: true,
      color: "#e1306c",
      icon: "Ins",
      iconName: "instagram",
    },
    {
      show: false,
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/your-handle/",
      newTab: true,
      color: "#0a66c2",
      icon: "Li",
      iconName: "linkedin",
    },
    {
      show: false,
      label: "Telegram",
      url: "https://t.me/your-handle",
      newTab: true,
      color: "#229ed9",
      icon: "Tg",
      iconName: "telegram",
    }
  ],
};
