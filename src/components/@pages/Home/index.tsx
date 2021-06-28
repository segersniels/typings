import usePrevious from "@rooks/use-previous";
import Footer from "components/Footer";
import { useCalculationContext } from "context/CalculationContext";
import { useMigrationContext } from "context/MigrationContext";
import useKeyPressed from "hooks/useKeyPressed";
import React, { useEffect } from "react";
import { useCallback } from "react";

import Chart from "./Chart";
import Count from "./Count";
import Highscore from "./Highscore";
import styles from "./Home.module.css";
import Input from "./Input";
import Overview from "./Overview";

const Page = () => {
  const { isMigrated } = useMigrationContext();
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
    words,
    generateWords,
  } = useCalculationContext();
  const previousCount = usePrevious(count);

  const reset = useCallback(() => {
    // Clear input field and current progress
    setCurrent("");
    setCurrentIndex(0);
    status.clear();
    resetCalculation();
    timer.reset();

    // Regenerate words
    generateWords(count);

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
    generateWords,
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

  if (!isMigrated) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Highscore />
        <Count />
      </div>

      <Overview />
      <Input />

      <Chart className={styles.chart} />

      <Footer />
    </div>
  );
};

export default Page;
