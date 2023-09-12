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
        fill: true,
        borderWidth: 0,
        data: areaValues,
        yAxisID: "leftYAxis",
        backgroundColor: "rgba(222, 135, 53, 0.6)",
      },
      {
        type: "bar" as const,
        label: "value_bar",
        data: barValues,
        yAxisID: "rightYAxis",
        hoverBackgroundColor: "rgba(10, 69, 24,0.8)",

        backgroundColor: barValues.map((value, index) => {
          if (highlightedId && ids[index] === highlightedId) {
            return "rgb(10, 69, 24)";
          } else {
            return "rgba(76, 183, 101, 0.6)";
          }
        }),
      },
    ],
  };
};

export default generateChartData;
