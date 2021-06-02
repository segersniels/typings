import { useState } from "react";

import useInterval from "./useInterval";

const useTimer = () => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useInterval(
    () => {
      setSeconds((prevSeconds) => prevSeconds + 0.1);
    },
    isRunning ? 100 : null
  );

  function start() {
    setIsRunning(true);
  }

  function reset() {
    setIsRunning(false);
    setSeconds(0);
  }

  return {
    seconds,
    start,
    reset,
    isRunning,
  };
};

export default useTimer;
