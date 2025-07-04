import { AtivoCriptomoeda } from "../interfaces/Criptomoedas/AtivoCriptomoeda";
import { AxiosClient } from "../providers/AxiosClient";

const getAtivos = async (): Promise<AtivoCriptomoeda[]> => {
  let ativos = await AxiosClient.get<AtivoCriptomoeda[]>(
    "v1/criptomoedas/ativos"
  );

  return ativos.data.map((ativo) => {
    return {
      id: +ativo.id,
      codigo: ativo.codigo,
      nome: ativo.nome,
      cotacao: +ativo.cotacao,
      dataHoraCotacao: new Date(ativo.dataHoraCotacao),
    } as AtivoCriptomoeda;
  });
};

const getAtivoById = async (id: number) => {
  let response = await AxiosClient.get<AtivoCriptomoeda>(
    `v1/criptomoedas/ativos/${id}`
  );

  const ativo = response.data;

  return {
    id: +ativo.id,
    codigo: ativo.codigo,
    nome: ativo.nome,
    cotacao: +ativo.cotacao,
    dataHoraCotacao: new Date(ativo.dataHoraCotacao),
  } as AtivoCriptomoeda;
};

const createAtivo = async (
  requestAtivo: Omit<AtivoCriptomoeda, "id" | "cotacao" | "dataHoraCotacao">
): Promise<boolean> => {
  const response = await AxiosClient.post(
    "v1/criptomoedas/ativos",
    requestAtivo
  );
  if (response.status === 201) return true;
  else {
    console.log("Erro ao inserir ativo: ", response.data);
    return false;
  }
};

const updateAtivo = async (
  id: number,
  requestAtivo: Omit<AtivoCriptomoeda, "id" | "cotacao" | "dataHoraCotacao">
): Promise<boolean> => {
  const response = await AxiosClient.patch(
    `v1/criptomoedas/ativos/${id}`,
    requestAtivo
  );
  if (response.status === 200) return true;
  else {
    console.log("Erro ao atualizar ativo: ", response.data);
    return false;
  }
};

const deleteAtivo = async (id: number): Promise<boolean> => {
  const response = await AxiosClient.delete(`v1/criptomoedas/ativos/${id}`);
  if (response.status === 204) return true;
  else {
    console.log("Erro ao deletar ativo: ", response.data);
    return false;
  }
};

export const CriptomoedaService = {
  getAtivos,
  getAtivoById,
  createAtivo,
  updateAtivo,
  deleteAtivo,
};
