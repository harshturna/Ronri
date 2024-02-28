"use client";

import { useEffect, useState } from "react";
import { Settings, Expand, Shrink } from "lucide-react";

const PreferenceNav = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  function handleFullScreen() {
    if (isFullScreen) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
    setIsFullScreen(!isFullScreen);
  }

  useEffect(() => {
    function exitHandler(e: any) {
      if (!document.fullscreenElement) {
        setIsFullScreen(false);
        return;
      }
      setIsFullScreen(true);
    }

    if (document.addEventListener) {
      document.addEventListener("fullscreenchange", exitHandler);
    }
  }, [isFullScreen]);

  return (
    <div className="flex items-center justify-between bg-stone-900/30 h-11 w-full">
      <div className="flex items-center mx-auto">
        <button className="flex cursor-pointer items-center rounded text-left focus:outline-none bg-stone-500/10 text-white/40 hover:bg-stone-500/12 px-2 py-1.5 font-medium">
          <div className="flex items-center px-1">
            <div className="text-xs text-label-2">Javascript</div>
          </div>
        </button>
      </div>
      <div className="flex items-center m-2">
        {/* <button className="relative rounded px-3 py-1.5 font-medium items-center transition-all focus:outline-none inline-flex ml-auto p-1 mr- group">
          <div className="h-4 w-4 text-white/40 font-bold text-lg">
            <Settings />
          </div>
          <div className="absolute w-auto p-2 text-sm m-2 min-w-max translate-x-3 right-0 top-7 z10 rounded-md shadow-md text-stone-600 bg-gray-200 origin-center scale-0 transition-all duration-100 ease-linear group-hover:scale-100">
            Settings
          </div>
        </button> */}
        <button className="relative rounded px-3 py-1.5 font-medium items-center transition-all focus:outline-none inline-flex ml-auto p-1 mr- group">
          <div
            className="h-4 w-4 text-white/40 font-bold text-lg"
            onClick={handleFullScreen}
          >
            {isFullScreen ? <Shrink /> : <Expand />}
          </div>
          <div className="absolute w-auto p-2 text-sm m-2 min-w-max translate-x-3 right-0 top-7 z10 rounded-md shadow-md text-stone-600 bg-gray-200 origin-center scale-0 transition-all duration-100 ease-linear group-hover:scale-100">
            Full Screen
          </div>
        </button>
      </div>
    </div>
  );
};

export default PreferenceNav;
