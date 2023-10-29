export interface OperacaoRendaFixa {
  id: number;
  data: Date;
  titulo: string;
  quantidade: number;
  precoUnitario: number;
  precoTotal: number;
  rentabilidadeContratada: string;
  vencimento: Date;
  tipoAtivo: string;
}
