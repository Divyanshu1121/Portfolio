'use client';

import { useState, useEffect, useCallback } from 'react';

const SIZE = 10;
const MINES_COUNT = 10;

interface Cell {
  x: number;
  y: number;
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  neighborMines: number;
}

export default function MinesweeperGame() {
  const [grid, setGrid] = useState<Cell[][]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);
  const [firstClick, setFirstClick] = useState(true);
  const [flagsCount, setFlagsCount] = useState(0);

  const createEmptyGrid = useCallback(() => {
    const newGrid: Cell[][] = [];
    for (let y = 0; y < SIZE; y++) {
      const row: Cell[] = [];
      for (let x = 0; x < SIZE; x++) {
        row.push({
          x,
          y,
          isMine: false,
          isRevealed: false,
          isFlagged: false,
          neighborMines: 0,
        });
      }
      newGrid.push(row);
    }
    return newGrid;
  }, []);

  const resetGame = useCallback(() => {
    setGrid(createEmptyGrid());
    setGameOver(false);
    setWin(false);
    setFirstClick(true);
    setFlagsCount(0);
  }, [createEmptyGrid]);

  useEffect(() => {
    resetGame();
  }, [resetGame]);

  const generateMines = (startCell: Cell, currentGrid: Cell[][]) => {
    let minesPlaced = 0;
    const tempGrid = [...currentGrid.map(row => [...row])];

    while (minesPlaced < MINES_COUNT) {
      const rx = Math.floor(Math.random() * SIZE);
      const ry = Math.floor(Math.random() * SIZE);

      // Do not place mine on start cell or surrounding neighbors to guarantee safe start area
      const isStartArea = Math.abs(rx - startCell.x) <= 1 && Math.abs(ry - startCell.y) <= 1;

      if (!tempGrid[ry][rx].isMine && !isStartArea) {
        tempGrid[ry][rx].isMine = true;
        minesPlaced++;
      }
    }

    // Calculate neighbors
    for (let y = 0; y < SIZE; y++) {
      for (let x = 0; x < SIZE; x++) {
        if (tempGrid[y][x].isMine) continue;
        let count = 0;
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            const ny = y + dy;
            const nx = x + dx;
            if (ny >= 0 && ny < SIZE && nx >= 0 && nx < SIZE) {
              if (tempGrid[ny][nx].isMine) count++;
            }
          }
        }
        tempGrid[y][x].neighborMines = count;
      }
    }

    return tempGrid;
  };

  const revealCell = (y: number, x: number, currentGrid: Cell[][]) => {
    const tempGrid = [...currentGrid.map(row => [...row])];
    const cell = tempGrid[y][x];

    if (cell.isRevealed || cell.isFlagged) return tempGrid;

    cell.isRevealed = true;

    if (cell.neighborMines === 0 && !cell.isMine) {
      // Flood Fill Reveal
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const ny = y + dy;
          const nx = x + dx;
          if (ny >= 0 && ny < SIZE && nx >= 0 && nx < SIZE) {
            const neighbor = tempGrid[ny][nx];
            if (!neighbor.isRevealed && !neighbor.isMine) {
              // Recursively reveal
              const updated = revealCell(ny, nx, tempGrid);
              for (let ry = 0; ry < SIZE; ry++) {
                for (let cx = 0; cx < SIZE; cx++) {
                  tempGrid[ry][cx] = updated[ry][cx];
                }
              }
            }
          }
        }
      }
    }

    return tempGrid;
  };

  const checkWinCondition = (currentGrid: Cell[][]) => {
    for (let y = 0; y < SIZE; y++) {
      for (let x = 0; x < SIZE; x++) {
        const cell = currentGrid[y][x];
        if (!cell.isMine && !cell.isRevealed) {
          return false;
        }
      }
    }
    return true;
  };

  const handleCellClick = (y: number, x: number) => {
    if (gameOver || win) return;

    let currentGrid = grid;
    if (firstClick) {
      currentGrid = generateMines(grid[y][x], grid);
      setFirstClick(false);
    }

    const cell = currentGrid[y][x];
    if (cell.isFlagged || cell.isRevealed) return;

    if (cell.isMine) {
      // Game Over: Reveal all mines
      const tempGrid = currentGrid.map(row =>
        row.map(c => (c.isMine ? { ...c, isRevealed: true } : c))
      );
      setGrid(tempGrid);
      setGameOver(true);
      return;
    }

    const updatedGrid = revealCell(y, x, currentGrid);
    setGrid(updatedGrid);

    if (checkWinCondition(updatedGrid)) {
      setWin(true);
    }
  };

  const handleCellRightClick = (e: React.MouseEvent, y: number, x: number) => {
    e.preventDefault();
    if (gameOver || win) return;

    const tempGrid = [...grid.map(row => [...row])];
    const cell = tempGrid[y][x];

    if (cell.isRevealed) return;

    if (cell.isFlagged) {
      cell.isFlagged = false;
      setFlagsCount(prev => prev - 1);
    } else {
      if (flagsCount < MINES_COUNT) {
        cell.isFlagged = true;
        setFlagsCount(prev => prev + 1);
      }
    }

    setGrid(tempGrid);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
      {/* Top Header Controls */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '220px',
        fontSize: '12px',
        padding: '4px 8px',
        background: 'rgba(255, 255, 255, 0.03)',
        borderRadius: '6px',
        border: '1px solid rgba(255, 255, 255, 0.05)',
      }}>
        <span style={{ color: 'var(--accent-red)' }}>💣 {MINES_COUNT - flagsCount}</span>
        <button
          onClick={resetGame}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '18px',
            cursor: 'pointer',
            padding: 0,
          }}
        >
          {win ? '😎' : gameOver ? '😵' : '🙂'}
        </button>
        <span style={{ color: 'var(--accent-blue)' }}>{win ? 'Win!' : gameOver ? 'Lost!' : 'Play'}</span>
      </div>

      {/* Grid container */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${SIZE}, 20px)`,
        gridTemplateRows: `repeat(${SIZE}, 20px)`,
        gap: '2px',
        padding: '6px',
        background: '#0a0a1a',
        borderRadius: '8px',
        border: '2px solid rgba(255,255,255,0.06)',
      }}>
        {grid.map((row, y) =>
          row.map((cell, x) => {
            let bgColor = 'rgba(255, 255, 255, 0.08)';
            let color = '#fff';
            let content = '';

            if (cell.isRevealed) {
              if (cell.isMine) {
                bgColor = 'var(--accent-red)';
                content = '💣';
              } else {
                bgColor = 'rgba(255,255,255,0.02)';
                if (cell.neighborMines > 0) {
                  content = cell.neighborMines.toString();
                  const colors = ['', '#3b82f6', '#10b981', '#ef4444', '#8b5cf6', '#ec4899', '#f59e0b', '#06b6d4', '#111'];
                  color = colors[cell.neighborMines];
                }
              }
            } else if (cell.isFlagged) {
              content = '🚩';
            }

            return (
              <button
                key={`${y}-${x}`}
                onClick={() => handleCellClick(y, x)}
                onContextMenu={(e) => handleCellRightClick(e, y, x)}
                style={{
                  width: '20px',
                  height: '20px',
                  padding: 0,
                  fontSize: '10px',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: bgColor,
                  color,
                  border: cell.isRevealed ? '1px solid rgba(255,255,255,0.03)' : '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '3px',
                  cursor: cell.isRevealed ? 'default' : 'pointer',
                }}
              >
                {content}
              </button>
            );
          })
        )}
      </div>

      <p style={{ fontSize: '10px', color: 'var(--text-muted)', margin: 0 }}>
        Left-click to Reveal · Right-click to Flag/Unflag
      </p>
    </div>
  );
}
