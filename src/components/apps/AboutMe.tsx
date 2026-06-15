'use client';

import { motion } from 'framer-motion';
import { personalInfo, bio, coreStack, quickStats } from '@/data/portfolio';
import { staggerContainer, staggerItem } from '@/utils/animations';

export default function AboutMe() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      style={{ maxWidth: '460px' }}
    >
      {/* Header */}
      <motion.div variants={staggerItem} style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
        <div
          style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #5E9BF0, #A78BF5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            fontWeight: 700,
            color: 'white',
            letterSpacing: '2px',
            flexShrink: 0,
          }}
        >
          {personalInfo.initials}
        </div>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 600, marginBottom: '2px' }}>{personalInfo.fullName}</h1>
          <p style={{ fontSize: '13px', color: 'var(--accent-blue)' }}>{personalInfo.role}</p>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>📍 {personalInfo.location}</p>
        </div>
      </motion.div>

      {/* Bio */}
      <motion.p
        variants={staggerItem}
        style={{
          fontSize: '12px',
          lineHeight: 1.8,
          color: 'var(--text-secondary)',
          marginBottom: '18px',
        }}
      >
        {bio}
      </motion.p>

      {/* Core Stack */}
      <motion.div variants={staggerItem} style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
        {coreStack.map((tech) => (
          <span key={tech} className="pill">{tech}</span>
        ))}
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        variants={staggerItem}
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '8px',
          marginBottom: '20px',
        }}
      >
        {quickStats.map((stat) => (
          <div key={stat.label} className="card" style={{ padding: '12px' }}>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              {stat.label}
            </div>
            <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
              {stat.value}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Links */}
      <motion.div variants={staggerItem} style={{ display: 'flex', gap: '8px' }}>
        <a
          href={personalInfo.github}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost"
          style={{ textDecoration: 'none' }}
        >
          GitHub ↗
        </a>
        <a
          href={personalInfo.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost"
          style={{ textDecoration: 'none' }}
        >
          LinkedIn ↗
        </a>
        <button className="btn-ghost" onClick={() => {
          const link = document.createElement('a');
          link.href = '/divyanshu-patel-resume.pdf';
          link.download = 'Divyanshu-Patel-Resume.pdf';
          link.click();
        }}>
          Resume ↓
        </button>
      </motion.div>
    </motion.div>
  );
}
