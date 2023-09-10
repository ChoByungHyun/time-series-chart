import React from "react";
import { Chart } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
  TimeScale,
  Ticks,
  Filler,
  DatasetController,
} from "chart.js";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
  TimeScale,
  Filler
);

interface DataPoint {
  id: string;
  value_area: number;
  value_bar: number;
}

interface Props {
  data: { [key: string]: DataPoint };
}

const ComplexChart: React.FC<Props> = ({ data }) => {
  // 데이터에서 날짜와 해당 값들을 추출
  const dates = Object.keys(data);
  const areaValues = dates.map((date) => data[date].value_area);
  const barValues = dates.map((date) => data[date].value_bar);
  const ids = dates.map((date) => data[date].id); // id 값을 추출

  // Area 그래프와 Bar 그래프를 위한 데이터 설정
  const chartData = {
    labels: dates,
    datasets: [
      {
        type: "line",
        label: "value_area",

        fill: {
          target: "origin",
          above: "rgb(255, 0, 0)", // Area will be red above the origin
          below: "rgb(0, 0, 255)", // And blue below the origin
        },
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 2,
        data: areaValues,
        yAxisID: "leftYAxis", // 좌측 Y축에 할당
      },
      {
        type: "bar",
        label: "value_bar",
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
        data: barValues,
        yAxisID: "rightYAxis", // 우측 Y축에 할당
      },
    ],
  };
  const chartOptions = {
    scales: {
      leftYAxis: {
        id: "left-y-axis",
        position: "left",
        min: 0,
        max: 200,
      },
      rightYAxis: {
        id: "right-y-axis",
        position: "right",
      },
      x: {},
    },

    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const id = ids[context.dataIndex]; // 데이터 포인트의 id 가져오기
            return `ID: ${id} , ${context.dataset.label}: ${context.parsed.y}`;
          },
        },
      },
    },
  };

  return (
    <div>
      <Chart type="bar" data={chartData} options={chartOptions} />
    </div>
  );
};

export default ComplexChart;
