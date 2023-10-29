export interface OperacaoRendaFixa {
  id: number;
  data: Date;
  titulo: string;
  quantidade: number;
  precoUnitario: number;
  precoTotal: number;
  rentabilidade: string;
  dataVencimento: Date;
  tipoAtivo: string;
  tipoOperacao: string;
}
