import { useStore } from '../store/useStore';
import { bubbleSort } from './bubbleSort';
import { selectionSort } from './selectionSort';
import { insertionSort } from './insertionSort';
import { mergeSort } from './mergeSort';
import { quickSort } from './quickSort';
import { linearSearch } from './linearSearch';
import { binarySearch } from './binarySearch';
import { fibonacciRecursion } from './fibonacciRecursion';
import { uniquePathsDP } from './uniquePathsDP';

let timerId = null;
let currentGenerator = null;

const algorithms = {
  'Bubble Sort': bubbleSort,
  'Selection Sort': selectionSort,
  'Insertion Sort': insertionSort,
  'Merge Sort': mergeSort,
  'Quick Sort': quickSort,
  'Linear Search': linearSearch,
  'Binary Search': binarySearch,
  'Fibonacci Recursion': fibonacciRecursion,
  'Unique Paths (DP)': uniquePathsDP,
};

export const startSorting = () => {
  const state = useStore.getState();
  
  if (state.isSorting && !state.isPaused) return; // Already running

  if (!state.isPaused || !currentGenerator) {
    // Start fresh
    let startArray = [...state.array];
    if (state.selectedAlgorithm === 'Binary Search') {
      startArray.sort((a, b) => a - b);
      useStore.getState().setArray(startArray);
    }
    const algoFn = algorithms[state.selectedAlgorithm] || bubbleSort;
    currentGenerator = algoFn(startArray, state.searchTarget);
    useStore.getState().setColors(new Array(startArray.length).fill('default'));
  }

  useStore.getState().setIsSorting(true);
  useStore.getState().setIsPaused(false);
  
  runNextStep();
};

export const pauseSorting = () => {
  useStore.getState().setIsPaused(true);
  if (timerId) {
    clearTimeout(timerId);
    timerId = null;
  }
};

export const resetSorting = () => {
  pauseSorting();
  currentGenerator = null;
  useStore.getState().setSearchResult(null);
  useStore.getState().resetArray();
};

const runNextStep = () => {
  const state = useStore.getState();
  if (state.isPaused || !state.isSorting) return;

  const { value, done } = currentGenerator.next();

  if (done) {
    useStore.getState().setIsSorting(false);
    currentGenerator = null;
    return;
  }

  // Process the yielded state
  const colors = [...state.colors];
  
  // Reset previous comparison colors if needed
  for (let i = 0; i < colors.length; i++) {
    if (colors[i] === 'comparing' || colors[i] === 'swapping') {
      colors[i] = 'default';
    }
  }

  if (value.type === 'COMPARE') {
    value.indices.forEach(i => colors[i] = 'comparing');
    useStore.getState().setColors(colors);
  } else if (value.type === 'SWAP') {
    value.indices.forEach(i => colors[i] = 'swapping');
    useStore.getState().setArray(value.array);
    useStore.getState().setColors(colors);
  } else if (value.type === 'SORTED') {
    colors[value.index] = 'sorted';
    useStore.getState().setColors(colors);
  } else if (value.type === 'FOUND') {
    colors[value.index] = 'found';
    useStore.getState().setColors(colors);
    useStore.getState().setSearchResult({ found: true, index: value.index });
  } else if (value.type === 'NOT_FOUND') {
    useStore.getState().setSearchResult({ found: false });
  } else if (value.type === 'RECURSION_INIT') {
    useStore.getState().setRecursionTree([]);
  } else if (value.type === 'CALL') {
    const tree = useStore.getState().recursionTree;
    let x = 0;
    let y = 0;
    
    if (value.parentId !== null) {
      const parent = tree.find(n => n.id === value.parentId);
      if (parent) {
        // Exponentially shrinking offset to prevent overlaps at any depth
        const offset = 12 / Math.pow(1.8, value.depth - 1);
        x = parent.x + (value.branchIndex === 0 ? -offset : offset);
        y = parent.y - 2.5;
      }
    }
    
    useStore.getState().setRecursionTree([...tree, { 
      id: value.id, 
      frame: value.frame, 
      depth: value.depth, 
      parentId: value.parentId,
      branchIndex: value.branchIndex,
      x, 
      y, 
      status: 'calling', 
      value: null 
    }]);
  } else if (value.type === 'RETURN') {
    const tree = useStore.getState().recursionTree;
    useStore.getState().setRecursionTree(tree.map(f => f.id === value.id ? { ...f, value: value.value, status: 'returned' } : f));
  } else if (value.type === 'DP_INIT') {
    const grid = Array(value.rows).fill().map(() => Array(value.cols).fill({ value: 0, state: 'default' }));
    useStore.getState().setGrid(grid);
  } else if (value.type === 'COMPUTE_CELL_START') {
    const grid = JSON.parse(JSON.stringify(useStore.getState().grid));
    grid[value.row][value.col].state = 'computing';
    useStore.getState().setGrid(grid);
  } else if (value.type === 'COMPUTE_CELL_DEPS') {
    const grid = JSON.parse(JSON.stringify(useStore.getState().grid));
    value.deps.forEach(([r, c]) => {
      if (grid[r] && grid[r][c]) grid[r][c].state = 'dependency';
    });
    useStore.getState().setGrid(grid);
  } else if (value.type === 'COMPUTE_CELL_DONE') {
    const grid = JSON.parse(JSON.stringify(useStore.getState().grid));
    // Reset previous states to default except the computed ones
    for (let r = 0; r < grid.length; r++) {
      for (let c = 0; c < grid[r].length; c++) {
        if (grid[r][c].state === 'dependency' || grid[r][c].state === 'computing') {
          grid[r][c].state = 'computed';
        }
      }
    }
    grid[value.row][value.col] = { value: value.value, state: 'computed' };
    useStore.getState().setGrid(grid);
  } else if (value.type === 'ALGO_RESULT') {
    useStore.getState().setSearchResult({ 
      title: value.title, 
      message: value.message, 
      success: value.success 
    });
  }

  // Schedule next step based on speed
  // Speed is 1 to 100, where 1 is fast (e.g. 10ms) and 100 is slow (e.g. 500ms)
  // Let's map speed: 1 -> 500ms, 100 -> 10ms
  const currentSpeed = useStore.getState().speed;
  const delay = Math.max(10, 510 - (currentSpeed * 5));
  
  timerId = setTimeout(runNextStep, delay);
};
