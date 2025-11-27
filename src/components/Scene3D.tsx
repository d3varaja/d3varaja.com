"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";

function FloatingParticles() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <group ref={groupRef}>
      <Stars
        radius={50}
        depth={100}
        count={1000}
        factor={2}
        saturation={0}
        fade
        speed={0.5}
      />
    </group>
  );
}

function SceneContent() {
  return (
    <>
      <color attach="background" args={["#0a0a0a"]} />
      <FloatingParticles />
    </>
  );
}

export default function Scene3D() {
  return (
    <div className="absolute inset-0 -z-10 opacity-40">
      <Canvas camera={{ position: [0, 0, 1], fov: 75 }}>
        <SceneContent />
      </Canvas>
    </div>
  );
}
