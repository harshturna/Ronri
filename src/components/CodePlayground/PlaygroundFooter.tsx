import { ChevronUp } from "lucide-react";

interface PlaygroundFooterProps {
  handleSubmit: () => void;
}

const PlaygroundFooter = ({ handleSubmit }: PlaygroundFooterProps) => {
  return (
    <div className="flex bg-stone-950 absolute bottom-0 z-10 w-full">
      <div className="mx-5 my-[10px] flex justify-between w-full">
        <div className="mr-2 flex flex-1 flex-nowrap items-center space-x-4">
          {/* <button className="px-3 py-1.5 font-medium items-center transition-all inline-flex bg-stone-500/10 text-sm hover:bg-stone-500/15 text-dark-label-2 rounded-lg pl-3 pr-2">
            Console
            <div className="ml-1 transform transition flex items-center">
              <ChevronUp className="fill-gray-6 mx-1 fill-dark-gray-6" />
            </div>
          </button> */}
        </div>
        <div className="ml-auto flex items-center space-x-4">
          {/* <button className="px-3 py-1.5 text-sm font-medium items-center whitespace-nowrap transition-all focus:outline-none inline-flex bg-stone-500/10  hover:bg-stone-500/15 text-dark-label-2 rounded-lg">
            Run
          </button> */}
          <button
            className="px-3 py-1.5 font-medium items-center transition-all focus:outline-none inline-flex text-sm text-white bg-emerald-500/80 hover:bg-emerald-500/60 rounded-lg"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaygroundFooter;
