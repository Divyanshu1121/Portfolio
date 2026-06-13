'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/stores/appStore';
import BootSequence from '@/components/boot/BootSequence';
import LoginScreen from '@/components/boot/LoginScreen';
import Desktop from '@/components/desktop/Desktop';
import MobileLayout from '@/components/mobile/MobileLayout';
import OSSwitchSplash from '@/components/boot/OSSwitchSplash';

export default function Home() {
  const { bootComplete, loginComplete, isSwitchingOS, switchingOSName } = useAppStore();
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      // Check mobile viewport width
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
      };
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  if (!mounted) {
    return (
      <div style={{ width: '100vw', height: '100vh', background: '#070710' }} />
    );
  }

  return (
    <main style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <AnimatePresence mode="wait">
        {!bootComplete && <BootSequence key="boot" />}
        {bootComplete && !loginComplete && <LoginScreen key="login" />}
        {bootComplete && loginComplete && (
          isMobile ? <MobileLayout key="mobile" /> : <Desktop key="desktop" />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isSwitchingOS && switchingOSName && (
          <OSSwitchSplash key="os-switch" targetOS={switchingOSName} />
        )}
      </AnimatePresence>
    </main>
  );
}
