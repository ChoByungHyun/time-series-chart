import type { ChartData } from "chart.js";
const generateChartData = (
  dates: string[],
  areaValues: number[],
  barValues: number[],
  ids: string[],
  highlightedId: string | null
): any => {
  return {
    labels: dates,
    datasets: [
      {
        type: "line" as const,
        label: "value_area",
        fill: {
          target: "origin",
          above: "rgba(61, 50, 50, 0.7)",
          below: "rgba(55, 55, 66, 0.5)",
        },
        borderWidth: 0,
        data: areaValues,
        yAxisID: "leftYAxis",
        backgroundColor: "rgba(33, 35, 35, 0.9)",
      },
      {
        type: "bar" as const,
        label: "value_bar",
        data: barValues,
        yAxisID: "rightYAxis",
        backgroundColor: barValues.map((value, index) => {
          if (highlightedId && ids[index] === highlightedId) {
            return "rgba(10, 69, 24, 0.9)";
          } else {
            return "rgba(76, 183, 101, 0.6)";
          }
        }),
      },
    ],
  };
};

export default generateChartData;
