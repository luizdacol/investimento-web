import { useEffect, useState } from "react";
import { RendaVariavelService } from "../../services/RendaVariavelService";
import { OperacaoRendaVariavel } from "../../interfaces/Operacao";
import { useNavigate } from "react-router-dom";
import { Paginator } from "primereact/paginator";
import { PaginatedDto } from "../../interfaces/PaginatedDto";
import { usePaginator } from "../../hooks/usePaginator";
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { Column } from "primereact/column";
import { useTable } from "../../hooks/useTable";
import { FilterMatchMode } from "primereact/api";
import { AtivoRendaVariavel } from "../../interfaces/AtivoRendaVariavel";
import DateFilterTemplate from "../../components/FilterTemplates/DateFilterTemplate";
import MultiSelectFilterTemplate from "../../components/FilterTemplates/MultiSelectFilterTemplate";
import { useFilterAndSort } from "../../hooks/useFilterAndSort";
import { TipoOperacaoRV } from "../../data/enums";

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

  const [filters, setFilters] = useState<DataTableFilterMeta>({
    ticker: {
      value: null,
      matchMode: FilterMatchMode.IN,
    },
    data: {
      value: null,
      matchMode: FilterMatchMode.BETWEEN,
    },
    tipoOperacao: {
      value: null,
      matchMode: FilterMatchMode.IN,
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
          <MultiSelectFilterTemplate
            placeholder="Selecione o ativo"
            options={options}
            items={ativos.map((a) => a.ticker)}
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
    {
      field: "tipoOperacao",
      title: "Tipo de Operação",
      backField: "tipo",
      filter: true,
      filterElement: (options: any) => {
        return (
          <MultiSelectFilterTemplate
            placeholder="Selecione a operação"
            options={options}
            items={Object.values(TipoOperacaoRV)}
          />
        );
      },
    },
    { field: "tipoAtivo", title: "Tipo de Ativo", backField: "ativo.tipo" },
    {
      field: undefined,
      title: "Ações",
      content: (op: OperacaoRendaVariavel) =>
        formatActionCell(op.id, handleDelete, handleUpdate),
    },
  ];

  const { handleSort, sortBy, dataTableSortMeta, handleFilter, filterBy } =
    useFilterAndSort(columns);

  useEffect(() => {
    const fetchData = async () => {
      const [data, ativos] = await Promise.all([
        RendaVariavelService.getOperacoes(
          take,
          skip,
          sortBy.length === 0 ? ["data|DESC"] : sortBy,
          filterBy
        ),
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
