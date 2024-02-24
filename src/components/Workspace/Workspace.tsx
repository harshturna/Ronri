"use client";

import Split from "react-split";
import ProblemDescription from "./ProblemDescription/ProblemDescription";
import CodePlayground from "../CodePlayground/CodePlayground";
import { Problem } from "@/constants/types/problems";
import { useState } from "react";

interface WorkspaceProps {
  problem: Problem;
}

const Workspace = ({ problem }: WorkspaceProps) => {
  const [success, setSuccess] = useState(false);
  return (
    <Split className="split" minSize={0} sizes={[40, 60]}>
      <ProblemDescription problem={problem} />
      <CodePlayground problem={problem} setSuccess={setSuccess} />
    </Split>
  );
};

export default Workspace;
