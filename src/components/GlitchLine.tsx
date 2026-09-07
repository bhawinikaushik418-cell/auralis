import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const SEGMENTS = 80;
const RADIUS = 2.4;

export default function GlitchLine() {
  const glitchTimer = useRef(0);
  const isGlitching = useRef(false);
  const glitchIntensity = useRef(0);

  const basePoints = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= SEGMENTS; i++) {
      const t = (i / SEGMENTS) * Math.PI * 2;
      pts.push(
        new THREE.Vector3(
          Math.cos(t) * RADIUS * 1.02,
          Math.sin(t * 3) * 0.15,
          Math.sin(t) * RADIUS * 1.02
        )
      );
    }
    return pts;
  }, []);

  const lineObject = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array((SEGMENTS + 1) * 3);
    basePoints.forEach((p, i) => {
      positions[i * 3] = p.x;
      positions[i * 3 + 1] = p.y;
      positions[i * 3 + 2] = p.z;
    });
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const mat = new THREE.LineBasicMaterial({
      color: new THREE.Color('#00ffc8'),
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });

    return new THREE.Line(geo, mat);
  }, [basePoints]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    glitchTimer.current += 0.016;
    if (!isGlitching.current && glitchTimer.current > 3 + Math.random() * 4) {
      isGlitching.current = true;
      glitchTimer.current = 0;
    }
    if (isGlitching.current) {
      glitchIntensity.current =
        Math.sin(glitchTimer.current * 20) * Math.max(0, 1 - glitchTimer.current * 1.5);
      if (glitchTimer.current > 0.6) {
        isGlitching.current = false;
        glitchIntensity.current = 0;
        glitchTimer.current = 0;
      }
    }

    const posAttr = lineObject.geometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i <= SEGMENTS; i++) {
      const base = basePoints[i];
      const wave = Math.sin(t * 0.5 + i * 0.15) * 0.04;
      const glitch = isGlitching.current
        ? (Math.random() - 0.5) * glitchIntensity.current * 0.4
        : 0;
      posAttr.setXYZ(i, base.x, base.y + wave + glitch, base.z + glitch * 0.5);
    }
    posAttr.needsUpdate = true;

    lineObject.rotation.y = t * 0.08;
    lineObject.rotation.z = t * 0.03;

    const mat = lineObject.material as THREE.LineBasicMaterial;
    mat.opacity = 0.5 + Math.sin(t * 1.5) * 0.15 + (isGlitching.current ? 0.3 : 0);
  });

  return <primitive object={lineObject} />;
}
