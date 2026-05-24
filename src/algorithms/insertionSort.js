export function* insertionSort(array) {
  let arr = [...array];
  let n = arr.length;

  yield { type: 'SORTED', index: 0 };
  for (let i = 1; i < n; i++) {
    let key = arr[i];
    let j = i - 1;
    
    yield { type: 'COMPARE', indices: [j, i] };
    
    while (j >= 0 && arr[j] > key) {
      yield { type: 'COMPARE', indices: [j, j + 1] };
      arr[j + 1] = arr[j];
      yield { type: 'SWAP', array: [...arr], indices: [j, j + 1] };
      j = j - 1;
    }
    arr[j + 1] = key;
    yield { type: 'SWAP', array: [...arr], indices: [j + 1, j + 1] };
    
    for (let k = 0; k <= i; k++) {
      yield { type: 'SORTED', index: k };
    }
  }
  yield { type: 'DONE' };
}
