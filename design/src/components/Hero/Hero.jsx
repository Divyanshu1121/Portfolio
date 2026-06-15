import { useRef, useEffect } from 'react';
import { Mail } from 'lucide-react';
import avatarImg from '../../assets/avatar_cartoon.webp';
import './Hero.css';

// Custom inline SVG icons for brands (since lucide-react doesn't bundle brand logos anymore)
const Github = ({ size = 20, ...props }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const Linkedin = ({ size = 20, ...props }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);


export default function Hero() {
  const heroRef = useRef(null);
  const portraitContainerRef = useRef(null);
  const bgTextRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = hero.getBoundingClientRect();

      // Mouse position relative to hero element center (-0.5 to 0.5)
      const mouseX = ((clientX - left) / width) - 0.5;
      const mouseY = ((clientY - top) / height) - 0.5;

      // Parallax shifts on background text and backlight glow
      if (bgTextRef.current) {
        bgTextRef.current.style.transform = `translate(${mouseX * -30}px, ${mouseY * -30}px) scale(1.02)`;
      }

      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${mouseX * 20}px, ${mouseY * 20}px)`;
      }
      
      // Update mouse coordinate CSS variables for the global ambient glow
      document.documentElement.style.setProperty('--mouse-x', `${(clientX / window.innerWidth) * 100}%`);
      document.documentElement.style.setProperty('--mouse-y', `${(clientY / window.innerHeight) * 100}%`);
    };

    const handleMouseLeave = () => {
      // Smoothly reset positions
      if (bgTextRef.current) {
        bgTextRef.current.style.transform = 'translate(0, 0) scale(1)';
      }
      if (glowRef.current) {
        glowRef.current.style.transform = 'translate(0, 0)';
      }
    };

    let startX = 0;
    let startY = 0;
    let isDragging = false;
    let activeStar = null;

    const handleMouseDown = (e) => {
      // Create single big star at starting click position
      const rect = hero.getBoundingClientRect();
      startX = e.clientX;
      startY = e.clientY;
      isDragging = true;

      if (activeStar) activeStar.remove();

      const star = document.createElement('div');
      star.className = 'slingshot-star';
      star.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 0C12 6.627 17.373 12 24 12C17.373 12 12 17.373 12 24C12 17.373 6.627 12 0 12C6.627 12 12 6.627 12 0Z" fill="#ffffff" />
        </svg>
      `;
      star.style.left = `${startX - rect.left}px`;
      star.style.top = `${startY - rect.top}px`;

      hero.appendChild(star);
      activeStar = star;
    };

    const handleMouseMoveDrag = (e) => {
      handleMouseMove(e);
      if (!isDragging || !activeStar) return;

      // Update active star position to follow the cursor during drag
      const rect = hero.getBoundingClientRect();
      activeStar.style.left = `${e.clientX - rect.left}px`;
      activeStar.style.top = `${e.clientY - rect.top}px`;
    };

    const handleMouseUp = (e) => {
      if (!isDragging) return;
      isDragging = false;

      if (!activeStar) return;

      const endX = e.clientX;
      const endY = e.clientY;

      const dx = startX - endX; // opposite direction vector (slingshot)
      const dy = startY - endY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 15) {
        // Shoot the active star in the opposite direction (slingshot launch!)
        const angle = Math.atan2(dy, dx);
        
        // Shoot off-screen
        const shootDist = Math.max(window.innerWidth, window.innerHeight) * 1.3;
        const tx = Math.cos(angle) * shootDist;
        const ty = Math.sin(angle) * shootDist;

        activeStar.style.setProperty('--tx', `${tx}px`);
        activeStar.style.setProperty('--ty', `${ty}px`);
        activeStar.classList.add('shooting');

        const currentStar = activeStar;
        setTimeout(() => {
          currentStar.remove();
        }, 5500);
      } else {
        // Normal quick click - star simply fades away quickly
        activeStar.classList.add('fade-out');
        const currentStar = activeStar;
        setTimeout(() => {
          currentStar.remove();
        }, 400);
      }
      activeStar = null;
    };

    const handleMouseLeaveReset = () => {
      handleMouseLeave();
      if (isDragging && activeStar) {
        activeStar.classList.add('fade-out');
        const currentStar = activeStar;
        setTimeout(() => {
          currentStar.remove();
        }, 400);
        activeStar = null;
      }
      isDragging = false;
    };

    hero.addEventListener('mousemove', handleMouseMoveDrag);
    hero.addEventListener('mouseleave', handleMouseLeaveReset);
    hero.addEventListener('mousedown', handleMouseDown);
    hero.addEventListener('mouseup', handleMouseUp);

    return () => {
      hero.removeEventListener('mousemove', handleMouseMoveDrag);
      hero.removeEventListener('mouseleave', handleMouseLeaveReset);
      hero.removeEventListener('mousedown', handleMouseDown);
      hero.removeEventListener('mouseup', handleMouseUp);
      if (activeStar) activeStar.remove();
    };
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="hero-section" ref={heroRef}>
      {/* Background Sparkle Stars */}
      <div className="bg-sparkle-star bs-1">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 0C12 6.627 17.373 12 24 12C17.373 12 12 17.373 12 24C12 17.373 6.627 12 0 12C6.627 12 12 6.627 12 0Z" fill="currentColor" />
        </svg>
      </div>
      <div className="bg-sparkle-star bs-2">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 0C12 6.627 17.373 12 24 12C17.373 12 12 17.373 12 24C12 17.373 6.627 12 0 12C6.627 12 12 6.627 12 0Z" fill="currentColor" />
        </svg>
      </div>
      <div className="bg-sparkle-star bs-3">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 0C12 6.627 17.373 12 24 12C17.373 12 12 17.373 12 24C12 17.373 6.627 12 0 12C6.627 12 12 6.627 12 0Z" fill="currentColor" />
        </svg>
      </div>
      <div className="bg-sparkle-star bs-4">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 0C12 6.627 17.373 12 24 12C17.373 12 12 17.373 12 24C12 17.373 6.627 12 0 12C6.627 12 12 6.627 12 0Z" fill="currentColor" />
        </svg>
      </div>
      {/* 3D Perspective container */}
      <div className="hero-perspective">
        {/* Massive Background Heading */}
        <h1 className="hero-bg-text" ref={bgTextRef}>
          DIVYANSHU PATEL
        </h1>



        {/* Unified 3-Column Flanking Grid Layout */}
        <div className="hero-grid-layout">
          {/* Left Column: Tagline & CTA */}
          <div className="hero-left-col">
            <div className="availability-badge">
              <span className="badge-pulse"></span>
              Open for AI & Software roles
            </div>
            <h2 className="hero-tagline">
              Full-Stack MERN <br />& AI Developer
            </h2>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="glow-btn"
            >
              Let's Talk
            </button>
          </div>

          {/* Center Column: Portrait Image Cut (Stand-alone, Borderless) */}
          <div className="hero-portrait-wrapper">
            {/* Shiny Sparkle Stars */}
            <div className="sparkle-star s-1">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 0C12 6.627 17.373 12 24 12C17.373 12 12 17.373 12 24C12 17.373 6.627 12 0 12C6.627 12 12 6.627 12 0Z" fill="currentColor" />
              </svg>
            </div>
            <div className="sparkle-star s-2">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 0C12 6.627 17.373 12 24 12C17.373 12 12 17.373 12 24C12 17.373 6.627 12 0 12C6.627 12 12 6.627 12 0Z" fill="currentColor" />
              </svg>
            </div>
            <div className="sparkle-star s-3">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 0C12 6.627 17.373 12 24 12C17.373 12 12 17.373 12 24C12 17.373 6.627 12 0 12C6.627 12 12 6.627 12 0Z" fill="currentColor" />
              </svg>
            </div>
            <div className="sparkle-star s-4">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 0C12 6.627 17.373 12 24 12C17.373 12 12 17.373 12 24C12 17.373 6.627 12 0 12C6.627 12 12 6.627 12 0Z" fill="currentColor" />
              </svg>
            </div>

            <div className="hero-portrait-container" ref={portraitContainerRef}>
              <div className="portrait-frame">
                {/* Backdrop radial glow behind portrait */}
                <div className="portrait-backlight" ref={glowRef}></div>

                <img 
                  src={avatarImg} 
                  alt="Divyanshu M. Patel Portrait" 
                  className="portrait-img"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentNode.classList.add('avatar-fallback');
                  }}
                />

                <div className="avatar-fallback-content">
                  <span className="fallback-initial">D</span>
                </div>
              </div>
            </div>
          </div>


          {/* Right Column: Bio & Socials */}
          <div className="hero-right-col">
            <p className="hero-bio">
              Full-Stack MERN Developer specializing in scalable web applications, SaaS platforms, and AI-powered solutions. Graduated IT Honours in Data Science.
            </p>
            <div className="hero-socials">
              <a href="https://github.com/Divyanshu1121" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub">
                <Github size={20} />
              </a>
              <a href="https://www.linkedin.com/in/divyanshu-patel-b6537a1b3/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="mailto:divyanshupatel5633@gmail.com" className="social-link" aria-label="Email">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Scrolling Tech Bar / client logo style */}
      <div className="tech-scroller-container">
        <div className="tech-scroller">
          <div className="tech-scroller-inner">
            <span>MERN STACK</span>
            <span>REACT</span>
            <span>NODE.JS</span>
            <span>MONGODB</span>
            <span>NEXT.JS</span>
            <span>TYPESCRIPT</span>
            <span>PYTHON</span>
            <span>TENSORFLOW</span>
            <span>SQL</span>
            {/* Duplicated for infinite scroll effect */}
            <span>MERN STACK</span>
            <span>REACT</span>
            <span>NODE.JS</span>
            <span>MONGODB</span>
            <span>NEXT.JS</span>
            <span>TYPESCRIPT</span>
            <span>PYTHON</span>
            <span>TENSORFLOW</span>
            <span>SQL</span>
          </div>
        </div>
      </div>
    </section>
  );
}
