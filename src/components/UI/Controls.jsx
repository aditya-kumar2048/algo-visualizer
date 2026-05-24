import React, { useState } from 'react';
import { Play, Pause, RotateCcw, Shuffle, Edit2, Target } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { startSorting, pauseSorting, resetSorting } from '../../algorithms/engine';

export const Controls = () => {
  const isSorting = useStore((state) => state.isSorting);
  const isPaused = useStore((state) => state.isPaused);
  const setArray = useStore((state) => state.setArray);
  const resetArray = useStore((state) => state.resetArray);
  const selectedAlgorithm = useStore((state) => state.selectedAlgorithm);
  const searchTarget = useStore((state) => state.searchTarget);
  const setSearchTarget = useStore((state) => state.setSearchTarget);
  
  const isSearchAlgo = selectedAlgorithm.includes('Search');
  const isRecursion = selectedAlgorithm.includes('Recursion');
  const isDP = selectedAlgorithm.includes('DP');
  const showTargetInput = isSearchAlgo || isRecursion || isDP;

  let targetPlaceholder = 'Target';
  if (isRecursion) targetPlaceholder = 'N (e.g. 5)';
  if (isDP) targetPlaceholder = 'Grid N (e.g. 4)';
  
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleCustomInput = (e) => {
    e.preventDefault();
    const newArr = inputValue
      .split(',')
      .map((n) => parseInt(n.trim()))
      .filter((n) => !isNaN(n) && n > 0 && n <= 200); // Filter out invalid inputs and cap value
    
    if (newArr.length > 0) {
      resetSorting();
      setArray(newArr);
      setShowInput(false);
      setInputValue('');
    }
  };

  return (
    <div className="glass-panel p-3 flex flex-col sm:flex-row gap-3 items-center justify-between pointer-events-auto">
      <div className="flex gap-2">
        {!isSorting || isPaused ? (
          <button onClick={startSorting} className="glass-button px-4 py-2 text-sm bg-blue-500/20 hover:bg-blue-500/40">
            <Play size={16} /> Play
          </button>
        ) : (
          <button onClick={pauseSorting} className="glass-button px-4 py-2 text-sm bg-yellow-500/20 hover:bg-yellow-500/40">
            <Pause size={16} /> Pause
          </button>
        )}
        
        <button onClick={resetSorting} className="glass-button px-3 py-2 text-sm">
          <RotateCcw size={16} /> Reset
        </button>
      </div>

      <div className="flex gap-2">
        {showTargetInput && (
          <div className="flex items-center gap-2 bg-black/30 px-3 py-1 rounded-xl border border-white/20">
            <Target size={16} className="text-purple-400" />
            <input 
              type="number"
              value={searchTarget}
              onChange={(e) => setSearchTarget(Number(e.target.value))}
              disabled={isSorting && !isPaused}
              className="bg-transparent w-24 text-sm text-white outline-none placeholder-white/40"
              placeholder={targetPlaceholder}
              title={targetPlaceholder}
            />
          </div>
        )}

        <button 
          onClick={resetArray} 
          disabled={isSorting && !isPaused}
          className="glass-button px-3 py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Shuffle size={16} /> Randomize
        </button>
        
        <button 
          onClick={() => setShowInput(!showInput)}
          disabled={isSorting && !isPaused}
          className="glass-button px-3 py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Edit2 size={16} /> Custom Input
        </button>
      </div>

      {showInput && (
        <form onSubmit={handleCustomInput} className="absolute bottom-full mb-4 right-0 glass-panel p-4 flex gap-2">
          <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="e.g. 10, 45, 23, 80"
            className="glass-input"
            autoFocus
          />
          <button type="submit" className="glass-button px-4 py-2 bg-blue-500/20">
            Set
          </button>
        </form>
      )}
    </div>
  );
};
