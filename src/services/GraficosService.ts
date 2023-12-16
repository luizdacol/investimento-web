import { ComposicaoChart } from "../interfaces/Graficos/ComposicaoChart";
import { ProventosChart } from "../interfaces/Graficos/ProventosChart";
import { AxiosClient } from "../providers/AxiosClient";

const getComposicao = async (): Promise<ComposicaoChart[]> => {
  const composicao = await AxiosClient.get<ComposicaoChart[]>(
    "v1/graficos/composicao"
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

export const GraficosService = {
  getComposicao,
  getProventos,
};
