import { Problem } from "../types/problems";

export const mergeMeetingsHandler = (fn: any) => {
  try {
    const tests = [
      [
        [
          [0, 1],
          [3, 5],
          [4, 8],
          [10, 12],
          [9, 10],
        ],
      ],
      [
        [
          [1, 2],
          [2, 3],
        ],
      ],
      [
        [
          [6, 7],
          [2, 4],
          [8, 10],
        ],
      ],
    ];
    const answers = [
      [
        [0, 1],
        [3, 8],
        [9, 12],
      ],
      [[1, 3]],
      [
        [2, 4],
        [6, 7],
        [8, 10],
      ],
    ];
    for (let i = 0; i < tests.length; i++) {
      const result = fn(...tests[i])
        .map((meeting: any) => meeting.join(","))
        .join(";");
      const answer = answers[i].map((meeting) => meeting.join(",")).join(";");
      if (result !== answer) {
        console.error(
          `Test case ${i + 1} failed. Expected [${answer}] but got [${result}]`
        );
        return false;
      }
    }
    return true;
  } catch (error: any) {
    console.error("Error from mergeMeetingsHandler: ", error.message);
    throw new Error(error);
  }
};

const starterMergeMettingsTimes = `/**
* @param {Array<[number, number]>} meetings - An array of tuples [start, end] representing the meeting times.
* @return {Array<[number, number]>} - An array of tuples [start, end] representing the consolidated meeting times.
*/
function mergeMeetings(meetings) {
  if (!meetings.length) return [];
    
    // Sort meetings by start time
    meetings.sort((a, b) => a[0] - b[0]);
    
    const mergedMeetings = [meetings[0]];
    
    for (let i = 1; i < meetings.length; i++) {
        const [currentStart, currentEnd] = meetings[i];
        const [lastMergedStart, lastMergedEnd] = mergedMeetings[mergedMeetings.length - 1];
        
        // If the current meeting overlaps with the last merged meeting, use the later end time
        if (currentStart <= lastMergedEnd) {
            mergedMeetings[mergedMeetings.length - 1] = [lastMergedStart, Math.max(lastMergedEnd, currentEnd)];
        } else {
            mergedMeetings.push([currentStart, currentEnd]);
        }
    }
    
    return mergedMeetings;
}`;

export const mergeMettingTimes: Problem = {
  id: "merge-meeting-times",
  title: "6. Merge Meetings Times",
  problemStatement: `<p class="mt-3">
    Your company uses a meeting management system to book meetings throughout the day. Unfortunately, the system does not consolidate overlapping or consecutive meetings, leading to confusion and inefficiency. Your task is to write a function that merges overlapping and consecutive meeting times to streamline the meeting schedule.
    </p>
    <p class"mt-3>
    Given a list of meeting times represented as tuples of start and end times <code>(start, end)</code> (in 24-hour format), your function should return a new list with the overlapping and consecutive meetings merged. A meeting is considered to overlap if it starts before another meeting ends. Consecutive meetings have no gap between them.
    </p>
    `,
  examples: [
    {
      id: 0,
      inputText: `[[0, 1], [3, 5], [4, 8], [10, 12], [9, 10]]`,
      outputText: `[[0, 1], [3, 8], [9, 12]]`,
    },
    {
      id: 1,
      inputText: `[[1, 2], [2, 3]]`,
      outputText: `[[1, 3]]`,
    },
  ],
  constraints: `<li class="mt-2"><code>0 <= start < end <= 24</code></li>
    <li class="mt-2">The number of meetings will be at least 1 and at most 10^4.</li>
    <li class="mt-2">Meetings will be represented by their start and end times, with no two meetings having the same start time.</li>
    `,
  starterCode: starterMergeMettingsTimes,
  handlerFunction: mergeMeetingsHandler,
  starterFunctionName: "function mergeMeetings(",
  order: 6,
};
