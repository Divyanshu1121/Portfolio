'use client';

import { useAppStore, OSType } from '@/stores/appStore';

const osOptions: { id: OSType; label: string; icon: string; description: string; accent: string; preview: React.ReactNode }[] = [
  {
    id: 'macos',
    label: 'macOS',
    icon: '🍎',
    description: 'Floating dock, top menubar, traffic light window controls. The classic look.',
    accent: '#7B61FF',
    preview: (
      <div style={{ width: '100%', height: '80px', position: 'relative', background: '#1a1a2e', borderRadius: '8px', overflow: 'hidden' }}>
        {/* Top menubar */}
        <div style={{ height: '12px', background: 'rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.05)' }} />
        {/* Mini window */}
        <div style={{ position: 'absolute', top: '18px', left: '20px', width: '60px', height: '40px', background: 'rgba(255,255,255,0.06)', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ height: '8px', background: 'rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', padding: '0 3px', gap: '2px' }}>
            <div style={{ width: '3px', height: '3px', borderRadius: '50%', background: '#ff5f56' }} />
            <div style={{ width: '3px', height: '3px', borderRadius: '50%', background: '#ffbd2e' }} />
            <div style={{ width: '3px', height: '3px', borderRadius: '50%', background: '#27ca3f' }} />
          </div>
        </div>
        {/* Bottom dock */}
        <div style={{ position: 'absolute', bottom: '4px', left: '50%', transform: 'translateX(-50%)', width: '60px', height: '12px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px' }} />
      </div>
    ),
  },
  {
    id: 'windows',
    label: 'Windows 11',
    icon: '🪟',
    description: 'Bottom taskbar with Start menu, rectangular window controls on the right.',
    accent: '#0078D4',
    preview: (
      <div style={{ width: '100%', height: '80px', position: 'relative', background: '#202020', borderRadius: '8px', overflow: 'hidden' }}>
        {/* Mini window */}
        <div style={{ position: 'absolute', top: '10px', left: '20px', width: '60px', height: '40px', background: 'rgba(255,255,255,0.06)', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ height: '8px', background: 'rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '0 3px', gap: '3px' }}>
            <div style={{ width: '5px', height: '1px', background: 'rgba(255,255,255,0.4)' }} />
            <div style={{ width: '4px', height: '4px', border: '1px solid rgba(255,255,255,0.4)' }} />
            <div style={{ width: '5px', height: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '5px', color: 'rgba(255,255,255,0.4)' }}>✕</div>
          </div>
        </div>
        {/* Bottom taskbar */}
        <div style={{ position: 'absolute', bottom: '0', left: '0', right: '0', height: '14px', background: 'rgba(255,255,255,0.06)', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
          {[0, 1, 2, 3].map(i => <div key={i} style={{ width: '4px', height: '4px', borderRadius: '1px', background: 'rgba(255,255,255,0.25)' }} />)}
        </div>
      </div>
    ),
  },
  {
    id: 'ubuntu',
    label: 'Ubuntu',
    icon: '🐧',
    description: 'Left-side dock, GNOME top panel with Activities. Warm aubergine tones.',
    accent: '#E95420',
    preview: (
      <div style={{ width: '100%', height: '80px', position: 'relative', background: '#2C001E', borderRadius: '8px', overflow: 'hidden' }}>
        {/* Top panel */}
        <div style={{ height: '10px', background: '#2C2C2C' }} />
        {/* Left dock */}
        <div style={{ position: 'absolute', top: '10px', left: '0', width: '14px', bottom: '0', background: 'rgba(30,30,30,0.9)', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '4px', gap: '3px' }}>
          {[0, 1, 2].map(i => <div key={i} style={{ width: '8px', height: '8px', borderRadius: '2px', background: 'rgba(255,255,255,0.15)' }} />)}
        </div>
        {/* Mini window */}
        <div style={{ position: 'absolute', top: '16px', left: '24px', width: '60px', height: '40px', background: 'rgba(255,255,255,0.06)', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ height: '8px', background: 'rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '0 3px', gap: '2px' }}>
            <div style={{ width: '3px', height: '3px', borderRadius: '50%', background: '#F5C542' }} />
            <div style={{ width: '3px', height: '3px', borderRadius: '50%', background: '#4CAF50' }} />
            <div style={{ width: '3px', height: '3px', borderRadius: '50%', background: '#DF382C' }} />
          </div>
        </div>
      </div>
    ),
  },
];

export default function ThemeSettings() {
  const { activeOS, setActiveOS, activeWallpaper, setActiveWallpaper, wallpapers } = useAppStore();

  const wallpaperLabels: Record<string, string> = {
    'desktop-wallpaper': '🌌 DivyanshuOS Classic',
    'spiderman': '🕷️ Spiderman',
    'car': '🚗 Car',
    'black_hole': '🕳️ Black Hole',
    'earth': '🌍 Earth',
  };

  return (
    <div style={{
      padding: '20px',
      height: '100%',
      overflow: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      fontFamily: 'var(--font-body)',
    }}>
      {/* OS Persona Section */}
      <div>
        <h2 style={{
          fontSize: '14px',
          fontWeight: 600,
          color: 'var(--text-primary)',
          marginBottom: '12px',
          textTransform: 'uppercase',
          letterSpacing: '1px',
        }}>
          Operating System
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '12px',
        }}>
          {osOptions.map((os) => {
            const isActive = activeOS === os.id;
            return (
              <div
                key={os.id}
                onClick={() => setActiveOS(os.id)}
                style={{
                  background: isActive ? `rgba(255,255,255,0.08)` : 'rgba(255,255,255,0.03)',
                  border: isActive
                    ? `2px solid ${os.accent}`
                    : '2px solid rgba(255,255,255,0.06)',
                  borderRadius: '12px',
                  padding: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Active badge */}
                {isActive && (
                  <div style={{
                    position: 'absolute',
                    top: '6px',
                    right: '6px',
                    background: os.accent,
                    color: 'white',
                    fontSize: '8px',
                    fontWeight: 700,
                    padding: '2px 6px',
                    borderRadius: '4px',
                  }}>
                    ACTIVE
                  </div>
                )}

                {/* Preview */}
                {os.preview}

                {/* Label */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '16px' }}>{os.icon}</span>
                  <span style={{
                    fontSize: '13px',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                  }}>{os.label}</span>
                </div>

                {/* Description */}
                <p style={{
                  fontSize: '10px',
                  color: 'var(--text-muted)',
                  margin: 0,
                  lineHeight: '1.4',
                }}>
                  {os.description}
                </p>

                {/* Accent bar */}
                <div style={{
                  height: '3px',
                  borderRadius: '2px',
                  background: isActive
                    ? `linear-gradient(90deg, ${os.accent}, transparent)`
                    : 'rgba(255,255,255,0.05)',
                  transition: 'background 0.3s ease',
                }} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }} />

      {/* Wallpaper Section */}
      <div>
        <h2 style={{
          fontSize: '14px',
          fontWeight: 600,
          color: 'var(--text-primary)',
          marginBottom: '12px',
          textTransform: 'uppercase',
          letterSpacing: '1px',
        }}>
          Wallpaper
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '10px',
        }}>
          {wallpapers.map((wp) => {
            const isActive = activeWallpaper === wp;
            return (
              <div
                key={wp}
                onClick={() => setActiveWallpaper(wp)}
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: isActive
                    ? '2px solid var(--accent-blue)'
                    : '2px solid rgba(255,255,255,0.06)',
                  borderRadius: '10px',
                  padding: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  alignItems: 'center',
                }}
              >
                <div style={{
                  width: '100%',
                  height: '50px',
                  borderRadius: '6px',
                  backgroundImage: `url(/${wp === 'desktop-wallpaper' ? 'desktop_wallpaper' : wp}.webp)`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }} />
                <span style={{
                  fontSize: '10px',
                  color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
                  fontWeight: isActive ? 600 : 400,
                }}>
                  {wallpaperLabels[wp] || wp}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
