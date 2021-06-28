import { useCalculationContext } from "context/CalculationContext";
import React from "react";
import { useCookies } from "react-cookie";

import styles from "./Highscore.module.css";

const Table = () => {
  const [cookies] = useCookies(["highscores"]);
  const { count } = useCalculationContext();

  return (
    <div className={styles.container}>
      <p className={styles.text}>Highest Score:</p>
      <p className={styles.score}>{cookies.highscores?.[count] ?? 0}</p>
    </div>
  );
};

export default Table;
