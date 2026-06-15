'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/stores/appStore';

const bootMessagesByOS = {
  macos: [
    'Initializing neural core...',
    'Loading TensorFlow runtime... OK',
    'Mounting project filesystem... OK',
    'Connecting to GitHub API... OK',
    'Starting AI Assistant... OK',
    'All systems operational ✓',
  ],
  windows: [
    'Getting things ready for you...',
    'This might take a moment',
    'Installing updates...',
    'Almost there...',
    'Preparing your desktop...',
    'Welcome!',
  ],
  ubuntu: [
    'Starting systemd...',
    'Loading kernel modules... [OK]',
    'Mounting filesystems... [OK]',
    'Starting Network Manager... [OK]',
    'Starting GNOME Display Manager...',
    'System ready.',
  ],
};

export default function BootSequence() {
  const { setBootComplete, activeOS, setActiveOS } = useAppStore();
  const [phase, setPhase] = useState(0);
  const [visibleMessages, setVisibleMessages] = useState<number>(0);
  const [progress, setProgress] = useState(0);
  const [showPrompt, setShowPrompt] = useState(false);
  const [skipVisible, setSkipVisible] = useState(false);
  const [hasSelectedOS, setHasSelectedOS] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const bootMessages = bootMessagesByOS[activeOS] || bootMessagesByOS.macos;

  const complete = useCallback(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('divyanshuos-booted', 'true');
    }
    setBootComplete();
  }, [setBootComplete]);

  // Window resize handler to detect mobile view
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        const mobile = window.innerWidth < 768;
        setIsMobile(mobile);
        if (mobile) {
          setHasSelectedOS(true);
        }
      };
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  // Boot sequence logic triggered only after selection (or auto-bypass on mobile)
  useEffect(() => {
    if (!hasSelectedOS) return;

    const skipTimer = setTimeout(() => setSkipVisible(true), 1000);
    const t1 = setTimeout(() => setPhase(1), 300);
    const t2 = setTimeout(() => setPhase(2), 800);
    const t3 = setTimeout(() => setPhase(3), 1200);

    const msgTimers: NodeJS.Timeout[] = [];
    bootMessages.forEach((_, i) => {
      msgTimers.push(
        setTimeout(() => setVisibleMessages(i + 1), 1200 + i * 200)
      );
    });

    const t4 = setTimeout(() => {
      setPhase(4);
      let p = 0;
      const interval = setInterval(() => {
        p += 2;
        setProgress(Math.min(p, 100));
        if (p >= 100) clearInterval(interval);
      }, 24);
    }, 2500);

    const t5 = setTimeout(() => {
      setPhase(5);
      setShowPrompt(true);
    }, 3700);

    const t6 = setTimeout(complete, 5000);

    return () => {
      clearTimeout(skipTimer);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
      msgTimers.forEach(clearTimeout);
    };
  }, [complete, bootMessages, hasSelectedOS]);

  useEffect(() => {
    if (phase >= 5) {
      const handler = () => complete();
      window.addEventListener('keydown', handler);
      window.addEventListener('click', handler);
      return () => {
        window.removeEventListener('keydown', handler);
        window.removeEventListener('click', handler);
      };
    }
  }, [phase, complete]);

  // OS-specific accent colors
  const accentColor = activeOS === 'windows' ? '#0078D4' : activeOS === 'ubuntu' ? '#E95420' : '#7B61FF';
  const textColor = activeOS === 'windows' ? '#c2e0ff' : activeOS === 'ubuntu' ? '#E95420' : '#00ff87';
  const bgGlow = activeOS === 'windows' ? 'rgba(0, 120, 212, 0.5)' : activeOS === 'ubuntu' ? 'rgba(233, 84, 32, 0.5)' : 'rgba(123, 97, 255, 0.5)';

  // Render OS-specific logo
  const renderLogo = () => {
    if (activeOS === 'windows') {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={phase >= 1 ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', width: '80px', height: '80px' }}
        >
          <div style={{ background: '#F25022', borderRadius: '3px' }} />
          <div style={{ background: '#7FBA00', borderRadius: '3px' }} />
          <div style={{ background: '#00A4EF', borderRadius: '3px' }} />
          <div style={{ background: '#FFB900', borderRadius: '3px' }} />
        </motion.div>
      );
    }

    if (activeOS === 'ubuntu') {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={phase >= 1 ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{
            width: '120px',
            height: '120px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg viewBox="0 0 256 256" width="100" height="100">
            <circle cx="128" cy="128" r="112" fill="none" stroke="#E95420" strokeWidth="16" />
            <circle cx="128" cy="32" r="20" fill="#E95420" />
            <circle cx="45" cy="176" r="20" fill="#E95420" />
            <circle cx="211" cy="176" r="20" fill="#E95420" />
          </svg>
        </motion.div>
      );
    }

    // macOS: avatar
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={phase >= 1 ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{
          width: '160px',
          height: '160px',
          borderRadius: '50%',
          border: '3px solid rgba(255, 255, 255, 0.25)',
          boxShadow: `0 0 30px ${bgGlow}`,
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img
          src="/avatar_cartoon.jpg"
          alt="Avatar"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </motion.div>
    );
  };

  // Subtitle per OS
  const subtitleText = activeOS === 'windows'
    ? 'Windows 11 — Portfolio Edition'
    : activeOS === 'ubuntu'
    ? 'Ubuntu 24.04 LTS — Portfolio Edition'
    : 'DivyanshuOS v2.0 — AI Developer Edition';

  // Render progress indicator per OS
  const renderProgress = () => {
    if (activeOS === 'windows') {
      // Windows: spinning dots
      return (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          style={{
            width: '30px',
            height: '30px',
            border: '3px solid rgba(255,255,255,0.1)',
            borderTop: '3px solid #0078D4',
            borderRadius: '50%',
            marginTop: '8px',
          }}
        />
      );
    }

    if (activeOS === 'ubuntu') {
      // Ubuntu: 5 dots animation
      return (
        <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: '#E95420',
              }}
            />
          ))}
        </div>
      );
    }

    // macOS: progress bar
    return (
      <div className="boot-progress" style={{ marginTop: '8px' }}>
        <div
          className="boot-progress-fill"
          style={{ width: `${progress}%`, transition: 'width 0.05s linear' }}
        />
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        position: 'fixed',
        inset: 0,
        background: '#000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 99999,
        gap: '24px',
        overflow: 'hidden',
      }}
    >
      {/* Blurred Wallpaper Background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/desktop_wallpaper.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(30px) brightness(0.4)',
          scale: 1.1,
          zIndex: -1,
        }}
      />
      
      {!hasSelectedOS && !isMobile ? (
        <div style={{
          zIndex: 100000,
          background: 'rgba(20, 20, 30, 0.85)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          padding: '32px',
          width: '460px',
          maxWidth: '90vw',
          textAlign: 'center',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}>
          <div>
            <h2 style={{
              fontSize: '20px',
              fontWeight: 600,
              color: '#fff',
              margin: '0 0 8px 0',
              fontFamily: 'var(--font-body)',
            }}>
              Choose Your OS Experience
            </h2>
            <p style={{
              fontSize: '13px',
              color: 'rgba(255, 255, 255, 0.6)',
              margin: 0,
              fontFamily: 'var(--font-body)',
              lineHeight: '1.4',
            }}>
              Select the operating system interface you would like to explore this portfolio in:
            </p>
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}>
            {[
              { id: 'macos' as const, label: 'macOS', icon: '🍎', desc: 'Classic Apple layout with bottom floating dock' },
              { id: 'windows' as const, label: 'Windows 11', icon: '🪟', desc: 'Modern Microsoft layout with bottom taskbar' },
              { id: 'ubuntu' as const, label: 'Ubuntu', icon: '🐧', desc: 'Sleek GNOME layout with vertical left dock' }
            ].map(os => (
              <button
                key={os.id}
                onClick={() => {
                  setActiveOS(os.id);
                  setHasSelectedOS(true);
                }}
                className="os-select-btn"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  padding: '12px 18px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s ease',
                  width: '100%',
                }}
              >
                <span style={{ fontSize: '22px' }}>{os.icon}</span>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#fff', fontFamily: 'var(--font-body)' }}>{os.label}</span>
                  <span style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.45)', fontFamily: 'var(--font-body)' }}>{os.desc}</span>
                </div>
              </button>
            ))}
          </div>

          <p style={{
            fontSize: '11px',
            color: 'rgba(255, 255, 255, 0.4)',
            lineHeight: '1.5',
            margin: '6px 0 0 0',
            fontFamily: 'var(--font-body)',
          }}>
            💡 Note: You can switch your OS experience at any time by right-clicking on the desktop and choosing "Change OS".
          </p>
        </div>
      ) : (
        <>
          {/* Logo */}
          {renderLogo()}

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={phase >= 2 ? { opacity: 1 } : {}}
            transition={{ duration: 0.4 }}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '18px',
              color: 'rgba(255,255,255,0.75)',
              letterSpacing: '1px',
            }}
          >
            {subtitleText}
          </motion.div>

          {/* Boot Messages */}
          {phase >= 3 && activeOS === 'macos' && (
            <div style={{ width: '400px', maxWidth: '90vw', padding: '16px' }}>
              {bootMessages.slice(0, visibleMessages).map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className="boot-text"
                  style={{ marginBottom: '2px', color: textColor }}
                >
                  {'> '}{msg}
                </motion.div>
              ))}
            </div>
          )}

          {phase >= 3 && activeOS === 'ubuntu' && (
            <div style={{ width: '400px', maxWidth: '90vw', padding: '16px' }}>
              {bootMessages.slice(0, visibleMessages).map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ marginBottom: '2px', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'rgba(255,255,255,0.6)' }}
                >
                  {msg}
                </motion.div>
              ))}
            </div>
          )}

          {/* Progress indicator */}
          {phase >= 4 && renderProgress()}



          {/* Skip button */}
          {skipVisible && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              whileHover={{ opacity: 1 }}
              onClick={complete}
              style={{
                position: 'fixed',
                bottom: '24px',
                right: '24px',
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.2)',
                color: 'rgba(255,255,255,0.5)',
                padding: '6px 16px',
                borderRadius: '6px',
                fontSize: '12px',
                cursor: 'pointer',
                fontFamily: 'var(--font-body)',
              }}
            >
              Skip →
            </motion.button>
          )}
        </>
      )}
    </motion.div>
  );
}

