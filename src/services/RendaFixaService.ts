import { AxiosClient } from "../providers/AxiosClient";
import { OperacaoRendaFixa } from "../interfaces/OperacaoRendaFixa";

const getOperacoes = async () => {
  let operacoes = await AxiosClient.get<OperacaoRendaFixa[]>(
    "v1/renda-fixa/operacoes"
  );
  return operacoes.data.map((op) => {
    return {
      ...op,
      data: new Date(op.data),
      dataVencimento: new Date(op.dataVencimento),
      precoTotal: +op.precoTotal,
      precoUnitario: +op.precoUnitario,
      quantidade: +op.quantidade,
    };
  });
};

const getOperacaoById = async (id: number) => {
  let response = await AxiosClient.get<OperacaoRendaFixa>(
    `v1/renda-fixa/operacoes/${id}`
  );

  const op = response.data;

  return {
    ...op,
    data: new Date(op.data),
    dataVencimento: new Date(op.dataVencimento),
    precoTotal: +op.precoTotal,
    precoUnitario: +op.precoUnitario,
    quantidade: +op.quantidade,
  };
};

const createOperacao = async (
  requestOperacao: Omit<OperacaoRendaFixa, "id" | "precoTotal">
): Promise<boolean> => {
  const response = await AxiosClient.post(
    "v1/renda-fixa/operacoes",
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
  requestOperacao: Omit<OperacaoRendaFixa, "id" | "precoTotal">
): Promise<boolean> => {
  const response = await AxiosClient.patch(
    `v1/renda-fixa/operacoes/${id}`,
    requestOperacao
  );
  if (response.status === 200) return true;
  else {
    console.log("Erro ao atualizar operação: ", response.data);
    return false;
  }
};

const deleteOperacao = async (id: number): Promise<boolean> => {
  const response = await AxiosClient.delete(`v1/renda-fixa/operacoes/${id}`);
  if (response.status === 204) return true;
  else {
    console.log("Erro ao deletar operação: ", response.data);
    return false;
  }
};

export const RendaFixaService = {
  getOperacoes,
  getOperacaoById,
  createOperacao,
  updateOperacao,
  deleteOperacao,
};
