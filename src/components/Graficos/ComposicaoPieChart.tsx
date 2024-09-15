import { useEffect, useState } from "react";
import { GraficosService } from "../../services/GraficosService";
import { ComposicaoV2Chart } from "../../interfaces/Graficos/ComposicaoChart";
import { PieChart, Pie, Tooltip, Cell } from "recharts";

type Props = {
  categoria: string;
};

const ComposicaoPieChart = ({ categoria }: Props) => {
  const [composicao, setComposicao] = useState<ComposicaoV2Chart[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await GraficosService.getComposicaoPorCategoria(
        categoria
      );
      setComposicao(response);
    };

    fetchData();
  }, [categoria]);

  const renderCustomizedLabel = (param: any) => {
    const RADIAN = Math.PI / 180;
    const radius =
      param.innerRadius + (param.outerRadius - param.innerRadius) * 0.5;
    const x = param.cx + radius * Math.cos(-param.midAngle * RADIAN);
    const y = param.cy + radius * Math.sin(-param.midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > param.cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize={14}
      >
        <tspan x={x} dy="1em">{`${param.name}`}</tspan>
        <tspan x={x} dy="1em">{`${param.value}%`}</tspan>
      </text>
    );
  };

  const COLORS = [
    "#FF8042",
    "#0088FE",
    "#FFBB28",
    "#00C49F",
    "#E74C3C",
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
    <div className="border w-1/3 h-2/3 border-gray-200 bg-white py-2 px-4 rounded-md mr-1">
      <PieChart width={400} height={400}>
        <text
          x="50%"
          y="2%"
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
            Composição {categoria}
          </tspan>
        </text>
        <Pie
          dataKey="value"
          isAnimationActive={false}
          data={composicao}
          cx="50%"
          cy="52%"
          outerRadius="95%"
          fill="#8884d8"
          label={renderCustomizedLabel}
          labelLine={false}
        >
          {composicao.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
};

export default ComposicaoPieChart;
