export interface OperacaoRendaVariavel {
  id: number;
  data: Date;
  ticker: string;
  precoUnitario: number;
  quantidade: number;
  precoTotal: number;
  tipoOperacao: string;
  tipoAtivo: string;
  segmento: string;
}
