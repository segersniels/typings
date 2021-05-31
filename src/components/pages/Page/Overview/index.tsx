import React, { useCallback } from "react";
import { Word } from "types/Word";
import styles from "./Overview.module.css";
import cx from "classnames";

interface Props {
  words: string[];
  wordsMap: Map<number, Word>;
  currentIndex: number;
}

const Overview = (props: Props) => {
  const { words, wordsMap, currentIndex } = props;

  /**
   * Check whether to mark the word as correct
   */
  const isCorrect = useCallback(
    (word: string, index: number) => {
      if (!wordsMap.has(index)) {
        return false;
      }

      return wordsMap.get(index).value === word;
    },
    [wordsMap]
  );

  return (
    <div className={styles.wrapper}>
      {words.map((word, idx) => (
        <p
          key={idx}
          className={cx(styles.text, {
            [styles.active]: currentIndex === idx,
            [styles.wrong]: wordsMap.has(idx) && !isCorrect(word, idx),
            [styles.correct]: wordsMap.has(idx) && isCorrect(word, idx),
          })}
        >
          {word}
        </p>
      ))}
    </div>
  );
};

export default Overview;
