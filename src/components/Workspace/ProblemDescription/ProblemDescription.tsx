import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "@/firebase/firebase";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  runTransaction,
  updateDoc,
} from "firebase/firestore";
import { CheckCircle, Star, ThumbsDown, ThumbsUp } from "lucide-react";
import { Problem, ProblemMetaData } from "@/constants/types/problems";
import { toast } from "react-toastify";

interface ProblemDescriptionProps {
  problem: Problem;
}

const ProblemDescription = ({ problem }: ProblemDescriptionProps) => {
  const {
    liked,
    disliked,
    starred,
    solved,
    setData: setUserData,
  } = useUsersProblemData(problem.id);

  const {
    currentProblem: problemData,
    loading,
    problemDifficultyClass,
    setCurrentProblem,
  } = useGetCurrentProblem(problem.id);
  const [updating, setUpdating] = useState(false);

  const [user] = useAuthState(auth);

  const handleLike = async () => {
    if (!user) {
      toast.error("You must be logged in to like a problem", {
        position: "top-left",
        theme: "dark",
      });
      return;
    }
    if (updating) return;
    setUpdating(true);
    await runTransaction(firestore, async (transaction) => {
      const userRef = doc(firestore, "users", user.uid);
      const problemRef = doc(firestore, "problems", problem.id);
      const userDoc = await transaction.get(userRef);
      const problemDoc = await transaction.get(problemRef);

      if (userDoc.exists() && problemDoc.exists()) {
        if (liked) {
          // remove problem id from likedProblems on user document, decrement likes on problem document
          transaction.update(userRef, {
            likedProblems: userDoc
              .data()
              .likedProblems.filter((id: string) => id !== problem.id),
          });
          transaction.update(problemRef, {
            likes: problemDoc.data().likes - 1,
          });

          setCurrentProblem((prev) =>
            prev ? { ...prev, likes: prev.likes - 1 } : null
          );
          setUserData((prev) => ({ ...prev, liked: false }));
        } else if (disliked) {
          transaction.update(userRef, {
            likedProblems: [...userDoc.data().likedProblems, problem.id],
            dislikedProblems: userDoc
              .data()
              .dislikedProblems.filter((id: string) => id !== problem.id),
          });
          transaction.update(problemRef, {
            likes: problemDoc.data().likes + 1,
            dislikes: problemDoc.data().dislikes - 1,
          });

          setCurrentProblem((prev) =>
            prev
              ? { ...prev, likes: prev.likes + 1, dislikes: prev.dislikes - 1 }
              : null
          );
          setUserData((prev) => ({ ...prev, liked: true, disliked: false }));
        } else {
          transaction.update(userRef, {
            likedProblems: [...userDoc.data().likedProblems, problem.id],
          });
          transaction.update(problemRef, {
            likes: problemDoc.data().likes + 1,
          });
          setCurrentProblem((prev) =>
            prev ? { ...prev, likes: prev.likes + 1 } : null
          );
          setUserData((prev) => ({ ...prev, liked: true }));
        }
      }
    });
    setUpdating(false);
  };

  const handleDislike = async () => {
    if (!user) {
      toast.error("You must be logged in to dislike a problem", {
        position: "top-left",
        theme: "dark",
      });
      return;
    }
    if (updating) return;
    setUpdating(true);
    await runTransaction(firestore, async (transaction) => {
      const userRef = doc(firestore, "users", user.uid);
      const problemRef = doc(firestore, "problems", problem.id);
      const userDoc = await transaction.get(userRef);
      const problemDoc = await transaction.get(problemRef);

      if (userDoc.exists() && problemDoc.exists()) {
        // already disliked, already liked, not disliked or liked
        if (disliked) {
          transaction.update(userRef, {
            dislikedProblems: userDoc
              .data()
              .dislikedProblems.filter((id: string) => id !== problem.id),
          });
          transaction.update(problemRef, {
            dislikes: problemDoc.data().dislikes - 1,
          });
          setCurrentProblem((prev) =>
            prev ? { ...prev, dislikes: prev.dislikes - 1 } : null
          );
          setUserData((prev) => ({ ...prev, disliked: false }));
        } else if (liked) {
          transaction.update(userRef, {
            dislikedProblems: [...userDoc.data().dislikedProblems, problem.id],
            likedProblems: userDoc
              .data()
              .likedProblems.filter((id: string) => id !== problem.id),
          });
          transaction.update(problemRef, {
            dislikes: problemDoc.data().dislikes + 1,
            likes: problemDoc.data().likes - 1,
          });
          setCurrentProblem((prev) =>
            prev
              ? { ...prev, dislikes: prev.dislikes + 1, likes: prev.likes - 1 }
              : null
          );
          setUserData((prev) => ({ ...prev, disliked: true, liked: false }));
        } else {
          transaction.update(userRef, {
            dislikedProblems: [...userDoc.data().dislikedProblems, problem.id],
          });
          transaction.update(problemRef, {
            dislikes: problemDoc.data().dislikes + 1,
          });
          setCurrentProblem((prev) =>
            prev ? { ...prev, dislikes: prev.dislikes + 1 } : null
          );
          setUserData((prev) => ({ ...prev, disliked: true }));
        }
      }
    });
    setUpdating(false);
  };

  const handleStar = async () => {
    if (!user) {
      toast.error("You must be logged in to dislike a problem", {
        position: "top-left",
        theme: "dark",
      });
      return;
    }
    if (updating) return;
    setUpdating(true);

    if (!starred) {
      const userRef = doc(firestore, "users", user.uid);
      await updateDoc(userRef, {
        starredProblems: arrayUnion(problem.id),
      });
      setUserData((prev) => ({ ...prev, starred: true }));
    } else {
      const userRef = doc(firestore, "users", user.uid);
      await updateDoc(userRef, {
        starredProblems: arrayRemove(problem.id),
      });
      setUserData((prev) => ({ ...prev, starred: false }));
    }

    setUpdating(false);
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

      <div className="flex px-0 py-4 h-[calc(100vh-110px)] overflow-y-auto">
        <div className="px-5">
          {/* Problem heading */}
          <div className="w-full">
            <div className="flex space-x-4">
              <div className="flex-1 mr-2 text-lg text-white font-medium">
                {problem.title}
              </div>
            </div>
            {!loading && (
              <div className="flex items-center mt-3">
                <div
                  className={`${
                    problemData?.difficulty === "Easy"
                      ? "text-emerald-600"
                      : problemData?.difficulty === "Medium"
                      ? "text-yellow-600"
                      : "text-red-500/80"
                  } bg-emerald-100 inline-block rounded-[21px] bg-opacity-[.15] px-2.5 py-1 text-xs font-medium capitalize `}
                >
                  {problemData?.difficulty}
                </div>
                <div className="rounded p-[3px] ml-4 text-lg transition-colors duration-200">
                  {!solved && <CheckCircle color="rgb(229 231 235 / 0.1)" />}
                  {solved && <CheckCircle color="rgb(187 67 44)" />}
                </div>
                <div
                  className="flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px]  ml-4 text-lg transition-colors duration-200 text-dark-gray-6 gap-1"
                  onClick={handleLike}
                >
                  {liked && <ThumbsUp size={25} fill="rgb(187 67 44 / 0.8)" />}
                  {!liked && <ThumbsUp size={25} />}
                  <span className="text-xs">{problemData?.likes}</span>
                </div>
                <div
                  className="flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px]  ml-4 text-lg transition-colors duration-200 text-green-s text-dark-gray-6 gap-1"
                  onClick={handleDislike}
                >
                  {disliked && (
                    <ThumbsDown size={25} fill="rgb(187 67 44 / 0.8)" />
                  )}
                  {!disliked && <ThumbsDown size={25} direction="reverse" />}
                  <span className="text-xs">{problemData?.dislikes}</span>
                </div>
                <div
                  className="cursor-pointer rounded p-[3px]  ml-4 text-xl transition-colors duration-200 text-yellow-200/40"
                  onClick={handleStar}
                >
                  {!starred && <Star size={25} />}
                  {starred && (
                    <Star
                      size={25}
                      color="rgb(254, 240, 138)"
                      fill="rgb(254, 240, 138)"
                    />
                  )}
                </div>
              </div>
            )}

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

function useGetCurrentProblem(problemId: string) {
  const [currentProblem, setCurrentProblem] = useState<ProblemMetaData | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [problemDifficultyClass, setProblemDifficultyClass] =
    useState<string>("");

  useEffect(() => {
    // Get problem from DB
    const getCurrentProblem = async () => {
      setLoading(true);
      const docRef = doc(firestore, "problems", problemId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const problem = docSnap.data();
        setCurrentProblem({ id: docSnap.id, ...problem } as ProblemMetaData);
        // easy, medium, hard
        setProblemDifficultyClass(
          problem.difficulty === "Easy"
            ? "bg-olive text-olive"
            : problem.difficulty === "Medium"
            ? "bg-dark-yellow text-dark-yellow"
            : " bg-dark-pink text-dark-pink"
        );
      }
      setLoading(false);
    };
    getCurrentProblem();
  }, [problemId]);

  return { currentProblem, loading, problemDifficultyClass, setCurrentProblem };
}

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
