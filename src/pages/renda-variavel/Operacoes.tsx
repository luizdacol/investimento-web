import { useEffect, useState } from "react";
import { RendaVariavelService } from "../../services/RendaVariavelService";
import { OperacaoRendaVariavel } from "../../interfaces/Operacao";
import { useNavigate } from "react-router-dom";
import { Paginator } from "primereact/paginator";
import { PaginatedDto } from "../../interfaces/PaginatedDto";
import { usePaginator } from "../../hooks/usePaginator";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useTable } from "../../hooks/useTable";

function Operacoes() {
  const { take, skip, initialPaginatedObject, onPageChange } = usePaginator();
  const { formatDateCell, formatPriceCell, formatActionCell, formatHeader } =
    useTable();

  const [operacoes, setOperacoes] = useState<
    PaginatedDto<OperacaoRendaVariavel>
  >(initialPaginatedObject);
  const [reload, setReload] = useState<Boolean>(false);
  const navigate = useNavigate();

  const columns = [
    {
      field: "data",
      title: "Data",
      content: (op: OperacaoRendaVariavel) => formatDateCell(op.data),
    },
    { field: "ticker", title: "Ticker" },
    {
      field: "precoUnitario",
      title: "Preço Unitario",
      content: (op: OperacaoRendaVariavel) => formatPriceCell(op.precoUnitario),
    },
    { field: "quantidade", title: "Quantidade" },
    {
      field: "precoTotal",
      title: "Preço Total",
      content: (op: OperacaoRendaVariavel) => formatPriceCell(op.precoTotal),
    },
    { field: "tipoOperacao", title: "Tipo de Operação" },
    { field: "tipoAtivo", title: "Tipo de Ativo" },
    {
      field: undefined,
      title: "Ações",
      content: (op: OperacaoRendaVariavel) =>
        formatActionCell(op.id, handleDelete, handleUpdate),
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const data = await RendaVariavelService.getOperacoes(take, skip);

      setOperacoes(data);
      setReload(false);
    };

    fetchData();
  }, [reload, skip, take]);

  const handleDelete = async (id: number): Promise<void> => {
    const status = await RendaVariavelService.deleteOperacao(id);
    if (status) {
      setReload(true);
    }
  };

  const handleUpdate = async (id: number): Promise<void> => {
    navigate(`/renda-variavel/form-operacoes?id=${id}`);
  };

  return (
    <>
      <main className="h-full">
        {/* Main Content */}
        <div className="mainCard">
          <div className="border w-full border-gray-200 bg-white py-4 px-6 rounded-md">
            <DataTable
              value={operacoes.content}
              header={formatHeader(
                "Operações",
                "/renda-variavel/form-operacoes"
              )}
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
            {operacoes.content && (
              <Paginator
                first={skip}
                rows={take}
                totalRecords={operacoes.metadata.totalRecords}
                rowsPerPageOptions={[50, 100, 500, 1000]}
                onPageChange={onPageChange}
                template={{
                  layout:
                    "FirstPageLink PageLinks LastPageLink RowsPerPageDropdown",
                }}
              />
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default Operacoes;
