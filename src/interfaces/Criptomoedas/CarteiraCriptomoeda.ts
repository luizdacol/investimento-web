export interface CarteiraCriptomoeda {
  codigo: string;
  tipoAtivo: string;
  quantidade: number;
  precoMedio: number;
  precoMercado: number;
  composicao: number;
  composicaoTotal: number;
  precoMedioTotal: number;
  precoMercadoTotal: number;
  variacao: number;
  dataHoraCotacao: Date;
}
