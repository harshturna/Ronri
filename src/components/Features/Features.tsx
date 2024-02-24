import { Code, ThumbsUp, Trophy } from "lucide-react";
import Image from "next/image";
import feature_one from "../../../public/feature_one.png";

const Features = () => {
  return (
    <div className="mx-10 flex flex-col gap-4 ">
      <div className="flex bg-[#502e232a] border-2 border-[#432b2237] p-4 md:p-12 rounded-md">
        <div>
          <Code className="p-2 bg-brand-red-s rounded-lg" size={50} />
          <h3 className="text-2xl my-3">Sharpen your coding skills</h3>
          <p className="font-light text-sm md:text-base">
            Challenge yourself on small coding exercises called kata. Each kata
            is crafted by the community to help you strengthen different coding
            techniques. Master your current language of choice, or quickly pick
            up any of the 55+ programming languages supported.
          </p>
        </div>
        <Image src={feature_one} alt="feature one" width={300} height={600} />
      </div>
      <div className="flex bg-stone-900/30 p-4 md:p-12 border-2 border-stone-900 rounded-md">
        <div className="">
          <ThumbsUp className="p-2 bg-stone-900/70 rounded-lg" size={50} />
          <h3 className="text-2xl my-3">Get instant feedback</h3>
          <p className="font-light text-sm md:text-base">
            Solve kata with your coding style right in the browser and use test
            cases (TDD) to check it as you progress. Retrain with new, creative,
            and optimized approaches. Find all of the bugs in your programming
            practice.
          </p>
        </div>
        <p>IMAGE</p>
      </div>
      <div className="flex bg-stone-900/30 p-4 md:p-12 rounded-md border-2 border-stone-900">
        <div>
          <Trophy className="p-2 bg-stone-900/70 rounded-lg" size={50} />
          <h3 className="text-2xl my-3">Earn ranks and honor</h3>
          <p className="font-light text-sm md:text-base">
            Kata code challenges are ranked from beginner to expert level. As
            you complete higher-ranked kata, you level up your profile and push
            your software development skills to your highest potential.
          </p>
        </div>
        <p>IMAGE</p>
      </div>
    </div>
  );
};

export default Features;
