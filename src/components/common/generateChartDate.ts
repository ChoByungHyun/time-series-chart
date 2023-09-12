const generateChartData = (
  dates: string[],
  areaValues: number[],
  barValues: number[]
) => {
  return {
    labels: dates,
    datasets: [
      {
        type: "line",
        label: "value_area",
        fill: {
          target: "origin",
          above: "rgba(61, 50, 50, 0.7)",
          below: "rgba(55, 55, 66, 0.5)",
        },
        borderWidth: 0,

        data: areaValues,
        yAxisID: "leftYAxis",
      },
      {
        type: "bar",
        label: "value_bar",
        data: barValues,
        yAxisID: "rightYAxis",
      },
    ],
  };
};

export default generateChartData;
