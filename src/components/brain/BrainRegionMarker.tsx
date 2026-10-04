'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, Vector3 } from 'three';
import { BrainRegion } from '../../types';

interface Props {
  region: BrainRegion;
  position: [number, number, number];
  scale?: [number, number, number];
  onSelect?: (region: BrainRegion) => void;
  isInteractive?: boolean;
  selectedRegion?: BrainRegion | null;
  geometryType?: 'sphere' | 'capsule' | 'box';
  opacity?: number;
}

export default function BrainRegionMarker({
  region,
  position,
  scale = [1, 1, 1],
  onSelect,
  isInteractive = true,
  selectedRegion,
  geometryType = 'sphere',
  opacity = 0.3
}: Props) {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Animation for hovering (pulsing effect)
  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    
    // Slight float/pulse if active
    const t = clock.getElapsedTime();
    if (hovered || selectedRegion === region) {
      const pulseScale = 1 + Math.sin(t * 3) * 0.05;
      meshRef.current.scale.set(
        scale[0] * pulseScale,
        scale[1] * pulseScale,
        scale[2] * pulseScale
      );
    } else {
      // Return to base scale smoothly
      meshRef.current.scale.lerp(new Vector3(...scale), 0.1);
    }
  });

  const isSelected = selectedRegion === region;
  
  // --cyan: #5AC8FA
  // --amber: #E8A33D
  const baseColor = '#5AC8FA';
  const selectedColor = '#E8A33D';
  
  const currentColor = isSelected ? selectedColor : baseColor;
  const currentOpacity = isSelected ? 0.8 : (hovered ? 0.6 : opacity);

  return (
    <mesh
      ref={meshRef}
      position={position}
      scale={scale}
      onClick={(e) => {
        if (!isInteractive) return;
        e.stopPropagation();
        if (onSelect) onSelect(region);
      }}
      onPointerOver={(e) => {
        if (!isInteractive) return;
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={(e) => {
        if (!isInteractive) return;
        setHovered(false);
        document.body.style.cursor = 'auto';
      }}
    >
      {geometryType === 'sphere' && <sphereGeometry args={[1, 32, 32]} />}
      {geometryType === 'capsule' && <capsuleGeometry args={[1, 2, 4, 16]} />}
      {geometryType === 'box' && <boxGeometry args={[1, 1, 1]} />}
      
      <meshStandardMaterial
        color={currentColor}
        emissive={currentColor}
        emissiveIntensity={isSelected ? 0.8 : (hovered ? 0.5 : 0.2)}
        transparent
        opacity={currentOpacity}
        wireframe={!isSelected && !hovered && geometryType === 'sphere' && region === 'meninges'}
        depthWrite={false}
      />
    </mesh>
  );
}
