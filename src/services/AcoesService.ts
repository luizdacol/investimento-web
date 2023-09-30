import { OperacaoRendaVariavel } from "../interfaces/Operacao";
import { AxiosClient } from "../providers/AxiosClient";

interface Ativo {
  id: number;
  ticker: string;
  tipo: string;
  segmento: string;
}

interface Operacao {
  id: number;
  data: Date;
  ativo: Ativo;
  precoUnitario: number;
  quantidade: number;
  precoTotal: number;
  tipo: string;
}

const getOperacoes = async () => {
  let operacoes = await AxiosClient.get<Operacao[]>(
    "v1/renda-variavel/operacoes"
  );

  return operacoes.data.map((op) => {
    return {
      id: +op.id,
      data: new Date(op.data),
      tipoOperacao: op.tipo,
      precoTotal: +op.precoTotal,
      precoUnitario: +op.precoUnitario,
      quantidade: +op.quantidade,
      ticker: op.ativo.ticker,
      tipoAtivo: op.ativo.tipo,
    } as OperacaoRendaVariavel;
  });
};

const createOperacao = async (
  requestOperacao: Omit<OperacaoRendaVariavel, "id">
): Promise<boolean> => {
  const response = await AxiosClient.post(
    "v1/renda-variavel/operacoes",
    requestOperacao
  );
  if (response.status === 201) return true;
  else {
    console.log("Erro ao inserir operação: ", response.data);
    return false;
  }
};

const deleteOperacao = async (id: number): Promise<boolean> => {
  const response = await AxiosClient.delete(
    `v1/renda-variavel/operacoes/${id}`
  );
  if (response.status === 204) return true;
  else {
    console.log("Erro ao deletar operação: ", response.data);
    return false;
  }
};

const updateOperacao = async (
  id: number,
  requestOperacao: Omit<OperacaoRendaVariavel, "id">
): Promise<boolean> => {
  const response = await AxiosClient.patch(
    `v1/renda-variavel/operacoes/${id}`,
    requestOperacao
  );
  if (response.status === 200) return true;
  else {
    console.log("Erro ao atualizar operação: ", response.data);
    return false;
  }
};

const getOperacaoById = async (id: number) => {
  let response = await AxiosClient.get<Operacao>(
    `v1/renda-variavel/operacoes/${id}`
  );

  const operacao = response.data;

  return {
    id: +operacao.id,
    data: new Date(operacao.data),
    tipoOperacao: operacao.tipo,
    precoTotal: +operacao.precoTotal,
    precoUnitario: +operacao.precoUnitario,
    quantidade: +operacao.quantidade,
    ticker: operacao.ativo.ticker,
    tipoAtivo: operacao.ativo.tipo,
  } as OperacaoRendaVariavel;
};

export const RendaVariavelService = {
  getOperacoes,
  createOperacao,
  deleteOperacao,
  updateOperacao,
  getOperacaoById,
};
