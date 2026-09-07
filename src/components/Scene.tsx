import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { Environment } from '@react-three/drei';
import { EffectComposer, Noise } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import DistortBlob from './DistortBlob';

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.3} />
        <spotLight
          position={[5, 5, 5]}
          angle={0.3}
          penumbra={1}
          intensity={40}
          color="#00d4ff"
        />
        <spotLight
          position={[-5, -3, 4]}
          angle={0.4}
          penumbra={1}
          intensity={25}
          color="#00ffc8"
        />
        <DistortBlob />
        <Environment preset="city" />
        <EffectComposer>
          <Noise
            premultiply
            blendFunction={BlendFunction.SOFT_LIGHT}
            opacity={0.035}
          />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}
