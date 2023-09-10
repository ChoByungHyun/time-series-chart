import getData from "api/getData";
import DrowChart from "components/DrowChart";
import React, { useEffect, useState } from "react";
interface ChartDataItem {
  id: string;
  value_area: number;
  value_bar: number;
}

interface ChartData {
  [timestamp: string]: ChartDataItem;
}
const MainPage = () => {
  const [chartData, setChartData] = useState<ChartData>({});
  useEffect(() => {
    async function fetchData() {
      const res = await getData();
      setChartData(res);
    }

    fetchData();
  }, []);
  return chartData && <DrowChart data={chartData}></DrowChart>;
};

export default MainPage;
