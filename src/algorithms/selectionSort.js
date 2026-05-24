export function* selectionSort(array) {
  let arr = [...array];
  let n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      yield { type: 'COMPARE', indices: [minIdx, j] };
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    if (minIdx !== i) {
      let temp = arr[i];
      arr[i] = arr[minIdx];
      arr[minIdx] = temp;
      yield { type: 'SWAP', array: [...arr], indices: [i, minIdx] };
    }
    yield { type: 'SORTED', index: i };
  }
  yield { type: 'SORTED', index: n - 1 };
  yield { type: 'DONE' };
}
