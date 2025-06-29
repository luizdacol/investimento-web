import { useEffect, useState } from "react";
import { RendaVariavelService } from "../../services/RendaVariavelService";
import { OperacaoRendaVariavel } from "../../interfaces/Operacao";
import { useNavigate } from "react-router-dom";
import { Paginator } from "primereact/paginator";
import { PaginatedDto } from "../../interfaces/PaginatedDto";
import { usePaginator } from "../../hooks/usePaginator";
import {
  DataTable,
  DataTableFilterMeta,
  DataTableFilterMetaData,
  DataTableSortMeta,
  DataTableStateEvent,
} from "primereact/datatable";
import { Column } from "primereact/column";
import { useTable } from "../../hooks/useTable";
import { FilterMatchMode } from "primereact/api";
import { MultiSelect } from "primereact/multiselect";
import { AtivoRendaVariavel } from "../../interfaces/AtivoRendaVariavel";

function Operacoes() {
  const { take, skip, initialPaginatedObject, onPageChange } = usePaginator();
  const { formatDateCell, formatPriceCell, formatActionCell, formatHeader } =
    useTable();

  const [operacoes, setOperacoes] = useState<
    PaginatedDto<OperacaoRendaVariavel>
  >(initialPaginatedObject);
  const [reload, setReload] = useState<Boolean>(false);
  const navigate = useNavigate();
  const [ativos, setAtivos] = useState<AtivoRendaVariavel[]>([]);
  const [multiSort, setMultiSort] = useState<DataTableSortMeta[]>([]);
  const [sortBy, setSortBy] = useState<string[]>([]);
  const [filterBy, setFilterBy] = useState<string[]>([]);
  const [filters, setFilters] = useState<DataTableFilterMeta>({
    ticker: {
      value: null,
      matchMode: FilterMatchMode.IN,
    },
  });

  const columns = [
    {
      field: "data",
      title: "Data",
      content: (op: OperacaoRendaVariavel) => formatDateCell(op.data),
    },
    {
      field: "ticker",
      title: "Ticker",
      backField: "ativo.ticker",
      filter: true,
    },
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
    { field: "tipoOperacao", title: "Tipo de Operação", backField: "tipo" },
    { field: "tipoAtivo", title: "Tipo de Ativo", backField: "ativo.tipo" },
    {
      field: undefined,
      title: "Ações",
      content: (op: OperacaoRendaVariavel) =>
        formatActionCell(op.id, handleDelete, handleUpdate),
    },
  ];

  const mapBackField = (field: string) => {
    const column = columns.find((c) => c["field"] === field);
    return column && "backField" in column ? column["backField"] : field;
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await RendaVariavelService.getOperacoes(
        take,
        skip,
        sortBy,
        filterBy
      );

      const ativos = await RendaVariavelService.getAtivos();

      setOperacoes(data);
      setAtivos(ativos);
      setReload(false);
    };

    fetchData();
  }, [reload, skip, take, sortBy, filterBy]);

  const handleDelete = async (id: number): Promise<void> => {
    const status = await RendaVariavelService.deleteOperacao(id);
    if (status) {
      setReload(true);
    }
  };

  const handleUpdate = async (id: number): Promise<void> => {
    navigate(`/renda-variavel/form-operacoes?id=${id}`);
  };

  const handleSort = (evento: DataTableStateEvent) => {
    const stateEvent = evento.multiSortMeta ?? [];
    const sortByParsed = stateEvent.map((s) => {
      return `${mapBackField(s.field)}|${s.order === 1 ? "ASC" : "DESC"}`;
    });

    setSortBy(sortByParsed);
    setMultiSort(stateEvent);
  };

  const handleFilter = (evento: DataTableStateEvent) => {
    const filters = Object.keys(evento.filters).map((field) => {
      const filter = evento.filters[field] as DataTableFilterMetaData;
      const value = (filter.value as string[]) ?? [];

      if (value.length === 0) return "";

      return `${mapBackField(field)}|${filter.matchMode}|${value.join(",")}`;
    });

    setFilterBy(filters.filter((f) => !!f));
    setFilters(evento.filters);
  };

  const tickerFilterTemplate = (options: any) => {
    return (
      <MultiSelect
        value={options.value}
        options={ativos.map((a) => a.ticker)}
        onChange={(e) => options.filterCallback(e.value)}
        placeholder="Selecione o ativo"
        className="p-column-filter text-xs"
        itemClassName="text-xs"
      />
    );
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
              onSort={handleSort}
              size="small"
              stripedRows
              sortMode="multiple"
              multiSortMeta={multiSort}
              removableSort
              filters={filters}
              filterDisplay="menu"
              onFilter={handleFilter}
            >
              {columns.map((column, index) => (
                <Column
                  key={column.field}
                  field={column.field}
                  header={column.title}
                  body={column.content}
                  filter={column.filter}
                  showFilterMatchModes={false}
                  filterElement={tickerFilterTemplate}
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
