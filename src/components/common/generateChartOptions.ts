import moment from "moment";
import type { ChartOptions } from "chart.js";
const generateChartOptions = (
  ids: string[],
  highlightedId: string | null,
  data: Record<string, any>,
  handleFilter: (id: string | null) => void
): ChartOptions<"line"> => {
  const firstDataKey = Object.keys(data)[0];
  const firstDataTimestamp = moment(firstDataKey, "YYYY-MM-DD HH:mm:ss");
  const formattedDate = firstDataTimestamp.format("YYYY-MM-DD");

  return {
    responsive: true,
    interaction: {
      intersect: false,
      mode: "index",
    },
    scales: {
      leftYAxis: {
        title: {
          display: true,
          text: "Area",
        },
        position: "left",
        min: 0,
        max: 200,
        ticks: {
          stepSize: 50,
        },
      },
      rightYAxis: {
        title: {
          display: true,
          text: "Bar",
        },
        position: "right",
        ticks: {
          stepSize: 5000,
        },
      },
      x: {
        type: "time",
        time: {
          unit: "second",
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
          beforeBody: function (TooltipItems: any) {
            const idx = TooltipItems[0].dataIndex;
            const id = ids[idx];
            return `ID: ${id}`;
          },
        },
      },
      legend: {
        position: "bottom" as const,
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
