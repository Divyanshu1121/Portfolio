import { useRef, useEffect } from 'react';
import { Calendar, Briefcase, MapPin } from 'lucide-react';
import './Experience.css';

// Tab height = visible strip of a covered card's header (must match card top-padding + header + header padding-bottom)
const TAB_HEIGHT = 75;
// Where the first card sticks
const STICKY_START = 100;

export default function Experience() {
  const stackRef = useRef(null);
  const cardRefs = useRef([]);

  const setCardRef = (index) => (el) => {
    cardRefs.current[index] = el;
  };

  const experiences = [
    {
      role: "Freelance",
      company: "Self-employed",
      period: "Apr 2026 - Present · 2 mos",
      location: "Surat, Gujarat, India · On-site",
      description: "Building AI-powered automation systems, scalable backend applications, production ready softwares, and modern web platforms for clients across different domains.",
      skills: ["ReactJS", "Python", "FastAPI", "OpenAI APIs", "n8n", "Computer Vision", "Deep Learning", "REST APIs", "Linux/VPS"],
      points: [
        "Developing full-stack applications using ReactJS, Python, FastAPI, and modern APIs",
        "Building AI automation workflows using OpenAI APIs, WhatsApp Cloud API, Google APIs, and n8n",
        "Creating AI-powered systems involving Computer Vision, Deep Learning, and workflow automation",
        "Designing backend architectures, REST APIs, and database-driven applications",
        "Working on production-ready business solutions including inventory systems, dashboards, and AI-integrated platforms",
        "Deploying and managing applications on Linux/VPS environments with API hosting and automation pipelines"
      ]
    },
    {
      role: "AI / ML Engineering Intern",
      company: "Upnext Software Pvt. Ltd.",
      period: "Jan 2026 - Apr 2026",
      skills: ["Python", "TensorFlow", "YOLO", "Flutter", "Dart", "FastAPI"],
      points: [
        "Developed an AI medicine packaging & bottle inspection system using computer vision pipelines.",
        "Built a 360° bottle scanning workflow in Flutter that processes multiple video frames in real-time.",
        "Implemented a dual-stream defect detection model combining EfficientNetV2B2 and custom CNNs.",
        "Designed an autoencoder anomaly detection system with SSIM and VGG perceptual loss.",
        "Integrated AI inference engines with Flutter frontend and FastAPI backend."
      ]
    },
    {
      role: "AI Workflow Automation Intern",
      company: "Nerdshouse Technologies LLP",
      period: "Jul 2025 - Aug 2025",
      skills: ["n8n", "OpenAI API", "WhatsApp Cloud API", "Google Calendar API"],
      points: [
        "Led development of an AI-based WhatsApp appointment scheduling and automated reminder assistant.",
        "Designed autonomous n8n workflows linking OpenAI LLMs to Google Calendars.",
        "Optimized scheduling workflows to handle edge cases like double-bookings and input errors."
      ]
    }
  ];

  useEffect(() => {
    const stackContainer = stackRef.current;
    if (!stackContainer) return;

    let listening = false;
    let ticking = false;

    const animateCards = () => {
      const cards = cardRefs.current;

      for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        if (!card) continue;

        const rect = card.getBoundingClientRect();
        const stickyTop = STICKY_START + i * TAB_HEIGHT;

        // Card is "stuck" when its top is at (or very near) its sticky offset
        const isStuck = rect.top <= stickyTop + 2;

        if (isStuck && i < cards.length - 1) {
          // Measure how much the NEXT card has overlapped this one
          const nextCard = cards[i + 1];
          if (!nextCard) continue;
          const nextRect = nextCard.getBoundingClientRect();

          // overlap = how many pixels of this card the next card is covering
          const thisBottom = rect.top + rect.height;
          const overlap = Math.max(0, thisBottom - nextRect.top);
          const maxOverlap = rect.height - TAB_HEIGHT;
          const progress = Math.min(1, overlap / maxOverlap);

          // Scale down slightly as coverage increases (1 → 0.92)
          const scale = 1 - progress * 0.08;
          card.style.transform = `scale(${scale.toFixed(4)})`;
        } else {
          // Card is not stuck or is the last card — reset
          card.style.transform = 'scale(1)';
        }
      }

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(animateCards);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if (!listening) {
            window.addEventListener('scroll', onScroll, { passive: true });
            listening = true;
            onScroll(); // run once immediately
          }
        } else {
          if (listening) {
            window.removeEventListener('scroll', onScroll);
            listening = false;
          }
        }
      },
      { threshold: 0.01 }
    );

    observer.observe(stackContainer);

    return () => {
      observer.disconnect();
      if (listening) {
        window.removeEventListener('scroll', onScroll);
      }
    };
  }, []);

  return (
    <section id="experience" className="experience-section">
      <div className="container">
        <h2 className="section-title">
          Professional <span className="text-gradient">Experience</span>
        </h2>

        <div className="exp-stack-cards" ref={stackRef}>
          {experiences.map((exp, index) => (
            <div
              className="exp-stack-card"
              key={index}
              ref={setCardRef(index)}
              style={{
                /* Each card sticks at an incrementing offset so that 
                   covered cards leave a visible TAB_HEIGHT strip */
                top: `${STICKY_START + index * TAB_HEIGHT}px`,
                zIndex: index + 1
              }}
            >
              {/* Card Header — this is the "tab" that stays visible when covered */}
              <div className="exp-card-header">
                <div className="exp-header-left">
                  <Briefcase size={22} className="exp-icon" />
                  <span className="exp-num">0{index + 1}</span>
                  <h3>{exp.role}</h3>
                </div>
                <span className="exp-company">{exp.company}</span>
              </div>

              {/* Card Body */}
              <div className="exp-card-body">
                <div className="exp-body-main">
                  <div className="exp-meta">
                    <div className="exp-period">
                      <Calendar size={14} />
                      <span>{exp.period}</span>
                    </div>
                    {exp.location && (
                      <div className="exp-location">
                        <MapPin size={14} />
                        <span>{exp.location}</span>
                      </div>
                    )}
                  </div>

                  {exp.description && (
                    <p className="exp-description">{exp.description}</p>
                  )}

                  <div className="exp-accomplishments">
                    <h4>Key Accomplishments:</h4>
                    <ul>
                      {exp.points.map((pt, pIdx) => (
                        <li key={pIdx}>{pt}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="exp-body-side">
                  <div className="exp-skills-box">
                    <h4>Skills Utilized:</h4>
                    <div className="exp-skill-tags">
                      {exp.skills.map((skill, sIdx) => (
                        <span key={sIdx} className="exp-skill-tag">{skill}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
