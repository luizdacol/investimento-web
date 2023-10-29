import { useEffect, useState } from "react";
import { RendaFixaService } from "../../services/RendaFixaService";
import { OperacaoRendaFixa } from "../../interfaces/OperacaoRendaFixa";
import ActionCell from "../../components/Table/ActionCell";
import Cell from "../../components/Table/Cell";
import DateCell from "../../components/Table/DateCell";
import PriceCell from "../../components/Table/PriceCell";
import Table from "../../components/Table/Table";
import { useNavigate } from "react-router-dom";

function Operacoes() {
  const [operacoes, setOperacoes] = useState<OperacaoRendaFixa[]>([]);
  const [reload, setReload] = useState<Boolean>(false);
  const navigate = useNavigate();

  const headers = [
    "Data",
    "Titulo",
    "Quantidade",
    "Preço Unitario",
    "Preço Total",
    "Rentabilidade Contratada",
    "Vencimento",
    "Tipo do Ativo",
    "Ações",
  ];

  useEffect(() => {
    const fetchData = async () => {
      const data = await RendaFixaService.getOperacoes();
      setOperacoes(data);
      setReload(false);
    };
    fetchData();
  }, [reload]);

  const handleDelete = async (id: number): Promise<void> => {
    const status = await RendaFixaService.deleteOperacao(id);
    if (status) {
      setReload(true);
    }
  };

  const handleUpdate = async (id: number): Promise<void> => {
    navigate(`/renda-fixa/form-operacoes?id=${id}`);
  };

  return (
    <>
      <main className="h-full">
        {/* Main Content */}
        <div className="mainCard">
          <div className="border w-full border-gray-200 bg-white py-4 px-6 rounded-md">
            <Table
              headers={headers}
              title="Operações"
              newItemRedirect="/renda-fixa/form-operacoes"
            >
              {operacoes.map((operacao, index) => (
                <tr
                  key={index}
                  className="bg-white border md:border-b block md:table-row rounded-md shadow-md md:rounded-none md:shadow-none mb-5"
                >
                  <DateCell cellValue={operacao.data} dataLabel="Data" />
                  <Cell cellValue={operacao.titulo} dataLabel="Titulo" />
                  <Cell
                    cellValue={operacao.quantidade.toString()}
                    dataLabel="Quantidade"
                  />
                  <PriceCell
                    cellValue={operacao.precoUnitario}
                    dataLabel="PrecoUnitario"
                  />
                  <PriceCell
                    cellValue={operacao.precoTotal}
                    dataLabel="PrecoTotal"
                  />
                  <Cell
                    cellValue={operacao.rentabilidadeContratada}
                    dataLabel="Rentabilidade Contratada"
                  />
                  <DateCell
                    cellValue={operacao.vencimento}
                    dataLabel="Vencimento"
                  />
                  <Cell cellValue={operacao.tipoAtivo} dataLabel="TipoAtivo" />
                  <ActionCell
                    id={operacao.id}
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

export default Operacoes;
