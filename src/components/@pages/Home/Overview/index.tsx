import cx from "classnames";
import { useCalculationContext } from "context/CalculationContext";
import React, { Fragment, useCallback } from "react";
import ReactTooltip from "react-tooltip";

import styles from "./Overview.module.css";

const Overview = () => {
  const { currentIndex, status, words } = useCalculationContext();

  /**
   * Check whether to mark the word as correct
   */
  const isCorrect = useCallback(
    (word: string, index: number) => {
      if (!status.has(index)) {
        return false;
      }

      return status.get(index).value === word;
    },
    [status]
  );

  return (
    <div className={styles.container}>
      {words.map((word, idx) => (
        <Fragment key={idx}>
          {status.has(idx) && !isCorrect(word, idx) && (
            <ReactTooltip id={`${idx}`} place="top" type="dark" effect="float">
              {status.get(idx).value}
            </ReactTooltip>
          )}

          <p
            className={cx(styles.text, {
              [styles.active]: currentIndex === idx,
              [styles.wrong]: status.has(idx) && !isCorrect(word, idx),
              [styles.correct]: status.has(idx) && isCorrect(word, idx),
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
