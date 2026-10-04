'use client';
import { useRef, useMemo, useState } from 'react';
import { Mesh, CapsuleGeometry, Color } from 'three';
import { BrainRegion } from '../../types';

interface Props {
  onSelect?: (region: BrainRegion) => void;
  isInteractive?: boolean;
  selectedRegion?: BrainRegion | null;
}

export default function Brainstem({ onSelect, isInteractive = true, selectedRegion }: Props) {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const geometry = useMemo(() => {
    const geo = new CapsuleGeometry(0.2, 0.6, 16, 32);
    return geo;
  }, []);

  const isSelected = selectedRegion === 'brainstem';

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      position={[0, -0.8, -0.2]}
      rotation={[0.2, 0, 0]}
      onClick={(e) => {
        if (!isInteractive) return;
        e.stopPropagation();
        onSelect?.('brainstem' as BrainRegion);
      }}
      onPointerOver={(e) => {
        if (!isInteractive) return;
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        if (!isInteractive) return;
        setHovered(false);
        document.body.style.cursor = 'auto';
      }}
    >
      <meshStandardMaterial 
        color={isSelected ? new Color('#E8A33D') : (hovered ? new Color('#5AC8FA') : new Color('#2D7DD2'))} 
        roughness={0.4}
        metalness={0.2}
        emissive={isSelected ? new Color('#E8A33D') : (hovered ? new Color('#5AC8FA') : new Color('#000000'))}
        emissiveIntensity={isSelected ? 0.8 : (hovered ? 0.4 : 0)}
      />
    </mesh>
  );
}
