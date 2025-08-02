import { BalancoMensal } from "../../interfaces/LucrosPrejuizosRendaVariavel";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useTable } from "../../hooks/useTable";

type LucrosPrejuizosProps = {
  classeAtivo: string;
  saldoParaCompensar: number;
  balancoMensal: BalancoMensal[];
};

function TabelaLucrosPrejuizos({
  classeAtivo,
  saldoParaCompensar,
  balancoMensal,
}: LucrosPrejuizosProps) {
  const { formatDateCell, formatPriceCell, formatHeader } = useTable();

  const columns = [
    {
      field: "data",
      title: "Data",
      content: (balanco: BalancoMensal) =>
        formatDateCell(balanco.data, { month: "2-digit", year: "numeric" }),
    },
    {
      field: "prejuizo",
      title: "Prejuizo",
      content: (balanco: BalancoMensal) =>
        formatPriceCell(balanco.prejuizo, undefined, true),
    },
    {
      field: "lucro",
      title: "Lucro",
      content: (balanco: BalancoMensal) =>
        formatPriceCell(balanco.lucro, undefined, true),
    },
    {
      field: "prejuizoCompensado",
      title: "Compensado",
      content: (balanco: BalancoMensal) =>
        formatPriceCell(balanco.prejuizoCompensado),
    },
    {
      field: undefined,
      title: "Ações",
    },
  ];

  return (
    <>
      <div className="mainCard">
        <div className="border w-full border-gray-200 bg-white py-4 px-6 rounded-md">
          <DataTable
            value={balancoMensal}
            header={formatHeader(classeAtivo, "", saldoParaCompensar)}
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
    </>
  );
}

export default TabelaLucrosPrejuizos;
