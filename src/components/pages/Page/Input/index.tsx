import React, { useCallback, useState } from "react";
import { useCookies } from "react-cookie";
import styles from "./Input.module.css";
import Score from "types/Score";
import { useCalculationContext } from "context/CalculationContext";

interface Props {
  words: string[];
}

const Input = (props: Props) => {
  const { words } = props;

  const {
    wordsPerMinute,
    calculateWordsPerMinute: calculate,
    currentIndex,
    setCurrentIndex,
    isTestDone,
    setIsTestDone,
    status,
    current: value,
    setCurrent: setValue,
    timer,
    updateScores,
  } = useCalculationContext();

  const calculateWordsPerMinute = useCallback(
    (value: string) => {
      // Keep track of how many seconds it took for the word to be typed
      status.set(currentIndex, {
        value,
        seconds: timer.seconds,
        isCorrect: value === words[currentIndex],
      });

      // Force recalculation
      return calculate(Array.from(status.values()));
    },
    [calculate, currentIndex, status, timer.seconds, words]
  );

  const markTestAsDone = useCallback(
    (value: string) => {
      setIsTestDone(true);

      // Force update and use most recent available value to set the cookie
      const score = calculateWordsPerMinute(value);

      // Stop the timer and update the cookie with the final score
      timer.reset();

      // Update cookie with updated score
      updateScores(score);
    },
    [timer, calculateWordsPerMinute, setIsTestDone, updateScores]
  );

  const handleKeyPress = useCallback(
    (event) => {
      if (isTestDone) {
        return;
      }

      switch (event.key) {
        // Next word
        case " ": {
          if (!value) {
            return;
          }

          // Last word has been processed but was faulty
          // We automatically capture correct last words during onChange
          if (currentIndex === words.length - 1) {
            return markTestAsDone(value);
          }

          calculateWordsPerMinute(value);

          // Move to next word
          setCurrentIndex(currentIndex + 1);

          // Reset the necessary fields
          setValue("");

          // Reset the timer
          timer.reset();
        }
      }

      return;
    },
    [
      calculateWordsPerMinute,
      value,
      isTestDone,
      currentIndex,
      timer,
      markTestAsDone,
      words,
      setCurrentIndex,
      setValue,
    ]
  );

  const handleOnChange = useCallback(
    (event) => {
      // We handle space using onKeyPress
      if (event.target.value === " ") {
        return;
      }

      // Start the timer when not running yet
      if (!timer.isRunning) {
        timer.start();
      }

      setValue(event.target.value);

      if (
        event.target.value === words[currentIndex] &&
        currentIndex === words.length - 1
      ) {
        markTestAsDone(event.target.value);
      }
    },
    [currentIndex, setValue, markTestAsDone, words, timer]
  );

  return (
    <div className={styles.form}>
      <form className="flex" onSubmit={(e) => e.preventDefault()}>
        <div className={styles.inputWrapper}>
          <span className={styles.span}>{wordsPerMinute}</span>

          <input
            className={styles.input}
            id="text"
            type="text"
            placeholder="Type here to start the test"
            onKeyPress={handleKeyPress}
            onChange={handleOnChange}
            value={value}
            disabled={isTestDone}
          />
        </div>
      </form>
    </div>
  );
};

export default Input;
