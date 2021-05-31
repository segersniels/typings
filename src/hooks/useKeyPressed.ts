import { useCallback, useEffect } from "react";

const useKeyPressed = (fn: () => void, keyCode: number) => {
  const handleKeyPress = useCallback(
    (event) => {
      if (event.keyCode !== keyCode) {
        return;
      }

      fn();
    },
    [fn, keyCode]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress, false);

    return () => {
      document.removeEventListener("keydown", handleKeyPress, false);
    };
  }, [handleKeyPress]);
};

export default useKeyPressed;
