import React, { useState } from 'react';
import { useSpring, a } from '@react-spring/three';
import { useThree } from '@react-three/fiber';
import { useDrag } from '@use-gesture/react';
import { Html } from '@react-three/drei';

const colorMap = {
  default: '#3b82f6', // Tailwind blue-500
  comparing: '#eab308', // Tailwind yellow-500
  swapping: '#ef4444', // Tailwind red-500
  sorted: '#22c55e', // Tailwind green-500
  found: '#c084fc', // Tailwind purple-400
};

export const ElementBar = ({ value, index, stateColor, totalElements }) => {
  const height = value / 10;
  const spacing = 1.2;
  const offsetX = (totalElements * spacing) / 2;
  const positionX = (index * spacing) - offsetX + (spacing / 2);

  const { controls, size, viewport } = useThree();
  const [isHovered, setIsHovered] = useState(false);

  const [{ dragPos }, api] = useSpring(() => ({ dragPos: [0, 0] }));

  const { position, scale, color } = useSpring({
    position: [positionX, height / 2, 0],
    scale: [1, height, 1],
    color: isHovered && stateColor === 'default' ? '#60a5fa' : (colorMap[stateColor] || colorMap.default),
    config: { mass: 1, tension: 200, friction: 20 }
  });

  const bind = useDrag(({ active, movement: [x, y], event }) => {
    if (event && event.stopPropagation) {
      event.stopPropagation();
    }
    
    // Temporarily disable OrbitControls to allow drag without spinning camera
    if (controls) {
      controls.enabled = !active;
    }

    const aspectX = viewport.width / size.width;
    const aspectY = viewport.height / size.height;
    
    api.start({
      dragPos: active ? [x * aspectX, -y * aspectY] : [0, 0],
      immediate: active,
    });

    if (active) {
      document.body.style.cursor = 'grabbing';
    } else {
      document.body.style.cursor = isHovered ? 'grab' : 'auto';
    }
  });

  return (
    <a.group position={dragPos.to((x, y) => [x, y, 0])}>
      <a.mesh 
        {...bind()}
        position={position} 
        scale={scale} 
        castShadow 
        receiveShadow
        onPointerOver={(e) => { 
          e.stopPropagation(); 
          setIsHovered(true); 
          document.body.style.cursor = 'grab'; 
        }}
        onPointerOut={(e) => { 
          setIsHovered(false); 
          document.body.style.cursor = 'auto'; 
        }}
      >
        <boxGeometry args={[1, 1, 1]} />
        <a.meshStandardMaterial color={color} roughness={0.2} metalness={0.1} />
        
        {isHovered && (
          <Html center position={[0, 0.6, 0]}>
            <div className="bg-black/80 text-white text-xs font-bold px-2 py-1 rounded shadow-lg backdrop-blur-md whitespace-nowrap select-none pointer-events-none border border-white/20">
              {value}
            </div>
          </Html>
        )}
      </a.mesh>
    </a.group>
  );
};
