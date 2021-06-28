import useDidMount from "@rooks/use-did-mount";
import migrations from "helpers/migration";
import React, { useContext, useState } from "react";
import { useCookies } from "react-cookie";
import MigrationType from "types/MigrationType";
import Score from "types/Score";

interface Props {
  children: React.ReactNode;
}

interface ContextType {
  isMigrated: boolean;
}

const MigrationContext = React.createContext<ContextType | null>(null);

export const MigrationContextProvider = (props: Props) => {
  const { children } = props;
  const [areScoresMigrated, setAreScoresMigrated] = useState(false);
  const [cookies, setCookie] = useCookies(["scores"]);
  const scores: Record<number, Score[]> = cookies.scores ?? {};

  // Set the cookie expiration date to a year from now
  const expirationDate = new Date();
  expirationDate.setFullYear(expirationDate.getFullYear() + 1);

  useDidMount(() => {
    if (!migrations[MigrationType.Score].length) {
      return setAreScoresMigrated(true);
    }

    migrations[MigrationType.Score].forEach((migration, index) => {
      if (!migration.shouldRun(scores)) {
        // Check if last migration
        if (index === migrations[MigrationType.Score].length - 1) {
          setAreScoresMigrated(true);
        }

        return;
      }

      migration.run(scores, (migratedScores: any) => {
        setCookie("scores", JSON.stringify(migratedScores), {
          path: "/",
          expires: expirationDate,
        });
      });

      // Check if last migration
      if (index === migrations[MigrationType.Score].length - 1) {
        setAreScoresMigrated(true);
      }
    });
  });

  return (
    <MigrationContext.Provider
      value={{
        isMigrated: areScoresMigrated,
      }}
    >
      {children}
    </MigrationContext.Provider>
  );
};

export const useMigrationContext = () => {
  const context = useContext(MigrationContext);

  if (context === null) {
    throw new Error(
      "Please use useMigrationContext within an MigrationContextProvider"
    );
  }

  return context;
};
