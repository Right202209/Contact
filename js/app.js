(function renderContactPage() {
  var config = window.CONTACT_CONFIG;
  if (!config) {
    throw new Error("Missing CONTACT_CONFIG from js/config.js");
  }

  document.title = config.page && config.page.title ? config.page.title : "Contact";
  document.documentElement.lang = (config.page && config.page.language) || "zh-CN";

  var theme = config.theme || {};
  var root = document.documentElement;
  root.style.setProperty("--bg-start", theme.backgroundStart || "#f2f4f8");
  root.style.setProperty("--bg-end", theme.backgroundEnd || "#dce2ec");
  root.style.setProperty("--card-bg", theme.cardBackground || "rgba(255, 255, 255, 0.72)");
  root.style.setProperty("--text-primary", theme.textPrimary || "#1e2633");
  root.style.setProperty("--text-muted", theme.textMuted || "rgba(30, 38, 51, 0.72)");
  root.style.setProperty("--alias-bg", theme.aliasBackground || "rgba(54, 78, 111, 0.12)");
  root.style.setProperty("--alias-text", theme.aliasText || "#24344e");

  var hero = config.hero || {};
  var contacts = Array.isArray(config.contacts) ? config.contacts : [];
  var target = document.getElementById("contact-root");

  var intro = hero.intro || "Hi, I'm";
  var name = hero.name || "Your Name";
  var suffix = hero.suffix || ".";
  var callToAction = hero.callToAction || "You can call me";
  var alias = hero.alias || "Alias";
  var note = hero.note || "";

  function isShown(value, fallback) {
    return typeof value === "boolean" ? value : fallback;
  }

  function createSpan(text, className) {
    var span = document.createElement("span");
    span.className = className;
    span.textContent = text;
    return span;
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
    return isShown(item.show, true);
  });
  visibleContacts.forEach(function(item, index) {
    var safeLabel = item.label || "Link";
    var safeUrl = item.url || "#";
    var safeColor = item.color || "#334155";
    var safeIcon = item.icon || safeLabel.slice(0, 2).toUpperCase();
    var safeIconClass = item.iconClass || "";

    var li = document.createElement("li");
    var a = document.createElement("a");
    a.className = "social-link";
    a.href = safeUrl;
    a.target = "_blank";
    a.rel = "noreferrer";
    a.setAttribute("aria-label", safeLabel);
    a.title = safeLabel;
    a.style.background = safeColor;
    a.style.animationDelay = String(index * 85) + "ms";
    if (safeIconClass) {
      var iconEl = document.createElement("i");
      iconEl.className = "iconfont " + safeIconClass;
      a.appendChild(iconEl);
    } else {
      a.textContent = safeIcon;
    }
    li.appendChild(a);
    socialList.appendChild(li);
  });

  if (!isShown(config.contactsShow, true)) {
    socialList.style.display = "none";
  }

  target.replaceChildren(h1, secondLine, noteEl, socialList);
})();
