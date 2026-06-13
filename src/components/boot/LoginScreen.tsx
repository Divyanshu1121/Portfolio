'use client';

import { motion } from 'framer-motion';
import { useAppStore } from '@/stores/appStore';

export default function LoginScreen() {
  const { setLoginComplete, activeOS } = useAppStore();

  // OS-specific styling
  const accentGradient = activeOS === 'windows'
    ? 'linear-gradient(135deg, #0078D4, #2899F5)'
    : activeOS === 'ubuntu'
    ? 'linear-gradient(135deg, #E95420, #F27849)'
    : 'linear-gradient(135deg, #F5A623, #F5C542)';
  const accentGlow = activeOS === 'windows'
    ? 'rgba(0, 120, 212, 0.45)'
    : activeOS === 'ubuntu'
    ? 'rgba(233, 84, 32, 0.45)'
    : 'rgba(245, 166, 35, 0.45)';
  const borderColor = activeOS === 'windows'
    ? 'rgba(0, 120, 212, 0.65)'
    : activeOS === 'ubuntu'
    ? 'rgba(233, 84, 32, 0.65)'
    : 'rgba(245, 166, 35, 0.65)';
  const subtitleColor = activeOS === 'windows'
    ? '#60CDFF'
    : activeOS === 'ubuntu'
    ? '#E95420'
    : '#F5C542';
  const buttonText = activeOS === 'windows'
    ? 'Sign In'
    : activeOS === 'ubuntu'
    ? 'Log In'
    : 'Enter Portfolio';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ y: '-100%', opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      style={{
        position: 'fixed',
        inset: 0,
        background: '#000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 99998,
        gap: '24px',
        overflow: 'hidden',
      }}
    >
      {/* Blurred Wallpaper Background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/desktop_wallpaper.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(30px) brightness(0.4)',
          scale: 1.1,
          zIndex: -1,
        }}
      />
      
      {/* Background particles */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="star"
            style={{
              width: Math.random() * 2 + 1,
              height: Math.random() * 2 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{ opacity: [0.1, 0.6, 0.1] }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Avatar (Enlarged) */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        style={{
          width: '160px',
          height: '160px',
          borderRadius: '50%',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: `0 12px 50px ${accentGlow}`,
          border: `3px solid ${borderColor}`,
        }}
      >
        <img
          src="/avatar_cartoon.webp"
          alt="Avatar"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </motion.div>

      {/* Name (Enlarged) */}
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        style={{
          fontSize: '36px',
          fontWeight: 700,
          color: 'white',
          fontFamily: 'var(--font-display)',
          letterSpacing: '0.5px',
          margin: 0,
        }}
      >
        Arya Shah
      </motion.h1>

      {/* Subtitle / Role (Enlarged) */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{
          fontSize: '18px',
          color: subtitleColor,
          fontFamily: 'var(--font-body)',
          margin: 0,
        }}
      >
        AI Engineer · Full-Stack Developer
      </motion.p>

      {/* Enter Button (Enlarged) */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        whileHover={{ scale: 1.05, boxShadow: `0 8px 30px ${accentGlow}` }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setLoginComplete()}
        style={{
          marginTop: '20px',
          background: accentGradient,
          color: 'white',
          border: 'none',
          padding: '16px 52px',
          borderRadius: '14px',
          fontSize: '18px',
          fontWeight: 600,
          cursor: 'pointer',
          fontFamily: 'var(--font-body)',
          letterSpacing: '0.5px',
        }}
      >
        {buttonText}
      </motion.button>

      {/* Preload Google app design page in cache */}
      <iframe
        src="/design/index.html"
        style={{
          display: 'none',
          width: 0,
          height: 0,
          border: 'none',
          visibility: 'hidden',
          position: 'absolute',
          pointerEvents: 'none',
        }}
      />
    </motion.div>
  );
}
