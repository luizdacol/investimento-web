export interface ProventoComposicaoChart {
  labels: string[];
  data: number[];
  details: {
    ativo: string;
    total: number;
    tipo: string;
  }[];
}
