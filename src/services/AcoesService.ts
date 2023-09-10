import { Acao } from "../pages/Acoes";

import { AxiosClient } from "../providers/AxiosClient";
import { MockClient } from "../providers/MockClient";

const getAllAcoes = () => {
  //return AxiosClient.get<Acao[]>("");
  return MockClient.get() as Acao[];
};

export const AcoesService = {
  getAllAcoes,
};
