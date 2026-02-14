'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useAnimationFrame } from '@/hooks/useAnimationFrame';
import { useMousePosition } from '@/hooks/useMousePosition';

interface Particle {
  x: number;
  y: number;
  z: number; // 0 (far) to 1 (near) for depth
  vx: number;
  vy: number;
  size: number;
}

interface NeuralNetworkBackgroundProps {
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
}

export default function NeuralNetworkBackground({
  className = '',
  intensity = 'medium',
}: NeuralNetworkBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isClient, setIsClient] = useState(false);

  // Detect reduced motion preference
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    setIsClient(true);
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Detect mobile
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  // Mouse position for parallax (desktop only)
  const mousePosition = useMousePosition(!isMobile && !reducedMotion);

  // Configuration based on intensity and device
  const config = {
    particleCount: isMobile ? 40 : intensity === 'low' ? 60 : intensity === 'high' ? 120 : 80,
    connectionDistance: isMobile ? 120 : 150,
    particleSpeed: reducedMotion ? 0 : isMobile ? 0.3 : 0.5,
    parallaxStrength: isMobile ? 0 : 15,
    maxConnections: isMobile ? 3 : 4,
  };

  // Initialize particles
  const initParticles = useCallback(() => {
    if (!dimensions.width || !dimensions.height) return;

    particlesRef.current = Array.from({ length: config.particleCount }, () => ({
      x: Math.random() * dimensions.width,
      y: Math.random() * dimensions.height,
      z: Math.random(), // 0 = far, 1 = near
      vx: (Math.random() - 0.5) * config.particleSpeed,
      vy: (Math.random() - 0.5) * config.particleSpeed,
      size: 2 + Math.random() * 2.5, // 2-4.5px (orta boyut)
    }));
  }, [dimensions, config.particleCount, config.particleSpeed]);

  // Handle resize with debounce
  useEffect(() => {
    if (!isClient) return;

    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();

    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateDimensions, 150);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, [isClient]);

  // Initialize particles when dimensions change
  useEffect(() => {
    initParticles();
  }, [initParticles]);

  // Animation loop
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = dimensions;
    if (!width || !height) return;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Calculate parallax offset based on mouse position
    const parallaxX = isMobile
      ? 0
      : ((mousePosition.x / width) - 0.5) * config.parallaxStrength;
    const parallaxY = isMobile
      ? 0
      : ((mousePosition.y / height) - 0.5) * config.parallaxStrength;

    const particles = particlesRef.current;

    // Update and draw particles
    particles.forEach((particle) => {
      // Update position
      if (!reducedMotion) {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges
        if (particle.x < 0 || particle.x > width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > height) particle.vy *= -1;

        // Keep in bounds
        particle.x = Math.max(0, Math.min(width, particle.x));
        particle.y = Math.max(0, Math.min(height, particle.y));
      }

      // Apply parallax based on z-depth
      const depthFactor = 0.5 + particle.z * 0.5; // 0.5 to 1.0
      const offsetX = parallaxX * depthFactor;
      const offsetY = parallaxY * depthFactor;

      const drawX = particle.x + offsetX;
      const drawY = particle.y + offsetY;

      // Calculate size and opacity based on depth
      const scale = 0.6 + particle.z * 0.4; // 0.6 to 1.0 (daha küçük)
      const size = particle.size * scale;
      const opacity = 0.55 + particle.z * 0.35; // 0.55 to 0.9 (optimize edilmiş)

      // Draw particle with light glow effect
      ctx.beginPath();
      ctx.arc(drawX, drawY, size, 0, Math.PI * 2);
      
      // Add light glow effect
      ctx.shadowBlur = 8;
      ctx.shadowColor = `rgba(59, 130, 246, ${opacity * 0.6})`;
      ctx.fillStyle = `rgba(59, 130, 246, ${opacity})`;
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    // Draw connections
    particles.forEach((particle, i) => {
      let connectionCount = 0;

      for (let j = i + 1; j < particles.length; j++) {
        if (connectionCount >= config.maxConnections) break;

        const other = particles[j];
        const dx = particle.x - other.x;
        const dy = particle.y - other.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < config.connectionDistance) {
          connectionCount++;

          // Calculate line opacity based on distance and depth
          const distanceRatio = 1 - distance / config.connectionDistance;
          const avgZ = (particle.z + other.z) / 2;
          const depthOpacity = 0.3 + avgZ * 0.4; // 0.3 to 0.7 (daha az parlak)
          const lineOpacity = distanceRatio * depthOpacity;

          // Apply parallax to connection
          const depthFactor1 = 0.5 + particle.z * 0.5;
          const depthFactor2 = 0.5 + other.z * 0.5;

          const x1 = particle.x + parallaxX * depthFactor1;
          const y1 = particle.y + parallaxY * depthFactor1;
          const x2 = other.x + parallaxX * depthFactor2;
          const y2 = other.y + parallaxY * depthFactor2;

          // Draw connection line with light glow
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.shadowBlur = 4;
          ctx.shadowColor = `rgba(59, 130, 246, ${Math.min(lineOpacity * 0.4, 1)})`;
          ctx.strokeStyle = `rgba(59, 130, 246, ${Math.min(lineOpacity, 1)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.shadowBlur = 0;
        }
      }
    });
  }, [
    dimensions,
    mousePosition,
    isMobile,
    reducedMotion,
    config.parallaxStrength,
    config.connectionDistance,
    config.maxConnections,
  ]);

  // Start animation loop
  useAnimationFrame(animate, isClient && !reducedMotion);

  // Static render for reduced motion
  useEffect(() => {
    if (reducedMotion && isClient) {
      animate();
    }
  }, [reducedMotion, isClient, animate]);

  if (!isClient) return null;

  return (
    <canvas
      ref={canvasRef}
      width={dimensions.width}
      height={dimensions.height}
      className={`fixed inset-0 pointer-events-none ${className}`}
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}
