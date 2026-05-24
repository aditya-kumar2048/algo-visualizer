export function* mergeSort(array) {
  let arr = [...array];
  
  yield* mergeSortHelper(arr, 0, arr.length - 1);
  
  for (let i = 0; i < arr.length; i++) {
    yield { type: 'SORTED', index: i };
  }
  yield { type: 'DONE' };
}

function* mergeSortHelper(arr, l, r) {
  if (l >= r) return;
  let m = l + Math.floor((r - l) / 2);
  yield* mergeSortHelper(arr, l, m);
  yield* mergeSortHelper(arr, m + 1, r);
  yield* merge(arr, l, m, r);
}

function* merge(arr, start, mid, end) {
  let start2 = mid + 1;
  if (arr[mid] <= arr[start2]) return;

  while (start <= mid && start2 <= end) {
    yield { type: 'COMPARE', indices: [start, start2] };
    if (arr[start] <= arr[start2]) {
      start++;
    } else {
      let value = arr[start2];
      let index = start2;

      while (index !== start) {
        arr[index] = arr[index - 1];
        yield { type: 'SWAP', array: [...arr], indices: [index, index - 1] };
        index--;
      }
      arr[start] = value;
      yield { type: 'SWAP', array: [...arr], indices: [start, start] };
      
      start++;
      mid++;
      start2++;
    }
  }
}
