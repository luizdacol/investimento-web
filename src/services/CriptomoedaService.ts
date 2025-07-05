import { AtivoCriptomoeda } from "../interfaces/Criptomoedas/AtivoCriptomoeda";
import { OperacaoCriptomoeda } from "../interfaces/Criptomoedas/OperacaoCriptomoeda";
import { PaginatedDto } from "../interfaces/PaginatedDto";
import { AxiosClient } from "../providers/AxiosClient";

interface Ativo {
  id: number;
  codigo: string;
  nome: string;
  cotacao: number;
  dataHoraCotacao: Date;
}

interface Operacao {
  id: number;
  data: Date;
  ativo: Ativo;
  precoUnitario: number;
  quantidade: number;
  valorTotalBruto: number;
  valorTotalLiquido: number;
  taxa: number;
  tipo: string;
}

const getOperacoes = async () => {
  let operacoes = await AxiosClient.get<PaginatedDto<Operacao>>(
    "v1/criptomoedas/operacoes"
  );

  const retorno: PaginatedDto<OperacaoCriptomoeda> = {
    metadata: operacoes.data.metadata,
    content: operacoes.data.content.map((op) => {
      return {
        id: +op.id,
        data: new Date(op.data),
        codigo: op.ativo.codigo,
        precoUnitario: +op.precoUnitario,
        quantidade: +op.quantidade,
        valorTotalBruto: +op.valorTotalBruto,
        taxa: +op.taxa,
        valorTotalLiquido: +op.valorTotalLiquido,
        tipoOperacao: op.tipo,
      } as OperacaoCriptomoeda;
    }),
  };

  return retorno;
};

const getOperacaoById = async (id: number) => {
  let response = await AxiosClient.get<Operacao>(
    `v1/criptomoedas/operacoes/${id}`
  );

  const op = response.data;

  return {
    id: +op.id,
    data: new Date(op.data),
    codigo: op.ativo.codigo,
    precoUnitario: +op.precoUnitario,
    quantidade: +op.quantidade,
    valorTotalBruto: +op.valorTotalBruto,
    taxa: +op.taxa,
    valorTotalLiquido: +op.valorTotalLiquido,
    tipoOperacao: op.tipo,
  } as OperacaoCriptomoeda;
};

const createOperacao = async (
  requestOperacao: Omit<
    OperacaoCriptomoeda,
    "id" | "valorTotalLiquido" | "quantidade"
  >
): Promise<boolean> => {
  const response = await AxiosClient.post(
    "v1/criptomoedas/operacoes",
    requestOperacao
  );
  if (response.status === 201) return true;
  else {
    console.log("Erro ao inserir operação: ", response.data);
    return false;
  }
};

const updateOperacao = async (
  id: number,
  requestOperacao: Omit<
    OperacaoCriptomoeda,
    "id" | "valorTotalLiquido" | "quantidade"
  >
): Promise<boolean> => {
  const response = await AxiosClient.patch(
    `v1/criptomoedas/operacoes/${id}`,
    requestOperacao
  );
  if (response.status === 200) return true;
  else {
    console.log("Erro ao atualizar operação: ", response.data);
    return false;
  }
};

const deleteOperacao = async (id: number): Promise<boolean> => {
  const response = await AxiosClient.delete(`v1/criptomoedas/operacoes/${id}`);
  if (response.status === 204) return true;
  else {
    console.log("Erro ao deletar operação: ", response.data);
    return false;
  }
};

const getAtivos = async (): Promise<AtivoCriptomoeda[]> => {
  let ativos = await AxiosClient.get<AtivoCriptomoeda[]>(
    "v1/criptomoedas/ativos"
  );

  return ativos.data.map((ativo) => {
    return {
      id: +ativo.id,
      codigo: ativo.codigo,
      nome: ativo.nome,
      cotacao: +ativo.cotacao,
      dataHoraCotacao: new Date(ativo.dataHoraCotacao),
    } as AtivoCriptomoeda;
  });
};

const getAtivoById = async (id: number) => {
  let response = await AxiosClient.get<AtivoCriptomoeda>(
    `v1/criptomoedas/ativos/${id}`
  );

  const ativo = response.data;

  return {
    id: +ativo.id,
    codigo: ativo.codigo,
    nome: ativo.nome,
    cotacao: +ativo.cotacao,
    dataHoraCotacao: new Date(ativo.dataHoraCotacao),
  } as AtivoCriptomoeda;
};

const createAtivo = async (
  requestAtivo: Omit<AtivoCriptomoeda, "id" | "cotacao" | "dataHoraCotacao">
): Promise<boolean> => {
  const response = await AxiosClient.post(
    "v1/criptomoedas/ativos",
    requestAtivo
  );
  if (response.status === 201) return true;
  else {
    console.log("Erro ao inserir ativo: ", response.data);
    return false;
  }
};

const updateAtivo = async (
  id: number,
  requestAtivo: Omit<AtivoCriptomoeda, "id" | "cotacao" | "dataHoraCotacao">
): Promise<boolean> => {
  const response = await AxiosClient.patch(
    `v1/criptomoedas/ativos/${id}`,
    requestAtivo
  );
  if (response.status === 200) return true;
  else {
    console.log("Erro ao atualizar ativo: ", response.data);
    return false;
  }
};

const deleteAtivo = async (id: number): Promise<boolean> => {
  const response = await AxiosClient.delete(`v1/criptomoedas/ativos/${id}`);
  if (response.status === 204) return true;
  else {
    console.log("Erro ao deletar ativo: ", response.data);
    return false;
  }
};

export const CriptomoedaService = {
  getOperacoes,
  getAtivos,
  getOperacaoById,
  getAtivoById,
  createOperacao,
  createAtivo,
  updateOperacao,
  updateAtivo,
  deleteOperacao,
  deleteAtivo,
};
