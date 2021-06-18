import useTimer from "hooks/useTimer";
import useWordsPerMinute from "hooks/useWordsPerMinute";
import randomWords from "random-words";
import React, { useContext, useMemo, useState } from "react";
import { useCallback } from "react";
import { useCookies } from "react-cookie";
import Highscore from "types/Highscore";
import Score from "types/Score";
import { Word } from "types/Word";

interface ContextType {
  wordsPerMinute: number;
  calculateWordsPerMinute: (words: Word[]) => number;
  resetCalculation: () => void;
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  updateScores: (score: number, count: number) => void;
  setIsCookieUpdated: React.Dispatch<React.SetStateAction<boolean>>;
  isTestDone: boolean;
  setIsTestDone: React.Dispatch<React.SetStateAction<boolean>>;
  status: Map<number, Word>;
  current: string;
  setCurrent: React.Dispatch<React.SetStateAction<string>>;
  timer: {
    seconds: number;
    isRunning: boolean;
    start: () => void;
    reset: () => void;
  };
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  words: string[];
  generateWords: (count: number) => void;
}

const CalculationContext = React.createContext<ContextType | null>(null);

interface Props {
  children: React.ReactNode;
}

export const CalculationContextProvider = (props: Props) => {
  const { children } = props;
  const status = useMemo(() => new Map<number, Word>(), []);

  const {
    wordsPerMinute,
    calculateWordsPerMinute,
    reset: resetCalculation,
  } = useWordsPerMinute();
  const [cookies, setCookie] = useCookies(["scores"]);
  const timer = useTimer();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCookieUpdated, setIsCookieUpdated] = useState(false);
  const [isTestDone, setIsTestDone] = useState(false);
  const [current, setCurrent] = useState("");
  const [count, setCount] = useState(50);
  const [words, setWords] = useState(randomWords(count));

  const generateWords = useCallback((count: number) => {
    setWords(randomWords(count));
  }, []);

  const updateScores = (score: number, count: number) => {
    if (isCookieUpdated) {
      return;
    }

    const scores: Score[] = cookies.scores ?? [];

    // Only keep the last 10 items in storage
    if (scores.length >= 10) {
      scores.pop();
    }

    scores.unshift({
      score,
      count,
      timestamp: new Date().valueOf(),
    });

    // Set the cookie expiration date to a year from now
    const expirationDate = new Date();
    expirationDate.setFullYear(expirationDate.getFullYear() + 1);

    setCookie("scores", JSON.stringify(scores), {
      path: "/",
      expires: expirationDate,
    });

    const highscores: Highscore = cookies.highscores ?? {};

    // Update highscore if higher
    if (score > (highscores[count] ?? 0)) {
      highscores[count] = score;
      setCookie("highscores", JSON.stringify(highscores), {
        path: "/",
        expires: expirationDate,
      });
    }

    setIsCookieUpdated(true);
  };

  return (
    <CalculationContext.Provider
      value={{
        wordsPerMinute,
        calculateWordsPerMinute,
        resetCalculation,
        currentIndex,
        setCurrentIndex,
        updateScores,
        setIsCookieUpdated,
        isTestDone,
        setIsTestDone,
        status,
        current,
        setCurrent,
        timer,
        count,
        setCount,
        words,
        generateWords,
      }}
    >
      {children}
    </CalculationContext.Provider>
  );
};

export const useCalculationContext = () => {
  const context = useContext(CalculationContext);

  if (context === null) {
    throw new Error(
      "Please use useCalculationContext within an CalculationContextProvider"
    );
  }

  return context;
};
