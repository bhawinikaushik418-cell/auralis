import { useMemo, useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const SPHERE_RADIUS = 2.4;

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return isMobile;
}

export default function ParticleSphere() {
  const meshRef = useRef<THREE.Points>(null);
  const { viewport } = useThree();
  const isMobile = useIsMobile();
  const particleCount = isMobile ? 1200 : 2500;

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colorA = new THREE.Color('#00d4ff');
    const colorB = new THREE.Color('#00ffc8');
    const colorC = new THREE.Color('#22e9ff');

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = SPHERE_RADIUS * (0.92 + Math.random() * 0.08);

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      const t = Math.random();
      const color = t < 0.33 ? colorA : t < 0.66 ? colorB : colorC;
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    return { positions, colors };
  }, [particleCount]);

  const shaderMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uMouse: { value: new THREE.Vector2(0, 0) },
        },
        vertexShader: `
          uniform float uTime;
          uniform vec2 uMouse;
          varying vec3 vColor;
          varying float vDistance;

          void main() {
            vColor = color;
            vec3 pos = position;

            float wave = sin(uTime * 0.8 + pos.y * 2.0) * 0.05;
            pos += normalize(pos) * wave;

            vec3 mouseInfluence = vec3(uMouse.x, uMouse.y, 0.0) * 0.15;
            pos += mouseInfluence * (1.0 - abs(pos.z) / ${SPHERE_RADIUS.toFixed(1)});

            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            vDistance = -mvPosition.z;
            gl_PointSize = 3.0 * (300.0 / vDistance);
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          varying vec3 vColor;
          varying float vDistance;

          void main() {
            vec2 uv = gl_PointCoord - 0.5;
            float dist = length(uv);
            if (dist > 0.5) discard;

            float alpha = smoothstep(0.5, 0.0, dist);
            float depthFade = smoothstep(8.0, 2.0, vDistance);
            gl_FragColor = vec4(vColor, alpha * depthFade * 0.9);
          }
        `,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexColors: true,
      }),
    []
  );

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    shaderMaterial.uniforms.uTime.value = t;

    const targetX = (state.pointer.x * viewport.width) / 8;
    const targetY = (state.pointer.y * viewport.height) / 8;
    shaderMaterial.uniforms.uMouse.value.x = targetX;
    shaderMaterial.uniforms.uMouse.value.y = targetY;

    meshRef.current.rotation.y = t * 0.08 + state.pointer.x * 0.3;
    meshRef.current.rotation.x = state.pointer.y * 0.2;
  });

  return (
    <points ref={meshRef} material={shaderMaterial}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
    </points>
  );
}
