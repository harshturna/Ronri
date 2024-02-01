"use client";

import { useState, useEffect } from "react";
import { RefreshCw, Timer as TimerIcon } from "lucide-react";

const Timer = () => {
  const [showTimer, setShowTimer] = useState(false);
  const [time, setTime] = useState(0);

  const formatTime = (time: number): string => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return `${hours < 10 ? "0" + hours : hours}:${
      minutes < 10 ? "0" + minutes : minutes
    }:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (showTimer) {
      intervalId = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [showTimer]);

  return (
    <div>
      {showTimer ? (
        <div className="flex items-center py-1 px-2 space-x-2 bg-gray-200/10 cursor-pointer rounded hover:bg-gray-200/15">
          <div>{formatTime(time)}</div>
          <div
            className="text-brand-red border-l-2 border-stone-700 pl-1"
            onClick={() => {
              setShowTimer(false);
              setTime(0);
            }}
          >
            <RefreshCw width={20} height={20} />
          </div>
        </div>
      ) : (
        <div
          className="flex items-center p-2 h-9 hover:bg-gray-200/5 rounded cursor-pointer text-brand-red/80"
          onClick={() => setShowTimer(true)}
        >
          <TimerIcon />
        </div>
      )}
    </div>
  );
};

export default Timer;
