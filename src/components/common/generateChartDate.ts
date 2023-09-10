// chartData.js
const generateChartData = (
  dates: string[],
  areaValues: number[],
  barValues: number[],
  ids: string[]
) => {
  return {
    labels: dates,
    datasets: [
      {
        type: "line",
        label: "value_area",
        fill: {
          target: "origin",
          above: "rgba(61, 50, 50, 0.5)",
          below: "rgba(55, 55, 66, 0.2)",
        },
        borderWidth: 0,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(255,99,132,1)",

        data: areaValues,
        yAxisID: "leftYAxis",
      },
      {
        type: "bar",
        label: "value_bar",
        fill: false,
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
        data: barValues,
        yAxisID: "rightYAxis",
      },
    ],
  };
};

export default generateChartData;
