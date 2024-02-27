import PreferenceNav from "../PreferenceNav/PreferenceNav";
import Split from "react-split";

import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { javascript } from "@codemirror/lang-javascript";
import PlaygroundFooter from "./PlaygroundFooter";
import { Problem } from "@/constants/types/problems";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "@/firebase/firebase";
import { toast } from "react-toastify";
import { problems } from "@/constants/code-problems";
import { usePathname, useRouter } from "next/navigation";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";

interface CodePlaygroundProps {
  problem: Problem;
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

const CodePlayground = ({ problem, setSuccess }: CodePlaygroundProps) => {
  const [selectectedCase, setSelectedCase] = useState(0);
  const [userCode, setUserCode] = useState(problem.starterCode);
  const [user] = useAuthState(auth);
  const pathName = usePathname();
  const router = useRouter();
  const pId = pathName?.split("/").at(-1) || "";

  useEffect(() => {
    const code = localStorage.getItem(`code-${pId}`);
    if (user) {
      setUserCode(code ? JSON.parse(code) : problem.starterCode);
    } else {
      setUserCode(problem.starterCode);
    }
  }, [pId, user, problem.starterCode]);

  const onEditorChange = async (value: string) => {
    setUserCode(value);
  };

  const handleSubmit = async () => {
    if (!user) {
      return toast.error("Login to submit");
    }
    localStorage.setItem(`code-${pId}`, JSON.stringify(userCode));
    try {
      const submissionCode = userCode.slice(
        userCode.indexOf(problem.starterFunctionName)
      );
      const cb = new Function(`return ${submissionCode}`)();

      console.log(cb);
      const handler = problems[pId].handlerFunction;

      if (typeof handler === "function") {
        const success = handler(cb);
        if (success) {
          toast.success("Congrats! All test passed!");
          const userRef = doc(firestore, "users", user.uid);
          await updateDoc(userRef, {
            solvedProblems: arrayUnion(pId),
          });
        }
      }
    } catch (error: any) {
      console.log(error);
      if (error.message.includes("AssertionError")) {
        toast.error("Oops! One or more test cases failed");
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <main className="flex flex-col relative overflow-x-hidden">
      <PreferenceNav />
      <Split
        className="h-[calc(100vh-110px)]"
        direction="vertical"
        sizes={[60, 40]}
        minSize={80}
      >
        <div className="w-full overflow-auto bg-[#e3d9d90f]">
          <CodeMirror
            value={userCode}
            theme={vscodeDark}
            extensions={[javascript()]}
            style={{ fontSize: 16 }}
            onChange={onEditorChange}
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
      <PlaygroundFooter handleSubmit={handleSubmit} />
    </main>
  );
};

export default CodePlayground;
