"use client";

import Split from "react-split";
import ProblemDescription from "./ProblemDescription/ProblemDescription";

const Workspace = () => {
  return (
    <Split className="split">
      <ProblemDescription />
      <div>The code editor will go here</div>
    </Split>
  );
};

export default Workspace;
