import { Acao } from "../pages/Acoes";

import { AxiosClient } from "../providers/AxiosClient";
import { MockClient } from "../providers/MockClient";

interface Ativo {
  id: number;
  ticker: string;
  tipo: string;
  segmento: string;
}

interface Operacao {
  data: Date;
  ativo: Ativo;
  precoUnitario: number;
  quantidade: number;
  precoTotal: number;
  tipo: string;
}

const getAllAcoes = async () => {
  let operacoes = await AxiosClient.get<Operacao[]>(
    "v1/renda-variavel/operacoes"
  );

  return operacoes.data.map((op) => {
    return {
      data: new Date(op.data),
      operacao: op.tipo,
      precoTotal: op.precoTotal,
      precoUnitario: op.precoUnitario,
      quantidade: op.quantidade,
      ticker: op.ativo.ticker,
      tipo: op.ativo.tipo,
    } as Acao;
  });
};

const postAcao = async (acao: Acao) => {
  const requestOperacao = {
    data: acao.data,
    precoTotal: acao.precoTotal,
    precoUnitario: acao.precoUnitario,
    quantidade: acao.quantidade,
    tipoOperacao: acao.operacao,
    ticker: acao.ticker,
    tipoAtivo: acao.tipo,
    segmento: "",
  };

  await AxiosClient.post("v1/renda-variavel/operacoes", requestOperacao);
};

export const AcoesService = {
  getAllAcoes,
  postAcao,
};
