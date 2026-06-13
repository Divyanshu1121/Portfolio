'use client';

import { useState } from 'react';

type Player = 'X' | 'O' | null;
type Board = Player[];

export default function TicTacToe() {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [againstAI, setAgainstAI] = useState(true);
  const [winner, setWinner] = useState<string | null>(null);
  const [scores, setScores] = useState({ player: 0, ai: 0, ties: 0 });

  const winLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const checkWinner = (currentBoard: Board) => {
    for (let i = 0; i < winLines.length; i++) {
      const [a, b, c] = winLines[i];
      if (currentBoard[a] && currentBoard[a] === currentBoard[b] && currentBoard[a] === currentBoard[c]) {
        return currentBoard[a];
      }
    }
    if (currentBoard.every((cell) => cell !== null)) {
      return 'tie';
    }
    return null;
  };

  // Minimax algorithm for unbeatable AI ('O')
  const minimax = (tempBoard: Board, depth: number, isMaximizing: boolean): number => {
    const score = checkWinner(tempBoard);
    if (score === 'O') return 10 - depth;
    if (score === 'X') return depth - 10;
    if (score === 'tie') return 0;

    if (isMaximizing) {
      let best = -1000;
      for (let i = 0; i < 9; i++) {
        if (tempBoard[i] === null) {
          tempBoard[i] = 'O';
          best = Math.max(best, minimax(tempBoard, depth + 1, false));
          tempBoard[i] = null;
        }
      }
      return best;
    } else {
      let best = 1000;
      for (let i = 0; i < 9; i++) {
        if (tempBoard[i] === null) {
          tempBoard[i] = 'X';
          best = Math.min(best, minimax(tempBoard, depth + 1, true));
          tempBoard[i] = null;
        }
      }
      return best;
    }
  };

  const getBestMove = (tempBoard: Board): number => {
    let bestVal = -1000;
    let bestMove = -1;

    for (let i = 0; i < 9; i++) {
      if (tempBoard[i] === null) {
        tempBoard[i] = 'O';
        const moveVal = minimax(tempBoard, 0, false);
        tempBoard[i] = null;

        if (moveVal > bestVal) {
          bestVal = moveVal;
          bestMove = i;
        }
      }
    }
    return bestMove;
  };

  const makeAIMove = (currentBoard: Board) => {
    const bestMove = getBestMove(currentBoard);
    if (bestMove !== -1) {
      currentBoard[bestMove] = 'O';
      const gameWinner = checkWinner(currentBoard);

      setBoard(currentBoard);
      setIsXNext(true);

      if (gameWinner) {
        handleGameEnd(gameWinner);
      }
    }
  };

  const handleGameEnd = (gameWinner: string) => {
    setWinner(gameWinner);
    if (gameWinner === 'X') {
      setScores((s) => ({ ...s, player: s.player + 1 }));
    } else if (gameWinner === 'O') {
      setScores((s) => ({ ...s, ai: s.ai + 1 }));
    } else {
      setScores((s) => ({ ...s, ties: s.ties + 1 }));
    }
  };

  const handleCellClick = (index: number) => {
    if (board[index] || winner) return;

    const tempBoard = [...board];
    tempBoard[index] = isXNext ? 'X' : 'O';
    setBoard(tempBoard);

    const gameWinner = checkWinner(tempBoard);
    if (gameWinner) {
      handleGameEnd(gameWinner);
      return;
    }

    if (againstAI) {
      setIsXNext(false);
      // Run AI move shortly after to look natural
      setTimeout(() => {
        makeAIMove(tempBoard);
      }, 250);
    } else {
      setIsXNext(!isXNext);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  const toggleMode = (mode: boolean) => {
    setAgainstAI(mode);
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setScores({ player: 0, ai: 0, ties: 0 });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
      {/* Mode Selector */}
      <div style={{ display: 'flex', gap: '8px', fontSize: '11px', marginBottom: '4px' }}>
        <button
          onClick={() => toggleMode(true)}
          style={{
            padding: '4px 10px',
            borderRadius: '6px',
            border: againstAI ? '1px solid #FF7A00' : '1px solid rgba(255, 255, 255, 0.1)',
            background: againstAI ? 'rgba(255, 122, 0, 0.15)' : 'none',
            color: againstAI ? '#FF7A00' : 'var(--text-muted)',
            cursor: 'pointer',
          }}
        >
          vs AI (Unbeatable)
        </button>
        <button
          onClick={() => toggleMode(false)}
          style={{
            padding: '4px 10px',
            borderRadius: '6px',
            border: !againstAI ? '1px solid #FF7A00' : '1px solid rgba(255, 255, 255, 0.1)',
            background: !againstAI ? 'rgba(255, 122, 0, 0.15)' : 'none',
            color: !againstAI ? '#FF7A00' : 'var(--text-muted)',
            cursor: 'pointer',
          }}
        >
          Local 2-Player
        </button>
      </div>

      {/* Scores Panel */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '200px',
        fontSize: '11px',
        color: 'var(--text-muted)',
        background: 'rgba(255, 255, 255, 0.02)',
        padding: '4px 8px',
        borderRadius: '6px',
      }}>
        <span>X (Player): {scores.player}</span>
        <span>Ties: {scores.ties}</span>
        <span>O ({againstAI ? 'AI' : 'P2'}): {scores.ai}</span>
      </div>

      {/* 3x3 Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridTemplateRows: 'repeat(3, 1fr)',
        gap: '6px',
        width: '200px',
        height: '200px',
        background: 'rgba(255, 255, 255, 0.03)',
        borderRadius: '8px',
        padding: '6px',
        boxSizing: 'border-box',
      }}>
        {board.map((cell, index) => (
          <button
            key={index}
            onClick={() => handleCellClick(index)}
            style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '6px',
              fontSize: '28px',
              fontWeight: 'bold',
              color: cell === 'X' ? '#5E9BF0' : cell === 'O' ? '#FF7A00' : '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: cell || winner ? 'default' : 'pointer',
              padding: 0,
            }}
          >
            {cell}
          </button>
        ))}
      </div>

      {/* Game Over Message */}
      {winner && (
        <div style={{ textAlign: 'center', marginTop: '4px' }}>
          <p style={{
            fontSize: '13px',
            fontWeight: 600,
            color: winner === 'tie' ? '#fff' : winner === 'X' ? '#5E9BF0' : '#FF7A00',
            marginBottom: '6px'
          }}>
            {winner === 'tie' ? "🤝 It's a Tie!" : winner === 'X' ? '🎉 X Wins!' : `🏆 O Wins!`}
          </p>
          <button className="btn-primary" onClick={resetGame} style={{ fontSize: '11px', padding: '4px 14px' }}>
            Play Again
          </button>
        </div>
      )}

      {!winner && (
        <p style={{ fontSize: '10px', color: 'var(--text-muted)', margin: 0 }}>
          {isXNext ? "X's Turn" : "O's Turn"}
        </p>
      )}
    </div>
  );
}
