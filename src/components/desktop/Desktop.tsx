'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/stores/appStore';
import { useWindowStore } from '@/stores/windowStore';
import Wallpaper from './Wallpaper';
import Menubar from './Menubar';
import DesktopIcons from './DesktopIcons';
import Dock from './Dock';
import Taskbar from './Taskbar';
import WindowManager from '@/components/window/WindowManager';
import Spotlight from '@/components/spotlight/Spotlight';
import ContextMenu from './ContextMenu';

export default function Desktop() {
  const { setDesktopReady, activeOS } = useAppStore();
  const { openWindow } = useWindowStore();
  const [spotlightOpen, setSpotlightOpen] = useState(false);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    setDesktopReady();
    // Auto-open Google app on startup
    openWindow('google');
  }, [setDesktopReady, openWindow]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+K or Ctrl+K for Spotlight
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSpotlightOpen((prev) => !prev);
      }
      // Escape to close spotlight
      if (e.key === 'Escape') {
        setSpotlightOpen(false);
        setContextMenu(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  }, []);

  const handleDesktopClick = useCallback(() => {
    setContextMenu(null);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        position: 'fixed',
        inset: 0,
        overflow: 'hidden',
      }}
      onContextMenu={handleContextMenu}
      onClick={handleDesktopClick}
    >
      {/* Wallpaper */}
      <Wallpaper />

      {/* Menubar */}
      <Menubar onSpotlight={() => setSpotlightOpen(true)} />

      {/* Desktop Icons */}
      <DesktopIcons />

      {/* Window Manager */}
      <WindowManager />

      {/* Dock (macOS + Ubuntu) */}
      <Dock />

      {/* Windows Taskbar */}
      {activeOS === 'windows' && (
        <Taskbar onSearch={() => setSpotlightOpen(true)} />
      )}

      {/* Spotlight Search */}
      {spotlightOpen && (
        <Spotlight onClose={() => setSpotlightOpen(false)} />
      )}

      {/* Context Menu */}
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={() => setContextMenu(null)}
        />
      )}
    </motion.div>
  );
}
