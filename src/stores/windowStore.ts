import { create } from 'zustand';
import { windowConfigs } from '@/data/portfolio';

export interface WindowState {
  id: string;
  title: string;
  icon: string;
  x: number;
  y: number;
  width: number;
  height: number;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  prevBounds?: { x: number; y: number; width: number; height: number };
}

interface WindowStore {
  windows: Record<string, WindowState>;
  topZIndex: number;
  openWindow: (id: string) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  updatePosition: (id: string, x: number, y: number) => void;
  updateSize: (id: string, width: number, height: number) => void;
  isWindowOpen: (id: string) => boolean;
}

function getDefaultPosition(id: string, index: number) {
  const config = windowConfigs[id];
  if (!config) return { x: 200 + index * 30, y: 100 + index * 30 };

  // Center windows with slight offset per index
  const screenW = typeof window !== 'undefined' ? window.innerWidth : 1440;
  const screenH = typeof window !== 'undefined' ? window.innerHeight : 900;
  const x = Math.max(60, (screenW - config.defaultWidth) / 2 + (index % 3 - 1) * 60);
  const y = Math.max(40, (screenH - config.defaultHeight) / 2 + (index % 3 - 1) * 40);
  return { x, y };
}

function createDefaultWindows(): Record<string, WindowState> {
  const windows: Record<string, WindowState> = {};
  const ids = Object.keys(windowConfigs);
  ids.forEach((id, index) => {
    const config = windowConfigs[id];
    const pos = getDefaultPosition(id, index);
    windows[id] = {
      id,
      title: config.title,
      icon: config.icon,
      x: pos.x,
      y: pos.y,
      width: config.defaultWidth,
      height: config.defaultHeight,
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 100 + index,
    };
  });
  return windows;
}

export const useWindowStore = create<WindowStore>((set, get) => ({
  windows: createDefaultWindows(),
  topZIndex: 200,

  openWindow: (id: string) => {
    const state = get();
    const newZ = state.topZIndex + 1;
    set((s) => ({
      topZIndex: newZ,
      windows: {
        ...s.windows,
        [id]: {
          ...(s.windows[id] || createWindowState(id, newZ)),
          isOpen: true,
          isMinimized: false,
          zIndex: newZ,
        },
      },
    }));
  },

  closeWindow: (id: string) => {
    set((s) => ({
      windows: {
        ...s.windows,
        [id]: {
          ...s.windows[id],
          isOpen: false,
          isMinimized: false,
          isMaximized: false,
        },
      },
    }));
  },

  minimizeWindow: (id: string) => {
    set((s) => ({
      windows: {
        ...s.windows,
        [id]: {
          ...s.windows[id],
          isMinimized: true,
        },
      },
    }));
  },

  maximizeWindow: (id: string) => {
    set((s) => {
      const win = s.windows[id];
      if (win.isMaximized) {
        // Restore
        return {
          windows: {
            ...s.windows,
            [id]: {
              ...win,
              isMaximized: false,
              x: win.prevBounds?.x ?? win.x,
              y: win.prevBounds?.y ?? win.y,
              width: win.prevBounds?.width ?? win.width,
              height: win.prevBounds?.height ?? win.height,
              prevBounds: undefined,
            },
          },
        };
      }
      // Maximize: fill available area (full screen, covering menubar + dock)
      return {
        windows: {
          ...s.windows,
          [id]: {
            ...win,
            isMaximized: true,
            prevBounds: { x: win.x, y: win.y, width: win.width, height: win.height },
            x: 0,
            y: 0,
            width: typeof window !== 'undefined' ? window.innerWidth : 1440,
            height: typeof window !== 'undefined' ? window.innerHeight : 900,
          },
        },
      };
    });
  },

  focusWindow: (id: string) => {
    const state = get();
    const newZ = state.topZIndex + 1;
    set((s) => ({
      topZIndex: newZ,
      windows: {
        ...s.windows,
        [id]: {
          ...s.windows[id],
          zIndex: newZ,
        },
      },
    }));
  },

  updatePosition: (id: string, x: number, y: number) => {
    set((s) => ({
      windows: {
        ...s.windows,
        [id]: {
          ...s.windows[id],
          x,
          y,
          isMaximized: false,
        },
      },
    }));
  },

  updateSize: (id: string, width: number, height: number) => {
    set((s) => ({
      windows: {
        ...s.windows,
        [id]: {
          ...s.windows[id],
          width,
          height,
          isMaximized: false,
        },
      },
    }));
  },

  isWindowOpen: (id: string) => {
    const state = get();
    return state.windows[id]?.isOpen && !state.windows[id]?.isMinimized;
  },
}));

function createWindowState(id: string, zIndex: number): WindowState {
  const config = windowConfigs[id] || {
    id,
    title: id,
    icon: '📄',
    defaultWidth: 400,
    defaultHeight: 400,
    minWidth: 320,
    minHeight: 200,
  };
  return {
    id,
    title: config.title,
    icon: config.icon,
    x: 200,
    y: 100,
    width: config.defaultWidth,
    height: config.defaultHeight,
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex,
  };
}
