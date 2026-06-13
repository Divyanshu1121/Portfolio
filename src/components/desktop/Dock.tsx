'use client';

import { useRef, useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { dockItems } from '@/data/portfolio';
import { useWindowStore } from '@/stores/windowStore';
import { useAppStore } from '@/stores/appStore';

export default function Dock() {
  const { openWindow, windows } = useWindowStore();
  const activeOS = useAppStore((s) => s.activeOS);
  const dockRef = useRef<HTMLDivElement>(null);

  const handleClick = useCallback((item: typeof dockItems[0]) => {
    if (item.external) {
      window.open(item.external, '_blank');
    } else if (item.windowId) {
      openWindow(item.windowId);
    }
  }, [openWindow]);

  const anyMaximized = Object.values(windows).some(
    (win) => win.isOpen && win.isMaximized && !win.isMinimized
  );

  // Windows: Taskbar handles everything
  if (activeOS === 'windows') return null;

  // Ubuntu: vertical left dock
  if (activeOS === 'ubuntu') {
    return (
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      >
        <div className="ubuntu-dock">
          {dockItems.map((item) => {
            const isOpen = item.windowId ? windows[item.windowId]?.isOpen : false;
            return (
              <UbuntuDockIcon
                key={item.id}
                item={item}
                isOpen={!!isOpen}
                onClick={() => handleClick(item)}
              />
            );
          })}
        </div>
      </motion.div>
    );
  }

  // macOS: bottom floating dock
  return (
    <motion.div
      initial={{ x: '-50%', y: 100, opacity: 0 }}
      animate={{ 
        x: '-50%', 
        y: anyMaximized ? 120 : 0, 
        opacity: anyMaximized ? 0 : 1 
      }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      style={{
        position: 'fixed',
        bottom: '8px',
        left: '50%',
        zIndex: 9998,
      }}
    >
      <div
        ref={dockRef}
        className="glass-dock"
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          gap: '12px',
          padding: '6px 14px',
          borderRadius: 'var(--radius-dock)',
          boxShadow: 'var(--shadow-dock)',
        }}
      >
        {dockItems.map((item) => {
          const isOpen = item.windowId ? windows[item.windowId]?.isOpen : false;
          return (
            <DockIcon
              key={item.id}
              item={item}
              isOpen={!!isOpen}
              onClick={() => handleClick(item)}
            />
          );
        })}
      </div>
    </motion.div>
  );
}

interface DockIconProps {
  item: typeof dockItems[0];
  isOpen: boolean;
  onClick: () => void;
}

function DockIcon({ item, isOpen, onClick }: DockIconProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      id={`dock-icon-${item.id}`}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', position: 'relative' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, x: '-50%', scale: 0.8 }}
            animate={{ opacity: 1, y: 0, x: '-50%', scale: 1 }}
            exit={{ opacity: 0, y: 10, x: '-50%', scale: 0.8 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              bottom: '58px',
              left: '50%',
              background: 'rgba(20, 20, 30, 0.95)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              color: 'white',
              fontSize: '11px',
              fontWeight: 500,
              padding: '4px 10px',
              borderRadius: '6px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
              zIndex: 10000,
            }}
          >
            {item.label}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="dock-item"
        onClick={onClick}
        whileHover={{ scale: 1.35, y: -8 }}
        whileTap={{ scale: 0.9 }}
        style={{
          width: '52px',
          height: '52px',
          borderRadius: '12px',
          background: item.id === 'google'
            ? 'linear-gradient(135deg, #ffffff, #f5f5f7)'
            : item.color === '#333'
            ? 'linear-gradient(135deg, #1a1a2e, #2a2a3e)'
            : `linear-gradient(135deg, ${item.color}, ${adjustColor(item.color, -20)})`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: (item.icon === '>_' || item.icon === 'in') ? '20px' : '24px',
          fontFamily: item.icon === '>_' ? 'var(--font-mono)' : 'inherit',
          fontWeight: (item.icon === '>_' || item.icon === 'in') ? 700 : 400,
          color: 'white',
          cursor: 'pointer',
          boxShadow: item.id === 'google'
            ? '0 3px 10px rgba(0, 0, 0, 0.15)'
            : `0 3px 10px ${item.color}33`,
          position: 'relative',
        }}
      >
        {item.id === 'github' ? (
          <svg role="img" viewBox="0 0 24 24" fill="currentColor" style={{ width: '55%', height: '55%' }}>
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
          </svg>
        ) : item.id === 'google' ? (
          <svg viewBox="0 0 24 24" style={{ width: '55%', height: '55%' }}>
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
          </svg>
        ) : item.icon}
      </motion.div>
      {/* Active dot */}
      <div
        style={{
          width: '4px',
          height: '4px',
          borderRadius: '50%',
          background: isOpen ? 'white' : 'transparent',
          transition: 'background 0.2s ease',
        }}
      />
    </div>
  );
}

function adjustColor(hex: string, amount: number): string {
  if (hex.startsWith('#')) {
    const num = parseInt(hex.slice(1), 16);
    const r = Math.max(0, Math.min(255, ((num >> 16) & 0xff) + amount));
    const g = Math.max(0, Math.min(255, ((num >> 8) & 0xff) + amount));
    const b = Math.max(0, Math.min(255, (num & 0xff) + amount));
    return `rgb(${r}, ${g}, ${b})`;
  }
  return hex;
}

function UbuntuDockIcon({ item, isOpen, onClick }: DockIconProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`ubuntu-dock-item ${isOpen ? 'active' : ''}`}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position: 'relative' }}
    >
      {item.id === 'github' ? (
        <svg role="img" viewBox="0 0 24 24" fill="currentColor" style={{ width: '24px', height: '24px', color: 'var(--text-secondary)' }}>
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
        </svg>
      ) : item.id === 'google' ? (
        <svg viewBox="0 0 24 24" style={{ width: '24px', height: '24px' }}>
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
        </svg>
      ) : (
        <span>{item.icon}</span>
      )}

      {/* Tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, x: 6 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 6 }}
            transition={{ duration: 0.12 }}
            style={{
              position: 'absolute',
              left: '56px',
              top: '50%',
              transform: 'translateY(-50%)',
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
}

