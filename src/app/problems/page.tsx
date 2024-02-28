import ProblemsTable from "@/components/ProblemsTable/ProblemsTable";
import Topbar from "@/components/Topbar/Topbar";
import { ProblemMetaData } from "@/constants/types/problems";
import { collection, query, getDocs, orderBy } from "firebase/firestore";
import { firestore } from "@/firebase/firebase";

async function getProblems() {
  try {
    const problems: ProblemMetaData[] = [];
    const q = query(collection(firestore, "problems"), orderBy("order"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      problems.push(doc.data()! as ProblemMetaData);
    });
    return problems;
  } catch (error) {
    return null;
  }
}

export default async function ProblemsPage() {
  const problems = await getProblems();

  if (!problems) {
    return <div>There was an error retrieving the data</div>;
  }
  return (
    <main className="min-h-screen text-white">
      <Topbar />
      <h1 className="text-2xl text-center text-brand-red dark:text-brand-red  uppercase mt-12 mb-5 bg-stone-900/30  w-10/12 sm:w-7/12  max-w-[1200px] mx-auto py-3 rounded-md">
        Put your skills to test
      </h1>

      <div className="w-10/12 md:w-7/12  max-w-[1200px] mx-auto text-gray-400 flex justify-between mb-8 items-center flex-wrap gap-4">
        <div className="flex gap-2 flex-wrap">
          <span className="text-xs bg-stone-900/80 py-2 px-3 rounded-xl">
            Array 3
          </span>
          <span className="text-xs bg-stone-900/80 py-2 px-3 rounded-xl">
            String 2
          </span>
          <span className="text-xs bg-stone-900/80 py-2 px-3 rounded-xl">
            Hash Map 2
          </span>
          <span className="text-xs bg-stone-900/80 py-2 px-3 rounded-xl">
            Search 2
          </span>
          <span className="text-xs bg-stone-900/80 py-2 px-3 rounded-xl">
            Dynamic Programming 2
          </span>
        </div>
        <div>
          <span className="text-xs bg-stone-900/80 py-2 px-3 rounded-xl">
            Total Problems 11
          </span>
        </div>
      </div>

      <div className="relative overflow-x-auto mx-auto px-6 pb-10 ">
        <table className="text-xs md:text-sm text-left text-gray-500 dark:text-gray-400 sm:w-7/12 w-full max-w-[1200px] mx-auto">
          <thead className="text-xs text-gray-700  dark:text-gray-400 border-b ">
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
          <ProblemsTable problems={problems} />
        </table>
      </div>
    </main>
  );
}
