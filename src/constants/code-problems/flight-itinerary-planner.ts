import { Problem } from "../types/problems";

export const testFlightItineraryPlanner = (fn: any) => {
  try {
    const tests = [
      [
        [
          ["MUC", "LHR"],
          ["JFK", "MUC"],
          ["SFO", "SJC"],
          ["LHR", "SFO"],
        ],
        "JFK",
      ],
      [
        [
          ["JFK", "KUL"],
          ["JFK", "NRT"],
          ["NRT", "JFK"],
        ],
        "JFK",
      ],
      [
        [
          ["ATL", "EWR"],
          ["SFO", "ATL"],
          ["EWR", "SFO"],
        ],
        "ATL",
      ],
    ];
    const isValidItinerary = (itinerary: any, flights: any) => {
      if (!itinerary || itinerary.length !== flights.length + 1) return false;
      let flightMap = flights.reduce((acc: any, [from, to]: any) => {
        const key = from + to;
        acc[key] = (acc[key] || 0) + 1;
        return acc;
      }, {});
      for (let i = 0; i < itinerary.length - 1; i++) {
        const key = itinerary[i] + itinerary[i + 1];
        if (!flightMap[key]) return false;
        flightMap[key]--;
      }
      return true;
    };
    for (let i = 0; i < tests.length; i++) {
      const [flights, start] = tests[i];
      const result = fn(flights, start);
      if (!isValidItinerary(result, flights)) {
        throw new Error("AssertionError");
      }
    }
    return true;
  } catch (error: any) {
    throw new Error(error);
  }
};

const starterCode = `/**
* Finds a valid flight itinerary or returns null if none exists.
* @param {string[][]} flights - An array of flights represented as [departure, arrival] pairs.
* @param {string} start - The starting airport code.
* @return {string[] | null} - An array representing a valid itinerary or null if none exists.
*/
function findItinerary(flights, start) {
    // write code here
}
`;

export const flightItineraryPlanner: Problem = {
  id: "flight-itinerary-planner",
  title: "6. Flight Itinerary Planner",
  problemStatement: `
        <p class='mt-3'>
        Given a list of flight itineraries, each represented as a pair of departure and arrival airports, write a function to compute the user's possible itinerary starting from a given departure airport. The itinerary must use all the flights in the list exactly once. If no such itinerary is possible, the function should return <code>null</code>. If there are multiple possible itineraries, return any one of them.
        </p>
    `,
  examples: [
    {
      id: 0,
      inputText: `[[["MUC", "LHR"], ["JFK", "MUC"], ["SFO", "SJC"], ["LHR", "SFO"]], "JFK"]`,
      outputText: `["JFK", "MUC", "LHR", "SFO", "SJC"] or any valid itinerary`,
    },
    {
      id: 1,
      inputText: `[[["JFK","KUL"],["JFK","NRT"],["NRT","JFK"]], "JFK"]`,
      outputText: `null, since there's no way to use all flights exactly once starting from JFK`,
    },
    {
      id: 2,
      inputText: `[[["ATL","EWR"],["SFO","ATL"],["EWR","SFO"]], "ATL"]`,
      outputText: `["ATL", "EWR", "SFO", "ATL"] or any valid itinerary`,
    },
  ],
  constraints: `
  <ul>
    <li class='mt-2'><code>1 <= flights.length <= 300</code></li>
    <li class='mt-2'>Each airport code consists of exactly 3 capital letters.</li>
    <li class='mt-2'>The <code>flights</code> array does not contain duplicate flights.</li>
  </ul>
  `,
  starterCode: starterCode,
  handlerFunction: testFlightItineraryPlanner,
  starterFunctionName: "function findItinerary(",
  order: 6,
};
