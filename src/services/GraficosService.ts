import { ComposicaoChart } from "../interfaces/Graficos/ComposicaoChart";
import { AxiosClient } from "../providers/AxiosClient";

const getComposicao = async (): Promise<ComposicaoChart[]> => {
  const composicao = await AxiosClient.get<ComposicaoChart[]>(
    "v1/graficos/composicao"
  );

  return composicao.data;
};

export const GraficosService = {
  getComposicao,
};
