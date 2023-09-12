import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-moment";
import styled from "styled-components";
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
  Colors,
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
  CategoryScaleController,
  Colors
);

interface DataPoint {
  id: string;
  value_area: number;
  value_bar: number;
}

interface Props {
  data: { [key: string]: DataPoint };
}

const DrowChart: React.FC<Props> = ({ data }) => {
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const dates = Object.keys(data);
  const areaValues = dates.map((date) => data[date].value_area);
  const barValues = dates.map((date) => data[date].value_bar);
  const ids = dates.map((date) => data[date].id);

  const handleFilter = (id: string | null) => {
    if (highlightedId === id) {
      setHighlightedId(null);
      setActiveFilter(null);
    } else {
      setHighlightedId(id);
      setActiveFilter(id);
    }
  };

  const chartData = generateChartData(
    dates,
    areaValues,
    barValues,
    ids,
    highlightedId
  );

  const chartOptions = generateChartOptions(
    ids,
    highlightedId,
    data,
    handleFilter
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
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

const SBtnLayout = styled.div`
  display: flex;
  gap: 5px;
`;
const SFillterBtn = styled.button`
  font-size: 16px;

  border-radius: 10px;
  padding: 5px 15px;
  border: 2px solid var(--gray-400);
  &.active {
    background-color: #6565c1;
    color: white;
    border: 2px solid #6565c1;
  }
`;
export default DrowChart;
