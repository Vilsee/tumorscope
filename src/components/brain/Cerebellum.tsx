'use client';
import { useRef, useMemo, useState } from 'react';
import { Mesh, IcosahedronGeometry, Color } from 'three';
import { applyBrainDisplacement } from '../../lib/brainGeometry';
import { BrainRegion } from '../../types';

interface Props {
  onSelect?: (region: BrainRegion) => void;
  isInteractive?: boolean;
  selectedRegion?: BrainRegion | null;
}

export default function Cerebellum({ onSelect, isInteractive = true, selectedRegion }: Props) {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const geometry = useMemo(() => {
    const geo = new IcosahedronGeometry(0.48, 48);
    applyBrainDisplacement(geo, 4.0, 4, 0.08);
    return geo;
  }, []);

  const isSelected = selectedRegion === 'cerebellum';

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      position={[0, -0.6, -0.8]}
      onClick={(e) => {
        if (!isInteractive) return;
        e.stopPropagation();
        onSelect?.('cerebellum' as BrainRegion);
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
        color={isSelected ? new Color('#E8A33D') : (hovered ? new Color('#5AC8FA') : new Color('#E8EDF4'))} 
        roughness={0.7}
        metalness={0.1}
        emissive={isSelected ? new Color('#E8A33D') : (hovered ? new Color('#5AC8FA') : new Color('#000000'))}
        emissiveIntensity={isSelected ? 0.8 : (hovered ? 0.4 : 0)}
      />
    </mesh>
  );
}
