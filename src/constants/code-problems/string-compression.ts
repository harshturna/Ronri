import { Problem } from "../types/problems";
import assert from "assert";

const compressStringHandler = (fn: any) => {
  try {
    const tests = ["aabcccccaaa", "abcdef", "aabbcc", "zzzbbb"];
    const answers = ["a2b1c5a3", "abcdef", "aabbcc", "z3b3"];
    for (let i = 0; i < tests.length; i++) {
      const result = fn(tests[i]);
      assert(result, answers[i]);
    }
    return true;
  } catch (error: any) {
    throw new Error(error);
  }
};

const starterCode = `/**
* Compresses a string using the counts of repeated characters.
* @param {string} str - The input string to compress.
* @return {string} - The compressed string or the original string if compression is not efficient.
*/
function compressString(str) {
    // write your code here
}`;

export const stringCompression: Problem = {
  id: "string-compression",
  title: "2. String Compression",
  problemStatement: `<p class="mt-3">
    Implement a function to perform basic string compression using the counts of repeated characters. For example, the string <code>aabcccccaaa</code> would become a2b1c5a3. If the "compressed" string would not become smaller than the original string, your function should return the original string. You can assume the string has only uppercase and lowercase letters (a-z).
    </p>
    <p>
    <b>Input:</b> str - A string containing only uppercase and lowercase letters (a-z).
    <b>Output:</b> A compressed string with repeated characters followed by their counts, or the original string if the compressed version is not shorter.
    </p>
    `,

  examples: [
    {
      id: 0,
      inputText: `"aabcccccaaa"`,
      outputText: `"a2b1c5a3"`,
    },
    {
      id: 1,
      inputText: `"abcdef"`,
      outputText: `"abcdef"`,
    },
    {
      id: 2,
      inputText: `"zzzbbb"`,
      outputText: `"z3b3"`,
    },
  ],
  constraints: `<li class='mt-2'>1 <= str.length <= 10^4</li>
    <li class='mt-2'>The string consists of only English letters (both lowercase and uppercase).</li>
    `,
  starterCode: starterCode,
  handlerFunction: compressStringHandler,
  starterFunctionName: "function compressString(",
  order: 2,
};
