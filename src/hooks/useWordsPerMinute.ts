import { useCallback, useRef } from "react";
import { emitCustomEvent } from "react-custom-events";
import { Word } from "types/Word";

const useWordsPerMinute = () => {
  // Use a ref to mutate since we can't afford to wait for asynchronous state updates
  const wordsPerMinute = useRef(0);

  const reset = useCallback(() => {
    wordsPerMinute.current = 0;
    emitCustomEvent("reset");
  }, []);

  const calculateWordsPerMinute = (words: Word[]) => {
    if (!words.length) {
      return;
    }

    const correctWords = words.filter((word) => word.isCorrect);
    const characters = correctWords.reduce(
      (total, word) => total + word.value.length,
      0
    );
    const totalTimeSpent = words.reduce(
      (spent, word) => spent + word.seconds,
      0
    );

    // When calculating typing speed, a "word" is any five characters.
    // For instance, "I love keyboarding, don't you?" would be counted as 6 words (30 characters / 5) and not just 5.
    // This makes sense because typing "deinstitutionalization" obviously should count more than typing "my"
    const wordsTyped = characters / 5;
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
