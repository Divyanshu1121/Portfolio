// ============================================================
// AryaOS — Portfolio Data (Single Source of Truth)
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
  period: string;
  duration: string;
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
  fullName: 'Arya Shah',
  initials: 'AS',
  role: 'AI Engineer · Full-Stack Developer',
  location: 'Surat, Gujarat, India',
  email: 'aryashah325@gmail.com',
  phone: '+91 7405201227',
  linkedin: 'https://linkedin.com/in/aryashah22',
  github: 'https://github.com/arya-shah22',
  githubUsername: 'arya-shah22',
  university: 'Gujarat Technological University (GTU)',
  degree: 'B.E. in Information Technology (2022–2026)',
  honours: 'Data Science, Grade AB (2024–2026)',
  cgpa: 9.44,
  cgpaMax: 10,
};

export const bio = `Information Technology graduate (CGPA 9.44/10) with production-level experience building AI systems that solve real problems. Designed pharmaceutical inspection pipelines, diamond trading ERPs, and WhatsApp-based AI automation — all deployed in live business environments. Comfortable across the full stack from model training and API development to VPS deployment and Flutter mobile apps.`;

export const coreStack = [
  'Python', 'React', 'FastAPI', 'TensorFlow', 'YOLO',
  'Flutter', 'NodeJS', 'n8n', 'ElectronJS', 'MySQL',
];

export const quickStats = [
  { label: 'CGPA', value: '9.44 / 10' },
  { label: 'Graduation', value: '2026 · GTU' },
  { label: 'Honours', value: 'Data Science' },
  { label: 'Best Accuracy', value: '97.64% (CNN)' },
  { label: 'Projects Live', value: '3 in Production' },
  { label: 'Hackathon', value: '🥈 National 2nd' },
];

// ── Projects ───────────────────────────────────────────────
export const projects: Project[] = [
  {
    id: 1,
    title: 'Diamond & Jewellery Website',
    badges: ['LIVE', 'FREELANCE', 'SEO'],
    shortDescription: 'Modern jewellery showcase and inventory management platform designed for the luxury jewellery industry',
    fullDescription: `Modern jewellery showcase and inventory management platform developed for the diamond and luxury jewellery industry. Built using ReactJS, FastAPI, Python, and SQL, the platform provides responsive product showcasing, inventory management, customer inquiry workflows, and scalable backend operations. Features include dynamic product listings, admin dashboard, multi-user stock handling, live gold rate integration, currency conversion APIs, and automated data refresh systems. Focused on scalability, performance, modern UI/UX, and business-oriented functionality.`,
    stack: [
      'ReactJS', 'Python', 'FastAPI', 'SQL', 'Inventory Management',
      'Live Gold Rate API', 'Currency conversion API', 'REST APIs', 'Nginx', 'VPS',
      'SEO Optimization', 'HTML/CSS', 'JavaScript', 'CI/CD', 'Responsive UI/UX', 'Business Automation'
    ],
    architecture: 'ReactJS Frontend → FastAPI Backend (Python) → SQL Database → External Gold & Currency APIs',
    category: ['Full Stack', 'Inventory Management'],
    imageUrl: '/projects/jewellery/img1.webp',
    highlights: [
      'Built a scalable full-stack architecture for jewellery business operations',
      'Integrated real-time gold pricing and currency conversion systems',
      'Developed inventory workflows for efficient product management',
      'Designed responsive and modern user interfaces for premium branding',
      'Focused on performance, scalability, and business-oriented functionality',
      'Dynamic product catalog and showcase system with categories and filtering',
      'Customer inquiry and contact workflows with automated periodic data refresh'
    ]
  },
  {
    id: 2,
    title: 'DIAMO Software',
    badges: ['LIVE', 'FREELANCE', 'DESKTOP APP'],
    shortDescription: 'Full-stack diamond trading and business ERP management software',
    fullDescription: `DIAMO is a full-stack diamond trading and business management software developed to streamline inventory, transactions, financial tracking, and daily business operations for diamond businesses. Built using ReactJS, Node.js, and SQL, the platform includes modules for buy/sale entries, returns, stock management, party ledger, payments, loans, expenses, reports, and automated daily backups. The system focuses on scalable architecture, secure data handling, responsive UI, and efficient workflow management for real-world trading operations.`,
    stack: [
      'ReactJS', 'Node.js', 'SQL Database', 'JavaScript', 'HTML/CSS',
      'Inventory Management', 'ERP Software', 'Financial Ledger System',
      'Database Security', 'Daily Backup Utility', 'ElectronJS', 'Business Intelligence',
      'Transaction Workflows', 'Secure Databases', 'Desktop Application'
    ],
    architecture: 'Electron Shell → React UI → Node.js IPC/Backend API → SQL Database (Secure Records) → Automated Backup Utility',
    category: ['Full Stack', 'ERP Systems', 'Inventory Management'],
    imageUrl: '/projects/diamo/img1.webp',
    highlights: [
      'Developed a production-oriented business management system tailored for the diamond trading industry',
      'Designed scalable transaction and ledger management workflows',
      'Implemented inventory and stock management capabilities for operational efficiency',
      'Built secure and structured database systems for handling financial and trading records',
      'Dashboard, Buy/Sale Entries, Returns, Ledger, Payments, Loans, Expenses, and Reports',
      'Automated daily backup system for data safety and security'
    ]
  },
  {
    id: 3,
    title: 'PackVision AI',
    badges: ['AI', 'LIVE', 'INTERNSHIP'],
    shortDescription: 'AI-powered pharmaceutical packaging inspection and verification system using computer vision',
    fullDescription: `PackVision AI is an AI-powered pharmaceutical verification and inspection system developed to automate medicine packaging validation, bottle inspection, OCR-based label verification, and defect detection in real time. Built with Python, TensorFlow, YOLO, OpenCV, FastAPI, Flutter, and ReactJS, the system includes 360° bottle scanning workflows, AI inference pipelines, anomaly detection systems, and monitoring dashboards for scalable industrial inspection operations.`,
    stack: [
      'Python', 'TensorFlow', 'YOLO', 'OpenCV', 'EfficientNetV2B2', 'CNN Models',
      'TFLite', 'Flutter', 'Dart', 'FastAPI', 'ReactJS', 'Google ML Kit',
      'Artificial Intelligence', 'Computer Vision', 'Deep Learning', 'Industrial AI',
      'Autoencoders', 'SSIM', 'VGG Perceptual Loss', 'Anomaly Detection', 'OCR'
    ],
    architecture: 'Flutter App (360° Scan) → FastAPI Inference Backend → [EfficientNetV2B2 + YOLO] → ReactJS Dashboard',
    category: ['AI/ML', 'Computer Vision', 'Full Stack'],
    metrics: 'SDE + AI/ML Role',
    imageUrl: '/projects/packvision/img1.webp',
    highlights: [
      'Developed defect detection pipelines using EfficientNetV2B2 and custom CNN architectures',
      'Built anomaly detection systems using autoencoders, SSIM, and VGG perceptual loss',
      'Trained YOLO-based object detection models for bottle localization and seal verification',
      'Integrated OCR and document detection workflows using Google ML Kit',
      'Developed real-time AI inference pipelines and 360° bottle scanning workflows',
      'FastAPI backend APIs and ReactJS admin dashboard for inspection monitoring'
    ]
  },
  {
    id: 4,
    title: 'WhatsApp-Based AI Appointment Scheduler',
    badges: ['AI', 'AUTOMATION', 'INTERNSHIP'],
    shortDescription: 'AI-powered business automation system for scheduling and meeting management through WhatsApp',
    fullDescription: `WhatsApp Based AI Appointment Scheduler is an AI-powered business automation system developed to automate appointment scheduling, reminders, meeting management, and customer communication through WhatsApp using AI-driven workflows. Built using OpenAI API, n8n, WhatsApp Cloud API, Google Calendar API, Python, and workflow automation systems, the platform supports real-time scheduling, reminders, rescheduling, cancellation handling, and automated notifications. The system focuses on AI-driven conversational workflows, scalable automation architecture, API integrations, and reliable business process management.`,
    stack: [
      'n8n', 'OpenAI API', 'WhatsApp Cloud API', 'Google Calendar API', 'Google Sheets API',
      'Python', 'Workflow Automation Systems', 'AI Agent Development', 'Google APIs',
      'Conflict Detection', 'Edge-case Handling', 'Conversational AI'
    ],
    architecture: 'WhatsApp Message → n8n Webhook → OpenAI Intent Parser → Availability Check → Google Calendar Book → WhatsApp Confirmation',
    category: ['AI/ML', 'Workflow Automation'],
    imageUrl: '/projects/whatsapp/img1.webp',
    highlights: [
      'Developed AI-driven automation workflows for appointment scheduling and notifications using n8n and OpenAI',
      'Integrated WhatsApp Cloud API for real-time communication and automated responses',
      'Connected Google Calendar APIs for event creation, reminder scheduling, rescheduling, and cancellation workflows',
      'Implemented workflow validation and edge-case handling for overlapping events and third-party API failures',
      'Designed scalable automation architectures for real-world business scheduling operations'
    ]
  },
  {
    id: 5,
    title: 'Copy-Move Forgery Image Detection',
    badges: ['ML', '97.64% ACCURACY'],
    shortDescription: 'AI-powered digital image forensics system to detect manipulated or tampered images',
    fullDescription: `Copy-Move Forgery Image Detection is an AI-powered digital image forensics system developed to detect manipulated or tampered images by identifying duplicated regions within the same image using Deep Learning and Computer Vision techniques. Built using Python, CNN, OpenCV, TensorFlow, and benchmark datasets like MICC and CASIA, the system identifies duplicated image regions, performs feature extraction, similarity analysis, and forgery localization with high precision. The project achieved 97.64% accuracy through advanced preprocessing, pattern recognition, and CNN-based image analysis workflows.`,
    stack: [
      'Python', 'CNN (Convolutional Neural Networks)', 'OpenCV', 'TensorFlow', 'Keras',
      'NumPy', 'MICC Dataset', 'CASIA Dataset', 'Computer Vision', 'Deep Learning',
      'Image Processing', 'OpenCL', 'Pattern Recognition', 'Digital Image Forensics',
      'Feature Engineering', 'AI Model Development'
    ],
    category: ['AI/ML', 'Computer Vision'],
    metrics: 'AI/ML Developer Role',
    imageUrl: '/projects/forgery/img1.webp',
    highlights: [
      'Developed a CNN-based forgery detection model capable of identifying duplicated image regions with high precision',
      'Implemented advanced image preprocessing pipelines including noise reduction, normalization, segmentation, and feature enhancement',
      'Applied feature extraction and similarity matching techniques to detect hidden tampered areas within images',
      'Trained and evaluated the system using MICC and CASIA benchmark datasets widely used in digital image forensics research',
      'Optimized the model architecture and preprocessing workflows to achieve 97.64% detection accuracy'
    ]
  },
];

// ── Experience ─────────────────────────────────────────────
export const experiences: Experience[] = [
  {
    id: 1,
    role: 'Freelance Developer',
    company: 'Self-Employed',
    period: 'May 2026 – Present',
    duration: 'Current',
    color: '#28C840',
    isCurrent: true,
    projects: [
      {
        name: 'Jewellery & Diamond E-Commerce Website',
        stack: 'ReactJS, Python, FastAPI, SQL, Live Gold Rate API, VPS',
        bullets: [
          'Building jewellery showcase platform with product listings, customer inquiry workflows, and admin inventory management',
          'Live gold rate and currency APIs with automated refresh',
          'VPS deployment with professional SEO and CI/CD pipeline',
        ],
      },
      {
        name: 'DIAMO (Diamond Trading ERP Software)',
        stack: 'ReactJS, ElectronJS, NodeJS, MySQL',
        bullets: [
          'Fully offline-capable ERP for diamond trading businesses',
          'Carat-based stock management, real-time multi-variety tracking',
          'Analytics dashboards: stock distribution, profit analysis, transaction visualisations',
        ],
      },
    ],
  },
  {
    id: 2,
    role: 'AI / ML + SDE Intern',
    company: 'Upnext Software Private Limited',
    location: 'Surat',
    period: 'January 2026 – April 2026',
    duration: '4 months',
    color: '#5E9BF0',
    isCurrent: false,
    projects: [
      {
        name: 'PackVision AI',
        stack: 'Python · TensorFlow · YOLO · TFLite · Flutter · FastAPI · ReactJS',
        bullets: [
          'Architected end-to-end pharmaceutical packaging inspection system using computer vision',
          'Dual-stream defect detection: EfficientNetV2B2 + custom CNN',
          'Autoencoder anomaly detection: SSIM + VGG perceptual loss',
          'YOLO object detection for bottle localisation and seal integrity',
          'Flutter scanning app + FastAPI backend + ReactJS admin dashboard',
          'TFLite on-device inference reducing server round-trips',
        ],
      },
    ],
  },
  {
    id: 3,
    role: 'AI Intern',
    company: 'Nerdshouse Technologies LLP',
    location: 'Surat',
    period: 'July 2025',
    duration: '1 month',
    color: '#A78BF5',
    isCurrent: false,
    projects: [
      {
        name: 'WhatsApp-based AI Appointment Scheduler',
        stack: 'n8n · OpenAI API · WhatsApp Cloud API · Google Calendar API',
        bullets: [
          'Led development of production WhatsApp AI scheduling system',
          'Multi-step n8n pipelines: OpenAI + WhatsApp + Google Calendar',
          'Edge case handling: overlaps, missing inputs, API failures',
          'Authored architecture documentation and deployment runbooks',
        ],
      },
    ],
  },
];

// ── Skills ─────────────────────────────────────────────────
export const skillCategories: SkillCategory[] = [
  {
    id: 'aiml',
    label: 'AI & ML',
    skills: [
      { name: 'TensorFlow / Keras', level: 90 },
      { name: 'Computer Vision', level: 88 },
      { name: 'YOLO (Object Detection)', level: 85 },
      { name: 'CNN & Deep Learning', level: 87 },
      { name: 'Autoencoders', level: 85 },
      { name: 'TFLite / On-device', level: 80 },
      { name: 'OpenCV', level: 85 },
      { name: 'Scikit-learn', level: 78 },
      { name: 'n8n Automation', level: 88 },
      { name: 'OpenAI API', level: 85 },
    ],
  },
  {
    id: 'fullstack',
    label: 'Full Stack',
    skills: [
      { name: 'Python', level: 92 },
      { name: 'JavaScript', level: 88 },
      { name: 'ReactJS', level: 85 },
      { name: 'FastAPI', level: 90 },
      { name: 'NodeJS', level: 80 },
      { name: 'Flutter / Dart', level: 75 },
      { name: 'ElectronJS', level: 78 },
      { name: 'HTML / CSS', level: 85 },
      { name: 'REST API Design', level: 88 },
      { name: 'SQL / MySQL', level: 80 },
    ],
  },
  {
    id: 'devops',
    label: 'DevOps',
    skills: [
      { name: 'Linux Server Mgmt', level: 82 },
      { name: 'VPS Deployment', level: 82 },
      { name: 'Nginx Configuration', level: 75 },
      { name: 'CI/CD Pipelines', level: 72 },
      { name: 'API Deployment', level: 85 },
      { name: 'Model Hosting', level: 78 },
      { name: 'Git / GitHub', level: 88 },
    ],
  },
];

export const toolGroups: ToolGroup[] = [
  { label: 'IDEs', items: ['VS Code', 'Cursor', 'Android Studio'] },
  { label: 'Version Control', items: ['Git', 'GitHub', 'GitLab'] },
  { label: 'OS', items: ['macOS', 'Windows', 'Linux (Ubuntu)'] },
  { label: 'AI APIs', items: ['OpenAI', 'Anthropic Claude', 'Google ML Kit'] },
  { label: 'Cloud', items: ['Google Cloud', 'Hostinger VPS'] },
  { label: 'Automation', items: ['n8n'] },
  { label: 'Mobile', items: ['Flutter / Dart'] },
];

// ── Education ──────────────────────────────────────────────
export const education: Education[] = [
  {
    id: 1,
    degree: 'Bachelor of Engineering',
    field: 'Information Technology',
    institution: 'Gujarat Technological University',
    period: '2022 – 2026',
    grade: '9.44 / 10',
    gradeLabel: 'CGPA',
    icon: '🎓',
    areas: [
      'Data Structures & Algorithms',
      'Machine Learning & AI',
      'Computer Vision',
      'Web Development',
      'Database Management',
      'Computer Networks',
      'Software Engineering',
    ],
  },
  {
    id: 2,
    degree: 'Honours Degree',
    field: 'Data Science',
    institution: 'Gujarat Technological University',
    period: '2024 – 2026',
    grade: 'AB',
    gradeLabel: 'Grade',
    icon: '📊',
    areas: [
      'Statistical Analysis & Data Mining',
      'Advanced Machine Learning',
      'Python for Data Science',
      'Big Data Analytics',
      'AI Applications',
    ],
  },
];

// ── Certifications ─────────────────────────────────────────
export const certifications: Certification[] = [
  {
    id: 1,
    issuer: 'Google Cloud',
    items: [
      'Google Cloud Computing Foundations: Data, ML and AI in Google Cloud',
      'Google Cloud: The Arcade',
    ],
    accent: '#4285F4',
    icon: '☁️',
  },
  {
    id: 2,
    issuer: 'Infosys Springboard',
    items: [
      'Basic Python',
      'Data Science with Python',
      'Introduction to Data Mining',
      'Advanced Statistics and Data Mining for Data Science',
    ],
    accent: '#007CC3',
    icon: '📘',
  },
  {
    id: 3,
    issuer: 'Forage × Deloitte',
    items: [
      'Deloitte Australia — Data Analytics Job Simulation',
    ],
    accent: '#86BC25',
    icon: '📊',
  },
  {
    id: 4,
    issuer: 'Achievements',
    items: [
      '🥈 2nd Place — National-Level Technical Festival Hackathon',
      '🥉 3rd Place — College-Level Web Development Competition',
    ],
    accent: '#FFD700',
    icon: '🏆',
  },
];

// ── Contact ────────────────────────────────────────────────
export const contactInfo: ContactInfo[] = [
  {
    type: 'email',
    icon: '📧',
    label: 'Email',
    value: 'aryashah325@gmail.com',
    action: 'mailto',
    url: 'mailto:aryashah325@gmail.com',
  },
  {
    type: 'phone',
    icon: '📱',
    label: 'Phone',
    value: '+91 7405201227',
    action: 'copy',
  },
  {
    type: 'linkedin',
    icon: '💼',
    label: 'LinkedIn',
    value: 'linkedin.com/in/aryashah22',
    action: 'link',
    url: 'https://linkedin.com/in/aryashah22',
  },
  {
    type: 'github',
    icon: '🐙',
    label: 'GitHub',
    value: 'github.com/arya-shah22',
    action: 'link',
    url: 'https://github.com/arya-shah22',
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
  summary: `Information Technology graduate (CGPA 9.44/10) with production-level experience in AI/ML, full-stack development, and backend engineering. Designed and deployed computer vision pipelines, ERP systems, and AI-driven automation workflows used in real-world business environments. Adept across the full delivery lifecycle — from model training and API development to VPS deployment and Flutter-based mobile interfaces. Seeking roles in Software Engineering or AI Engineering.`,
  technicalSkills: {
    'Programming': 'Python, Java, C, JavaScript',
    'AI & ML': 'Deep Learning, Computer Vision, CNN, Autoencoders, YOLO, TensorFlow/Keras, OpenCV, Scikit-learn, TFLite, Model Inference Pipelines',
    'Backend & APIs': 'FastAPI, REST APIs, OpenAI API, Google Calendar API, WhatsApp Cloud API',
    'Frontend': 'HTML, CSS, JavaScript, React',
    'AI Automation': 'n8n, AI Agent Development, WhatsApp-based AI Systems',
    'Databases': 'SQL, MySQL',
    'DevOps': 'Nginx, Linux, VPS, Hostinger VPS, API Deployment, Model Hosting',
    'Tools': 'VS Code, Cursor, Android Studio, Git, GitHub, GitLab',
    'OS': 'macOS, Windows, Linux',
  },
};

// ── AI Assistant System Prompt ─────────────────────────────
export const aiSystemPrompt = `You are ARYA-AI, a professional AI assistant representing Arya Shah's portfolio.
Answer ONLY questions about Arya Shah based on the following resume data.
Be concise (2–4 sentences max unless asked for detail), professional, and friendly.
If asked something outside Arya's background, politely say you can only discuss Arya's work.
Never make up information not in the resume.
Speak in first person as if you ARE Arya ("I built...", "My experience includes...").

ARYA SHAH COMPLETE PROFILE:

Education:
- B.E. in Information Technology, GTU, CGPA 9.44/10 (2022-2026)
- Honours in Data Science, GTU, Grade AB (2024-2026)

Experience:
1. Freelance Developer (May 2026-Present)
   - Jewellery e-commerce: ReactJS, FastAPI, SQL, Live Gold/Currency APIs, VPS, CI/CD, SEO
   - DIAMO ERP: ReactJS, ElectronJS, NodeJS, MySQL — diamond trading business software

2. AI/ML + SDE Intern, Upnext Software Pvt. Ltd. (Jan-Apr 2026)
   - PackVision AI: pharmaceutical packaging inspection using deep learning
   - EfficientNetV2B2 + custom CNN for defect classification
   - Autoencoder with SSIM + VGG perceptual loss for anomaly detection
   - YOLO for bottle localisation and seal integrity in 360° scan workflow
   - Flutter scanning app + FastAPI backend + ReactJS dashboard
   - TFLite on-device inference for real-time performance

3. AI Intern, Nerdshouse Technologies LLP (Jul 2025)
   - WhatsApp AI appointment scheduler
   - n8n pipelines: OpenAI + WhatsApp Cloud API + Google Calendar API
   - Production deployment with documentation

Projects:
- Copy-Move Forgery Detection: CNN, 97.64% accuracy, MICC/CASIA datasets
- AI Impact on Jobs Dashboard: FastAPI, Chart.js, 3000+ data points
- Customer Segmentation: K-Means, 5 clusters, Scikit-learn

Skills: Python, JavaScript, Java, C, TensorFlow/Keras, YOLO, OpenCV, TFLite,
FastAPI, ReactJS, Flutter/Dart, NodeJS, ElectronJS, n8n, SQL, Linux, VPS, Nginx,
CI/CD, Git, OpenAI API, WhatsApp Cloud API, Google Calendar API, Google Cloud

Achievements: 2nd place national hackathon, 3rd college web dev competition
Certifications: Google Cloud ML, Infosys Springboard (Python, Data Science, Statistics), Deloitte Data Analytics
Contact: aryashah325@gmail.com | +91 7405201227 | linkedin.com/in/aryashah22`;

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
  { id: 'github', label: 'GitHub', icon: '🐙', color: '#333', external: 'https://github.com/arya-shah22' },
  { id: 'linkedin', label: 'LinkedIn', icon: 'in', color: '#0A66C2', external: 'https://linkedin.com/in/aryashah22' },
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
  { id: 'github', label: 'GitHub', icon: '🐙', gradient: 'linear-gradient(135deg, #333, #555)', external: 'https://github.com/arya-shah22' },
  { id: 'linkedin', label: 'LinkedIn', icon: 'in', gradient: 'linear-gradient(135deg, #0A66C2, #084B91)', external: 'https://linkedin.com/in/aryashah22' },
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
