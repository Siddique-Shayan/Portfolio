/**
 * Single source of truth for every piece of personal/portfolio content.
 * No component should hardcode personal information — it all flows from here.
 *
 * Data precedence: resume.pdf (public/resume/resume.pdf) > fallback values below.
 * The resume currently shipped is a placeholder (0 bytes), so everything below
 * is the fallback data supplied directly. Replace the PDF with a real resume
 * and update the fields below to keep them in sync.
 */

export const siteUrl = 'https://siddique-shayan.vercel.app'

export const profile = {
  name: 'Shayan Siddique',
  initials: 'SS',
  title: 'Backend & AI Engineer',
  taglines: [
    'Backend Engineer',
    'AI Engineer',
    'Full Stack Developer',
    'Java & Spring Boot Developer',
    'FinTech Developer',
  ],
  bio:
    "I build backend systems and AI-powered products — from cloud-native REST APIs on AWS to " +
    "Retrieval-Augmented-Generation assistants wired into real financial workflows. I care most " +
    "about the parts users never see: clean data models, dependable APIs, and services that hold " +
    "up in production.",
  shortBio:
    'Backend & AI engineer building production-grade REST APIs, cloud deployments, and ' +
    'Generative-AI features with Java, Spring Boot, and modern LLM tooling.',
  location: 'Mumbai, India',
  email: 'shayanmohd463@gmail.com',
  phone: '+91 93217 67989',
  avatar: '/images/profile.jpg',
  resumeUrl: '/resume/resume.pdf',
  availableForWork: true,
  currentlyLearning: ['System Design at scale', 'Model Context Protocol (MCP)', 'Kubernetes'],
  goals:
    'Growing into a backend/AI systems engineer who can take a product from a rough idea to a ' +
    'reliable, observable service running in production — and keep learning the AI tooling that ' +
    'is reshaping how that gets built.',
}

export const hero = {
  greeting: "Hi, I'm",
  name: profile.name,
  roles: profile.taglines,
  description: profile.shortBio,
  ctaPrimary: { label: 'Download Resume', href: profile.resumeUrl },
  ctaSecondary: { label: 'Contact Me', href: '#contact' },
}

export const socialLinks = [
  { key: 'github', label: 'GitHub', href: 'https://github.com/Siddique-Shayan', icon: 'FiGithub' },
  {
    key: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/siddique-mohammed-shayan-395304329',
    icon: 'FiLinkedin',
  },
  { key: 'email', label: 'Email', href: `mailto:${profile.email}`, icon: 'FiMail' },
  { key: 'phone', label: 'Phone', href: `tel:${profile.phone.replace(/\s+/g, '')}`, icon: 'FiPhone' },
  { key: 'resume', label: 'Resume', href: profile.resumeUrl, icon: 'FiFileText' },
]

export const contact = {
  email: profile.email,
  phone: profile.phone,
  location: profile.location,
  linkedin: 'https://www.linkedin.com/in/siddique-mohammed-shayan-395304329',
  github: 'https://github.com/Siddique-Shayan',
  availability: 'Open to backend, full-stack, and AI-engineering roles & freelance projects.',
}

export const resume = {
  path: profile.resumeUrl,
  fileName: 'Siddique_Mohammed_Shayan_Resume.pdf',
}

/* ---------------------------------- Skills -------------------------------- */
/* icon keys map to react-icons components resolved in the Skills section */
export const skills = [
  {
    category: 'Languages',
    items: [
      { name: 'Java', icon: 'SiOpenjdk', level: 90 },
      { name: 'JavaScript', icon: 'SiJavascript', level: 88 },
      { name: 'TypeScript', icon: 'SiTypescript', level: 78 },
      { name: 'Python', icon: 'SiPython', level: 70 },
      { name: 'SQL', icon: 'SiPostgresql', level: 82 },
      { name: 'C++', icon: 'SiCplusplus', level: 65 },
    ],
  },
  {
    category: 'Frontend',
    items: [
      { name: 'React', icon: 'SiReact', level: 85 },
      { name: 'HTML', icon: 'SiHtml5', level: 92 },
      { name: 'CSS', icon: 'SiCss', level: 85 },
      { name: 'Tailwind CSS', icon: 'SiTailwindcss', level: 88 },
    ],
  },
  {
    category: 'Backend',
    items: [
      { name: 'Spring Boot', icon: 'SiSpringboot', level: 88 },
      { name: 'Node.js', icon: 'SiNodedotjs', level: 82 },
      { name: 'Express.js', icon: 'SiExpress', level: 80 },
    ],
  },
  {
    category: 'Databases',
    items: [
      { name: 'MongoDB', icon: 'SiMongodb', level: 80 },
      { name: 'PostgreSQL', icon: 'SiPostgresql', level: 78 },
      { name: 'MySQL', icon: 'SiMysql', level: 78 },
    ],
  },
  {
    category: 'Cloud',
    items: [
      { name: 'AWS', icon: 'FaAws', level: 78 },
      { name: 'EC2', icon: 'FiServer', level: 76 },
      { name: 'DynamoDB', icon: 'FiDatabase', level: 74 },
      { name: 'SNS', icon: 'FiBell', level: 70 },
      { name: 'Docker', icon: 'SiDocker', level: 72 },
    ],
  },
  {
    category: 'AI',
    items: [
      { name: 'OpenAI', icon: 'BsOpenai', level: 85 },
      { name: 'Claude', icon: 'SiClaude', level: 82 },
      { name: 'Gemini', icon: 'SiGooglegemini', level: 75 },
      { name: 'RAG', icon: 'FiDatabase', level: 80 },
      { name: 'Prompt Engineering', icon: 'FiEdit3', level: 85 },
      { name: 'MCP', icon: 'FiShare2', level: 68 },
      { name: 'LangChain', icon: 'SiLangchain', level: 72 },
      { name: 'Ollama', icon: 'SiOllama', level: 65 },
    ],
  },
  {
    category: 'Developer Tools',
    items: [
      { name: 'Git', icon: 'SiGit', level: 88 },
      { name: 'GitHub', icon: 'SiGithub', level: 90 },
      { name: 'IntelliJ IDEA', icon: 'SiIntellijidea', level: 85 },
      { name: 'VS Code', icon: 'VscVscode', level: 92 },
      { name: 'Postman', icon: 'SiPostman', level: 85 },
      { name: 'Linux', icon: 'SiLinux', level: 78 },
      { name: 'Figma', icon: 'SiFigma', level: 60 },
    ],
  },
]

/* --------------------------------- Projects -------------------------------- */
export const projects = [
  {
    slug: 'taxbae',
    name: 'TaxBae',
    category: 'AI FinTech Platform',
    description:
      'An AI-first financial assistant that pairs a Retrieval-Augmented-Generation pipeline with ' +
      'OpenAI to answer tax and finance questions grounded in real data, backed by a secure, ' +
      'JWT-authenticated REST API.',
    features: [
      'Conversational AI financial assistant powered by Generative AI + RAG',
      'JWT-based authentication and session security',
      'REST API built with Node.js and Express',
      'MongoDB data layer for users, sessions, and conversation history',
    ],
    tech: ['Node.js', 'Express', 'MongoDB', 'OpenAI', 'RAG', 'JWT', 'REST APIs'],
    github: 'https://github.com/Siddique-Shayan/TaxBae',
    demo: null,
    image: '/images/projects/taxbae.jpg',
    status: 'In Progress',
    type: 'personal',
  },
  {
    slug: 'cinebooker',
    name: 'CineBooker',
    category: 'Cloud-Based Full Stack Application',
    description:
      'A cloud-native movie ticket booking platform deployed on AWS — React on the front end, a ' +
      'scalable serverless-friendly backend on the AWS side, with DynamoDB for storage and SNS for ' +
      'real-time booking notifications.',
    features: [
      'End-to-end ticket booking flow: browse, select seats, book, confirm',
      'Deployed on AWS EC2 with a production-style cloud architecture',
      'DynamoDB as the primary NoSQL data store',
      'Amazon SNS for booking/notification events',
      'REST APIs connecting the React frontend to the cloud backend',
    ],
    tech: ['React', 'AWS EC2', 'DynamoDB', 'Amazon SNS', 'REST APIs', 'Full Stack'],
    github: 'https://github.com/Siddique-Shayan/Cinebooker',
    demo: null,
    image: '/images/projects/cinebooker.jpg',
    status: 'Completed',
    type: 'personal',
  },
  {
    slug: 'sha-db',
    name: 'ShaDB',
    category: 'Backend Engineering',
    description:
      'A backend-focused repository centered on database design, clean API architecture, and ' +
      'authentication — built to practice production-grade backend patterns from the ground up.',
    features: [
      'Structured database schema and modeling',
      'RESTful API design',
      'Authentication and authorization flows',
    ],
    tech: ['Backend Engineering', 'Database Design', 'REST APIs', 'Authentication'],
    github: 'https://github.com/Siddique-Shayan/SHA-DB',
    demo: null,
    image: '/images/projects/sha-db.jpg',
    status: 'Completed',
    type: 'personal',
  },
  {
    slug: 'go-global-now',
    name: 'Go Global Now',
    category: 'Production Platform',
    description:
      'A live, production marketplace platform I contribute backend engineering to at HiWi Pay — ' +
      'covering REST APIs, automated report and PDF generation, AI-assisted features, and ' +
      'performance/database optimization. Implementation details are proprietary; shown here are ' +
      'the public-facing responsibilities only.',
    features: [
      'Backend REST APIs powering the live platform',
      'Automated report & PDF generation',
      'AI-assisted feature integration',
      'Marketplace integrations',
      'Database and performance optimization on AWS infrastructure',
    ],
    tech: ['Spring Boot', 'Java', 'REST APIs', 'AWS', 'AI Integration', 'PDF Generation'],
    github: null,
    demo: 'https://agent.goglobalnow.in/',
    image: '/images/projects/go-global-now.jpg',
    status: 'Live',
    type: 'company',
    badges: ['Company Project', 'Production Ready', 'Live Platform'],
  },
]

/* -------------------------------- Experience -------------------------------- */
/* Ordered most-recent first. No exact dates were provided in the source resume —
   update `duration` once real dates are available. */
export const experience = [
  {
    company: 'HiWi Pay',
    role: 'Backend Developer Intern',
    project: 'Go Global Now',
    duration: 'Current',
    current: true,
    location: 'Mumbai, India',
    description:
      'Backend engineering on Go Global Now, a live marketplace platform — building REST APIs, ' +
      'integrating AI-assisted features, and optimizing the data layer for production performance.',
    responsibilities: [
      'Backend Engineering with Spring Boot',
      'Designing and building REST APIs',
      'Automated report generation',
      'AI integration into product features',
      'Marketplace integrations',
      'PDF generation pipelines',
      'AWS-based deployment',
      'Database optimization & performance improvements',
      'Shipping production features end-to-end',
    ],
    tech: ['Spring Boot', 'Java', 'REST APIs', 'AWS', 'AI Integration'],
  },
  {
    company: 'Freelance',
    role: 'Frontend Developer',
    project: 'Production House Management System',
    duration: '',
    current: false,
    location: 'Remote',
    description:
      'Built the frontend for a production house management system — a React dashboard used to ' +
      'run day-to-day studio operations.',
    responsibilities: [
      'React development',
      'Responsive UI implementation',
      'Dashboard design',
      'API integration',
      'UI performance optimization',
    ],
    tech: ['React', 'JavaScript', 'REST APIs'],
  },
  {
    company: 'SkillWallet',
    role: 'Virtual Intern',
    project: 'Movie Ticket Booking System',
    duration: '',
    current: false,
    location: 'Remote',
    description:
      'Built a cloud-based full-stack movie ticket booking system as part of a virtual internship — ' +
      'later open-sourced as CineBooker.',
    responsibilities: [
      'Full stack development',
      'AWS deployment',
      'DynamoDB data modeling',
      'Amazon SNS notifications',
      'Cloud architecture design',
      'Scalable backend design',
      'REST API development',
    ],
    tech: ['React', 'AWS', 'DynamoDB', 'Amazon SNS', 'REST APIs'],
    github: 'https://github.com/Siddique-Shayan/Cinebooker',
  },
]

/* -------------------------------- Education -------------------------------- */
/* Empty until confirmed by a real resume — the UI shows a graceful placeholder
   rather than inventing institutions or dates. */
export const education = []

/* ------------------------------ Certifications ------------------------------ */
export const certifications = []

/* -------------------------------- Achievements ------------------------------- */
/* Only real, derivable counts — nothing fabricated. */
export const achievements = {
  stats: [
    { label: 'Projects Shipped', value: projects.length, suffix: '+' },
    { label: 'Professional Roles', value: experience.length, suffix: '' },
    {
      label: 'Technologies Used',
      value: skills.reduce((sum, group) => sum + group.items.length, 0),
      suffix: '+',
    },
    { label: 'Production Platform', value: 1, suffix: '', label2: 'Live in Production' },
  ],
  badges: [
    { label: 'Open Source', icon: 'FiGithub' },
    { label: 'Cloud Deployments', icon: 'FaAws' },
    { label: 'AI Engineering', icon: 'FiCpu' },
  ],
}

/* --------------------------------- Tech stack -------------------------------- */
/* Flat icon list for the marquee showcase */
export const techMarquee = [
  'SiOpenjdk',
  'SiSpringboot',
  'SiReact',
  'SiTypescript',
  'SiJavascript',
  'SiTailwindcss',
  'SiNodedotjs',
  'SiExpress',
  'SiPostgresql',
  'SiMongodb',
  'SiMysql',
  'FaAws',
  'SiDocker',
  'SiGit',
  'SiGithub',
  'SiPython',
  'SiLinux',
  'BsOpenai',
  'SiPostman',
  'SiIntellijidea',
]

/* ----------------------------------- SEO ------------------------------------ */
export const seo = {
  siteUrl,
  title: `${profile.name} — Backend & AI Engineer`,
  titleTemplate: '%s | Siddique Mohammed Shayan',
  description: profile.shortBio,
  keywords: [
    'Siddique Mohammed Shayan',
    'Backend Engineer',
    'AI Engineer',
    'Full Stack Developer',
    'Java Developer',
    'Spring Boot Developer',
    'FinTech Developer',
    'RAG',
    'OpenAI',
    'AWS',
    'React Developer',
    'Portfolio',
  ],
  author: profile.name,
  image: '/images/profile.jpg',
  twitterHandle: '',
}

export const portfolioMeta = {
  version: '1.0.0',
  builtWith: 'React 19, Vite, Tailwind CSS, Framer Motion, GSAP, Zustand',
}
