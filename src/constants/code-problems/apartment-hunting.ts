import { Problem } from "../types/problems";

export const testApartmentHunting = (fn: any) => {
  try {
    const tests = [
      [
        [
          ["grocery", "school"],
          ["school", "gym"],
          ["grocery"],
          ["gym", "school"],
        ],
        ["grocery", "school", "gym"],
      ],
      [
        [["gym"], ["school", "gym"], ["grocery", "school"]],
        ["grocery", "school", "gym"],
      ],
      [
        [["grocery"], ["gym"], ["school", "gym"], ["grocery", "school"]],
        ["grocery", "school", "gym"],
      ],
    ];
    const answers = [2, 1, 2]; // Index of the optimal block to live on
    for (let i = 0; i < tests.length; i++) {
      const [blocks, requirements] = tests[i];
      const result = fn(blocks, requirements);
      if (result !== answers[i]) {
        throw new Error("AssertionError");
      }
    }
    return true;
  } catch (error: any) {
    throw new Error(error);
  }
};

const starterCode = `/**
* Finds the optimal block to live on based on proximity to required amenities.
* @param {string[][]} blocks - An array where each element 
represents a block, and each block contains amenities present.
* @param {string[]} requirements - A list of amenities you require close access to.
* @return {number} - The index of the block 
that minimizes the farthest distance to all your required amenities.
*/
function apartmentHunting(blocks, requirements) {
    // write code here
}
`;

export const apartmentHunting: Problem = {
  id: "apartment-hunting",
  title: "7. Apartment Hunting",
  problemStatement: `
        <p class='mt-3'>
        You're moving to a new city and looking for an apartment to live in. There are several amenities you need access to from your new place: a grocery store, a school, and a gym, among others. Given a list of amenities and a map of the city where each block is marked with the amenities available on that block, write a function to find the block that minimizes the farthest distance to all your required amenities.
        </p>
    `,
  examples: [
    {
      id: 0,
      inputText: `[[["grocery", "school"], ["school", "gym"], ["grocery"], ["gym", "school"]], ["grocery", "school", "gym"]]`,
      outputText: `2`,
    },
    {
      id: 1,
      inputText: `[[["gym"], ["school", "gym"], ["grocery", "school"]], ["grocery", "school", "gym"]]`,
      outputText: `1`,
    },
  ],
  constraints: `
  <ul>
    <li class='mt-2'><code>1 <= blocks.length <= 10^4</code></li>
    <li class='mt-2'>Each block can have any combination of the given amenities.</li>
    <li class='mt-2'>The list of requirements is non-empty and contains no duplicates.</li>
  </ul>
  `,
  starterCode: starterCode,
  handlerFunction: testApartmentHunting,
  starterFunctionName: "function apartmentHunting(",
  order: 7,
};
