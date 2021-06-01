import React, { useEffect, useState } from "react";
import styles from "./Page.module.css";
import randomWords from "random-words";
import useKeyPressed from "hooks/useKeyPressed";
import Table from "./Table";
import Input from "./Input";
import Overview from "./Overview";
import { useCalculationContext } from "context/CalculationContext";

// TODO: Make configurable
const WORD_COUNT = 50;

const Page = () => {
  const [words, setWords] = useState(randomWords(WORD_COUNT));

  const {
    resetCalculation,
    currentIndex,
    setCurrentIndex,
    setIsTestDone,
    setIsCookieUpdated,
    status,
    setCurrent,
    timer,
  } = useCalculationContext();

  /**
   * Keep track when user presses ESC so we can reset the typing test
   */
  useKeyPressed(() => {
    // Clear input field and current progress
    setCurrent("");
    setCurrentIndex(0);
    status.clear();
    resetCalculation();
    timer.reset();

    // Regenerate words
    setWords(randomWords(WORD_COUNT));

    // Allow cookie to be set again
    setIsCookieUpdated(false);

    // Finally mark test as not done
    setIsTestDone(false);
  }, 27);

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
      <section className={styles.section}>
        <Overview words={words} />
      </section>

      <section className={styles.section}>
        <Input words={words} />
      </section>

      <section className={styles.section}>
        <Table />
      </section>
    </div>
  );
};

export default Page;
