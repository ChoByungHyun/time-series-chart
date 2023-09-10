import React, { useState } from "react";
import { Chart } from "react-chartjs-2";
import "chartjs-adapter-moment";
import styled from "styled-components";
import { generateFilteredChartData } from "util/generateFilterdChartData";
import generateChartData from "./common/generateChartDate";
import generateChartOptions from "./common/generateChartOptions";

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

  const chartData = generateChartData(dates, areaValues, barValues, ids);
  const chartOptions = generateChartOptions(
    ids,
    highlightedId,
    data,
    handleFilter
  );

  const filteredChartData = generateFilteredChartData(
    chartData,
    ids,
    highlightedId
  );

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
