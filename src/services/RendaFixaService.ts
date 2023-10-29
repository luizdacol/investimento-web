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

export const RendaFixaService = {
  getOperacoes,
};
