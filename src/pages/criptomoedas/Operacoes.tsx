import { useEffect, useState } from "react";
import { CriptomoedaService } from "../../services/CriptomoedaService";
import { useNavigate } from "react-router-dom";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useTable } from "../../hooks/useTable";
import { OperacaoCriptomoeda } from "../../interfaces/Criptomoedas/OperacaoCriptomoeda";
import { usePaginator } from "../../hooks/usePaginator";
import { PaginatedDto } from "../../interfaces/PaginatedDto";

function Operacoes() {
  const { initialPaginatedObject } = usePaginator();

  const [operacoes, setOperacoes] = useState<PaginatedDto<OperacaoCriptomoeda>>(
    initialPaginatedObject
  );
  const [reload, setReload] = useState<Boolean>(false);
  const navigate = useNavigate();
  const {
    formatDateCell,
    formatPriceCell,
    formatPercentCell,
    formatActionCell,
    formatHeader,
  } = useTable();

  const columns = [
    {
      field: "data",
      title: "Data",
      content: (op: OperacaoCriptomoeda) => formatDateCell(op.data),
    },
    { field: "codigo", title: "Codigo" },
    {
      field: "precoUnitario",
      title: "Preço Unitario",
      content: (op: OperacaoCriptomoeda) => formatPriceCell(op.precoUnitario),
    },
    { field: "quantidade", title: "Quantidade" },
    {
      field: "valorTotalBruto",
      title: "Valor Total Bruto",
      content: (op: OperacaoCriptomoeda) => formatPriceCell(op.valorTotalBruto),
    },
    {
      field: "taxa",
      title: "Taxa",
      content: (op: OperacaoCriptomoeda) => formatPercentCell(op.taxa * 100),
    },
    {
      field: "valorTotalLiquido",
      title: "Valor Total Liquido",
      content: (op: OperacaoCriptomoeda) =>
        formatPriceCell(op.valorTotalLiquido),
    },
    { field: "tipoOperacao", title: "Tipo Operação" },
    {
      field: undefined,
      title: "Ações",
      content: (op: OperacaoCriptomoeda) =>
        formatActionCell(op.id, handleDelete, handleUpdate),
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const data = await CriptomoedaService.getOperacoes();

      setOperacoes(data);
      setReload(false);
    };
    fetchData();
  }, [reload]);

  const handleDelete = async (id: number): Promise<void> => {
    const status = await CriptomoedaService.deleteOperacao(id);
    if (status) {
      setReload(true);
    }
  };

  const handleUpdate = async (id: number): Promise<void> => {
    navigate(`/criptomoedas/form-operacoes?id=${id}`);
  };

  return (
    <>
      <main className="h-full">
        {/* Main Content */}
        <div className="mainCard">
          <div className="border w-full border-gray-200 bg-white py-4 px-6 rounded-md">
            <DataTable
              value={operacoes.content}
              header={formatHeader("Operações", "/criptomoedas/form-operacoes")}
              size="small"
              stripedRows
              sortMode="multiple"
              removableSort
            >
              {columns.map((column, index) => (
                <Column
                  key={column.field}
                  field={column.field}
                  header={column.title}
                  body={column.content}
                  sortable
                  alignHeader="center"
                  headerClassName="text-sm"
                  align="center"
                  bodyClassName="text-xs"
                />
              ))}
            </DataTable>
          </div>
        </div>
      </main>
    </>
  );
}

export default Operacoes;
