import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "@/firebase/firebase";
import { doc, getDoc, runTransaction } from "firebase/firestore";
import { CheckCircle, Star, ThumbsDown, ThumbsUp } from "lucide-react";
import { Problem, ProblemMetaData } from "@/constants/types/problems";
import { toast } from "react-toastify";

interface ProblemDescriptionProps {
  problem: Problem;
  problemData: ProblemMetaData;
}

const ProblemDescription = ({
  problem,
  problemData,
}: ProblemDescriptionProps) => {
  const {
    liked,
    disliked,
    starred,
    solved,
    setData: setUserData,
  } = useUsersProblemData(problem.id);
  const [user] = useAuthState(auth);

  const handleLike = async () => {
    if (!user) {
      toast.error("You must be logged in to like a problem");
      return;
    }

    await runTransaction(firestore, async (transaction) => {
      const userRef = doc(firestore, "users", user.uid);
      const problemRef = doc(firestore, "problems", problem.id);
      const userDoc = await transaction.get(userRef);
      const problemDoc = await transaction.get(problemRef);

      if (userDoc.exists() && problemDoc.exists()) {
        if (liked) {
          transaction.update(userRef, {
            likedProblems: userDoc
              .data()
              .likedProblems.filter((id: string) => id !== problem.id),
          });
          transaction.update(problemRef, {
            likes: problemDoc.data().likes - 1,
          });
          // TODO: probably need to use the hook:///
        }
      }
    });
  };

  return (
    <div className="bg-stone-900/30">
      {/* TAB */}
      <div className="flex h-11 w-full items-center pt-2  text-white/80 overflow-x-hidden">
        <div
          className={
            "bg-stone-900/30 rounded-t-[5px] px-5 py-[10px] text-xs cursor-pointer"
          }
        >
          Description
        </div>
      </div>

      <div className="flex px-0 py-4 h-[calc(100vh-94px)] overflow-y-auto">
        <div className="px-5">
          {/* Problem heading */}
          <div className="w-full">
            <div className="flex space-x-4">
              <div className="flex-1 mr-2 text-lg text-white font-medium">
                {problem.title}
              </div>
            </div>
            <div className="flex items-center mt-3">
              <div
                className={`${
                  problemData.difficulty === "Easy"
                    ? "text-emerald-600"
                    : problemData.difficulty === "Medium"
                    ? "text-yellow-600"
                    : "text-red-500/80"
                } bg-emerald-100 inline-block rounded-[21px] bg-opacity-[.15] px-2.5 py-1 text-xs font-medium capitalize `}
              >
                {problemData.difficulty}
              </div>
              <div className="rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-brand-red/80">
                <CheckCircle />
              </div>
              <div
                className="flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px]  ml-4 text-lg transition-colors duration-200 text-dark-gray-6"
                onClick={handleLike}
              >
                <ThumbsUp />
                <span className="text-xs">{problemData.likes}</span>
              </div>
              <div className="flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px]  ml-4 text-lg transition-colors duration-200 text-green-s text-dark-gray-6">
                <ThumbsDown />
                <span className="text-xs">{problemData.dislikes}</span>
              </div>
              <div className="cursor-pointer rounded p-[3px]  ml-4 text-xl transition-colors duration-200 text-yellow-200">
                <Star />
              </div>
            </div>

            {/* Problem Statement*/}
            <div className="text-white text-sm">
              <div
                dangerouslySetInnerHTML={{ __html: problem.problemStatement }}
              />
            </div>

            {/* Examples */}
            <div className="mt-4">
              {problem.examples.map((example, index) => (
                <div key={example.id}>
                  <p className="font-medium text-white ">Example {index + 1}</p>
                  <div className="example-card">
                    <pre>
                      <strong className="text-white">Input: </strong>{" "}
                      {example.inputText}
                      <br />
                      <strong>Output:</strong> {example.outputText} <br />
                      {example.explanation && (
                        <div>
                          <strong>Explanation:</strong> {example.explanation}
                        </div>
                      )}
                    </pre>
                  </div>
                </div>
              ))}
            </div>

            {/* Constraints */}
            <div className="my-5">
              <div className="text-white text-sm font-medium">Constraints:</div>
              <ul className="text-white ml-5 list-disc">
                {
                  <div
                    dangerouslySetInnerHTML={{ __html: problem.constraints }}
                  />
                }
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemDescription;

function useUsersProblemData(problemId: string) {
  const [data, setData] = useState({
    liked: false,
    disliked: false,
    starred: false,
    solved: false,
  });
  const [user] = useAuthState(auth);
  useEffect(() => {
    const getUsersProblemData = async () => {
      const userRef = doc(firestore, "users", user!.uid);
      const userSnapshot = await getDoc(userRef);
      if (userSnapshot.exists()) {
        const data = userSnapshot.data();
        const {
          solvedProblems,
          likedProblems,
          dislikedProblems,
          starredProblems,
        } = data;
        setData({
          liked: likedProblems.includes(problemId),
          disliked: dislikedProblems.includes(problemId),
          solved: solvedProblems.includes(problemId),
          starred: starredProblems.includes(problemId),
        });
      }
    };

    if (user) getUsersProblemData();

    return () =>
      setData({ liked: false, disliked: false, starred: false, solved: false });
  }, [problemId, user]);
  return { ...data, setData };
}
