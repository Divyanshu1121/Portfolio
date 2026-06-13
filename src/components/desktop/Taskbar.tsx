'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { dockItems } from '@/data/portfolio';
import { useWindowStore } from '@/stores/windowStore';

interface TaskbarProps {
  onSearch: () => void;
}

export default function Taskbar({ onSearch }: TaskbarProps) {
  const { openWindow, windows } = useWindowStore();
  const [time, setTime] = useState('');
  const [dateStr, setDateStr] = useState('');
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    function updateClock() {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }));
      setDateStr(now.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }));
    }
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleClick = useCallback((item: typeof dockItems[0]) => {
    if (item.external) {
      window.open(item.external, '_blank');
    } else if (item.windowId) {
      openWindow(item.windowId);
    }
  }, [openWindow]);

  return (
    <div className="win-taskbar">
      {/* Start Button */}
      <div className="win-taskbar-start">
        <div
          className="win-taskbar-item"
          onClick={onSearch}
          style={{ fontSize: '18px' }}
          title="Start"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <rect x="1" y="1" width="8" height="8" rx="1" fill="#0078D4" />
            <rect x="11" y="1" width="8" height="8" rx="1" fill="#0078D4" opacity="0.8" />
            <rect x="1" y="11" width="8" height="8" rx="1" fill="#0078D4" opacity="0.8" />
            <rect x="11" y="11" width="8" height="8" rx="1" fill="#0078D4" opacity="0.6" />
          </svg>
        </div>
        <div
          className="win-taskbar-item"
          onClick={onSearch}
          style={{ fontSize: '15px', color: 'var(--text-muted)' }}
          title="Search"
        >
          🔍
        </div>
      </div>

      {/* Center Icons */}
      <div style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
        {dockItems.map((item) => {
          const isOpen = item.windowId ? windows[item.windowId]?.isOpen : false;
          return (
            <div
              key={item.id}
              className={`win-taskbar-item ${isOpen ? 'active' : ''}`}
              onClick={() => handleClick(item)}
              onMouseEnter={() => setHovered(item.id)}
              onMouseLeave={() => setHovered(null)}
              title={item.label}
              style={{ position: 'relative' }}
            >
              {item.id === 'github' ? (
                <svg role="img" viewBox="0 0 24 24" fill="currentColor" style={{ width: '20px', height: '20px', color: 'var(--text-secondary)' }}>
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                </svg>
              ) : item.id === 'google' ? (
                <svg viewBox="0 0 24 24" style={{ width: '20px', height: '20px' }}>
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
              ) : (
                <span style={{ fontSize: '20px' }}>{item.icon}</span>
              )}

              {/* Tooltip */}
              <AnimatePresence>
                {hovered === item.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.12 }}
                    style={{
                      position: 'absolute',
                      bottom: '48px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: 'rgba(44, 44, 44, 0.95)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      color: 'white',
                      fontSize: '11px',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      whiteSpace: 'nowrap',
                      pointerEvents: 'none',
                      zIndex: 10000,
                    }}
                  >
                    {item.label}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* System Tray */}
      <div className="win-taskbar-tray">
        <span>🔊</span>
        <span>📶</span>
        <span>🔋 94%</span>
        <span style={{ fontSize: '10px' }}>
          <div>{time}</div>
          <div style={{ fontSize: '9px', opacity: 0.7 }}>{dateStr}</div>
        </span>
      </div>
    </div>
  );
}
