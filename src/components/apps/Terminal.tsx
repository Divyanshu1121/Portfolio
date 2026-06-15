'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useWindowStore } from '@/stores/windowStore';
import { personalInfo, bio, projects, experiences, skillCategories, education, certifications, contactInfo } from '@/data/portfolio';

interface TerminalLine {
  type: 'input' | 'output' | 'error' | 'system';
  content: string;
}

const COMMANDS = [
  'help', 'whoami', 'about', 'projects', 'project', 'skills', 'experience',
  'education', 'certifications', 'contact', 'social', 'resume', 'open',
  'clear', 'date', 'pwd', 'ls', 'cat', 'echo', 'matrix', 'snake',
  'konami', 'ask', 'github', 'linkedin', 'hire', 'hack', 'version',
  'neofetch',
];

export default function Terminal() {
  const [history, setHistory] = useState<TerminalLine[]>([
    { type: 'system', content: 'DivyanshuOS Terminal v1.0 — Type "help" for available commands.' },
    { type: 'system', content: '' },
  ]);
  const [input, setInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { openWindow } = useWindowStore();

  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }, 10);
  }, []);

  useEffect(() => { scrollToBottom(); }, [history, scrollToBottom]);

  const addOutput = useCallback((lines: string | string[]) => {
    const arr = Array.isArray(lines) ? lines : [lines];
    setHistory((h) => [
      ...h,
      ...arr.map((content) => ({ type: 'output' as const, content })),
    ]);
  }, []);

  const processCommand = useCallback((cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    setHistory((h) => [...h, { type: 'input', content: `divyanshu@portfolio:~$ ${trimmed}` }]);
    setCmdHistory((h) => [...h, trimmed]);
    setHistoryIdx(-1);

    const parts = trimmed.split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1).join(' ');

    switch (command) {
      case 'help':
        addOutput([
          '┌─────────────────────────────────────────────┐',
          '│  DivyanshuOS Terminal — Available Commands       │',
          '├─────────────────────────────────────────────┤',
          '│  whoami       Who am I?                     │',
          '│  about        Full bio                      │',
          '│  projects     List all projects              │',
          '│  project [n]  Detail on project #n          │',
          '│  skills       Skills by category             │',
          '│  experience   Work history                   │',
          '│  education    Academic background            │',
          '│  certifications  Certificates list           │',
          '│  contact      Contact info                   │',
          '│  social       Open social links              │',
          '│  resume       Open resume                    │',
          '│  open [app]   Open any window                │',
          '│  clear        Clear terminal                 │',
          '│  date         Current date/time              │',
          '│  pwd          Current directory              │',
          '│  ls           List directories               │',
          '│  neofetch     System info display            │',
          '│  snake        🐍 Play snake game             │',
          '│  matrix       Matrix rain effect             │',
          '│  hire         Why hire Divyanshu?                 │',
          '│  version      System version                 │',
          '└─────────────────────────────────────────────┘',
        ]);
        break;

      case 'whoami':
        addOutput(`${personalInfo.fullName} | ${personalInfo.role} | ${personalInfo.location}`);
        break;

      case 'about':
        addOutput(bio);
        break;

      case 'projects':
        projects.forEach((p, i) => {
          addOutput(`  ${i + 1}. ${p.title} — ${p.shortDescription}`);
        });
        break;

      case 'project': {
        const num = parseInt(args);
        const proj = projects[num - 1];
        if (!proj) {
          addOutput(`Usage: project [1-${projects.length}]`);
        } else {
          addOutput([
            `═══ ${proj.title} ═══`,
            `Badges: ${proj.badges.join(' · ')}`,
            '',
            proj.fullDescription,
            '',
            `Stack: ${proj.stack.join(' · ')}`,
            proj.architecture ? `Architecture: ${proj.architecture}` : '',
            proj.metrics ? `Metrics: ${proj.metrics}` : '',
          ].filter(Boolean));
        }
        break;
      }

      case 'skills':
        skillCategories.forEach((cat) => {
          addOutput(`\n  ─── ${cat.label.toUpperCase()} ───`);
          cat.skills.forEach((s) => {
            const bar = '█'.repeat(Math.floor(s.level / 5)) + '░'.repeat(20 - Math.floor(s.level / 5));
            addOutput(`  ${s.name.padEnd(25)} ${bar} ${s.level}%`);
          });
        });
        break;

      case 'experience':
        experiences.forEach((exp) => {
          addOutput([
            '',
            `  ${exp.isCurrent ? '🟢' : '🔵'} [${exp.role}]`,
            `     ${exp.company}${exp.location ? `, ${exp.location}` : ''}`,
            `     ${exp.period}  (${exp.duration})`,
          ]);
          exp.projects.forEach((proj) => {
            addOutput(`     → ${proj.name}`);
            proj.bullets.forEach((b) => addOutput(`       - ${b}`));
          });
        });
        break;

      case 'education':
        education.forEach((edu) => {
          addOutput([
            `  ${edu.icon} ${edu.degree} — ${edu.field}`,
            `     ${edu.institution} (${edu.period})`,
            `     ${edu.gradeLabel}: ${edu.grade}`,
          ]);
        });
        break;

      case 'certifications':
        certifications.forEach((cert) => {
          addOutput(`\n  ${cert.icon} ${cert.issuer}:`);
          cert.items.forEach((item) => addOutput(`    ✓ ${item}`));
        });
        break;

      case 'contact':
        contactInfo.forEach((c) => {
          addOutput(`  ${c.icon} ${c.label}: ${c.value}`);
        });
        break;

      case 'social':
        addOutput('Opening LinkedIn and GitHub...');
        window.open(personalInfo.linkedin, '_blank');
        window.open(personalInfo.github, '_blank');
        break;

      case 'github':
        addOutput('Opening GitHub...');
        window.open(personalInfo.github, '_blank');
        break;

      case 'linkedin':
        addOutput('Opening LinkedIn...');
        window.open(personalInfo.linkedin, '_blank');
        break;

      case 'resume':
        openWindow('resume');
        addOutput('Opening resume...');
        break;

      case 'open': {
        const windowIds: Record<string, string> = {
          'about': 'about', 'projects': 'projects', 'experience': 'experience',
          'skills': 'skills', 'education': 'education', 'certifications': 'certifications',
          'resume': 'resume', 'contact': 'contact', 'ai': 'ai', 'assistant': 'ai',
          'terminal': 'terminal',
        };
        const target = windowIds[args.toLowerCase()];
        if (target) {
          openWindow(target);
          addOutput(`Opening ${args}...`);
        } else {
          addOutput(`Unknown app: "${args}". Available: ${Object.keys(windowIds).join(', ')}`);
        }
        break;
      }

      case 'clear':
        setHistory([]);
        break;

      case 'date':
        addOutput(new Date().toString());
        break;

      case 'pwd':
        addOutput('/home/divyanshu/portfolio');
        break;

      case 'ls':
        addOutput('about/  projects/  skills/  experience/  contact/  education/  certifications/');
        break;

      case 'cat':
        if (args === 'about.txt') {
          addOutput(bio);
        } else {
          addOutput(`cat: ${args}: No such file or directory`);
        }
        break;

      case 'echo':
        addOutput(args || '');
        break;

      case 'version':
        addOutput('DivyanshuOS v2.0 — Built by Divyanshu M. Patel with React, Next.js, Framer Motion');
        break;

      case 'snake':
        openWindow('snake');
        addOutput('🐍 Starting Snake game...');
        break;

      case 'matrix':
        addOutput([
          '╔══════════════════════════════════════╗',
          '║     THE MATRIX HAS YOU, DIVYANSHU...      ║',
          '║                                      ║',
          '║  01001000 01101001 01110010 01100101  ║',
          '║  01000001 01110010 01111001 01100001  ║',
          '║                                      ║',
          '║     Wake up, recruiter...             ║',
          '║     The Matrix has you.               ║',
          '║     Follow the white rabbit.          ║',
          '║     divyanshupatel5633@gmail.com             ║',
          '╚══════════════════════════════════════╝',
        ]);
        break;

      case 'konami':
        addOutput('Hint: Try the Konami code on the desktop... ↑ ↑ ↓ ↓ ← → ← → B A');
        break;

      case 'hire':
        addOutput([
          '',
          'Calculating ROI of hiring Divyanshu M. Patel...',
          '████████████████████ 100%',
          '',
          '  ██╗  ██╗██╗██████╗ ███████╗    ██╗  ██╗██╗███╗   ███╗',
          '  ██║  ██║██║██╔══██╗██╔════╝    ██║  ██║██║████╗ ████║',
          '  ███████║██║██████╔╝█████╗      ███████║██║██╔████╔██║',
          '  ██╔══██║██║██╔══██╗██╔══╝      ██╔══██║██║██║╚██╔╝██║',
          '  ██║  ██║██║██║  ██║███████╗    ██║  ██║██║██║ ╚═╝ ██║',
          '',
          '  Expected output: Exceptional software + AI solutions.',
          '  Action: divyanshupatel5633@gmail.com',
          '',
        ]);
        break;

      case 'hack':
        addOutput([
          '  [■] Accessing mainframe...',
          '  [■] Bypassing firewall... ████████ OK',
          '  [■] Decrypting portfolio data... ████████ OK',
          '  [■] Result: Divyanshu M. Patel is an excellent developer.',
          '  [■] Recommendation: HIRE IMMEDIATELY',
        ]);
        break;

      case 'neofetch':
        addOutput([
          '    ___        Divyanshu@DivyanshuOS',
          '   /   \\       -----------',
          '  |  AS |      OS: DivyanshuOS v2.0 (React Edition)',
          '   \\___/       Host: Portfolio Website',
          '               Kernel: Next.js 14.0',
          '  ========     Uptime: Since June 2026',
          '               Packages: 47 npm (node_modules)',
          '               Shell: DivyanshuTerminal v1.0',
          '               Resolution: 1920×1080',
          '               DE: DivyanshuOS Desktop',
          '               WM: react-rnd',
          '               Theme: Dark Space [Dark]',
          '               Icons: Custom SVG',
          '               CPU: Brain @ 9.44 GHz',
          '               GPU: TensorFlow v2.0',
          '               Memory: Infinite curiosity',
        ]);
        break;

      case 'ask':
        if (args) {
          openWindow('ai');
          addOutput(`Opening AI Assistant with: "${args}"`);
        } else {
          addOutput('Usage: ask "your question here"');
        }
        break;

      default:
        addOutput(`command not found: ${command}. Type "help" for available commands.`);
    }
  }, [addOutput, openWindow]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      processCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length > 0) {
        const newIdx = historyIdx < cmdHistory.length - 1 ? historyIdx + 1 : historyIdx;
        setHistoryIdx(newIdx);
        setInput(cmdHistory[cmdHistory.length - 1 - newIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx > 0) {
        const newIdx = historyIdx - 1;
        setHistoryIdx(newIdx);
        setInput(cmdHistory[cmdHistory.length - 1 - newIdx]);
      } else {
        setHistoryIdx(-1);
        setInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      if (input) {
        const match = COMMANDS.find((c) => c.startsWith(input.toLowerCase()));
        if (match) setInput(match);
      }
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      setHistory([]);
    }
  };

  return (
    <div
      ref={scrollRef}
      className="terminal-body"
      style={{ padding: '12px 16px', cursor: 'text' }}
      onClick={() => inputRef.current?.focus()}
    >
      {history.map((line, i) => (
        <div key={i} style={{
          color: line.type === 'input' ? 'var(--accent-blue)' : line.type === 'error' ? 'var(--accent-red)' : line.type === 'system' ? 'rgba(200, 245, 200, 0.5)' : '#c8f5c8',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          fontFamily: 'var(--font-mono)',
          fontSize: '13px',
          lineHeight: '1.6',
        }}>
          {line.content}
        </div>
      ))}

      {/* Input line */}
      <div style={{ display: 'flex', alignItems: 'center', fontFamily: 'var(--font-mono)', fontSize: '13px', position: 'relative' }}>
        <span className="terminal-prompt">divyanshu@portfolio:~$&nbsp;</span>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', flex: 1, minHeight: '20px' }}>
          <span style={{ whiteSpace: 'pre', color: '#c8f5c8' }}>{input}</span>
          <span className="terminal-cursor" />
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="terminal-input"
            autoFocus
            spellCheck={false}
            autoComplete="off"
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: '100%',
              height: '100%',
              background: 'transparent',
              color: 'transparent',
              caretColor: 'transparent',
              border: 'none',
              outline: 'none',
            }}
          />
        </div>
      </div>
    </div>
  );
}
