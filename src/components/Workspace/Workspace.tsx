"use client";

import Split from "react-split";
import ProblemDescription from "./ProblemDescription/ProblemDescription";
import CodePlayground from "../CodePlayground/CodePlayground";
import { Problem, ProblemMetaData } from "@/constants/types/problems";

interface WorkspaceProps {
  problem: Problem;
  problemData: ProblemMetaData;
}

const Workspace = ({ problem, problemData }: WorkspaceProps) => {
  return (
    <Split className="split" minSize={0} sizes={[40, 60]}>
      <ProblemDescription problem={problem} problemData={problemData} />
      <CodePlayground problem={problem} />
    </Split>
  );
};

export default Workspace;
