import { CarteiraRendaFixa } from "../interfaces/CarteiraRendaFixa";
import { CarteiraRendaVariavel } from "../interfaces/CarteiraRendaVariavel";
import { AxiosClient } from "../providers/AxiosClient";

const getConsolidado = async (
  dataDeCorte: Date
): Promise<(CarteiraRendaVariavel | CarteiraRendaFixa)[]> => {
  let carteira = await AxiosClient.get<
    (CarteiraRendaVariavel | CarteiraRendaFixa)[]
  >("v1/carteira", {
    params: {
      dataDeCorte,
    },
  });

  return carteira.data.map((c) => {
    return {
      ...c,
      dataHoraCotacao: new Date(c.dataHoraCotacao),
    };
  });
};

const updatePrices = async (): Promise<boolean> => {
  const cotacaoRendaFixa = AxiosClient.patch<boolean>(
    "v1/renda-fixa/ativos/update-prices"
  );
  const cotacaoRendaVariavel = AxiosClient.patch<boolean>(
    "v1/renda-variavel/ativos/update-prices"
  );
  const cotacaoCriptomoedas = AxiosClient.patch<boolean>(
    "v1/criptomoedas/ativos/update-prices"
  );

  const cotacaoAtualizada = await Promise.all([
    cotacaoRendaFixa,
    cotacaoRendaVariavel,
    cotacaoCriptomoedas,
  ]);

  return cotacaoAtualizada.some((c) => !!c);
};

export const CarteiraService = {
  getConsolidado,
  updatePrices,
};
