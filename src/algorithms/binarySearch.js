export function* binarySearch(array, target) {
  let l = 0;
  let r = array.length - 1;

  while (l <= r) {
    let mid = l + Math.floor((r - l) / 2);
    
    // Highlight the current search range and mid point
    yield { type: 'COMPARE', indices: [l, r, mid] };
    
    if (array[mid] === target) {
      yield { type: 'FOUND', index: mid };
      yield { type: 'DONE' };
      return;
    }
    
    if (array[mid] < target) {
      l = mid + 1;
    } else {
      r = mid - 1;
    }
  }
  
  yield { type: 'NOT_FOUND' };
  yield { type: 'DONE' };
}
