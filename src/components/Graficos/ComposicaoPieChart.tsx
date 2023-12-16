import React, { useEffect, useRef, useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Colors,
  ChartOptions,
  Title,
} from "chart.js";
import { Pie, getElementAtEvent } from "react-chartjs-2";
import { GraficosService } from "../../services/GraficosService";
import { ComposicaoChart } from "../../interfaces/Graficos/ComposicaoChart";

const ComposicaoPieChart = () => {
  const [composicao, setComposicao] = useState<ComposicaoChart[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  const [dados, setDados] = useState<number[]>([]);
  const chartRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      const response = await GraficosService.getComposicao();
      setComposicao(response);
      setLabels(response.find((c) => c.tipo === "Carteira")?.labels ?? []);
      setDados(response.find((c) => c.tipo === "Carteira")?.data ?? []);
    };

    fetchData();
  }, []);

  ChartJS.register(ArcElement, Tooltip, Legend, Colors, Title);

  const options: ChartOptions<"pie"> = {
    plugins: {
      colors: {
        forceOverride: true,
      },
      title: {
        display: true,
        text: "Composição Carteira",
      },
      tooltip: {
        mode: "dataset",
        callbacks: {
          label(tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.formattedValue}%`;
          },
        },
      },
      legend: {
        position: "bottom",
        align: "start",
        labels: {
          boxWidth: 20,
        },
      },
    },
  };

  const data = {
    labels: labels,
    datasets: [
      {
        data: dados,
        borderWidth: 1,
      },
    ],
  };

  const toogleTipo = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!chartRef.current) {
      return;
    }

    const element = getElementAtEvent(chartRef.current, event)[0];
    if (!element) return;

    let selectedLabel = labels[element.index];
    const isTipo = composicao.some((c) => c.tipo === selectedLabel);
    if (!isTipo) selectedLabel = "Carteira";

    setLabels(composicao.find((c) => c.tipo === selectedLabel)?.labels ?? []);
    setDados(composicao.find((c) => c.tipo === selectedLabel)?.data ?? []);
  };

  return (
    <>
      <div className="border w-1/3 h-2/3 border-gray-200 bg-white py-2 px-4 rounded-md">
        <Pie
          data={data}
          options={options}
          ref={chartRef}
          onClick={toogleTipo}
        />
      </div>
    </>
  );
};

export default ComposicaoPieChart;
