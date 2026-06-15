'use client';

import { useState, useEffect, useRef } from 'react';
import { useWindowStore } from '@/stores/windowStore';
import { useAppStore } from '@/stores/appStore';

interface MenubarProps {
  onSpotlight: () => void;
}

type MenuType = 'apple' | 'divyanshuos' | 'file' | 'view' | 'window' | 'help' | 'tech';

export default function Menubar({ onSpotlight }: MenubarProps) {
  const [time, setTime] = useState('');
  const [dateStr, setDateStr] = useState('');
  const [activeMenu, setActiveMenu] = useState<MenuType | null>(null);
  
  const { windows, openWindow, closeWindow, maximizeWindow } = useWindowStore();
  const activeOS = useAppStore((s) => s.activeOS);
  const menubarRef = useRef<HTMLDivElement>(null);

  const anyMaximized = Object.values(windows).some(
    (win) => win.isOpen && win.isMaximized && !win.isMinimized
  );

  useEffect(() => {
    function updateClock() {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }));
      setDateStr(now.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' }));
    }
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    if (!activeMenu) return;

    function handleOutsideClick(e: MouseEvent) {
      if (menubarRef.current && !menubarRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
      }
    }

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [activeMenu]);

  const toggleMenu = (menu: MenuType) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  const handleAction = (action: () => void) => {
    action();
    setActiveMenu(null);
  };

  // Custom action: Close all open windows
  const closeAll = () => {
    Object.keys(windows).forEach((id) => {
      if (windows[id]?.isOpen) {
        closeWindow(id);
      }
    });
  };

  // Custom action: Maximize active focused window if any
  const maximizeActive = () => {
    const active = Object.values(windows)
      .filter((win) => win.isOpen && !win.isMinimized)
      .sort((a, b) => b.zIndex - a.zIndex)[0];
    if (active) {
      maximizeWindow(active.id);
    }
  };

  // Stylings
  const menuTriggerStyle = (menu: MenuType) => ({
    padding: '4px 8px',
    borderRadius: '4px',
    background: activeMenu === menu ? 'rgba(255, 255, 255, 0.12)' : 'transparent',
    cursor: 'pointer',
    color: activeMenu === menu ? '#fff' : 'var(--text-secondary)',
    transition: 'background 0.15s ease, color 0.15s ease',
    userSelect: 'none' as const,
  });

  const dropdownStyle = {
    position: 'absolute' as const,
    top: 'var(--menubar-height)',
    background: 'rgba(20, 20, 30, 0.85)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '8px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
    padding: '6px 0',
    minWidth: '180px',
    display: 'flex',
    flexDirection: 'column' as const,
    zIndex: 10000,
    marginTop: '2px',
  };

  const itemStyle = {
    padding: '6px 14px',
    fontSize: '12px',
    color: '#f3f3f5',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '20px',
    transition: 'background 0.15s ease',
  };

  const dividerStyle = {
    height: '1px',
    background: 'rgba(255, 255, 255, 0.08)',
    margin: '5px 0',
  };

  const shortcutStyle = {
    color: 'rgba(255, 255, 255, 0.35)',
    fontSize: '10.5px',
    fontFamily: 'var(--font-mono, monospace)',
  };

  // Windows: no top menubar at all
  if (activeOS === 'windows') return null;

  // Ubuntu: simplified GNOME top panel
  if (activeOS === 'ubuntu') {
    return (
      <div className="ubuntu-top-panel" ref={menubarRef}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <span
            onClick={onSpotlight}
            style={{
              cursor: 'pointer',
              padding: '2px 10px',
              borderRadius: '4px',
              fontWeight: 600,
              fontSize: '13px',
              transition: 'background 0.15s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
          >
            Activities
          </span>
        </div>
        <span style={{ fontSize: '13px', fontWeight: 500, fontFamily: 'var(--font-body)' }}>
          {time} · {dateStr}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px' }}>
          <span>📶</span>
          <span>🔊</span>
          <span>🔋</span>
          <span
            onClick={() => openWindow('settings')}
            style={{ cursor: 'pointer', padding: '2px 6px', borderRadius: '4px' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
          >
            ⚙️
          </span>
        </div>
      </div>
    );
  }

  // macOS: full menubar
  return (
    <div
      ref={menubarRef}
      className="glass-menubar"
      style={{
        position: 'fixed',
        transform: anyMaximized ? 'translateY(-100%)' : 'translateY(0)',
        transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        top: 0,
        left: 0,
        right: 0,
        height: 'var(--menubar-height)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 14px',
        fontSize: '13px',
        fontWeight: 500,
        fontFamily: 'var(--font-body)',
      }}
    >
      {/* Left side menu items */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        
        {/* Apple Menu */}
        <div style={{ position: 'relative' }}>
          <span
            onClick={() => toggleMenu('apple')}
            style={{ ...menuTriggerStyle('apple'), fontSize: '15px' }}
          >
            🍎
          </span>
          {activeMenu === 'apple' && (
            <div style={{ ...dropdownStyle, left: '4px' }}>
              <div
                style={itemStyle}
                className="menubar-dropdown-item"
                onClick={() => handleAction(() => openWindow('about'))}
              >
                <span>About DivyanshuOS</span>
              </div>
              <div
                style={itemStyle}
                className="menubar-dropdown-item"
                onClick={() => handleAction(() => openWindow('settings'))}
              >
                <span>System Preferences...</span>
              </div>
              <div style={dividerStyle} />
              <div
                style={itemStyle}
                className="menubar-dropdown-item"
                onClick={() => handleAction(() => window.location.reload())}
              >
                <span>Restart...</span>
              </div>
              <div
                style={itemStyle}
                className="menubar-dropdown-item"
                onClick={() => handleAction(() => alert('System shutdown completed. See you soon!'))}
              >
                <span>Shut Down...</span>
              </div>
            </div>
          )}
        </div>

        {/* DivyanshuOS Menu */}
        <div style={{ position: 'relative' }}>
          <span
            onClick={() => toggleMenu('divyanshuos')}
            style={{ ...menuTriggerStyle('divyanshuos'), fontWeight: 700 }}
          >
            DivyanshuOS
          </span>
          {activeMenu === 'divyanshuos' && (
            <div style={{ ...dropdownStyle, left: '0' }}>
              <div
                style={itemStyle}
                className="menubar-dropdown-item"
                onClick={() => handleAction(() => openWindow('ai'))}
              >
                <span>AI Assistant</span>
                <span style={shortcutStyle}>🤖</span>
              </div>
              <div
                style={itemStyle}
                className="menubar-dropdown-item"
                onClick={() => handleAction(() => openWindow('terminal'))}
              >
                <span>Open Terminal</span>
                <span style={shortcutStyle}>⌘T</span>
              </div>
              <div style={dividerStyle} />
              <div
                style={itemStyle}
                className="menubar-dropdown-item"
                onClick={() => handleAction(() => window.open('/divyanshu-patel-resume.pdf', '_blank'))}
              >
                <span>Download Resume</span>
                <span style={shortcutStyle}>📄</span>
              </div>
            </div>
          )}
        </div>

        {/* File Menu */}
        <div style={{ position: 'relative' }}>
          <span
            onClick={() => toggleMenu('file')}
            style={menuTriggerStyle('file')}
          >
            File
          </span>
          {activeMenu === 'file' && (
            <div style={{ ...dropdownStyle, left: '0' }}>
              <div
                style={itemStyle}
                className="menubar-dropdown-item"
                onClick={() => handleAction(() => openWindow('projects'))}
              >
                <span>Open Projects</span>
                <span style={shortcutStyle}>⌘O</span>
              </div>
              <div
                style={itemStyle}
                className="menubar-dropdown-item"
                onClick={() => handleAction(() => openWindow('experience'))}
              >
                <span>Open Experience</span>
              </div>
              <div
                style={itemStyle}
                className="menubar-dropdown-item"
                onClick={() => handleAction(() => openWindow('contact'))}
              >
                <span>Open Contact Info</span>
              </div>
              <div style={dividerStyle} />
              <div
                style={itemStyle}
                className="menubar-dropdown-item"
                onClick={() => handleAction(() => window.open('/divyanshu-patel-resume.pdf', '_blank'))}
              >
                <span>Download PDF</span>
              </div>
            </div>
          )}
        </div>

        {/* View Menu */}
        <div style={{ position: 'relative' }}>
          <span
            onClick={() => toggleMenu('view')}
            style={menuTriggerStyle('view')}
          >
            View
          </span>
          {activeMenu === 'view' && (
            <div style={{ ...dropdownStyle, left: '0' }}>
              <div
                style={itemStyle}
                className="menubar-dropdown-item"
                onClick={() => handleAction(onSpotlight)}
              >
                <span>Spotlight Search</span>
                <span style={shortcutStyle}>⌘K</span>
              </div>
              <div
                style={itemStyle}
                className="menubar-dropdown-item"
                onClick={() => handleAction(() => alert('Right-click on desktop to change wallpaper!'))}
              >
                <span>Change Wallpaper</span>
              </div>
              <div style={dividerStyle} />
              <div
                style={itemStyle}
                className="menubar-dropdown-item"
                onClick={() => handleAction(() => window.location.reload())}
              >
                <span>Reload OS</span>
              </div>
            </div>
          )}
        </div>

        {/* Window Menu */}
        <div style={{ position: 'relative' }}>
          <span
            onClick={() => toggleMenu('window')}
            style={menuTriggerStyle('window')}
          >
            Window
          </span>
          {activeMenu === 'window' && (
            <div style={{ ...dropdownStyle, left: '0' }}>
              <div
                style={itemStyle}
                className="menubar-dropdown-item"
                onClick={() => handleAction(maximizeActive)}
              >
                <span>Maximize Active</span>
                <span style={shortcutStyle}>⌘F</span>
              </div>
              <div style={dividerStyle} />
              <div
                style={itemStyle}
                className="menubar-dropdown-item"
                onClick={() => handleAction(closeAll)}
              >
                <span>Close All Windows</span>
              </div>
            </div>
          )}
        </div>

        {/* Help Menu */}
        <div style={{ position: 'relative' }}>
          <span
            onClick={() => toggleMenu('help')}
            style={menuTriggerStyle('help')}
          >
            Help
          </span>
          {activeMenu === 'help' && (
            <div style={{ ...dropdownStyle, left: '0' }}>
              <div
                style={itemStyle}
                className="menubar-dropdown-item"
                onClick={() => handleAction(() => alert('Onboarding Tip: Click dock icons to launch apps. Right click on the desktop to change wallpapers. You can drag and resize any open windows!'))}
              >
                <span>DivyanshuOS Help Tips</span>
              </div>
              <div style={dividerStyle} />
              <div
                style={itemStyle}
                className="menubar-dropdown-item"
                onClick={() => handleAction(() => window.open('https://github.com/Divyanshu1121', '_blank'))}
              >
                <span>GitHub Source</span>
              </div>
              <div
                style={itemStyle}
                className="menubar-dropdown-item"
                onClick={() => handleAction(() => window.open('https://linkedin.com/in/divyanshu-patel-99450426b', '_blank'))}
              >
                <span>LinkedIn Contact</span>
              </div>
            </div>
          )}
        </div>

        {/* Tech Stack Menu */}
        <div style={{ position: 'relative' }}>
          <span
            onClick={() => toggleMenu('tech')}
            style={menuTriggerStyle('tech')}
          >
            Tech Stack
          </span>
          {activeMenu === 'tech' && (
            <div style={{ ...dropdownStyle, left: '0' }}>
              <div style={{ ...itemStyle, cursor: 'default' }}>
                <span>⚛️ React 19</span>
              </div>
              <div style={{ ...itemStyle, cursor: 'default' }}>
                <span>⚡ Next.js 16</span>
              </div>
              <div style={{ ...itemStyle, cursor: 'default' }}>
                <span>📘 TypeScript</span>
              </div>
              <div style={{ ...itemStyle, cursor: 'default' }}>
                <span>🎨 Vanilla CSS</span>
              </div>
              <div style={{ ...itemStyle, cursor: 'default' }}>
                <span>🎬 Framer Motion</span>
              </div>
              <div style={{ ...itemStyle, cursor: 'default' }}>
                <span>📦 Zustand Store</span>
              </div>
              <div style={dividerStyle} />
              <div
                style={itemStyle}
                className="menubar-dropdown-item"
                onClick={() => handleAction(() => window.open('https://vite.dev', '_blank'))}
              >
                <span>🌐 Vite (Showcase)</span>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Right side status items */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '12px' }}>
        <span
          onClick={onSpotlight}
          style={{ cursor: 'pointer', color: 'var(--text-secondary)', fontSize: '14px' }}
          title="Search (⌘K)"
        >
          🔍
        </span>
        <span style={{ color: 'var(--text-secondary)' }}>🔋 94%</span>
        <span style={{ color: 'var(--text-secondary)' }}>📶</span>
        <span style={{ color: 'var(--text-secondary)' }}>🔊</span>
        <span style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', fontSize: '11px' }}>
          {time} {dateStr}
        </span>
      </div>
    </div>
  );
}
