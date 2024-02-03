import Topbar from "@/components/Topbar/Topbar";
import Workspace from "@/components/Workspace/Workspace";
import { problems } from "@/constants/code-problems";

const ProblemsPage = ({ params }: { params: { pid: string } }) => {
  if (!params.pid || !problems[params.pid]) {
    return <div>Problem not found</div>;
  }

  const problem = problems[params.pid];
  problem.handlerFunction = problem.handlerFunction.toString();
  return (
    <div>
      <Topbar isProblemsPage />
      <Workspace problem={problem} />
    </div>
  );
};

export default ProblemsPage;
