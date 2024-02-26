import { Problem } from "../types/problems";

export const testFindNearestStore = (fn: any) => {
  try {
    const tests = [
      [
        [
          [1, 2],
          [3, 4],
          [2, -1],
        ],
        [0, 0],
      ],
      [
        [
          [1, -1],
          [2, 2],
          [-3, 4],
        ],
        [1, 1],
      ],
      [
        [
          [0, 0],
          [5, 5],
          [2, 2],
        ],
        [3, 3],
      ],
    ];
    const answers = [
      [1, 2],
      [1, -1],
      [2, 2],
    ]; // Acceptable alternative answers: [2, 2] for the second test case
    for (let i = 0; i < tests.length; i++) {
      const [stores, userLocation] = tests[i];
      const result = fn(stores, userLocation);
      if (!answers[i].every((val, idx) => val === result[idx])) {
        console.error(
          `Test case ${i + 1} failed. Expected "${
            answers[i]
          }" but got "${result}"`
        );
        return false;
      }
    }
    console.log("All tests passed!");
    return true;
  } catch (error: any) {
    console.error("Error from testFindNearestStore: ", error.message);
    throw new Error(error);
  }
};

const starterCode = `/**
* Finds the nearest store to the user's location.
* @param {number[][]} stores - An array of [x, y] coordinates for each store.
* @param {number[]} userLocation - The [x, y] coordinates of the user's current location.
* @return {number[]} - The [x, y] coordinates of the nearest store.
*/
function findNearestStore(stores, userLocation) {
    // write code here
}
`;

export const findNearestStore: Problem = {
  id: "find-nearest-store",
  title: "5. Find Nearest Store",
  problemStatement: `
        <p class='mt-3'>
        You're developing a feature for a mapping application where users can find the nearest store to their current location. Given a list of store locations (as coordinates) and a user's current location, write a function to find the store nearest to the user.
        </p>
        <p class='mt-3'>
        The function should take two parameters:
        </p>
        <ul class='mt-3'>
            <li class='mt-2'>A list of store locations, where each store location is represented as a tuple of (x, y) coordinates.</li> 
            <li class='mt-2'>The user's current location, also represented as a tuple of (x, y) coordinates.
            </li> 
        </ul>
        <p class='mt-3'>
        The function should return the <code>(x, y)</code> coordinates of the store that is closest to the user's current location. If there are multiple stores at the same minimum distance, the function can return any one of them.
        </p>
    `,
  examples: [
    {
      id: 0,
      inputText: `[[1, 2], [3, 4], [2, -1]], [0, 0]`,
      outputText: `[1, 2]
            `,
    },
    {
      id: 1,
      inputText: `[[0, 0], [5, 5], [2, 2]], [3, 3]`,
      outputText: `[2, 2]`,
    },
  ],
  constraints: `
  <li class='mt-2'><code>1 <= stores.length <= 10^4</code></li>
  <li class='mt-2'>The coordinates are integers where <code>-10^4 <= x, y <= 10^4</code>.</li>
  <li class='mt-2'>No two stores are at the same location.</li>
  <li class='mt-2'>The user's location is not necessarily the same as any store's location.
  </li>
`,
  starterCode: starterCode,
  handlerFunction: testFindNearestStore,
  starterFunctionName: "function findNearestStore(",
  order: 10,
};
