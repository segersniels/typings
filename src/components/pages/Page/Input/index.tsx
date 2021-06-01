import React from "react";
import styles from "./Input.module.css";

interface Props {
  wordsPerMinute: number;
  handleKeyPress: React.KeyboardEventHandler<HTMLInputElement>;
  handleOnChange: React.ChangeEventHandler<HTMLInputElement>;
  value: string;
  disabled: boolean;
}

const Input = (props: Props) => {
  const { wordsPerMinute, handleKeyPress, handleOnChange, value, disabled } =
    props;

  return (
    <div className={styles.form}>
      <form className="flex" onSubmit={(e) => e.preventDefault()}>
        <div className={styles.inputWrapper}>
          <span className={styles.span}>{wordsPerMinute}</span>

          <input
            className={styles.input}
            id="text"
            type="text"
            placeholder="Type here to start the test"
            onKeyPress={handleKeyPress}
            onChange={handleOnChange}
            value={value}
            disabled={disabled}
          />
        </div>
      </form>
    </div>
  );
};

export default Input;
