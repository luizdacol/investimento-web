export interface OperacaoRendaFixa {
  id: number;
  data: Date;
  titulo: string;
  quantidade: number;
  precoUnitario: number;
  precoTotal: number;
  rentabilidade: string;
  tipoAtivo: string;
  tipoOperacao: string;
}
