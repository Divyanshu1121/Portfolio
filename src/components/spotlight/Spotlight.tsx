'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { spotlightOverlay, spotlightModal } from '@/utils/animations';
import { useWindowStore } from '@/stores/windowStore';
import { projects, skillCategories } from '@/data/portfolio';

interface SpotlightProps {
  onClose: () => void;
}

interface SearchResult {
  id: string;
  label: string;
  icon: string;
  category: string;
  action: () => void;
}

export default function Spotlight({ onClose }: SpotlightProps) {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const { openWindow } = useWindowStore();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const allItems = useMemo((): SearchResult[] => {
    const items: SearchResult[] = [];

    // Windows
    const windowItems = [
      { id: 'about', label: 'About Me', icon: '👤' },
      { id: 'projects', label: 'Projects', icon: '📁' },
      { id: 'experience', label: 'Experience', icon: '💼' },
      { id: 'skills', label: 'Skills', icon: '⚡' },
      { id: 'education', label: 'Education', icon: '🎓' },
      { id: 'certifications', label: 'Certifications', icon: '🏅' },
      { id: 'resume', label: 'Resume', icon: '📄' },
      { id: 'contact', label: 'Contact', icon: '✉️' },
      { id: 'ai', label: 'AI Assistant', icon: '🤖' },
      { id: 'terminal', label: 'Terminal', icon: '⌨️' },
    ];
    windowItems.forEach((w) => {
      items.push({
        id: `win-${w.id}`,
        label: w.label,
        icon: w.icon,
        category: 'QUICK ACTIONS',
        action: () => { openWindow(w.id); onClose(); },
      });
    });

    // Projects
    projects.forEach((p) => {
      items.push({
        id: `proj-${p.id}`,
        label: p.title,
        icon: '📁',
        category: 'PROJECTS',
        action: () => { openWindow('projects'); onClose(); },
      });
    });

    // Skills
    skillCategories.forEach((cat) => {
      cat.skills.forEach((s) => {
        items.push({
          id: `skill-${s.name}`,
          label: s.name,
          icon: '⚡',
          category: 'SKILLS',
          action: () => { openWindow('skills'); onClose(); },
        });
      });
    });

    // Special actions
    items.push({
      id: 'download-resume',
      label: 'Download Resume',
      icon: '⬇️',
      category: 'QUICK ACTIONS',
      action: () => {
        const link = document.createElement('a');
        link.href = '/divyanshu-patel-resume.pdf';
        link.download = 'Divyanshu-Patel-Resume.pdf';
        link.click();
        onClose();
      },
    });

    return items;
  }, [openWindow, onClose]);

  const filtered = query.trim()
    ? allItems.filter((item) =>
        item.label.toLowerCase().includes(query.toLowerCase())
      )
    : allItems.filter((_, i) => i < 12);

  const grouped = filtered.reduce<Record<string, SearchResult[]>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  const flatResults = Object.values(grouped).flat();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, flatResults.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && flatResults[activeIndex]) {
      flatResults[activeIndex].action();
    }
  };

  return (
    <motion.div
      variants={spotlightOverlay}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="spotlight-overlay"
      onClick={onClose}
    >
      <motion.div
        variants={spotlightModal}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="spotlight-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', alignItems: 'center', padding: '0 16px' }}>
          <span style={{ fontSize: '16px', color: 'var(--text-muted)', marginRight: '8px' }}>🔍</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => { setQuery(e.target.value); setActiveIndex(0); }}
            onKeyDown={handleKeyDown}
            className="spotlight-input"
            placeholder="Search portfolio..."
            style={{ paddingLeft: '0' }}
          />
        </div>

        <div className="spotlight-results">
          {Object.entries(grouped).map(([category, items]) => (
            <div key={category}>
              <div className="spotlight-category">{category}</div>
              {items.map((item) => {
                const idx = flatResults.indexOf(item);
                return (
                  <div
                    key={item.id}
                    className={`spotlight-result-item ${idx === activeIndex ? 'active' : ''}`}
                    onClick={item.action}
                    onMouseEnter={() => setActiveIndex(idx)}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                );
              })}
            </div>
          ))}
          {flatResults.length === 0 && (
            <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px' }}>
              No results found
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
