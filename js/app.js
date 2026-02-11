(function renderContactPage() {
  var ICONS = window.CONTACT_ICONS || {};
  var config = window.CONTACT_CONFIG;

  if (!config) {
    throw new Error("Missing CONTACT_CONFIG from js/config.js");
  }

  var DEFAULTS = {
    pageTitle: "Contact",
    pageLanguage: "zh-CN",
    intro: "Hi, I'm",
    name: "Your Name",
    suffix: ".",
    callToAction: "You can call me",
    alias: "Alias",
    note: "",
    emptyState: "No contact methods available yet.",
    bgStart: "#313131",
    bgEnd: "#0a0a0a",
    titleColor: "#ffffff",
    subtitleColor: "rgba(255, 255, 255, 0.85)",
    noteColor: "rgba(255, 255, 255, 0.75)",
    aliasBackground: "rgba(255, 255, 255, 0.12)",
    cursorDefault: "url(https://cdn.jsdelivr.net/gh/Tomotoes/images/blog/default.cur), auto",
    cursorPointer: "url(https://cdn.jsdelivr.net/gh/Tomotoes/images/blog/pointer.cur), auto"
  };

  function asText(value, fallback) {
    return typeof value === "string" && value.trim() ? value : fallback;
  }

  function asBoolean(value, fallback) {
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

  function createTextElement(tag, className, text) {
    var el = document.createElement(tag);
    el.className = className;
    el.textContent = text;
    return el;
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

  function createIconSvg(iconName) {
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

    return svg;
  }

  function applyPageSettings(pageConfig) {
    document.title = asText(pageConfig && pageConfig.title, DEFAULTS.pageTitle);
    document.documentElement.lang = asText(pageConfig && pageConfig.language, DEFAULTS.pageLanguage);
  }

  function applyTheme(themeConfig) {
    var root = document.documentElement;
    root.style.setProperty("--bg-start", asText(themeConfig.backgroundStart, DEFAULTS.bgStart));
    root.style.setProperty("--bg-end", asText(themeConfig.backgroundEnd, DEFAULTS.bgEnd));
    root.style.setProperty("--color-title", asText(themeConfig.titleColor, DEFAULTS.titleColor));
    root.style.setProperty("--color-subtitle", asText(themeConfig.subtitleColor, DEFAULTS.subtitleColor));
    root.style.setProperty("--color-note", asText(themeConfig.noteColor, DEFAULTS.noteColor));
    root.style.setProperty("--color-chip", asText(themeConfig.aliasBackground, DEFAULTS.aliasBackground));
    root.style.setProperty("--cursor-default", asText(themeConfig.cursorDefault, DEFAULTS.cursorDefault));
    root.style.setProperty("--cursor-pointer", asText(themeConfig.cursorPointer, DEFAULTS.cursorPointer));
  }

  function buildHero(heroConfig) {
    var heroVisible = asBoolean(heroConfig.show, true);
    var showAlias = asBoolean(heroConfig.showAlias, true);
    var showNote = asBoolean(heroConfig.showNote, true);

    var heading = document.createElement("h1");
    heading.id = "contact-title";
    heading.className = "content-title";
    if (heroVisible) {
      heading.appendChild(createTextElement("span", "", asText(heroConfig.intro, DEFAULTS.intro) + " "));
      heading.appendChild(createTextElement("span", "", asText(heroConfig.name, DEFAULTS.name)));
      heading.appendChild(createTextElement("span", "", asText(heroConfig.suffix, DEFAULTS.suffix)));
    } else {
      heading.style.display = "none";
    }

    var subtitle = document.createElement("div");
    subtitle.className = "content-subtitle";
    if (heroVisible) {
      subtitle.appendChild(createGlowText(asText(heroConfig.callToAction, DEFAULTS.callToAction)));
    }
    if (showAlias) {
      subtitle.appendChild(createTextElement("span", "alias", asText(heroConfig.alias, DEFAULTS.alias)));
    }
    if (!heroVisible && !showAlias) {
      subtitle.style.display = "none";
    }

    var note = createTextElement("p", "note", asText(heroConfig.note, DEFAULTS.note));
    if (!showNote) {
      note.style.display = "none";
    }

    return [heading, subtitle, note];
  }

  function buildContacts(contacts, contactsVisible, emptyText) {
    var list = document.createElement("ul");
    list.className = "social";

    var validContacts = contacts.filter(function(item) {
      return asBoolean(item.show, true) && isValidHttpUrl(asText(item.url, ""));
    });

    validContacts.forEach(function(item, index) {
      var label = asText(item.label, "Link");
      var iconName = asText(item.iconName, "");
      var fallbackIcon = asText(item.icon, label.slice(0, 2).toUpperCase());
      var openInNewTab = asBoolean(item.newTab, true);

      var li = document.createElement("li");
      var a = document.createElement("a");
      a.className = "social-link";
      a.href = asText(item.url, "#");
      a.style.background = asText(item.color, "#334155");
      a.style.animationDelay = String(index * 85) + "ms";
      a.setAttribute("aria-label", label);
      a.title = label;
      a.target = openInNewTab ? "_blank" : "_self";
      a.rel = openInNewTab ? "noopener noreferrer" : "";

      var svg = createIconSvg(iconName);
      if (svg) {
        a.appendChild(svg);
      } else {
        a.textContent = fallbackIcon;
      }

      li.appendChild(a);
      list.appendChild(li);
    });

    if (!contactsVisible) {
      list.style.display = "none";
      return [list];
    }

    if (validContacts.length === 0) {
      list.style.display = "none";
      var emptyState = createTextElement("p", "empty-state", asText(emptyText, DEFAULTS.emptyState));
      return [list, emptyState];
    }

    return [list];
  }

  applyPageSettings(config.page || {});
  applyTheme(config.theme || {});

  var root = document.getElementById("contact-root");
  if (!root) {
    throw new Error("Missing #contact-root container");
  }

  var heroElements = buildHero(config.hero || {});
  var contactElements = buildContacts(
    Array.isArray(config.contacts) ? config.contacts : [],
    asBoolean(config.contactsShow, true),
    config.emptyStateText
  );

  root.replaceChildren.apply(root, heroElements.concat(contactElements));
})();
