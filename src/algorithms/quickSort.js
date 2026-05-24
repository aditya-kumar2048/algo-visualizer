export function* quickSort(array) {
  let arr = [...array];
  yield* quickSortHelper(arr, 0, arr.length - 1);
  
  for (let i = 0; i < arr.length; i++) {
    yield { type: 'SORTED', index: i };
  }
  yield { type: 'DONE' };
}

function* quickSortHelper(arr, low, high) {
  if (low < high) {
    let pi = yield* partition(arr, low, high);
    yield { type: 'SORTED', index: pi };
    yield* quickSortHelper(arr, low, pi - 1);
    yield* quickSortHelper(arr, pi + 1, high);
  } else if (low === high) {
    yield { type: 'SORTED', index: low };
  }
}

function* partition(arr, low, high) {
  let pivot = arr[high];
  let i = low - 1;

  for (let j = low; j <= high - 1; j++) {
    yield { type: 'COMPARE', indices: [j, high] };
    if (arr[j] < pivot) {
      i++;
      let temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
      yield { type: 'SWAP', array: [...arr], indices: [i, j] };
    }
  }
  let temp = arr[i + 1];
  arr[i + 1] = arr[high];
  arr[high] = temp;
  yield { type: 'SWAP', array: [...arr], indices: [i + 1, high] };
  return i + 1;
}
