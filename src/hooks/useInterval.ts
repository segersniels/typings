import { useEffect, useRef } from "react";

const useInterval = (callback, delay) => {
  const callbackRef = useRef(null);

  // update callback function with current render callback that has access to latest props and state
  useEffect(() => {
    callbackRef.current = callback;
  });

  useEffect(() => {
    if (!delay) {
      return () => {
        // noop
      };
    }

    const interval = setInterval(() => {
      callbackRef.current();
    }, delay);

    return () => clearInterval(interval);
  }, [delay]);
};

export default useInterval;
