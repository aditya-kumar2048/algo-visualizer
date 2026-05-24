export function* bubbleSort(array) {
  let arr = [...array];
  let n = arr.length;
  
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // Yield comparison state
      yield { type: 'COMPARE', indices: [j, j + 1] };
      
      if (arr[j] > arr[j + 1]) {
        // Swap elements
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        
        // Yield swap state
        yield { type: 'SWAP', array: [...arr], indices: [j, j + 1] };
      }
    }
    // Yield sorted element state (the last element is now in its correct position)
    yield { type: 'SORTED', index: n - i - 1 };
  }
  // Yield the very first element as sorted
  yield { type: 'SORTED', index: 0 };
  
  // Final state
  yield { type: 'DONE' };
}
