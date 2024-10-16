import { useEffect, useState } from "react";
import { YieldOnCostMensalChart } from "../../interfaces/Graficos/YieldOnCostMonthly";
import { GraficosService } from "../../services/GraficosService";
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  Brush,
} from "recharts";

const YieldOnCostLineChart = () => {
  const [yieldOnCostMensal, setYieldOnCostMensal] = useState<
    YieldOnCostMensalChart[]
  >([]);
  const [brushIndex, setBrushIndex] = useState<{
    start?: number;
    end?: number;
  }>({ start: 0, end: 10 });

  useEffect(() => {
    const fetchData = async () => {
      const response = await GraficosService.getYieldOnCostMensal();
      setYieldOnCostMensal(response);
      setBrushIndex({ start: response.length - 13, end: response.length - 1 });
    };

    fetchData();
  }, []);

  return (
    <LineChart width={1300} height={600} data={yieldOnCostMensal}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="data" type="category" allowDuplicatedCategory={false} />
      <YAxis />
      <Tooltip />
      <Legend />
      {yieldOnCostMensal.length &&
        Object.keys(yieldOnCostMensal[0])
          .filter((k) => k !== "data")
          .map((yoc) => (
            <Line type="monotone" dataKey={yoc} name={yoc} key={yoc} />
          ))}
      <Brush
        dataKey="data"
        height={30}
        stroke="#5dade2"
        startIndex={brushIndex.start}
        endIndex={brushIndex.end}
        onDragEnd={(p) => {
          if ("startIndex" in p) {
            setBrushIndex({ start: p.startIndex, end: p.endIndex });
          }
        }}
      />
    </LineChart>
  );
};

export default YieldOnCostLineChart;
