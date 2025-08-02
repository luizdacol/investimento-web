export interface LucrosPrejuizosRendaVariavel {
  classeAtivo: string;
  saldoParaCompensar: number;
  balancoMensal: BalancoMensal[];
}

export interface BalancoMensal {
  id: number;
  data: Date;
  lucro: number;
  prejuizo: number;
  prejuizoCompensado: number;
}
