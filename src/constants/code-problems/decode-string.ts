import { Problem } from "../types/problems";

export const testDecodeString = (fn: any) => {
  try {
    const tests = [
      ["3[a]2[bc]", "aaabcbc"],
      ["3[a2[c]]", "accaccacc"],
      ["2[abc]3[cd]ef", "abcabccdcdcdef"],
      ["abc3[cd]xyz", "abccdcdcdxyz"],
    ];
    for (let i = 0; i < tests.length; i++) {
      const [input, expected] = tests[i];
      const result = fn(input);
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
*Decodes a string encoded, where the 'encoded_string' 
inside the square brackets is being repeated exactly 'k' times. Nested encoding is also possible.
* @param {string} s - The encoded string.
* @return {string} - The decoded string.
*/
function decodeString(s) {
    let stack = [];
    for (let char of s) {
        if (char !== ']') {
            // Push everything but closing bracket onto the stack
            stack.push(char);
        } else {
            // Step 1: Pop off everything up to the opening bracket to get the encoded string
            let decodedString = '';
            while (stack.length && stack[stack.length - 1] !== '[') {
                decodedString = stack.pop() + decodedString;
            }
            // Pop the opening bracket off the stack
            stack.pop();
            
            // Step 2: Get the number associated with the encoded string
            let base = 1;
            let k = 0;
            while (stack.length && !isNaN(stack[stack.length - 1])) {
                k += base * (stack.pop() - '0');
                base *= 10;
            }
            
            // Step 3: Repeat the decoded string k times and push back onto stack
            let repeatedString = '';
            for (let i = 0; i < k; i++) {
                repeatedString += decodedString;
            }
            stack.push(repeatedString);
        }
    }
    // Join everything left in the stack to get the final decoded string
    return stack.join('');
}
`;

export const decodeString: Problem = {
  id: "decode-string",
  title: "Decode String",
  problemStatement: `
        <p class='mt-3'>
        Given an encoded string, return its decoded string. The encoding rule is: 'k[encoded_string]', where the 'encoded_string' inside the square brackets is being repeated exactly 'k' times. Note that 'k' is guaranteed to be a positive integer. You may assume that the input string is always valid; there are no extra white spaces, square brackets are well-formed, etc. Furthermore, you may assume that the original data does not contain any digits and that digits are only for those repeat numbers, 'k'. For example, there won't be input like '3a' or '2[4]'.
        </p>
        <p class='mt-3'>
        The function should be able to handle nested encoded strings.
        </p>
    `,
  examples: [
    {
      id: 0,
      inputText: `"3[a]2[bc]"`,
      outputText: `"aaabcbc"`,
    },
    {
      id: 1,
      inputText: `"3[a2[c]]"`,
      outputText: `"accaccacc"`,
    },
    {
      id: 2,
      inputText: `"2[abc]3[cd]ef"`,
      outputText: `"abcabccdcdcdef"`,
    },
  ],
  constraints: `
  <ul>
    <li class='mt-2'><code>1 <= s.length <= 30</code></li>
    <li class='mt-2'>The string <code>s</code> consists of lowercase English characters, digits, and square brackets <code>'[]'</code>.</li>
    <li class='mt-2'>The encoded string is always valid; no extra white spaces, square brackets are well-formed, etc.</li>
    <li class='mt-2'>The number of opening brackets <code>'['</code> and closing brackets <code>']'</code> are equal.</li>
    <li class='mt-2'>Every digit that appears in the encoded string is part of a positive integer that represents the number of times the enclosed string is repeated.</li>
  </ul>
  `,
  starterCode: starterCode,
  handlerFunction: testDecodeString,
  starterFunctionName: "function decodeString(",
  order: 10,
};
