'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { projects } from '@/data/portfolio';
import { staggerContainer, staggerItem } from '@/utils/animations';

const categories = ['All Projects', 'AI/ML', 'Full Stack', 'ERP Systems', 'Computer Vision'];

const badgeClass = (badge: string) => {
  const b = badge.toUpperCase();
  if (b.includes('AI') || b.includes('ML') || b.includes('ACCURACY')) return 'badge badge-ml';
  if (b.includes('LIVE')) return 'badge badge-live';
  if (b.includes('AUTOMATION') || b.includes('DATA')) return 'badge badge-ai';
  return 'badge badge-default';
};

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('All Projects');
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const filtered = activeCategory === 'All Projects'
    ? projects
    : projects.filter((p) => p.category.includes(activeCategory));

  return (
    <div style={{ display: 'flex', height: '100%', gap: '0' }}>
      {/* Sidebar */}
      <div
        style={{
          width: '140px',
          borderRight: '0.5px solid var(--border-subtle)',
          padding: '8px',
          flexShrink: 0,
          overflowY: 'auto',
        }}
      >
        {categories.map((cat) => (
          <div
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: '7px 10px',
              borderRadius: '6px',
              fontSize: '12px',
              cursor: 'pointer',
              color: activeCategory === cat ? 'var(--accent-blue)' : 'var(--text-secondary)',
              background: activeCategory === cat ? 'rgba(94, 155, 240, 0.1)' : 'transparent',
              marginBottom: '2px',
              transition: 'all 0.15s ease',
              fontWeight: activeCategory === cat ? 600 : 400,
            }}
          >
            📁 {cat}
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        style={{
          flex: 1,
          padding: '12px',
          overflowY: 'auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '10px',
          alignContent: 'start',
        }}
      >
        {filtered.map((project) => (
          <motion.div
            key={project.id}
            variants={staggerItem}
            className="card"
            style={{ cursor: 'pointer' }}
            onClick={() => setExpandedId(expandedId === project.id ? null : project.id)}
          >
            {/* Badges */}
            <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginBottom: '8px' }}>
              {project.badges.map((badge) => (
                <span key={badge} className={badgeClass(badge)}>{badge}</span>
              ))}
            </div>

            {/* Title */}
            <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>
              {project.title}
            </h3>

            {/* Description */}
            <p style={{ fontSize: '11px', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '10px' }}>
              {project.shortDescription}
            </p>

            {/* Expanded detail */}
            {expandedId === project.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.25 }}
                style={{ marginBottom: '10px' }}
              >
                {project.imageUrl && (
                  <div style={{
                    width: '100%',
                    height: '160px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    marginBottom: '12px',
                    border: '0.5px solid var(--border-subtle)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                  }}>
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                )}
                <p style={{ fontSize: '11px', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '8px' }}>
                  {project.fullDescription}
                </p>
                {project.highlights && (
                  <div style={{ marginBottom: '10px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>
                      Key Deliverables:
                    </div>
                    <ul style={{ paddingLeft: '14px', margin: 0, fontSize: '11px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                      {project.highlights.map((high, idx) => (
                        <li key={idx} style={{ marginBottom: '2px' }}>{high}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {project.architecture && (
                  <div style={{
                    padding: '8px 10px',
                    background: 'rgba(94, 155, 240, 0.06)',
                    borderRadius: '6px',
                    fontSize: '10px',
                    color: 'var(--accent-blue)',
                    fontFamily: 'var(--font-mono)',
                    marginBottom: '8px',
                    lineHeight: 1.6,
                    wordBreak: 'break-word',
                  }}>
                    🏗️ {project.architecture}
                  </div>
                )}
                {project.metrics && (
                  <div style={{ fontSize: '11px', color: 'var(--accent-green)', marginBottom: '6px' }}>
                    📊 {project.metrics}
                  </div>
                )}
              </motion.div>
            )}

            {/* Tech stack */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '10px' }}>
              {project.stack.slice(0, expandedId === project.id ? undefined : 4).map((tech) => (
                <span key={tech} style={{
                  fontSize: '9px',
                  padding: '2px 8px',
                  background: 'rgba(255,255,255,0.04)',
                  borderRadius: '100px',
                  color: 'var(--text-muted)',
                  border: '0.5px solid var(--border-subtle)',
                }}>
                  {tech}
                </span>
              ))}
              {expandedId !== project.id && project.stack.length > 4 && (
                <span style={{ fontSize: '9px', color: 'var(--text-muted)', padding: '2px 4px' }}>
                  +{project.stack.length - 4}
                </span>
              )}
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '6px' }}>
              <button
                className="btn-ghost"
                style={{ fontSize: '10px', padding: '4px 10px' }}
                onClick={(e) => { e.stopPropagation(); setExpandedId(expandedId === project.id ? null : project.id); }}
              >
                {expandedId === project.id ? 'Collapse' : 'View Details'}
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
