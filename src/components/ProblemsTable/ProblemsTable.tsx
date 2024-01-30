import { problems } from "@/mockProblems/problems";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

const ProblemsTable = () => {
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
                className="text-brand-red/60 hover:text-brand-red/90"
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
