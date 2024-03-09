import React, { MouseEventHandler, useEffect, useRef, useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Colors,
  ChartOptions,
  Title,
  Plugin,
} from "chart.js";
import { Doughnut, getElementAtEvent } from "react-chartjs-2";
import { ProventoComposicaoChart } from "../../interfaces/Graficos/ProventoComposicaoChart";
import PriceCell from "../Table/PriceCell";
import Cell from "../Table/Cell";

type detailsType = {
  ativo: string;
  total: number;
  tipo: string;
};

type ProventosPieProps = {
  proventosComposicaoChart: ProventoComposicaoChart;
  selectedMonth: string;
};

const ProventosPieChart = ({
  proventosComposicaoChart,
  selectedMonth,
}: ProventosPieProps) => {
  const [detalhes, setDetalhes] = useState<detailsType[]>([]);
  const chartRef = useRef();

  ChartJS.register(ArcElement, Tooltip, Legend, Colors, Title);

  const doughnutLabel: Plugin<"doughnut"> = {
    id: "doughnutLabel",
    beforeDatasetDraw(chart: any, args: any, pluginOptions: any) {
      const { ctx, data } = chart;
      ctx.save();

      if (chart.getDatasetMeta(0).data.length === 0) return;

      const sum: number = data.datasets[0].data.reduce(
        (pv: number, cv: number) => pv + cv
      );
      const composicao = data.datasets[0].data.map((x: number) =>
        Math.round((x / sum) * 100)
      );
      const xCoor = chart.getDatasetMeta(0).data[0].x;
      const yCoor = chart.getDatasetMeta(0).data[0].y;

      const index = chart._active.length !== 0 ? chart._active[0].index : 0;
      const bgColor = chart.boxes[0].legendItems[index].fillStyle;

      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = bgColor;
      ctx.font = "bold 80px sans-serif";
      ctx.fillText(`${composicao[index]}%`, xCoor, yCoor);
    },
  };

  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: false,
    events: ["click"],
    cutout: "65%",
    plugins: {
      colors: {
        forceOverride: true,
      },
      title: {
        display: true,
        text: `Distribuição proventos - ${selectedMonth}`,
      },
      tooltip: {
        mode: "index",
        xAlign: "center",
      },
      legend: {
        position: "chartArea",
        align: "start",
        labels: {
          boxWidth: 20,
        },
      },
    },
  };

  const data = {
    labels: proventosComposicaoChart.labels,
    datasets: [
      {
        data: proventosComposicaoChart.data,
        borderWidth: 1,
      },
    ],
  };

  const toogleTipo = (
    event?: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    if (!chartRef.current) {
      return;
    }

    const chartInstance = chartRef.current as ChartJS;
    let element = event && getElementAtEvent(chartInstance, event)[0];

    if (!element) {
      element = chartInstance.getActiveElements()[0];
      if (!element) return;
    }

    let selectedLabel = proventosComposicaoChart.labels[element.index];

    setDetalhes(
      proventosComposicaoChart.details.filter((d) => d.tipo === selectedLabel)
    );
  };

  useEffect(() => {
    const chart = chartRef.current! as ChartJS;
    const numberOfElements = chart.data.datasets[0].data.length;
    const activeElemnent = {
      datasetIndex: 0,
      index: 0,
    };

    if (numberOfElements) {
      chart.setActiveElements([activeElemnent]);
      chart.tooltip?.setActiveElements([activeElemnent], {
        x: 0,
        y: 0,
      });

      toogleTipo();
    }
  }, [proventosComposicaoChart]);

  return (
    <>
      <div className="flex space-x-2 h-96">
        <div className="border w-1/2 border-gray-200 bg-white py-2 px-4 rounded-md">
          <Doughnut
            data={data}
            options={options}
            ref={chartRef}
            onClick={(e) => toogleTipo(e)}
            plugins={[doughnutLabel]}
          />
        </div>
        <div className="border w-1/2 border-gray-200 bg-white rounded-md">
          <table className="table w-11/12 text-sm text-center m-4">
            <thead>
              <tr>
                <th>Ativo</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              {detalhes.map((detail) => (
                <tr key={detail.ativo}>
                  <Cell
                    cellValue={detail.ativo}
                    dataLabel="Ativo"
                    className="text-base border-b md:text-center block md:table-cell md:whitespace-nowrap text-slate-800 md:first:pl-4 md:last:pr-4 px-3 py-1"
                  />
                  <PriceCell cellValue={detail.total} dataLabel="Total" />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ProventosPieChart;
