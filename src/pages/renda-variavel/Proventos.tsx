import { useEffect, useState } from "react";
import Table from "../../components/Table/Table";
import { RendaVariavelService } from "../../services/RendaVariavelService";
import { ProventoRendaVariavel } from "../../interfaces/Provento";
import DateCell from "../../components/Table/DateCell";
import PriceCell from "../../components/Table/PriceCell";
import Cell from "../../components/Table/Cell";
import ActionCell from "../../components/Table/ActionCell";
import { useNavigate } from "react-router-dom";
import { useStyles } from "../../hooks/useStyles";
import { useSort } from "../../hooks/useSort";

function Proventos() {
  const { rowDefaultStyle } = useStyles();
  const { sort } = useSort();
  const [proventos, setProventos] = useState<ProventoRendaVariavel[]>([]);
  const [reload, setReload] = useState<Boolean>(false);
  const navigate = useNavigate();

  const headers = [
    { key: "dataCom", label: "Data Com" },
    { key: "dataPagamento", label: "Data Pagamento" },
    { key: "ticker", label: "Ticker" },
    { key: "valorBruto", label: "Valor Bruto" },
    { key: "valorLiquido", label: "Valor Liquido" },
    { key: "posicao", label: "Posição" },
    { key: "valorTotal", label: "Valor total" },
    { key: "tipo", label: "Tipo" },
    { key: undefined, label: "Ações" },
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
    const status = await RendaVariavelService.deleteProvento(id);
    if (status) {
      setReload(true);
    }
  };

  const handleUpdate = async (id: number): Promise<void> => {
    navigate(`/renda-variavel/form-proventos?id=${id}`);
  };

  const handleSort = (property: string, order: string) => {
    const keyProperty = property as keyof ProventoRendaVariavel;
    const sortedOperation = sort(proventos, keyProperty, order);

    setProventos(sortedOperation);
  };

  return (
    <>
      <main className="h-full">
        {/* Main Content */}
        <div className="mainCard">
          <div className="border w-full border-gray-200 bg-white py-4 px-6 rounded-md">
            <Table
              headers={headers}
              title="Proventos"
              newItemRedirect="/renda-variavel/form-proventos"
              handleSort={handleSort}
            >
              {proventos.map((provento, index) => (
                <tr key={index} className={rowDefaultStyle}>
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
                  <ActionCell
                    id={provento.id}
                    handleDelete={handleDelete}
                    handleUpdate={handleUpdate}
                  ></ActionCell>
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
