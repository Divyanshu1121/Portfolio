'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppStore, OSType } from '@/stores/appStore';

interface ContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
}

export default function ContextMenu({ x, y, onClose }: ContextMenuProps) {
  const { activeWallpaper, setActiveWallpaper, wallpapers, activeOS, setActiveOS } = useAppStore();
  const [activeSubmenu, setActiveSubmenu] = useState<'wallpaper' | 'os' | null>(null);

  const wallpaperLabels: Record<string, string> = {
    'desktop-wallpaper': 'DivyanshuOS Classic',
    'spiderman': 'Spiderman',
    'car': 'Car',
    'black_hole': 'Black Hole',
    'earth': 'Earth',
  };

  const osOptions: { id: OSType; label: string; icon: string }[] = [
    { id: 'macos', label: 'macOS', icon: '🍎' },
    { id: 'windows', label: 'Windows 11', icon: '🪟' },
    { id: 'ubuntu', label: 'Ubuntu', icon: '🐧' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.1 }}
      className="context-menu"
      style={{
        position: 'fixed',
        left: Math.min(x, window.innerWidth - 220),
        top: Math.min(y, window.innerHeight - 400),
        zIndex: 99999,
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Wallpaper submenu */}
      <div 
        className="context-menu-submenu-wrapper" 
        style={{ position: 'relative' }}
        onMouseEnter={() => setActiveSubmenu('wallpaper')}
        onMouseLeave={() => setActiveSubmenu(null)}
      >
        <div className="context-menu-item">
          Change Wallpaper
          <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>›</span>
        </div>
        {activeSubmenu === 'wallpaper' && (
          <div
            className="context-menu context-menu-submenu"
            style={{
              position: 'absolute',
              left: '100%',
              top: '-4px',
              minWidth: '180px',
            }}
          >
            {wallpapers.map((wp) => (
              <div
                key={wp}
                className="context-menu-item"
                onClick={() => { setActiveWallpaper(wp); onClose(); }}
              >
                <span>{activeWallpaper === wp ? '✓ ' : '   '}{wallpaperLabels[wp] || wp}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Change OS submenu */}
      <div 
        className="context-menu-submenu-wrapper" 
        style={{ position: 'relative' }}
        onMouseEnter={() => setActiveSubmenu('os')}
        onMouseLeave={() => setActiveSubmenu(null)}
      >
        <div className="context-menu-item">
          Change OS
          <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>›</span>
        </div>
        {activeSubmenu === 'os' && (
          <div
            className="context-menu context-menu-submenu"
            style={{
              position: 'absolute',
              left: '100%',
              top: '-4px',
              minWidth: '180px',
            }}
          >
            {osOptions.map((os) => (
              <div
                key={os.id}
                className="context-menu-item"
                onClick={() => { setActiveOS(os.id); onClose(); }}
              >
                <span>{activeOS === os.id ? '✓ ' : '   '}{os.icon} {os.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="context-menu-divider" />

      <div className="context-menu-item" onClick={onClose}>
        Sort Desktop Icons
      </div>
      <div className="context-menu-item" onClick={() => { window.location.reload(); }}>
        Refresh
      </div>

      <div className="context-menu-divider" />

      <div className="context-menu-item" onClick={onClose}>
        About This Portfolio
      </div>
      <div
        className="context-menu-item"
        onClick={() => { window.open('https://github.com/Divyanshu1121', '_blank'); onClose(); }}
      >
        View Source Code <span style={{ fontSize: '10px' }}>↗</span>
      </div>
    </motion.div>
  );
}

