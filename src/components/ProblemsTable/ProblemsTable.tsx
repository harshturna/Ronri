"use client";
import { useState } from "react";
import Link from "next/link";
// import { collection, query, getDocs, orderBy } from "firebase/firestore";
// import { firestore } from "@/firebase/firebase";
// import { CheckCircle } from "lucide-react";
import { ProblemMetaData } from "@/constants/types/problems";
import { AudioWaveform } from "lucide-react";

interface ProblemsTable {
  problems: ProblemMetaData[];
}

const ProblemsTable = ({ problems }: ProblemsTable) => {
  const [selectedProblems, setSelectedProblems] = useState(problems);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const problemFilterHandler = (type: string) => {
    setSelectedCategory(type);
    if (type === "All") {
      return setSelectedProblems(problems);
    }
    const filterdProblems = problems.filter(
      (problem) => problem.category === type
    );
    setSelectedProblems(filterdProblems);
  };

  if (!problems) {
    return <div>There was an error retrieving the data</div>;
  }

  return (
    <>
      <div className="w-10/12 md:w-7/12  max-w-[1200px] mx-auto text-gray-400 flex justify-between mb-8 items-center flex-wrap gap-4">
        <div>
          <span
            className={`cursor-pointer text-xs py-2 px-3 rounded-xl ${
              selectedCategory === "All" ? "bg-stone-700" : "bg-stone-900/80"
            }`}
            onClick={() => problemFilterHandler("All")}
          >
            All Problems (11)
          </span>
        </div>
        <div className="flex gap-2 flex-wrap">
          <span
            className={`cursor-pointer text-xs py-2 px-3 rounded-xl ${
              selectedCategory === "Array" ? "bg-stone-700" : "bg-stone-900/80"
            }`}
            onClick={() => problemFilterHandler("Array")}
          >
            Array (3)
          </span>
          <span
            className={`cursor-pointer text-xs py-2 px-3 rounded-xl ${
              selectedCategory === "String" ? "bg-stone-700" : "bg-stone-900/80"
            }`}
            onClick={() => problemFilterHandler("String")}
          >
            String (2)
          </span>
          <span
            className={`cursor-pointer text-xs py-2 px-3 rounded-xl ${
              selectedCategory === "Hash Map"
                ? "bg-stone-700"
                : "bg-stone-900/80"
            }`}
            onClick={() => problemFilterHandler("Hash Map")}
          >
            Hash Map (2)
          </span>
          <span
            className={`cursor-pointer text-xs py-2 px-3 rounded-xl ${
              selectedCategory === "Search" ? "bg-stone-700" : "bg-stone-900/80"
            }`}
            onClick={() => problemFilterHandler("Search")}
          >
            Search (2)
          </span>
          <span
            className={`cursor-pointer text-xs py-2 px-3 rounded-xl ${
              selectedCategory === "Dynamic Programming"
                ? "bg-stone-700"
                : "bg-stone-900/80"
            }`}
            onClick={() => problemFilterHandler("Dynamic Programming")}
          >
            Dynamic Programming (2)
          </span>
        </div>
      </div>
      <div className="justify-center w-10/12 text-gray-400 sm:w-7/12  max-w-[1200px] mx-auto mb-2 flex ">
        <div className="border-b-[1px] font-bold flex gap-2 pb-3 pl-2 pr-3 border-brand-red/70">
          <AudioWaveform />
          <p>Library</p>
        </div>
      </div>
      <div className="relative overflow-x-auto mx-auto px-6 pb-10 ">
        <table className="text-xs md:text-sm text-left text-gray-500 dark:text-gray-400 sm:w-7/12 w-full max-w-[1200px] mx-auto">
          <thead className="text-xs text-gray-700  dark:text-gray-400 border-b border-gray-600">
            <tr>
              {/* <th scope="col" className="px-1 py-3 w-0 font-medium">
                Status
              </th> */}
              <th scope="col" className="px-6 py-3 w-0 font-medium">
                Problem
              </th>
              <th scope="col" className="px-6 py-3 w-0 font-medium table-cell">
                Category
              </th>
              <th scope="col" className="px-6 py-3 w-0 font-medium">
                Difficulty
              </th>
            </tr>
          </thead>
          <tbody className="text-white">
            {selectedProblems.map((problem, index) => {
              return (
                <tr
                  key={index}
                  className={`${index % 2 === 0 ? "bg-stone-900/30" : ""}`}
                >
                  {/* <th className="px-2 py-4 font-medium whitespace-nowrap text-brand-red/50"> */}
                  {/* <CheckCircle width="18" fontSize="18" /> */}
                  {/* </th> */}
                  <td className="px-6 py-4">
                    <Link
                      href={`/problems/${problem.id}`}
                      className="text-brand-red/80 hover:text-brand-red/90 font-bold"
                    >
                      {problem.title}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-white/50 table-cell font-bold">
                    <span>{problem.category}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`${
                        problem.difficulty === "Easy"
                          ? "text-emerald-600"
                          : problem.difficulty === "Medium"
                          ? "text-yellow-600"
                          : "text-red-500/80"
                      } bg-emerald-100 inline-block rounded-[21px] bg-opacity-[.15] px-2.5 py-1 text-xs font-medium capitalize`}
                    >
                      {problem.difficulty}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProblemsTable;
