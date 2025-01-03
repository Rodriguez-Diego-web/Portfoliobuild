import React, { useEffect, useRef } from 'react';
import '../styles/matrix.css';

const MatrixRain: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Matrix characters
    const chars = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const charArray = chars.split('');

    // Columns setup
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }

    // Drawing speed
    let lastTime = 0;
    const interval = 30; // Update every 30ms

    // Animation
    const draw = (currentTime: number) => {
      if (currentTime - lastTime >= interval) {
        // Semi-transparent black to create fade effect
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Green text
        ctx.fillStyle = '#0F0';
        ctx.font = fontSize + 'px monospace';

        // Draw characters
        for (let i = 0; i < drops.length; i++) {
          // Random character
          const char = charArray[Math.floor(Math.random() * charArray.length)];
          
          // Draw the character
          const x = i * fontSize;
          const y = drops[i] * fontSize;
          
          // Add glow effect
          ctx.shadowBlur = 5;
          ctx.shadowColor = '#0F0';
          
          // Draw with varying opacity
          const opacity = (1 - (y / canvas.height)) * 0.9 + 0.1;
          ctx.fillStyle = `rgba(0, 255, 0, ${opacity})`;
          
          ctx.fillText(char, x, y);
          
          // Reset shadow
          ctx.shadowBlur = 0;

          // Move drop
          drops[i]++;

          // Reset drop to top with random delay
          if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
          }
        }

        lastTime = currentTime;
      }

      requestAnimationFrame(draw);
    };

    const animationId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1000, opacity: 0.15 }}
    />
  );
};

export default MatrixRain;
