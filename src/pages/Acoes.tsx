import { useEffect, useState } from "react";
import Table from "../components/AcoesTable/Table";
import { AcoesService } from "../services/AcoesService";

export interface Acao {
  data: Date;
  ticker: string;
  precoUnitario: number;
  quantidade: number;
  precoTotal: number;
  operacao: string;
  tipo: string;
}

function Acoes() {
  const [data, setData] = useState<Acao[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await AcoesService.getAllAcoes();
      setData(data);
    };

    fetchData();
  }, []);

  return (
    <>
      <main className="h-full">
        {/* Main Content */}
        <div className="mainCard">
          <div className="border w-full border-gray-200 bg-white py-4 px-6 rounded-md">
            <Table acoes={data}></Table>
          </div>
        </div>
      </main>
    </>
  );
}

export default Acoes;
