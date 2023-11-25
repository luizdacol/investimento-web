export interface CarteiraRendaVariavel {
  ticker: string;
  tipoAtivo: string;
  quantidade: number;
  precoMedio: number;
  precoMercado: number;
  composicao: number;
  composicaoTotal: number;
  precoMedioTotal: number;
  precoMercadoTotal: number;
  variacao: number;
  dividendosRecebidos: number;
  yieldOnCost: number;
  dividendosProvisionados: number;
  dataHoraCotacao: Date;
}
