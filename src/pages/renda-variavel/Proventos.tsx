import { useEffect, useState } from "react";
import { RendaVariavelService } from "../../services/RendaVariavelService";
import { ProventoRendaVariavel } from "../../interfaces/Provento";
import { useNavigate } from "react-router-dom";
import { usePaginator } from "../../hooks/usePaginator";
import { PaginatedDto } from "../../interfaces/PaginatedDto";
import { Paginator } from "primereact/paginator";
import { Column } from "primereact/column";
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { useTable } from "../../hooks/useTable";
import { FilterMatchMode } from "primereact/api";
import { useFilterAndSort } from "../../hooks/useFilterAndSort";
import DateFilterTemplate from "../../components/FilterTemplates/DateFilterTemplate";
import MultiSelectFilterTemplate from "../../components/FilterTemplates/MultiSelectFilterTemplate";
import { AtivoRendaVariavel } from "../../interfaces/AtivoRendaVariavel";
import { TipoProvento } from "../../data/enums";

function Proventos() {
  const { take, skip, initialPaginatedObject, onPageChange } = usePaginator();
  const { formatDateCell, formatPriceCell, formatActionCell, formatHeader } =
    useTable();
  const [proventos, setProventos] = useState<
    PaginatedDto<ProventoRendaVariavel>
  >(initialPaginatedObject);
  const [reload, setReload] = useState<Boolean>(false);
  const navigate = useNavigate();
  const [ativos, setAtivos] = useState<AtivoRendaVariavel[]>([]);

  const [filters, setFilters] = useState<DataTableFilterMeta>({
    dataCom: {
      value: null,
      matchMode: FilterMatchMode.BETWEEN,
    },
    dataPagamento: {
      value: null,
      matchMode: FilterMatchMode.BETWEEN,
    },
    ticker: {
      value: null,
      matchMode: FilterMatchMode.IN,
    },
    tipo: {
      value: null,
      matchMode: FilterMatchMode.IN,
    },
  });

  const columns = [
    {
      field: "dataCom",
      title: "Data Com",
      content: (prov: ProventoRendaVariavel) => formatDateCell(prov.dataCom),
      filter: true,
      filterElement: DateFilterTemplate,
    },
    {
      field: "dataPagamento",
      title: "Data Pagamento",
      content: (prov: ProventoRendaVariavel) =>
        formatDateCell(prov.dataPagamento),
      filter: true,
      filterElement: DateFilterTemplate,
    },
    {
      field: "ticker",
      title: "Ticker",
      backField: "ativo.ticker",
      filter: true,
      filterElement: (options: any) => {
        return (
          <MultiSelectFilterTemplate
            placeholder="Selecione o ativo"
            options={options}
            items={ativos.map((a) => a.ticker)}
          />
        );
      },
    },
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
    {
      field: "tipo",
      title: "Tipo",
      filter: true,
      filterElement: (options: any) => {
        return (
          <MultiSelectFilterTemplate
            placeholder="Selecione o tipo"
            options={options}
            items={Object.values(TipoProvento)}
          />
        );
      },
    },
    {
      field: undefined,
      title: "Ações",
      content: (prov: ProventoRendaVariavel) =>
        formatActionCell(prov.id, handleDelete, handleUpdate),
    },
  ];

  const { handleSort, sortBy, dataTableSortMeta, handleFilter, filterBy } =
    useFilterAndSort(columns);

  useEffect(() => {
    const fetchData = async () => {
      const [data, ativos] = await Promise.all([
        RendaVariavelService.getProventos(take, skip, sortBy, filterBy),
        RendaVariavelService.getAtivos(),
      ]);

      setProventos(data);
      setAtivos(ativos);
      setReload(false);
    };

    fetchData();
  }, [reload, skip, take, sortBy, filterBy]);

  const handleDelete = async (id: number): Promise<void> => {
    const status = await RendaVariavelService.deleteProvento(id);
    if (status) {
      setReload(true);
    }
  };

  const handleUpdate = async (id: number): Promise<void> => {
    navigate(`/renda-variavel/form-proventos?id=${id}`);
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
              multiSortMeta={dataTableSortMeta}
              removableSort
              filters={filters}
              filterDisplay="menu"
              onFilter={(e) => {
                handleFilter(e);
                setFilters(e.filters);
              }}
            >
              {columns.map((column, index) => (
                <Column
                  key={column.field}
                  field={column.field}
                  header={column.title}
                  body={column.content}
                  filter={column.filter}
                  showFilterMatchModes={false}
                  filterElement={column.filterElement}
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
