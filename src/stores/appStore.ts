import { create } from 'zustand';

export type OSType = 'macos' | 'windows' | 'ubuntu';

function getInitialOS(): OSType {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('aryaos-active-os');
    if (stored === 'macos' || stored === 'windows' || stored === 'ubuntu') {
      return stored;
    }
  }
  return 'macos';
}

interface AppState {
  bootComplete: boolean;
  loginComplete: boolean;
  desktopReady: boolean;
  activeWallpaper: string;
  wallpapers: string[];
  activeOS: OSType;
  isSwitchingOS: boolean;
  switchingOSName: OSType | null;
  setBootComplete: () => void;
  setLoginComplete: () => void;
  setDesktopReady: () => void;
  setActiveWallpaper: (wallpaper: string) => void;
  setActiveOS: (os: OSType) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  bootComplete: false,
  loginComplete: false,
  desktopReady: false,
  activeWallpaper: 'desktop-wallpaper',
  wallpapers: [
    'desktop-wallpaper',
    'spiderman',
    'car',
    'black_hole',
    'earth',
  ],
  activeOS: getInitialOS(),
  isSwitchingOS: false,
  switchingOSName: null,
  setBootComplete: () => set({ bootComplete: true }),
  setLoginComplete: () => set({ loginComplete: true }),
  setDesktopReady: () => set({ desktopReady: true }),
  setActiveWallpaper: (wallpaper) => set({ activeWallpaper: wallpaper }),
  setActiveOS: (os) => {
    const currentOS = get().activeOS;
    if (currentOS === os) return;

    // Start transition
    set({ isSwitchingOS: true, switchingOSName: os });

    // Apply attribute change and update activeOS after splash screen covers the layout
    setTimeout(() => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('aryaos-active-os', os);
        document.documentElement.setAttribute('data-os', os);
      }
      set({ activeOS: os });
    }, 800);

    // End transition
    setTimeout(() => {
      set({ isSwitchingOS: false, switchingOSName: null });
    }, 2800);
  },
}));
