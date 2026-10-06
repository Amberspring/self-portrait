import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  tint: string;
}

/**
 * Decorative Disturbance Field Canvas for LIFE Mode.
 * Acts like water, magnetic warmth, or film grain disturbance around cursor/touch.
 * Respects prefers-reduced-motion and adaptive particle density.
 */
export const LifeDisturbanceField: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const isMobile = width < 768;
    const cols = isMobile ? 14 : 26;
    const rows = isMobile ? 10 : 18;

    const tints = [
      'rgba(242, 239, 233, 0.25)',
      'rgba(217, 119, 54, 0.32)',
      'rgba(158, 150, 137, 0.22)',
    ];

    const particles: Particle[] = [];

    const initParticles = () => {
      particles.length = 0;
      const cellW = width / cols;
      const cellH = height / rows;
      for (let i = 0; i <= cols; i++) {
        for (let j = 0; j <= rows; j++) {
          const ox = i * cellW + (Math.random() - 0.5) * 18;
          const oy = j * cellH + (Math.random() - 0.5) * 18;
          particles.push({
            x: ox,
            y: oy,
            originX: ox,
            originY: oy,
            vx: 0,
            vy: 0,
            size: Math.random() * 1.4 + 0.7,
            alpha: Math.random() * 0.25 + 0.08,
            tint: tints[(i + j) % tints.length],
          });
        }
      }
    };

    initParticles();

    const pointer = { x: -9999, y: -9999, radius: isMobile ? 90 : 150 };

    const handleMouseMove = (e: MouseEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        pointer.x = e.touches[0].clientX;
        pointer.y = e.touches[0].clientY;
      }
    };

    const handleLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('mouseleave', handleLeave);
    window.addEventListener('resize', handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const dx = pointer.x - p.x;
        const dy = pointer.y - p.y;
        const distSq = dx * dx + dy * dy;
        const maxDistSq = pointer.radius * pointer.radius;

        if (distSq < maxDistSq && distSq > 1) {
          const dist = Math.sqrt(distSq);
          const force = (pointer.radius - dist) / pointer.radius;
          const angle = Math.atan2(dy, dx);
          // Subtle fluid repel + tangential swirl
          p.vx -= Math.cos(angle + 0.35) * force * 1.4;
          p.vy -= Math.sin(angle + 0.35) * force * 1.4;
        }

        // Elastic spring back to origin
        p.vx += (p.originX - p.x) * 0.045;
        p.vy += (p.originY - p.y) * 0.045;

        // Damping
        p.vx *= 0.86;
        p.vy *= 0.86;

        p.x += p.vx;
        p.y += p.vy;

        // Draw subtle displaced filament or grain node
        const displacement = Math.abs(p.x - p.originX) + Math.abs(p.y - p.originY);
        if (displacement > 1.5) {
          ctx.beginPath();
          ctx.moveTo(p.originX, p.originY);
          ctx.lineTo(p.x, p.y);
          ctx.strokeStyle = 'rgba(217, 119, 54, 0.14)';
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.tint;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseleave', handleLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, [prefersReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 opacity-75"
    />
  );
};
