"use client";

import Split from "react-split";
import ProblemDescription from "./ProblemDescription/ProblemDescription";
import CodePlayground from "../CodePlayground/CodePlayground";
import { Problem } from "@/constants/types/problems";

interface WorkspaceProps {
  problem: Problem;
}

const Workspace = ({ problem }: WorkspaceProps) => {
  return (
    <Split className="split" minSize={0} sizes={[40, 60]}>
      <ProblemDescription problem={problem} />
      <CodePlayground problem={problem} />
    </Split>
  );
};

export default Workspace;
