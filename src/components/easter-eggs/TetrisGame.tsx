'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 15;

// Tetrominoes definitions
const SHAPES = {
  I: [[1, 1, 1, 1]],
  J: [
    [1, 0, 0],
    [1, 1, 1],
  ],
  L: [
    [0, 0, 1],
    [1, 1, 1],
  ],
  O: [
    [1, 1],
    [1, 1],
  ],
  S: [
    [0, 1, 1],
    [1, 1, 0],
  ],
  T: [
    [0, 1, 0],
    [1, 1, 1],
  ],
  Z: [
    [1, 1, 0],
    [0, 1, 1],
  ],
};

const COLORS = {
  I: '#00f0f0', // Cyan
  J: '#0000f0', // Blue
  L: '#f0a000', // Orange
  O: '#f0f000', // Yellow
  S: '#00f000', // Green
  T: '#a000f0', // Purple
  Z: '#f00000', // Red
};

type PieceType = keyof typeof SHAPES;

export default function TetrisGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem('tetris-high-score');
    if (saved) setHighScore(parseInt(saved));
  }, []);

  const initGame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let grid = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
    let currentScore = 0;
    let running = true;
    let paused = false;

    setScore(0);
    setGameOver(false);
    setIsPaused(false);

    // Current falling piece state
    let currentPiece: {
      shape: number[][];
      color: string;
      x: number;
      y: number;
      type: PieceType;
    };

    function randomPiece() {
      const keys = Object.keys(SHAPES) as PieceType[];
      const type = keys[Math.floor(Math.random() * keys.length)];
      const shape = SHAPES[type];
      return {
        shape,
        color: COLORS[type],
        type,
        x: Math.floor((COLS - shape[0].length) / 2),
        y: 0,
      };
    }

    currentPiece = randomPiece();

    function checkCollision(px: number, py: number, pShape: number[][]) {
      for (let r = 0; r < pShape.length; r++) {
        for (let c = 0; c < pShape[r].length; c++) {
          if (pShape[r][c]) {
            const nextX = px + c;
            const nextY = py + r;

            if (nextX < 0 || nextX >= COLS || nextY >= ROWS) {
              return true;
            }
            if (nextY >= 0 && grid[nextY][nextX]) {
              return true;
            }
          }
        }
      }
      return false;
    }

    function mergePiece() {
      for (let r = 0; r < currentPiece.shape.length; r++) {
        for (let c = 0; c < currentPiece.shape[r].length; c++) {
          if (currentPiece.shape[r][c]) {
            const gridY = currentPiece.y + r;
            const gridX = currentPiece.x + c;
            if (gridY >= 0) {
              grid[gridY][gridX] = currentPiece.color;
            }
          }
        }
      }
    }

    function rotatePiece() {
      const shape = currentPiece.shape;
      const nRows = shape.length;
      const nCols = shape[0].length;
      const rotated = Array.from({ length: nCols }, () => Array(nRows).fill(0));

      for (let r = 0; r < nRows; r++) {
        for (let c = 0; c < nCols; c++) {
          rotated[c][nRows - 1 - r] = shape[r][c];
        }
      }

      if (!checkCollision(currentPiece.x, currentPiece.y, rotated)) {
        currentPiece.shape = rotated;
      }
    }

    function clearLines() {
      let linesCleared = 0;
      for (let r = ROWS - 1; r >= 0; r--) {
        if (grid[r].every((val) => val !== 0)) {
          grid.splice(r, 1);
          grid.unshift(Array(COLS).fill(0));
          linesCleared++;
          r++; // check same row index again
        }
      }

      if (linesCleared > 0) {
        const lineScores = [0, 100, 300, 500, 800];
        currentScore += lineScores[Math.min(linesCleared, 4)];
        setScore(currentScore);
        if (currentScore > highScore) {
          setHighScore(currentScore);
          sessionStorage.setItem('tetris-high-score', currentScore.toString());
        }
      }
    }

    function draw() {
      if (!ctx) return;

      // Clear Canvas
      ctx.fillStyle = '#0a0a1a';
      ctx.fillRect(0, 0, COLS * BLOCK_SIZE, ROWS * BLOCK_SIZE);

      // Draw Grid blocks
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          if (grid[r][c]) {
            ctx.fillStyle = grid[r][c];
            ctx.fillRect(c * BLOCK_SIZE + 1, r * BLOCK_SIZE + 1, BLOCK_SIZE - 2, BLOCK_SIZE - 2);
          } else {
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
            ctx.strokeRect(c * BLOCK_SIZE, r * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
          }
        }
      }

      // Draw Active Piece
      if (currentPiece) {
        ctx.fillStyle = currentPiece.color;
        for (let r = 0; r < currentPiece.shape.length; r++) {
          for (let c = 0; c < currentPiece.shape[r].length; c++) {
            if (currentPiece.shape[r][c]) {
              ctx.fillRect(
                (currentPiece.x + c) * BLOCK_SIZE + 1,
                (currentPiece.y + r) * BLOCK_SIZE + 1,
                BLOCK_SIZE - 2,
                BLOCK_SIZE - 2
              );
            }
          }
        }
      }
    }

    function drop() {
      if (paused || !running) return;

      if (!checkCollision(currentPiece.x, currentPiece.y + 1, currentPiece.shape)) {
        currentPiece.y++;
      } else {
        mergePiece();
        clearLines();
        currentPiece = randomPiece();

        // Check spawn collision for Game Over
        if (checkCollision(currentPiece.x, currentPiece.y, currentPiece.shape)) {
          running = false;
          setGameOver(true);
        }
      }
      draw();
    }

    // Controls
    function handleKey(e: KeyboardEvent) {
      if (paused || !running) return;
      if (e.key === 'ArrowLeft') {
        if (!checkCollision(currentPiece.x - 1, currentPiece.y, currentPiece.shape)) {
          currentPiece.x--;
          draw();
        }
      } else if (e.key === 'ArrowRight') {
        if (!checkCollision(currentPiece.x + 1, currentPiece.y, currentPiece.shape)) {
          currentPiece.x++;
          draw();
        }
      } else if (e.key === 'ArrowDown') {
        drop();
      } else if (e.key === 'ArrowUp') {
        rotatePiece();
        draw();
      } else if (e.key === ' ') {
        e.preventDefault();
        // Hard Drop
        while (!checkCollision(currentPiece.x, currentPiece.y + 1, currentPiece.shape)) {
          currentPiece.y++;
        }
        drop();
      }
    }

    window.addEventListener('keydown', handleKey);

    // Speed increases as score grows
    let dropInterval = setInterval(drop, 600);

    draw();

    return () => {
      running = false;
      clearInterval(dropInterval);
      window.removeEventListener('keydown', handleKey);
    };
  }, [highScore]);

  useEffect(() => {
    return initGame();
  }, [initGame]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '180px', fontSize: '12px' }}>
        <span style={{ color: '#FF7A00' }}>Score: {score}</span>
        <span style={{ color: 'var(--text-muted)' }}>Best: {highScore}</span>
      </div>

      <canvas
        ref={canvasRef}
        width={COLS * BLOCK_SIZE}
        height={ROWS * BLOCK_SIZE}
        style={{
          border: '2px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '8px',
          background: '#0a0a1a',
          maxWidth: '100%',
          maxHeight: '52vh',
          height: 'auto',
        }}
      />

      {gameOver && (
        <div style={{ textAlign: 'center', marginTop: '8px' }}>
          <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--accent-red)', marginBottom: '8px' }}>
            Game Over!
          </p>
          <button className="btn-primary" onClick={initGame} style={{ fontSize: '12px', padding: '6px 16px' }}>
            Play Again
          </button>
        </div>
      )}

      <p style={{ fontSize: '10px', color: 'var(--text-muted)', margin: 0 }}>
        ← → to Move · ↑ to Rotate · ↓ to Drop · Space for Hard Drop
      </p>
    </div>
  );
}
