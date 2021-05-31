import React, { useCallback, useEffect, useMemo, useState } from "react";
import styles from "./Page.module.css";
import randomWords from "random-words";
import useTimer from "hooks/useTimer";
import useWordsPerMinute from "hooks/useWordsPerMinute";
import { Word } from "types/Word";
import useKeyPressed from "hooks/useKeyPressed";
import { useCookies } from "react-cookie";
import Table from "./Table";
import Input from "./Input";
import Overview from "./Overview";
import Score from "types/Score";

// TODO: Make configurable
const WORD_COUNT = 50;

const Page = () => {
  const [current, setCurrent] = useState("");
  const [index, setIndex] = useState(0);
  const [words, setWords] = useState(randomWords(WORD_COUNT));
  const wordsMap = useMemo(() => new Map<number, Word>(), []);
  const [isCookieUpdated, setIsCookieUpdated] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const {
    wordsPerMinute,
    reset: resetWordsPerMinute,
    calculateWordsPerMinute: calculate,
  } = useWordsPerMinute();
  const { seconds, isRunning, start, reset: resetTimer } = useTimer();
  const [cookies, setCookie] = useCookies(["scores"]);

  /**
   * Keep track when user presses ESC so we can reset the typing test
   */
  useKeyPressed(() => {
    // Clear input field and current progress
    setCurrent("");
    setIndex(0);
    wordsMap.clear();
    resetWordsPerMinute();
    resetTimer();

    // Regenerate words
    setWords(randomWords(WORD_COUNT));

    // Allow cookie to be set again
    setIsCookieUpdated(false);

    // Finally mark test as not done
    setIsDone(false);
  }, 27);

  const calculateWordsPerMinute = useCallback(
    (value: string) => {
      // Keep track of how many seconds it took for the word to be typed
      wordsMap.set(index, {
        value,
        seconds,
        isCorrect: value === words[index],
      });

      // Force recalculation
      return calculate(Array.from(wordsMap.values()));
    },
    [calculate, index, wordsMap, seconds, words]
  );

  /**
   * Prevent index from drifting
   */
  useEffect(() => {
    if (index <= words.length - 1) {
      return;
    }

    setIndex(words.length - 1);
  }, [index, words]);

  const markTestAsDone = useCallback(
    (value: string) => {
      // Mark test as done
      setIsDone(true);

      // Force update and use most recent available value to set the cookie
      const score = calculateWordsPerMinute(value);

      // Stop the timer and update the cookie with the final score
      resetTimer();

      if (isCookieUpdated) {
        return;
      }

      const scores: Score[] = cookies.scores ?? [];

      // Only keep the last 10 items in storage
      if (scores.length >= 10) {
        scores.pop();
      }

      scores.unshift({
        score,
        timestamp: new Date().toLocaleString(),
      });

      setCookie(
        "scores",
        JSON.stringify(scores),
        { path: "/" }
      );

      setIsCookieUpdated(true);
    },
    [cookies, isCookieUpdated, resetTimer, setCookie, calculateWordsPerMinute]
  );

  const handleKeyPress = useCallback(
    (event) => {
      if (isDone) {
        return;
      }

      switch (event.key) {
        // Next word
        case " ": {
          if (!current) {
            return;
          }

          // Last word has been processed but was faulty
          // We automatically capture correct last words during onChange
          if (index === words.length - 1) {
            return markTestAsDone(current);
          }

          calculateWordsPerMinute(current);

          // Move to next word
          setIndex(index + 1);

          // Reset the necessary fields
          setCurrent("");

          // Reset the timer
          resetTimer();
        }
      }

      return;
    },
    [
      calculateWordsPerMinute,
      current,
      isDone,
      index,
      resetTimer,
      markTestAsDone,
      words,
    ]
  );

  const handleOnChange = useCallback(
    (event) => {
      // We handle space using onKeyPress
      if (event.target.value === " ") {
        return;
      }

      // Start the timer when not running yet
      if (!isRunning) {
        start();
      }

      setCurrent(event.target.value);

      if (event.target.value === words[index] && index === words.length - 1) {
        markTestAsDone(event.target.value);
      }
    },
    [index, isRunning, setCurrent, markTestAsDone, words, start]
  );

  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <Overview words={words} wordsMap={wordsMap} currentIndex={index} />
      </section>

      <section className={styles.section}>
        <Input
          wordsPerMinute={wordsPerMinute}
          value={current}
          disabled={isDone}
          handleKeyPress={handleKeyPress}
          handleOnChange={handleOnChange}
        />
      </section>

      <section className={styles.section}>
        <Table scores={cookies?.scores} />
      </section>
    </div>
  );
};

export default Page;
