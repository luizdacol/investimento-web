import { useEffect, useState } from "react";
import { RendaVariavelService } from "../../services/RendaVariavelService";
import { ProventoRendaVariavel } from "../../interfaces/Provento";
import { useNavigate } from "react-router-dom";
import { usePaginator } from "../../hooks/usePaginator";
import { PaginatedDto } from "../../interfaces/PaginatedDto";
import { Paginator } from "primereact/paginator";
import { Column } from "primereact/column";
import {
  DataTable,
  DataTableSortMeta,
  DataTableStateEvent,
} from "primereact/datatable";
import { useTable } from "../../hooks/useTable";

function Proventos() {
  const { take, skip, initialPaginatedObject, onPageChange } = usePaginator();
  const { formatDateCell, formatPriceCell, formatActionCell, formatHeader } =
    useTable();
  const [proventos, setProventos] = useState<
    PaginatedDto<ProventoRendaVariavel>
  >(initialPaginatedObject);
  const [reload, setReload] = useState<Boolean>(false);
  const navigate = useNavigate();
  const [multiSort, setMultiSort] = useState<DataTableSortMeta[]>([]);
  const [sortBy, setSortBy] = useState<string[]>([]);

  const columns = [
    {
      field: "dataCom",
      title: "Data Com",
      content: (prov: ProventoRendaVariavel) => formatDateCell(prov.dataCom),
    },
    {
      field: "dataPagamento",
      title: "Data Pagamento",
      content: (prov: ProventoRendaVariavel) =>
        formatDateCell(prov.dataPagamento),
    },
    { field: "ticker", title: "Ticker", backField: "ativo.ticker" },
    {
      field: "valorBruto",
      title: "Valor Bruto",
      content: (prov: ProventoRendaVariavel) =>
        formatPriceCell(prov.valorBruto),
    },
    {
      field: "valorLiquido",
      title: "Valor Liquido",
      content: (prov: ProventoRendaVariavel) =>
        formatPriceCell(prov.valorLiquido),
    },
    { field: "posicao", title: "Posição" },
    {
      field: "valorTotal",
      title: "Valor total",
      content: (prov: ProventoRendaVariavel) =>
        formatPriceCell(prov.valorTotal),
    },
    { field: "tipo", title: "Tipo" },
    {
      field: undefined,
      title: "Ações",
      content: (prov: ProventoRendaVariavel) =>
        formatActionCell(prov.id, handleDelete, handleUpdate),
    },
  ];

  useEffect(() => {
    console.log(take);
    const fetchData = async () => {
      const data = await RendaVariavelService.getProventos(take, skip, sortBy);
      setProventos(data);
      setReload(false);
    };

    fetchData();
  }, [reload, skip, take, sortBy]);

  const handleDelete = async (id: number): Promise<void> => {
    const status = await RendaVariavelService.deleteProvento(id);
    if (status) {
      setReload(true);
    }
  };

  const handleUpdate = async (id: number): Promise<void> => {
    navigate(`/renda-variavel/form-proventos?id=${id}`);
  };

  const mapBackField = (field: string) => {
    const column = columns.find((c) => c["field"] === field);
    return column && "backField" in column ? column["backField"] : field;
  };

  const handleSort = (evento: DataTableStateEvent) => {
    const stateEvent = evento.multiSortMeta ?? [];
    const sortByParsed = stateEvent.map((s) => {
      return `${mapBackField(s.field)}|${s.order === 1 ? "ASC" : "DESC"}`;
    });

    setSortBy(sortByParsed);
    setMultiSort(stateEvent);
  };

  return (
    <>
      <main className="h-full">
        {/* Main Content */}
        <div className="mainCard">
          <div className="border w-full border-gray-200 bg-white py-4 px-6 rounded-md">
            <DataTable
              value={proventos.content}
              header={formatHeader(
                "Proventos",
                "/renda-variavel/form-proventos"
              )}
              size="small"
              stripedRows
              onSort={handleSort}
              sortMode="multiple"
              multiSortMeta={multiSort}
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
            {proventos.content && (
              <Paginator
                first={skip}
                rows={take}
                totalRecords={proventos.metadata.totalRecords}
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

export default Proventos;
