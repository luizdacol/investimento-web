import { useEffect, useState } from "react";
import { EvolucaoProventosChart } from "../../interfaces/Graficos/EvolucaoProventosChart";
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

const EvolucaoProventosLineChart = () => {
  const [evolucaoProvento, setEvolucaoProvento] = useState<
    EvolucaoProventosChart[]
  >([]);
  const [brushIndex, setBrushIndex] = useState<{
    start?: number;
    end?: number;
  }>({ start: 0, end: 10 });

  const [selectedTickers, setSelectedTickers] = useState<string[]>([]);
  const [period, setPeriod] = useState<string>("Mensal");
  const [info, setInfo] = useState<string>("YOC");

  useEffect(() => {
    const fetchData = async () => {
      const response = await GraficosService.getEvolucaoProventos(period, info);
      setEvolucaoProvento(response);
      setBrushIndex({ start: response.length - 13, end: response.length - 1 });
    };

    fetchData();
  }, [period, info]);

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

  const formatarValor = (valor: any) => {
    return `${valor}${info === "YOC" ? "%" : ""}`;
  };

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
        {formatarValor(props.value)}
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
              evolucaoProvento.length
                ? Object.keys(evolucaoProvento[0])
                    .filter((k) => k !== "data")
                    .sort()
                    .map((chave) => {
                      return { label: chave, value: chave };
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
          <SelectButton
            className="text-xs"
            value={info}
            onChange={(e) => setInfo(e.value)}
            options={["YOC", "PM", "Valor"]}
          />
        </div>
        <ResponsiveContainer width="100%" height="90%">
          <LineChart
            width={1300}
            height={600}
            data={evolucaoProvento}
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
            <Tooltip formatter={(value, name, props) => formatarValor(value)} />
            <Legend />
            {evolucaoProvento.length &&
              Object.keys(evolucaoProvento[0])
                .filter((k) => selectedTickers.includes(k))
                .map((chave, index) => (
                  <Line
                    type="monotone"
                    dataKey={chave}
                    name={chave}
                    key={chave}
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

export default EvolucaoProventosLineChart;
