import { useState, useEffect } from "react";
import {
  Bar,
  BarChart,
  Brush,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from "recharts";
import { ProventosChart } from "../../interfaces/Graficos/ProventosChart";
import { GraficosService } from "../../services/GraficosService";
import { ProventoComposicaoChart } from "../../interfaces/Graficos/ProventoComposicaoChart";

const ProventosBarChart = () => {
  const [proventos, setProventos] = useState<ProventosChart[]>([]);
  const [brushIndex, setBrushIndex] = useState<{
    start?: number;
    end?: number;
  }>({ start: undefined, end: undefined });

  useEffect(() => {
    const fetchData = async () => {
      const response = await GraficosService.getProventos();
      setProventos(response);
      setBrushIndex({ start: response.length - 13, end: response.length - 1 });
    };

    fetchData();
  }, []);

  const [selectedMonth, setSelectedMonth] = useState(
    new Intl.DateTimeFormat("en-US", {
      month: "2-digit",
      year: "numeric",
    }).format(new Date())
  );
  const [proventoComposicao, setProventoComposicao] =
    useState<ProventoComposicaoChart>();

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedMonth) return;

      const year = Number(selectedMonth.substring(3));
      const month = Number(selectedMonth.substring(0, 2));

      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0);

      const response = await GraficosService.getProventosComposicao(
        startDate.toISOString().substring(0, 10),
        endDate.toISOString().substring(0, 10)
      );
      setProventoComposicao(response);
    };

    fetchData();
  }, [selectedMonth]);

  const handleClickBar = (dados: any) => {
    setSelectedMonth(dados.data);
  };

  const TooltipByCategory = (props: any) => {
    if (props.active && props.payload && props.payload.length) {
      const payload = props.payload[0].payload;
      const payloadKeys = Object.keys(payload).filter(
        (k) => k !== "data" && k !== "carteira"
      );

      const colors: Record<string, string> = {
        acao: "text-red-600",
        fii: "text-yellow-500",
        bdr: "text-violet-700",
      };

      return (
        <div className="bg-white p-2.5">
          <p className="underline decoration-double underline-offset-4 pb-2">
            {props.label}
          </p>
          <ul>
            {payloadKeys.map(
              (key) =>
                payload[key] > 0 && (
                  <li
                    key={key}
                    className={`block ${colors[key]}`}
                  >{`${key}: ${payload[key].toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}`}</li>
                )
            )}
          </ul>
        </div>
      );
    }

    return null;
  };

  return (
    <>
      <div className="flex space-x-2">
        <div className="border w-4/5 h-[34rem] border-gray-200 bg-white py-2 px-4 rounded-md flex">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={proventos.map((p) => {
                return {
                  ...p,
                  data: p.data.toLocaleString("pt-BR", {
                    month: "numeric",
                    year: "numeric",
                    timeZone: "UTC",
                  }),
                };
              })}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
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
                  Distribuição de Proventos
                </tspan>
              </text>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="data" />
              <YAxis />
              <Tooltip content={<TooltipByCategory />} />
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
              <Bar
                dataKey="carteira"
                fill="#5dade2"
                //stackId="a"
                onClick={handleClickBar}
                label={{
                  position: "top",
                  fontSize: 13,
                  formatter: (v: any) => {
                    return v.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    });
                  },
                }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="border border-gray-200 bg-white w-1/5 h-[34rem] p-4 overflow-y-auto">
          <div className="text-center text-sm underline decoration-double font-bold underline-offset-4">
            {selectedMonth}
          </div>
          {proventoComposicao?.labels.map((tipo) => (
            <div key={tipo} className="mb-5">
              <div className="border-b border-black text-base mb-2">{tipo}</div>
              {proventoComposicao?.details
                .filter((d) => d.tipo === tipo)
                .map((d) => (
                  <div
                    key={d.ativo}
                    className="grid grid-cols-2 odd:bg-gray-100 even:bg-white"
                  >
                    <div className="block md:whitespace-nowrap text-slate-800 md:last:pr-4 px-1 py-1 font-medium text-[13px] ">
                      {d.ativo}
                    </div>
                    <div className="block md:whitespace-nowrap text-slate-800 md:last:pr-4 px-1 py-1 font-medium text-[13px]">
                      {d.total.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </div>
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProventosBarChart;
