"use client";

import Split from "react-split";
import ProblemDescription from "./ProblemDescription/ProblemDescription";
import CodePlayground from "../CodePlayground/CodePlayground";

const Workspace = () => {
  return (
    <Split className="split" minSize={0}>
      <ProblemDescription />
      <CodePlayground />
    </Split>
  );
};

export default Workspace;
