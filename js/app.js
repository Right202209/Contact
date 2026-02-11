(function renderContactPage() {
  var ICONS = {
    github: {
      viewBox: "0 0 24 24",
      paths: [
        "M12 .5A12 12 0 0 0 8.2 23.9c.6.1.8-.3.8-.6v-2.1c-3.3.7-4-1.4-4-1.4-.6-1.3-1.3-1.7-1.3-1.7-1.1-.8.1-.8.1-.8 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.8 0-1.3.4-2.3 1.2-3.2-.1-.3-.5-1.6.1-3.2 0 0 1-.3 3.3 1.2a11.2 11.2 0 0 1 6 0c2.2-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.9.1 3.2.8.9 1.2 2 1.2 3.2 0 4.5-2.8 5.5-5.5 5.8.5.4.9 1.2.9 2.4v3.6c0 .3.2.7.8.6A12 12 0 0 0 12 .5Z"
      ]
    },
    email: {
      viewBox: "0 0 24 24",
      paths: [
        "M3 5h18a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z",
        "m2 7 7.8 5.6a3.5 3.5 0 0 0 4.4 0L23 7"
      ]
    },
    x: {
      viewBox: "0 0 24 24",
      paths: [
        "m3 3 7.2 0 4.2 5.6L19.4 3H21l-5.8 6.7L21 21h-7.2l-4.6-6.2L4.6 21H3l6.4-7.4L3 3Zm3.5 1.8 8.2 14.4h2L8.5 4.8h-2Z"
      ]
    },
    music: {
      viewBox: "0 0 24 24",
      paths: [
        "M15 4v11.2a3 3 0 1 1-1.5-2.6V6.2L7 7.5v9.7a3 3 0 1 1-1.5-2.6V6.3L15 4Z"
      ]
    },
    rss: {
      viewBox: "0 0 24 24",
      paths: [
        "M5 17a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z",
        "M3 10v3a8 8 0 0 1 8 8h3C14 14.4 9.6 10 3 10Z",
        "M3 3v3c8.3 0 15 6.7 15 15h3C21 11 13 3 3 3Z"
      ]
    },
    globe: {
      viewBox: "0 0 24 24",
      paths: [
        "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Z",
        "M2 12h20M12 2a15.5 15.5 0 0 1 0 20M12 2a15.5 15.5 0 0 0 0 20"
      ]
    },
    linkedin: {
      viewBox: "0 0 24 24",
      paths: [
        "M4.5 8.5h3v11h-3z",
        "M6 4.2a1.8 1.8 0 1 1 0 3.6 1.8 1.8 0 0 1 0-3.6Z",
        "M10.5 8.5h2.9V10c.6-1 1.8-1.7 3.3-1.7 3 0 3.8 2 3.8 4.8v6.2h-3v-5.5c0-1.4-.3-2.7-1.9-2.7s-2.1 1.2-2.1 2.7v5.5h-3V8.5Z"
      ]
    },
    telegram: {
      viewBox: "0 0 24 24",
      paths: [
        "M21.5 3.5 2.8 10.6c-1.3.5-1.3 1.2-.2 1.5l4.8 1.5 1.8 5.8c.2.7.1 1 1 .8l2.8-2.7 4.7 3.4c.9.5 1.5.3 1.8-.8L23 5.3c.4-1.4-.5-2-1.5-1.8Z",
        "m7.3 13.3 11.3-7.1"
      ]
    },
    discord: {
      viewBox: "0 0 24 24",
      paths: [
        "M7 6.8c2.6-1.2 7.4-1.2 10 0 .8 1.4 1.4 2.8 1.8 4.2 0 0-.7.6-2 .9-.2-.4-.5-.8-.8-1.1-.7-.6-1.7-.9-3-.9s-2.3.3-3 .9c-.3.3-.6.7-.8 1.1-1.3-.3-2-.9-2-.9.4-1.4 1-2.8 1.8-4.2Z",
        "M6.2 17.1c1.4 1.5 3.1 2.4 5.8 2.4s4.4-.9 5.8-2.4",
        "M9.6 13.4a.9.9 0 1 1-1.8 0 .9.9 0 0 1 1.8 0Zm6.6 0a.9.9 0 1 1-1.8 0 .9.9 0 0 1 1.8 0Z"
      ]
    },
    youtube: {
      viewBox: "0 0 24 24",
      paths: [
        "M22 12s0-3.2-.4-4.7c-.2-.8-.9-1.5-1.7-1.7C18.4 5 12 5 12 5s-6.4 0-7.9.6c-.8.2-1.5.9-1.7 1.7C2 8.8 2 12 2 12s0 3.2.4 4.7c.2.8.9 1.5 1.7 1.7C5.6 19 12 19 12 19s6.4 0 7.9-.6c.8-.2 1.5-.9 1.7-1.7.4-1.5.4-4.7.4-4.7Z",
        "m10 9.5 5 2.5-5 2.5Z"
      ]
    },
    bilibili: {
      viewBox: "0 0 24 24",
      paths: [
        "M7 5.5 9 8m8-2.5L15 8",
        "M5 8h14a2 2 0 0 1 2 2v7a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-7a2 2 0 0 1 2-2Z",
        "M9 12.5v2.8m6-2.8v2.8"
      ]
    },
    instagram: {
      viewBox: "0 0 24 24",
      paths: [
        "M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Z",
        "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z",
        "M17.5 6.5h.01"
      ]
    },
    facebook: {
      viewBox: "0 0 24 24",
      paths: [
        "M14 21v-7h2.6l.4-3H14V9.2c0-.9.3-1.5 1.6-1.5h1.5V5a18.5 18.5 0 0 0-2.2-.1c-2.2 0-3.7 1.3-3.7 3.8V11H8.8v3h2.4v7Z"
      ]
    },
    tiktok: {
      viewBox: "0 0 24 24",
      paths: [
        "M14 4v8.1a3.7 3.7 0 1 1-2.5-3.5",
        "M14 4c.8 1.9 2.2 3.1 4 3.5v2.4c-1.5-.1-2.8-.7-4-1.6"
      ]
    },
    wechat: {
      viewBox: "0 0 24 24",
      paths: [
        "M9.5 5C5.4 5 2 7.6 2 10.9c0 1.9 1.1 3.6 2.8 4.8L4 19l3.4-1.7c.7.2 1.4.3 2.1.3 4.1 0 7.5-2.6 7.5-5.9S13.6 5 9.5 5Z",
        "M16.5 9.2c3 0 5.5 1.9 5.5 4.3 0 1.4-.8 2.6-2.1 3.4l.6 2.1-2.5-1.2c-.5.1-1 .2-1.5.2-3 0-5.5-1.9-5.5-4.3s2.5-4.5 5.5-4.5Z",
        "M7.4 10.7h.01M11.5 10.7h.01M15 13.6h.01M18 13.6h.01"
      ]
    },
    lark: {
      viewBox: "0 0 24 24",
      paths: [
        "M12 2a5 5 0 0 1 5 5v4.5l3-3.5a1 1 0 1 1 1.6 1.2L17 15.3V19a5 5 0 0 1-5 5 5 5 0 0 1-5-5v-7l4-4V7a5 5 0 0 1 5-5Z",
        "M6 13.5a3 3 0 0 1 3-3h7a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3Z"
      ]
    },
    zhihu: {
      viewBox: "0 0 24 24",
      paths: [
        "M3 7h7v2H6.5v2h3.2v2H6.5v2H10v2H3v-2h1.6V9H3V7Zm9.5 0H21v2h-8.5V7Zm0 4H21v2h-8.5v-2Zm0 4H21v2h-8.5v-2Z"
      ]
    },
    juejin: {
      viewBox: "0 0 24 24",
      paths: [
        "m12 3 7 4.2-7 4.2-7-4.2L12 3Z",
        "m5 11 7 4.2 7-4.2",
        "m5 14.8 7 4.2 7-4.2"
      ]
    },
    medium: {
      viewBox: "0 0 24 24",
      paths: [
        "M4 7h2.8l4 10H8L4 7Z",
        "M12 7h2.5v10H12V7Z",
        "M18 8.2c1.7 0 3 1.8 3 3.8s-1.3 3.8-3 3.8-3-1.8-3-3.8 1.3-3.8 3-3.8Z"
      ]
    },
    devto: {
      viewBox: "0 0 24 24",
      paths: [
        "M3 5h18a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z",
        "M6 9v6m0-6h2.1a2 2 0 0 1 0 4H6m6-4h3m-3 3h2.5m3.5-3h2v6h-2z"
      ]
    },
    leetcode: {
      viewBox: "0 0 24 24",
      paths: [
        "M16.5 5.5 9 13l4.5 4.5",
        "M19.5 12h-9",
        "M11.2 4.8A8.5 8.5 0 1 0 20.5 18"
      ]
    },
    stackoverflow: {
      viewBox: "0 0 24 24",
      paths: [
        "M6 19h11v-5",
        "m8.2 6.2 5.2 2.2m-6 1.1 5.8 1.4M8 12l6 .8M8 15h6"
      ]
    },
    gitlab: {
      viewBox: "0 0 24 24",
      paths: [
        "M12 21 4 13l2.1-6.5h3L12 21Zm0 0 8-8-2.1-6.5h-3L12 21Zm-2.8-10.4L12 3l2.8 7.6"
      ]
    },
    npm: {
      viewBox: "0 0 24 24",
      paths: [
        "M2 8h20v8H12v-4H8v4H2V8Zm10 0h4v4h-4z"
      ]
    },
    codepen: {
      viewBox: "0 0 24 24",
      paths: [
        "m12 2 9 6-9 6-9-6 9-6Z",
        "m3 8 9 6 9-6m-9 6v8m-9-6 9 6 9-6"
      ]
    },
    dribbble: {
      viewBox: "0 0 24 24",
      paths: [
        "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Z",
        "M4.5 8.5h8.8c1.7 0 3.5-.6 5.2-1.8",
        "M6.2 17.8c2.2-3.9 5.2-6.5 8.8-7.8",
        "M11.2 4.1c2.7 3.6 4.6 7.8 5.7 12.6"
      ]
    },
    behance: {
      viewBox: "0 0 24 24",
      paths: [
        "M3 7h6a3 3 0 0 1 0 6H3V7Zm0 6h6.3a3 3 0 0 1 0 6H3v-6Zm11.5-2h6m-6 4h6m-6-2c0 2.2 1.4 3.5 3.3 3.5s3.2-1.1 3.2-2.8c0-2.2-1.6-3.2-3.5-3.2-1.8 0-3 .8-3 2.5Z"
      ]
    },
    link: {
      viewBox: "0 0 24 24",
      paths: [
        "M10.5 13.5a4 4 0 0 0 5.7 0l2.1-2.1a4 4 0 0 0-5.7-5.7l-1.2 1.1",
        "M13.5 10.5a4 4 0 0 0-5.7 0l-2.1 2.1a4 4 0 1 0 5.7 5.7l1.2-1.1"
      ]
    },
    qq: {
      viewBox: "0 0 24 24",
      paths: [
        "M12 2c-5.5 0-10 4.5-10 10s4.5 10 10 10c5.5 0 10-4.5 10-10S17.5 2 12 2Zm-3.8 8a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Zm3.8 7.1c3.1 0 5.6-1 5.6-2.9s-2.5-2.9-5.6-2.9-5.6 1-5.6 2.9 2.5 2.9 5.6 2.9Zm3.8-7.1a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Z"
      ]
    }
  };

  var config = window.CONTACT_CONFIG;
  if (!config) {
    throw new Error("Missing CONTACT_CONFIG from js/config.js");
  }

  function asText(value, fallback) {
    return typeof value === "string" && value.trim() ? value : fallback;
  }

  function isShown(value, fallback) {
    return typeof value === "boolean" ? value : fallback;
  }

  function isValidHttpUrl(value) {
    try {
      var parsed = new URL(value, window.location.origin);
      return parsed.protocol === "http:" || parsed.protocol === "https:" || parsed.protocol === "mailto:";
    } catch (_error) {
      return false;
    }
  }

  document.title = config.page && config.page.title ? config.page.title : "Contact";
  document.documentElement.lang = (config.page && config.page.language) || "zh-CN";

  var theme = config.theme || {};
  var root = document.documentElement;
  root.style.setProperty("--bg-start", asText(theme.backgroundStart, "#313131"));
  root.style.setProperty("--bg-end", asText(theme.backgroundEnd, "#0a0a0a"));
  root.style.setProperty("--color-title", asText(theme.titleColor, "#ffffff"));
  root.style.setProperty("--color-subtitle", asText(theme.subtitleColor, "rgba(255, 255, 255, 0.85)"));
  root.style.setProperty("--color-note", asText(theme.noteColor, "rgba(255, 255, 255, 0.75)"));
  root.style.setProperty("--color-chip", asText(theme.aliasBackground, "rgba(255, 255, 255, 0.12)"));
  root.style.setProperty("--cursor-default", asText(theme.cursorDefault, "url(https://cdn.jsdelivr.net/gh/Tomotoes/images/blog/default.cur), auto"));
  root.style.setProperty("--cursor-pointer", asText(theme.cursorPointer, "url(https://cdn.jsdelivr.net/gh/Tomotoes/images/blog/pointer.cur), auto"));

  var hero = config.hero || {};
  var contacts = Array.isArray(config.contacts) ? config.contacts : [];
  var target = document.getElementById("contact-root");

  var intro = asText(hero.intro, "Hi, I'm");
  var name = asText(hero.name, "Your Name");
  var suffix = asText(hero.suffix, ".");
  var callToAction = asText(hero.callToAction, "You can call me");
  var alias = asText(hero.alias, "Alias");
  var note = asText(hero.note, "");

  function createSpan(text, className) {
    var span = document.createElement("span");
    span.className = className;
    span.textContent = text;
    return span;
  }

  function createIconSvg(iconName, label) {
    var key = asText(iconName, "").toLowerCase();
    var iconDef = ICONS[key];
    if (!iconDef) {
      return null;
    }
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", iconDef.viewBox);
    svg.setAttribute("class", "social-icon");
    svg.setAttribute("aria-hidden", "true");
    iconDef.paths.forEach(function(pathData) {
      var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", pathData);
      path.setAttribute("fill", "none");
      path.setAttribute("stroke", "currentColor");
      path.setAttribute("stroke-width", "1.75");
      path.setAttribute("stroke-linecap", "round");
      path.setAttribute("stroke-linejoin", "round");
      svg.appendChild(path);
    });
    svg.setAttribute("data-icon", label);
    return svg;
  }

  function createGlowText(text) {
    var fragment = document.createDocumentFragment();
    String(text).split("").forEach(function(char) {
      var span = document.createElement("span");
      span.textContent = char;
      fragment.appendChild(span);
    });
    return fragment;
  }

  var h1 = document.createElement("h1");
  h1.className = "content-title";
  if (isShown(hero.show, true)) {
    h1.appendChild(createSpan(intro + " ", ""));
    h1.appendChild(createSpan(name, ""));
    h1.appendChild(createSpan(suffix, ""));
  } else {
    h1.style.display = "none";
  }

  var secondLine = document.createElement("div");
  secondLine.className = "content-subtitle";
  if (isShown(hero.show, true)) {
    secondLine.appendChild(createGlowText(callToAction));
  }
  if (isShown(hero.showAlias, true)) {
    secondLine.appendChild(createSpan(alias, "alias"));
  }
  if (!isShown(hero.show, true) && !isShown(hero.showAlias, true)) {
    secondLine.style.display = "none";
  }

  var noteEl = document.createElement("p");
  noteEl.className = "note";
  noteEl.textContent = note;
  if (!isShown(hero.showNote, true)) {
    noteEl.style.display = "none";
  }

  var socialList = document.createElement("ul");
  socialList.className = "social";
  var visibleContacts = contacts.filter(function(item) {
    return isShown(item.show, true) && isValidHttpUrl(asText(item.url, ""));
  });
  visibleContacts.forEach(function(item, index) {
    var safeLabel = asText(item.label, "Link");
    var safeUrl = asText(item.url, "#");
    var safeColor = asText(item.color, "#334155");
    var safeIcon = asText(item.icon, safeLabel.slice(0, 2).toUpperCase());
    var safeIconName = asText(item.iconName, "");
    var openInNewTab = isShown(item.newTab, true);

    var li = document.createElement("li");
    var a = document.createElement("a");
    a.className = "social-link";
    a.href = safeUrl;
    a.target = openInNewTab ? "_blank" : "_self";
    a.rel = openInNewTab ? "noreferrer noopener" : "";
    a.setAttribute("aria-label", safeLabel);
    a.title = safeLabel;
    a.style.background = safeColor;
    a.style.animationDelay = String(index * 85) + "ms";
    var iconSvg = createIconSvg(safeIconName, safeLabel);
    if (iconSvg) {
      a.appendChild(iconSvg);
    } else {
      a.textContent = safeIcon;
    }
    li.appendChild(a);
    socialList.appendChild(li);
  });

  if (!isShown(config.contactsShow, true)) {
    socialList.style.display = "none";
  }
  if (visibleContacts.length === 0) {
    socialList.style.display = "none";
  }

  target.replaceChildren(h1, secondLine, noteEl, socialList);
})();
