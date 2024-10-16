import {
  ComposicaoChart,
  ComposicaoV2Chart,
} from "../interfaces/Graficos/ComposicaoChart";
import { ProventoComposicaoChart } from "../interfaces/Graficos/ProventoComposicaoChart";
import { ProventosChart } from "../interfaces/Graficos/ProventosChart";
import { YieldOnCostMensalChart } from "../interfaces/Graficos/YieldOnCostMonthly";
import { AxiosClient } from "../providers/AxiosClient";

const getComposicao = async (): Promise<ComposicaoChart[]> => {
  const composicao = await AxiosClient.get<ComposicaoChart[]>(
    "v1/graficos/composicao"
  );

  return composicao.data;
};

const getComposicaoPorCategoria = async (
  categoria: string
): Promise<ComposicaoV2Chart[]> => {
  const composicao = await AxiosClient.get<ComposicaoV2Chart[]>(
    `v1/graficos/composicao/${categoria}`
  );

  return composicao.data;
};

const getProventos = async (): Promise<ProventosChart[]> => {
  const proventos = await AxiosClient.get<ProventosChart[]>(
    "v1/graficos/proventos"
  );

  return proventos.data.map((p) => {
    return {
      ...p,
      data: new Date(p.data),
    };
  });
};

const getProventosComposicao = async (
  startDate: string,
  endDate: string
): Promise<ProventoComposicaoChart> => {
  const proventoComposicao = await AxiosClient.get<ProventoComposicaoChart>(
    "v1/renda-variavel/graficos/proventos",
    {
      params: {
        startDate,
        endDate,
      },
    }
  );

  return proventoComposicao.data;
};

const getYieldOnCostMensal = async (): Promise<YieldOnCostMensalChart[]> => {
  const yieldOnCost = await AxiosClient.get<YieldOnCostMensalChart[]>(
    "v1/graficos/proventos/yield"
  );

  return yieldOnCost.data;
};

export const GraficosService = {
  getComposicaoPorCategoria,
  getComposicao,
  getProventos,
  getProventosComposicao,
  getYieldOnCostMensal,
};
