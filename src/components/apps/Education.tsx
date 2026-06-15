'use client';

import { motion } from 'framer-motion';
import { education } from '@/data/portfolio';
import { staggerContainer, staggerItem } from '@/utils/animations';

export default function Education() {
  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible">
      {education.map((edu) => (
        <motion.div
          key={edu.id}
          variants={staggerItem}
          className="card"
          style={{ marginBottom: '12px', padding: '16px' }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <span style={{ fontSize: '28px' }}>{edu.icon}</span>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '2px' }}>
                {edu.degree} — {edu.field}
              </h3>
              <p style={{ fontSize: '12px', color: 'var(--accent-blue)', marginBottom: '2px' }}>
                {edu.institution}
              </p>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '12px' }}>
                {edu.period}
              </p>

              {/* Grade */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'baseline',
                gap: '6px',
                marginBottom: '12px',
                padding: '8px 14px',
                background: edu.gradeLabel === 'CGPA'
                  ? 'rgba(40, 200, 64, 0.08)'
                  : 'rgba(94, 155, 240, 0.08)',
                borderRadius: '8px',
                border: `0.5px solid ${edu.gradeLabel === 'CGPA' ? 'rgba(40, 200, 64, 0.2)' : 'rgba(94, 155, 240, 0.2)'}`,
              }}>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {edu.gradeLabel}
                </span>
                <span style={{
                  fontSize: '22px',
                  fontWeight: 700,
                  color: edu.gradeLabel === 'CGPA' ? 'var(--accent-green)' : 'var(--accent-blue)',
                  fontFamily: 'var(--font-display)',
                }}>
                  {edu.grade}
                </span>
              </div>

              {/* Key Areas */}
              <div>
                <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Key Areas
                </div>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {edu.areas.map((area) => (
                    <li key={area} style={{
                      fontSize: '11px',
                      color: 'var(--text-secondary)',
                      padding: '2px 0',
                      paddingLeft: '10px',
                      position: 'relative',
                    }}>
                      <span style={{ position: 'absolute', left: 0, color: 'var(--text-muted)' }}>•</span>
                      {area}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      ))}

      {/* Highlights bar */}
      <motion.div
        variants={staggerItem}
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '16px',
          padding: '12px',
          background: 'var(--bg-card)',
          borderRadius: 'var(--radius-card)',
          border: '0.5px solid var(--border-subtle)',
          flexWrap: 'wrap',
        }}
      >
        {['8.14 CGPA', 'Dual degree', 'Honours: Data Science', '2026 Graduate'].map((item) => (
          <span key={item} style={{
            fontSize: '11px',
            fontWeight: 600,
            color: 'var(--accent-blue)',
          }}>
            {item}
          </span>
        ))}
      </motion.div>
    </motion.div>
  );
}
