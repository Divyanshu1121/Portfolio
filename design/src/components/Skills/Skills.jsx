import { Award, ShieldAlert, Cpu, Database, LayoutTemplate, Settings2 } from 'lucide-react';
import './Skills.css';

export default function Skills() {
  const skillCategories = [
    {
      title: "AI & Machine Learning",
      icon: <Cpu size={22} />,
      skills: ["Deep Learning", "Computer Vision", "CNNs", "Autoencoders", "YOLO", "TensorFlow", "Keras", "OpenCV", "Scikit-Learn", "Model Pipelines"]
    },
    {
      title: "Backend & APIs",
      icon: <Database size={22} />,
      skills: ["FastAPI", "RESTful APIs", "Node.js", "Python", "SQL", "OpenAI APIs", "Google Calendar API", "WhatsApp Cloud API", "n8n Workflows"]
    },
    {
      title: "Frontend Development",
      icon: <LayoutTemplate size={22} />,
      skills: ["React", "HTML5", "CSS3", "JavaScript", "GSAP Animations", "Three.js Graphics", "Flutter", "Dart", "Responsive Design"]
    },
    {
      title: "DevOps & Platforms",
      icon: <Settings2 size={22} />,
      skills: ["Nginx", "Linux Server Admin", "VPS Hosting", "API Hosting", "Git / GitHub", "VS Code", "Android Studio"]
    }
  ];

  const accomplishments = [
    {
      title: "National Hackathon Runner-up",
      detail: "2nd Winner in National-level technical festival Hackathon, solving real-world AI challenges."
    },
    {
      title: "College Web Development Winner",
      detail: "3rd Winner in College-level Web Development competition for creative design and functionality."
    }
  ];

  const certifications = [
    {
      title: "Data Analytics Job Simulation",
      provider: "Deloitte Australia (via Forage)",
      date: "Issued Jun 2025",
      id: "YSNbQq8kAMaEZcCEf",
      link: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/9PBTqmSxAf6zZTseP/io9DzWKe3PTsiS6GG_9PBTqmSxAf6zZTseP_TBgWviEsE8do5gXgX_1748974040012_completion_certificate.pdf",
      skills: ["Data Modeling", "Data Analysis"],
      embedUrl: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/9PBTqmSxAf6zZTseP/io9DzWKe3PTsiS6GG_9PBTqmSxAf6zZTseP_TBgWviEsE8do5gXgX_1748974040012_completion_certificate.pdf"
    },
    {
      title: "Introduction to Business Intelligence",
      provider: "Infosys Springboard",
      date: "Issued Mar 2025",
      link: "https://drive.google.com/file/d/1GCap1_nc9_K-IpwvZVxCJm-NZ9jXQlKc/view",
      skills: ["Business Intelligence (BI)", "BI Tools"],
      embedUrl: "https://drive.google.com/file/d/1GCap1_nc9_K-IpwvZVxCJm-NZ9jXQlKc/preview"
    },
    {
      title: "Data Science with Python",
      provider: "Infosys Springboard",
      date: "Issued Aug 2024",
      link: "https://drive.google.com/file/d/1utDuBzK-DE0wfbHkyevWwzzvERoJ-5vp/view",
      skills: ["Python (Programming Language)", "Data Science"],
      embedUrl: "https://drive.google.com/file/d/1utDuBzK-DE0wfbHkyevWwzzvERoJ-5vp/preview"
    },
    {
      title: "Google Cloud Computing Foundations: Data, ML, and AI",
      provider: "Google Cloud",
      date: "Issued Sep 2023",
      id: "5296494",
      link: "https://www.skills.google/public_profiles/7f98d657-c9f5-4a60-985b-d7dbbc072338/badges/5296494?utm_medium=social&utm_source=linkedin&utm_campaign=ql-social-share",
      skills: ["Google Cloud", "Data, ML & AI"],
      embedUrl: "https://www.skills.google/public_profiles/7f98d657-c9f5-4a60-985b-d7dbbc072338/badges/5296494"
    },
    {
      title: "Google Cloud The Arcade",
      provider: "Google Cloud",
      date: "Issued Sep 2023",
      id: "5242527",
      link: "https://www.skills.google/public_profiles/7f98d657-c9f5-4a60-985b-d7dbbc072338/badges/5242527?utm_medium=social&utm_source=linkedin&utm_campaign=ql-social-share",
      skills: ["Google Cloud Platform", "Arcade Badges"],
      embedUrl: "https://www.skills.google/public_profiles/7f98d657-c9f5-4a60-985b-d7dbbc072338/badges/5242527"
    }
  ];

  return (
    <section id="skills" className="skills-section">
      <div className="container">
        <h2 className="section-title">
          Expertise & <span className="text-gradient">Skills</span>
        </h2>

        <div className="skills-grid">
          {skillCategories.map((cat, index) => (
            <div className="skills-category-card" key={index}>
              <div className="cat-header">
                {cat.icon}
                <h3>{cat.title}</h3>
              </div>
              <div className="skills-list">
                {cat.skills.map((skill, sIdx) => (
                  <span className="skill-item" key={sIdx}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Credentials & Achievements */}
        <div className="credentials-box">
          <div className="achievements-section">
            <h3 className="sub-section-title">
              <Award size={20} className="sub-icon" />
              <span>Achievements</span>
            </h3>
            <div className="achievements-list">
              {accomplishments.map((acc, index) => (
                <div className="achievement-card" key={index}>
                  <h4>{acc.title}</h4>
                  <p>{acc.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="certifications-section">
            <h3 className="sub-section-title">
              <Award size={20} className="sub-icon" />
              <span>Certifications</span>
            </h3>
            <div className="certifications-grid-custom">
              {certifications.map((cert, index) => (
                <div className="cert-card-premium" key={index}>
                  <div className="cert-info">
                    <span className="cert-provider-name">{cert.provider}</span>
                    <h4 className="cert-title-text">{cert.title}</h4>
                    <div className="cert-meta-data">
                      <span className="cert-date">{cert.date}</span>
                      {cert.id && <span className="cert-id">ID: {cert.id}</span>}
                    </div>
                    {cert.skills && (
                      <div className="cert-skills">
                        {cert.skills.map((skill, sIdx) => (
                          <span className="cert-skill-tag" key={sIdx}>{skill}</span>
                        ))}
                      </div>
                    )}
                    <a href={cert.link} target="_blank" rel="noopener noreferrer" className="cert-btn-link">
                      Open Credential
                    </a>
                  </div>
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cert-preview-link-wrapper"
                  >
                    <div className="cert-preview-frame">
                      {cert.provider === "Google Cloud" ? (
                        <div className={`cert-preview-custom-badge ${cert.title.includes("Arcade") ? "arcade-theme" : "gcp-theme"}`}>
                          {cert.title.includes("Arcade") ? (
                            <>
                              <div className="arcade-badge-glow">
                                <svg viewBox="0 0 64 64" width="70" height="70" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M16 10 L48 10 L52 22 L48 30 L52 54 L12 54 L16 30 L12 22 Z" fill="#12131a" stroke="#FBBC05" strokeWidth="2.5" />
                                  <rect x="22" y="16" width="20" height="14" rx="2" fill="#1a1c23" stroke="#4285F4" strokeWidth="2" />
                                  <path d="M26 20 L38 20" stroke="#EA4335" strokeWidth="2" strokeLinecap="round" />
                                  <path d="M26 25 L34 25" stroke="#34A853" strokeWidth="2" strokeLinecap="round" />
                                  <rect x="18" y="32" width="28" height="4" rx="1" fill="#2d3748" />
                                  <circle cx="26" cy="34" r="3" fill="#EA4335" />
                                  <circle cx="36" cy="34" r="1.5" fill="#FBBC05" />
                                  <circle cx="40" cy="34" r="1.5" fill="#34A853" />
                                  <path d="M12 44 L52 44" stroke="#FBBC05" strokeWidth="1.5" />
                                </svg>
                              </div>
                              <span className="badge-title">Google Cloud</span>
                              <span className="badge-subtitle">THE ARCADE</span>
                            </>
                          ) : (
                            <>
                              <div className="gcp-badge-glow">
                                <svg viewBox="0 0 120 120" width="75" height="75" xmlns="http://www.w3.org/2000/svg">
                                  <g transform="translate(10, 10)">
                                    <path d="M50,0 L93.3,25 L93.3,75 L50,100 L6.7,75 L6.7,25 Z" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
                                    <path d="M50,0 L93.3,25 L50,50 L6.7,25 Z" fill="#EA4335" />
                                    <path d="M6.7,25 L50,50 L50,100 L6.7,75 Z" fill="#4285F4" />
                                    <path d="M50,50 L93.3,25 L93.3,75 L50,100 Z" fill="#34A853" />
                                    <path d="M50,12 L83,31 L50,50 L17,31 Z" fill="#FBBC05" />
                                  </g>
                                </svg>
                              </div>
                              <span className="badge-title">Google Cloud</span>
                              <span className="badge-subtitle">Data, ML & AI Foundations</span>
                            </>
                          )}
                        </div>
                      ) : (
                        <iframe
                          src={cert.embedUrl}
                          title={cert.title}
                          loading="lazy"
                          frameBorder="0"
                          allowFullScreen
                          className={cert.embedUrl.includes("drive.google.com") ? "drive-iframe" : ""}
                        ></iframe>
                      )}
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
