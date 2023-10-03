import { OperacaoRendaVariavel } from "../interfaces/Operacao";
import { ProventoRendaVariavel } from "../interfaces/Provento";
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

interface Provento {
  id: number;
  dataCom: Date;
  dataPagamento: Date;
  ativo: Ativo;
  valorBruto: number;
  valorLiquido: number;
  posicao: number;
  valorTotal: number;
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
  requestOperacao: Omit<OperacaoRendaVariavel, "id" | "precoTotal">
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
  requestOperacao: Omit<OperacaoRendaVariavel, "id" | "precoTotal">
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

const getProventos = async (): Promise<ProventoRendaVariavel[]> => {
  let proventos = await AxiosClient.get<Provento[]>(
    "v1/renda-variavel/proventos"
  );

  return proventos.data.map((provento) => {
    return {
      id: +provento.id,
      dataCom: new Date(provento.dataCom),
      dataPagamento: new Date(provento.dataPagamento),
      tipo: provento.tipo,
      valorTotal: +provento.valorTotal,
      valorBruto: +provento.valorBruto,
      valorLiquido: +provento.valorLiquido,
      posicao: +provento.posicao,
      ticker: provento.ativo.ticker,
    } as ProventoRendaVariavel;
  });
};

const getProventoById = async (id: number) => {
  let response = await AxiosClient.get<Provento>(
    `v1/renda-variavel/proventos/${id}`
  );

  const provento = response.data;

  return {
    id: +provento.id,
    dataCom: new Date(provento.dataCom),
    dataPagamento: new Date(provento.dataPagamento),
    tipo: provento.tipo,
    valorTotal: +provento.valorTotal,
    valorBruto: +provento.valorBruto,
    valorLiquido: +provento.valorLiquido,
    posicao: +provento.posicao,
    ticker: provento.ativo.ticker,
  } as ProventoRendaVariavel;
};

const createProvento = async (
  requestProvento: Omit<
    ProventoRendaVariavel,
    "id" | "valorLiquido" | "valorTotal" | "posicao"
  >
): Promise<boolean> => {
  const response = await AxiosClient.post(
    "v1/renda-variavel/proventos",
    requestProvento
  );
  if (response.status === 201) return true;
  else {
    console.log("Erro ao inserir provento: ", response.data);
    return false;
  }
};

const updateProvento = async (
  id: number,
  requestProvento: Omit<
    ProventoRendaVariavel,
    "id" | "valorLiquido" | "valorTotal" | "posicao"
  >
): Promise<boolean> => {
  const response = await AxiosClient.patch(
    `v1/renda-variavel/proventos/${id}`,
    requestProvento
  );
  if (response.status === 200) return true;
  else {
    console.log("Erro ao atualizar provento: ", response.data);
    return false;
  }
};

const deleteProvento = async (id: number): Promise<boolean> => {
  const response = await AxiosClient.delete(
    `v1/renda-variavel/proventos/${id}`
  );
  if (response.status === 204) return true;
  else {
    console.log("Erro ao deletar provento: ", response.data);
    return false;
  }
};

export const RendaVariavelService = {
  getOperacoes,
  createOperacao,
  deleteOperacao,
  updateOperacao,
  getOperacaoById,
  getProventos,
  getProventoById,
  createProvento,
  updateProvento,
  deleteProvento,
};