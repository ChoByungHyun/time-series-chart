import React, { useState } from "react";
import { Chart } from "react-chartjs-2";
import "chartjs-adapter-moment";
import moment from "moment";
import styled from "styled-components";
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
  Filler,
  Title,
  CategoryScale as CategoryScaleController,
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
  Filler,
  Title,
  CategoryScaleController
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
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const dates = Object.keys(data);
  const areaValues = dates.map((date) => data[date].value_area);
  const barValues = dates.map((date) => data[date].value_bar);
  const ids = dates.map((date) => data[date].id);

  const handleFilter = (id: string | null) => {
    setHighlightedId(id);
    setActiveFilter(id); // 필터링 버튼을 활성화하기 위해 추가
  };

  const chartData = {
    labels: dates,
    datasets: [
      {
        type: "line",
        label: "value_area",
        fill: {
          target: "origin",
          above: "rgba(61, 50, 50, 0.5)", // 위쪽 영역의 색상 및 투명도 설정
          below: "rgba(55, 55, 66, 0.2)", // 아래쪽 영역의 색상 및 투명도 설정
        },
        borderWidth: 0,
        backgroundColor: "rgba(75, 192, 192, 0.2)", // 그래프의 선 아래 영역의 기본 색상 및 투명도 설정
        data: areaValues,
        yAxisID: "leftYAxis",
      },
      {
        type: "bar",
        label: "value_bar",
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
        data: barValues,
        yAxisID: "rightYAxis",
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
          text: moment(Object.keys(data)[0]).format("YYYY-MM-DD") + "일자",
        },
        ticks: {
          autoSkip: true,
          maxRotation: 0,
          autoSkipPadding: 15,
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const id = ids[context.dataIndex];
            return `ID: ${id} , ${context.dataset.label}: ${context.parsed.y}`;
          },
        },
      },
    },
    onClick: (e, elements) => {
      if (elements.length > 0) {
        const dataIndex = elements[0].index;
        const clickedId = ids[dataIndex];
        handleFilter(clickedId === highlightedId ? null : clickedId);
      }
    },
  };

  const filteredChartData = {
    ...chartData,
    datasets: chartData.datasets.map((dataset) => ({
      ...dataset,
      backgroundColor: (context) => {
        const dataIndex = context.dataIndex;
        const id = ids[dataIndex];
        if (id === highlightedId) {
          return "rgba(0, 255, 60, 0.2)";
        } else {
          return dataset.label === "value_area"
            ? "rgba(66, 72, 72, 0.2)" // Area 그래프의 기본 색상
            : "rgba(255, 0, 55, 0.2)"; // Bar 그래프의 기본 색상
        }
      },
      borderColor: (context) => {
        const dataIndex = context.dataIndex;
        const id = ids[dataIndex];
        if (id === highlightedId) {
          return "rgba(0, 255, 60, 0)"; // 하이라이트된 데이터는 테두리 없음
        } else {
          return dataset.label === "value_area"
            ? "rgba(75,192,192,0)" // Area 그래프의 기본 테두리
            : "rgba(255,99,132,0)"; // Bar 그래프의 기본 테두리
        }
      },
      borderWidth: (context) => {
        const dataIndex = context.dataIndex;
        const id = ids[dataIndex];
        return id === highlightedId ? 0 : 1; // 하이라이트된 데이터의 선 두께를 0으로 설정
      },
      data: dataset.data.map((value, index) =>
        highlightedId === null || ids[index] === highlightedId ? value : value
      ),
    })),
  };

  return (
    <div>
      <SBtnLayout>
        <SFillterBtn
          key="all"
          onClick={() => handleFilter(null)}
          className={activeFilter === null ? "active" : ""}
        >
          전체
        </SFillterBtn>
        {Array.from(new Set(ids)).map((id) => (
          <SFillterBtn
            key={id}
            onClick={() => handleFilter(id)}
            className={activeFilter === id ? "active" : ""}
          >
            {id}
          </SFillterBtn>
        ))}
      </SBtnLayout>
      <Chart type="bar" data={filteredChartData} options={chartOptions} />
    </div>
  );
};

const SBtnLayout = styled.div`
  display: flex;
  gap: 5px;
`;
const SFillterBtn = styled.button`
  border-radius: 10px;
  padding: 5px;
  border: 1px solid var(--gray-400);
  &.active {
    background-color: #6565c1; // 하이라이트된 버튼의 배경색
    color: white; // 하이라이트된 버튼의 텍스트 색상
  }
`;
export default ComplexChart;
