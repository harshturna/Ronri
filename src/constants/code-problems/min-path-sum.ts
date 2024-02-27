import { Problem } from "../types/problems";

export const testMinPathSum = (fn: any) => {
  try {
    const tests = [
      [
        [
          [1, 3, 1],
          [1, 5, 1],
          [4, 2, 1],
        ],
        7,
      ],
      [
        [
          [1, 2, 3],
          [4, 5, 6],
        ],
        12,
      ],
    ];
    for (let i = 0; i < tests.length; i++) {
      const [grid, expected] = tests[i];
      const result = fn(grid);
      if (result !== expected) {
        throw new Error("AssertionError");
      }
    }
    return true;
  } catch (error: any) {
    throw new Error(error);
  }
};

const starterCode = `/**
* Finds the minimum path sum from top left to bottom right of a m x n grid. 
You can only move either down or right at any point in time.
* @param {number[][]} grid - A 2D array of non-negative integers.
* @return {number} - The minimum path sum.
*/
function minPathSum(grid) {
    // write code here
}
`;

export const minPathSum: Problem = {
  id: "min-path-sum",
  title: "9. Minimum Path Sum",
  problemStatement: `
        <p class='mt-3'>
        Given a m x n grid filled with non-negative numbers, find a path from top left to bottom right, which minimizes the sum of all numbers along its path. Note: You can only move either down or right at any point in time.
        </p>
    `,
  examples: [
    {
      id: 0,
      inputText: `[
        [1, 3, 1],
        [1, 5, 1],
        [4, 2, 1]
      ]`,
      outputText: `7`,
    },
    {
      id: 1,
      inputText: `[
        [1, 2, 3],
        [4, 5, 6]
      ]`,
      outputText: `12`,
    },
  ],
  constraints: `
  <ul>
    <li class='mt-2'><code>m == grid.length</code></li>
    <li class='mt-2'><code>n == grid[i].length</code></li>
    <li class='mt-2'><code>1 <= m, n <= 200</code></li>
    <li class='mt-2'><code>0 <= grid[i][j] <= 100</code></li>
  </ul>
  `,
  starterCode: starterCode,
  handlerFunction: testMinPathSum,
  starterFunctionName: "function minPathSum(",
  order: 9,
};
