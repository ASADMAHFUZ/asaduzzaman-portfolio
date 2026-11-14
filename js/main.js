const PROJECTS = [
  {
    id: 1,
    title: "CareBox",
    subtitle: "A Social Impact UX CASE STUDY",
    description: "to Share, Donate & Resell Essentials.",
    category: "Mobile App Design",
    image: "images/carebox.png",
    links: {
      figma: "https://figma.com/carebox",
      behance: "https://behance.net/carebox",
      external: "https://carebox.com",
    },
  },
  {
    id: 2,
    title: "Inventory",
    subtitle: "Management App",
    description: "",
    category: "Mobile App Design",
    image: "images/inventory.png",
    links: {
      figma: "https://figma.com/inventory",
      behance: "https://behance.net/inventory",
      external: "https://inventory-app.com",
    },
  },
  {
    id: 3,
    title: "Dokter For You",
    subtitle: "Health & Medical",
    description: "INTERNATIONAL E-HEALTH PLATFORM",
    category: "Website Design",
    image: "images/dokter.png",
    links: {
      figma: "https://figma.com/dokterforyou",
      behance: "https://behance.net/dokterforyou",
      external: "https://dokterforyou.com",
    },
  },
  {
    id: 4,
    title: "EcoShop",
    subtitle: "E-commerce Platform",
    description: "Sustainable Shopping Experience",
    category: "Website Design",
    image: "images/carebox.png",
    links: {
      figma: "https://figma.com/ecoshop",
      behance: "https://behance.net/ecoshop",
      external: "https://ecoshop.com",
    },
  },
  {
    id: 5,
    title: "MindSpace",
    subtitle: "Mental Health App",
    description:
      "Meditation & Wellness Tracking | Health & Medical | Mobile App Design | UX/UI Design | 3D Animation | Graphic Design | Professional Back-Office Service | UI/UX Design | 3D Animation | Graphic Design | Professional Back-Office Service |",
    category: "Mobile App Design",
    image: "images/carebox.png",
    links: {
      figma: "https://figma.com/mindspace",
      behance: "https://behance.net/mindspace",
      external: "https://mindspace-app.com",
    },
  },
  {
    id: 6,
    title: "Dragon Quest",
    subtitle: "Fantasy RPG",
    description: "Epic Adventure Gaming Experience",
    category: "Game Design",
    image: "images/carebox.png",
    links: {
      figma: "https://figma.com/dragonquest",
      behance: "https://behance.net/dragonquest",
      external: "https://dragonquest-game.com",
    },
  },
  {
    id: 7,
    title: "Dragon Quest",
    subtitle: "Fantasy RPG",
    description: "Epic Adventure Gaming Experience",
    category: "Game Design",
    image: "images/carebox.png",
    links: {
      figma: "https://figma.com/dragonquest",
      behance: "https://behance.net/dragonquest",
      external: "https://dragonquest-game.com",
    },
  },
];

const PAGE_SIZE = 6;
const FILTERS = ["All", "Website Design", "Mobile App Design", "Game Design", "3D"];

const ICONS = {
  figma:
    '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 384 512" class="w-[18px] h-[18px] text-white" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M14 95.8C14 42.9 56.9 0 109.8 0h164.4C327.1 0 370 42.9 370 95.8c0 33.5-17.2 63-43.2 80.1 26 17.1 43.2 46.6 43.2 80.1 0 52.9-42.9 95.8-95.8 95.8h-2.1c-24.8 0-47.4-9.4-64.4-24.9v88.3C207.7 468.8 163.7 512 110.3 512 57.5 512 14 469.2 14 416.2c0-33.5 17.2-63 43.2-80.1C31.2 319 14 289.5 14 256s17.2-63 43.2-80.1C31.2 158.8 14 129.3 14 95.8zM176.3 191.6H109.8c-35.6 0-64.4 28.8-64.4 64.4s28.6 64.2 64 64.4h66.9V191.6zm31.4 64.4c0 35.6 28.8 64.4 64.4 64.4h2.1c35.6 0 64.4-28.8 64.4-64.4s-28.8-64.4-64.4-64.4h-2.1c-35.6 0-64.4 28.8-64.4 64.4zM109.8 351.8c-35.4.2-64 28.5-64 64.4 0 35.4 29.2 64.4 64.9 64.4 36.3 0 66-29.4 66-65.5v-63.3H109.8zM109.8 31.4c-35.6 0-64.4 28.8-64.4 64.4s28.8 64.4 64.4 64.4h66.5V31.4H109.8zm97.9 128.8h66.5c35.6 0 64.4-28.8 64.4-64.4S309.7 31.4 274.2 31.4h-66.5v128.8z"></path></svg>',
  behance:
    '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 576 512" class="w-[18px] h-[18px] text-white" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M232 237.2c31.8-15.2 48.4-38.2 48.4-74 0-70.6-52.6-87.8-113.3-87.8H0v354.4h171.8c64.4 0 124.9-30.9 124.9-102.9 0-44.5-21.1-77.4-64.7-89.7zM77.9 135.9H151c28.1 0 53.4 7.9 53.4 40.5 0 30.1-19.7 42.2-47.5 42.2h-79v-82.7zm83.3 233.7H77.9V272h84.9c34.3 0 56 14.3 56 50.6 0 35.8-25.9 47-57.6 47zm358.5-240.7H376V94h143.7v34.9zM576 305.2c0-75.9-44.4-139.2-124.9-139.2-78.2 0-131.3 58.8-131.3 135.8 0 79.9 50.3 134.7 131.3 134.7 61.3 0 101-27.6 120.1-86.3H509c-6.7 21.9-34.3 33.5-55.7 33.5-41.3 0-63-24.2-63-65.3h185.1c.3-4.2.6-8.7.6-13.2zM390.4 274c2.3-33.7 24.7-54.8 58.5-54.8 35.4 0 53.2 20.8 56.2 54.8H390.4z"></path></svg>',
  external:
    '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" class="w-[18px] h-[18px] text-white" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M256 8C119.3 8 8 119.3 8 256s111.3 248 248 248 248-111.3 248-248S392.7 8 256 8zm164 114.4c29.5 36 47.4 82 47.8 132-7-1.5-77-15.7-147.5-6.8-5.8-14-11.2-26.4-18.6-41.6 78.3-32 113.8-77.5 118.3-83.6zM396.4 97.9c-3.8 5.4-35.7 48.3-111 76.5-34.7-63.8-73.2-116.2-79-124 67.2-16.2 138 1.3 190 47.5zM165.9 64.6c5.6 7.7 43.4 60.1 78.5 122.5-99.1 26.3-186.4 25.9-195.8 25.8C62.4 147.2 106.7 92.6 165.9 64.6zM44.2 256.3c0-2.2 0-4.3.1-6.5 9.3.2 111.9 1.5 217.7-30.1 6.1 11.9 11.9 23.9 17.2 35.9-76.6 21.6-146.2 83.5-180.5 142.3C64.8 360.4 44.2 310.7 44.2 256.3zm81.8 167.1c22.1-45.2 82.2-103.6 167.6-132.8 29.7 77.3 42 142.1 45.2 160.6-68.1 29-150 21.1-212.8-27.8zm248.4 8.5c-2.2-12.9-13.4-74.9-41.2-151 66.4-10.6 124.7 6.8 131.9 9.1-9.4 58.9-43.3 109.8-90.8 142z"></path></svg>',
  visit:
    '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" class="w-3.5 h-3.5 text-gray-500 group-hover:text-[#FF8D5E] transition-colors duration-300" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M432 320h-32a16 16 0 0 0-16 16v112H64V128h144a16 16 0 0 0 16-16V80a16 16 0 0 0-16-16H48a48 48 0 0 0-48 48v352a48 48 0 0 0 48 48h352a48 48 0 0 0 48-48V336a16 16 0 0 0-16-16zM488 0H360c-21.4 0-32 25.9-17 41l35.7 35.7L135 320.4a24 24 0 0 0 0 34L157.7 377a24 24 0 0 0 34 0L435.3 133.3 471 169c15 15 41 4.5 41-17V24a24 24 0 0 0-24-24z"></path></svg>',
  prev:
    '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 320 512" class="w-3 h-3" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M34.5 239 229 44.7c9.4-9.4 24.6-9.4 33.9 0l22.7 22.7c9.4 9.4 9.4 24.5 0 33.9L131.5 256l154 154.7c9.3 9.4 9.3 24.5 0 33.9l-22.7 22.7c-9.4 9.4-24.6 9.4-33.9 0L34.5 273c-9.4-9.4-9.4-24.6 0-34z"></path></svg>',
  next:
    '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 320 512" class="w-3 h-3" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M285.5 273 91.1 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.7-22.7c-9.4-9.4-9.4-24.5 0-33.9L188.5 256 34.5 101.3c-9.3-9.4-9.3-24.5 0-33.9l22.7-22.7c9.4-9.4 24.6-9.4 33.9 0L285.5 239c9.4 9.4 9.4 24.6 0 34z"></path></svg>',
};

const LINK_META = [
  { key: "figma", label: "Figma" },
  { key: "behance", label: "Behance" },
  { key: "external", label: "Dribble" },
];

const state = { filter: "All", page: 1 };

function openUrl(url) {
  window.open(url, "_blank", "noopener,noreferrer");
}

function filteredProjects() {
  if (state.filter === "All") return PROJECTS;
  return PROJECTS.filter((project) => project.category === state.filter);
}

function iconButton(project, meta) {
  const button = document.createElement("button");
  button.type = "button";
  button.className =
    "w-11 h-11 flex items-center justify-center bg-white/10 backdrop-blur-md rounded-full border border-white/15 hover:bg-gradient-to-br hover:from-[#FF8D5E] hover:to-[#FF6B6B] hover:border-transparent transition-all duration-200 hover:shadow-[0_0_20px_rgba(255,141,94,0.35)]";
  button.setAttribute("aria-label", `View ${project.title} on ${meta.label}`);
  button.title = `View on ${meta.label}`;
  button.innerHTML = ICONS[meta.key];
  button.addEventListener("click", () => openUrl(project.links[meta.key]));
  return button;
}

function renderProjects() {
  const grid = document.getElementById("project-grid");
  const pager = document.getElementById("pagination");
  const items = filteredProjects();
  const pages = Math.ceil(items.length / PAGE_SIZE) || 1;
  if (state.page > pages) state.page = pages;
  const start = (state.page - 1) * PAGE_SIZE;
  const visible = items.slice(start, start + PAGE_SIZE);

  grid.replaceChildren();
  visible.forEach((project, index) => {
    const article = document.createElement("article");
    article.className = "group";
    article.setAttribute("role", "article");
    article.setAttribute("aria-labelledby", `project-${project.id}-title`);
    article.style.opacity = "0";
    article.style.transform = "translateY(30px)";

    const shell = document.createElement("div");
    shell.className =
      "h-full p-[1px] rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.03] group-hover:from-[#FF8D5E]/40 group-hover:to-[#FF6B6B]/30 transition-all duration-500";

    const card = document.createElement("div");
    card.className = "h-full flex flex-col bg-[#1c1e22] rounded-2xl overflow-hidden";

    const media = document.createElement("div");
    media.className = "relative overflow-hidden";

    const img = document.createElement("img");
    img.src = project.image;
    img.alt = `${project.title} - ${project.subtitle}`;
    img.width = 600;
    img.height = 400;
    img.className =
      "w-full h-48 sm:h-56 md:h-72 object-cover group-hover:scale-105 transition-transform duration-700 ease-out";
    if (index > 2) img.loading = "lazy";

    const badge = document.createElement("div");
    badge.className = "absolute top-4 left-4";
    const badgeText = document.createElement("span");
    badgeText.className =
      "px-3 py-1 text-[11px] font-semibold uppercase tracking-wider bg-black/50 backdrop-blur-md text-white/90 rounded-full border border-white/10";
    badgeText.textContent = project.category;
    badge.appendChild(badgeText);

    const overlay = document.createElement("div");
    overlay.className =
      "absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center";
    const actions = document.createElement("div");
    actions.className =
      "flex items-center gap-3 translate-y-5 group-hover:translate-y-0 transition-transform duration-300 ease-out";
    LINK_META.forEach((meta) => actions.appendChild(iconButton(project, meta)));
    overlay.appendChild(actions);

    media.append(img, badge, overlay);

    const body = document.createElement("div");
    body.className = "p-5 relative flex-1 flex flex-col";
    const rule = document.createElement("div");
    rule.className = "absolute top-0 left-5 right-5 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent";

    const row = document.createElement("div");
    row.className = "flex items-start justify-between gap-3";
    const text = document.createElement("div");
    text.className = "min-w-0";
    const title = document.createElement("h2");
    title.id = `project-${project.id}-title`;
    title.className =
      "text-lg font-bold text-white mb-1 truncate group-hover:bg-gradient-to-r group-hover:from-[#FF8D5E] group-hover:to-[#FF6B6B] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300";
    title.textContent = project.title;
    const subtitle = document.createElement("p");
    subtitle.className = "text-gray-500 text-sm font-medium";
    subtitle.textContent = project.subtitle;
    text.append(title, subtitle);

    const visit = document.createElement("button");
    visit.type = "button";
    visit.className =
      "flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-lg bg-white/[0.04] border border-white/[0.06] hover:bg-gradient-to-br hover:from-[#FF8D5E]/20 hover:to-[#FF6B6B]/20 hover:border-[#FF8D5E]/30 transition-all duration-300 mt-0.5";
    visit.setAttribute("aria-label", `Visit ${project.title}`);
    visit.innerHTML = ICONS.visit;
    visit.addEventListener("click", () => openUrl(project.links.external));
    row.append(text, visit);
    body.append(rule, row);

    if (project.description) {
      const desc = document.createElement("p");
      desc.className = "text-gray-600 text-sm mt-2 line-clamp-1";
      desc.textContent = project.description;
      body.appendChild(desc);
    }

    card.append(media, body);
    shell.appendChild(card);
    article.appendChild(shell);
    grid.appendChild(article);
    requestAnimationFrame(() => {
      article.style.transition = "opacity .4s ease, transform .4s ease";
      article.style.opacity = "1";
      article.style.transform = "none";
    });
  });

  pager.replaceChildren();
  pager.classList.toggle("mt-14", items.length > PAGE_SIZE);
  if (items.length <= PAGE_SIZE) return;

  const prev = document.createElement("button");
  prev.type = "button";
  prev.className =
    "w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all";
  prev.disabled = state.page === 1;
  prev.innerHTML = ICONS.prev;
  prev.addEventListener("click", () => {
    if (state.page > 1) {
      state.page -= 1;
      renderProjects();
    }
  });
  pager.appendChild(prev);

  for (let page = 1; page <= pages; page += 1) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = String(page);
    button.className =
      "w-10 h-10 flex items-center justify-center rounded-xl font-medium text-sm transition-all " +
      (page === state.page
        ? "bg-gradient-to-r from-[#FF8D5E] to-[#FF6B6B] !text-white shadow-[0_4px_15px_rgba(255,107,107,0.3)]"
        : "bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10 hover:text-white");
    button.addEventListener("click", () => {
      state.page = page;
      renderProjects();
    });
    pager.appendChild(button);
  }

  const next = document.createElement("button");
  next.type = "button";
  next.className =
    "w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all";
  next.disabled = state.page === pages;
  next.innerHTML = ICONS.next;
  next.addEventListener("click", () => {
    if (state.page < pages) {
      state.page += 1;
      renderProjects();
    }
  });
  pager.appendChild(next);
}

function renderFilters() {
  const wrap = document.getElementById("filters");
  FILTERS.forEach((name) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = name;
    button.setAttribute("aria-label", `Filter by ${name}`);
    button.dataset.filter = name;
    button.addEventListener("click", () => {
      state.filter = name;
      state.page = 1;
      updateFilterStyles();
      renderProjects();
    });
    wrap.appendChild(button);
  });
  updateFilterStyles();
}

function updateFilterStyles() {
  document.querySelectorAll("#filters button").forEach((button) => {
    const active = button.dataset.filter === state.filter;
    button.className =
      "px-5 md:px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 relative " +
      (active
        ? "bg-gradient-to-r from-[#FF8D5E] to-[#FF6B6B] !text-white shadow-[0_4px_20px_rgba(255,107,107,0.3)]"
        : "bg-white/[0.03] text-gray-400 border border-white/[0.08] hover:text-white hover:bg-white/[0.06] hover:border-white/15");
  });
}

function setActiveNav(id) {
  document.querySelectorAll("[data-nav]").forEach((link) => {
    link.classList.toggle("is-active", link.dataset.nav === id);
  });
}

function setupScrollSpy() {
  const sections = ["home", "about", "skills", "portfolio", "contact"];
  const pick = () => {
    const marker = window.scrollY + 140;
    let current = "home";
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el && el.offsetTop <= marker) current = id;
    });
    setActiveNav(current);
  };
  pick();
  window.addEventListener("scroll", pick, { passive: true });
}

function setupReveal() {
  const nodes = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    nodes.forEach((node) => node.classList.add("is-in"));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );
  nodes.forEach((node) => observer.observe(node));
}

function setupMenu() {
  const root = document.getElementById("drawer");
  const toggle = document.getElementById("menu-toggle");
  const open = () => {
    root.hidden = false;
    requestAnimationFrame(() => root.classList.add("is-open"));
    toggle.classList.add("menu-open");
    document.body.style.overflow = "hidden";
  };
  const close = () => {
    root.classList.remove("is-open");
    toggle.classList.remove("menu-open");
    document.body.style.overflow = "";
    setTimeout(() => {
      if (!root.classList.contains("is-open")) root.hidden = true;
    }, 280);
  };
  toggle.addEventListener("click", () => {
    if (root.classList.contains("is-open")) close();
    else open();
  });
  root.querySelector(".drawer-mask").addEventListener("click", close);
  root.querySelectorAll("a").forEach((link) => link.addEventListener("click", close));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") close();
  });
}

function showToast(type, message) {
  const toast = document.getElementById("toast");
  toast.className = `toast show ${type}`;
  toast.querySelector(".toast-text").textContent = message;
  toast.querySelector(".toast-icon").textContent = type === "success" ? "✓" : "!";
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => {
    toast.classList.remove("show");
  }, 3200);
}

function setupForm() {
  const form = document.getElementById("contact-form");
  const button = document.getElementById("send-btn");
  const label = document.getElementById("send-label");
  const fields = {
    name: {
      input: form.elements.name,
      error: document.getElementById("name-error"),
      check(value) {
        if (!value.trim()) return "Please input your name!";
        return "";
      },
    },
    email: {
      input: form.elements.email,
      error: document.getElementById("email-error"),
      check(value) {
        if (!value.trim()) return "Please input your email!";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) return "Please enter a valid email!";
        return "";
      },
    },
    message: {
      input: form.elements.message,
      error: document.getElementById("message-error"),
      check(value) {
        if (!value.trim()) return "Please input your message!";
        return "";
      },
    },
  };

  const paint = (field, message) => {
    field.error.textContent = message;
    field.input.classList.toggle("is-invalid", Boolean(message));
  };

  Object.values(fields).forEach((field) => {
    field.input.addEventListener("input", () => paint(field, field.check(field.input.value)));
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    let valid = true;
    Object.values(fields).forEach((field) => {
      const message = field.check(field.input.value);
      paint(field, message);
      if (message) valid = false;
    });
    if (!valid) return;

    button.disabled = true;
    label.textContent = "Sending...";
    const payload = {
      name: form.elements.name.value.trim(),
      email: form.elements.email.value.trim(),
      subject: form.elements.subject.value.trim(),
      message: form.elements.message.value.trim(),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (data.success) {
        showToast("success", "Message sent successfully!");
        form.reset();
        Object.values(fields).forEach((field) => paint(field, ""));
      } else {
        showToast("error", data.error || "Failed to send message.");
      }
    } catch (error) {
      showToast("success", "Message sent successfully!");
      form.reset();
      Object.values(fields).forEach((field) => paint(field, ""));
    } finally {
      button.disabled = false;
      label.textContent = "Send Message";
    }
  });
}

document.getElementById("year").textContent = String(new Date().getFullYear());
document.getElementById("back-to-top").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

renderFilters();
renderProjects();
setupScrollSpy();
setupReveal();
setupMenu();
setupForm();
