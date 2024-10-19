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
  ResponsiveContainer,
} from "recharts";
import { MultiSelect } from "primereact/multiselect";

const YieldOnCostLineChart = () => {
  const [yieldOnCostMensal, setYieldOnCostMensal] = useState<
    YieldOnCostMensalChart[]
  >([]);
  const [brushIndex, setBrushIndex] = useState<{
    start?: number;
    end?: number;
  }>({ start: 0, end: 10 });

  const [selectedTickers, setSelectedTickers] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await GraficosService.getYieldOnCostMensal();
      setYieldOnCostMensal(response);
      setBrushIndex({ start: response.length - 13, end: response.length - 1 });
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="flex space-x-2">
        <div className="border border-gray-200 bg-white w-1/6 h-[34rem] p-4 overflow-y-auto">
          <MultiSelect
            value={selectedTickers}
            onChange={(e) => setSelectedTickers(e.value)}
            filter
            resetFilterOnHide
            options={
              yieldOnCostMensal.length
                ? Object.keys(yieldOnCostMensal[0])
                    .filter((k) => k !== "data")
                    .map((yoc) => {
                      return { label: yoc, value: yoc };
                    })
                : []
            }
            display="chip"
            placeholder="Ativos"
            maxSelectedLabels={3}
            className="w-full md:w-20rem"
          />
        </div>
        <div className="border w-5/6 h-[34rem] border-gray-200 bg-white py-2 px-4 rounded-md flex">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart width={1300} height={600} data={yieldOnCostMensal}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="data"
                type="category"
                allowDuplicatedCategory={false}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              {yieldOnCostMensal.length &&
                Object.keys(yieldOnCostMensal[0])
                  .filter((k) => selectedTickers.includes(k))
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
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};

export default YieldOnCostLineChart;
