import { useEffect, useState } from "react";
import { YieldOnCostChart } from "../../interfaces/Graficos/YieldOnCostMonthly";
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
  LabelList,
} from "recharts";
import { MultiSelect } from "primereact/multiselect";
import { SelectButton } from "primereact/selectbutton";

const YieldOnCostLineChart = () => {
  const [yieldOnCost, setYieldOnCost] = useState<YieldOnCostChart[]>([]);
  const [brushIndex, setBrushIndex] = useState<{
    start?: number;
    end?: number;
  }>({ start: 0, end: 10 });

  const [selectedTickers, setSelectedTickers] = useState<string[]>([]);
  const [period, setPeriod] = useState<string>("Mensal");

  useEffect(() => {
    const fetchData = async () => {
      const response = await GraficosService.getYieldOnCost(period);
      setYieldOnCost(response);
      setBrushIndex({ start: response.length - 13, end: response.length - 1 });
    };

    fetchData();
  }, [period]);

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

  const CustomizedLabel = (props: any) => {
    return (
      <text
        x={props.x}
        y={props.y}
        dy={-4}
        fill={props.color}
        fontSize={10}
        textAnchor="middle"
      >
        {props.value}%
      </text>
    );
  };

  return (
    <>
      <div className="border h-[40rem] border-gray-200 bg-white py-2 px-4 rounded-md space-y-2">
        <div className="flex space-x-6">
          <MultiSelect
            value={selectedTickers}
            onChange={(e) => setSelectedTickers(e.value)}
            filter
            resetFilterOnHide
            showClear
            showSelectAll={false}
            options={
              yieldOnCost.length
                ? Object.keys(yieldOnCost[0])
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
          <SelectButton
            className="text-xs"
            value={period}
            onChange={(e) => setPeriod(e.value)}
            options={["Mensal", "Anual"]}
          />
        </div>
        <ResponsiveContainer width="100%" height="90%">
          <LineChart
            width={1300}
            height={600}
            data={yieldOnCost}
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
              padding={{ left: 20 }}
            />
            <YAxis />
            <Tooltip formatter={(value, name, props) => `${value}%`} />
            <Legend />
            {yieldOnCost.length &&
              Object.keys(yieldOnCost[0])
                .filter((k) => selectedTickers.includes(k))
                .map((yoc, index) => (
                  <Line
                    type="monotone"
                    dataKey={yoc}
                    name={yoc}
                    key={yoc}
                    dot={{ fill: COLORS[index] }}
                    stroke={COLORS[index]}
                  >
                    <LabelList
                      content={<CustomizedLabel color={COLORS[index]} />}
                    />
                  </Line>
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
