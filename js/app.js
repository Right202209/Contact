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
    noteMode: "eyes",
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

  function asNumber(value, fallback) {
    return typeof value === "number" && isFinite(value) ? value : fallback;
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

  function createEyesElement() {
    var eyes = document.createElement("div");
    eyes.className = "eyes";
    eyes.setAttribute("aria-hidden", "true");

    for (var i = 0; i < 2; i += 1) {
      var eye = document.createElement("span");
      eye.className = "eye";
      var pupil = document.createElement("span");
      pupil.className = "pupil";
      eye.appendChild(pupil);
      eyes.appendChild(eye);
    }
    return eyes;
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

    var bgEnd = asText(themeConfig.backgroundEnd, DEFAULTS.bgEnd);
    var titleColor = asText(themeConfig.titleColor, DEFAULTS.titleColor);

    var pupilColor = asText(themeConfig.eyePupilColor, bgEnd);
    var eyeBgColor = asText(themeConfig.eyeWhiteColor, titleColor);

    root.style.setProperty("--color-pupil", pupilColor);
    root.style.setProperty("--color-eye-bg", eyeBgColor);
    // Use color-mix in CSS or just set it here if we want simple opacity simulation
    // Since we can't easily parse hex in this simple script without a library, we'll rely on CSS color-mix or fallback
    // But to be safe, let's just pass the same color and let CSS handle the gradient difference if possible
    // Or better, let's assume modern browser support for color-mix which is >90%
    root.style.setProperty("--color-eye-bg-dim", "color-mix(in srgb, " + eyeBgColor + ", transparent 40%)");

    root.style.setProperty("--color-eye-border", asText(themeConfig.subtitleColor, DEFAULTS.subtitleColor));
    root.style.setProperty("--cursor-default", asText(themeConfig.cursorDefault, DEFAULTS.cursorDefault));
    root.style.setProperty("--cursor-pointer", asText(themeConfig.cursorPointer, DEFAULTS.cursorPointer));
  }

  function buildHero(heroConfig) {
    var heroVisible = asBoolean(heroConfig.show, true);
    var showAlias = asBoolean(heroConfig.showAlias, true);
    var showNote = asBoolean(heroConfig.showNote, true);
    var noteMode = asText(heroConfig.noteMode || heroConfig.noteType, DEFAULTS.noteMode).toLowerCase();

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

    var noteEl = noteMode === "text"
      ? createTextElement("p", "note", asText(heroConfig.note, DEFAULTS.note))
      : createEyesElement();

    if (!showNote) {
      noteEl.style.display = "none";
    }

    return {
      elements: [heading, subtitle, noteEl],
      noteMode: noteMode,
      showNote: showNote,
      eyesOptions: heroConfig.eyes || {}
    };
  }

  function initEyes(eyesEl, eyesConfig) {
    var eyes = Array.prototype.slice.call(eyesEl.querySelectorAll(".eye"));
    var pupils = Array.prototype.slice.call(eyesEl.querySelectorAll(".pupil"));
    if (!eyes.length || !pupils.length) {
      return;
    }

    var maxOffsetRatio = asNumber(eyesConfig.maxOffsetRatio, 0.26);
    var eyeTiltMax = asNumber(eyesConfig.eyeTiltMax, 10);
    var containerTiltMax = asNumber(eyesConfig.containerTiltMax, 4);
    var autoBlink = asBoolean(eyesConfig.autoBlink, true);

    function updatePupil(eye, pupil, clientX, clientY) {
      var rect = eye.getBoundingClientRect();
      var centerX = rect.left + rect.width / 2;
      var centerY = rect.top + rect.height / 2;
      var dx = clientX - centerX;
      var dy = clientY - centerY;
      var angle = Math.atan2(dy, dx);
      var maxOffset = Math.min(rect.width, rect.height) * maxOffsetRatio;
      var offsetX = Math.cos(angle) * maxOffset;
      var offsetY = Math.sin(angle) * maxOffset;
      pupil.style.setProperty("--pupil-x", offsetX.toFixed(2) + "px");
      pupil.style.setProperty("--pupil-y", offsetY.toFixed(2) + "px");

      var tiltX = Math.max(-eyeTiltMax, Math.min(eyeTiltMax, (dy / rect.height) * eyeTiltMax));
      var tiltY = Math.max(-eyeTiltMax, Math.min(eyeTiltMax, (dx / rect.width) * eyeTiltMax));
      eye.style.setProperty("--eye-tilt-x", (-tiltX).toFixed(2) + "deg");
      eye.style.setProperty("--eye-tilt-y", tiltY.toFixed(2) + "deg");
    }

    function resetEyes() {
      eyes.forEach(function(eye, index) {
        pupils[index].style.setProperty("--pupil-x", "0px");
        pupils[index].style.setProperty("--pupil-y", "0px");
        eye.style.setProperty("--eye-tilt-x", "0deg");
        eye.style.setProperty("--eye-tilt-y", "0deg");
        eye.style.setProperty("--eye-shadow-x", "0px");
        eye.style.setProperty("--eye-shadow-y", "0px");
      });
      eyesEl.style.setProperty("--eyes-tilt-x", "0deg");
      eyesEl.style.setProperty("--eyes-tilt-y", "0deg");
      eyesEl.style.setProperty("--eye-shadow-x", "0px");
      eyesEl.style.setProperty("--eye-shadow-y", "0px");
    }

    function onPointerMove(event) {
      var x = event.clientX;
      var y = event.clientY;
      eyes.forEach(function(eye, index) {
        updatePupil(eye, pupils[index], x, y);
      });

      var rect = eyesEl.getBoundingClientRect();
      var centerX = rect.left + rect.width / 2;
      var centerY = rect.top + rect.height / 2;
      var dx = (x - centerX) / rect.width;
      var dy = (y - centerY) / rect.height;
      var tiltX = Math.max(-containerTiltMax, Math.min(containerTiltMax, -dy * containerTiltMax));
      var tiltY = Math.max(-containerTiltMax, Math.min(containerTiltMax, dx * containerTiltMax));
      eyesEl.style.setProperty("--eyes-tilt-x", tiltX.toFixed(2) + "deg");
      eyesEl.style.setProperty("--eyes-tilt-y", tiltY.toFixed(2) + "deg");
      eyesEl.style.setProperty("--eye-shadow-x", (tiltY * 0.8).toFixed(2) + "px");
      eyesEl.style.setProperty("--eye-shadow-y", (tiltX * 0.8).toFixed(2) + "px");
    }

    function blink() {
      eyesEl.classList.remove("blink");
      void eyesEl.offsetWidth;
      eyesEl.classList.add("blink");
    }

    function startBlinkLoop() {
      if (!autoBlink) return;
      var delay = Math.random() * 3000 + 2000;
      setTimeout(function() {
        blink();
        startBlinkLoop();
      }, delay);
    }

    startBlinkLoop();

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", resetEyes);
    window.addEventListener("blur", resetEyes);
    window.addEventListener("click", blink, { passive: true });
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

  var heroView = buildHero(config.hero || {});
  var contactElements = buildContacts(
    Array.isArray(config.contacts) ? config.contacts : [],
    asBoolean(config.contactsShow, true),
    config.emptyStateText
  );

  root.replaceChildren.apply(root, heroView.elements.concat(contactElements));

  if (heroView.noteMode !== "text" && heroView.showNote) {
    var eyesEl = root.querySelector(".eyes");
    if (eyesEl) {
      initEyes(eyesEl, heroView.eyesOptions);
    }
  }
})();
