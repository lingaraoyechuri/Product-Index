import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useTheme } from '../contexts/ThemeContext';

const DraculaBackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
  
  [data-theme='dark'] &,
  [data-theme='light'] & {
    display: none;
  }
`;

const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
  display: block;
`;

export const DraculaBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (theme !== 'dracula' || !canvasRef.current) return;

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

    // Mouse tracking
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Cosmic particle class
    class CosmicParticle {
      x: number;
      y: number;
      z: number;
      size: number;
      speed: number;
      color: string;
      trail: Array<{ x: number; y: number; opacity: number }>;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.z = Math.random() * 1000;
        this.size = Math.random() * 2 + 0.5;
        this.speed = Math.random() * 0.3 + 0.1;
        this.trail = [];
        
        // Dracula space colors
        const colors = [
          '#FF79C6', // Pink
          '#50FA7B', // Green
          '#BD93F9', // Purple
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        // Move particle in 3D space
        this.z -= this.speed;
        
        // Add to trail
        const screenX = (this.x - canvas.width / 2) * (1000 / this.z) + canvas.width / 2;
        const screenY = (this.y - canvas.height / 2) * (1000 / this.z) + canvas.height / 2;
        
        this.trail.push({ x: screenX, y: screenY, opacity: 1 });
        if (this.trail.length > 8) {
          this.trail.shift();
        }
        
        // Fade trail
        this.trail.forEach((point, index) => {
          point.opacity = (index / this.trail.length) * 0.6;
        });

        // React to mouse - create warp effect
        const dx = mouseX - screenX;
        const dy = mouseY - screenY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150 && this.z < 500) {
          const force = (1 - distance / 150) * 0.5;
          const angle = Math.atan2(dy, dx);
          this.x -= Math.cos(angle) * force;
          this.y -= Math.sin(angle) * force;
        }

        // Reset if particle goes too far
        if (this.z <= 0) {
          this.z = 1000;
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
          this.trail = [];
        }
      }

      draw() {
        const screenX = (this.x - canvas.width / 2) * (1000 / this.z) + canvas.width / 2;
        const screenY = (this.y - canvas.height / 2) * (1000 / this.z) + canvas.height / 2;
        const size = (1000 / this.z) * this.size;
        const opacity = Math.max(0, (1000 - this.z) / 1000);

        if (screenX < 0 || screenX > canvas.width || screenY < 0 || screenY > canvas.height) {
          return;
        }

        // Draw trail
        if (this.trail.length > 1) {
          context.save();
          context.beginPath();
          context.moveTo(this.trail[0].x, this.trail[0].y);
          
          for (let i = 1; i < this.trail.length; i++) {
            const point = this.trail[i];
            context.globalAlpha = point.opacity * opacity;
            context.lineTo(point.x, point.y);
          }
          
          context.strokeStyle = this.color;
          context.lineWidth = size * 0.5;
          context.stroke();
          context.restore();
        }

        // Draw particle with glow
        context.save();
        context.shadowBlur = size * 3;
        context.shadowColor = this.color;
        context.globalAlpha = opacity;
        
        const gradient = context.createRadialGradient(
          screenX, screenY, 0,
          screenX, screenY, size * 2
        );
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(0.5, `${this.color}80`);
        gradient.addColorStop(1, `${this.color}00`);
        
        context.beginPath();
        context.arc(screenX, screenY, size, 0, Math.PI * 2);
        context.fillStyle = gradient;
        context.fill();
        context.restore();
      }
    }

    // Nebula cloud class
    class NebulaCloud {
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      color: string;
      pulse: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 200 + 100;
        this.vx = (Math.random() - 0.5) * 0.2;
        this.vy = (Math.random() - 0.5) * 0.2;
        this.pulse = Math.random() * Math.PI * 2;
        
        const colors = ['#FF79C6', '#50FA7B', '#BD93F9'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.pulse += 0.01;
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around
        if (this.x < -this.radius) this.x = canvas.width + this.radius;
        if (this.x > canvas.width + this.radius) this.x = -this.radius;
        if (this.y < -this.radius) this.y = canvas.height + this.radius;
        if (this.y > canvas.height + this.radius) this.y = -this.radius;

        // React to mouse
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 300) {
          const force = (1 - distance / 300) * 0.3;
          const angle = Math.atan2(dy, dx);
          this.vx -= Math.cos(angle) * force;
          this.vy -= Math.sin(angle) * force;
        }

        this.vx *= 0.99;
        this.vy *= 0.99;
      }

      draw() {
        const pulseRadius = this.radius + Math.sin(this.pulse) * 20;
        
        context.save();
        const gradient = context.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, pulseRadius
        );
        gradient.addColorStop(0, `${this.color}30`);
        gradient.addColorStop(0.5, `${this.color}15`);
        gradient.addColorStop(1, `${this.color}00`);
        
        context.beginPath();
        context.arc(this.x, this.y, pulseRadius, 0, Math.PI * 2);
        context.fillStyle = gradient;
        context.fill();
        context.restore();
      }
    }

    // Create particles
    const particles: CosmicParticle[] = [];
    for (let i = 0; i < 150; i++) {
      particles.push(new CosmicParticle());
    }

    // Create nebula clouds
    const clouds: NebulaCloud[] = [];
    for (let i = 0; i < 5; i++) {
      clouds.push(new NebulaCloud());
    }

    // Animation loop
    let animationId: number;
    const animate = () => {
      // Clear canvas with Dracula background
      context.fillStyle = '#282A36';
      context.fillRect(0, 0, canvas.width, canvas.height);

      // Draw nebula clouds first (background layer)
      clouds.forEach((cloud) => {
        cloud.update();
        cloud.draw();
      });

      // Draw particles
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      // Draw mouse warp effect
      const warpGradient = context.createRadialGradient(
        mouseX, mouseY, 0,
        mouseX, mouseY, 100
      );
      warpGradient.addColorStop(0, 'rgba(255, 121, 198, 0.1)');
      warpGradient.addColorStop(0.5, 'rgba(80, 250, 123, 0.05)');
      warpGradient.addColorStop(1, 'rgba(255, 121, 198, 0)');
      
      context.beginPath();
      context.arc(mouseX, mouseY, 100, 0, Math.PI * 2);
      context.fillStyle = warpGradient;
      context.fill();

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, [theme]);

  if (theme !== 'dracula') return null;

  return (
    <DraculaBackgroundContainer>
      <Canvas ref={canvasRef} />
    </DraculaBackgroundContainer>
  );
};
