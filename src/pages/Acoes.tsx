import { useEffect, useState } from "react";
import Table from "../components/AcoesTable/Table";
import { RendaVariavelService } from "../services/AcoesService";
import { OperacaoRendaVariavel } from "../interfaces/Operacao";

function Acoes() {
  const [operacoes, setOperacoes] = useState<OperacaoRendaVariavel[]>([]);
  const [reload, setReload] = useState<Boolean>(false);

  const headers = [
    "Data",
    "Ticker",
    "Preço Unitario",
    "Quantidade",
    "Preço Total",
    "Tipo de Operação",
    "Tipo de Ativo",
    "Ações",
  ];

  useEffect(() => {
    const fetchData = async () => {
      const data = await RendaVariavelService.getOperacoes();
      setOperacoes(data);
      setReload(false);
    };

    fetchData();
  }, [reload]);

  const handleDelete = async (id: number): Promise<void> => {
    const status = await RendaVariavelService.deleteOperacao(id);
    if (status) {
      setReload(true);
    }
  };

  return (
    <>
      <main className="h-full">
        {/* Main Content */}
        <div className="mainCard">
          <div className="border w-full border-gray-200 bg-white py-4 px-6 rounded-md">
            <Table
              operacoes={operacoes}
              handleDelete={handleDelete}
              headers={headers}
            ></Table>
          </div>
        </div>
      </main>
    </>
  );
}

export default Acoes;
