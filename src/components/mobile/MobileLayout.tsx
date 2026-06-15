'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  personalInfo,
  bio,
  projects,
  experiences,
  skillCategories,
  quickStats,
  education,
  certifications
} from '@/data/portfolio';
import Contact from '@/components/apps/Contact';
import AIAssistant from '@/components/apps/AIAssistant';
import styles from './MobileLayout.module.css';

type Tab = 'about' | 'projects' | 'experience' | 'skills' | 'contact';

// Map project ID to list of public image paths
const getProjectImages = (id: number): string[] => {
  switch (id) {
    case 1:
      return [
        '/projects/jewellery/img1.webp',
        '/projects/jewellery/img2.webp',
        '/projects/jewellery/img3.webp',
        '/projects/jewellery/img4.webp'
      ];
    case 2:
      return [
        '/projects/diamo/img1.webp',
        '/projects/diamo/img2.webp',
        '/projects/diamo/img3.webp',
        '/projects/diamo/img4.webp',
        '/projects/diamo/img5.webp',
        '/projects/diamo/img6.webp',
        '/projects/diamo/img7.webp'
      ];
    case 3:
      return ['/projects/packvision/img1.webp'];
    case 4:
      return [
        '/projects/whatsapp/img1.webp',
        '/projects/whatsapp/img2.webp',
        '/projects/whatsapp/img3.webp',
        '/projects/whatsapp/img4.webp',
        '/projects/whatsapp/img5.webp',
        '/projects/whatsapp/img6.webp'
      ];
    case 5:
      return ['/projects/forgery/img1.webp'];
    case 6:
      return [
        '/projects/aijobs/img1.webp',
        '/projects/aijobs/img2.webp',
        '/projects/aijobs/img3.webp',
        '/projects/aijobs/img4.webp',
        '/projects/aijobs/img5.webp'
      ];
    case 7:
      return ['/projects/segmentation/img1.webp'];
    default:
      return [];
  }
};

const badgeClass = (badge: string) => {
  const b = badge.toUpperCase();
  if (b.includes('AI') || b.includes('ML') || b.includes('ACCURACY')) return 'badge-ml';
  if (b.includes('LIVE')) return 'badge-live';
  if (b.includes('AUTOMATION') || b.includes('DATA')) return 'badge-ai';
  return 'badge-default';
};

// Sub-component to manage project image carousel state per project
function ProjectCarousel({ id, title }: { id: number; title: string }) {
  const images = getProjectImages(id);
  const [idx, setIdx] = useState(0);

  if (images.length === 0) return null;

  return (
    <div className={styles.projectImageWrapper}>
      <img src={images[idx]} alt={`${title} - View ${idx + 1}`} className={styles.projectImage} />
      
      {images.length > 1 && (
        <>
          <button
            onClick={() => setIdx((prev) => (prev - 1 + images.length) % images.length)}
            className={`${styles.projectCarouselBtn} ${styles.carouselLeft}`}
            aria-label="Previous image"
          >
            ‹
          </button>
          <button
            onClick={() => setIdx((prev) => (prev + 1) % images.length)}
            className={`${styles.projectCarouselBtn} ${styles.carouselRight}`}
            aria-label="Next image"
          >
            ›
          </button>
          <div className={styles.carouselIndicator}>
            {idx + 1} / {images.length}
          </div>
        </>
      )}
    </div>
  );
}

export default function MobileLayout() {
  const [activeTab, setActiveTab] = useState<Tab>('about');
  const [aiOpen, setAiOpen] = useState(false);
  const [stackOpen, setStackOpen] = useState(false);
  const [expandedProjectId, setExpandedProjectId] = useState<number | null>(null);
  const [expandedExpId, setExpandedExpId] = useState<number | null>(null);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [activeTab]);

  const tabsConfig = [
    { id: 'about' as Tab, label: 'About', icon: '👤' },
    { id: 'projects' as Tab, label: 'Projects', icon: '📁' },
    { id: 'experience' as Tab, label: 'Work', icon: '💼' },
    { id: 'skills' as Tab, label: 'Skills', icon: '⚡' },
    { id: 'contact' as Tab, label: 'Contact', icon: '✉️' },
  ];

  // Map tabs to indices to calculate swipe directions
  const tabList: Tab[] = ['about', 'projects', 'experience', 'skills', 'contact'];
  const currentTabIndex = tabList.indexOf(activeTab);

  const handleDragEnd = (event: any, info: any) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold && currentTabIndex < tabList.length - 1) {
      // Swipe left -> next tab
      setActiveTab(tabList[currentTabIndex + 1]);
    } else if (info.offset.x > swipeThreshold && currentTabIndex > 0) {
      // Swipe right -> prev tab
      setActiveTab(tabList[currentTabIndex - 1]);
    }
  };

  return (
    <div className={styles.mobileRoot}>
      {/* Mobile Top Header */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.avatar} style={{ overflow: 'hidden' }}>
            <img
              src="/avatar_cartoon.jpg"
              alt="Avatar"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div>
            <h1 className={styles.headerName}>{personalInfo.fullName}</h1>
            <p className={styles.headerRole}>{personalInfo.role}</p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <a href="/divyanshu-patel-resume.pdf" download className={styles.resumeBtn}>
            Resume 📄
          </a>
          <button
            onClick={() => setStackOpen(true)}
            className={styles.resumeBtn}
            style={{ borderColor: 'rgba(94, 155, 240, 0.4)', background: 'rgba(94, 155, 240, 0.1)' }}
          >
            Stack ⚙️
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className={styles.mainContent} ref={scrollContainerRef}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={handleDragEnd}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ type: 'tween', ease: 'easeOut', duration: 0.2 }}
            style={{ minHeight: '100%', touchAction: 'pan-y' }}
          >
            {activeTab === 'about' && (
              <div className={styles.aboutContainer}>
                {/* Hero Card */}
                <div className={`${styles.card} ${styles.heroCard}`}>
                  <div className={styles.heroAvatar} style={{ overflow: 'hidden' }}>
                    <img
                      src="/avatar_cartoon.jpg"
                      alt="Avatar"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <h2 className={styles.heroName}>{personalInfo.fullName}</h2>
                  <p className={styles.heroRole}>{personalInfo.role}</p>
                  <p className={styles.heroBio}>{bio}</p>
                  
                </div>

                {/* Stats Grid */}
                <h3 className={styles.sectionTitle}>📈 Quick Highlights</h3>
                <div className={styles.statsGrid}>
                  {quickStats.map((stat, i) => (
                    <div key={i} className={`${styles.card} ${styles.statCard}`}>
                      <div className={styles.statValue}>{stat.value}</div>
                      <div className={styles.statLabel}>{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'projects' && (
              <div className={styles.projectsContainer}>
                <h3 className={styles.sectionTitle} style={{ marginBottom: '12px' }}>📁 Featured Projects</h3>
                {projects.map((project) => {
                  const isExpanded = expandedProjectId === project.id;
                  return (
                    <div key={project.id} className={`${styles.card} ${styles.projectCard}`}>
                      {/* Project Image Carousel */}
                      <ProjectCarousel id={project.id} title={project.title} />

                      {/* Project Header and Stack */}
                      <div className={styles.projectBody}>
                        <div className={styles.projectHeader}>
                          <h4 className={styles.projectTitle}>{project.title}</h4>
                          <div className={styles.badgesRow}>
                            {project.badges.map((badge, idx) => (
                              <span key={idx} className={`badge ${badgeClass(badge)} ${styles.projectBadge}`}>
                                {badge}
                              </span>
                            ))}
                          </div>
                        </div>

                        <p className={styles.projectShortDesc}>
                          {project.shortDescription}
                        </p>

                        <div className={styles.techRow}>
                          {project.stack.slice(0, 5).map((tech, idx) => (
                            <span key={idx} className={styles.techChip}>
                              {tech}
                            </span>
                          ))}
                          {project.stack.length > 5 && (
                            <span className={styles.techChip} style={{ borderStyle: 'dashed' }}>
                              +{project.stack.length - 5} more
                            </span>
                          )}
                        </div>

                        <button
                          onClick={() => setExpandedProjectId(isExpanded ? null : project.id)}
                          className={styles.expandBtn}
                        >
                          {isExpanded ? 'Hide Details ▲' : 'Show Details ▼'}
                        </button>

                        {/* Collapsible Details */}
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25 }}
                              style={{ overflow: 'hidden' }}
                            >
                              <div className={styles.expandedDetails}>
                                <div className={styles.fullDesc}>
                                  <strong>Description:</strong>
                                  <p style={{ marginTop: '4px', marginBottom: '8px' }}>{project.fullDescription}</p>
                                </div>

                                {project.architecture && (
                                  <div className={styles.fullDesc}>
                                    <strong>Architecture:</strong>
                                    <p style={{ marginTop: '4px', marginBottom: '8px', fontFamily: 'var(--font-mono, monospace)', fontSize: '10.5px' }}>
                                      {project.architecture}
                                    </p>
                                  </div>
                                )}

                                {project.highlights && project.highlights.length > 0 && (
                                  <div>
                                    <strong style={{ fontSize: '12px' }}>Key Deliverables & Highlights:</strong>
                                    <ul className={styles.highlightsList} style={{ marginTop: '6px' }}>
                                      {project.highlights.map((highlight, idx) => (
                                        <li key={idx} className={styles.highlightItem}>
                                          {highlight}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}

                                <div>
                                  <strong style={{ fontSize: '12px' }}>Complete Stack:</strong>
                                  <div className={styles.allTechRow} style={{ marginTop: '6px' }}>
                                    {project.stack.map((tech, idx) => (
                                      <span key={idx} className={styles.techChip} style={{ borderColor: 'rgba(94, 155, 240, 0.3)' }}>
                                        {tech}
                                      </span>
                                    ))}
                                  </div>
                                </div>

                                {(project.githubUrl || project.liveUrl) && (
                                  <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                                    {project.githubUrl && (
                                      <a
                                        href={project.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.expandBtn}
                                        style={{ flex: 1, background: 'rgba(255,255,255,0.08)', textDecoration: 'none' }}
                                      >
                                        GitHub ↗
                                      </a>
                                    )}
                                    {project.liveUrl && (
                                      <a
                                        href={project.liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.expandBtn}
                                        style={{ flex: 1, background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple))', border: 'none', color: '#fff', textDecoration: 'none' }}
                                      >
                                        Live Demo ↗
                                      </a>
                                    )}
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {activeTab === 'experience' && (
              <div className={styles.experienceContainer}>
                <h3 className={styles.sectionTitle}>💼 Professional Experience</h3>
                {experiences.map((exp) => {
                  const isExpanded = expandedExpId === exp.id;
                  return (
                    <div
                      key={exp.id}
                      className={`${styles.card} ${styles.expCard}`}
                      style={{ borderLeftColor: exp.color }}
                    >
                      <div className={styles.expHeader}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <h4 className={styles.expRole}>{exp.role}</h4>
                          <span className={styles.expPeriod}>{exp.period}</span>
                        </div>
                        <div className={styles.expCompany}>
                          {exp.company} {exp.location && `· ${exp.location}`}
                        </div>
                      </div>

                      {/* Display projects inside this experience */}
                      {exp.projects.map((proj, pIdx) => (
                        <div key={pIdx} style={{ marginTop: '10px' }}>
                          <div className={styles.expProjectName}>🛠️ {proj.name}</div>
                          <div className={styles.expProjectStack}>Stack: {proj.stack}</div>
                          
                          <ul className={styles.expBullets}>
                            {(isExpanded ? proj.bullets : proj.bullets.slice(0, 3)).map((bullet, idx) => (
                              <li key={idx}>{bullet}</li>
                            ))}
                          </ul>
                          
                          {proj.bullets.length > 3 && (
                            <button
                              onClick={() => setExpandedExpId(isExpanded ? null : exp.id)}
                              className={styles.expandBtn}
                              style={{ padding: '4px 8px', minHeight: '28px', marginTop: '6px', fontSize: '10px' }}
                            >
                              {isExpanded ? 'Show Less ▲' : `Show ${proj.bullets.length - 3} More bullets ▼`}
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            )}

            {activeTab === 'skills' && (
              <div className={styles.skillsContainer}>
                {/* Core Skills Subsection */}
                <h3 className={styles.sectionTitle}>⚡ Technical Skills</h3>
                {skillCategories.map((cat) => (
                  <div key={cat.id} className={`${styles.card} ${styles.skillCatCard}`}>
                    <h4 className={styles.skillCatLabel}>{cat.label}</h4>
                    <div className={styles.skillRow}>
                      {cat.skills.map((skill, idx) => (
                        <div key={idx} className={styles.skillItem}>
                          <div className={styles.skillMeta}>
                            <span className={styles.skillName}>{skill.name}</span>
                            <span className={styles.skillLevel}>{skill.level}%</span>
                          </div>
                          <div className={styles.skillTrack}>
                            <div className={styles.skillFill} style={{ width: `${skill.level}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Education Subsection */}
                <h3 className={styles.sectionTitle} style={{ marginTop: '8px' }}>🎓 Education</h3>
                {education.map((edu) => (
                  <div key={edu.id} className={`${styles.card} ${styles.educationCard}`}>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <span className={styles.eduIcon}>{edu.icon}</span>
                      <div>
                        <h4 className={styles.eduDegree}>{edu.degree}</h4>
                        <div className={styles.eduField}>{edu.field}</div>
                      </div>
                    </div>
                    <div className={styles.eduInstitution}>{edu.institution}</div>
                    <div className={styles.eduMeta}>
                      <span>📅 {edu.period}</span>
                      <span>📊 {edu.gradeLabel}: {edu.grade}</span>
                    </div>
                    <div className={edu.areas.length > 0 ? styles.eduAreas : ''}>
                      {edu.areas.map((area, idx) => (
                        <span key={idx} className={styles.eduAreaTag}>
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Certifications Subsection */}
                <h3 className={styles.sectionTitle} style={{ marginTop: '8px' }}>🏆 Certifications</h3>
                {certifications.map((cert) => (
                  <div
                    key={cert.id}
                    className={`${styles.card} ${styles.certCard}`}
                    style={{ borderLeft: `3px solid ${cert.accent}` }}
                  >
                    <span className={cert.icon ? styles.certIcon : ''}>{cert.icon}</span>
                    <div className={styles.certBody}>
                      <h4 className={cert.issuer}>{cert.issuer}</h4>
                      {cert.items.map((item, idx) => (
                        <p key={idx} className={styles.certItem}>
                          • {item}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'contact' && (
              <div className={styles.contactContainer}>
                <h3 className={styles.sectionTitle}>✉️ Contact Info</h3>
                <Contact />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Floating AI Assistant Trigger Button */}
      <motion.button
        onClick={() => setAiOpen(true)}
        className={styles.aiFab}
        whileTap={{ scale: 0.9 }}
      >
        🤖
      </motion.button>

      {/* AI Assistant Modal Overlay */}
      <AnimatePresence>
        {aiOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.aiOverlay}
          >
            <div className={styles.aiCloseRow}>
              <button
                onClick={() => setAiOpen(false)}
                className={styles.aiCloseBtn}
              >
                ✕
              </button>
            </div>
            <div className={styles.aiContent}>
              <AIAssistant />
            </div>
          </motion.div>
        )}
      </AnimatePresence>



      {/* Tech Stack Right Side Drawer Sheet */}
      <AnimatePresence>
        {stackOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.drawerOverlay}
            onClick={() => setStackOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={styles.drawerContent}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.drawerHeader}>
                <h3 className={styles.drawerTitle}>⚙️ Website Tech Stack</h3>
                <button
                  onClick={() => setStackOpen(false)}
                  className={styles.drawerCloseBtn}
                >
                  ✕
                </button>
              </div>

              <div className={styles.drawerList}>
                <div className={styles.drawerItem}>
                  <span>⚛️</span>
                  <span>React 19</span>
                </div>
                <div className={styles.drawerItem}>
                  <span>⚡</span>
                  <span>Next.js 16</span>
                </div>
                <div className={styles.drawerItem}>
                  <span>📘</span>
                  <span>TypeScript</span>
                </div>
                <div className={styles.drawerItem}>
                  <span>🎨</span>
                  <span>Vanilla CSS</span>
                </div>
                <div className={styles.drawerItem}>
                  <span>🎬</span>
                  <span>Framer Motion</span>
                </div>
                <div className={styles.drawerItem}>
                  <span>📦</span>
                  <span>Zustand Store</span>
                </div>
                <div className={styles.drawerItem}>
                  <span>🌐</span>
                  <span>Vite (Showcase)</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Navigation Tab Bar */}
      <nav className={styles.navBar}>
        {tabsConfig.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`${styles.navTab} ${isActive ? styles.navTabActive : styles.navTabInactive}`}
            >
              <span className={styles.navIcon}>{tab.icon}</span>
              <span className={styles.navLabel}>{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
