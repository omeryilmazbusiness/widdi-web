'use client';

import { useEffect, useRef, useState } from 'react';

interface Node {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
}

export default function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const nodesRef = useRef<Node[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    };

    setCanvasSize();

    // Initialize nodes
    const nodeCount = window.innerWidth < 768 ? 30 : 60;
    const nodes: Node[] = [];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.clientWidth,
        y: Math.random() * canvas.clientHeight,
        z: Math.random() * 500 + 200,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        vz: (Math.random() - 0.5) * 0.5,
      });
    }

    nodesRef.current = nodes;

    // Mouse move handler (throttled)
    let mouseTimeout: NodeJS.Timeout;
    const handleMouseMove = (e: MouseEvent) => {
      if (prefersReducedMotion) return;
      clearTimeout(mouseTimeout);
      mouseTimeout = setTimeout(() => {
        mouseRef.current = { x: e.clientX, y: e.clientY };
      }, 50);
    };

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return;

      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Update and draw nodes
      nodes.forEach((node, i) => {
        // Update position (slower if reduced motion)
        const speed = prefersReducedMotion ? 0.1 : 1;
        node.x += node.vx * speed;
        node.y += node.vy * speed;
        node.z += node.vz * speed;

        // Boundary checks with bounce
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;
        if (node.z < 100 || node.z > 700) node.vz *= -1;

        // Parallax effect (subtle)
        if (!prefersReducedMotion) {
          const parallaxX = (mouseRef.current.x - width / 2) * 0.02;
          const parallaxY = (mouseRef.current.y - height / 2) * 0.02;
          node.x += parallaxX * 0.01;
          node.y += parallaxY * 0.01;
        }

        // 3D projection (simple perspective)
        const scale = 600 / (600 + node.z);
        const x2d = node.x * scale + width * (1 - scale) * 0.5;
        const y2d = node.y * scale + height * (1 - scale) * 0.5;
        const size = 2 * scale;
        const opacity = 0.3 + (1 - node.z / 700) * 0.4;

        // Draw node
        ctx.beginPath();
        ctx.arc(x2d, y2d, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, ${opacity})`;
        ctx.fill();

        // Draw connections (only to nearby nodes)
        if (!prefersReducedMotion) {
          nodes.slice(i + 1).forEach((otherNode) => {
            const dx = node.x - otherNode.x;
            const dy = node.y - otherNode.y;
            const dz = node.z - otherNode.z;
            const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
            const maxDistance = 150;

            if (distance < maxDistance) {
              const otherScale = 600 / (600 + otherNode.z);
              const otherX2d = otherNode.x * otherScale + width * (1 - otherScale) * 0.5;
              const otherY2d = otherNode.y * otherScale + height * (1 - otherScale) * 0.5;

              const lineOpacity = (1 - distance / maxDistance) * 0.15;

              ctx.beginPath();
              ctx.moveTo(x2d, y2d);
              ctx.lineTo(otherX2d, otherY2d);
              ctx.strokeStyle = `rgba(147, 51, 234, ${lineOpacity})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          });
        }
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    // Event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', setCanvasSize);

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', setCanvasSize);
      clearTimeout(mouseTimeout);
    };
  }, [prefersReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}