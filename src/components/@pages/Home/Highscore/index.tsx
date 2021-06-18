import { useCalculationContext } from "context/CalculationContext";
import React from "react";
import { useCookies } from "react-cookie";

import styles from "./Highscore.module.css";

const Table = () => {
  const [cookies] = useCookies(["highscores"]);
  const { count } = useCalculationContext();

  return (
    <div>
      <p className={styles.text}>
        Highest Score:{" "}
        <p className={styles.score}>{cookies.highscores?.[count] ?? 0}</p>
      </p>
    </div>
  );
};

export default Table;
