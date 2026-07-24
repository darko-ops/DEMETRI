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
    },
    sound: {
      text: "AMBIENT     MUSIC     MUST     BE\nAS     IGNORABLE     AS     IT\nIS     INTERESTING.",
      author: "BRIAN ENO"
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
    },
    sound: {
      title: "SOUND",
      label: "LISTEN",
      subtitle: "[LISTEN]",
      description: "A rotating playlist of what plays while I work — ambient, instrumental, and everything in between. Music for thinking, building, and riding elevators.",
    }
  };
  
  export const PROJECTS = [
    {
        name: "OBIUS",
        description: "The flagship. Available to download now.",
        url: "https://obius.io",
        logo: "/obius-logo.png",
        bg: "#2b2b2b"
      },
    {
      name: "BOUNCR",
      description: "An interactive demo you can try in the browser.",
      url: "https://thebouncr.com",
      logo: "/bouncr-logo.png",
      bg: "#ffffff"
    },
    {
      name: "RRSRCH",
      description: "Memory infrastructure for AI agents",
      url: "https://rrsrch.com",
      bg: "#000000",
      // Match the rrsrch.com hero wordmark: Inter 800, tight tracking
      wordmarkStyle: {
        fontWeight: 800,
        letterSpacing: "-0.1em",
        lineHeight: 0.9,
        fontSize: "3rem"
      }
    },
    {
      name: "DAED",
      description: "Headquarters",
      url: "https://daed.io",
      bg: "#faf7f2",
      textColor: "#000000",
      wordmark: "æ",
      wordmarkStyle: {
        fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
        fontWeight: 700,
        fontSize: "5rem",
        letterSpacing: "0"
      }
    },
    {
      name: "DRØMO",
      description: "In development — launching soon.", // Placeholder copy
      url: "https://www.dromo.fit",
      comingSoon: true,
      bg: "#1a1a1a",
      textColor: "#22d3ee"
    }

  ];
  
  // Sound page — the "Circular Ruins" playlist rendered on /sound/.
  export const SOUND = {
    playlistUrl: "https://open.spotify.com/playlist/33vKbD3sBJAoA1XtQlLT2y",
    tracks: [
      { title: "'BIMMER'", artist: "Passing Currents", url: "https://open.spotify.com/track/46NbAamUC9bSoZVSBYqaSF", previewUrl: "https://p.scdn.co/mp3-preview/e151cb06f78de4967175a5c2f210ae5a8cbf91ad", art: "https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e0298a9dcb84ee94a87e10575dd" },
      { title: "through the night", artist: "LOMAJI", url: "https://open.spotify.com/track/42CsrwtgmKKvNgNX2ij5ks", previewUrl: "https://p.scdn.co/mp3-preview/85d9dd38676f1e61b06eb7b99d22eb0391cae89f", art: "https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02cdfd561f7d4459380dd13581" },
      { title: "Alberto Balsalm", artist: "Aphex Twin", url: "https://open.spotify.com/track/6gbmylJ7sB7NFfMfTQHosf", previewUrl: "https://p.scdn.co/mp3-preview/8fb691a8c44cb0b80e33c55fd813c6d0400e5620", art: "https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e024bcecb123363f1f0f869257c" },
      { title: "Avril 14th", artist: "Aphex Twin", url: "https://open.spotify.com/track/1uaGSDFsLdReQgg8p7Obwh", previewUrl: "https://p.scdn.co/mp3-preview/b4868232b4b2c1e04164f98740fd40bbff51859e", art: "https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e022e261a0b1b19d0ff95e346b3" },
      { title: "#3", artist: "Aphex Twin", url: "https://open.spotify.com/track/7glKwbR1DyuIuE6XvZvJbQ", previewUrl: "https://p.scdn.co/mp3-preview/fb49a7d2589b5c7c162c16e46daf69a087876cef", art: "https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e028155dc4dae262f31d39d8296" },
      { title: "Xtal", artist: "Aphex Twin", url: "https://open.spotify.com/track/7o2AeQZzfCERsRmOM86EcB", previewUrl: "https://p.scdn.co/mp3-preview/b0300153aaed9f616a55b67b008a936e28dc3e07", art: "https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e0238906032688bb13b135ce19a" },
      { title: "We Chose You", artist: "Passing Currents", url: "https://open.spotify.com/track/1Pvn1rrZaY1QePkIBnOklS", previewUrl: "https://p.scdn.co/mp3-preview/165b60c58b846fbcab5102c05ca26363333f5c8a", art: "https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e022357d5dd6c71b5576c4df539" },
      { title: "ECSTASY", artist: "Passing Currents, Nedaj", url: "https://open.spotify.com/track/5lNRpG7TIKrR0fNvyvcmWi", previewUrl: "https://p.scdn.co/mp3-preview/53cda60224973219ca5bd6636f4beff71486ac5b", art: "https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e02862f720d8c90dd9a3da3bbfe" },
      { title: "SMILEs", artist: "Passing Currents", url: "https://open.spotify.com/track/0H3NJf4dalsBgByaftUDve", previewUrl: "https://p.scdn.co/mp3-preview/9b78d3dca75b6115ef3dbab261eaa4c52b9c4767", art: "https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e02c1123865525a720e76a06b96" },
      { title: "Movements (Chapter III)", artist: "Leon Vynehall", url: "https://open.spotify.com/track/1OD2YXIOmfYmBAYfV1maRV", previewUrl: "https://p.scdn.co/mp3-preview/342724a3fff6630345242672337bc7fa60b93efe", art: "https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e021dd077d4085d0667ecd01bf9" },
      { title: "Falaise", artist: "Floating Points", url: "https://open.spotify.com/track/3rkJH9BaiCWpRY718WTkBP", previewUrl: "https://p.scdn.co/mp3-preview/e009dee6833a481b87d2a2fbe2eb84c26487161b", art: "https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e02216a393a7606aa7de52c4636" },
      { title: "zero", artist: "boy 2000", url: "https://open.spotify.com/track/7nwzk0lVlyP8a6nDAIMrHm", previewUrl: "https://p.scdn.co/mp3-preview/cfb02b06c9d8288b5586f978997df9fb000f4620", art: "https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e0232b13fd68791da3d1ad8fd6b" },
      { title: "Pulsewidth", artist: "Aphex Twin", url: "https://open.spotify.com/track/643gyipSU7dkmrFhJ8UAIm", previewUrl: "https://p.scdn.co/mp3-preview/77bbeaf9f98d5433ef142fb31ef379c8c9c46978", art: "https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e0238906032688bb13b135ce19a" },
      { title: "UNDRESS", artist: "Passing Currents", url: "https://open.spotify.com/track/62OqqOKP1mJLJaz69U4N6h", previewUrl: "https://p.scdn.co/mp3-preview/9d0eea5f20991641fcbf3d725184bc555bf6e6d1", art: "https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e02f8a476ba28558258cb4f1954" },
      { title: "Fingerbib", artist: "Aphex Twin", url: "https://open.spotify.com/track/2hcywxHZcxmX27lX5qm8MT", previewUrl: "https://p.scdn.co/mp3-preview/ca3cb1df9488aabe08b66e9f6240e0a2ededc4a8", art: "https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e021298f1ce7b0e4fb6a3caba57" },
      { title: "aisatsana [102]", artist: "Aphex Twin", url: "https://open.spotify.com/track/5ljMlD10En5rRGZU0cs2Np", previewUrl: "https://p.scdn.co/mp3-preview/6ac0d0ad805fdfd9d1e6e87c54a64e80580ded8b", art: "https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e026ea96ba633bead24af562890" },
    ],
  };

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
        id: 9,
        title: "The Fairness–Discoverability Ceiling",
        date: "June 2026",
        slug: "the-fairness-discoverability-ceiling",
        url: "/papers/the-fairness-discoverability-ceiling.pdf"
    },
    {
        id: 8,
        title: "The Test That Broke Because the AI Was Right",
        date: "June 2026",
        slug: "the-test-that-broke",
        url: "/papers/the-test-that-broke.pdf"
    },
    {
        id: 7,
        title: "The Lies I Loved",
        date: "June 2026",
        slug: "the-lies-i-loved",
        url: "/papers/the-lies-i-loved.pdf"
    },
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