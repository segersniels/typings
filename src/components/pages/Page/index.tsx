import usePrevious from "@rooks/use-previous";
import Footer from "components/Footer";
import { useCalculationContext } from "context/CalculationContext";
import useKeyPressed from "hooks/useKeyPressed";
import randomWords from "random-words";
import React, { useEffect, useState } from "react";
import { useCallback } from "react";

import Count from "./Count";
import Highscore from "./Highscore";
import Input from "./Input";
import Overview from "./Overview";
import styles from "./Page.module.css";
import Table from "./Table";

const Page = () => {
  const {
    resetCalculation,
    currentIndex,
    setCurrentIndex,
    setIsTestDone,
    setIsCookieUpdated,
    status,
    setCurrent,
    timer,
    count,
  } = useCalculationContext();
  const [words, setWords] = useState(randomWords(count));
  const previousCount = usePrevious(count);

  const reset = useCallback(() => {
    // Clear input field and current progress
    setCurrent("");
    setCurrentIndex(0);
    status.clear();
    resetCalculation();
    timer.reset();

    // Regenerate words
    setWords(randomWords(count));

    // Allow cookie to be set again
    setIsCookieUpdated(false);

    // Finally mark test as not done
    setIsTestDone(false);
  }, [
    count,
    resetCalculation,
    setCurrent,
    setCurrentIndex,
    setIsCookieUpdated,
    setIsTestDone,
    status,
    timer,
  ]);

  /**
   * Keep track when user presses ESC so we can reset the typing test
   */
  useKeyPressed(() => {
    reset();
  }, 27);

  /**
   * Update words when adjusting word count
   */
  useEffect(() => {
    if (count === previousCount) {
      return;
    }

    reset();
  }, [reset, count, previousCount]);

  /**
   * Prevent index from drifting
   */
  useEffect(() => {
    if (currentIndex <= words.length - 1) {
      return;
    }

    setCurrentIndex(words.length - 1);
  }, [setCurrentIndex, words, currentIndex]);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Highscore />
        <Count />
      </div>

      <Overview words={words} />
      <Input words={words} />
      <Table className={styles.table} />

      <Footer />
    </div>
  );
};

export default Page;
