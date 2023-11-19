import { CarteiraRendaFixa } from "../interfaces/CarteiraRendaFixa";
import { CarteiraRendaVariavel } from "../interfaces/CarteiraRendaVariavel";
import { AxiosClient } from "../providers/AxiosClient";

const getConsolidado = async () => {
  let carteira = await AxiosClient.get<
    (CarteiraRendaVariavel | CarteiraRendaFixa)[]
  >("v1/carteira");
  return carteira.data;
};

export const CarteiraService = {
  getConsolidado,
};
