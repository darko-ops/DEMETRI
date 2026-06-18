// src/content/about.js
// Single source for the About content, shared by the homepage section
// (PodcastSection) and the standalone /about/ page (AboutPage).

export const BACKGROUND = [
  "Demetri Hodges is a builder, researcher, and technologist exploring the intersection of intelligence, software, and human systems.",
  "Driven by curiosity and a bias toward building, Demetri spends his time creating products, conducting research, and experimenting with new forms of intelligence—from software agents and AI infrastructure to economic systems and human-computer interaction.",
  "He is drawn to simple, intuitive design and the belief that sophistication is best expressed through clarity. Build relentlessly. Learn continuously. Follow ideas wherever they lead.",
];

export const EXPERIENCE = [
  {
    org: "Coalfire",
    location: "Remote",
    roles: [
      { title: "Consultant", date: "March 2026 – Present" },
      { title: "Associate", date: "July 2023 – March 2026" },
    ],
    description: "Coalfire works at the cutting edge of technology to help public and private sector organizations solve their toughest cybersecurity problems and fuel their overall success.",
    bullets: [
      "Managed projects and fostered collaboration within cross-functional teams to ensure timely project completion.",
      "Contributed to the success of over 50 projects, encompassing dozens of applications, systems, and platforms.",
      "Enhanced clients' security posture by developing impactful reports and recommendations aligned with security guidelines.",
      "Built strong customer relationships through the provision of expert cybersecurity guidance.",
      "Tested and validated non-technical and technical security controls, maintaining compliance through thorough audit reviews.",
      "Engineered tools to automate repetitive processes, reduce manual effort, and support scalable security operations.",
    ],
  },
  {
    org: "HFE CS",
    location: "Winston Salem, NC",
    roles: [{ title: "Project Intern", date: "July 2021 – August 2022" }],
    description: "HFE is a cybersecurity consulting firm focusing on enterprise security through agile practices.",
    bullets: [
      "Developed companywide deliverables for onboarding employees and customers.",
    ],
  },
  {
    org: "Archer Advanced Rubber Components",
    location: "Winston Salem, NC",
    roles: [{ title: "Project Intern", date: "June 2021 – August 2021" }],
    description: "Archer assists with the design and manufacturing of custom rubber products. Being ISO certified, Archer operates with effective processes to ensure the highest quality of modern services.",
    bullets: [
      "Utilized MRP/ERP software to update data and maintain efficient processes.",
    ],
  },
  {
    org: "Winston Starts",
    location: "Winston Salem, NC",
    roles: [{ title: "Intern", date: "June 2018 – July 2018" }],
    description: "Winston Starts is a non-profit organization that develops startups into innovative companies.",
    bullets: [
      "Aided in web page design and implementation for the company website.",
    ],
  },
  {
    org: "Wake Forest Institute of Regenerative Medicine (WFIRM)",
    location: "Winston Salem, NC",
    roles: [{ title: "Project Intern", date: "June 2017 – August 2017" }],
    description: "WFIRM is a leader in translating scientific discovery into clinical therapies. The lab was the first in the world to engineer laboratory-grown organs that were successfully implanted into humans.",
    bullets: [],
  },
];

export const EDUCATION = [
  {
    org: "Virginia Polytechnic Institute and State University",
    sub: "Pamplin College of Business — Blacksburg, VA",
    detail: "B.S. in Business Information Technology, Cybersecurity Management and Analytics (CMA)",
    date: "2023",
  },
  {
    org: "Amazon Web Services",
    detail: "AWS Certified Cloud Practitioner",
    date: "Issued February 2024",
  },
];

// Short, credential-rich summary used for the /about/ page meta description.
export const ABOUT_SUMMARY =
  "Demetri Hodges — Consultant at Coalfire. Cybersecurity and technology background; B.S. in Business Information Technology (Cybersecurity Management & Analytics) from Virginia Tech, and AWS Certified Cloud Practitioner.";
