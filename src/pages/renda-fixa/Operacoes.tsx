import { useEffect, useState } from "react";
import { RendaFixaService } from "../../services/RendaFixaService";
import { OperacaoRendaFixa } from "../../interfaces/OperacaoRendaFixa";
import { useNavigate } from "react-router-dom";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useTable } from "../../hooks/useTable";

function Operacoes() {
  const [operacoes, setOperacoes] = useState<OperacaoRendaFixa[]>([]);
  const [reload, setReload] = useState<Boolean>(false);
  const navigate = useNavigate();
  const { formatDateCell, formatPriceCell, formatActionCell, formatHeader } =
    useTable();

  const columns = [
    {
      field: "data",
      title: "Data",
      content: (op: OperacaoRendaFixa) => formatDateCell(op.data),
    },
    { field: "titulo", title: "Titulo" },
    {
      field: "precoUnitario",
      title: "Preço Unitario",
      content: (op: OperacaoRendaFixa) => formatPriceCell(op.precoUnitario),
    },
    { field: "quantidade", title: "Quantidade" },
    {
      field: "precoTotal",
      title: "Preço Total",
      content: (op: OperacaoRendaFixa) => formatPriceCell(op.precoTotal),
    },
    { field: "rentabilidade", title: "Rentabilidade" },
    { field: "tipoOperacao", title: "Tipo Operação" },
    { field: "tipoAtivo", title: "Tipo do Ativo" },
    {
      field: undefined,
      title: "Ações",
      content: (op: OperacaoRendaFixa) =>
        formatActionCell(op.id, handleDelete, handleUpdate),
    },
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
            <DataTable
              value={operacoes}
              header={formatHeader("Operações", "/renda-fixa/form-operacoes")}
              size="small"
              stripedRows
              sortMode="multiple"
              removableSort
              paginatorTemplate={{
                layout:
                  "FirstPageLink PageLinks LastPageLink RowsPerPageDropdown",
              }}
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
