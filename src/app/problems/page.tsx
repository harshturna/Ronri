import ProblemsTable from "@/components/ProblemsTable/ProblemsTable";
import Topbar from "@/components/Topbar/Topbar";
import { ProblemMetaData } from "@/constants/types/problems";
import { collection, query, getDocs, orderBy } from "firebase/firestore";
import { firestore } from "@/firebase/firebase";
import { AudioWaveform } from "lucide-react";

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
      <h1 className="text-1xl md:text-2xl font-bold text-center text-brand-red dark:text-brand-red  uppercase mt-5 mb-5 bg-stone-900/30  w-10/12 sm:w-7/12  max-w-[1200px] mx-auto py-3 rounded-md">
        Put your skills to test
      </h1>
      <ProblemsTable problems={problems} />
    </main>
  );
}
