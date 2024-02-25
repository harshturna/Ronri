import { Code, ThumbsUp, Trophy } from "lucide-react";
import Image from "next/image";

const Features = () => {
  return (
    <div className="grid grid-cols-1 gap-5 mx-8 md:mx-[6rem] lg:mx-auto pb-5 max-w-[1000px] lg:grid-cols-2 ">
      <div className="flex bg-[#4d281c2e] border-2 border-[#432b2237] p-12 rounded-md lg:col-span-2">
        <div>
          <Code className="p-2 bg-brand-red-s rounded-lg" size={50} />
          <h3 className="text-2xl my-3">Build Practical Coding Skills</h3>
          <p className="font-light text-sm md:text-base">
            Our coding challenges mirror the real-world scenarios you will
            encounter, offering a range of difficulties from introductory to
            advanced problems. Start where you feel comfortable, or push your
            limits for a more intense experience.
          </p>
        </div>
      </div>
      <div className="flex bg-stone-900/30 p-12 border-2 border-stone-900 rounded-md">
        <div className="">
          <ThumbsUp className="p-2 bg-stone-900/70 rounded-lg" size={50} />
          <h3 className="text-2xl my-3">Receive Immediate Feedback</h3>
          <p className="font-light text-sm md:text-base">
            Validate your solutions directly in the browser using our
            comprehensive test cases, ensuring every edge case is addressed.
            After passing all tests, aim to refine and optimize your solutions
            for better efficiency and creativity.
          </p>
        </div>
      </div>
      <div className="flex bg-stone-900/30 p-12 rounded-md border-2 border-stone-900">
        <div>
          <Trophy className="p-2 bg-stone-900/70 rounded-lg" size={50} />
          <h3 className="text-2xl my-3">Earn Your Completion Badge</h3>
          <p className="font-light text-sm md:text-base">
            Secure a completion badge with every problem you solve, a testament
            to your skill and perseverance. These badges not only mark your
            achievements but also enhance your portfolio, showcasing your coding
            prowess to peers and potential employers.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Features;
