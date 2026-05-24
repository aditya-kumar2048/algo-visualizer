import React from 'react';
import { useStore } from '../../store/useStore';

export const ArrayDisplay = () => {
  const array = useStore((state) => state.array);
  const colors = useStore((state) => state.colors);

  // Map state colors to Tailwind text colors
  const getTextColor = (stateColor) => {
    switch(stateColor) {
      case 'comparing': return 'text-yellow-400 font-bold';
      case 'swapping': return 'text-red-400 font-bold';
      case 'sorted': return 'text-green-400';
      case 'found': return 'text-purple-400 font-black text-lg bg-purple-500/20 px-2 rounded';
      default: return 'text-blue-200';
    }
  };

  return (
    <div className="glass-panel px-6 py-3 flex gap-2 items-center overflow-x-auto max-w-[800px] pointer-events-auto">
      <span className="text-sm text-gray-400 mr-2 whitespace-nowrap font-medium">Array:</span>
      {array.map((val, idx) => (
        <span 
          key={idx} 
          className={`text-sm transition-colors duration-200 ${getTextColor(colors[idx])}`}
        >
          {val}{idx < array.length - 1 ? ',' : ''}
        </span>
      ))}
    </div>
  );
};
