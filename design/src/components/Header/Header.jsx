import { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X, FileText } from 'lucide-react';
import './Header.css';

export default function Header() {
  const [theme, setTheme] = useState('dark');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // Set theme on html tag
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const scrollToSection = (id) => {
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      // Smooth scroll using Lenis (which intercepts scrollTo)
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="site-header">
      <div className="header-container">
        {/* Logo / Name */}
        <a href="#" className="logo" onClick={() => scrollToSection('hero')}>
          <span className="logo-dot"></span>
          Arya Shah
        </a>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <button onClick={() => scrollToSection('experience')} className="nav-link">Experience</button>
          <button onClick={() => scrollToSection('projects')} className="nav-link">Projects</button>
          <button onClick={() => scrollToSection('skills')} className="nav-link">Skills</button>
          <button onClick={() => scrollToSection('contact')} className="nav-link">Contact</button>
        </nav>

        {/* Header Right Actions */}
        <div className="header-actions">
          {/* Dark / Light Toggle */}
          <button 
            className="theme-toggle-btn" 
            onClick={toggleTheme} 
            aria-label="Toggle Theme Mode"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* View Resume Button */}
          <a 
            href="/Resume_Arya_Shah.pdf" 
            download="Resume_Arya_Shah.pdf" 
            className="resume-btn"
          >
            <FileText size={16} />
            <span>Resume</span>
          </a>

          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-menu-btn" 
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {menuOpen && (
        <div className="mobile-drawer">
          <nav className="mobile-nav">
            <button onClick={() => scrollToSection('experience')} className="mobile-nav-link">Experience</button>
            <button onClick={() => scrollToSection('projects')} className="mobile-nav-link">Projects</button>
            <button onClick={() => scrollToSection('skills')} className="mobile-nav-link">Skills</button>
            <button onClick={() => scrollToSection('contact')} className="mobile-nav-link">Contact</button>
          </nav>
        </div>
      )}
    </header>
  );
}
