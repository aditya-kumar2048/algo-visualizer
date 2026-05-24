import React from 'react';
import { useStore } from '../../store/useStore';
import { useSpring, a } from '@react-spring/three';
import { Html } from '@react-three/drei';

const colorMap = {
  default: '#1f2937', // dark gray
  dependency: '#eab308', // yellow
  computing: '#3b82f6', // blue
  computed: '#22c55e' // green
};

const GridCell = ({ value, state, row, col, rows, cols }) => {
  // Center the grid around origin
  const spacing = 1.2;
  const offsetX = (cols * spacing) / 2 - (spacing / 2);
  const offsetZ = (rows * spacing) / 2 - (spacing / 2);

  const { color, scale } = useSpring({
    color: colorMap[state] || colorMap.default,
    scale: state === 'computing' ? [1.1, 1.2, 1.1] : [1, 1, 1],
    config: { mass: 1, tension: 200, friction: 20 }
  });

  return (
    <a.group position={[col * spacing - offsetX, 0, row * spacing - offsetZ]}>
      <a.mesh scale={scale} castShadow receiveShadow>
        <boxGeometry args={[1, 0.2, 1]} />
        <a.meshStandardMaterial color={color} roughness={0.2} metalness={0.1} />
        {value > 0 && (
          <Html center position={[0, 0.3, 0]}>
            <div className="text-white text-xs font-bold select-none pointer-events-none drop-shadow-md">
              {value}
            </div>
          </Html>
        )}
      </a.mesh>
    </a.group>
  );
};

export const GridVisualizer = () => {
  const grid = useStore((state) => state.grid);

  if (!grid || grid.length === 0) return null;

  const rows = grid.length;
  const cols = grid[0].length;

  return (
    <group position={[0, 4, 0]}>
      {grid.map((rowArr, rowIndex) => 
        rowArr.map((cell, colIndex) => (
          <GridCell 
            key={`${rowIndex}-${colIndex}`} 
            value={cell.value} 
            state={cell.state} 
            row={rowIndex} 
            col={colIndex} 
            rows={rows} 
            cols={cols} 
          />
        ))
      )}
    </group>
  );
};
