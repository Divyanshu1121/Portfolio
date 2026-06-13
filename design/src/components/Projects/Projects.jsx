import { useRef, useState } from 'react';
import { ExternalLink, Code2, Cpu, BarChart3, Users, Gem } from 'lucide-react';
import './Projects.css';

// Project image imports
// Jewellery
import jew1 from '../../assets/projects/jewellery/img1.webp';
import jew2 from '../../assets/projects/jewellery/img2.webp';
import jew3 from '../../assets/projects/jewellery/img3.webp';
import jew4 from '../../assets/projects/jewellery/img4.webp';

// DIAMO
import diamo1 from '../../assets/projects/diamo/img1.webp';
import diamo2 from '../../assets/projects/diamo/img2.webp';
import diamo3 from '../../assets/projects/diamo/img3.webp';
import diamo4 from '../../assets/projects/diamo/img4.webp';
import diamo5 from '../../assets/projects/diamo/img5.webp';
import diamo6 from '../../assets/projects/diamo/img6.webp';
import diamo7 from '../../assets/projects/diamo/img7.webp';

// Packvision
import pv1 from '../../assets/projects/packvision/img1.webp';

// Forgery
import forge1 from '../../assets/projects/forgery/img1.webp';

// Whatsapp
import wa1 from '../../assets/projects/whatsapp/img1.webp';
import wa2 from '../../assets/projects/whatsapp/img2.webp';
import wa3 from '../../assets/projects/whatsapp/img3.webp';
import wa4 from '../../assets/projects/whatsapp/img4.webp';
import wa5 from '../../assets/projects/whatsapp/img5.webp';
import wa6 from '../../assets/projects/whatsapp/img6.webp';

// AI Jobs
import jobs1 from '../../assets/projects/aijobs/img1.webp';
import jobs2 from '../../assets/projects/aijobs/img2.webp';
import jobs3 from '../../assets/projects/aijobs/img3.webp';
import jobs4 from '../../assets/projects/aijobs/img4.webp';
import jobs5 from '../../assets/projects/aijobs/img5.webp';

// Segmentation
import seg1 from '../../assets/projects/segmentation/img1.webp';

// Custom inline SVG icons for brands (since lucide-react doesn't bundle brand logos anymore)
const Github = ({ size = 20, ...props }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

// Image Slider/Carousel Component
const ProjectImages = ({ images, title }) => {
  const [currentIdx, setCurrentIdx] = useState(0);

  if (!images || images.length === 0) return null;

  if (images.length === 1) {
    return (
      <div className="project-image-wrapper">
        <img src={images[0]} alt={title} className="project-showcase-img" />
      </div>
    );
  }

  return (
    <div className="project-image-wrapper carousel">
      <img src={images[currentIdx]} alt={`${title} - View ${currentIdx + 1}`} className="project-showcase-img" />

      {currentIdx > 0 && (
        <button
          className="carousel-btn left"
          onClick={(e) => { e.stopPropagation(); setCurrentIdx(prev => prev - 1); }}
          aria-label="Previous image"
        >
          &larr;
        </button>
      )}

      {currentIdx < images.length - 1 && (
        <button
          className="carousel-btn right"
          onClick={(e) => { e.stopPropagation(); setCurrentIdx(prev => prev + 1); }}
          aria-label="Next image"
        >
          &rarr;
        </button>
      )}

      <div className="carousel-indicator">
        {currentIdx + 1} / {images.length}
      </div>
    </div>
  );
};

// Standalone Project Card Component with 3D flip rotation
const ProjectCard = ({ proj, index }) => {
  const cardRef = useRef(null);
  const [rotation, setRotation] = useState(0);

  const handleFlip = (e) => {
    e.stopPropagation();
    setRotation(prev => prev + 180);
  };

  const handleShowImages = (e) => {
    e.stopPropagation();
    setRotation(prev => prev + 180);
    // Smooth scroll the card back into view after collapsing
    setTimeout(() => {
      if (cardRef.current) {
        if (window.lenis) {
          // scroll to the card with an offset of -80px to account for the header
          window.lenis.scrollTo(cardRef.current, { offset: -100, duration: 1.0 });
        } else {
          cardRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }, 150);
  };

  const isFlipped = (rotation / 180) % 2 !== 0;

  return (
    <div className="project-card-perspective" ref={cardRef}>
      <div
        className={`project-card-inner ${isFlipped ? 'is-flipped' : ''}`}
        style={{ transform: `rotateY(${rotation}deg)` }}
      >
        {/* FRONT FACE (Showcase Images) */}
        <div className="project-card-face project-card-front project-card">
          <div className="card-tab-header">
            <div className="tab-left">
              {proj.icon}
              <span className="project-index">0{index + 1}</span>
              <h3>{proj.title}</h3>
            </div>
            <span className="project-type">{proj.type}</span>
          </div>

          <div className="card-body-content">
            <div className="card-media-view">
              <ProjectImages images={proj.images} title={proj.title} />

              <div className="image-button-overlay">
                <button
                  className="toggle-details-btn overlay-btn"
                  onClick={handleFlip}
                >
                  Show Project Details
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* BACK FACE (Project Details) */}
        <div className="project-card-face project-card-back project-card">
          <div className="card-tab-header">
            <div className="tab-left">
              {proj.icon}
              <span className="project-index">0{index + 1}</span>
              <h3>{proj.title}</h3>
            </div>
            <span className="project-type">{proj.type}</span>
          </div>

          <div className="card-body-content">
            <div className="card-tab-content">
              <div className="project-details">
                <p className="project-desc">{proj.desc}</p>

                <div className="highlights-box">
                  <h4>Key Deliverables:</h4>
                  <ul>
                    {proj.highlights.map((high, hIdx) => (
                      <li key={hIdx}>{high}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="project-aside">
                <div className="project-tech-box">
                  <h4>Technologies:</h4>
                  <div className="tech-tags">
                    {proj.tech.map((t, tIdx) => (
                      <span key={tIdx} className="tech-tag">{t}</span>
                    ))}
                  </div>
                </div>

                <div className="project-links">
                  <a
                    href={proj.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link-btn"
                  >
                    <Github size={18} />
                    <span>Code Repository</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="card-toggle-footer">
            <button
              className="toggle-details-btn"
              onClick={handleShowImages}
            >
              Show Images
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Projects() {
  const containerRef = useRef(null);

  const projects = [
    {
      title: "Diamond & Jewellery Website",
      type: "Full Stack & SEO Handling",
      icon: <Gem size={24} />,
      images: [jew1, jew2, jew3, jew4],
      desc: "Modern jewellery showcase and inventory management platform developed for the diamond and luxury jewellery industry. Built using ReactJS, FastAPI, Python, and SQL, the platform provides responsive product showcasing, inventory management, customer inquiry workflows, and scalable backend operations. Features include dynamic product listings, admin dashboard, multi-user stock handling, live gold rate integration, currency conversion APIs, and automated data refresh systems. Focused on scalability, performance, modern UI/UX, and business-oriented functionality.",
      highlights: [
        "Built a scalable full-stack architecture for jewellery business operations",
        "Integrated real-time gold pricing and currency conversion systems",
        "Developed inventory workflows for efficient product management",
        "Designed responsive and modern user interfaces for premium branding",
        "Focused on performance, scalability, and business-oriented functionality",
        "Dynamic product catalog and showcase system with categories and filtering",
        "Customer inquiry and contact workflows with automated periodic data refresh"
      ],
      tech: ["ReactJS", "FastAPI", "Python", "SQL", "Live Gold Rate API", "Currency conversion API", "REST APIs", "Nginx", "VPS", "SEO Optimization", "HTML/CSS", "JavaScript", "Inventory Management"],
      github: "https://github.com/arya-shah22"
    },
    {
      title: "DIAMO Software",
      type: "Diamond Trading Management ERP",
      icon: <Cpu size={24} />,
      images: [diamo1, diamo2, diamo3, diamo4, diamo5, diamo6, diamo7],
      desc: "DIAMO is a full-stack diamond trading and business management software developed to streamline inventory, transactions, financial tracking, and daily business operations for diamond businesses. Built using ReactJS, Node.js, and SQL, the platform includes modules for buy/sale entries, returns, stock management, party ledger, payments, loans, expenses, reports, and automated daily backups. The system focuses on scalable architecture, secure data handling, responsive UI, and efficient workflow management for real-world trading operations.",
      highlights: [
        "Developed a production-oriented business management system tailored for the diamond trading industry",
        "Designed scalable transaction and ledger management workflows",
        "Implemented inventory and stock management capabilities for operational efficiency",
        "Built secure and structured database systems for handling financial and trading records",
        "Dashboard, Buy/Sale Entries, Returns, Ledger, Payments, Loans, Expenses, and Reports",
        "Automated daily backup system for data safety and security"
      ],
      tech: ["ReactJS", "Node.js", "SQL Database", "JavaScript", "HTML/CSS", "Inventory Management", "ERP Software", "Financial Ledger System", "Database Security", "Daily Backup Utility"],
      github: "https://github.com/arya-shah22"
    },
    {
      title: "PackVision AI",
      type: "Computer Vision & Deep Learning (SDE + AI/ML)",
      icon: <Cpu size={24} />,
      images: [pv1],
      desc: "PackVision AI is an AI-powered pharmaceutical inspection and verification system developed using Computer Vision and Deep Learning technologies. The platform automates medicine packaging validation, bottle inspection, OCR-based label verification, and defect detection in real time. Built with Python, TensorFlow, YOLO, OpenCV, FastAPI, Flutter, and ReactJS, the system includes 360° bottle scanning workflows, AI inference pipelines, anomaly detection systems, and monitoring dashboards for scalable industrial inspection operations.",
      highlights: [
        "Developed defect detection pipelines using EfficientNetV2B2 and custom CNN architectures",
        "Built anomaly detection systems using autoencoders, SSIM, and VGG perceptual loss",
        "Trained YOLO-based object detection models for bottle localization and seal verification",
        "Integrated OCR and document detection workflows using Google ML Kit",
        "Developed real-time AI inference pipelines and 360° bottle scanning workflows",
        "FastAPI backend APIs and ReactJS admin dashboard for inspection monitoring"
      ],
      tech: ["Python", "TensorFlow", "YOLO", "OpenCV", "EfficientNetV2B2", "CNN Models", "TFLite", "Flutter", "Dart", "FastAPI", "ReactJS", "Google ML Kit", "Computer Vision", "Deep Learning", "Artificial Intelligence"],
      github: "https://github.com/arya-shah22"
    },
    {
      title: "WhatsApp-Based AI Appointment Scheduler",
      type: "AI Agent & Workflow Automation",
      icon: <Code2 size={24} />,
      images: [wa1, wa2, wa3, wa4, wa5, wa6],
      desc: "WhatsApp Based AI Appointment Scheduler is an AI-powered business automation system developed to automate appointment scheduling, reminders, meeting management, and customer communication through WhatsApp. Built using OpenAI API, n8n, WhatsApp Cloud API, Google Calendar API, Python, and workflow automation systems, the platform supports real-time scheduling, reminders, rescheduling, cancellation handling, and automated notifications. The system focuses on AI-driven conversational workflows, scalable automation architecture, API integrations, and reliable business process management.",
      highlights: [
        "Developed AI-driven automation workflows for appointment scheduling and notifications using n8n and OpenAI",
        "Integrated WhatsApp Cloud API for real-time communication and automated responses",
        "Connected Google Calendar APIs for event creation, reminder scheduling, rescheduling, and cancellation workflows",
        "Implemented workflow validation and edge-case handling for overlapping events and third-party API failures",
        "Designed scalable automation architectures for real-world business scheduling operations"
      ],
      tech: ["n8n", "OpenAI API", "WhatsApp Cloud API", "Google Calendar API", "Google Sheets API", "Python", "Workflow Automation", "AI Agent Development", "Google APIs", "Conflict Detection"],
      github: "https://github.com/arya-shah22"
    },
    {
      title: "Copy-Move Forgery Image Detection",
      type: "Computer Vision & Deep Learning (AI/ML Developer)",
      icon: <Cpu size={24} />,
      images: [forge1],
      desc: "Copy-Move Forgery Image Detection is an AI-powered digital image forensics system developed to detect manipulated or tampered images using Deep Learning and Computer Vision techniques. Built using Python, CNN, OpenCV, TensorFlow, and benchmark datasets like MICC and CASIA, the system identifies duplicated image regions, performs feature extraction, similarity analysis, and forgery localization with high precision. The project achieved 97.64% accuracy through advanced preprocessing, pattern recognition, and CNN-based image analysis workflows.",
      highlights: [
        "Developed a CNN-based forgery detection model capable of identifying duplicated image regions with high precision",
        "Implemented advanced image preprocessing pipelines including noise reduction, normalization, segmentation, and feature enhancement",
        "Applied feature extraction and similarity matching techniques to detect hidden tampered areas within images",
        "Trained and evaluated the system using MICC and CASIA benchmark datasets widely used in digital image forensics research",
        "Optimized the model architecture and preprocessing workflows to achieve 97.64% detection accuracy"
      ],
      tech: ["Python", "CNN", "OpenCV", "TensorFlow", "Keras", "NumPy", "MICC Dataset", "CASIA Dataset", "Computer Vision", "Deep Learning", "Image Processing", "OpenCL", "Pattern Recognition", "Digital Image Forensics"],
      github: "https://github.com/arya-shah22"
    }
  ];

  return (
    <section id="projects" className="projects-section" ref={containerRef}>
      <div className="container">
        <h2 className="section-title">
          <span className="text-gradient">Projects</span>
        </h2>

        <div className="cards-stack-container">
          {projects.map((proj, index) => (
            <ProjectCard proj={proj} index={index} key={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

