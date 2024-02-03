import PreferenceNav from "../PreferenceNav/PreferenceNav";
import Split from "react-split";

import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { javascript } from "@codemirror/lang-javascript";
import PlaygroundFooter from "./PlaygroundFooter";
import { Problem } from "@/constants/types/problems";
import { useState } from "react";

interface CodePlaygroundProps {
  problem: Problem;
}

const CodePlayground = ({ problem }: CodePlaygroundProps) => {
  const [selectectedCase, setSelectedCase] = useState(0);
  return (
    <main className="flex flex-col relative overflow-x-hidden">
      <PreferenceNav />
      <Split
        className="h-[calc(100vh-94px)]"
        direction="vertical"
        sizes={[60, 40]}
        minSize={80}
      >
        <div className="w-full overflow-auto bg-[#e3d9d90f]">
          <CodeMirror
            value={problem.starterCode}
            theme={vscodeDark}
            extensions={[javascript()]}
            style={{ fontSize: 16 }}
          />
        </div>
        <div className="w-full px-5 overflow-auto">
          <div className="flex h-10 items-center space-x-6">
            <div className="relative flex h-full flex-col justify-center cursor-pointer">
              <div className="text-sm font-medium leading-5 text-white">
                Test Cases
              </div>
              <hr className="absolute bottom-0 h-0.5 w-full rounded-full border-none bg-white" />
            </div>
          </div>
          <div className="flex">
            {problem.examples.map((example, index) => (
              <div
                onClick={() => setSelectedCase(index)}
                className="mr-2 items-start mt-2 text-white"
                key={`{problem.id}-case-${index}`}
              >
                <div
                  className={`font-medium items-center transition-all focus:outline-none inline-fle hover:bg-stone-500/15 relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap ${
                    selectectedCase === index
                      ? "bg-stone-500/20"
                      : "bg-stone-500/10"
                  }`}
                >
                  Case {index + 1}
                </div>
              </div>
            ))}
          </div>
          <div className="font-semibold">
            <p className="text-sm font-medium mt-4 text-white">Input</p>
            <div className="w-full cursor-text rounded-lg px-3 py-[10px] bg-stone-300/10 text-white/80 mt-2">
              {problem.examples[selectectedCase].inputText}
            </div>
            <p className="text-sm font-medium mt-4 text-white">Output</p>
            <div className="w-full cursor-text rounded-lg  px-3 py-[10px] bg-stone-300/10 text-white/80 mt-2">
              {problem.examples[selectectedCase].outputText}
            </div>
          </div>
        </div>
      </Split>
      <PlaygroundFooter />
    </main>
  );
};

export default CodePlayground;
