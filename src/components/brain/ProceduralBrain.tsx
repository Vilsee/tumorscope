'use client';
import { useRef } from 'react';
import { Group } from 'three';
import { useFrame } from '@react-three/fiber';
import Cerebrum from './Cerebrum';
import Cerebellum from './Cerebellum';
import Brainstem from './Brainstem';
import BrainRegionMarker from './BrainRegionMarker';
import { BrainRegion } from '../../types';

interface Props {
  onSelect?: (region: BrainRegion) => void;
  isInteractive?: boolean;
  selectedRegion?: BrainRegion | null;
}

export default function ProceduralBrain({ onSelect, isInteractive = false, selectedRegion = null }: Props) {
  const groupRef = useRef<Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current && !isInteractive) {
      groupRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      <Cerebrum onSelect={onSelect} isInteractive={isInteractive} selectedRegion={selectedRegion} />
      <Cerebellum onSelect={onSelect} isInteractive={isInteractive} selectedRegion={selectedRegion} />
      <Brainstem onSelect={onSelect} isInteractive={isInteractive} selectedRegion={selectedRegion} />
      
      <BrainRegionMarker
        region="meninges"
        position={[0, 0, 0]}
        scale={[1.9, 1.9, 1.9]}
        geometryType="sphere"
        opacity={0.05}
        onSelect={onSelect}
        isInteractive={isInteractive}
        selectedRegion={selectedRegion}
      />
      <BrainRegionMarker
        region="ventricles"
        position={[0, -0.2, 0]}
        scale={[0.4, 0.4, 0.6]}
        geometryType="capsule"
        opacity={0.3}
        onSelect={onSelect}
        isInteractive={isInteractive}
        selectedRegion={selectedRegion}
      />
      <BrainRegionMarker
        region="sellar"
        position={[0, -1.2, 0.8]}
        scale={[0.2, 0.2, 0.2]}
        geometryType="sphere"
        opacity={0.5}
        onSelect={onSelect}
        isInteractive={isInteractive}
        selectedRegion={selectedRegion}
      />
      <BrainRegionMarker
        region="pineal"
        position={[0, -0.5, -0.6]}
        scale={[0.15, 0.15, 0.15]}
        geometryType="sphere"
        opacity={0.5}
        onSelect={onSelect}
        isInteractive={isInteractive}
        selectedRegion={selectedRegion}
      />
    </group>
  );
}
