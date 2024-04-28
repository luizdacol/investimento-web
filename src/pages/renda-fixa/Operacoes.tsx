import { useEffect, useState } from "react";
import { RendaFixaService } from "../../services/RendaFixaService";
import { OperacaoRendaFixa } from "../../interfaces/OperacaoRendaFixa";
import ActionCell from "../../components/Table/ActionCell";
import Cell from "../../components/Table/Cell";
import DateCell from "../../components/Table/DateCell";
import PriceCell from "../../components/Table/PriceCell";
import Table from "../../components/Table/Table";
import { useNavigate } from "react-router-dom";
import { useStyles } from "../../hooks/useStyles";
import { useSort } from "../../hooks/useSort";

function Operacoes() {
  const { rowDefaultStyle } = useStyles();
  const { sort } = useSort();
  const [operacoes, setOperacoes] = useState<OperacaoRendaFixa[]>([]);
  const [reload, setReload] = useState<Boolean>(false);
  const navigate = useNavigate();

  const headers = [
    { key: "data", label: "Data" },
    { key: "titulo", label: "Titulo" },
    { key: "precoUnitario", label: "Preço Unitario" },
    { key: "quantidade", label: "Quantidade" },
    { key: "precoTotal", label: "Preço Total" },
    { key: "rentabilidade", label: "Rentabilidade" },
    { key: "dataVencimento", label: "Vencimento" },
    { key: "tipoOperacao", label: "Tipo Operação" },
    { key: "tipoAtivo", label: "Tipo do Ativo" },
    { key: undefined, label: "Ações" },
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

  const handleSort = (property: string, order: string) => {
    const keyProperty = property as keyof OperacaoRendaFixa;
    const sortedOperation = sort(operacoes, keyProperty, order);

    setOperacoes(sortedOperation);
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
              handleSort={handleSort}
            >
              {operacoes.map((operacao, index) => (
                <tr key={index} className={rowDefaultStyle}>
                  <DateCell cellValue={operacao.data} dataLabel="Data" />
                  <Cell cellValue={operacao.titulo} dataLabel="Titulo" />

                  <PriceCell
                    cellValue={operacao.precoUnitario}
                    dataLabel="PrecoUnitario"
                  />
                  <Cell
                    cellValue={operacao.quantidade.toString()}
                    dataLabel="Quantidade"
                  />
                  <PriceCell
                    cellValue={operacao.precoTotal}
                    dataLabel="PrecoTotal"
                  />
                  <Cell
                    cellValue={operacao.rentabilidade}
                    dataLabel="Rentabilidade Contratada"
                  />
                  <DateCell
                    cellValue={operacao.dataVencimento}
                    dataLabel="Vencimento"
                  />
                  <Cell
                    cellValue={operacao.tipoOperacao}
                    dataLabel="TipoOperacao"
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
