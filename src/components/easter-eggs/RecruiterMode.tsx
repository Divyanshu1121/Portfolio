'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotificationStore } from '@/stores/notificationStore';

export default function RecruiterMode() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const { addNotification } = useNotificationStore();

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPw = password.trim().toLowerCase();
    if (cleanPw === 'hireaisha' || cleanPw === 'packvision' || cleanPw === 'hire') {
      setIsAuthenticated(true);
      setError('');
      addNotification({
        title: 'Recruiter Dashboard Unlocked',
        message: 'Welcome! Special resources are now available.',
        icon: '🎯',
      });
    } else {
      setError('Invalid passcode. Hint: Try "hireaisha" or "PackVision"');
    }
  };

  return (
    <div style={{
      height: '100%',
      margin: '-20px',
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      background: 'radial-gradient(circle at top right, rgba(123, 97, 255, 0.08), transparent)',
      overflowY: 'auto',
    }}>
      <AnimatePresence mode="wait">
        {!isAuthenticated ? (
          <motion.div
            key="lock"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
              textAlign: 'center',
              maxWidth: '360px',
              margin: '0 auto',
            }}
          >
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔑</div>
            <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px', color: 'var(--text-primary)' }}>
              Recruiter Mode
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '24px', lineHeight: 1.6 }}>
              Enter the recruiter access code to unlock direct scheduler, downloadable assets, and pipeline options.
            </p>

            <form onSubmit={handleUnlock} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter passcode..."
                className="input-field"
                style={{ textAlign: 'center', fontSize: '14px', letterSpacing: '2px' }}
                autoFocus
              />
              {error && (
                <p style={{ fontSize: '11px', color: 'var(--accent-red)', margin: 0 }}>
                  {error}
                </p>
              )}
              <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '8px' }}>
                Access Dashboard
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
          >
            {/* Header banner */}
            <div className="card" style={{
              padding: '20px',
              background: 'linear-gradient(135deg, rgba(123, 97, 255, 0.15) 0%, rgba(94, 155, 240, 0.05) 100%)',
              border: '1px solid rgba(123, 97, 255, 0.2)',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <h3 style={{ fontSize: '20px', fontWeight: 700, margin: '0 0 8px 0', color: '#fff' }}>
                🎯 Candidate Quick-Pass
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                Thank you for checking out my OS portfolio! Here is a curated summary of high-priority info to expedite your vetting process.
              </p>
            </div>

            {/* Quick Actions Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div className="card" style={{ padding: '14px' }}>
                <h4 style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.5px' }}>
                  Availability Status
                </h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '4px 0' }}>
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--accent-green)', display: 'inline-block', boxShadow: '0 0 8px var(--accent-green)' }} />
                  <span style={{ fontSize: '14px', fontWeight: 600 }}>Active & Interviewing</span>
                </div>
                <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: '6px 0 0 0' }}>
                  Graduating BE IT in 2026. Open to Full-Time SDE & AI Engineer opportunities.
                </p>
              </div>

              <div className="card" style={{ padding: '14px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h4 style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px', letterSpacing: '0.5px' }}>
                    Direct Contact
                  </h4>
                  <p style={{ fontSize: '14px', fontWeight: 600, margin: '4px 0 0 0' }}>
                    divyanshupatel5633@gmail.com
                  </p>
                </div>
                <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: '6px 0 0 0' }}>
                  +91 7405201227 · Surat, Gujarat, India
                </p>
              </div>
            </div>

            {/* Resume & Assets Downloads */}
            <div className="card" style={{ padding: '16px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '12px' }}>
                📥 Recruiter Downloads
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <a
                  href="/divyanshu-patel-resume.pdf"
                  download
                  className="btn-primary"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    textDecoration: 'none',
                    fontSize: '13px',
                    padding: '10px',
                  }}
                >
                  <span>📄</span> Download Resume (PDF)
                </a>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(JSON.stringify({
                      name: "Divyanshu M. Patel",
                      role: "AI Engineer & Full-Stack Developer",
                      cgpa: "8.14/10",
                      email: "divyanshupatel5633@gmail.com",
                      phone: "+917405201227",
                      linkedin: "https://linkedin.com/in/divyanshu-patel-99450426b",
                      github: "https://github.com/Divyanshu1121"
                    }, null, 2));
                    addNotification({ title: 'System', message: 'Candidate JSON copied to clipboard!', icon: '📋' });
                  }}
                  className="btn-secondary"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    fontSize: '13px',
                    padding: '10px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-button)',
                    color: '#fff',
                    cursor: 'pointer',
                  }}
                >
                  <span>📋</span> Copy Candidate JSON Data
                </button>
              </div>
            </div>

            {/* Why Hire Divyanshu M. Patel info */}
            <div className="card" style={{ padding: '16px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '10px' }}>
                🚀 Top 3 Strengths
              </h4>
              <ul style={{ fontSize: '12px', color: 'var(--text-secondary)', paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', lineHeight: 1.5 }}>
                <li>
                  <strong>Production CV Experience:</strong> Engineered dual-stream defect detection & autoencoders for medical packaging (PackVision AI), proving actual ROI in real-world deployment.
                </li>
                <li>
                  <strong>Full-Stack Mastery:</strong> Competent building complete flows: Flutter apps, high-performance FastAPI backends, and Electron desktop tools (Diamo ERP).
                </li>
                <li>
                  <strong>Strong Academic Foundations:</strong> CGPA of 8.14/10 in B.E. IT and a dedicated Honours in Data Science.
                </li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
