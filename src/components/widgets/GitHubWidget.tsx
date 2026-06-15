'use client';

import { useState, useEffect } from 'react';
import { Rnd } from 'react-rnd';
import { motion } from 'framer-motion';

interface GitHubStats {
  followers: number;
  public_repos: number;
  avatar_url: string;
  name: string;
  login: string;
}

export default function GitHubWidget() {
  const [stats, setStats] = useState<GitHubStats>({
    followers: 12,
    public_repos: 18,
    avatar_url: 'https://avatars.githubusercontent.com/u/98129759?v=4',
    name: 'Divyanshu M. Patel',
    login: 'Divyanshu1121',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch('https://api.github.com/users/Divyanshu1121');
        if (res.ok) {
          const data = await res.json();
          setStats({
            followers: data.followers || 12,
            public_repos: data.public_repos || 18,
            avatar_url: data.avatar_url || stats.avatar_url,
            name: data.name || 'Divyanshu M. Patel',
            login: data.login || 'Divyanshu1121',
          });
        }
      } catch (e) {
        console.error('Failed to fetch github stats', e);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  return (
    <Rnd
      default={{
        x: typeof window !== 'undefined' ? window.innerWidth - 280 : 1100,
        y: 80,
        width: 240,
        height: 150,
      }}
      minWidth={200}
      minHeight={130}
      bounds="parent"
      dragHandleClassName="widget-drag-handle"
      style={{ zIndex: 10 }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{
          height: '100%',
          width: '100%',
          borderRadius: '16px',
          background: 'rgba(255, 255, 255, 0.03)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          fontFamily: 'var(--font-body)',
        }}
      >
        {/* Header/Drag area */}
        <div
          className="widget-drag-handle"
          style={{
            padding: '8px 12px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'move',
            fontSize: '11px',
            color: 'var(--text-secondary)',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}
        >
          <span>🐙 GitHub Widget</span>
          <span style={{ fontSize: '9px', opacity: 0.6 }}>● Live</span>
        </div>

        {/* Content */}
        <div style={{ flex: 1, padding: '12px', display: 'flex', gap: '12px', alignItems: 'center' }}>
          <img
            src={stats.avatar_url}
            alt="GitHub Avatar"
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              border: '2px solid rgba(255, 255, 255, 0.1)',
            }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <span style={{ fontWeight: 600, fontSize: '13px' }}>{stats.name}</span>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>@{stats.login}</span>
          </div>
        </div>

        {/* Footer Stats Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            background: 'rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
            fontSize: '11px',
          }}
        >
          <div style={{ padding: '8px', borderRight: '1px solid rgba(255, 255, 255, 0.05)' }}>
            <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--accent-blue)' }}>
              {stats.public_repos}
            </div>
            <div style={{ fontSize: '9px', color: 'var(--text-muted)' }}>Repositories</div>
          </div>
          <div style={{ padding: '8px' }}>
            <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--accent-purple)' }}>
              {stats.followers}
            </div>
            <div style={{ fontSize: '9px', color: 'var(--text-muted)' }}>Followers</div>
          </div>
        </div>
      </motion.div>
    </Rnd>
  );
}
