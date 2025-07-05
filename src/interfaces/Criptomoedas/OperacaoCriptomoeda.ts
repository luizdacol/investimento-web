export interface OperacaoCriptomoeda {
  id: number;
  data: Date;
  codigo: string;
  precoUnitario: number;
  quantidade: number;
  valorTotalBruto: number;
  taxa: number;
  valorTotalLiquido: number;
  tipoOperacao: string;
}
