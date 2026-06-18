// src/utils/constants.js
export const CAROUSEL_CONFIG = {
    ANIMATION_DURATION: 600,
    AUTO_PLAY_INTERVAL: 5000,
    DRAG_THRESHOLD: 50,
  };
  
  export const QUOTES = {
    home: {
      text: "I    HAVE    NO    SPECIAL\nTALENT.    I    AM    ONLY\nPASSIONATELY    CURIOUS.",
      author: "ALBERT EINSTEIN"
    },
    podcast: {
      text: "FACTS    DO     NOT    CEASE\nTO    EXIST    BECAUSE    THEY\nARE     IGNORED.",
      author: "ALDOUS HUXLEY"
    },
    blog: {
      text: "I     WRITE     TO     UNDERSTAND\nWHAT     I'M     THINKING.",
      author: "JOAN DIDION"
    },
    projects: {
      text: "TO     THINK     IS     TO\nEXPERIMENT.",
      author: "GILLES DELEUZE"
    },
    connect: {
      text: "SIMPLICITY    IS     THE\nULTIMATE     SOPHISTICATION.",
      author: "LEONARDO DA VINCI"
    }
  };
  
  export const SECTION_CONTENT = {
    podcast: {
      title: "ABOUT",
      label: "DISCOVER",
      subtitle: "[DISCOVER]",
      description: "A record of the experiences, projects, and ideas that have shaped my perspective.\n\nMy interests span intelligence, technology, design, and human systems. Through building, research, and experimentation, I explore how ideas evolve into products, organizations, and technologies that shape the world around us.\n\nThis page provides the context behind that work.",
    },
    blog: {
      title: "WRITING",
      label: "READ",
      subtitle: "[READ]",
      description: "A space for thoughts across design, systems, culture, and perspective. Each piece follows how ideas connect and how concepts take form over time — exploring thoughts in progress, connections, and moments of clarity.",
    },
    projects: {
      title: "PROJECTS",
      label: "EXPLORE",
      subtitle: "[EXPLORE]",
      description: "An ongoing collection of works through creation and exploration. Each project experiments with how structure, logic, and design shape what’s possible — solving problems through research and intuitition.",
    },
    connect: {
      title: "CONNECT",
      label: "CONTACT",
      subtitle: "[CONTACT]",
      description: "Interested in collaborating, discussing ideas, or just saying hello? Best way to reach me is email. I read most of these and respond when I can. Also available on LinkedIn and GitHub for professional connections.",
    }
  };
  
  export const PROJECTS = [
    {
        name: "OBIUS",
        description: "Download Now",
        url: "https://obius.io",
        logo: "/obius-logo.png",
        bg: "#2b2b2b"
      },
    {
      name: "BOUNCR",
      description: "Try out the demo",
      url: "https://thebouncr.com",
      logo: "/bouncr-logo.png",
      bg: "#ffffff"
    },
    {
      name: "DROMO",
      description: "Coming Soon",
      url: "https://www.dromo.fit",
      bg: "#1a1a1a",
      textColor: "#22d3ee"
    }

  ];
  
  export const CONTACTS = [
    {
      label: "EMAIL",
      value: "demetri@rrsrch.com",
      url: "mailto:demetri@rrsrch.com"
    },
    {
      label: "LINKEDIN",
      value: "Demetri Hodges",
      url: "https://www.linkedin.com/in/demetri-hodges-418534195/"
    },
    {
      label: "X",
      value: "@demetrixyz",
      url: "https://x.com/demetrixyz"
    },
    {
      label: "SUBSTACK",
      value: "@demetrixyz",
      url: "https://substack.com/@demetrixyz"
    },
  ];

  // Blog posts array - add your posts here
export const BLOG_POSTS = [
    {
        id: 6,
        title: "The Great Forgetting",
        date: "June 2026",
        slug: "the-great-forgetting",
        url: "/papers/the-great-forgetting.pdf"
    },
    {
        id: 5,
        title: "The Doldrums",
        date: "June 2026",
        slug: "the-doldrums",
        url: "/papers/the-doldrums.pdf"
    },
    {
        id: 4,
        title: "Mass Drift Theory",
        date: "May 2025",
        slug: "mass-drift-theory",
        url: "/papers/Mass Drift Theory- A Macrodynamic Framework for Systemic Shifts in Collective Opinion.pdf"
    },

    // Add more posts as needed dont forget comma
  ];