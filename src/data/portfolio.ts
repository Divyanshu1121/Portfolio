// ============================================================
// Divyanshu's Portfolio Data (Single Source of Truth)
// ============================================================

export interface Project {
  id: number;
  title: string;
  badges: string[];
  shortDescription: string;
  fullDescription: string;
  stack: string[];
  architecture?: string;
  category: string[];
  githubUrl?: string;
  liveUrl?: string;
  metrics?: string;
  imageUrl?: string;
  highlights?: string[];
}

export interface Experience {
  id: number;
  role: string;
  company: string;
  location?: string;
  period?: string;
  duration?: string;
  color: string;
  isCurrent: boolean;
  projects: {
    name: string;
    stack: string;
    bullets: string[];
  }[];
}

export interface Skill {
  name: string;
  level: number;
}

export interface SkillCategory {
  id: string;
  label: string;
  skills: Skill[];
}

export interface ToolGroup {
  label: string;
  items: string[];
}

export interface Education {
  id: number;
  degree: string;
  field: string;
  institution: string;
  period: string;
  grade: string;
  gradeLabel: string;
  icon: string;
  areas: string[];
}

export interface Certification {
  id: number;
  issuer: string;
  items: string[];
  accent: string;
  icon: string;
}

export interface ContactInfo {
  type: string;
  icon: string;
  label: string;
  value: string;
  action: string; // 'mailto' | 'copy' | 'link'
  url?: string;
}

// ── Personal Info ──────────────────────────────────────────
export const personalInfo = {
  fullName: 'Divyanshu M. Patel',
  initials: 'DP',
  role: 'Full Stack MERN Developer',
  location: 'Surat, Gujarat, India',
  email: 'divyanshupatel5633@gmail.com',
  phone: '+91 9173150179',
  linkedin: 'https://www.linkedin.com/in/divyanshu-patel-99450426b/',
  github: 'https://github.com/Divyanshu1121',
  githubUsername: 'Divyanshu1121',
  university: 'C.K Pithawala College Of Engineering and Technology',
  degree: 'B.E. Information Technology (2022–2026)',
  honours: 'Data Science, Grade AB (2024–2026)',
  cgpa: 8.14,
  cgpaMax: 10,
};

export const bio = `Full Stack MERN Developer specializing in scalable web applications, SaaS platforms, and AI-powered solutions.`;

export const coreStack = [
  'JavaScript', 'Python', 'React.js', 'Node.js', 'Express.js',
  'MongoDB', 'Tailwind CSS', 'Bootstrap'
];

export const quickStats = [
  { label: 'CGPA', value: '8.14 / 10' },
  { label: 'Graduation', value: '2026' },
  { label: 'Honours', value: 'Data Science' },
  { label: 'Live Projects', value: '1 Client Website' },
  { label: 'Internships', value: '2 Completed' },
];

// ── Projects ───────────────────────────────────────────────
export const projects: Project[] = [
  {
    id: 1,
    title: 'Visat Dental Care Website',
    badges: ['LIVE', 'CLIENT PROJECT'],
    shortDescription: 'Responsive dental clinic website with appointment booking workflow.',
    fullDescription: `Developed and deployed a responsive dental clinic website for a real client with modern UI/UX and mobile optimization. Integrated appointment booking workflow with WhatsApp-based patient inquiry system. Implemented treatment gallery, doctor profile management, SEO-friendly structure, and responsive layouts. Managed production deployment using Vercel with custom domain, DNS configuration, and SSL setup.`,
    stack: ['React.js', 'Node.js', 'Vercel'],
    category: ['Full Stack', 'Web Development'],
    highlights: [
      'Developed and deployed a responsive dental clinic website for a real client.',
      'Integrated appointment booking workflow with WhatsApp-based patient inquiry system.',
      'Implemented treatment gallery, doctor profile management, and SEO-friendly structure.',
      'Managed production deployment using Vercel with custom domain and SSL setup.'
    ]
  },
  {
    id: 2,
    title: 'Learnify - AI Learning Assistant',
    badges: ['AI', 'GITHUB'],
    shortDescription: 'AI-powered learning platform for generating explanations and intelligent responses.',
    fullDescription: `Developed AI-powered learning platform for generating explanations, summaries, and intelligent responses. Integrated Groq APIs for real-time AI interaction and dynamic content generation.`,
    stack: ['React.js', 'Node.js', 'Groq API'],
    category: ['AI/ML', 'Full Stack'],
    highlights: [
      'Developed AI-powered learning platform for generating explanations and summaries.',
      'Integrated Groq APIs for real-time AI interaction and dynamic content generation.'
    ]
  },
  {
    id: 3,
    title: 'SaaS Project Management Tool',
    badges: ['SAAS', 'GITHUB'],
    shortDescription: 'Project and task management platform with role-based access.',
    fullDescription: `Engineered project and task management platform with role-based access and workflow management. Implemented sprint tracking, dashboards, authentication, and team collaboration modules.`,
    stack: ['MongoDB', 'Express.js', 'React.js', 'Node.js'],
    category: ['Full Stack', 'SaaS'],
    highlights: [
      'Engineered project and task management platform with role-based access and workflow management.',
      'Implemented sprint tracking, dashboards, authentication, and team collaboration modules.'
    ]
  },
  {
    id: 4,
    title: 'Excel Analytics Platform',
    badges: ['ANALYTICS', 'GITHUB'],
    shortDescription: 'Excel upload and visualization platform with interactive charts.',
    fullDescription: `Developed Excel upload and visualization platform with interactive charts and analytics dashboard. Built backend processing system for file handling, dynamic chart generation, and data insights.`,
    stack: ['React.js', 'Node.js'],
    category: ['Full Stack', 'Data Analytics'],
    highlights: [
      'Developed Excel upload and visualization platform with interactive charts and analytics dashboard.',
      'Built backend processing system for file handling, dynamic chart generation, and data insights.'
    ]
  }
];

// ── Experience ─────────────────────────────────────────────
export const experiences: Experience[] = [
  {
    id: 1,
    role: 'Freelance Web Developer',
    company: 'Visat Dental Care',
    location: 'Surat, India',
    color: '#28C8A0',
    isCurrent: false,
    projects: [
      {
        name: 'Visat Dental Care Website',
        stack: 'React.js, Node.js, Vercel',
        bullets: [
          'Developed and deployed a responsive dental clinic website for a real client with modern UI/UX and mobile optimization.',
          'Integrated appointment booking workflow with WhatsApp-based patient inquiry system.',
          'Implemented treatment gallery, doctor profile management, and SEO-friendly structure.',
          'Managed production deployment using Vercel with custom domain, DNS configuration, and SSL setup.'
        ],
      }
    ],
  },
  {
    id: 2,
    role: 'MERN Stack Developer Intern',
    company: 'Webforest LLP',
    location: 'Surat, India',
    period: 'Jan 2026 – Mar 2026',
    duration: '3 months',
    color: '#5E9BF0',
    isCurrent: false,
    projects: [
      {
        name: 'SaaS Project Management Platform',
        stack: 'MERN Stack, Groq API, JWT',
        bullets: [
          'Developed multi-tenant SaaS Project Management platform using MERN stack architecture.',
          'Built AI Learning Assistant integrating Groq APIs for real-time intelligent responses.',
          'Implemented JWT authentication, secure REST APIs, and protected routing systems.',
          'Worked in Agile development environment with sprint planning and task tracking.'
        ],
      }
    ],
  },
  {
    id: 3,
    role: 'Web Developer Intern',
    company: 'Zidio Development Pvt Ltd',
    location: 'Remote',
    period: 'Jun 2025 – Jul 2025',
    duration: '2 months',
    color: '#A78BF5',
    isCurrent: false,
    projects: [
      {
        name: 'Analytics Dashboard',
        stack: 'MERN Stack',
        bullets: [
          'Built Excel upload and analytics dashboard using MERN stack and dynamic chart visualization.'
        ],
      }
    ],
  }
];

// ── Skills ─────────────────────────────────────────────────
export const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    label: 'Frontend',
    skills: [
      { name: 'JavaScript', level: 90 },
      { name: 'React.js', level: 85 },
      { name: 'HTML5', level: 90 },
      { name: 'CSS3', level: 85 },
      { name: 'Tailwind CSS', level: 85 },
      { name: 'Bootstrap', level: 80 },
    ],
  },
  {
    id: 'backend',
    label: 'Backend & Databases',
    skills: [
      { name: 'Node.js', level: 85 },
      { name: 'Express.js', level: 85 },
      { name: 'MongoDB', level: 80 },
      { name: 'Firebase', level: 75 },
      { name: 'REST APIs', level: 90 },
      { name: 'Python', level: 75 },
    ],
  },
  {
    id: 'tools_platforms',
    label: 'Tools & Platforms',
    skills: [
      { name: 'Git & GitHub', level: 85 },
      { name: 'Postman', level: 80 },
      { name: 'Vercel', level: 85 },
      { name: 'VS Code', level: 90 },
      { name: 'Jira', level: 80 },
    ],
  },
];

export const toolGroups: ToolGroup[] = [
  { label: 'Concepts', items: ['REST APIs', 'Authentication', 'SaaS Architecture', 'Responsive Design', 'Deployment'] },
  { label: 'Project Management', items: ['Agile Methodology', 'Sprint Planning', 'Jira'] },
  { label: 'Soft Skills', items: ['Problem Solving', 'Communication', 'Team Collaboration'] },
  { label: 'Languages', items: ['English', 'Hindi', 'Gujarati'] },
];

// ── Education ──────────────────────────────────────────────
export const education: Education[] = [
  {
    id: 1,
    degree: 'B.E. Information Technology',
    field: 'Information Technology',
    institution: 'C.K Pithawala College Of Engineering and Technology',
    period: '2022 – 2026',
    grade: '8.14 / 10',
    gradeLabel: 'CGPA',
    icon: '🎓',
    areas: [
      'Surat, India'
    ],
  },
  {
    id: 2,
    degree: 'Honors Degree',
    field: 'Data Science',
    institution: 'Gujarat Technological University',
    period: '2024 – 2026',
    grade: 'AB',
    gradeLabel: 'Grade',
    icon: '📊',
    areas: [
      'India'
    ],
  },
];

// ── Certifications ─────────────────────────────────────────
export const certifications: Certification[] = [
  {
    id: 1,
    issuer: 'Red and White Institute',
    items: [
      'Full Stack MERN Development'
    ],
    accent: '#4285F4',
    icon: '💻',
  },
  {
    id: 2,
    issuer: 'Infosys Springboard',
    items: [
      'Python Programming'
    ],
    accent: '#007CC3',
    icon: '🐍',
  }
];

// ── Contact ────────────────────────────────────────────────
export const contactInfo: ContactInfo[] = [
  {
    type: 'email',
    icon: '📧',
    label: 'Email',
    value: 'divyanshupatel5633@gmail.com',
    action: 'mailto',
    url: 'mailto:divyanshupatel5633@gmail.com',
  },
  {
    type: 'phone',
    icon: '📱',
    label: 'Phone',
    value: '+91 9173150179',
    action: 'copy',
  },
  {
    type: 'linkedin',
    icon: '💼',
    label: 'LinkedIn',
    value: 'linkedin.com/in/divyanshu-patel-99450426b',
    action: 'link',
    url: 'https://www.linkedin.com/in/divyanshu-patel-99450426b/',
  },
  {
    type: 'github',
    icon: '🐙',
    label: 'GitHub',
    value: 'github.com/Divyanshu1121',
    action: 'link',
    url: 'https://github.com/Divyanshu1121',
  },
  {
    type: 'location',
    icon: '📍',
    label: 'Location',
    value: 'Surat, Gujarat, India',
    action: 'none',
  },
];

// ── Resume Text (for Resume window) ───────────────────────
export const resumeText = {
  summary: `Full Stack MERN Developer specializing in scalable web applications, SaaS platforms, and AI-powered solutions. Experience building multi-tenant architectures, AI learning assistants, and responsive web platforms.`,
  technicalSkills: {
    'Programming Languages': 'JavaScript, Python, HTML5, CSS3',
    'Frontend Technologies': 'React.js, Tailwind CSS, Bootstrap',
    'Backend Technologies': 'Node.js, Express.js',
    'Databases': 'MongoDB, Firebase',
    'Tools & Platforms': 'Git, GitHub, Postman, Vercel, VS Code',
    'Concepts': 'REST APIs, Authentication, SaaS Architecture, Responsive Design, Deployment',
    'Project Management': 'Agile Methodology, Sprint Planning, Jira',
    'Soft Skills': 'Problem Solving, Communication, Team Collaboration'
  },
};

// ── AI Assistant System Prompt ─────────────────────────────
export const aiSystemPrompt = `You are DIVYANSHU-AI, a professional AI assistant representing Divyanshu M. Patel's portfolio.
Answer ONLY questions about Divyanshu based on the following resume data.
Be concise (2–4 sentences max unless asked for detail), professional, and friendly.
If asked something outside Divyanshu's background, politely say you can only discuss Divyanshu's work.
Never make up information not in the resume.
Speak in first person as if you ARE Divyanshu ("I built...", "My experience includes...").

DIVYANSHU M. PATEL COMPLETE PROFILE:

Education:
- B.E. Information Technology, C.K Pithawala College Of Engineering and Technology, CGPA 8.14/10 (2022-2026)
- Honors Degree in Data Science, Gujarat Technological University, AB Grade (2024-2026)

Experience:
1. MERN Stack Developer Intern, Webforest LLP (Jan-Mar 2026)
   - Developed multi-tenant SaaS Project Management platform
   - Built AI Learning Assistant integrating Groq APIs
   - Implemented JWT authentication and secure REST APIs
   - Agile, Sprint planning

2. Web Developer Intern, Zidio Development Pvt Ltd (Jun-Jul 2025)
   - Built Excel upload and analytics dashboard using MERN stack

Projects:
- Visat Dental Care Website: Live client project, responsive design, WhatsApp booking workflow
- Learnify - AI Learning Assistant: React.js, Node.js, Groq APIs
- SaaS Project Management Tool: MERN stack, role-based access, sprint tracking
- Excel Analytics Platform: React.js, Node.js, interactive charts

Skills: JavaScript, Python, HTML5, CSS3, React.js, Tailwind CSS, Bootstrap, Node.js, Express.js, MongoDB, Firebase, Git, GitHub, Postman, Vercel, VS Code.

Certifications: Full Stack MERN Development (Red and White Institute), Python Programming (Infosys Springboard)
Contact: divyanshupatel5633@gmail.com | +91 9173150179
GitHub: https://github.com/Divyanshu1121
LinkedIn: https://www.linkedin.com/in/divyanshu-patel-99450426b/`;

// ── Dock Items ─────────────────────────────────────────────
export const dockItems = [
  { id: 'about', label: 'About Me', icon: '👤', color: '#5E9BF0', windowId: 'about' },
  { id: 'projects', label: 'Projects', icon: '📁', color: '#F5A623', windowId: 'projects' },
  { id: 'experience', label: 'Experience', icon: '💼', color: '#F5C542', windowId: 'experience' },
  { id: 'skills', label: 'Skills', icon: '⚡', color: '#A78BF5', windowId: 'skills' },
  { id: 'education', label: 'Education', icon: '🎓', color: '#28C8A0', windowId: 'education' },
  { id: 'resume', label: 'Resume', icon: '📄', color: '#F55A5A', windowId: 'resume' },
  { id: 'contact', label: 'Contact', icon: '✉️', color: '#28C840', windowId: 'contact' },
  { id: 'ai', label: 'AI Assistant', icon: '🤖', color: '#7B61FF', windowId: 'ai', featured: true },
  { id: 'terminal', label: 'Terminal', icon: '>_', color: '#333', windowId: 'terminal' },
  { id: 'github', label: 'GitHub', icon: '🐙', color: '#333', external: 'https://github.com/Divyanshu1121' },
  { id: 'linkedin', label: 'LinkedIn', icon: 'in', color: '#0A66C2', external: 'https://www.linkedin.com/in/divyanshu-patel-99450426b/' },
  { id: 'google', label: 'Google', icon: '🔍', color: '#4285F4', windowId: 'google' },
];

// ── Desktop Icons ──────────────────────────────────────────
export const desktopIcons = [
  { id: 'about', label: 'About Me', icon: '👤', gradient: 'linear-gradient(135deg, #5E9BF0, #4A7FD4)', windowId: 'about' },
  { id: 'projects', label: 'Projects', icon: '📁', gradient: 'linear-gradient(135deg, #F5A623, #E09000)', windowId: 'projects' },
  { id: 'experience', label: 'Experience', icon: '💼', gradient: 'linear-gradient(135deg, #F5C542, #D4A830)', windowId: 'experience' },
  { id: 'skills', label: 'Skills', icon: '⚡', gradient: 'linear-gradient(135deg, #A78BF5, #8B6FD9)', windowId: 'skills' },
  { id: 'education', label: 'Education', icon: '🎓', gradient: 'linear-gradient(135deg, #28C8A0, #1FA882)', windowId: 'education' },
  { id: 'certifications', label: 'Certifications', icon: '🏅', gradient: 'linear-gradient(135deg, #F06292, #D84980)', windowId: 'certifications' },
  { id: 'resume', label: 'Resume', icon: '📄', gradient: 'linear-gradient(135deg, #F55A5A, #D43F3F)', windowId: 'resume' },
  { id: 'contact', label: 'Contact', icon: '✉️', gradient: 'linear-gradient(135deg, #28C840, #1FA832)', windowId: 'contact' },
  { id: 'ai', label: 'AI Assistant', icon: '🤖', gradient: 'linear-gradient(135deg, #5E9BF0, #A78BF5)', windowId: 'ai' },
  { id: 'terminal', label: 'Terminal', icon: '>_', gradient: 'linear-gradient(135deg, #1a1a2e, #16213e)', windowId: 'terminal' },
  { id: 'github', label: 'GitHub', icon: '🐙', gradient: 'linear-gradient(135deg, #333, #555)', external: 'https://github.com/Divyanshu1121' },
  { id: 'linkedin', label: 'LinkedIn', icon: 'in', gradient: 'linear-gradient(135deg, #0A66C2, #084B91)', external: 'https://www.linkedin.com/in/divyanshu-patel-99450426b/' },
  { id: 'google', label: 'Google', icon: '🔍', gradient: 'linear-gradient(135deg, #ffffff, #f5f5f7)', windowId: 'google' },
  { id: 'games', label: 'Games', icon: '🎮', gradient: 'linear-gradient(135deg, #FF5252, #FF7A00)', windowId: 'games' },
  { id: 'system_monitor', label: 'Activity Monitor', icon: '📈', gradient: 'linear-gradient(135deg, #00FF87, #60EFFF)', windowId: 'system_monitor' },
  { id: 'settings', label: 'Settings', icon: '⚙️', gradient: 'linear-gradient(135deg, #64748b, #475569)', windowId: 'settings' },
];

// ── Window Defaults ────────────────────────────────────────
export interface WindowConfig {
  id: string;
  title: string;
  icon: string;
  defaultWidth: number;
  defaultHeight: number;
  minWidth: number;
  minHeight: number;
}

export const windowConfigs: Record<string, WindowConfig> = {
  about: { id: 'about', title: 'About Me', icon: '👤', defaultWidth: 480, defaultHeight: 560, minWidth: 380, minHeight: 400 },
  projects: { id: 'projects', title: 'Projects', icon: '📁', defaultWidth: 780, defaultHeight: 600, minWidth: 600, minHeight: 400 },
  experience: { id: 'experience', title: 'Experience', icon: '💼', defaultWidth: 520, defaultHeight: 580, minWidth: 420, minHeight: 400 },
  skills: { id: 'skills', title: 'Skills', icon: '⚡', defaultWidth: 500, defaultHeight: 520, minWidth: 380, minHeight: 360 },
  education: { id: 'education', title: 'Education', icon: '🎓', defaultWidth: 480, defaultHeight: 500, minWidth: 380, minHeight: 360 },
  certifications: { id: 'certifications', title: 'Certifications', icon: '🏅', defaultWidth: 480, defaultHeight: 500, minWidth: 380, minHeight: 360 },
  resume: { id: 'resume', title: 'Resume', icon: '📄', defaultWidth: 600, defaultHeight: 700, minWidth: 480, minHeight: 500 },
  contact: { id: 'contact', title: 'Contact', icon: '✉️', defaultWidth: 440, defaultHeight: 560, minWidth: 340, minHeight: 380 },
  ai: { id: 'ai', title: 'AI Assistant', icon: '🤖', defaultWidth: 480, defaultHeight: 580, minWidth: 380, minHeight: 400 },
  terminal: { id: 'terminal', title: 'Terminal', icon: '>_', defaultWidth: 620, defaultHeight: 420, minWidth: 400, minHeight: 280 },
  snake: { id: 'snake', title: 'Snake Game', icon: '🐍', defaultWidth: 340, defaultHeight: 400, minWidth: 300, minHeight: 360 },
  recruiter: { id: 'recruiter', title: 'Recruiter Dashboard', icon: '🎯', defaultWidth: 500, defaultHeight: 500, minWidth: 400, minHeight: 400 },
  google: { id: 'google', title: 'Google Chrome', icon: '🔍', defaultWidth: 720, defaultHeight: 520, minWidth: 500, minHeight: 400 },
  games: { id: 'games', title: 'Games Lounge', icon: '🎮', defaultWidth: 360, defaultHeight: 400, minWidth: 300, minHeight: 320 },
  pong: { id: 'pong', title: 'Pong Game', icon: '🏓', defaultWidth: 360, defaultHeight: 360, minWidth: 300, minHeight: 300 },
  game2048: { id: 'game2048', title: '2048 Game', icon: '🧩', defaultWidth: 360, defaultHeight: 380, minWidth: 300, minHeight: 320 },
  tictactoe: { id: 'tictactoe', title: 'Tic-Tac-Toe', icon: '❌', defaultWidth: 340, defaultHeight: 400, minWidth: 280, minHeight: 320 },
  system_monitor: { id: 'system_monitor', title: 'Activity Monitor', icon: '📈', defaultWidth: 440, defaultHeight: 420, minWidth: 360, minHeight: 350 },
  settings: { id: 'settings', title: 'System Preferences', icon: '⚙️', defaultWidth: 560, defaultHeight: 420, minWidth: 480, minHeight: 360 },
};
