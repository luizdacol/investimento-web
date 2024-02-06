import { useEffect, useState } from "react";
import { RendaVariavelService } from "../../services/RendaVariavelService";
import { OperacaoRendaVariavel } from "../../interfaces/Operacao";
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
  const [operacoes, setOperacoes] = useState<OperacaoRendaVariavel[]>([]);
  const [reload, setReload] = useState<Boolean>(false);
  const navigate = useNavigate();

  const headers = [
    { key: "data", label: "Data" },
    { key: "ticker", label: "Ticker" },
    { key: "precoUnitario", label: "Preço Unitario" },
    { key: "quantidade", label: "Quantidade" },
    { key: "precoTotal", label: "Preço Total" },
    { key: "tipoOperacao", label: "Tipo de Operação" },
    { key: "tipoAtivo", label: "Tipo de Ativo" },
    { key: undefined, label: "Ações" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const data = await RendaVariavelService.getOperacoes();
      console.log(data);
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

  const handleUpdate = async (id: number): Promise<void> => {
    navigate(`/renda-variavel/form-operacoes?id=${id}`);
  };

  const handleSort = (property: string, order: string) => {
    const keyProperty = property as keyof OperacaoRendaVariavel;
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
              newItemRedirect="/renda-variavel/form-operacoes"
              handleSort={handleSort}
            >
              {operacoes.map((operacao, index) => (
                <tr key={index} className={rowDefaultStyle}>
                  <DateCell cellValue={operacao.data} dataLabel="Data" />
                  <Cell cellValue={operacao.ticker} dataLabel="Ticker" />
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
                    cellValue={operacao.tipoOperacao}
                    dataLabel="Operacao"
                  />
                  <Cell cellValue={operacao.tipoAtivo} dataLabel="Tipo" />
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
