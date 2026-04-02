"use client";

import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import * as THREE from "three";

function Scene() {
  const groupRef = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  useFrame((state) => {
    mouse.current.x += (state.pointer.x * 0.08 - mouse.current.x) * 0.03;
    mouse.current.y += (state.pointer.y * 0.04 - mouse.current.y) * 0.03;
    if (groupRef.current) {
      groupRef.current.rotation.y = mouse.current.x;
      groupRef.current.rotation.x = -mouse.current.y;
    }
  });

  const gold = new THREE.MeshStandardMaterial({ color: "#C9A96E", metalness: 0.8, roughness: 0.2 });
  const dark = new THREE.MeshStandardMaterial({ color: "#1a1a1a", metalness: 0.1, roughness: 0.8 });
  const wall = new THREE.MeshStandardMaterial({ color: "#2a2a2f", metalness: 0, roughness: 0.9 });
  const wood = new THREE.MeshStandardMaterial({ color: "#3a2e24", metalness: 0, roughness: 0.7 });

  return (
    <group ref={groupRef}>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.2, 0]} material={wood}>
        <planeGeometry args={[6, 4]} />
      </mesh>
      {/* Back wall */}
      <mesh position={[0, 0.3, -2]} material={wall}>
        <planeGeometry args={[6, 3]} />
      </mesh>
      {/* Sofa */}
      <group position={[-1.2, -0.7, -0.5]}>
        <mesh material={dark}><boxGeometry args={[1.8, 0.5, 0.7]} /></mesh>
        <mesh position={[0, 0.35, -0.3]} material={dark}><boxGeometry args={[1.8, 0.4, 0.15]} /></mesh>
      </group>
      {/* Table */}
      <Float speed={1} rotationIntensity={0} floatIntensity={0.05}>
        <mesh position={[0.8, -0.85, 0]} material={gold}>
          <cylinderGeometry args={[0.25, 0.25, 0.08, 32]} />
        </mesh>
        <mesh position={[0.8, -0.55, 0]} material={gold}>
          <cylinderGeometry args={[0.02, 0.02, 0.55, 8]} />
        </mesh>
      </Float>
      {/* Lamp pendant */}
      <Float speed={0.5} floatIntensity={0.1}>
        <mesh position={[-1.2, 1.0, -0.5]} material={gold}>
          <coneGeometry args={[0.15, 0.2, 16]} />
        </mesh>
        <pointLight position={[-1.2, 0.8, -0.5]} intensity={0.4} color="#D4764B" distance={3} />
      </Float>
      {/* Gold frame on wall */}
      <mesh position={[1.2, 0.3, -1.95]} material={gold}>
        <boxGeometry args={[0.8, 0.6, 0.02]} />
      </mesh>
      <mesh position={[1.2, 0.3, -1.93]} material={dark}>
        <boxGeometry args={[0.7, 0.5, 0.02]} />
      </mesh>
      {/* Ambient orb */}
      <Float speed={2} floatIntensity={0.2}>
        <mesh position={[2, 0.5, -1]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial color="#D4764B" emissive="#D4764B" emissiveIntensity={2} />
        </mesh>
      </Float>
    </group>
  );
}

export default function Room3D({ className = "" }: { className?: string }) {
  return (
    <div className={`h-full w-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0.2, 2.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[3, 3, 2]} intensity={0.5} />
        <pointLight position={[0, 2, 0]} intensity={0.2} color="#C9A96E" />
        <Scene />
        <Environment preset="apartment" environmentIntensity={0.15} />
      </Canvas>
    </div>
  );
}
