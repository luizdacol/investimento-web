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
  tipo: "BDR" | "Ação";
}

function Acoes() {
  const [data, setData] = useState<Acao[]>([]);

  useEffect(() => {
    const data = AcoesService.getAllAcoes();
    setData(data);
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
