import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

export default function DistortBlob() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();
  const targetRotation = useRef(new THREE.Vector2(0, 0));

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    const targetX = (state.pointer.y * viewport.height) / 6;
    const targetY = (state.pointer.x * viewport.width) / 6;

    targetRotation.current.x += (targetX - targetRotation.current.x) * Math.min(delta * 2.5, 0.1);
    targetRotation.current.y += (targetY - targetRotation.current.y) * Math.min(delta * 2.5, 0.1);

    meshRef.current.rotation.x = targetRotation.current.x;
    meshRef.current.rotation.y = targetRotation.current.y + state.clock.elapsedTime * 0.15;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]} scale={1.6}>
      <icosahedronGeometry args={[1, 12]} />
      <MeshDistortMaterial
        color="#00b8d4"
        emissive="#00ffc8"
        emissiveIntensity={0.18}
        roughness={0.05}
        metalness={0.9}
        transparent
        opacity={0.72}
        distort={0.35}
        speed={1.5}
        envMapIntensity={1.2}
      />
    </mesh>
  );
}
