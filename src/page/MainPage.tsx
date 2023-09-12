import getData from "api/getData";
import DrowChart from "components/DrowChart";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import spinner from "asset/spinner.svg";
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
      {chartData ? (
        <DrowChart data={chartData}></DrowChart>
      ) : (
        <StyledImage src={spinner}></StyledImage>
      )}
    </div>
  );
};
const STitle = styled.header`
  font-size: 30px;
  font-weight: 600;
  text-align: center;
`;
const StyledImage = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
`;

export default MainPage;
