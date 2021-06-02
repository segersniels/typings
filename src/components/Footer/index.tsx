import React from "react";

import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <a
        href="https://github.com/segersniels/typings"
        target="_no_blank"
        className={styles.item}
      >
        source
      </a>
    </div>
  );
};

export default Footer;
