'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { desktopIcons } from '@/data/portfolio';
import { useWindowStore } from '@/stores/windowStore';
import { useAppStore } from '@/stores/appStore';

export default function DesktopIcons() {
  const { openWindow } = useWindowStore();
  const activeOS = useAppStore((s) => s.activeOS);
  const isDraggingRef = useRef<Record<string, boolean>>({});

  const handleIconClick = (icon: typeof desktopIcons[0]) => {
    if (isDraggingRef.current[icon.id]) return; // Block opening if we dragged
    
    if (icon.external) {
      window.open(icon.external, '_blank');
    } else if (icon.windowId) {
      openWindow(icon.windowId);
    }
  };

  // Position: macOS/Ubuntu = top-right, Windows = top-left
  const isWindows = activeOS === 'windows';
  const isUbuntu = activeOS === 'ubuntu';

  return (
    <div
      style={{
        position: 'absolute',
        top: isWindows ? '10px' : '40px',
        ...(isWindows ? { left: isUbuntu ? '80px' : '20px' } : { right: '20px' }),
        ...(isUbuntu ? { left: '80px', right: 'auto' } : {}),
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '8px',
        zIndex: 10,
      }}
    >
      {desktopIcons.map((icon, index) => (
        <motion.div
          key={icon.id}
          id={`desktop-icon-${icon.id}`}
          drag
          dragMomentum={false}
          dragElastic={0.1}
          whileDrag={{ scale: 1.1, zIndex: 100 }}
          onDragStart={() => {
            isDraggingRef.current[icon.id] = true;
          }}
          onDragEnd={() => {
            setTimeout(() => {
              isDraggingRef.current[icon.id] = false;
            }, 100);
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: index * 0.05 + 0.2,
            type: 'spring',
            stiffness: 300,
            damping: 20,
          }}
          onTap={() => handleIconClick(icon)}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '6px',
            padding: '8px',
            borderRadius: '10px',
            cursor: 'pointer',
            width: '80px',
            transition: 'background 0.15s ease',
          }}
          whileHover={{
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
          }}
          whileTap={{ scale: 0.9 }}
        >
          <div
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '12px',
              background: icon.gradient,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: icon.icon.length <= 2 ? '20px' : '24px',
              fontWeight: icon.icon === '>_' || icon.icon === 'in' ? 700 : 400,
              color: 'white',
              fontFamily: icon.icon === '>_' ? 'var(--font-mono)' : 'inherit',
              boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
            }}
          >
            {icon.id === 'github' ? (
              <svg role="img" viewBox="0 0 24 24" fill="currentColor" style={{ width: '50%', height: '50%' }}>
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
              </svg>
            ) : icon.id === 'google' ? (
              <svg viewBox="0 0 24 24" style={{ width: '50%', height: '50%' }}>
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
            ) : icon.icon}
          </div>
          <span
            style={{
              fontSize: '10px',
              color: 'white',
              textAlign: 'center',
              textShadow: '0 1px 4px rgba(0,0,0,0.8)',
              lineHeight: '1.2',
              fontWeight: 500,
            }}
          >
            {icon.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
