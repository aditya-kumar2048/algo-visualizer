export function* fibonacciRecursion(array, target) {
  // Use user target, capped at 7 to prevent exploding the browser/stack
  let n = Math.min(Math.max(Number(target) || 5, 1), 7);
  let idCounter = 0;

  function* fib(num, depth, parentId = null, branchIndex = 0) {
    let id = ++idCounter;
    yield { type: 'CALL', frame: `fib(${num})`, id, depth, parentId, branchIndex };
    
    if (num <= 1) {
      yield { type: 'RETURN', value: num, id };
      return num;
    }
    
    let a = yield* fib(num - 1, depth + 1, id, 0);
    let b = yield* fib(num - 2, depth + 1, id, 1);
    
    yield { type: 'RETURN', value: a + b, id };
    return a + b;
  }
  
  yield { type: 'RECURSION_INIT' };
  let finalResult = yield* fib(n, 0);
  yield { 
    type: 'ALGO_RESULT', 
    title: 'Recursion Complete', 
    message: `fib(${n}) successfully computed as ${finalResult}.`, 
    success: true 
  };
  yield { type: 'DONE' };
}
