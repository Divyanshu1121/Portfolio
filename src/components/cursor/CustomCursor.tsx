'use client';

import { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const trailRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Hide default cursor globally
    document.body.style.cursor = 'none';
    
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
      
      // Check if hovering over clickable elements
      const target = e.target as HTMLElement | null;
      if (target) {
        const style = window.getComputedStyle(target);
        const isClickable = 
          target.tagName === 'BUTTON' || 
          target.tagName === 'A' || 
          target.closest('.dock-item') ||
          target.closest('.desktop-icon') ||
          target.closest('.traffic-light-btn') ||
          style.cursor === 'pointer';
        setIsHovered(!!isClickable);
      }
    };

    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      document.body.style.cursor = 'auto';
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, []);

  // Animate trailing ring with lerp
  useEffect(() => {
    let animFrameId: number;
    
    const updateTrail = () => {
      const ease = 0.15; // interpolation factor
      const targetX = position.x;
      const targetY = position.y;
      
      trailRef.current.x += (targetX - trailRef.current.x) * ease;
      trailRef.current.y += (targetY - trailRef.current.y) * ease;
      
      setTrail({ x: trailRef.current.x, y: trailRef.current.y });
      animFrameId = requestAnimationFrame(updateTrail);
    };
    
    animFrameId = requestAnimationFrame(updateTrail);
    return () => cancelAnimationFrame(animFrameId);
  }, [position]);

  if (!isVisible) return null;

  return (
    <>
      {/* Inner Dot */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: 'var(--accent-blue)',
          transform: `translate3d(${position.x - 4}px, ${position.y - 4}px, 0) scale(${isClicked ? 0.8 : 1})`,
          zIndex: 99999,
          pointerEvents: 'none',
          transition: 'transform 0.1s ease',
          boxShadow: '0 0 8px var(--accent-blue)',
        }}
      />
      {/* Outer Ring */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '24px',
          height: '24px',
          borderRadius: '50%',
          border: '1.5px solid var(--accent-blue)',
          transform: `translate3d(${trail.x - 12}px, ${trail.y - 12}px, 0) scale(${isHovered ? 1.6 : isClicked ? 0.9 : 1})`,
          zIndex: 99998,
          pointerEvents: 'none',
          opacity: 0.6,
          transition: 'transform 0.15s ease-out, border-color 0.2s ease',
          borderColor: isHovered ? 'var(--accent-purple)' : 'var(--accent-blue)',
          background: isHovered ? 'rgba(123, 97, 255, 0.05)' : 'transparent',
        }}
      />
    </>
  );
}
