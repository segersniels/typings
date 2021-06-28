import MigrationType from "types/MigrationType";

export default {
  [MigrationType.Score]: [
    {
      type: MigrationType.Score,
      shouldRun: (data: any) => Array.isArray(data),
      run: (data: any, update: (data: any) => void) => {
        const updatedData = data.reduce((updated, current) => {
          return {
            ...updated,
            [current.count]: [
              ...(updated[current.count] ?? []),
              {
                score: current.score,
                timestamp: current.timestamp,
              },
            ],
          };
        }, {});

        update(updatedData);
      },
    },
  ],
};
