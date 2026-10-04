'use client';
import { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, Html } from '@react-three/drei';
import ProceduralBrain from './ProceduralBrain';
import { BrainRegion } from '../../types';

interface BrainSceneProps {
  interactive?: boolean;
  selectedRegion?: BrainRegion | null;
  onRegionSelect?: (region: BrainRegion) => void;
  autoRotate?: boolean;
}

export default function BrainScene({ 
  interactive = true, 
  selectedRegion = null, 
  onRegionSelect, 
  autoRotate = false 
}: BrainSceneProps) {
  const [internalInteractive, setInternalInteractive] = useState(false);

  const handleSelect = (region: BrainRegion) => {
    if (onRegionSelect) onRegionSelect(region);
  };

  return (
    <div 
      className="w-full h-full min-h-[500px] bg-[#0A0E17] relative"
      onPointerDown={() => setInternalInteractive(true)}
      onPointerLeave={() => setInternalInteractive(false)}
    >
      {selectedRegion && (
        <div className="absolute top-4 left-4 z-10 text-[#E8EDF4] bg-[#121826] p-4 rounded shadow-lg border border-[#1A2236]">
          <h2 className="text-xl font-bold text-[#5AC8FA]">{selectedRegion}</h2>
        </div>
      )}
      <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
        <color attach="background" args={['#0A0E17']} />
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Suspense fallback={<Html center><div className="text-[#8A96AC]">Loading 3D Brain...</div></Html>}>
          <ProceduralBrain 
            onSelect={handleSelect} 
            isInteractive={interactive || internalInteractive} 
            selectedRegion={selectedRegion}
          />
          <Environment preset="city" />
        </Suspense>
        <OrbitControls 
          enablePan={false} 
          minDistance={2} 
          maxDistance={10} 
          onStart={() => setInternalInteractive(true)}
          onEnd={() => setInternalInteractive(false)}
          autoRotate={autoRotate}
          autoRotateSpeed={1.0}
        />
      </Canvas>
    </div>
  );
}
