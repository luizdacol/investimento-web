import { useEffect, useState } from "react";
import { RendaVariavelService } from "../../services/RendaVariavelService";
import { ProventoRendaVariavel } from "../../interfaces/Provento";
import { useNavigate } from "react-router-dom";
import { usePaginator } from "../../hooks/usePaginator";
import { PaginatedDto } from "../../interfaces/PaginatedDto";
import { Paginator } from "primereact/paginator";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
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
    { field: "ticker", title: "Ticker" },
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
      const data = await RendaVariavelService.getProventos(take, skip);
      setProventos(data);
      setReload(false);
    };

    fetchData();
  }, [reload, skip, take]);

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
