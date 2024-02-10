import Topbar from "@/components/Topbar/Topbar";
import Workspace from "@/components/Workspace/Workspace";
import { problems } from "@/constants/code-problems";
import { firestore } from "@/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

async function getProblemData(problemId: string) {
  try {
    const docRef = doc(firestore, "problems", problemId);
    const problemData = await getDoc(docRef);

    if (!problemData) return null;

    return problemData;
  } catch (error) {
    return null;
  }
}

const ProblemsPage = async ({ params }: { params: { pid: string } }) => {
  if (!params.pid || !problems[params.pid]) {
    return <div>Problem not found</div>;
  }
  const problem = problems[params.pid];

  // console.log(params.pid);

  const problemData = await getProblemData(params.pid);

  console.log(problemData);

  problem.handlerFunction = problem.handlerFunction.toString();
  return (
    <div>
      <Topbar isProblemsPage />
      <Workspace problem={problem} />
    </div>
  );
};

export default ProblemsPage;
