import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei';
import { Visualizer } from './Visualizer';
import { TreeVisualizer } from './TreeVisualizer';
import { GridVisualizer } from './GridVisualizer';
import { useStore } from '../../store/useStore';

export const Scene = () => {
  const visualizationMode = useStore((state) => state.visualizationMode);

  return (
    <div className="w-full h-full absolute inset-0 z-0">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 10, 30]} fov={50} />
        <OrbitControls 
          makeDefault
          enablePan={false} 
          minDistance={10} 
          maxDistance={50} 
          maxPolarAngle={Math.PI / 2 - 0.1} 
        />
        
        <ambientLight intensity={0.4} />
        <directionalLight 
          position={[10, 20, 10]} 
          intensity={1} 
          castShadow 
          shadow-mapSize-width={2048} 
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-10, 10, -10]} intensity={0.5} color="#3b82f6" />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#8b5cf6" />
        
        <Environment preset="city" />
        <group position={[0, -4, 0]}>
          {visualizationMode === '1D_ARRAY' && <Visualizer />}
          {visualizationMode === 'CALL_STACK' && <TreeVisualizer />}
          {visualizationMode === '2D_GRID' && <GridVisualizer />}
        </group>
      </Canvas>
    </div>
  );
};
