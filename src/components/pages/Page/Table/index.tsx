import React from "react";
import { useCookies } from "react-cookie";
import Score from "types/Score";
import styles from "./Table.module.css";

const Table = () => {
  const [cookies] = useCookies(["scores"]);

  if (!cookies?.scores?.length) {
    return null;
  }

  return (
    <table className={styles.table}>
      <thead>
        <tr className={styles.row}>
          <th>Score</th>
          <th>Date</th>
        </tr>
      </thead>

      <tbody>
        {cookies.scores.map(({ score, timestamp }: Score) => (
          <tr className={styles.row} key={timestamp}>
            <td>{score}</td>
            <td>{timestamp}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
