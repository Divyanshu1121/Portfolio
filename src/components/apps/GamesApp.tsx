'use client';

import { useWindowStore } from '@/stores/windowStore';

interface GameItem {
  id: string;
  title: string;
  icon: string;
  desc: string;
  badge: string;
  disabled?: boolean;
}

export default function GamesApp() {
  const { openWindow, closeWindow } = useWindowStore();

  const gamesList: GameItem[] = [
    {
      id: 'snake',
      title: 'Snake Game',
      icon: '🐍',
      desc: 'Classic retro snake game. Grow your snake, eat food, and try to wrap around the walls without hitting yourself!',
      badge: 'Playable',
    },
    {
      id: 'tetris',
      title: 'Tetris Game',
      icon: '🧱',
      desc: 'Stack blocks and clear lines in this classic arcade puzzle game.',
      badge: 'Playable',
    },
    {
      id: 'minesweeper',
      title: 'Minesweeper',
      icon: '💣',
      desc: 'Clear the board without triggering any hidden mines.',
      badge: 'Playable',
    },
    {
      id: 'pong',
      title: 'Pong Game',
      icon: '🏓',
      desc: 'Classic retro table tennis game. Control your paddle, dodge AI, and bounce the ball to score points!',
      badge: 'Playable',
    },
    {
      id: 'game2048',
      title: '2048 Game',
      icon: '🧩',
      desc: 'Slide numbered tiles on a 4x4 grid. When two tiles with the same number touch, they merge into one. Try to reach 2048!',
      badge: 'Playable',
    },
    {
      id: 'tictactoe',
      title: 'Tic-Tac-Toe',
      icon: '❌',
      desc: 'Classic noughts and crosses. Test your strategy against an unbeatable Minimax AI, or play local 2-player mode.',
      badge: 'Playable',
    },
  ];

  const handlePlay = (gameId: string) => {
    openWindow(gameId);
    closeWindow('games');
  };

  return (
    <div style={{
      padding: '16px',
      height: '100%',
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      fontFamily: 'var(--font-body)',
      background: 'linear-gradient(180deg, #0e0e1e 0%, #080812 100%)',
      color: '#fff',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '20px' }}>🕹️</span>
        <h2 style={{ fontSize: '18px', fontWeight: 600, margin: 0, color: '#FF7A00' }}>
          Games Lounge
        </h2>
      </div>
      <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>
        Launch a game directly from this library.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px' }}>
        {gamesList.map((game) => (
          <div
            key={game.id}
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '12px',
              padding: '14px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              position: 'relative',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '24px' }}>{game.icon}</span>
                <span style={{ fontWeight: 600, fontSize: '14px', color: '#fff' }}>{game.title}</span>
              </div>
              <span style={{
                fontSize: '10px',
                padding: '2px 8px',
                borderRadius: '12px',
                background: game.disabled ? 'rgba(255,255,255,0.08)' : 'rgba(255,122,0,0.15)',
                color: game.disabled ? '#888' : '#FF7A00',
                border: game.disabled ? 'none' : '1px solid rgba(255,122,0,0.3)',
              }}>
                {game.badge}
              </span>
            </div>
            <p style={{ fontSize: '11px', color: '#b0b3b8', margin: 0, lineHeight: '1.4' }}>
              {game.desc}
            </p>
            {!game.disabled && (
              <button
                onClick={() => handlePlay(game.id)}
                style={{
                  background: 'linear-gradient(135deg, #FF5252, #FF7A00)',
                  border: 'none',
                  borderRadius: '6px',
                  color: 'white',
                  padding: '8px 16px',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  marginTop: '4px',
                  alignSelf: 'flex-start',
                }}
              >
                Play Now
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
