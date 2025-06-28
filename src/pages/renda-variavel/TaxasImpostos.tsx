import { useEffect, useState } from "react";
import { RendaVariavelService } from "../../services/RendaVariavelService";
import { TaxasImpostosRendaVariavel } from "../../interfaces/TaxasImpostosRendaVariavel";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useTable } from "../../hooks/useTable";

function TaxasImpostos() {
  const [taxasImpostos, setTaxasImpostos] = useState<
    TaxasImpostosRendaVariavel[]
  >([]);
  const [reload, setReload] = useState<Boolean>(false);
  const { formatDateCell, formatPriceCell, formatHeader } = useTable();

  const columns = [
    {
      field: "data",
      title: "Data",
      content: (taxa: TaxasImpostosRendaVariavel) => formatDateCell(taxa.data),
    },
    {
      field: "totalOperacao",
      title: "Total Operação",

      content: (taxa: TaxasImpostosRendaVariavel) =>
        formatPriceCell(taxa.valorTotal),
    },
    {
      field: "emolumentos",
      title: "Emolumentos",
      content: (taxa: TaxasImpostosRendaVariavel) =>
        formatPriceCell(taxa.emolumentos),
    },
    {
      field: "taxaLiquidacao",
      title: "Taxa Liquidação",
      content: (taxa: TaxasImpostosRendaVariavel) =>
        formatPriceCell(taxa.taxaLiquidacao),
    },
    {
      field: "total",
      title: "Total",
      content: (taxa: TaxasImpostosRendaVariavel) =>
        formatPriceCell(taxa.total),
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const data = await RendaVariavelService.getTaxasImpostos();
      setTaxasImpostos(data);
      setReload(false);
    };

    fetchData();
  }, [reload]);

  return (
    <>
      <main className="h-full">
        {/* Main Content */}
        <div className="mainCard">
          <div className="border w-full border-gray-200 bg-white py-4 px-6 rounded-md">
            <DataTable
              value={taxasImpostos}
              header={formatHeader("Taxas e Impostos")}
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

export default TaxasImpostos;
