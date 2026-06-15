'use client';

import { useState } from 'react';
import { useWindowStore } from '@/stores/windowStore';
import { personalInfo, projects, experiences, skillCategories } from '@/data/portfolio';

type Page = 'google' | 'portfolio' | 'experience';

export default function Google() {
  const [page, setPage] = useState<Page>('portfolio');
  const [url, setUrl] = useState('https://divyanshuos.com/portfolio');
  const { openWindow } = useWindowStore();

  const navigate = (p: Page, newUrl: string) => {
    setPage(p);
    setUrl(newUrl);
  };

  const goBack = () => {
    navigate('google', 'https://www.google.com/search?q=Divyanshu+M.+Patel+Full+Stack+MERN+Developer');
  };

  return (
    <div style={{
      height: 'calc(100% + 40px)',
      width: 'calc(100% + 40px)',
      margin: '-20px',
      background: '#202124',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      borderRadius: '0 0 var(--radius-window) var(--radius-window)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    }}>
      {/* Chrome Toolbar */}
      <div style={{
        padding: '8px 12px',
        background: '#2f3033',
        borderBottom: '1px solid #1f2022',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        color: '#fff',
      }}>
        {/* Nav buttons */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button
            onClick={goBack}
            disabled={page === 'google'}
            style={{
              background: 'transparent', border: 'none', color: '#fff', cursor: page === 'google' ? 'default' : 'pointer',
              opacity: page === 'google' ? 0.3 : 0.85, display: 'flex', alignItems: 'center', padding: '4px',
              borderRadius: '50%', transition: 'background 0.15s',
            }}
            title="Back"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </button>
          <button
            style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'default', opacity: 0.3, display: 'flex', alignItems: 'center', padding: '4px' }}
            title="Forward"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
          <button
            style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', opacity: 0.8, display: 'flex', alignItems: 'center', padding: '4px' }}
            title="Reload"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M23 4v6h-6"></path>
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
            </svg>
          </button>
        </div>

        {/* Address Bar */}
        <div style={{
          flex: 1, background: '#202124', borderRadius: '16px', padding: '5px 14px',
          display: 'flex', alignItems: 'center', fontSize: '12px', color: '#e8eaed',
          border: '1px solid rgba(255,255,255,0.08)',
        }}>
          <span style={{ marginRight: '6px', opacity: 0.6, fontSize: '11px' }}>🔒</span>
          <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', opacity: 0.9 }}>
            {url}
          </span>
        </div>

        <div style={{ display: 'flex', gap: '10px', fontSize: '13px', opacity: 0.7 }}>
          <span>👤</span><span>⋮</span>
        </div>
      </div>

      {/* Page Content */}
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>

        {/* ── GOOGLE SEARCH PAGE ── */}
        {page === 'google' && (
          <div style={{ height: '100%', background: '#fff', overflowY: 'auto' }}>
            {/* Google Header */}
            <div style={{ display: 'flex', alignItems: 'center', padding: '16px 24px', borderBottom: '1px solid #ebebeb', gap: '24px' }}>
              <div style={{ fontSize: '22px', fontWeight: 'bold', letterSpacing: '-1px', flexShrink: 0 }}>
                <span style={{ color: '#4285F4' }}>G</span>
                <span style={{ color: '#EA4335' }}>o</span>
                <span style={{ color: '#FBBC05' }}>o</span>
                <span style={{ color: '#4285F4' }}>g</span>
                <span style={{ color: '#34A853' }}>l</span>
                <span style={{ color: '#EA4335' }}>e</span>
              </div>
              <div style={{
                display: 'flex', alignItems: 'center', background: '#fff', border: '1px solid #dfe1e5',
                borderRadius: '24px', padding: '8px 18px', flex: 1, maxWidth: '600px',
                boxShadow: '0 1px 6px rgba(32,33,36,.28)',
              }}>
                <span style={{ marginRight: '10px', color: '#9aa0a6' }}>🔍</span>
                <span style={{ fontSize: '14px', color: '#202124' }}>Divyanshu M. Patel Full Stack MERN Developer</span>
              </div>
            </div>

            {/* Search Results */}
            <div style={{ padding: '16px 24px', maxWidth: '680px', marginLeft: '100px' }}>
              <div style={{ fontSize: '13px', color: '#70757a', marginBottom: '18px' }}>
                About 1,240,000 results (0.34 seconds)
              </div>

              {/* Result 1 - LinkedIn */}
              <SearchResult
                domain="https://linkedin.com › in › divyanshu-patel-99450426b"
                title="Divyanshu M. Patel - Full Stack Developer - LinkedIn"
                description="Surat, Gujarat, India. Full Stack MERN Developer specializing in scalable web applications, SaaS platforms, and AI-powered solutions."
                onClick={() => window.open('https://www.linkedin.com/in/divyanshu-patel-99450426b/', '_blank')}
              />

              {/* Result 2 - GitHub */}
              <SearchResult
                domain="https://github.com › Divyanshu1121"
                title="Divyanshu1121 (Divyanshu M. Patel) - GitHub"
                description="Full Stack MERN Developer building SaaS platforms and AI learning assistants. Projects include Visat Dental Care and Learnify."
                onClick={() => window.open('https://github.com/Divyanshu1121', '_blank')}
              />

              {/* Result 3 - Portfolio (navigates inside browser) */}
              <SearchResult
                domain="https://divyanshuos.com › portfolio"
                title="DivyanshuOS — Interactive Web Desktop Portfolio"
                description="Experience the interactive macOS-style desktop OS built by Divyanshu M. Patel. Features a working terminal, draggable windows, AI Assistant, and more."
                onClick={() => navigate('portfolio', 'https://divyanshuos.com/portfolio')}
                highlight
              />

              {/* Result 4 - Experience */}
              <SearchResult
                domain="https://divyanshuos.com › experience"
                title="Experience — Divyanshu M. Patel"
                description="MERN Stack Developer Intern at Webforest LLP. Web Developer Intern at Zidio Development Pvt Ltd. Strong background in React.js, Node.js, and MongoDB."
                onClick={() => navigate('experience', 'https://divyanshuos.com/experience')}
              />
            </div>
          </div>
        )}

        {/* ── PORTFOLIO WEBSITE PAGE ── */}
        {page === 'portfolio' && (
          <div style={{ height: '100%', overflowY: 'auto', background: '#0a0a0f', color: '#fff', fontFamily: 'inherit' }}>
            {/* Hero */}
            <div style={{
              background: 'linear-gradient(135deg, #0a0a0f 0%, #111827 50%, #0a0a0f 100%)',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              padding: '40px 32px 32px',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}>
              {/* Glow orbs */}
              <div style={{ position: 'absolute', top: '-40px', left: '50%', transform: 'translateX(-50%)', width: '300px', height: '200px', background: 'radial-gradient(circle, rgba(94,155,240,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />

              {/* Avatar */}
              <div style={{
                width: '80px', height: '80px', borderRadius: '50%', margin: '0 auto 16px',
                overflow: 'hidden', border: '3px solid rgba(94,155,240,0.5)',
                boxShadow: '0 0 24px rgba(94,155,240,0.3)',
              }}>
                <img src="/avatar_cartoon.jpg" alt="Divyanshu" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>

              <h1 style={{ fontSize: '26px', fontWeight: 700, margin: '0 0 8px', letterSpacing: '-0.5px', background: 'linear-gradient(135deg, #fff, #c0d4f5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                {personalInfo.fullName}
              </h1>
              <p style={{ fontSize: '14px', color: '#5E9BF0', margin: '0 0 6px', fontWeight: 500 }}>
                {personalInfo.role}
              </p>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)', margin: '0 0 20px' }}>
                📍 {personalInfo.location}
              </p>

              {/* CTA Buttons */}
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button onClick={() => openWindow('about')} style={{ background: '#5E9BF0', border: 'none', color: '#fff', padding: '8px 18px', borderRadius: '20px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
                  About Me
                </button>
                <button onClick={() => openWindow('projects')} style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', padding: '8px 18px', borderRadius: '20px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
                  Projects
                </button>
                <button onClick={() => openWindow('contact')} style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', padding: '8px 18px', borderRadius: '20px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
                  Contact
                </button>
                <button onClick={() => window.open('https://github.com/Divyanshu1121', '_blank')} style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', padding: '8px 18px', borderRadius: '20px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
                  GitHub 🐙
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'rgba(255,255,255,0.05)', margin: '0' }}>
              {[
                { label: 'CGPA', value: '8.14 / 10' },
                { label: 'Internships', value: '2 Done' },
                { label: 'Graduation', value: '2026' },
              ].map(s => (
                <div key={s.label} style={{ background: '#0d0d17', padding: '16px', textAlign: 'center' }}>
                  <div style={{ fontSize: '18px', fontWeight: 700, color: '#5E9BF0' }}>{s.value}</div>
                  <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', marginTop: '2px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Projects section */}
            <div style={{ padding: '24px 24px 8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                <h2 style={{ fontSize: '14px', fontWeight: 700, color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase', letterSpacing: '1px', margin: 0 }}>
                  🚀 Featured Projects
                </h2>
                <button onClick={() => openWindow('projects')} style={{ background: 'none', border: 'none', color: '#5E9BF0', fontSize: '11px', cursor: 'pointer', textDecoration: 'underline' }}>
                  View All →
                </button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {projects.slice(0, 3).map(p => (
                  <div key={p.id} onClick={() => openWindow('projects')} style={{
                    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: '10px', padding: '14px 16px', cursor: 'pointer',
                    transition: 'background 0.15s',
                  }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(94,155,240,0.06)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.04)')}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: 600, color: '#fff', marginBottom: '4px' }}>{p.title}</div>
                        <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>{p.shortDescription}</div>
                      </div>
                      <span style={{ fontSize: '10px', color: '#5E9BF0', flexShrink: 0, marginTop: '2px' }}>→</span>
                    </div>
                    <div style={{ display: 'flex', gap: '6px', marginTop: '8px', flexWrap: 'wrap' }}>
                      {p.stack.slice(0, 3).map(t => (
                        <span key={t} style={{ fontSize: '9px', padding: '2px 8px', background: 'rgba(255,255,255,0.06)', borderRadius: '100px', color: 'rgba(255,255,255,0.5)' }}>{t}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills Section */}
            <div style={{ padding: '16px 24px 24px' }}>
              <h2 style={{ fontSize: '14px', fontWeight: 700, color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 12px' }}>
                ⚡ Core Skills
              </h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {skillCategories.flatMap(c => c.skills).slice(0, 12).map(s => (
                  <span key={s.name} onClick={() => openWindow('skills')} style={{
                    fontSize: '11px', padding: '5px 12px',
                    background: 'rgba(94,155,240,0.1)', border: '1px solid rgba(94,155,240,0.2)',
                    borderRadius: '100px', color: '#5E9BF0', cursor: 'pointer',
                  }}>
                    {s.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)' }}>© 2026 {personalInfo.fullName}</span>
              <div style={{ display: 'flex', gap: '16px' }}>
                <button onClick={() => window.open('https://github.com/Divyanshu1121', '_blank')} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', fontSize: '11px', cursor: 'pointer' }}>GitHub</button>
                <button onClick={() => window.open('https://www.linkedin.com/in/divyanshu-patel-99450426b/', '_blank')} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', fontSize: '11px', cursor: 'pointer' }}>LinkedIn</button>
                <button onClick={() => openWindow('contact')} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', fontSize: '11px', cursor: 'pointer' }}>Contact</button>
              </div>
            </div>
          </div>
        )}

        {/* ── EXPERIENCE PAGE ── */}
        {page === 'experience' && (
          <div style={{ height: '100%', overflowY: 'auto', background: '#0a0a0f', color: '#fff' }}>
            <div style={{ padding: '28px 28px 16px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '1px' }}>divyanshuos.com</div>
              <h1 style={{ fontSize: '22px', fontWeight: 700, margin: '0 0 4px', color: '#fff' }}>Work Experience</h1>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', margin: 0 }}>Divyanshu M. Patel · Full Stack MERN Developer</p>
            </div>
            <div style={{ padding: '20px 28px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {experiences.map(exp => (
                <div key={exp.id} onClick={() => openWindow('experience')} style={{
                  background: 'rgba(255,255,255,0.04)', border: `1px solid ${exp.color}30`,
                  borderLeft: `3px solid ${exp.color}`, borderRadius: '10px', padding: '16px 18px', cursor: 'pointer',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: '#fff' }}>{exp.role}</div>
                      <div style={{ fontSize: '12px', color: exp.color, fontWeight: 600 }}>{exp.company}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>{exp.period}</div>
                      <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)' }}>{exp.duration}</div>
                    </div>
                  </div>
                  <ul style={{ margin: '8px 0 0', paddingLeft: '16px', fontSize: '11px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7 }}>
                    {exp.projects[0].bullets.slice(0, 2).map((b, i) => <li key={i}>{b}</li>)}
                  </ul>
                </div>
              ))}
              <button onClick={() => openWindow('experience')} style={{
                background: 'rgba(94,155,240,0.1)', border: '1px solid rgba(94,155,240,0.2)',
                color: '#5E9BF0', padding: '10px', borderRadius: '8px', fontSize: '12px',
                fontWeight: 600, cursor: 'pointer', width: '100%',
              }}>
                Open Full Experience Window →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Reusable search result component
function SearchResult({ domain, title, description, onClick, highlight }: {
  domain: string; title: string; description: string; onClick: () => void; highlight?: boolean;
}) {
  return (
    <div style={{ marginBottom: '24px' }}>
      <div style={{ fontSize: '12px', color: '#202124', marginBottom: '2px', opacity: 0.7 }}>{domain}</div>
      <h3
        onClick={onClick}
        style={{
          fontSize: '18px', color: highlight ? '#1558d6' : '#1a0dab',
          margin: '0 0 4px', fontWeight: highlight ? 600 : 400, cursor: 'pointer',
          textDecoration: 'none',
        }}
        onMouseEnter={e => (e.currentTarget.style.textDecoration = 'underline')}
        onMouseLeave={e => (e.currentTarget.style.textDecoration = 'none')}
      >
        {title}
      </h3>
      {highlight && (
        <span style={{
          display: 'inline-block', fontSize: '10px', background: '#e8f0fe', color: '#1558d6',
          padding: '1px 8px', borderRadius: '10px', marginBottom: '4px', fontWeight: 600,
        }}>
          ✦ Portfolio Site
        </span>
      )}
      <p style={{ fontSize: '13px', color: '#4d5156', margin: 0, lineHeight: 1.6 }}>{description}</p>
    </div>
  );
}
