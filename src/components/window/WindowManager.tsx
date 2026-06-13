'use client';

import { useWindowStore } from '@/stores/windowStore';
import Window from './Window';
import AboutMe from '@/components/apps/AboutMe';
import Projects from '@/components/apps/Projects';
import Experience from '@/components/apps/Experience';
import Skills from '@/components/apps/Skills';
import Education from '@/components/apps/Education';
import Certifications from '@/components/apps/Certifications';
import Terminal from '@/components/apps/Terminal';
import AIAssistant from '@/components/apps/AIAssistant';
import Resume from '@/components/apps/Resume';
import Contact from '@/components/apps/Contact';
import SnakeGame from '@/components/easter-eggs/SnakeGame';
import RecruiterMode from '@/components/easter-eggs/RecruiterMode';
import Google from '@/components/apps/Google';
import GamesApp from '@/components/apps/GamesApp';
import TetrisGame from '@/components/easter-eggs/TetrisGame';
import MinesweeperGame from '@/components/easter-eggs/MinesweeperGame';
import PongGame from '@/components/easter-eggs/PongGame';
import Game2048 from '@/components/easter-eggs/Game2048';
import TicTacToe from '@/components/easter-eggs/TicTacToe';
import SystemMonitor from '@/components/apps/SystemMonitor';
import ThemeSettings from '@/components/apps/ThemeSettings';

const windowComponents: Record<string, React.ComponentType> = {
  about: AboutMe,
  projects: Projects,
  experience: Experience,
  skills: Skills,
  education: Education,
  certifications: Certifications,
  terminal: Terminal,
  ai: AIAssistant,
  resume: Resume,
  contact: Contact,
  snake: SnakeGame,
  recruiter: RecruiterMode,
  google: Google,
  games: GamesApp,
  tetris: TetrisGame,
  minesweeper: MinesweeperGame,
  pong: PongGame,
  game2048: Game2048,
  tictactoe: TicTacToe,
  system_monitor: SystemMonitor,
  settings: ThemeSettings,
};

export default function WindowManager() {
  const { windows } = useWindowStore();

  return (
    <>
      {Object.values(windows).map((win) => {
        if (!win.isOpen) return null;
        const Component = windowComponents[win.id];
        if (!Component) return null;
        return (
          <Window key={win.id} id={win.id}>
            <Component />
          </Window>
        );
      })}
    </>
  );
}
