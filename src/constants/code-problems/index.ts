import { Problem } from "../types/problems";
import { jumpGame } from "./jump-game";
import { reverseLinkedList } from "./reverse-linked-list";
import { search2DMatrix } from "./search-a-2d-matrix";
import { twoSum } from "./two-sum";
import { validParentheses } from "./valid-parentheses";
import { mergeMettingTimes } from "./merge-meeting-times";
import { stringCompression } from "./string-compression";
import { roomScheduling } from "./room-scheduling";
import { maxiumumProfitJobScheduling } from "./maximum-profit-job-scheduling";
import { findNearestStore } from "./find-nearest-store";

interface ProblemMap {
  [key: string]: Problem;
}

export const problems: ProblemMap = {
  "two-sum": twoSum,
  "reverse-linked-list": reverseLinkedList,
  "jump-game": jumpGame,
  "search-a-2d-matrix": search2DMatrix,
  "valid-parentheses": validParentheses,
  "merge-meeting-times": mergeMettingTimes,
  "string-compression": stringCompression,
  "room-scheduling": roomScheduling,
  "maximum-profit-in-job-scheduling": maxiumumProfitJobScheduling,
  "find-nearest-store": findNearestStore,
};
