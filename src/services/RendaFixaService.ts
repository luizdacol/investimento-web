import { AxiosClient } from "../providers/AxiosClient";
import { OperacaoRendaFixa } from "../interfaces/OperacaoRendaFixa";

const getOperacoes = async () => {
  //let operacoes = await AxiosClient.get<Operacao[]>("v1/renda-fixa/operacoes");
  let operacoes: OperacaoRendaFixa[] = [
    {
      id: 1,
      data: new Date(),
      titulo: "Tesouro Selic",
      quantidade: 100,
      precoUnitario: 100,
      precoTotal: 10000,
      rentabilidadeContratada: "SELIC + 0,110%",
      vencimento: new Date(2026, 3, 10),
      tipoAtivo: "Tesouro Direto",
    },
  ];
  return operacoes;

  //   return operacoes.data.map((op) => {
  //     return {
  //       id: +op.id,
  //       data: new Date(op.data),
  //       tipoOperacao: op.tipo,
  //       precoTotal: +op.precoTotal,
  //       precoUnitario: +op.precoUnitario,
  //       quantidade: +op.quantidade,
  //       ticker: op.ativo.ticker,
  //       tipoAtivo: op.ativo.tipo,
  //     } as OperacaoRendaVariavel;
  //   });
};

const getOperacaoById = async (id: number) => {
  let operacoes: OperacaoRendaFixa = {
    id: 1,
    data: new Date(),
    titulo: "Tesouro Selic",
    quantidade: 100,
    precoUnitario: 100,
    precoTotal: 10000,
    rentabilidadeContratada: "SELIC + 0,110%",
    vencimento: new Date(2026, 3, 10),
    tipoAtivo: "Tesouro Direto",
  };
  return operacoes;

  //   let response = await AxiosClient.get<Operacao>(
  //     `v1/renda-fixa/operacoes/${id}`
  //   );
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

export const RendaFixaService = {
  getOperacoes,
  getOperacaoById,
  createOperacao,
  updateOperacao,
};
