import cx from "classnames";
import { useCalculationContext } from "context/CalculationContext";
import React from "react";

import styles from "./Count.module.css";

const Count = () => {
  const { count, setCount } = useCalculationContext();

  return (
    <div className={styles.container}>
      {[10, 25, 50, 100, 250].map((value, index) => (
        <label
          key={`${index}_${value}`}
          className={cx(styles.label, {
            [styles.active]: value === count,
          })}
          onClick={() => setCount(value)}
        >
          {value}
        </label>
      ))}
    </div>
  );
};

export default Count;
