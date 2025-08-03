export interface AtivoCriptomoeda {
  id: number;
  codigo: string;
  nome: string;
  classe: string;
  cotacao: number;
  dataHoraCotacao: Date;
}
