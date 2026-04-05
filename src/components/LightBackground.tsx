import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useTheme } from '../contexts/ThemeContext';

const LightBackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
  background-color: #FFFFFF;
  
  [data-theme='dark'] &,
  [data-theme='dracula'] & {
    display: none;
  }
`;

const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
  display: block;
`;

export const LightBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (theme !== 'light' || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const maybeCtx = canvas.getContext('2d');
    if (!maybeCtx) return;
    const context = maybeCtx;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle class
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      colorIndex: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 4 + 2;
        this.speedX = (Math.random() - 0.5) * 0.8;
        this.speedY = (Math.random() - 0.5) * 0.8;
        this.opacity = Math.random() * 0.4 + 0.2;
        this.colorIndex = Math.floor(Math.random() * 3);
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around edges
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
      }

      draw() {
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        
        // Apply color based on index with proper opacity
        if (this.colorIndex === 0) {
          context.fillStyle = `rgba(35, 131, 226, ${this.opacity})`;
        } else if (this.colorIndex === 1) {
          context.fillStyle = `rgba(0, 0, 0, ${this.opacity * 0.3})`;
        } else {
          context.fillStyle = `rgba(200, 200, 200, ${this.opacity})`;
        }
        
        context.fill();
      }
    }

    // Connection line class
    class Connection {
      particle1: Particle;
      particle2: Particle;
      distance: number;

      constructor(p1: Particle, p2: Particle) {
        this.particle1 = p1;
        this.particle2 = p2;
        this.distance = Math.sqrt(
          Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2)
        );
      }

      draw() {
        if (this.distance < 150) {
          const opacity = (1 - this.distance / 150) * 0.15;
          context.beginPath();
          context.moveTo(this.particle1.x, this.particle1.y);
          context.lineTo(this.particle2.x, this.particle2.y);
          context.strokeStyle = `rgba(35, 131, 226, ${opacity})`;
          context.lineWidth = 0.8;
          context.stroke();
        }
      }
    }

    // Create particles
    const particles: Particle[] = [];
    const particleCount = 80; // Increased for better visibility
    
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Animation loop
    let animationId: number;
    const animate = () => {
      // Clear canvas
      context.fillStyle = '#FFFFFF';
      context.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      // Draw connections between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const connection = new Connection(particles[i], particles[j]);
          connection.draw();
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [theme]);

  if (theme !== 'light') return null;

  return (
    <LightBackgroundContainer>
      <Canvas ref={canvasRef} />
    </LightBackgroundContainer>
  );
};

