export function* uniquePathsDP(array, target) {
  // Use target to set grid size, capped at 6x6 to fit on screen
  let n = Math.min(Math.max(Number(target) || 4, 2), 6);
  let rows = n;
  let cols = n;

  yield { type: 'DP_INIT', rows, cols };

  let dp = Array(rows).fill().map(() => Array(cols).fill(0));

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      yield { type: 'COMPUTE_CELL_START', row: i, col: j };
      
      if (i === 0 || j === 0) {
        dp[i][j] = 1;
      } else {
        // Highlight dependencies before adding them
        yield { type: 'COMPUTE_CELL_DEPS', row: i, col: j, deps: [[i-1, j], [i, j-1]] };
        dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
      }
      
      yield { type: 'COMPUTE_CELL_DONE', row: i, col: j, value: dp[i][j] };
    }
  }

  yield { 
    type: 'ALGO_RESULT', 
    title: 'DP Complete', 
    message: `There are ${dp[rows - 1][cols - 1]} unique paths to reach the bottom-right corner.`, 
    success: true 
  };
  yield { type: 'DONE' };
}
