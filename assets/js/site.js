function getBasePath() {
  const segments = window.location.pathname.split("/").filter(Boolean);
  const reserved = new Set(["fi", "en", "assets", "content", "credits", "index.html"]);
  if (segments.length > 0 && !reserved.has(segments[0])) {
    return `/${segments[0]}`;
  }
  return "";
}

async function loadPageContent() {
  const root = document.documentElement;
  const page = document.body.dataset.page;
  const lang = root.lang || "fi";

  if (!page) {
    return;
  }

  try {
    const response = await fetch(`${getBasePath()}/content/${lang}/pages.json`);
    const data = await response.json();

    const pageData = data.pages[page];
    if (!pageData) {
      return;
    }

    document.querySelectorAll("[data-copy]").forEach((node) => {
      const key = node.dataset.copy;
      if (pageData[key]) {
        node.innerHTML = pageData[key];
      }
    });

    document.querySelectorAll("[data-list]").forEach((node) => {
      const key = node.dataset.list;
      const items = pageData[key];
      if (!Array.isArray(items)) {
        return;
      }

      node.innerHTML = items
        .map(
          (item) =>
            `<li><h4>${item.title}</h4><p>${item.body}</p></li>`
        )
        .join("");
    });

    document.querySelectorAll("[data-nav]").forEach((node) => {
      const key = node.dataset.nav;
      if (data.navigation[key]) {
        node.textContent = data.navigation[key];
      }
    });
  } catch (error) {
    console.error("Content loading failed", error);
  }
}

function setFooterYear() {
  const footerYear = document.querySelector("[data-year]");
  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }
}

function setupNav() {
  const toggle = document.querySelector(".nav-toggle");
  const list = document.querySelector(".nav-list");
  if (!toggle || !list) {
    return;
  }

  toggle.addEventListener("click", () => {
    const open = list.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  list.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", () => {
      list.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function setupAnchorNavigation() {
  const links = Array.from(document.querySelectorAll('.nav-list a[href^="#"]'));
  if (links.length === 0) {
    return;
  }

  const applyCurrentState = () => {
    const hash = window.location.hash || links[0].getAttribute("href");
    links.forEach((link) => {
      if (link.getAttribute("href") === hash) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  };

  window.addEventListener("hashchange", applyCurrentState);
  applyCurrentState();
}

function setupLanguageSelect() {
  document.querySelectorAll("[data-lang-select]").forEach((select) => {
    select.addEventListener("change", () => {
      if (!select.value) {
        return;
      }
      window.location.href = select.value;
    });
  });
}

function setupReveal() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.querySelectorAll(".reveal").forEach((node) => node.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll(".reveal").forEach((node) => observer.observe(node));
}

setupNav();
setupAnchorNavigation();
setupLanguageSelect();
setupReveal();
setFooterYear();
loadPageContent();
