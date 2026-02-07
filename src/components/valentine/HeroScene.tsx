import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

function HeartMesh({ position, scale, color, speed }: { position: [number, number, number]; scale: number; color: string; speed: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  const heartShape = useMemo(() => {
    const s = new THREE.Shape();
    const x = 0, y = 0;
    s.moveTo(x + 0.25, y + 0.25);
    s.bezierCurveTo(x + 0.25, y + 0.25, x + 0.2, y, x, y);
    s.bezierCurveTo(x - 0.3, y, x - 0.3, y + 0.35, x - 0.3, y + 0.35);
    s.bezierCurveTo(x - 0.3, y + 0.55, x - 0.1, y + 0.77, x + 0.25, y + 0.95);
    s.bezierCurveTo(x + 0.6, y + 0.77, x + 0.8, y + 0.55, x + 0.8, y + 0.35);
    s.bezierCurveTo(x + 0.8, y + 0.35, x + 0.8, y, x + 0.5, y);
    s.bezierCurveTo(x + 0.35, y, x + 0.25, y + 0.25, x + 0.25, y + 0.25);
    return s;
  }, []);

  const geometry = useMemo(() => {
    return new THREE.ExtrudeGeometry(heartShape, {
      depth: 0.15,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.05,
      bevelSegments: 3,
    });
  }, [heartShape]);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * speed * 0.5;
      meshRef.current.rotation.x += delta * speed * 0.2;
    }
  });

  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={2} floatingRange={[-0.5, 0.5]}>
      <mesh ref={meshRef} position={position} scale={scale} geometry={geometry}>
        <meshStandardMaterial color={color} metalness={0.3} roughness={0.4} />
      </mesh>
    </Float>
  );
}

function Hearts() {
  const hearts = useMemo(() => {
    const colors = ['#a0525c', '#c9917a', '#d4a0a0', '#8b3a4a', '#dbb199'];
    return Array.from({ length: 18 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 6 - 2,
      ] as [number, number, number],
      scale: Math.random() * 0.4 + 0.15,
      color: colors[i % colors.length],
      speed: Math.random() * 1.5 + 0.5,
    }));
  }, []);

  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#ffd6e0" />
      <pointLight position={[-5, -3, 3]} intensity={0.5} color="#c9917a" />
      {hearts.map((props, i) => (
        <HeartMesh key={i} {...props} />
      ))}
    </>
  );
}

const HeroScene = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 6], fov: 60 }} style={{ background: 'transparent' }}>
        <Hearts />
      </Canvas>
    </div>
  );
};

export default HeroScene;
