import Link from "next/link";
import { collection, query, getDocs, orderBy } from "firebase/firestore";
import { firestore } from "@/firebase/firebase";
import { CheckCircle } from "lucide-react";
import { ProblemMetaData } from "@/constants/types/problems";

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

const ProblemsTable = async () => {
  const problems = await getProblems();

  if (!problems) {
    return <div>There was an error retrieving the data</div>;
  }

  console.log(problems);

  return (
    <tbody className="text-white">
      {problems.map((problem, index) => {
        return (
          <tr
            key={index}
            className={`${index % 2 === 0 ? "bg-stone-900/30" : ""}`}
          >
            <th className="px-2 py-4 font-medium whitespace-nowrap text-brand-red/50">
              <CheckCircle width="18" fontSize="18" />
            </th>
            <td className="px-6 py-4">
              <Link
                href={`/problems/${problem.id}`}
                className="text-brand-red/80 hover:text-brand-red/90"
              >
                {problem.title}
              </Link>
            </td>
            <td className="px-6 py-4 text-white/50 hidden sm:table-cell">
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
                }`}
              >
                {problem.difficulty}
              </span>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};

export default ProblemsTable;
