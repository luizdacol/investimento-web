import { CarteiraRendaFixa } from "../interfaces/CarteiraRendaFixa";
import { CarteiraRendaVariavel } from "../interfaces/CarteiraRendaVariavel";
import { AxiosClient } from "../providers/AxiosClient";

const getRendaVariavel = async (tipo: string) => {
  let carteira = await AxiosClient.get<CarteiraRendaVariavel[]>(
    `v1/carteira/renda-variavel?tipo=${tipo}`
  );

  return carteira.data;
};

const getRendaFixa = async (tipo: string) => {
  let carteira = await AxiosClient.get<CarteiraRendaFixa[]>(
    `v1/carteira/renda-fixa?tipo=${tipo}`
  );

  return carteira.data;
};

export const CarteiraService = {
  getRendaVariavel,
  getRendaFixa,
};
