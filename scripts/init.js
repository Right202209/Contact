#!/usr/bin/env node
/* eslint-disable */
/**
 * Interactive initializer for the Contact Page Template.
 * Run with: npm run init
 *
 * Prompts the user for their info (in English or Chinese) and writes
 * a fresh js/config.js. The JSDoc typedef block at the top of the
 * generated file is preserved so editors keep autocomplete.
 */

const fs = require("fs");
const path = require("path");

const isTTY = Boolean(process.stdin.isTTY);
let rl = null;
let pipedLines = [];
let pipedIndex = 0;

function readAllStdin() {
  return new Promise((resolve) => {
    let data = "";
    process.stdin.setEncoding("utf8");
    process.stdin.on("data", (chunk) => { data += chunk; });
    process.stdin.on("end", () => resolve(data));
  });
}

async function setupInput() {
  if (isTTY) {
    const readline = require("readline/promises");
    rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  } else {
    const data = await readAllStdin();
    pipedLines = data.split(/\r?\n/);
    if (pipedLines.length && pipedLines[pipedLines.length - 1] === "") pipedLines.pop();
  }
}

async function ask(prompt) {
  if (rl) return (await rl.question(prompt)).trim();
  const line = pipedIndex < pipedLines.length ? pipedLines[pipedIndex++] : "";
  process.stdout.write(prompt + line + "\n");
  return line.trim();
}

function closeInput() {
  if (rl) rl.close();
}

const MESSAGES = {
  en: {
    header: "\n=== Contact Page Template — Setup ===\n",
    pageTitle: (defaultTitle) => `Page title [${defaultTitle}]: `,
    intro: 'Hero intro [Hi, I\'m]: ',
    name: "Your name [Your Name]: ",
    suffix: 'Suffix after name ["."]: ',
    cta: 'Subtitle [You can call me]: ',
    alias: "Alias / nickname [Nickname]: ",
    noteMode: "Note style — 1) eyes  2) text  [1]: ",
    note: 'Note text [Hello World~]: ',
    contactsHeader: "\n--- Contact links (leave empty to skip) ---",
    github: "GitHub URL: ",
    email: "Email address: ",
    x: "X / Twitter URL: ",
    instagram: "Instagram URL: ",
    linkedin: "LinkedIn URL: ",
    telegram: "Telegram URL: ",
    rss: "RSS feed URL: ",
    confirm: "\nWrite to js/config.js? [Y/n]: ",
    aborted: "Aborted. No file changes.",
    done: (file) => `\nWrote ${file}. Run \`npm run dev\` to preview.`,
  },
  zh: {
    header: "\n=== 联系页模板 — 初始化向导 ===\n",
    pageTitle: (defaultTitle) => `页面标题 [${defaultTitle}]：`,
    intro: '主标题前缀 [Hi, I\'m]：',
    name: "你的名字 [Your Name]：",
    suffix: '名字后的标点 ["."]：',
    cta: "副标题 [You can call me]：",
    alias: "别名 / 昵称 [Nickname]：",
    noteMode: "注释样式 — 1) 眼睛  2) 文字  [1]：",
    note: "注释文字 [Hello World~]：",
    contactsHeader: "\n--- 联系方式（留空跳过）---",
    github: "GitHub 链接：",
    email: "邮箱地址：",
    x: "X / Twitter 链接：",
    instagram: "Instagram 链接：",
    linkedin: "LinkedIn 链接：",
    telegram: "Telegram 链接：",
    rss: "RSS 链接：",
    confirm: "\n写入 js/config.js？[Y/n]：",
    aborted: "已取消。未修改任何文件。",
    done: (file) => `\n已写入 ${file}。运行 \`npm run dev\` 预览。`,
  },
};

const CONTACT_PRESETS = {
  github:    { label: "GitHub",    color: "#181717", icon: "GH",  iconName: "github" },
  email:     { label: "Email",     color: "#d44638", icon: "EM",  iconName: "email" },
  x:         { label: "X",         color: "#000000", icon: "X",   iconName: "x" },
  instagram: { label: "Instagram", color: "#e1306c", icon: "Ins", iconName: "instagram" },
  linkedin:  { label: "LinkedIn",  color: "#0a66c2", icon: "Li",  iconName: "linkedin" },
  telegram:  { label: "Telegram",  color: "#229ed9", icon: "Tg",  iconName: "telegram" },
  rss:       { label: "RSS",       color: "#ffa500", icon: "RS",  iconName: "rss" },
};

const TYPEDEF_BLOCK = `/**
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
`;

function pick(value, fallback) {
  return value && value.length ? value : fallback;
}

function normalizeEmail(value) {
  if (!value) return "";
  return value.startsWith("mailto:") ? value : "mailto:" + value;
}

function buildContact(key, url) {
  const preset = CONTACT_PRESETS[key];
  return {
    show: Boolean(url),
    label: preset.label,
    url: url || "",
    newTab: true,
    color: preset.color,
    icon: preset.icon,
    iconName: preset.iconName,
  };
}

function serializeConfig(config) {
  return TYPEDEF_BLOCK + "window.CONTACT_CONFIG = " + JSON.stringify(config, null, 2) + ";\n";
}

async function pickLanguage() {
  const choice = await ask("Select language / 请选择语言 — 1) English  2) 中文  [1]: ");
  return choice === "2" ? "zh" : "en";
}

async function main() {
  await setupInput();
  const lang = await pickLanguage();
  const m = MESSAGES[lang];
  const pageLang = lang === "zh" ? "zh-CN" : "en";

  console.log(m.header);

  const name = pick(await ask(m.name), "Your Name");
  const defaultTitle = "Contact - " + name;
  const pageTitle = pick(await ask(m.pageTitle(defaultTitle)), defaultTitle);
  const intro = pick(await ask(m.intro), "Hi, I'm");
  const suffix = pick(await ask(m.suffix), ".");
  const cta = pick(await ask(m.cta), "You can call me");
  const alias = pick(await ask(m.alias), "Nickname");

  const noteChoice = await ask(m.noteMode);
  const noteMode = noteChoice === "2" ? "text" : "eyes";
  const note = pick(await ask(m.note), "Hello World~");

  console.log(m.contactsHeader);
  const github = await ask(m.github);
  const emailRaw = await ask(m.email);
  const x = await ask(m.x);
  const instagram = await ask(m.instagram);
  const linkedin = await ask(m.linkedin);
  const telegram = await ask(m.telegram);
  const rss = await ask(m.rss);

  const confirm = (await ask(m.confirm)).toLowerCase();
  if (confirm === "n" || confirm === "no") {
    console.log(m.aborted);
    closeInput();
    return;
  }

  const config = {
    page: { title: pageTitle, language: pageLang },
    hero: {
      show: true,
      showAlias: true,
      showNote: true,
      noteMode,
      intro,
      name,
      suffix,
      callToAction: cta,
      alias,
      note,
      eyes: { maxOffsetRatio: 0.22, eyeTiltMax: 10, containerTiltMax: 4, autoBlink: true },
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
      buildContact("github", github),
      buildContact("email", normalizeEmail(emailRaw)),
      buildContact("x", x),
      buildContact("instagram", instagram),
      buildContact("linkedin", linkedin),
      buildContact("telegram", telegram),
      buildContact("rss", rss),
    ],
  };

  const target = path.join(__dirname, "..", "js", "config.js");
  fs.writeFileSync(target, serializeConfig(config));
  console.log(m.done(path.relative(process.cwd(), target)));
  closeInput();
}

main().catch((err) => {
  console.error(err);
  closeInput();
  process.exit(1);
});
