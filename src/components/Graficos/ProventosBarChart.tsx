import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ChartOptions,
} from "chart.js";
import { SetStateAction, useEffect, useRef, useState } from "react";
import { Bar, getElementAtEvent } from "react-chartjs-2";
import { ProventosChart } from "../../interfaces/Graficos/ProventosChart";
import { GraficosService } from "../../services/GraficosService";

type TipoAtivo = keyof Omit<ProventosChart, "data">;
const mapAtivoLabel: [TipoAtivo, string][] = [
  ["fii", "FII"],
  ["acao", "Ação"],
  ["bdr", "BDR"],
  ["carteira", "Carteira"],
];

type ChartProps = {
  setSelectedMonth: React.Dispatch<SetStateAction<string>>;
};

const ProventosBarChart = ({ setSelectedMonth }: ChartProps) => {
  const calcularData = (quantidadeMeses: number): Date => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth() - quantidadeMeses, 1);
  };

  const [proventos, setProventos] = useState<ProventosChart[]>([]);
  const [tipoAtivo, setTipoAtivo] = useState<TipoAtivo>("carteira");
  const [dataInicio, setDataInicio] = useState<Date>(calcularData(12));
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await GraficosService.getProventos();
      setProventos(response);
    };

    fetchData();
  }, []);

  const changeTimeRange = (selectedValue: string) => {
    setDataInicio(calcularData(Number(selectedValue)));
  };

  const changeTipo = (tipo: TipoAtivo) => {
    setTipoAtivo(tipo);
  };

  ChartJS.register(CategoryScale, LinearScale, BarElement);
  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      colors: {
        forceOverride: true,
      },
      title: {
        display: true,
        text: "Proventos",
      },
      tooltip: {
        mode: "index",
      },
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        max: 3000,
      },
    },
  };

  const data = {
    labels: proventos
      .filter((x) => x.data > dataInicio)
      .map((x) =>
        x.data.toLocaleString("pt-BR", {
          month: "numeric",
          year: "numeric",
          timeZone: "UTC",
        })
      ),
    datasets: [
      {
        label: mapAtivoLabel.find((x) => x[0] === tipoAtivo)?.[1],
        data: proventos
          .filter((x) => x.data > dataInicio)
          .map((x) => x[tipoAtivo]),
        borderWidth: 1,
      },
    ],
  };

  const onClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!chartRef.current) {
      return;
    }

    const chartInstance = chartRef.current as ChartJS;

    const element = getElementAtEvent(chartInstance, event);
    if (!element || element.length === 0) return;

    const selectedMonth = (chartInstance.boxes[3] as CategoryScale).ticks[
      element[0].index
    ].label as string;

    setSelectedMonth(selectedMonth);
  };

  return (
    <>
      <div className="border w-full h-full border-gray-200 bg-white py-2 px-4 rounded-md">
        <div className="inline-flex w-1/2 py-2">
          <select
            className="border border-gray-300 px-3 rounded-md"
            onChange={(event) => changeTimeRange(event.target.value)}
          >
            <option key="12M" value={12}>
              12 Meses
            </option>
            <option key="24M" value={24}>
              24 Meses
            </option>
            <option key="All" value={500}>
              Desde o início
            </option>
          </select>
        </div>
        <div className="inline-flex flex-row-reverse w-1/2">
          {mapAtivoLabel.map(([tipoAtivo, label]) => {
            return (
              <button
                key={label}
                className="border border-gray-300 px-3 mx-1 rounded-md focus:bg-gray-200 focus:outline-none"
                autoFocus={true}
                onClick={() => changeTipo(tipoAtivo)}
              >
                {label}
              </button>
            );
          })}
        </div>
        <div className="h-96">
          <Bar data={data} options={options} onClick={onClick} ref={chartRef} />
        </div>
      </div>
    </>
  );
};

export default ProventosBarChart;
