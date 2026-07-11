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
