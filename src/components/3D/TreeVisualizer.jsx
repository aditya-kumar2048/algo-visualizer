import React from 'react';
import { useStore } from '../../store/useStore';
import { useSpring, a } from '@react-spring/three';
import { Html, Line } from '@react-three/drei';

const TreeNode = ({ nodeData, tree }) => {
  const { frame, status, value, x, y, parentId } = nodeData;
  const parent = tree.find(n => n.id === parentId);

  const { position, color } = useSpring({
    position: [x, y, 0],
    color: status === 'returned' ? '#22c55e' : '#3b82f6',
    config: { mass: 1, tension: 200, friction: 20 }
  });

  return (
    <group>
      {/* Draw edge to parent if it exists */}
      {parent && (
        <Line 
          points={[[parent.x, parent.y - 0.5, 0], [x, y + 0.5, 0]]} 
          color="white" 
          lineWidth={2}
          transparent
          opacity={0.5}
        />
      )}
      
      {/* Node Body */}
      <a.mesh position={position} castShadow receiveShadow>
        <boxGeometry args={[1.5, 1, 0.5]} />
        <a.meshStandardMaterial color={color} roughness={0.2} metalness={0.1} />
        <Html center position={[0, 0, 0.3]}>
          <div className="bg-black/80 text-white text-[10px] font-bold px-2 py-1 rounded backdrop-blur-md whitespace-nowrap border border-white/20 select-none pointer-events-none drop-shadow-lg">
            {frame} {status === 'returned' && value !== null ? ` = ${value}` : ''}
          </div>
        </Html>
      </a.mesh>
    </group>
  );
};

export const TreeVisualizer = () => {
  const recursionTree = useStore((state) => state.recursionTree);

  if (!recursionTree || recursionTree.length === 0) return null;

  return (
    <group position={[0, 12, 0]}>
      {recursionTree.map((node) => (
        <TreeNode key={node.id} nodeData={node} tree={recursionTree} />
      ))}
    </group>
  );
};
