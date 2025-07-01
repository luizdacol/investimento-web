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
import { AtivoRendaVariavel } from "../../interfaces/AtivoRendaVariavel";
import DateFilterTemplate from "../../components/FilterTemplates/DateFilterTemplate";
import TickerFilterTemplate from "../../components/FilterTemplates/TickerFilterTemplate";

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
    data: {
      value: null,
      matchMode: FilterMatchMode.BETWEEN,
    },
  });

  const columns = [
    {
      field: "data",
      title: "Data",
      content: (op: OperacaoRendaVariavel) => formatDateCell(op.data),
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
          <TickerFilterTemplate
            options={options}
            tickers={ativos.map((a) => a.ticker)}
          />
        );
      },
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
      const [data, ativos] = await Promise.all([
        RendaVariavelService.getOperacoes(take, skip, sortBy, filterBy),
        RendaVariavelService.getAtivos(),
      ]);

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

  const parseDateValues = (value: any[]) => {
    const datas = value.map((v) => new Date(v));
    if (datas.every((d) => isNaN(d.getTime()))) return value;

    return datas.map((d) => {
      if (isNaN(d.getTime())) {
        return "";
      } else {
        return d.toLocaleDateString("en-CA", { timeZone: "UTC" });
      }
    });
  };

  const handleFilter = (evento: DataTableStateEvent) => {
    const filters = Object.keys(evento.filters).map((field) => {
      const filter = evento.filters[field] as DataTableFilterMetaData;
      const value = (filter.value as string[]) ?? [];

      if (value.length === 0) return "";

      const parsedValues = parseDateValues(value);

      return `${mapBackField(field)}|${filter.matchMode}|${parsedValues.join(
        ","
      )}`;
    });

    setFilterBy(filters.filter((f) => !!f));
    setFilters(evento.filters);
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
                  filterElement={column.filterElement}
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
