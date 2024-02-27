import { Problem } from "../types/problems";

export const testFirstUniqueCharacter = (fn: any) => {
  try {
    const tests = [
      ["ronri", 1],
      ["coding", 0],
      ["aabb", -1],
    ];
    for (let i = 0; i < tests.length; i++) {
      const [s, expected] = tests[i];
      const result = fn(s);
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
* Finds the first non-repeating character in a string and returns its index. 
If it doesn't exist, return -1.
* @param {string} s - The input string.
* @return {number} - The index of the first non-repeating character or -1 if none exists.
*/
function firstUniqChar(s) {
    // write code here
}
`;

export const firstUniqueCharacter: Problem = {
  id: "first-unique-character",
  title: "First Unique Character in a String",
  problemStatement: `
        <p class='mt-3'>
        Given a string, find the first non-repeating character in it and return its index. If it doesn't exist, return -1. You must assume the string contains only lowercase English letters.
        </p>
    `,
  examples: [
    {
      id: 0,
      inputText: `"ronri"`,
      outputText: `1`,
    },
    {
      id: 1,
      inputText: `"coding"`,
      outputText: `0`,
    },
    {
      id: 2,
      inputText: `"aabb"`,
      outputText: `-1`,
    },
  ],
  constraints: `
  <ul>
    <li class='mt-2'><code>1 <= s.length <= 10^5</code></li>
    <li class='mt-2'>The string <code>s</code> consists only of lowercase English letters.</li>
  </ul>
  `,
  starterCode: starterCode,
  handlerFunction: testFirstUniqueCharacter,
  starterFunctionName: "function firstUniqChar(",
  order: 10,
};
