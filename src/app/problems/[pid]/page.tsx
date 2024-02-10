import Topbar from "@/components/Topbar/Topbar";
import Workspace from "@/components/Workspace/Workspace";
import { problems } from "@/constants/code-problems";
import { firestore } from "@/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { ProblemMetaData } from "@/constants/types/problems";

async function getProblemData(problemId: string) {
  try {
    const docRef = doc(firestore, "problems", problemId);
    const problemData = await getDoc(docRef);

    if (!problemData) return null;

    return problemData.data() as ProblemMetaData;
  } catch (error) {
    return null;
  }
}

const ProblemsPage = async ({ params }: { params: { pid: string } }) => {
  if (!params.pid || !problems[params.pid]) {
    return <div>Problem not found</div>;
  }
  const problem = problems[params.pid];

  const problemData = await getProblemData(params.pid);

  if (!problemData) {
    return <div>Something went wrong while retrieving problem data...</div>;
  }

  problem.handlerFunction = problem.handlerFunction.toString();
  return (
    <div>
      <Topbar isProblemsPage />
      <Workspace problem={problem} problemData={problemData} />
    </div>
  );
};

export default ProblemsPage;
