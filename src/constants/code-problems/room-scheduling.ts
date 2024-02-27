import { Problem } from "../types/problems";

const canScheduleMeetingHandler = (fn: any) => {
  try {
    const tests = [
      [
        [
          [1, 3],
          [6, 9],
        ],
        [2, 5],
      ],
      [
        [
          [1, 3],
          [6, 9],
        ],
        [4, 5],
      ],
      [
        [
          [1, 3],
          [3, 6],
        ],
        [6, 9],
      ],
    ];
    const answers = ["false", "true", "true"];
    for (let i = 0; i < tests.length; i++) {
      const [existingMeetings, newMeeting] = tests[i];
      const result = fn(existingMeetings, newMeeting);
      if (result !== answers[i]) {
        throw new Error("AssertionError");
      }
    }
    return true;
  } catch (error: any) {
    throw new Error(error);
  }
};

const starterRoomScheduling = `/**
* Determines if a new meeting can be scheduled.
* @param {number[][]} existingMeetings - An array of meetings with their start and end times.
* @param {number[]} newMeeting - The start and end time of the new meeting.
* @return {boolean} - True if the new meeting can be scheduled, false otherwise.
*/
function canScheduleMeeting(existingMeetings, newMeeting) {
    // write your code here
}`;

export const roomScheduling: Problem = {
  id: "room-scheduling",
  title: "3. Room Scheduling",
  problemStatement: `
        <p class="mt-3">
        A company is trying to find out if a meeting room is available for a new meeting. The meeting room can only hold one meeting at a time. Write a function that determines if a new meeting can be scheduled in the meeting room given the existing meeting times.
        </p>
        <p class="mt-3">
        The function should accept an array of existing meetings (each represented as a tuple <code>[start, end]</code> where <code>start</code> and <code>end</code> are the start and end times of the meetings) and a new meeting time (also represented as a tuple/array <code>[start, end]</code>). The function should return <code>true</code> if the new meeting can be scheduled without overlapping any of the existing meetings, and <code>false</code> otherwise.
        </p>
    `,
  examples: [
    {
      id: 0,
      inputText: "[[1, 3], [6, 9]], [2, 5]",
      outputText: "false",
    },
    {
      id: 1,
      inputText: "[[1, 3], [6, 9]], [4, 5]",
      outputText: "true",
    },
  ],
  constraints: `<li class="mt-2">
        <code>0 <= start < end <= 24</code>
    </li>
    <li class="mt-2">The number of existing meetings will be at least 0 and at most 10^4.
    </li>
    <li class="mt-2">Existing meetings and the new meeting will be represented by their start and end times, with no two existing meetings having the same start time.</li>
    `,
  starterCode: starterRoomScheduling,
  handlerFunction: canScheduleMeetingHandler,
  starterFunctionName: "function canScheduleMeeting(",
  order: 3,
};
