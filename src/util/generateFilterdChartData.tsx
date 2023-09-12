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
          return "rgba(0, 255, 60, 0.2)";
        } else {
          return dataset.label === "value_area"
            ? "rgba(66, 72, 72, 0.2)" // Area 그래프의 기본 색상
            : "rgba(255, 0, 55, 0.2)"; // Bar 그래프의 기본 색상
        }
      },
      borderColor: (context: any) => {
        const dataIndex = context.dataIndex;
        const id = ids[dataIndex];
        if (id === highlightedId) {
          return "rgba(0, 255, 60, 0)"; // 하이라이트된 데이터는 테두리 없음
        } else {
          return dataset.label === "value_area"
            ? "rgba(75,192,192,0.1)" // Area 그래프의 기본 테두리
            : "rgba(255,99,132,0.1)"; // Bar 그래프의 기본 테두리
        }
      },
      borderWidth: (context: any) => {
        const dataIndex = context.dataIndex;
        const id = ids[dataIndex];
        return id === highlightedId ? 0 : 1; // 하이라이트된 데이터의 선 두께를 0으로 설정
      },
      data: dataset.data.map((value: any, index: any) =>
        highlightedId === null || ids[index] === highlightedId ? value : value
      ),
    })),
  };
};

export { generateFilteredChartData };
