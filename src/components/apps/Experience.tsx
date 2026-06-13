'use client';

import { motion } from 'framer-motion';
import { experiences } from '@/data/portfolio';
import { staggerContainer, staggerItem } from '@/utils/animations';

export default function Experience() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      <div style={{ position: 'relative', paddingLeft: '24px' }}>
        {/* Timeline line */}
        <div
          style={{
            position: 'absolute',
            left: '7px',
            top: '8px',
            bottom: '8px',
            width: '2px',
            background: 'linear-gradient(180deg, var(--accent-blue), var(--accent-purple), var(--accent-teal))',
            borderRadius: '1px',
            opacity: 0.4,
          }}
        />

        {experiences.map((exp) => (
          <motion.div
            key={exp.id}
            variants={staggerItem}
            style={{ marginBottom: '28px', position: 'relative' }}
          >
            {/* Timeline dot */}
            <div
              style={{
                position: 'absolute',
                left: '-20px',
                top: '6px',
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: exp.color,
                border: '2px solid var(--bg-desktop)',
                boxShadow: `0 0 8px ${exp.color}44`,
              }}
            />

            {/* Header */}
            <div style={{ marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
                  {exp.role}
                </h3>
                {exp.isCurrent && (
                  <span className="badge badge-live" style={{ fontSize: '9px' }}>Current</span>
                )}
              </div>
              <p style={{ fontSize: '12px', color: 'var(--accent-blue)', marginTop: '2px' }}>
                {exp.company}{exp.location ? `, ${exp.location}` : ''}
              </p>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                {exp.period} · {exp.duration}
              </p>
            </div>

            {/* Projects */}
            {exp.projects.map((proj, idx) => (
              <div key={idx} className="card" style={{ marginBottom: '8px', padding: '12px' }}>
                <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>
                  → {proj.name}
                </div>
                <div style={{ fontSize: '10px', color: 'var(--accent-purple)', marginBottom: '8px', fontFamily: 'var(--font-mono)' }}>
                  {proj.stack}
                </div>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {proj.bullets.map((bullet, bi) => (
                    <li key={bi} style={{
                      fontSize: '11px',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.6,
                      paddingLeft: '12px',
                      position: 'relative',
                      marginBottom: '2px',
                    }}>
                      <span style={{ position: 'absolute', left: 0, color: 'var(--text-muted)' }}>–</span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
