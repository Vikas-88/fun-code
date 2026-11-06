import React, { useEffect, useRef } from 'react';

interface MatrixRainProps {
  opacity?: number;
  speedMultiplier?: number;
}

export const MatrixRain: React.FC<MatrixRainProps> = ({
  opacity = 0.85,
  speedMultiplier = 1,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Characters: predominantly 0 and 1 binary digits as requested,
    // supplemented with code syntax glyphs for authentic coding platform ambiance
    const characters = ['0', '1', '0', '1', '1', '0', '0', '1', '1', '1', '0', '0', '<', '>', '/', '{', '}', ';', ':', '=', '+', '*'];
    const fontSize = 16;
    let columns = Math.floor(width / fontSize);

    // Track each column's y position, speed, and current character
    interface ColumnState {
      y: number;
      speed: number;
      length: number;
      headChar: string;
    }

    let drops: ColumnState[] = [];

    const initDrops = () => {
      columns = Math.floor(width / fontSize);
      drops = [];
      for (let i = 0; i < columns; i++) {
        drops.push({
          // Stagger starting positions above the screen for a natural continuous flow
          y: Math.floor(Math.random() * -100),
          // Multiple falling speeds between 0.75x and 2.2x
          speed: (0.75 + Math.random() * 1.5) * speedMultiplier,
          length: 12 + Math.floor(Math.random() * 20),
          headChar: characters[Math.floor(Math.random() * characters.length)],
        });
      }
    };

    initDrops();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initDrops();
    };

    window.addEventListener('resize', handleResize);

    // Draw frame
    const draw = () => {
      // Semi-transparent black overlay creates the falling fade trail
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px "JetBrains Mono", monospace`;

      for (let i = 0; i < drops.length; i++) {
        const drop = drops[i];
        const x = i * fontSize;
        const currentY = drop.y * fontSize;

        // Pick random character
        const char = characters[Math.floor(Math.random() * characters.length)];

        // Glowing head character in bright white-green
        ctx.shadowBlur = 12;
        ctx.shadowColor = '#00FF66';
        ctx.fillStyle = '#E8FFE8';
        ctx.fillText(char, x, currentY);

        // Body glyph just behind head
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#00E55B';
        ctx.fillStyle = '#00FF66';
        ctx.fillText(drop.headChar, x, currentY - fontSize);

        // Subtle faint tail glyph
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#008F39';
        ctx.fillText(characters[Math.floor(Math.random() * characters.length)], x, currentY - fontSize * 2);

        // Update drop position
        drop.headChar = char;
        drop.y += drop.speed;

        // Reset drop when it reaches the bottom of the screen with randomized respawn
        if (drop.y * fontSize > height && Math.random() > 0.975) {
          drop.y = 0;
          drop.speed = (0.75 + Math.random() * 1.5) * speedMultiplier;
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    // Initial background wipe to pure black
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, width, height);

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [speedMultiplier]);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-black"
      style={{ opacity }}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="block w-full h-full"
      />
      {/* Subtle Matrix vignette and scanlines */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.7)_80%,rgba(0,0,0,0.95)_100%)] pointer-events-none" />
      <div className="absolute inset-0 matrix-scanlines opacity-40 pointer-events-none" />
    </div>
  );
};
