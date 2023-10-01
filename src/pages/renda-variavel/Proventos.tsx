import { useEffect, useState } from "react";
import Table from "../../components/Table/Table";
import { RendaVariavelService } from "../../services/AcoesService";
import { ProventoRendaVariavel } from "../../interfaces/Provento";
import DateCell from "../../components/Table/DateCell";
import PriceCell from "../../components/Table/PriceCell";
import Cell from "../../components/Table/Cell";

function Proventos() {
  const [proventos, setProventos] = useState<ProventoRendaVariavel[]>([]);
  const [reload, setReload] = useState<Boolean>(false);

  const headers = [
    "Data Com",
    "Data Pagamento",
    "Ticker",
    "Valor Bruto",
    "Valor Liquido",
    "Posição",
    "Valor total",
    "Tipo",
  ];

  useEffect(() => {
    const fetchData = async () => {
      const data = await RendaVariavelService.getProventos();
      setProventos(data);
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
              headers={headers}
              newItemRedirect="/renda-variavel/form-proventos"
            >
              {proventos.map((provento, index) => (
                <tr
                  key={index}
                  className="bg-white border md:border-b block md:table-row rounded-md shadow-md md:rounded-none md:shadow-none mb-5"
                >
                  <DateCell cellValue={provento.dataCom} dataLabel="DataCom" />
                  <DateCell
                    cellValue={provento.dataPagamento}
                    dataLabel="DataPagamento"
                  />
                  <Cell cellValue={provento.ticker} dataLabel="Ticker" />
                  <PriceCell
                    cellValue={provento.valorBruto}
                    dataLabel="ValorBruto"
                  />
                  <PriceCell
                    cellValue={provento.valorLiquido}
                    dataLabel="ValorLiquido"
                  />
                  <Cell
                    cellValue={provento.posicao.toString()}
                    dataLabel="Posicao"
                  />
                  <PriceCell
                    cellValue={provento.valorTotal}
                    dataLabel="ValorTotal"
                  />
                  <Cell cellValue={provento.tipo} dataLabel="Tipo" />
                </tr>
              ))}
            </Table>
          </div>
        </div>
      </main>
    </>
  );
}

export default Proventos;
