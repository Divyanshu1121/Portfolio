'use client';

import { useEffect } from 'react';
import { useAppStore } from '@/stores/appStore';

export function ThemeSyncer() {
  const activeOS = useAppStore((s) => s.activeOS);

  useEffect(() => {
    document.documentElement.setAttribute('data-os', activeOS);
  }, [activeOS]);

  return null;
}
