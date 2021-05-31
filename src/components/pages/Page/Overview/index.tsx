import React, { Fragment, useCallback } from "react";
import { Word } from "types/Word";
import styles from "./Overview.module.css";
import cx from "classnames";
import ReactTooltip from "react-tooltip";

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
        <Fragment key={idx}>
          {wordsMap.has(idx) && !isCorrect(word, idx) && (
            <ReactTooltip id={`${idx}`} place="top" type="dark" effect="float">
              {wordsMap.get(idx).value}
            </ReactTooltip>
          )}

          <p
            className={cx(styles.text, {
              [styles.active]: currentIndex === idx,
              [styles.wrong]: wordsMap.has(idx) && !isCorrect(word, idx),
              [styles.correct]: wordsMap.has(idx) && isCorrect(word, idx),
            })}
            data-tip
            data-for={`${idx}`}
          >
            {word}
          </p>
        </Fragment>
      ))}
    </div>
  );
};

export default Overview;
