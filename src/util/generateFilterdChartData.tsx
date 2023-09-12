const generateFilteredChartData = (
  chartData: any,
  ids: string[],
  highlightedId: string | null
) => {
  return {
    ...chartData,
    datasets: chartData.datasets.map((dataset: any) => ({
      ...dataset,
      backgroundColor: (context: any) => {
        const dataIndex = context.dataIndex;
        const id = ids[dataIndex];
        if (id === highlightedId) {
          // 하이라이트된 데이터의 경우 막대 그래프의 라벨 색상 변경
          return "rgba(24, 203, 65, 0.9)";
        } else {
          return dataset.label === "value_area"
            ? "rgba(33, 35, 35, 0.9)" // Area 그래프의 기본 색상
            : "rgba(162, 75, 94, 0.8)"; // Bar 그래프의 기본 색상
        }
      },
    })),
  };
};

export { generateFilteredChartData };
