import { useCallback, useRef } from "react";
import { Word } from "types/Word";

const useWordsPerMinute = () => {
  // Use a ref to mutate since we can't afford to wait for asynchronous state updates
  const wordsPerMinute = useRef(0);

  const reset = useCallback(() => {
    wordsPerMinute.current = 0;
  }, []);

  const calculateWordsPerMinute = (words: Word[]) => {
    if (!words.length) {
      return;
    }

    const wordsTyped = words.filter((word) => word.isCorrect).length;
    const totalTimeSpent = words.reduce(
      (spent, word) => spent + word.seconds,
      0
    );

    wordsPerMinute.current = Math.floor((wordsTyped / totalTimeSpent) * 60);

    return wordsPerMinute.current;
  };

  return {
    wordsPerMinute: wordsPerMinute.current,
    calculateWordsPerMinute,
    reset,
  };
};

export default useWordsPerMinute;
