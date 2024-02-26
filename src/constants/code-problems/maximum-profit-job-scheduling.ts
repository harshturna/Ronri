import { Problem } from "../types/problems";

const testJobScheduling = (fn: any) => {
  try {
    const tests = [
      [
        [1, 2, 3, 3],
        [3, 4, 5, 6],
        [50, 10, 40, 70],
      ],
      [
        [1, 2, 3, 4, 6],
        [3, 5, 10, 6, 9],
        [20, 20, 100, 70, 60],
      ],
      [[1], [2], [100]],
    ];
    const answers = [120, 150, 100];
    for (let i = 0; i < tests.length; i++) {
      const [startTime, endTime, profit] = tests[i];
      const result = fn(startTime, endTime, profit);
      if (result !== answers[i]) {
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
    console.error("Error from testJobScheduling: ", error.message);
    throw new Error(error);
  }
};

const starterCode = `/**
* @param {number[]} startTime
* @param {number[]} endTime
* @param {number[]} profit
* @return {number}
*/
function jobScheduling(startTime, endTime, profit) {
    // write your code here
}`;

export const maxiumumProfitJobScheduling: Problem = {
  id: "maximum-profit-in-job-scheduling",
  title: "4. Maximum Profit in Job Scheduling",
  problemStatement: `
        <p class='mt-3'>
        You are given n jobs where each job is represented by three elements: <code>start time</code>, <code>end time</code>, and <code>profit</code> it earns. Each job is independent of the others, and you can only work on one job at a time. The jobs may overlap, and you can choose not to take a job. Your task is to find the maximum profit you can earn by scheduling your time optimally.
        </p>
        <p class='mt-3'>
        Write a function that takes three arrays: <code>startTime</code>, <code>endTime</code>, and <code>profit</code>, all of the same length, where the i-th job can be started at startTime[i] and will end at endTime[i], earning profit[i] profit.
        </p>
    `,
  examples: [
    {
      id: 0,
      inputText: "[1, 2, 3, 3], [3, 4, 5, 6], [50, 10, 40, 70]",
      outputText: "120",
    },
    {
      id: 1,
      inputText: "[1], [2], [100]",
      outputText: "100",
    },
  ],
  constraints: `
        <li class='mt-2'>1 <= startTime.length == endTime.length == profit.length <= 5 * 10^4</li>
        <li class='mt-2'>1 <= startTime[i] < endTime[i] <= 10^9</li>
        <li class='mt-2'>1 <= profit[i] <= 10^4</li>
    `,
  handlerFunction: testJobScheduling,
  starterCode: starterCode,
  starterFunctionName: "function jobScheduling(",
  order: 9,
};
