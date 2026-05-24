export function* linearSearch(array, target) {
  let n = array.length;
  
  for (let i = 0; i < n; i++) {
    yield { type: 'COMPARE', indices: [i] };
    
    if (array[i] === target) {
      yield { type: 'FOUND', index: i };
      yield { type: 'DONE' };
      return;
    }
  }
  yield { type: 'NOT_FOUND' };
  yield { type: 'DONE' };
}
