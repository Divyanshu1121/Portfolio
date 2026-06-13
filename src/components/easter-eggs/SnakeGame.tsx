'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

export default function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    const saved = sessionStorage.getItem('snake-high-score');
    if (saved) setHighScore(parseInt(saved));
  }, []);

  const startGame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const gridSize = 15;
    const tileCount = Math.floor(200 / gridSize);

    let snake = [{ x: 5, y: 5 }];
    let food = { x: 10, y: 10 };
    let dx = 1, dy = 0;
    let currentScore = 0;
    let running = true;

    setGameOver(false);
    setScore(0);

    function placeFood() {
      food = {
        x: Math.floor(Math.random() * tileCount),
        y: Math.floor(Math.random() * tileCount),
      };
    }

    function draw() {
      if (!ctx || !running) return;

      // Clear
      ctx.fillStyle = '#0a0a1a';
      ctx.fillRect(0, 0, 200, 200);

      // Draw grid
      ctx.strokeStyle = 'rgba(255,255,255,0.03)';
      for (let i = 0; i <= tileCount; i++) {
        ctx.beginPath();
        ctx.moveTo(i * gridSize, 0);
        ctx.lineTo(i * gridSize, 200);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, i * gridSize);
        ctx.lineTo(200, i * gridSize);
        ctx.stroke();
      }

      // Draw food
      ctx.fillStyle = '#A78BF5';
      ctx.beginPath();
      ctx.arc(food.x * gridSize + gridSize / 2, food.y * gridSize + gridSize / 2, gridSize / 2 - 1, 0, Math.PI * 2);
      ctx.fill();

      // Draw snake
      snake.forEach((segment, i) => {
        ctx.fillStyle = i === 0 ? '#5E9BF0' : `rgba(94, 155, 240, ${1 - i * 0.05})`;
        ctx.fillRect(
          segment.x * gridSize + 1,
          segment.y * gridSize + 1,
          gridSize - 2,
          gridSize - 2
        );
      });
    }

    function update() {
      let head = { x: snake[0].x + dx, y: snake[0].y + dy };

      // Wall wrap-around
      if (head.x < 0) {
        head.x = tileCount - 1;
      } else if (head.x >= tileCount) {
        head.x = 0;
      }
      if (head.y < 0) {
        head.y = tileCount - 1;
      } else if (head.y >= tileCount) {
        head.y = 0;
      }

      // Self collision
      if (snake.some((s) => s.x === head.x && s.y === head.y)) {
        running = false;
        setGameOver(true);
        if (currentScore > highScore) {
          setHighScore(currentScore);
          sessionStorage.setItem('snake-high-score', currentScore.toString());
        }
        return;
      }

      snake.unshift(head);

      // Eat food
      if (head.x === food.x && head.y === food.y) {
        currentScore += 10;
        setScore(currentScore);
        placeFood();
      } else {
        snake.pop();
      }
    }

    function gameLoop() {
      if (!running) return;
      update();
      draw();
      setTimeout(() => requestAnimationFrame(gameLoop), 120);
    }

    function handleKey(e: KeyboardEvent) {
      switch (e.key) {
        case 'ArrowUp': if (dy !== 1) { dx = 0; dy = -1; } break;
        case 'ArrowDown': if (dy !== -1) { dx = 0; dy = 1; } break;
        case 'ArrowLeft': if (dx !== 1) { dx = -1; dy = 0; } break;
        case 'ArrowRight': if (dx !== -1) { dx = 1; dy = 0; } break;
      }
    }

    window.addEventListener('keydown', handleKey);
    gameLoop();

    return () => {
      running = false;
      window.removeEventListener('keydown', handleKey);
    };
  }, [highScore]);

  useEffect(() => {
    startGame();
  }, [startGame]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '200px', fontSize: '12px' }}>
        <span style={{ color: 'var(--accent-blue)' }}>Score: {score}</span>
        <span style={{ color: 'var(--text-muted)' }}>Best: {highScore}</span>
      </div>

      <canvas
        ref={canvasRef}
        width={200}
        height={200}
        style={{
          border: '1px solid var(--border-subtle)',
          borderRadius: '8px',
        }}
      />

      {gameOver && (
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--accent-red)', marginBottom: '8px' }}>
            Game Over!
          </p>
          <button className="btn-primary" onClick={startGame} style={{ fontSize: '12px' }}>
            Play Again
          </button>
        </div>
      )}

      <p style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
        Use arrow keys to move
      </p>
    </div>
  );
}
