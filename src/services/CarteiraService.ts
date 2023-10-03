import { CarteiraRendaVariavel } from "../interfaces/CarteiraRendaVariavel";
import { AxiosClient } from "../providers/AxiosClient";

const getRendaVariavel = async (tipo: string) => {
  let carteira = await AxiosClient.get<CarteiraRendaVariavel[]>(
    `v1/carteira/renda-variavel?tipo=${tipo}`
  );

  return carteira.data;
};

export const CarteiraService = {
  getRendaVariavel,
};
