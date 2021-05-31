import React from "react";
import Score from "types/Score";
import styles from "./Table.module.css";

interface Props {
  scores?: Score[];
}

const Table = ({ scores }: Props) => {
  if (!scores?.length) {
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
        {scores.map(({ score, timestamp }: Score) => (
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
