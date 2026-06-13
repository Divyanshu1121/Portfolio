'use client';

import { useState } from 'react';

export default function Google() {
  const [url, setUrl] = useState('http://aryashah22.com/portfolio');

  return (
    <div style={{
      height: 'calc(100% + 40px)',
      width: 'calc(100% + 40px)',
      margin: '-20px',
      background: '#202124',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      borderRadius: '0 0 var(--radius-window) var(--radius-window)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    }}>
      {/* Browser Toolbar (Chrome Style) */}
      <div style={{
        padding: '8px 12px',
        background: '#2f3033',
        borderBottom: '1px solid #1f2022',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        color: '#fff',
      }}>
        {/* Navigation arrows */}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', opacity: 0.8 }}>
          <button style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', opacity: 0.5, display: 'flex', alignItems: 'center' }}>
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </button>
          <button style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', opacity: 0.5, display: 'flex', alignItems: 'center' }}>
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
          <button style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', opacity: 0.8, display: 'flex', alignItems: 'center', marginLeft: '4px' }}>
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M23 4v6h-6"></path>
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
            </svg>
          </button>
        </div>

        {/* Address Bar */}
        <div style={{
          flex: 1,
          background: '#202124',
          borderRadius: '16px',
          padding: '4px 14px',
          display: 'flex',
          alignItems: 'center',
          fontSize: '12px',
          color: '#e8eaed',
          border: '1px solid rgba(255, 255, 255, 0.05)',
        }}>
          <span style={{ marginRight: '6px', opacity: 0.5 }}>🔒</span>
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'inherit',
              fontSize: 'inherit',
            }}
            readOnly
          />
        </div>

        {/* Right side extensions */}
        <div style={{ display: 'flex', gap: '10px', fontSize: '13px', opacity: 0.8 }}>
          <span>👤</span>
          <span>⋮</span>
        </div>
      </div>

      {/* Browser Webpage Content (Iframe hosting the built Vite portfolio) */}
      <div style={{ flex: 1, background: '#fff', position: 'relative' }}>
        <iframe
          src="/design/index.html"
          title="Google Browser Frame"
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            background: '#000',
          }}
        />
      </div>
    </div>
  );
}
