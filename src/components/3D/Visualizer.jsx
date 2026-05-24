import React from 'react';
import { useStore } from '../../store/useStore';
import { ElementBar } from './ElementBar';

export const Visualizer = () => {
  const array = useStore((state) => state.array);
  const colors = useStore((state) => state.colors);

  return (
    <group>
      {array.map((value, index) => (
        <ElementBar 
          key={index} 
          index={index} 
          value={value} 
          stateColor={colors[index] || 'default'} 
          totalElements={array.length} 
        />
      ))}
    </group>
  );
};
