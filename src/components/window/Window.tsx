'use client';

import { useCallback, useRef } from 'react';
import { Rnd } from 'react-rnd';
import { motion, AnimatePresence } from 'framer-motion';
import { useWindowStore } from '@/stores/windowStore';
import { useAppStore } from '@/stores/appStore';
import { windowConfigs } from '@/data/portfolio';

interface WindowProps {
  id: string;
  children: React.ReactNode;
}

export default function Window({ id, children }: WindowProps) {
  const {
    windows,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    focusWindow,
    updatePosition,
    updateSize,
    topZIndex,
  } = useWindowStore();

  const activeOS = useAppStore((s) => s.activeOS);

  const win = windows[id];
  const config = windowConfigs[id];
  const rndRef = useRef<Rnd>(null);

  const handleClose = useCallback(() => closeWindow(id), [closeWindow, id]);
  const handleMinimize = useCallback(() => minimizeWindow(id), [minimizeWindow, id]);
  const handleMaximize = useCallback(() => maximizeWindow(id), [maximizeWindow, id]);
  const handleFocus = useCallback(() => focusWindow(id), [focusWindow, id]);

  if (!win || !win.isOpen) return null;

  const isFocused = win.zIndex >= topZIndex - 1;

  const renderTitlebar = () => {
    if (activeOS === 'windows') {
      // Windows 11: icon + title left, controls right
      return (
        <div className="window-titlebar window-drag-handle" style={{ justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingLeft: '8px' }}>
            <span style={{ fontSize: '13px' }}>{win.icon}</span>
            <span style={{
              fontSize: '12px',
              fontWeight: 500,
              color: isFocused ? 'var(--text-primary)' : 'var(--text-muted)',
            }}>{win.title}</span>
          </div>
          <div className="win-controls" onMouseDown={(e) => e.stopPropagation()}>
            <button className="win-control-btn" onClick={handleMinimize} aria-label="Minimize">
              <svg width="10" height="1" viewBox="0 0 10 1"><rect width="10" height="1" fill="currentColor" /></svg>
            </button>
            <button className="win-control-btn" onClick={handleMaximize} aria-label="Maximize">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1">
                <rect x="0.5" y="0.5" width="9" height="9" />
              </svg>
            </button>
            <button className="win-control-btn win-close" onClick={handleClose} aria-label="Close">
              <svg width="10" height="10" viewBox="0 0 10 10" stroke="currentColor" strokeWidth="1.2">
                <line x1="0" y1="0" x2="10" y2="10" /><line x1="10" y1="0" x2="0" y2="10" />
              </svg>
            </button>
          </div>
        </div>
      );
    }

    if (activeOS === 'ubuntu') {
      // Ubuntu: title left, circle controls right
      return (
        <div className="window-titlebar window-drag-handle" style={{ justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingLeft: '8px' }}>
            <span style={{ fontSize: '13px' }}>{win.icon}</span>
            <span style={{
              fontSize: '12px',
              fontWeight: 500,
              color: isFocused ? 'var(--text-primary)' : 'var(--text-muted)',
            }}>{win.title}</span>
          </div>
          <div className="ubuntu-controls" onMouseDown={(e) => e.stopPropagation()}>
            <button className="ubuntu-control-btn ubuntu-minimize" onClick={handleMinimize} aria-label="Minimize">−</button>
            <button className="ubuntu-control-btn ubuntu-maximize" onClick={handleMaximize} aria-label="Maximize">+</button>
            <button className="ubuntu-control-btn ubuntu-close" onClick={handleClose} aria-label="Close">×</button>
          </div>
        </div>
      );
    }

    // macOS default: traffic lights left, centered title
    return (
      <div className="window-titlebar window-drag-handle">
        <div className="traffic-lights" onMouseDown={(e) => e.stopPropagation()}>
          <button className="traffic-light close" onClick={handleClose} aria-label="Close window">×</button>
          <button className="traffic-light minimize" onClick={handleMinimize} aria-label="Minimize window">−</button>
          <button className="traffic-light maximize" onClick={handleMaximize} aria-label="Maximize window">⤢</button>
        </div>
        <div
          style={{
            flex: 1,
            textAlign: 'center',
            fontSize: '12px',
            fontWeight: 500,
            color: isFocused ? 'var(--text-primary)' : 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            marginRight: '60px',
          }}
        >
          <span>{win.icon}</span>
          <span>{win.title}</span>
        </div>
      </div>
    );
  };

  return (
    <AnimatePresence>
      {!win.isMinimized && (
        <Rnd
          ref={rndRef}
          size={{ width: win.width, height: win.height }}
          position={{ x: win.x, y: win.y }}
          minWidth={config?.minWidth || 320}
          minHeight={config?.minHeight || 200}
          dragHandleClassName="window-drag-handle"
          bounds="window"
          onDragStart={handleFocus}
          onDragStop={(_e, d) => updatePosition(id, d.x, d.y)}
          onResizeStop={(_e, _dir, ref, _delta, pos) => {
            updateSize(id, parseInt(ref.style.width), parseInt(ref.style.height));
            updatePosition(id, pos.x, pos.y);
          }}
          onMouseDown={handleFocus}
          style={{ zIndex: win.isMaximized ? 10005 : win.zIndex }}
          enableResizing={!win.isMaximized}
          disableDragging={win.isMaximized}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className={`window-frame ${isFocused ? 'focused' : ''}`}
            style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}
          >
            {renderTitlebar()}
            <div className="window-content">
              {children}
            </div>
          </motion.div>
        </Rnd>
      )}
    </AnimatePresence>
  );
}

