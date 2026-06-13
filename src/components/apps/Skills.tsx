'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { skillCategories, toolGroups } from '@/data/portfolio';
import { staggerContainer, staggerItem } from '@/utils/animations';

const tabs = [...skillCategories.map((c) => ({ id: c.id, label: c.label })), { id: 'tools', label: 'Tools' }];

export default function Skills() {
  const [activeTab, setActiveTab] = useState('aiml');

  const activeCategory = skillCategories.find((c) => c.id === activeTab);

  return (
    <div>
      {/* Tab bar */}
      <div
        style={{
          display: 'flex',
          gap: '2px',
          marginBottom: '16px',
          borderBottom: '0.5px solid var(--border-subtle)',
          paddingBottom: '8px',
        }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: activeTab === tab.id ? 600 : 400,
              color: activeTab === tab.id ? 'var(--accent-blue)' : 'var(--text-secondary)',
              background: activeTab === tab.id ? 'rgba(94, 155, 240, 0.1)' : 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'var(--font-body)',
              transition: 'all 0.15s ease',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Skill bars */}
      {activeCategory && (
        <motion.div
          key={activeTab}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
        >
          {activeCategory.skills.map((skill) => (
            <motion.div key={skill.name} variants={staggerItem}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{skill.name}</span>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{skill.level}%</span>
              </div>
              <div className="progress-track">
                <motion.div
                  className="progress-fill"
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 1.2, ease: [0.34, 1.56, 0.64, 1], delay: 0.1 }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Tools tab */}
      {activeTab === 'tools' && (
        <motion.div
          key="tools"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}
        >
          {toolGroups.map((group) => (
            <motion.div key={group.label} variants={staggerItem}>
              <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                {group.label}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {group.items.map((item) => (
                  <span key={item} className="pill">{item}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
