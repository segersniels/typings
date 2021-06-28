import { useCalculationContext } from "context/CalculationContext";
import React, { useCallback, useMemo } from "react";
import { Chart } from "react-charts";
import { useCookies } from "react-cookie";

type Props = Partial<HTMLDivElement>;

const MyChart = (props: Props) => {
  const { count } = useCalculationContext();
  const [cookies] = useCookies(["scores"]);
  const axes = useMemo(
    () => [
      {
        primary: true,
        type: "linear",
        position: "bottom",
        id: "Index",
        stacked: false,
      },
      { type: "linear", position: "left", id: "Score", stacked: false },
    ],
    []
  );

  const graphData = useMemo(
    () => [
      {
        label: "Score",
        data: (cookies.scores[count] ?? [])
          .reverse()
          .map((score, index) => [index + 1, score.score]),
      },
    ],
    [cookies.scores, count]
  );

  const getSeriesStyle = useCallback(
    () => ({
      color: `url(#${0})`,
      opacity: 0.6,
    }),
    []
  );

  if (!graphData[0].data.length) {
    return null;
  }

  return (
    <div className={props.className}>
      <Chart
        data={graphData}
        axes={axes}
        getSeriesStyle={getSeriesStyle}
        tooltip
        renderSVG={() => (
          <defs>
            <linearGradient id="0" x1="0" x2="0" y1="1" y2="0">
              <stop offset="0%" stopColor="rgb(236, 63, 251)" />
              <stop offset="100%" stopColor="rgba(252, 229, 70, 1)" />
            </linearGradient>
          </defs>
        )}
      />
    </div>
  );
};

export default MyChart;
