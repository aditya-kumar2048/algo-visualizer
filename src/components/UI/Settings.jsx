import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, X } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { resetSorting } from '../../algorithms/engine';

export const Settings = () => {
  const [isOpen, setIsOpen] = useState(true);
  
  const arraySize = useStore((state) => state.arraySize);
  const setArraySize = useStore((state) => state.setArraySize);
  const speed = useStore((state) => state.speed);
  const setSpeed = useStore((state) => state.setSpeed);
  const isSorting = useStore((state) => state.isSorting);
  const isPaused = useStore((state) => state.isPaused);
  const selectedAlgorithm = useStore((state) => state.selectedAlgorithm);

  // Auto-hide when playing
  useEffect(() => {
    if (isSorting && !isPaused) {
      setIsOpen(false);
    }
  }, [isSorting, isPaused]);

  const handleSizeChange = (e) => {
    resetSorting();
    setArraySize(Number(e.target.value));
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="glass-button p-3 pointer-events-auto w-12 h-12 flex items-center justify-center"
      >
        <SettingsIcon size={24} />
      </button>
    );
  }

  return (
    <div className="glass-panel p-4 flex flex-col gap-4 pointer-events-auto w-64 relative">
      <button 
        onClick={() => setIsOpen(false)}
        className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
      >
        <X size={20} />
      </button>

      <div>
        <h2 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-2">
          3D Visualizer
        </h2>
        <p className="text-xs text-gray-400 mb-1">Algorithm</p>
        <div className="relative">
          <select 
            className="glass-input w-full appearance-none disabled:opacity-50"
            value={selectedAlgorithm}
            onChange={(e) => {
              const algo = e.target.value;
              resetSorting();
              useStore.getState().setSelectedAlgorithm(algo);
              
              if (algo === 'Fibonacci Recursion') {
                useStore.getState().setVisualizationMode('CALL_STACK');
              } else if (algo === 'Unique Paths (DP)') {
                useStore.getState().setVisualizationMode('2D_GRID');
              } else {
                useStore.getState().setVisualizationMode('1D_ARRAY');
              }
            }}
            disabled={isSorting && !isPaused}
          >
            <optgroup label="Sorting Algorithms">
              <option value="Bubble Sort">Bubble Sort</option>
              <option value="Selection Sort">Selection Sort</option>
              <option value="Insertion Sort">Insertion Sort</option>
              <option value="Merge Sort">Merge Sort</option>
              <option value="Quick Sort">Quick Sort</option>
            </optgroup>
            <optgroup label="Searching Algorithms">
              <option value="Linear Search">Linear Search</option>
              <option value="Binary Search">Binary Search</option>
            </optgroup>
            <optgroup label="Recursion">
              <option value="Fibonacci Recursion">Fibonacci Recursion</option>
            </optgroup>
            <optgroup label="Dynamic Programming">
              <option value="Unique Paths (DP)">Unique Paths (DP)</option>
            </optgroup>
          </select>
        </div>
      </div>

      <div>
        <div className="flex justify-between mb-2">
          <label className="text-sm text-gray-300">Array Size</label>
          <span className="text-sm font-medium text-blue-400">{arraySize}</span>
        </div>
        <input 
          type="range" 
          min="5" 
          max="50" 
          value={arraySize}
          onChange={handleSizeChange}
          disabled={isSorting && !isPaused}
          className="w-full accent-blue-500 disabled:opacity-50"
        />
      </div>

      <div>
        <div className="flex justify-between mb-2">
          <label className="text-sm text-gray-300">Speed</label>
          <span className="text-sm font-medium text-purple-400">{speed}%</span>
        </div>
        <input 
          type="range" 
          min="1" 
          max="100" 
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          className="w-full accent-purple-500"
        />
      </div>
      
      <div className="mt-4 pt-4 border-t border-white/10 text-xs text-gray-400 space-y-2">
        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-blue-500"></span> Default</div>
        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-yellow-500"></span> Comparing</div>
        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-red-500"></span> Swapping</div>
        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-green-500"></span> Sorted</div>
      </div>
    </div>
  );
};
