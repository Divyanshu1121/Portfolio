'use client';

import { personalInfo, bio, experiences, projects, resumeText } from '@/data/portfolio';

export default function Resume() {
  return (
    <div style={{ margin: '-20px', padding: '0', display: 'flex', flexDirection: 'column', height: 'calc(100% + 40px)' }}>
      {/* Toolbar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 16px',
        borderBottom: '0.5px solid var(--border-subtle)',
        background: 'var(--bg-titlebar)',
        fontSize: '12px',
        flexShrink: 0,
      }}>
        <div style={{ color: 'var(--text-muted)' }}>
          Page 1/1 · Zoom: 100%
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            className="btn-ghost"
            style={{ fontSize: '11px', padding: '4px 12px' }}
            onClick={() => window.print()}
          >
            🖨️ Print
          </button>
          <button
            className="btn-primary"
            style={{ fontSize: '11px', padding: '4px 12px' }}
            onClick={() => {
              const link = document.createElement('a');
              link.href = '/divyanshu-patel-resume.pdf';
              link.download = 'Divyanshu-Patel-Resume.pdf';
              link.click();
            }}
          >
            ↓ Download PDF
          </button>
        </div>
      </div>

      {/* Document */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px', background: 'rgba(0,0,0,0.3)' }}>
        <div className="resume-document">
          {/* Header */}
          <h1>{personalInfo.fullName}</h1>
          <p style={{ fontSize: '11px', color: '#666', marginBottom: '12px' }}>
            {personalInfo.location} · {personalInfo.phone} · {personalInfo.email} · {personalInfo.linkedin.replace('https://', '')} · {personalInfo.github.replace('https://', '')}
          </p>

          {/* Summary */}
          <h2>Summary</h2>
          <p>{resumeText.summary}</p>

          {/* Education */}
          <h2>Education</h2>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <h3>B.E. in Information Technology</h3>
            <span style={{ fontSize: '11px', color: '#666' }}>CGPA: 8.14</span>
          </div>
          <p style={{ color: '#666', marginBottom: '4px' }}>Gujarat Technological University · 2022–2026</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: '6px' }}>
            <h3>Honours Degree in Data Science</h3>
            <span style={{ fontSize: '11px', color: '#666' }}>Grade: AB</span>
          </div>
          <p style={{ color: '#666', marginBottom: '4px' }}>Gujarat Technological University · 2024–2026</p>

          {/* Experience */}
          <h2>Experience</h2>
          {experiences.map((exp) => (
            <div key={exp.id} style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <h3>{exp.role} — {exp.company}</h3>
                <span style={{ fontSize: '10px', color: '#888', whiteSpace: 'nowrap' }}>{exp.period}</span>
              </div>
              {exp.projects.map((proj, i) => (
                <div key={i}>
                  <p style={{ fontWeight: 500, fontSize: '11px', margin: '4px 0 2px' }}>{proj.name}</p>
                  <ul>
                    {proj.bullets.map((b, bi) => (
                      <li key={bi}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}

          {/* Projects */}
          <h2>Projects</h2>
          {projects.map((proj) => (
            <div key={proj.id} style={{ marginBottom: '6px' }}>
              <h3>{proj.title}</h3>
              <p>{proj.shortDescription}. Stack: {proj.stack.join(', ')}</p>
            </div>
          ))}

          {/* Technical Skills */}
          <h2>Technical Skills</h2>
          {Object.entries(resumeText.technicalSkills).map(([key, val]) => (
            <p key={key}><strong>{key}:</strong> {val}</p>
          ))}

          {/* Achievements */}
          <h2>Achievements</h2>
          <ul>
            <li>2nd Winner — National-level Technical Festival Hackathon</li>
            <li>3rd Winner — College-level Web Development Competition</li>
          </ul>

          {/* Certifications */}
          <h2>Certifications</h2>
          <ul>
            <li>Google: Cloud Computing Foundations (Data, ML, AI), The Arcade</li>
            <li>Infosys: Basic Python, Data Science with Python, Data Mining, Advanced Statistics</li>
            <li>Forage: Deloitte Australia — Data Analytics Job Simulation</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
