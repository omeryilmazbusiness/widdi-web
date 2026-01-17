'use client';

import { useRef, Suspense, useMemo } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import Hero3DLoader from './Hero3DLoader';

// Hollywood-grade starfield with depth and variation
function Starfield() {
  const starsRef = useRef<THREE.Points>(null);
  
  const starGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const starCount = 15000;
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);
    const sizes = new Float32Array(starCount);
    
    for (let i = 0; i < starCount; i++) {
      const radius = 80 + Math.random() * 250;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
      
      // Realistic stellar classification colors
      const temp = Math.random();
      if (temp > 0.98) {
        colors[i * 3] = 0.6;
        colors[i * 3 + 1] = 0.7;
        colors[i * 3 + 2] = 1.0;
      } else if (temp > 0.95) {
        colors[i * 3] = 1.0;
        colors[i * 3 + 1] = 1.0;
        colors[i * 3 + 2] = 1.0;
      } else if (temp < 0.03) {
        colors[i * 3] = 1.0;
        colors[i * 3 + 1] = 0.6;
        colors[i * 3 + 2] = 0.5;
      } else if (temp < 0.08) {
        colors[i * 3] = 1.0;
        colors[i * 3 + 1] = 0.8;
        colors[i * 3 + 2] = 0.6;
      } else {
        colors[i * 3] = 0.95 + Math.random() * 0.05;
        colors[i * 3 + 1] = 0.95 + Math.random() * 0.05;
        colors[i * 3 + 2] = 0.9 + Math.random() * 0.1;
      }
      
      sizes[i] = Math.random() * 1.5 + 0.4;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    
    return geometry;
  }, []);
  
  useFrame(() => {
    if (starsRef.current) {
      starsRef.current.rotation.y += 0.00003;
      starsRef.current.rotation.x += 0.00001;
    }
  });
  
  return (
    <points ref={starsRef} geometry={starGeometry}>
      <pointsMaterial
        size={0.12}
        vertexColors
        transparent
        opacity={1.0}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// Professional Earth with SGI-level realism - OPTIMIZED
function Earth() {
  const meshRef = useRef<THREE.Mesh>(null);

  // Use smaller texture files for better performance
  const earthColorMap = useLoader(THREE.TextureLoader, '/textures/earth-color.jpg');
  const earthBumpMap = useLoader(THREE.TextureLoader, '/textures/earth-specular.jpg');
  
  [earthColorMap, earthBumpMap].forEach(texture => {
    texture.anisotropy = 16;
    texture.generateMipmaps = true;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.colorSpace = THREE.SRGBColorSpace;
  });

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.0008;
    }
  });

  // Turkey: 39°N, 35°E
  // Arabian Peninsula: 24°N, 45°E
  // Average center: ~32°N, 40°E
  
  // Longitude: Show 40°E facing camera
  const centerLongitude = -((40 / 360) * Math.PI * 2); // -0.698 radians
  
  // Latitude: Tilt more south to show more stars
  const northTilt = 0.15; // Reduced from 0.25 to show more south and reveal more stars

  return (
    <Sphere 
      ref={meshRef} 
      args={[1, 256, 256]} 
      scale={3.4}
      rotation={[northTilt, centerLongitude, 0]}
    >
      <meshStandardMaterial
        map={earthColorMap}
        bumpMap={earthBumpMap}
        bumpScale={0.003}
        roughness={0.85}
        metalness={0.05}
      />
    </Sphere>
  );
}

function LoadingFallback() {
  return (
    <mesh>
      <sphereGeometry args={[3.4, 64, 64]} />
      <meshStandardMaterial 
        color="#0a2540"
        roughness={0.8}
        metalness={0.2}
        emissive="#1a4d7a"
        emissiveIntensity={0.2}
      />
    </mesh>
  );
}

export default function Hero3D() {
  return (
    <div className="w-full h-full bg-black">
      <Suspense fallback={<Hero3DLoader />}>
        <Canvas 
          camera={{ 
            position: [0, 0, 8.5], 
            fov: 42,
            near: 0.1,
            far: 1000
          }}
          gl={{ 
            antialias: true,
            alpha: false,
            powerPreference: 'high-performance',
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.15,
            outputColorSpace: THREE.SRGBColorSpace
          }}
          dpr={[1, 2]}
          performance={{ min: 0.5 }}
        >
          <color attach="background" args={['#000000']} />
          
          {/* Realistic sun lighting - one side bright, other side dark */}
          
          {/* Main sun light - strong from right side */}
          <directionalLight 
            position={[15, 2, 5]} 
            intensity={8.0} 
            color="#ffffff"
          />
          
          {/* Minimal ambient - only to show dark side slightly */}
          <ambientLight intensity={0.08} color="#1a1a2e" />
          
          {/* Very subtle fill from dark side - just enough to see landmasses */}
          <directionalLight 
            position={[-8, 1, -3]} 
            intensity={0.25} 
            color="#2d3d5c"
          />
          
          <Starfield />
          
          <Suspense fallback={<LoadingFallback />}>
            <Earth />
          </Suspense>
          
          <OrbitControls 
            enableZoom={false} 
            autoRotate={false}
            enablePan={false}
            minPolarAngle={Math.PI / 2.5}
            maxPolarAngle={Math.PI / 2.5}
            enableDamping
            dampingFactor={0.05}
            rotateSpeed={0.4}
          />
        </Canvas>
      </Suspense>
    </div>
  );
}
