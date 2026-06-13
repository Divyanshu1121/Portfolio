'use client';

import { useState, useEffect, useMemo } from 'react';
import { useWindowStore } from '@/stores/windowStore';

export default function SystemMonitor() {
  const { windows, closeWindow } = useWindowStore();
  const [cpuLoad, setCpuLoad] = useState(4);
  const [networkSpeed, setNetworkSpeed] = useState(0.2); // MB/s
  const [tick, setTick] = useState(0);

  // Periodic statistics updates
  useEffect(() => {
    const timer = setInterval(() => {
      setTick((t) => t + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // List of currently open window IDs
  const activeWindowIds = useMemo(() => {
    return Object.values(windows)
      .filter((win) => win.isOpen && !win.isMinimized)
      .map((win) => win.id);
  }, [windows]);

  // Calculate dynamic CPU and RAM loads
  const { processList, totalCpu, totalRam } = useMemo(() => {
    let baseRam = 140; // MB baseline
    let cpuSum = 2; // base CPU

    const list = Object.values(windows)
      .filter((win) => win.isOpen)
      .map((win) => {
        let cpu = 1.5 + Math.random() * 2; // default process cpu
        let ram = 64 + Math.random() * 10; // default process ram

        // Spike resources based on app types
        if (['snake', 'tetris', 'pong', 'game2048', 'tictactoe'].includes(win.id)) {
          cpu = 18 + Math.random() * 8; // games take up more CPU
          ram = 112 + Math.random() * 20;
        } else if (win.id === 'ai') {
          cpu = 28 + Math.random() * 15; // AI takes processing power
          ram = 180 + Math.random() * 30;
        } else if (win.id === 'google') {
          cpu = 6 + Math.random() * 4;
          ram = 240 + Math.random() * 50; // Chrome eats RAM
        } else if (win.id === 'terminal') {
          cpu = 1.2 + Math.random() * 1;
          ram = 32 + Math.random() * 5;
        }

        // Adjust slightly if minimized
        if (win.isMinimized) {
          cpu = 0.2 + Math.random() * 0.3;
          ram = ram * 0.6;
        }

        cpuSum += cpu;
        baseRam += ram;

        return {
          id: win.id,
          name: win.title,
          icon: win.icon,
          cpu: parseFloat(cpu.toFixed(1)),
          ram: Math.round(ram),
          status: win.isMinimized ? 'Suspended' : 'Running',
        };
      });

    // Add jitter
    const finalCpu = Math.min(99, parseFloat((cpuSum + (Math.random() * 2 - 1)).toFixed(1)));
    const finalRam = Math.min(100, Math.round((baseRam / 1600) * 100)); // percent of mock 16GB RAM

    return {
      processList: list,
      totalCpu: finalCpu,
      totalRam: finalRam,
    };
  }, [windows, tick]);

  // Adjust CPU load visually
  useEffect(() => {
    setCpuLoad(totalCpu);
    setNetworkSpeed(activeWindowIds.includes('ai') || activeWindowIds.includes('google')
      ? parseFloat((0.8 + Math.random() * 4).toFixed(1))
      : parseFloat((0.05 + Math.random() * 0.3).toFixed(2))
    );
  }, [totalCpu, activeWindowIds]);

  return (
    <div style={{
      padding: '16px',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      fontFamily: 'var(--font-mono)',
      background: '#090a15',
      color: '#00FF87',
      overflow: 'hidden',
      fontSize: '11px',
    }}>
      {/* Top dashboard charts */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
        {/* CPU Box */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid rgba(0, 255, 135, 0.15)',
          borderRadius: '8px',
          padding: '10px',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span style={{ color: '#fff', fontWeight: 600 }}>CPU Usage</span>
            <span style={{ color: '#00FF87' }}>{cpuLoad}%</span>
          </div>
          <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ width: `${cpuLoad}%`, height: '100%', background: 'linear-gradient(90deg, #00FF87, #60EFFF)', transition: 'width 0.5s ease' }} />
          </div>
        </div>

        {/* RAM Box */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid rgba(96, 239, 255, 0.15)',
          borderRadius: '8px',
          padding: '10px',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span style={{ color: '#fff', fontWeight: 600 }}>System Memory</span>
            <span style={{ color: '#60EFFF' }}>{totalRam}%</span>
          </div>
          <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ width: `${totalRam}%`, height: '100%', background: 'linear-gradient(90deg, #60EFFF, #a88bf5)', transition: 'width 0.5s ease' }} />
          </div>
        </div>
      </div>

      {/* Network monitor */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.01)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        borderRadius: '8px',
        padding: '8px 12px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <span style={{ color: '#fff' }}>📡 Network I/O Speed:</span>
        <span style={{ color: '#60EFFF', fontWeight: 'bold' }}>{networkSpeed} MB/s</span>
      </div>

      {/* Active Tasks list */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.5fr 1fr 1fr 1fr',
          padding: '6px 8px',
          borderBottom: '1px solid rgba(0, 255, 135, 0.2)',
          color: '#fff',
          fontWeight: 'bold',
        }}>
          <span>Process</span>
          <span style={{ textAlign: 'right' }}>CPU %</span>
          <span style={{ textAlign: 'right' }}>RAM (MB)</span>
          <span style={{ textAlign: 'center' }}>Control</span>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '6px' }}>
          {processList.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '20px', color: 'var(--text-muted)' }}>
              No user processes currently running.
            </div>
          ) : (
            processList.map((proc) => (
              <div
                key={proc.id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1.5fr 1fr 1fr 1fr',
                  padding: '6px 8px',
                  alignItems: 'center',
                  background: 'rgba(255, 255, 255, 0.01)',
                  borderRadius: '4px',
                  border: '1px solid rgba(255,255,255,0.02)',
                }}
              >
                <span style={{ color: '#fff', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>{proc.icon}</span>
                  <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{proc.name}</span>
                </span>
                <span style={{ textAlign: 'right', color: proc.cpu > 15 ? '#FF5252' : '#00FF87' }}>{proc.cpu}%</span>
                <span style={{ textAlign: 'right', color: '#60EFFF' }}>{proc.ram} MB</span>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <button
                    onClick={() => closeWindow(proc.id)}
                    style={{
                      background: 'rgba(255, 82, 82, 0.12)',
                      border: '1px solid rgba(255, 82, 82, 0.3)',
                      color: '#FF5252',
                      borderRadius: '4px',
                      padding: '2px 8px',
                      fontSize: '9px',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                    }}
                  >
                    Kill
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
