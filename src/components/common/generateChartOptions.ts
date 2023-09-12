import moment from "moment";

const generateChartOptions = (
  ids: string[],
  highlightedId: string | null,
  data: Record<string, any>,
  handleFilter: (id: string | null) => void
) => {
  const firstDataKey = Object.keys(data)[0];
  const firstDataTimestamp = moment(firstDataKey, "YYYY-MM-DD HH:mm:ss");
  const formattedDate = firstDataTimestamp.format("YYYY-MM-DD");

  return {
    scales: {
      leftYAxis: {
        id: "left-y-axis",
        position: "left",
        min: 0,
        max: 200,
        ticks: {
          stepSize: 50,
        },
      },
      rightYAxis: {
        id: "right-y-axis",
        position: "right",
        ticks: {
          stepSize: 5000,
        },
      },
      x: {
        type: "time",
        time: {
          unit: "second",
          stepSize: 35,
          displayFormats: {
            second: "HH:mm:ss",
            minute: "HH:mm:ss",
            hour: "HH:mm:ss",
            day: "YYYY-MM-DD",
          },
          tooltipFormat: "YYYY-MM-DD HH:mm:ss",
        },
        title: {
          display: true,
          align: "start",
          text: formattedDate ? formattedDate : "",
        },
        ticks: {
          autoSkip: true,
          maxRotation: 0,
          autoSkipPadding: 60,
          source: "data",
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const dataIndex = context.dataIndex;
            const id = ids[dataIndex];
            const label = `ID: ${id}`;
            const datasetLabels = [];

            for (const dataset of context.chart.data.datasets) {
              const valueKey = dataset.label;
              const value = dataset.data[dataIndex];
              if (valueKey !== id) {
                datasetLabels.push(`${valueKey}: ${value}`);
              }
            }

            return `${label}\n${datasetLabels.join("\n")}`;
          },
        },
      },
    },
    onClick: (e: any, elements: any) => {
      if (elements.length > 0) {
        const dataIndex = elements[0].index;
        const clickedId = ids[dataIndex];
        handleFilter(clickedId === highlightedId ? null : clickedId);
      }
    },
  };
};

export default generateChartOptions;
