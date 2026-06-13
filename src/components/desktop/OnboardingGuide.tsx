'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function OnboardingGuide() {
  const [show, setShow] = useState(false);
  const [targetPos, setTargetPos] = useState<{ x: number; y: number; height: number } | null>(null);

  useEffect(() => {
    // Check if the user has already dismissed the guide in this session
    const dismissed = sessionStorage.getItem('aryaos-guide-dismissed-v2') === 'true';
    if (!dismissed) {
      // Small delay after load to make it feel deliberate and smooth
      const timer = setTimeout(() => {
        setShow(true);
        measureTarget();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const measureTarget = () => {
    // Attempt to target the Google icon in the Dock first, fallback to Desktop icon
    const dockTarget = document.getElementById('dock-icon-google');
    const desktopTarget = document.getElementById('desktop-icon-google');
    const target = dockTarget || desktopTarget;

    if (target) {
      const rect = target.getBoundingClientRect();
      setTargetPos({
        x: rect.left + rect.width / 2,
        y: rect.top,
        height: rect.height,
      });
    }
  };

  useEffect(() => {
    if (!show) return;

    window.addEventListener('resize', measureTarget);
    // Re-measure after a short interval to handle spring animations on dock load
    const interval = setInterval(measureTarget, 500);

    return () => {
      window.removeEventListener('resize', measureTarget);
      clearInterval(interval);
    };
  }, [show]);

  const handleDismiss = () => {
    setShow(false);
    sessionStorage.setItem('aryaos-guide-dismissed-v2', 'true');
  };

  if (!show || !targetPos) return null;

  return (
    <AnimatePresence>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none', // Allow clicking desktop behind guide overlay
          zIndex: 10010, // Render above maximized windows, dock, and menubar
        }}
      >
        {/* Transparent backdrop overlay just to capture clicks to dismiss (optional), 
            but here we just render the interactive card which has pointerEvents: auto */}
        
        {/* Onboarding Card */}
        <motion.div
          initial={{ opacity: 0, y: targetPos.y - 140, scale: 0.95 }}
          animate={{ opacity: 1, y: targetPos.y - 170, scale: 1 }}
          exit={{ opacity: 0, y: targetPos.y - 140, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
          style={{
            position: 'absolute',
            left: `${targetPos.x - 140}px`,
            width: '280px',
            background: 'rgba(25, 25, 35, 0.85)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '16px',
            padding: '16px 20px',
            color: '#ffffff',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(66, 133, 244, 0.15)',
            pointerEvents: 'auto', // Allow clicks inside the card
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '18px' }}>🚀</span>
            <span style={{ fontWeight: 700, fontSize: '14px', letterSpacing: '-0.2px' }}>
              Quick Tip
            </span>
          </div>

          <p style={{ fontSize: '12.5px', lineHeight: '1.5', opacity: 0.9, margin: 0 }}>
            Click the <strong>Google</strong> application icon to explore my main portfolio website!
          </p>

          <button
            onClick={handleDismiss}
            style={{
              alignSelf: 'flex-end',
              background: 'linear-gradient(135deg, #4285F4, #357ae8)',
              color: '#ffffff',
              border: 'none',
              padding: '6px 14px',
              borderRadius: '8px',
              fontSize: '11px',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(66, 133, 244, 0.3)',
              transition: 'transform 0.1s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.03)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
          >
            Got it!
          </button>

          {/* Pulsing Pointer Arrow pointing to the Google app */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              bottom: '-12px',
              left: '130px',
              width: 0,
              height: 0,
              borderLeft: '10px solid transparent',
              borderRight: '10px solid transparent',
              borderTop: '12px solid rgba(25, 25, 35, 0.85)',
              filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.2))',
            }}
          />
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
