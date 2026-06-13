'use client';

import { useAppStore } from '@/stores/appStore';

export default function Wallpaper() {
  const { activeWallpaper } = useAppStore();

  const getWallpaperUrl = (wp: string) => {
    switch (wp) {
      case 'spiderman':
        return '/spiderman.webp';
      case 'car':
        return '/car.webp';
      case 'black_hole':
        return '/black_hole.webp';
      case 'earth':
        return '/earth.webp';
      case 'desktop-wallpaper':
      default:
        return '/desktop_wallpaper.webp';
    }
  };

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      backgroundImage: `url(${getWallpaperUrl(activeWallpaper)})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      zIndex: 0,
      transition: 'background-image 0.5s ease-in-out', // smooth transition between wallpapers
    }} />
  );
}
