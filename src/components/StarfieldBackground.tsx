import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useTheme } from '../contexts/ThemeContext';

const StarfieldContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
  
  [data-theme='light'] &,
  [data-theme='dracula'] & {
    display: none;
  }
`;

const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
  display: block;
`;

export const StarfieldBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (theme !== 'dark' || !canvasRef.current) return;

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

    // Star class
    class Star {
      x: number;
      y: number;
      z: number;
      size: number;
      speed: number;
      opacity: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.z = Math.random() * 2000;
        this.size = Math.random() * 1.5;
        this.speed = Math.random() * 0.5 + 0.1;
        this.opacity = Math.random();
      }

      update() {
        this.z -= this.speed;
        if (this.z <= 0) {
          this.z = 2000;
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
        }
      }

      draw() {
        const x = (this.x - canvas.width / 2) * (1000 / this.z) + canvas.width / 2;
        const y = (this.y - canvas.height / 2) * (1000 / this.z) + canvas.height / 2;
        const size = (1000 / this.z) * this.size;
        const opacity = (2000 - this.z) / 2000;

        if (x < 0 || x > canvas.width || y < 0 || y > canvas.height) {
          this.z = 2000;
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
          return;
        }

        context.beginPath();
        context.arc(x, y, size, 0, Math.PI * 2);
        context.fillStyle = `rgba(255, 255, 255, ${opacity * 0.8})`;
        context.fill();
      }
    }

    // Shooting star class
    class ShootingStar {
      x: number;
      y: number;
      length: number;
      speed: number;
      angle: number;
      opacity: number;
      life: number;
      maxLife: number;
      isFire: boolean;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height * 0.3;
        this.length = Math.random() * 80 + 50;
        this.speed = Math.random() * 3 + 2;
        this.angle = Math.random() * Math.PI * 0.5 + Math.PI * 0.25;
        this.opacity = 1;
        this.maxLife = Math.random() * 100 + 50;
        this.life = this.maxLife;
        this.isFire = Math.random() > 0.7; // 30% chance of being fire
      }

      update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        this.life--;
        this.opacity = this.life / this.maxLife;

        if (
          this.life <= 0 ||
          this.x < 0 ||
          this.x > canvas.width ||
          this.y < 0 ||
          this.y > canvas.height
        ) {
          return false;
        }
        return true;
      }

      draw() {
        context.save();
        context.globalAlpha = this.opacity;
        
        if (this.isFire) {
          // Fire effect - gradient from white to orange to red
          const gradient = context.createLinearGradient(
            this.x,
            this.y,
            this.x - Math.cos(this.angle) * this.length,
            this.y - Math.sin(this.angle) * this.length
          );
          gradient.addColorStop(0, `rgba(255, 255, 255, ${this.opacity})`);
          gradient.addColorStop(0.3, `rgba(255, 200, 100, ${this.opacity * 0.9})`);
          gradient.addColorStop(0.6, `rgba(255, 140, 0, ${this.opacity * 0.8})`);
          gradient.addColorStop(1, `rgba(255, 69, 0, ${this.opacity * 0.6})`);
          
          context.strokeStyle = gradient;
          context.lineWidth = 3;
          context.shadowBlur = 20;
          context.shadowColor = '#ff4500';
          
          // Draw additional glow for fire effect
          context.beginPath();
          context.moveTo(this.x, this.y);
          context.lineTo(
            this.x - Math.cos(this.angle) * this.length,
            this.y - Math.sin(this.angle) * this.length
          );
          context.strokeStyle = `rgba(255, 69, 0, ${this.opacity * 0.3})`;
          context.lineWidth = 5;
          context.stroke();
        } else {
          // Regular shooting star
          context.strokeStyle = '#ffffff';
          context.lineWidth = 2;
          context.shadowBlur = 10;
          context.shadowColor = '#ffffff';
        }
        
        context.beginPath();
        context.moveTo(this.x, this.y);
        context.lineTo(
          this.x - Math.cos(this.angle) * this.length,
          this.y - Math.sin(this.angle) * this.length
        );
        context.stroke();
        context.restore();
      }
    }

    // Create stars
    const stars: Star[] = [];
    for (let i = 0; i < 200; i++) {
      stars.push(new Star());
    }

    // Create shooting stars
    const shootingStars: ShootingStar[] = [];
    let shootingStarTimer = 0;
    const addShootingStar = () => {
      shootingStarTimer++;
      // Add a shooting star every 3-5 seconds (roughly)
      if (shootingStarTimer > 180 && Math.random() > 0.98) {
        shootingStars.push(new ShootingStar());
        shootingStarTimer = 0;
      }
    };

    // Animation loop
    let animationId: number;
    const animate = () => {
      context.fillStyle = 'rgba(10, 10, 10, 0.1)';
      context.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw stars
      stars.forEach((star) => {
        star.update();
        star.draw();
      });

      // Add new shooting stars randomly
      addShootingStar();

      // Update and draw shooting stars
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const star = shootingStars[i];
        if (!star.update()) {
          shootingStars.splice(i, 1);
        } else {
          star.draw();
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

  if (theme !== 'dark') return null;

  return (
    <StarfieldContainer>
      <Canvas ref={canvasRef} />
    </StarfieldContainer>
  );
};

