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

  const COLORS = [
    "#0088FE",
    "#FF8042",
    "#E74C3C",
    "#00C49F",
    "#FFBB28",
    "#A569BD",
    "#C8E309",
    "#979A9A",
    "#7B241C",
    "#154360",
    "#145A32",
    "#7E5109",
    "#490066",
  ];

  return (
    <>
      <div className="border h-[40rem] border-gray-200 bg-white py-2 px-4 rounded-md space-y-2">
        <MultiSelect
          value={selectedTickers}
          onChange={(e) => setSelectedTickers(e.value)}
          filter
          resetFilterOnHide
          showClear
          showSelectAll={false}
          options={
            yieldOnCostMensal.length
              ? Object.keys(yieldOnCostMensal[0])
                  .filter((k) => k !== "data")
                  .sort()
                  .map((yoc) => {
                    return { label: yoc, value: yoc };
                  })
              : []
          }
          display="chip"
          placeholder="Ativos"
          maxSelectedLabels={7}
          itemClassName="text-xs"
          className="w-1/2 text-xs ml-16"
        />
        <ResponsiveContainer width="100%" height="90%">
          <LineChart
            width={1300}
            height={600}
            data={yieldOnCostMensal}
            margin={{
              top: 20,
              right: 20,
              left: 5,
              bottom: 0,
            }}
          >
            <text
              x="50%"
              y="1%"
              fill="black"
              textAnchor="middle"
              dominantBaseline="central"
            >
              <tspan
                fontSize="14"
                fontFamily="sans-serif"
                fontWeight="bold"
                fill="#727575"
              >
                Yield on Cost
              </tspan>
            </text>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="data"
              type="category"
              allowDuplicatedCategory={false}
            />
            <YAxis />
            <Tooltip formatter={(value, name, props) => `${value}%`} />
            <Legend />
            {yieldOnCostMensal.length &&
              Object.keys(yieldOnCostMensal[0])
                .filter((k) => selectedTickers.includes(k))
                .map((yoc, index) => (
                  <Line
                    type="monotone"
                    dataKey={yoc}
                    name={yoc}
                    key={yoc}
                    stroke={COLORS[index]}
                  />
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
    </>
  );
};

export default YieldOnCostLineChart;
