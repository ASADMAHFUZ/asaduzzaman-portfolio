export const PAGE_SIZE = 6;
export const FILTERS = ["All", "Website Design", "Mobile App Design", "Game Design", "Branding"];

/**
 * productType (for future edits):
 * - "saas" or "both" → list under Website Design + Mobile App Design
 * - "website" → Website Design only
 * - "app" → Mobile App Design only
 * - omit and set `categories` manually for Game Design / Branding / custom mixes
 */
export function getProjectCategories(project) {
  if (Array.isArray(project.categories) && project.categories.length > 0) {
    return project.categories;
  }

  if (project.productType === "saas" || project.productType === "both") {
    return ["Website Design", "Mobile App Design"];
  }
  if (project.productType === "website") return ["Website Design"];
  if (project.productType === "app") return ["Mobile App Design"];

  if (project.category) return [project.category];
  return [];
}

export function projectMatchesFilter(project, filter) {
  if (filter === "All") return true;
  return getProjectCategories(project).includes(filter);
}

export function getProjectBadge(project, activeFilter = "All") {
  const categories = getProjectCategories(project);
  if (activeFilter !== "All" && categories.includes(activeFilter)) {
    return activeFilter;
  }
  if (categories.length <= 1) return categories[0] || "";
  return categories.map((name) => name.replace(" Design", "")).join(" · ");
}

export const PROJECTS = [
  {
    id: 3,
    title: "Dokter For You",
    subtitle: "SaaS · Website / App",
    description: "Health & Medical platform",
    productType: "saas",
    categories: ["Website Design", "Mobile App Design"],
    image: "/images/dokter.jpg",
    links: {
      figma:
        "https://www.figma.com/design/UWOebS5VoH1SANwcA4E5jJ/Healthcare-Platform-Website?node-id=0-1&t=j31GsDVMnBtL7mMW-1",
      behance:
        "https://www.behance.net/gallery/239235413/Dokter-For-You-Health-care-(website-app)-project",
      website: "https://www.dokterforyou.com/en",
    },
  },
  {
    id: 1,
    title: "Luggage Tracking App for travelers",
    subtitle: "MVP / SaaS · Mobile App",
    description: "Trkli — tracking device app",
    productType: "app",
    categories: ["Mobile App Design"],
    image: "/images/trkli.jpg",
    links: {
      figma:
        "https://www.figma.com/design/ujb90RccE3ypavkWbp5Lz3/Luggage-Tracking-App?node-id=0-1&t=crt7wZWSUXmtOGim-1",
      behance: "https://www.behance.net/gallery/256234413/Luggage-Tracking-Appfor-travelers",
      app: "https://apps.apple.com/il/app/trkli/id6749178737",
    },
  },
  {
    id: 2,
    title: "Freewater RPG Game",
    subtitle: "UX/UI Case Study",
    description: "RPG mobile game",
    categories: ["Game Design"],
    image: "/images/freewater.jpg",
    links: {
      figma:
        "https://www.figma.com/design/UrACttMBiq4PCiMspElTty/Learning-Renaissance-vr-mobile-game?node-id=0-1&t=MBi3FBGfAblDEWFL-1",
      behance: "https://www.behance.net/gallery/257345143/Freewater-RPG-Game-Case-Study",
    },
  },
  {
    id: 4,
    title: "CareerMate AI",
    subtitle: "Smart Career Companion",
    description: "UI/UX Case Study",
    productType: "website",
    categories: ["Website Design"],
    image: "/images/careermate.png",
    imagePosition: "object-top",
    links: {
      behance:
        "https://www.behance.net/gallery/243778937/CareerMate-AI-Smart-Career-Companion-UIUX-Case-Study",
    },
  },
  {
    id: 5,
    title: "CareBox",
    subtitle: "Give New Life to Unused Essentials",
    description: "A Social Impact UX Case Study",
    productType: "app",
    categories: ["Mobile App Design"],
    image: "/images/carebox.png",
    links: {
      behance:
        "https://www.behance.net/gallery/229055999/CareBox-Give-New-Life-to-Unused-Essentials",
    },
  },
  {
    id: 6,
    title: "Dragon Quest",
    subtitle: "Fantasy RPG",
    description: "Epic Adventure Gaming Experience",
    categories: ["Game Design"],
    image: "/images/carebox.png",
    links: {
      figma: "https://figma.com/dragonquest",
      behance: "https://behance.net/dragonquest",
    },
  },
  {
    id: 7,
    title: "Dragon Quest",
    subtitle: "Fantasy RPG",
    description: "Epic Adventure Gaming Experience",
    categories: ["Game Design"],
    image: "/images/carebox.png",
    links: {
      figma: "https://figma.com/dragonquest",
      behance: "https://behance.net/dragonquest",
    },
  },
];
