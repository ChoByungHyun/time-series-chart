import getData from "api/getData";
import DrowChart from "components/DrowChart";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
interface ChartDataItem {
  id: string;
  value_area: number;
  value_bar: number;
}

interface ChartData {
  [timestamp: string]: ChartDataItem;
}
const MainPage = () => {
  const [chartData, setChartData] = useState<ChartData>();
  useEffect(() => {
    async function fetchData() {
      const res = await getData();
      setChartData(res);
    }

    fetchData();
  }, []);
  return (
    <div>
      <STitle>Time Series Chart</STitle>
      {chartData ? <DrowChart data={chartData}></DrowChart> : <div>로딩중</div>}
    </div>
  );
};
const STitle = styled.header`
  font-size: 30px;
  font-weight: 600;
  text-align: center;
`;

export default MainPage;
