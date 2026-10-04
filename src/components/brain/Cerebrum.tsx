'use client';
import { useRef, useMemo, useState } from 'react';
import { Mesh, IcosahedronGeometry, Color, ShaderMaterial } from 'three';
import { applyBrainDisplacement } from '../../lib/brainGeometry';
import { BrainRegion } from '../../types';

interface Props {
  onSelect?: (region: BrainRegion) => void;
  isInteractive?: boolean;
  selectedRegion?: BrainRegion | null;
}

export default function Cerebrum({ onSelect, isInteractive = true, selectedRegion }: Props) {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const geometry = useMemo(() => {
    const geo = new IcosahedronGeometry(1.0, 64);
    applyBrainDisplacement(geo, 1.5, 4, 0.15);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      let x = pos.getX(i);
      if (Math.abs(x) < 0.1) {
        const factor = Math.abs(x) * 10;
        pos.setX(i, x * factor);
      }
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  const isSelected = selectedRegion === 'frontal' || selectedRegion === 'parietal' || selectedRegion === 'temporal' || selectedRegion === 'occipital';

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      onClick={(e) => {
        if (!isInteractive) return;
        e.stopPropagation();
        onSelect?.('frontal' as BrainRegion);
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
      position={[0, 0.5, 0]}
    >
      <meshStandardMaterial 
        color={isSelected ? new Color('#E8A33D') : (hovered ? new Color('#5AC8FA') : new Color('#2C3E50'))} 
        roughness={0.6}
        metalness={0.1}
        emissive={isSelected ? new Color('#E8A33D') : (hovered ? new Color('#5AC8FA') : new Color('#000000'))}
        emissiveIntensity={isSelected ? 0.6 : (hovered ? 0.4 : 0)}
      />
    </mesh>
  );
}
