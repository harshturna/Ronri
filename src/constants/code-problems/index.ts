import { Problem } from "../types/problems";
import { mergeMettingTimes } from "./merge-meeting-times";
import { stringCompression } from "./string-compression";
import { roomScheduling } from "./room-scheduling";
import { maxiumumProfitJobScheduling } from "./maximum-profit-job-scheduling";
import { findNearestStore } from "./find-nearest-store";
import { flightItineraryPlanner } from "./flight-itinerary-planner";
import { apartmentHunting } from "./apartment-hunting";
import { decodeString } from "./decode-string";
import { minPathSum } from "./min-path-sum";
import { firstUniqueCharacter } from "./first-unique-character";
import { restaurantRatings } from "./restaurant-ratings";

interface ProblemMap {
  [key: string]: Problem;
}

export const problems: ProblemMap = {
  "merge-meeting-times": mergeMettingTimes,
  "string-compression": stringCompression,
  "room-scheduling": roomScheduling,
  "maximum-profit-in-job-scheduling": maxiumumProfitJobScheduling,
  "find-nearest-store": findNearestStore,
  "flight-itinerary-planner": flightItineraryPlanner,
  "apartment-hunting": apartmentHunting,
  "decode-string": decodeString,
  "min-path-sum": minPathSum,
  "first-unique-character": firstUniqueCharacter,
  "restaurant-ratings": restaurantRatings
};
