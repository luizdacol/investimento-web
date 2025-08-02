import { BalancoMensal } from "../../interfaces/LucrosPrejuizosRendaVariavel";
import { Column, ColumnEditorOptions } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useTable } from "../../hooks/useTable";
import { InputNumber } from "primereact/inputnumber";

type LucrosPrejuizosProps = {
  classeAtivo: string;
  saldoParaCompensar: number;
  balancoMensal: BalancoMensal[];
  handlePrejuizoCompensado: (
    id: number,
    prejuizoCompensado: number
  ) => Promise<void>;
};

function TabelaLucrosPrejuizos({
  classeAtivo,
  saldoParaCompensar,
  balancoMensal,
  handlePrejuizoCompensado,
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
      title: "Prejuizo Compensado",
      content: (balanco: BalancoMensal) =>
        formatPriceCell(balanco.prejuizoCompensado),
      editor: (options: ColumnEditorOptions) => priceEditor(options),
      onCellEditComplete: (e: any) => updatePrejuizoCompensado(e),
    },
  ];

  const updatePrejuizoCompensado = (e: any) => {
    let { newRowData, rowData, originalEvent: event } = e;
    if (newRowData.prejuizoCompensado !== rowData.prejuizoCompensado) {
      handlePrejuizoCompensado(newRowData.id, newRowData.prejuizoCompensado);
    }
    event.preventDefault();
  };

  const priceEditor = (options: any) => {
    return (
      <InputNumber
        value={options.value}
        onValueChange={(e) => options.editorCallback(e.value)}
        onKeyDown={(e) => e.stopPropagation()}
        size={5}
        inputClassName="text-xs h-[1rem]"
        mode="currency"
        currency="BRL"
        locale="pt-BR"
      />
    );
  };

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
            editMode="cell"
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
                onCellEditComplete={column.onCellEditComplete}
                editor={column.editor}
              />
            ))}
          </DataTable>
        </div>
      </div>
    </>
  );
}

export default TabelaLucrosPrejuizos;
