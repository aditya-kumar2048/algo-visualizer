import { create } from 'zustand';

// Helper to generate a random array
const generateArray = (size) => Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 10);

export const useStore = create((set, get) => ({
  array: generateArray(20),
  arraySize: 20,
  speed: 50, // lower is faster (delay in ms)
  isSorting: false,
  isPaused: false,
  selectedAlgorithm: 'Bubble Sort',
  searchTarget: 50, // default target
  searchResult: null, // null or { found: boolean, index?: number }
  colors: [], // keeps track of the color/state of each bar (e.g. comparing, swapped, sorted)
  visualizationMode: '1D_ARRAY', // '1D_ARRAY', '2D_GRID', 'RECURSION_TREE'
  recursionTree: [],
  grid: [],
  
  setArray: (newArray) => set({ array: newArray, colors: new Array(newArray.length).fill('default') }),
  setArraySize: (size) => set({ arraySize: size, array: generateArray(size), colors: new Array(size).fill('default') }),
  setSpeed: (speed) => set({ speed }),
  setIsSorting: (isSorting) => set({ isSorting }),
  setIsPaused: (isPaused) => set({ isPaused }),
  setSelectedAlgorithm: (algo) => set({ selectedAlgorithm: algo }),
  setSearchTarget: (target) => set({ searchTarget: target }),
  setSearchResult: (result) => set({ searchResult: result }),
  setColors: (colors) => set({ colors }),
  setVisualizationMode: (mode) => set({ visualizationMode: mode }),
  setRecursionTree: (tree) => set({ recursionTree: tree }),
  setGrid: (grid) => set({ grid }),
  
  resetArray: () => {
    const state = get();
    const size = state.arraySize;
    const mode = state.visualizationMode;
    
    let newTarget = state.searchTarget;
    if (mode === 'RECURSION_TREE') {
      newTarget = Math.floor(Math.random() * 4) + 3; // Random N between 3 and 6
    } else if (mode === '2D_GRID') {
      newTarget = Math.floor(Math.random() * 4) + 2; // Random Grid between 2 and 5
    }

    set({
      array: generateArray(size),
      colors: new Array(size).fill('default'),
      isSorting: false,
      isPaused: false,
      searchResult: null,
      recursionTree: [],
      grid: [],
      searchTarget: newTarget
    });
  },
  
  stopSorting: () => {
    set({ isSorting: false, isPaused: false });
  }
}));
