'use client';

import { motion } from 'framer-motion';
import { certifications } from '@/data/portfolio';
import { staggerContainer, staggerItem } from '@/utils/animations';

export default function Certifications() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}
    >
      {certifications.map((cert) => (
        <motion.div
          key={cert.id}
          variants={staggerItem}
          className="card"
          style={{
            padding: '14px',
            borderLeft: `3px solid ${cert.accent}`,
            gridColumn: cert.items.length > 2 ? 'span 2' : 'span 1',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <span style={{ fontSize: '20px' }}>{cert.icon}</span>
            <h3 style={{ fontSize: '13px', fontWeight: 600, color: cert.accent }}>
              {cert.issuer}
            </h3>
          </div>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {cert.items.map((item) => (
              <li key={item} style={{
                fontSize: '11px',
                color: 'var(--text-secondary)',
                padding: '3px 0',
                paddingLeft: '16px',
                position: 'relative',
                lineHeight: 1.5,
              }}>
                <span style={{ position: 'absolute', left: 0, color: cert.accent }}>✓</span>
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </motion.div>
  );
}
