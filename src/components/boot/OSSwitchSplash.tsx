'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { OSType } from '@/stores/appStore';

interface OSSwitchSplashProps {
  targetOS: OSType;
}

const switchMessages: Record<OSType, string[]> = {
  macos: [
    'Initializing macOS environment...',
    'Loading Apple menu bar & dock...',
    'Preparing macOS workspace...',
  ],
  windows: [
    'Preparing Windows 11 environment...',
    'Working on updates. Please wait...',
    'Getting things ready for you...',
  ],
  ubuntu: [
    'Loading Linux kernel modules...',
    'Starting GNOME display manager...',
    'Applying Ubuntu theme...',
  ],
};

export default function OSSwitchSplash({ targetOS }: OSSwitchSplashProps) {
  const [messageIndex, setMessageIndex] = useState(0);
  const messages = switchMessages[targetOS];

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev < messages.length - 1 ? prev + 1 : prev));
    }, 900);

    return () => clearInterval(messageInterval);
  }, [messages]);

  // Accent colors matching the target OS
  const accentColor = targetOS === 'windows' ? '#0078D4' : targetOS === 'ubuntu' ? '#E95420' : '#7B61FF';
  const textColor = targetOS === 'windows' ? '#c2e0ff' : targetOS === 'ubuntu' ? '#e95420' : '#00ff87';
  const bgGlow = targetOS === 'windows' ? 'rgba(0, 120, 212, 0.4)' : targetOS === 'ubuntu' ? 'rgba(233, 84, 32, 0.4)' : 'rgba(123, 97, 255, 0.4)';

  const renderLogo = () => {
    if (targetOS === 'windows') {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', width: '80px', height: '80px' }}
        >
          <div style={{ background: '#F25022', borderRadius: '3px' }} />
          <div style={{ background: '#7FBA00', borderRadius: '3px' }} />
          <div style={{ background: '#00A4EF', borderRadius: '3px' }} />
          <div style={{ background: '#FFB900', borderRadius: '3px' }} />
        </motion.div>
      );
    }

    if (targetOS === 'ubuntu') {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            width: '120px',
            height: '120px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg viewBox="0 0 256 256" width="90" height="90">
            <circle cx="128" cy="128" r="112" fill="none" stroke="#E95420" strokeWidth="16" />
            <circle cx="128" cy="32" r="20" fill="#E95420" />
            <circle cx="45" cy="176" r="20" fill="#E95420" />
            <circle cx="211" cy="176" r="20" fill="#E95420" />
          </svg>
        </motion.div>
      );
    }

    // macOS Apple logo or Avatar
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          width: '150px',
          height: '150px',
          borderRadius: '50%',
          border: '3px solid rgba(255, 255, 255, 0.25)',
          boxShadow: `0 0 30px ${bgGlow}`,
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img
          src="/avatar_cartoon.webp"
          alt="Avatar"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </motion.div>
    );
  };

  const renderLoader = () => {
    if (targetOS === 'windows') {
      return (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          style={{
            width: '32px',
            height: '32px',
            border: '3px solid rgba(255, 255, 255, 0.1)',
            borderTop: `3px solid ${accentColor}`,
            borderRadius: '50%',
            marginTop: '10px',
          }}
        />
      );
    }

    if (targetOS === 'ubuntu') {
      return (
        <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: accentColor,
              }}
            />
          ))}
        </div>
      );
    }

    // macOS Progress Bar style (Filling 0% to 100% during the OS switch)
    return (
      <div
        style={{
          width: '200px',
          height: '4px',
          background: 'rgba(255, 255, 255, 0.15)',
          borderRadius: '2px',
          marginTop: '16px',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <motion.div
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 2.6, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            background: '#ffffff',
            boxShadow: '0 0 8px rgba(255, 255, 255, 0.8)',
          }}
        />
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        position: 'fixed',
        inset: 0,
        background: '#040408',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999999, // Higher than context menu and everything else
        gap: '28px',
        overflow: 'hidden',
      }}
    >
      {/* Blurred background wallpaper matching target OS theme */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/desktop_wallpaper.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(40px) brightness(0.25)',
          scale: 1.15,
          zIndex: -1,
        }}
      />

      {renderLogo()}

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <span
          style={{
            fontFamily: 'monospace',
            fontSize: '13px',
            color: textColor,
            letterSpacing: '1px',
            textShadow: `0 0 10px ${bgGlow}`,
            textAlign: 'center',
            minHeight: '20px',
          }}
        >
          {messages[messageIndex]}
        </span>
        {renderLoader()}
      </div>
    </motion.div>
  );
}
