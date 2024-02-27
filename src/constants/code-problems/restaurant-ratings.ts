import { Problem } from "../types/problems";

export const testRestaurantRatings = (fn: any) => {
  try {
    const tests = [
      [
        ["pizza", "burgers", "pizza", "burgers", "pizza", "pizza"],
        "pizza",
      ],
      [
        ["pasta", "pasta", "burgers", "pasta", "pizza", "burgers", "pasta", "pasta", "pasta"],
        "pasta",
      ],
      [
        ["sushi", "pizza", "sushi", "sushi", "pizza", "sushi"],
        "sushi",
      ],
    ];
    for (let i = 0; i < tests.length; i++) {
      const [votes, expected] = tests[i];
      const result = fn(votes);
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
* Finds the most frequently ordered dish in a 
restaurant based on customer votes.
* @param {string[]} votes - An array of dish names voted by customers.
* @return {string} - The name of the most frequently ordered dish.
*/
function mostFrequentDish(votes) {
    // write code here
}
`;

export const restaurantRatings: Problem = {
  id: "restaurant-ratings",
  title: "Most Frequent Dish in Restaurant",
  problemStatement: `
        <p class='mt-3'>
        A restaurant is analyzing feedback from customers to determine the most popular dish. Given a list of dish names that customers have voted for, write a function to find the dish that has been ordered the most. If there is a tie, return any one of the most frequently ordered dishes.
        </p>
    `,
  examples: [
    {
      id: 0,
      inputText: `["pizza", "burgers", "pizza", "burgers", "pizza", "pizza"]`,
      outputText: `"pizza"`,
    },
    {
      id: 1,
      inputText: `["pasta", "pasta", "burgers", "pasta", "pizza", "burgers", "pasta", "pasta", "pasta"]`,
      outputText: `"pasta"`,
    },
    {
      id: 2,
      inputText: `["sushi", "pizza", "sushi", "sushi", "pizza", "sushi"]`,
      outputText: `"sushi"`,
    },
  ],
  constraints: `
  <ul>
    <li class='mt-2'><code>1 <= votes.length <= 10^4</code></li>
    <li class='mt-2'>The <code>votes</code> array consists of non-empty strings.</li>
  </ul>
  `,
  starterCode: starterCode,
  handlerFunction: testRestaurantRatings,
  starterFunctionName: "function mostFrequentDish(",
  order: 11,
};
