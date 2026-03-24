/** Public asset paths (files copied under /public/portfolio-assets) */
export const portfolioAssets = {
  /** Site screenshots for link preview cards (detail pages) */
  previewBsh: "/portfolio-assets/previews/bsh-homepage.png",
  previewJacobsCoffee: "/portfolio-assets/previews/jacobs-coffee.png",
  previewCalicutAirport: "/portfolio-assets/previews/calicut-airport.png",
  photo: "/portfolio-assets/photo.jpg",
  acmPdf: "/portfolio-assets/ACM_Conference_Proceedings_Primary_Article_Template__1_.pdf",
  thesisDemo: "/portfolio-assets/master-thesis/demo.mp4",
  thesisReport: "/portfolio-assets/master-thesis/Master%20thesis%20report.pdf",
  thesisPresentation: "/portfolio-assets/master-thesis/Master%20Thesis%20Presentation.pdf",
  timeSeriesPdf: "/portfolio-assets/time-series/Time%20series%20analysis.pdf",
  gisPdf: "/portfolio-assets/gis/GIS_Land_use_Land_Cover.pdf",
} as const

export interface PortfolioLink {
  label: string
  href: string
  /** Optional screenshot shown in the preview card for external web links */
  previewImage?: string
  /** Uses client-side gate + NEXT_PUBLIC_PORTFOLIO_ACCESS_PASSWORD (same behavior as old HTML site) */
  requiresPassword?: boolean
}

export interface PortfolioDetail {
  intro?: string
  techStack?: string[]
  highlights?: string[]
  responsibilities?: string[]
  achievements?: string[]
  features?: string[]
  topics?: string[]
  links?: PortfolioLink[]
  contactLines?: { label: string; value: string; href?: string }[]
  extraNote?: string
}

export interface SearchResult {
  id: string
  title: string
  url: string
  description: string
  category: string
  detail?: PortfolioDetail
}

export const portfolioData: SearchResult[] = [
  // About
  {
    id: "about-1",
    title: "About — Muhammed Saleem Kallan | AI Development & Integration",
    url: "portfolio/about/muhammed-saleem-kallan",
    description:
      "Muhammed Saleem Kallan — AI Development & Integration. LLMs, RAG, and applied AI for production systems. German (B2) actively learning | English C1.",
    category: "about",
    detail: {
      intro:
        "Experience spans AI applications, data engineering, software migration, automation, analytics, and digital product development — from chatbots and retrieval-augmented generation to search optimization, process automation, decision-support systems, and web development. Muhammed focuses on LLM/RAG in enterprise settings and responsible AI; supporting data and analytics work serves those systems where needed. Some project details are intentionally limited where confidentiality applies; methods, tools, and outcomes are highlighted.",
      topics: [
        "Role: AI Development & Integration",
        "Profile emphasis: LLM/RAG systems and production-oriented AI",
        "Languages: German (B2, actively learning) · English (C1)",
      ],
      links: [{ label: "Profile image (photo)", href: portfolioAssets.photo }],
    },
  },
  {
    id: "about-2",
    title: "Skills & Technologies — AI/ML, Data, Cloud",
    url: "portfolio/about/skills",
    description:
      "Python, SQL, R, MATLAB, TypeScript/JavaScript, C++, HTML/CSS, Lua · Elasticsearch, ETL, Azure OpenAI, ML/NLP · Power BI, DAX · Azure, AWS, Docker, CI/CD.",
    category: "about",
    detail: {
      intro:
        "Stack oriented toward building and shipping AI features: model integration, retrieval and vector search, data pipelines, and cloud deployment — alongside analytics and visualization where projects require it.",
      techStack: [
        "Python",
        "SQL",
        "R",
        "MATLAB",
        "JavaScript/TypeScript",
        "C++",
        "HTML/CSS",
        "Lua",
        "Power BI",
        "Elasticsearch",
        "ETL pipelines",
        "DAX / Power Query",
        "Microsoft Azure",
        "AWS",
        "Docker",
        "CI/CD",
        "Machine learning & NLP",
        "Time series & statistics",
        "Data visualization",
      ],
      highlights: [
        "Microsoft Azure Data Fundamentals",
        "Power BI Data Analyst Associate",
        "Google Data Analytics Professional Certificate",
        "AWS Cloud Practitioner",
      ],
      extraNote:
        "Additional tools: MS Office, Jira & Confluence, SharePoint, Power Automate, Visio & Miro, MS Project, AutoCAD, Jenkins & JFrog, Selenium, and core PM/quality practices. Concepts: BM25+, kNN retrieval, LLM benchmarking, Elasticsearch tuning, rules-as-data engines, LaTeX/PDF document workflows.",
    },
  },
  {
    id: "about-3",
    title: "Education & Academic Background — M.Eng. & B.Tech",
    url: "portfolio/about/education",
    description:
      "M.Eng. Mechatronic and Cyber-Physical Systems (TH Deggendorf, from Oct 2021). B.Tech Mechanical Engineering (Government Engineering College Kozhikode, Aug 2016 – Sept 2020).",
    category: "about",
    detail: {
      intro: "Advanced education in mechatronics, cyber-physical systems, and mechanical engineering.",
      achievements: [
        "M.Eng. Mechatronic and Cyber-Physical Systems — Deggendorf Institute of Technology (THD), Bavaria, Germany (from Oct 2021). Focus: robotics, autonomous systems, additive manufacturing/3D printing, cyber-physical systems, functional safety.",
        "B.Tech Mechanical Engineering — Government Engineering College, Kozhikode, Kerala, India (Aug 2016 – Sept 2020). Thesis: SI engine emission and characteristics for ethanol-butanol & gasoline blends. Focus: ICE, thermodynamics, fluid mechanics, sustainable energy.",
      ],
      links: [
        {
          label: "THD curriculum (PDF)",
          href: "https://www.th-deg.de/Studierende/Antraege-und-Organisatorisches/Modulhandbuecher/modulhandbuch_mmc_master_ws2024_mbmk.pdf",
        },
        { label: "GEC Kozhikode", href: "https://www.geckkd.ac.in/" },
        { label: "TH Deggendorf", href: "https://www.th-deg.de/en/" },
      ],
    },
  },

  // Experiments (other / supplementary projects)
  {
    id: "exp-1",
    title: "3D Design with Lua — Centrifugal Pump (IceSL)",
    url: "portfolio/experiments/lua-centrifugal-pump",
    description:
      "Parametric centrifugal pump and gear systems in Lua/IceSL: impeller, logarithmic spiral casing, STL export — from the “Other Projects” portfolio page.",
    category: "experiments",
    detail: {
      intro:
        "3D design and parametric modeling beyond pure software: centrifugal pump and gear-style geometry in Lua/IceSL with STL export for 3D printing — including a single-vane diagonal centrifugal pump taken from design through print to a working physical model.",
      features: [
        "Parametric centrifugal pump with adjustable parameters",
        "Single vane diagonal impeller geometry",
        "Logarithmic spiral casing",
        "Interactive UI parameters (IceSL)",
        "STL export for printing",
        "Gear system calculations",
      ],
      links: [{ label: "Pump Lua source (download)", href: "/portfolio-assets/centrifugal-pump/Pump_muhammed.lua" }],
      extraNote:
        "Interactive Three.js STL viewers and extra STL archives lived on `other-projects.html`. Copy the `Centrifugal pump design/` folder from the old portfolio if you want those binary assets under `/public` as well.",
    },
  },
  {
    id: "exp-2",
    title: "Restaurant Website — La Pizzetta (Munich)",
    url: "portfolio/experiments/lapizzetta",
    description:
      "Multilingual restaurant site: reservations, menu, applications, responsive layout — ristorante-lapizzetta.com.",
    category: "experiments",
    detail: {
      intro:
        "Responsive site for an SME restaurant: multilingual content, reservations, job applications, picture-based menu, and business-oriented blocks — ongoing development and maintenance.",
      features: [
        "Multilingual (German, English, Italian)",
        "Table reservations",
        "Menu with images, ingredients, pricing",
        "Job application / portal flow",
        "Responsive layout",
        "Online ordering and contact/location blocks",
      ],
      links: [
        { label: "Live site", href: "https://ristorante-lapizzetta.com/" },
        { label: "Menu", href: "https://ristorante-lapizzetta.com/menu/" },
      ],
    },
  },
  {
    id: "exp-3",
    title: "Hair Studio Paradiso — Salon Website (Netlify)",
    url: "portfolio/experiments/paradiso-hair",
    description:
      "Premium Munich salon site: multilingual, booking, services, gallery — paradiso-hairstyling.netlify.app.",
    category: "experiments",
    detail: {
      intro:
        "Client salon site: multilingual experience, booking, services, and gallery — representative of small-business web work alongside larger data/AI projects.",
      features: [
        "Multilingual (German, English)",
        "Online booking with time slots",
        "Service showcase and pricing",
        "Stylist profiles",
        "Responsive layout",
        "Gallery / portfolio imagery",
      ],
      links: [{ label: "Live site", href: "https://paradiso-hairstyling.netlify.app/" }],
    },
  },
  {
    id: "exp-4",
    title: "Optical Linear Encoders — MATLAB / Mathematica Research",
    url: "portfolio/experiments/optical-encoders",
    description:
      "Beam dynamics, DEA modeling, material analysis — MATLAB/Mathematica research codebase from the supplementary projects collection.",
    category: "experiments",
    detail: {
      intro:
        "Research-oriented work on beam frequency modes, dielectric elastomer actuators (DEA), and optical encoder–related modeling with MATLAB/Mathematica.",
      topics: [
        "DEA modeling and analysis",
        "Beam frequency modes and dynamics",
        "Multi-layer neutral axis determination",
        "Material mixture properties",
        "Nonlinear beam behavior",
        "BaTiO3 composite characterization",
      ],
      extraNote: "Supporting `.m` and notebook files remain under `Old portfolio/optical linear encoders/` if you need the full research bundle.",
    },
  },

  // Experience
  {
    id: "work-1",
    title: "Intern — Process Engineering · Jacobs Douwe Egberts (Nov 2022 – Apr 2023)",
    url: "portfolio/experience/jde-intern",
    description:
      "Global Engineering: KPI analytics, TCO modeling, process data standardization, quality analytics, supply-chain dashboards, sustainability modeling, cross-site analytics integration.",
    category: "experience",
    detail: {
      intro:
        "Internship in Global Engineering at Jacobs Douwe Egberts (JDE Peet’s), Bremen — data management, process management, and data-driven operational support alongside production analytics.",
      responsibilities: [
        "Built and maintained data pipelines and supporting analytics for operational KPIs",
        "Contributed to process standardization and more consistent cross-site reporting",
        "TCO and cost modeling for equipment investments and process improvements",
        "Decision-support analytics and dashboards for engineering and procurement stakeholders",
        "Quality analytics for packaging operations; defect reduction initiatives (~25% where cited in source)",
        "Supplier performance analytics and procurement dashboards",
        "Sustainability-related analytical models (e.g. pyrolysis / hydrogen initiatives context in source)",
        "Cross-functional collaboration with engineering and IT for operational analytics and coordination",
      ],
      links: [
        {
          label: "JDE",
          href: "https://www.jacobsdouweegberts.com/",
          previewImage: portfolioAssets.previewJacobsCoffee,
        },
      ],
    },
  },
  {
    id: "work-2",
    title: "Intern — Data Collection & Systems Analysis · Calicut International Airport (Oct 2020 – Jan 2021)",
    url: "portfolio/experience/calicut-airport",
    description:
      "Mechanical Engineering Department: operational data for fire safety & mechanical systems, documentation, performance monitoring, safety databases.",
    category: "experience",
    detail: {
      intro:
        "Bachelor’s internship (Oct 2020 – Jan 2021) with the Mechanical Engineering department at Calicut International Airport — exposure to data-centric operational environments and performance-focused analysis.",
      responsibilities: [
        "System performance analysis and monitoring-oriented data collection for mechanical and safety-related systems",
        "Operational data for fire safety and mechanical systems under aviation safety constraints",
        "Maintenance reports and data logs for critical infrastructure",
        "Equipment performance metrics and maintenance scheduling insights",
        "Safety incident and equipment status databases for compliance reporting",
      ],
      links: [
        {
          label: "Airport site",
          href: "https://www.aai.aero/en/airports/calicut",
          previewImage: portfolioAssets.previewCalicutAirport,
        },
      ],
    },
  },

  // Projects (main portfolio — index.html)
  {
    id: "proj-1",
    title: "Master Thesis — RAG Chatbot & Enterprise Knowledge Retrieval (BSH)",
    url: "portfolio/projects/master-thesis-rag-bsh",
    description:
      "Thesis at BSH: conversational layer on a SaaS process-storage platform — LLM+RAG, BM25+/kNN-style retrieval, Elasticsearch, Selenium scraping, Azure OpenAI + internal LLM evaluation, Flask UI. Grade: 1.2 / 5.0.",
    category: "projects",
    detail: {
      intro:
        "Master’s thesis at Bosch und Siemens Home Appliances (BSH): integrate an intelligent chatbot layer into an existing process-storage database on a SaaS platform that lacked an effective conversational interface — improving access to stored process knowledge. Explored database migration strategies and multiple RAG retrieval setups (including BM25+, kNN, and other search configurations) to improve answer quality and relevance.",
      techStack: [
        "Python",
        "Azure OpenAI",
        "Internal LLM (company-specific substitute)",
        "Elasticsearch",
        "Flask",
        "RAG",
        "NLP",
        "LangChain",
        "Selenium",
        "Web scraping",
        "SQL",
      ],
      achievements: [
        "Compared multiple LLM backends (Azure OpenAI and an internal fine-tuned LLM for company-specific use) with benchmarking to select the best-performing setup",
        "Experimented with fine-tuning an Azure-based LLM on an external dataset so the model better matched required output style (response-adaptation / business-aligned tone)",
        "Full-platform Selenium-based scrape; extract, clean, structure, and prepare data for retrieval",
        "Because direct RAG on the legacy database was constrained, used Elasticsearch as the retrieval layer — structured data for ES, indexing, and tuned configs for better retrieval performance",
        "Hybrid RAG architecture; large improvement in query response accuracy (45% in legacy portfolio text)",
        "Automated ETL via Python and Elasticsearch APIs; reduced retrieval latency ~60% via indexing/search tuning",
        "Ingested 10,000+ documents with strong uptime (91.2% in source); web scraping pipeline structuring 1,300+ dynamic HTML pages",
        "Full-stack Flask chatbot UI for live interaction",
      ],
      links: [
        { label: "Demo video (MP4)", href: portfolioAssets.thesisDemo },
        { label: "Thesis report (PDF)", href: portfolioAssets.thesisReport },
        { label: "Presentation (PDF)", href: portfolioAssets.thesisPresentation },
        {
          label: "BSH",
          href: "https://www.bsh-group.com/de/",
          previewImage: portfolioAssets.previewBsh,
        },
      ],
    },
  },
  {
    id: "proj-2",
    title: "Werkstudent — Intelligent Systems & Data Engineering (BSH)",
    url: "portfolio/projects/bsh-intelligent-systems",
    description:
      "Werkstudent @ BSH, Munich: legacy-to-Bosch migration packaging (Chocolatey), Power BI tracking, Power Automate, DAX/Power Query/SQL — alongside the thesis.",
    category: "projects",
    detail: {
      intro:
        "Working student in data and software engineering at BSH, alongside the master’s thesis. Part of the team migrating legacy software from the BSH environment to the Bosch network — creating ready-to-install packages using Chocolatey, testing them, and validating compliance with the new environment. Tracked migration and deployment progress with Power BI and related tooling.",
      techStack: [
        "Power BI",
        "Power Automate",
        "DAX",
        "Power Query",
        "SQL Server",
        "Microsoft Azure",
        "Python",
        "Chocolatey",
        "Jenkins",
        "JFrog",
        "SharePoint",
      ],
      responsibilities: [
        "Chocolatey packaging, testing, and validation for software migration to the Bosch network",
        "Migration and deployment progress tracking and reporting in Power BI",
        "Automation pipelines with Power Automate",
        "DAX, Power Query, and SQL for cleaning, manipulation, reporting, and process tracking",
        "Redesigned internal process data platform for usability, efficiency, scalability",
        "Integrated SQL Server, SharePoint, external APIs into unified warehouses",
        "CI/CD for data (Jenkins, JFrog Artifactory)",
        "Advanced Power BI dashboards with automated refresh",
        "Cleaned and modeled large SQL datasets for downstream analytics/AI",
        "Row-level security and role-based reporting",
        "Web-based training modules for standardized configuration",
      ],
      achievements: [
        "25+ intelligence dashboards; 30+ active engineering users (source text)",
        "Stronger data accuracy via validation, transforms, pipeline automation",
        "Faster decisions bridging classic BI with AI-ready infrastructure",
      ],
      links: [
        {
          label: "BSH",
          href: "https://www.bsh-group.com/de/",
          previewImage: portfolioAssets.previewBsh,
        },
      ],
    },
  },
  {
    id: "proj-3",
    title: "Time Series Analysis & Predictive Modeling (Environmental / Dendro data)",
    url: "portfolio/projects/time-series-drought",
    description:
      "Long-term environmental time series in R: drought impacts, resilience scoring, ARIMA/RF modeling — report PDF in portfolio assets.",
    category: "projects",
    detail: {
      intro:
        "Tree-ring width and environmental time series in R: long-term climate and drought analysis, predictive modeling, and statistical learning — evaluating system responses to extreme climate events and forecasting impacts for decision support.",
      techStack: ["R", "Time series", "Statistics", "ggplot2", "forecast", "caret", "randomForest"],
      achievements: [
        "30+ years of multivariate series processed",
        "Drought impact model ~89% accuracy across scenarios (source text)",
        "Resilience scoring framework",
        "Automated visualization dashboards",
        "Patterns, forecasts, and automated insights for environmental decision support",
      ],
      links: [{ label: "Analysis report (PDF)", href: portfolioAssets.timeSeriesPdf }],
    },
  },
  {
    id: "proj-4",
    title: "Guided AI Ethics Assessment Tool — Research Paper (ACM-style PDF)",
    url: "portfolio/projects/ai-ethics-assessment-paper",
    description:
      "ACM paper + rules-as-data ethics engine; companion web app (EU AI–style compliance workflow). PDF password-gated like the legacy site.",
    category: "projects",
    detail: {
      intro:
        "Co-authored ACM Digital Library publication: a Guided AI Ethics Assessment Tool — interactive questionnaire plus rules-as-data architecture to evaluate purpose, data sources, and capabilities, then produce prioritized risk reports and transparent decision traces. Aligns with EU AI Act and UNESCO-style guidance. The team also built a companion web app: decision-tree-style workflow where users enter project information; the system estimates compliance with EU AI expectations and generates supporting documentation for evidence and later review.",
      techStack: ["Python", "JSON", "Rules-as-data", "Interactive systems", "Responsible AI", "Web application"],
      achievements: [
        "Macro-averaged recall 94.1% and F1 0.898 over 70 synthetic scenarios (source)",
        "Versioned JSON rules engine for deterministic evaluation, curriculum adaptability, and transparent reasoning",
        "Validated across generative AI, biometrics, autonomous systems, and related risk categories",
        "Risk assessment reports and educational decision traces for auditable, repeatable ethics review",
        "Peer-reviewed ACM dissemination",
      ],
      links: [
        {
          label: "Research paper (PDF, protected)",
          href: portfolioAssets.acmPdf,
          requiresPassword: true,
        },
      ],
    },
  },
  {
    id: "proj-6",
    title: "Context-Aware Job Application Tracker — Resume & Cover Letter Generator (WIP)",
    url: "portfolio/projects/job-application-tracker",
    description:
      "In development: structured profile ingestion (resume, LinkedIn, links, reports), RAG-backed job-specific resume and cover letter generation, templates, PDF/LaTeX export, live editing.",
    category: "projects",
    detail: {
      intro:
        "Ongoing build of a job-application tracker combined with resume and cover-letter generation. Users supply profile material (resume, LinkedIn, links, reports, other documents); the system builds a structured user database. When a job description is supplied, an attached LLM uses stored context with RAG/context retrieval to generate a tailored resume and cover letter in one action — a context-aware document system with multiple resume templates, PDF output, LaTeX output, and post-generation editing similar to document tools. Not yet completed.",
      techStack: [
        "LLM integration",
        "RAG / context retrieval",
        "Document generation",
        "PDF",
        "LaTeX",
        "Web application",
      ],
      features: [
        "Application tracking",
        "Structured ingestion from resume, LinkedIn, and other sources",
        "Job-description-conditioned resume and cover letter",
        "Multiple resume templates",
        "PDF and LaTeX export",
        "Live editing after generation",
      ],
      extraNote: "Repository and live demo can be linked here when you are ready to share them publicly.",
    },
  },
  {
    id: "proj-5",
    title: "Geospatial Analysis & Remote Sensing (QGIS + R)",
    url: "portfolio/projects/gis-remote-sensing",
    description:
      "Land use / land cover, NDVI, erosion-prone zones, multi-temporal imagery — PDF report migrated to /public/portfolio-assets/gis/.",
    category: "projects",
    detail: {
      intro:
        "Geospatial research: classification, NDVI, erosion mapping, multi-temporal imagery, spatial statistics — summarized from the supplementary projects page.",
      techStack: ["R", "QGIS", "Remote sensing", "NDVI", "Spatial statistics", "Random Forest"],
      features: [
        "Land cover classification",
        "NDVI vegetation health",
        "Erosion-prone zone mapping",
        "Multi-temporal processing",
        "Change detection & reporting automation",
      ],
      links: [{ label: "Research report (PDF)", href: portfolioAssets.gisPdf }],
      extraNote: "Full GIS folder (R scripts, images) still lives under `Old portfolio/GIS and R/` for complete reproduction.",
    },
  },

  // Writing — long-form PDFs & presentations
  {
    id: "blog-1",
    title: "Master Thesis Report — PDF Download",
    url: "portfolio/writing/master-thesis-report",
    description:
      "Full thesis report documenting the BSH RAG/chatbot and pipeline (PDF under portfolio-assets).",
    category: "writing",
    detail: {
      intro: "Comprehensive thesis document: objectives, literature, architecture, RAG pipeline, Elasticsearch, evaluation, and recommendations.",
      links: [{ label: "Download thesis report (PDF)", href: portfolioAssets.thesisReport }],
    },
  },
  {
    id: "blog-2",
    title: "Master Thesis Presentation — PDF",
    url: "portfolio/writing/master-thesis-presentation",
    description: "Slide deck for the master thesis defense (PDF).",
    category: "writing",
    detail: {
      intro: "Presentation materials summarizing the thesis outcomes for academic review.",
      links: [{ label: "Open presentation (PDF)", href: portfolioAssets.thesisPresentation }],
    },
  },
  {
    id: "blog-3",
    title: "Time Series Analysis — PDF Report",
    url: "portfolio/writing/time-series-report",
    description: "Written report companion to the drought/time-series modeling work.",
    category: "writing",
    detail: {
      intro: "PDF export of the time series analysis and modeling narrative.",
      links: [{ label: "Open report (PDF)", href: portfolioAssets.timeSeriesPdf }],
    },
  },
  {
    id: "blog-4",
    title: "GIS Land Use & Land Cover — PDF Report",
    url: "portfolio/writing/gis-land-use-report",
    description: "Geospatial research write-up: Freising/Bavaria style analysis from the legacy project page.",
    category: "writing",
    detail: {
      intro: "Land use / cover and NDVI-focused research report (migrated PDF).",
      links: [{ label: "Open GIS report (PDF)", href: portfolioAssets.gisPdf }],
    },
  },

  // Contact
  {
    id: "contact-1",
    title: "Email & Contact Form — Muhammed Saleem Kallan",
    url: "portfolio/contact/email",
    description:
      "Email: kallensaleem@gmail.com · Contact form via Formspree (legacy endpoint).",
    category: "contact",
    detail: {
      intro:
        "Direct email and hosted contact form (same Formspree endpoint as the legacy HTML portfolio).",
      contactLines: [
        { label: "Email", value: "kallensaleem@gmail.com", href: "mailto:kallensaleem@gmail.com" },
        { label: "Contact form", value: "Formspree", href: "https://formspree.io/f/myzdolgb" },
      ],
      extraNote: "Typical response: within a few business days — adjust if you use a different SLA.",
    },
  },
  {
    id: "contact-2",
    title: "LinkedIn — Muhammed Saleem Kallan",
    url: "portfolio/contact/linkedin",
    description: "Professional profile: linkedin.com/in/muhammed-saleem-kallan",
    category: "contact",
    detail: {
      intro: "Professional networking and work history.",
      links: [{ label: "Open LinkedIn", href: "https://www.linkedin.com/in/muhammed-saleem-kallan-499227127/" }],
    },
  },
  {
    id: "contact-3",
    title: "GitHub — @saleemkallen",
    url: "portfolio/contact/github",
    description: "Open source and project code: github.com/saleemkallen",
    category: "contact",
    detail: {
      intro: "Code and experiments — including AI/RAG-related work where shared publicly.",
      links: [{ label: "Open GitHub", href: "https://github.com/saleemkallen" }],
    },
  },
  {
    id: "contact-4",
    title: "Web Projects — Restaurants & Studios",
    url: "portfolio/contact/more-links",
    description: "La Pizzetta and Hair Studio Paradiso live sites referenced on the legacy “Other Projects” page.",
    category: "contact",
    detail: {
      links: [
        { label: "La Pizzetta", href: "https://ristorante-lapizzetta.com/" },
        { label: "Hair Studio Paradiso", href: "https://paradiso-hairstyling.netlify.app/" },
      ],
    },
  },
]

/** Entries with `category: "projects"` for landing tiles and project listings. */
export const portfolioProjects = portfolioData.filter((item) => item.category === "projects")

/** Landing: GIS and spatial report last in the Data & AI row; in-progress job tool before GIS. */
export const portfolioLandingProjects: SearchResult[] = (() => {
  const byId = (id: string) => portfolioProjects.find((p) => p.id === id)
  const ordered = ["proj-1", "proj-2", "proj-3", "proj-4", "proj-6", "proj-5"].map((id) => byId(id))
  return ordered.filter((p): p is SearchResult => p != null)
})()

/** Work history entries for landing. */
export const portfolioExperience = portfolioData.filter((item) => item.category === "experience")

/** Client / commercial websites (from supplementary “Other projects”). */
export const portfolioWebProjects = portfolioData.filter((item) => item.id === "exp-2" || item.id === "exp-3")

/** 3D Lua & research experiments (non-web). */
export const portfolioEngineeringExperiments = portfolioData.filter(
  (item) => item.id === "exp-1" || item.id === "exp-4",
)

export const searchSuggestions = [
  "about",
  "about Muhammed Saleem Kallan",
  "Muhammed Saleem Kallan",
  "skills",
  "education",
  "TH Deggendorf",
  "experiments",
  "Lua pump",
  "La Pizzetta",
  "Paradiso",
  "optical encoders",
  "experience",
  "BSH",
  "JDE",
  "Calicut airport",
  "projects",
  "master thesis",
  "RAG",
  "Elasticsearch",
  "time series",
  "GIS",
  "job tracker",
  "resume generator",
  "AI ethics",
  "writing",
  "thesis report",
  "contact",
  "email",
  "linkedin",
  "github",
  "formspree",
]

export const categoryMap: Record<string, string[]> = {
  about: ["about", "who", "skills", "education", "background", "muhammed", "saleem", "kallan"],
  experiments: ["experiments", "other projects", "lua", "lapizzetta", "paradiso", "encoders", "3d"],
  experience: ["experience", "work", "job", "career", "employment", "intern"],
  projects: ["projects", "portfolio", "apps", "built", "created", "thesis", "bsh", "rag"],
  writing: ["writing", "blog", "posts", "articles", "pdf", "report", "thesis"],
  contact: ["contact", "reach", "email", "social", "connect", "github", "linkedin", "form"],
}

export function searchPortfolio(query: string): SearchResult[] {
  const lowerQuery = query.toLowerCase().trim()

  if (!lowerQuery) return []

  for (const [category, keywords] of Object.entries(categoryMap)) {
    if (keywords.some((keyword) => lowerQuery.includes(keyword))) {
      return portfolioData.filter((item) => item.category === category)
    }
  }

  return portfolioData.filter(
    (item) =>
      item.title.toLowerCase().includes(lowerQuery) || item.description.toLowerCase().includes(lowerQuery),
  )
}
