'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

const WIDTH = 340;
const HEIGHT = 220;
const PADDLE_WIDTH = 8;
const PADDLE_HEIGHT = 44;
const BALL_SIZE = 6;
const AI_SPEED = 2.5;

export default function PongGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [playerScore, setPlayerScore] = useState(0);
  const [aiScore, setAiScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState<'player' | 'ai' | null>(null);

  const initGame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let pY = (HEIGHT - PADDLE_HEIGHT) / 2;
    let aiY = (HEIGHT - PADDLE_HEIGHT) / 2;
    let bX = WIDTH / 2;
    let bY = HEIGHT / 2;
    let bSpeedX = 3;
    let bSpeedY = 1.5;

    let currentPScore = 0;
    let currentAiScore = 0;
    let running = true;
    let keys: Record<string, boolean> = {};

    setPlayerScore(0);
    setAiScore(0);
    setGameOver(false);
    setWinner(null);

    function resetBall(direction: number) {
      bX = WIDTH / 2;
      bY = HEIGHT / 2;
      bSpeedX = direction * 3;
      bSpeedY = (Math.random() * 2 - 1) * 2;
    }

    function update() {
      if (!running) return;

      // Player Movement (Keyboard)
      if (keys['ArrowUp'] || keys['w']) {
        pY = Math.max(0, pY - 4);
      }
      if (keys['ArrowDown'] || keys['s']) {
        pY = Math.min(HEIGHT - PADDLE_HEIGHT, pY + 4);
      }

      // Ball Movement
      bX += bSpeedX;
      bY += bSpeedY;

      // Ball Wall Collisions (Top/Bottom)
      if (bY <= 0 || bY >= HEIGHT - BALL_SIZE) {
        bSpeedY = -bSpeedY;
      }

      // AI Paddle Movement
      const aiCenter = aiY + PADDLE_HEIGHT / 2;
      if (aiCenter < bY - 10) {
        aiY = Math.min(HEIGHT - PADDLE_HEIGHT, aiY + AI_SPEED);
      } else if (aiCenter > bY + 10) {
        aiY = Math.max(0, aiY - AI_SPEED);
      }

      // Ball Paddle Collisions (Player)
      if (bX <= PADDLE_WIDTH) {
        if (bY + BALL_SIZE >= pY && bY <= pY + PADDLE_HEIGHT) {
          bSpeedX = -bSpeedX;
          // Add spin based on where the ball hit the paddle
          const deltaY = bY - (pY + PADDLE_HEIGHT / 2);
          bSpeedY = deltaY * 0.12;
          bX = PADDLE_WIDTH; // resolve overlap
        } else if (bX <= 0) {
          // AI scores
          currentAiScore++;
          setAiScore(currentAiScore);
          if (currentAiScore >= 5) {
            running = false;
            setGameOver(true);
            setWinner('ai');
          } else {
            resetBall(1);
          }
        }
      }

      // Ball Paddle Collisions (AI)
      if (bX >= WIDTH - PADDLE_WIDTH - BALL_SIZE) {
        if (bY + BALL_SIZE >= aiY && bY <= aiY + PADDLE_HEIGHT) {
          bSpeedX = -bSpeedX;
          const deltaY = bY - (aiY + PADDLE_HEIGHT / 2);
          bSpeedY = deltaY * 0.12;
          bX = WIDTH - PADDLE_WIDTH - BALL_SIZE; // resolve overlap
        } else if (bX >= WIDTH) {
          // Player scores
          currentPScore++;
          setPlayerScore(currentPScore);
          if (currentPScore >= 5) {
            running = false;
            setGameOver(true);
            setWinner('player');
          } else {
            resetBall(-1);
          }
        }
      }
    }

    function draw() {
      if (!ctx) return;

      // BG
      ctx.fillStyle = '#0a0a1a';
      ctx.fillRect(0, 0, WIDTH, HEIGHT);

      // Center Divider line
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(WIDTH / 2, 0);
      ctx.lineTo(WIDTH / 2, HEIGHT);
      ctx.stroke();
      ctx.setLineDash([]); // reset

      // Player Paddle
      ctx.fillStyle = '#5E9BF0';
      ctx.fillRect(2, pY, PADDLE_WIDTH, PADDLE_HEIGHT);

      // AI Paddle
      ctx.fillStyle = '#FF7A00';
      ctx.fillRect(WIDTH - PADDLE_WIDTH - 2, aiY, PADDLE_WIDTH, PADDLE_HEIGHT);

      // Ball
      ctx.fillStyle = '#fff';
      ctx.fillRect(bX, bY, BALL_SIZE, BALL_SIZE);
    }

    function gameLoop() {
      if (!running) return;
      update();
      draw();
      requestAnimationFrame(gameLoop);
    }

    // Keyboard controls handlers
    function handleKeyDown(e: KeyboardEvent) {
      keys[e.key] = true;
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') e.preventDefault();
    }
    function handleKeyUp(e: KeyboardEvent) {
      keys[e.key] = false;
    }

    // Mouse control handler (move paddle with cursor inside canvas)
    function handleMouseMove(e: MouseEvent) {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const mouseY = e.clientY - rect.top;
      pY = Math.max(0, Math.min(HEIGHT - PADDLE_HEIGHT, mouseY - PADDLE_HEIGHT / 2));
    }

    // Touch control handler (drag paddle on mobile)
    function handleTouchMove(e: TouchEvent) {
      if (!canvas) return;
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        const touchY = e.touches[0].clientY - rect.top;
        pY = Math.max(0, Math.min(HEIGHT - PADDLE_HEIGHT, touchY - PADDLE_HEIGHT / 2));
        e.preventDefault();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });

    gameLoop();

    return () => {
      running = false;
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  useEffect(() => {
    return initGame();
  }, [initGame]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '220px', fontSize: '12px' }}>
        <span style={{ color: '#5E9BF0' }}>You: {playerScore}</span>
        <span style={{ color: '#FF7A00' }}>AI: {aiScore}</span>
      </div>

      <canvas
        ref={canvasRef}
        width={WIDTH}
        height={HEIGHT}
        style={{
          border: '2px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '8px',
          background: '#0a0a1a',
          maxWidth: '100%',
          maxHeight: '50vh',
          height: 'auto',
          cursor: 'none',
        }}
      />

      {gameOver && (
        <div style={{ textAlign: 'center', marginTop: '6px' }}>
          <p style={{
            fontSize: '13px',
            fontWeight: 600,
            color: winner === 'player' ? '#28C840' : 'var(--accent-red)',
            marginBottom: '8px'
          }}>
            {winner === 'player' ? '🎉 You Won!' : '😵 Game Over! AI Won.'}
          </p>
          <button className="btn-primary" onClick={initGame} style={{ fontSize: '11px', padding: '5px 14px' }}>
            Play Again
          </button>
        </div>
      )}

      <p style={{ fontSize: '10px', color: 'var(--text-muted)', margin: 0, textAlign: 'center' }}>
        Move Mouse over Canvas or use W / S (Arrow keys) to move paddle
      </p>
    </div>
  );
}
