'use client';

import { useState, useEffect, useCallback } from 'react';

type Board = number[][];

export default function Game2048() {
  const [board, setBoard] = useState<Board>([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);
  const [keepPlaying, setKeepPlaying] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem('2048-high-score');
    if (saved) setHighScore(parseInt(saved));
  }, []);

  const addRandomTile = useCallback((currentBoard: Board) => {
    const emptyCells: { r: number; c: number }[] = [];
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        if (currentBoard[r][c] === 0) {
          emptyCells.push({ r, c });
        }
      }
    }

    if (emptyCells.length > 0) {
      const { r, c } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      currentBoard[r][c] = Math.random() < 0.9 ? 2 : 4;
    }
  }, []);

  const initGame = useCallback(() => {
    const initialBoard = Array.from({ length: 4 }, () => Array(4).fill(0));
    addRandomTile(initialBoard);
    addRandomTile(initialBoard);
    setBoard(initialBoard);
    setScore(0);
    setGameOver(false);
    setWin(false);
    setKeepPlaying(false);
  }, [addRandomTile]);

  useEffect(() => {
    initGame();
  }, [initGame]);

  // Transpose board
  const transpose = (b: Board) => {
    return b[0].map((_, colIndex) => b.map(row => row[colIndex]));
  };

  // Reverse rows
  const reverse = (b: Board) => {
    return b.map(row => [...row].reverse());
  };

  // Slide and merge left
  const slideLeft = useCallback((currentBoard: Board) => {
    let currentScore = score;
    let moved = false;

    const newBoard = currentBoard.map(row => {
      // 1. Remove zeros
      let filtered = row.filter(val => val !== 0);

      // 2. Merge adjacent identical values
      for (let i = 0; i < filtered.length - 1; i++) {
        if (filtered[i] === filtered[i + 1]) {
          filtered[i] *= 2;
          currentScore += filtered[i];
          filtered[i + 1] = 0;
          moved = true;
        }
      }

      // 3. Remove zeros again
      filtered = filtered.filter(val => val !== 0);

      // 4. Pad with zeros
      while (filtered.length < 4) {
        filtered.push(0);
      }

      // Check if row has changed
      if (row.join(',') !== filtered.join(',')) {
        moved = true;
      }

      return filtered;
    });

    return { board: newBoard, score: currentScore, moved };
  }, [score]);

  const checkGameOver = (currentBoard: Board) => {
    // 1. Check for empty cells
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        if (currentBoard[r][c] === 0) return false;
      }
    }
    // 2. Check for mergeable adjacent cells
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        const val = currentBoard[r][c];
        if (r < 3 && val === currentBoard[r + 1][c]) return false;
        if (c < 3 && val === currentBoard[r][c + 1]) return false;
      }
    }
    return true;
  };

  const move = useCallback((direction: 'left' | 'right' | 'up' | 'down') => {
    if (gameOver) return;

    let tempBoard = board.map(row => [...row]);
    let result: { board: Board; score: number; moved: boolean };

    if (direction === 'left') {
      result = slideLeft(tempBoard);
    } else if (direction === 'right') {
      tempBoard = reverse(tempBoard);
      result = slideLeft(tempBoard);
      result.board = reverse(result.board);
    } else if (direction === 'up') {
      tempBoard = transpose(tempBoard);
      result = slideLeft(tempBoard);
      result.board = transpose(result.board);
    } else {
      tempBoard = transpose(tempBoard);
      tempBoard = reverse(tempBoard);
      result = slideLeft(tempBoard);
      result.board = reverse(result.board);
      result.board = transpose(result.board);
    }

    if (result.moved) {
      addRandomTile(result.board);
      setBoard(result.board);
      setScore(result.score);

      // Save high score
      if (result.score > highScore) {
        setHighScore(result.score);
        sessionStorage.setItem('2048-high-score', result.score.toString());
      }

      // Check win (reached 2048)
      if (!win && !keepPlaying) {
        const has2048 = result.board.some(row => row.includes(2048));
        if (has2048) {
          setWin(true);
        }
      }

      // Check game over
      if (checkGameOver(result.board)) {
        setGameOver(true);
      }
    }
  }, [board, gameOver, win, keepPlaying, addRandomTile, slideLeft, highScore]);

  // Controls handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
        if (e.key === 'ArrowUp') move('up');
        if (e.key === 'ArrowDown') move('down');
        if (e.key === 'ArrowLeft') move('left');
        if (e.key === 'ArrowRight') move('right');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [move]);

  // Colors dictionary for tiles
  const getTileColor = (val: number) => {
    const colors: Record<number, { bg: string; color: string }> = {
      2: { bg: '#eee4da', color: '#776e65' },
      4: { bg: '#ede0c8', color: '#776e65' },
      8: { bg: '#f2b179', color: '#f9f6f2' },
      16: { bg: '#f59563', color: '#f9f6f2' },
      32: { bg: '#f67c5f', color: '#f9f6f2' },
      64: { bg: '#f65e3b', color: '#f9f6f2' },
      128: { bg: '#edcf72', color: '#f9f6f2' },
      256: { bg: '#edcc61', color: '#f9f6f2' },
      512: { bg: '#edc850', color: '#f9f6f2' },
      1024: { bg: '#edc53f', color: '#f9f6f2' },
      2048: { bg: '#edc22e', color: '#f9f6f2' },
    };
    return colors[val] || { bg: '#3c3a32', color: '#f9f6f2' };
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '220px', fontSize: '12px' }}>
        <span style={{ color: '#FF7A00' }}>Score: {score}</span>
        <span style={{ color: 'var(--text-muted)' }}>Best: {highScore}</span>
      </div>

      {/* Grid */}
      <div style={{
        position: 'relative',
        width: '220px',
        height: '220px',
        background: '#bbada0',
        borderRadius: '8px',
        padding: '10px',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridTemplateRows: 'repeat(4, 1fr)',
        gap: '10px',
        boxSizing: 'border-box',
      }}>
        {board.map((row, r) =>
          row.map((val, c) => {
            const tileStyle = getTileColor(val);
            return (
              <div
                key={`${r}-${c}`}
                style={{
                  background: val === 0 ? 'rgba(238, 228, 218, 0.35)' : tileStyle.bg,
                  color: tileStyle.color,
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: val >= 1000 ? '12px' : val >= 100 ? '14px' : '18px',
                  fontWeight: 'bold',
                  userSelect: 'none',
                  transition: 'background-color 0.1s ease, color 0.1s ease',
                }}
              >
                {val > 0 ? val : ''}
              </div>
            );
          })
        )}
      </div>

      {win && !keepPlaying && (
        <div style={{ textAlign: 'center', marginTop: '6px' }}>
          <p style={{ fontSize: '13px', fontWeight: 600, color: '#edc22e', marginBottom: '8px' }}>
            🎉 You Reached 2048!
          </p>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
            <button className="btn-primary" onClick={() => setKeepPlaying(true)} style={{ fontSize: '11px', padding: '5px 14px' }}>
              Keep Playing
            </button>
            <button className="btn-primary" onClick={initGame} style={{ fontSize: '11px', padding: '5px 14px', background: 'var(--accent-red)' }}>
              Reset
            </button>
          </div>
        </div>
      )}

      {gameOver && (
        <div style={{ textAlign: 'center', marginTop: '6px' }}>
          <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--accent-red)', marginBottom: '8px' }}>
            Game Over! No moves left.
          </p>
          <button className="btn-primary" onClick={initGame} style={{ fontSize: '11px', padding: '5px 14px' }}>
            Try Again
          </button>
        </div>
      )}

      <p style={{ fontSize: '10px', color: 'var(--text-muted)', margin: 0 }}>
        Use Arrow keys to slide and merge tiles
      </p>
    </div>
  );
}
