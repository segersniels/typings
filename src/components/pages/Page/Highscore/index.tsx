import React from "react";
import { useCookies } from "react-cookie";

import styles from "./Highscore.module.css";

const Table = () => {
  const [cookies] = useCookies(["highscore"]);

  return (
    <div>
      <p className={styles.text}>
        Highest Score: <p className={styles.score}>{cookies.highscore ?? 0}</p>
      </p>
    </div>
  );
};

export default Table;
