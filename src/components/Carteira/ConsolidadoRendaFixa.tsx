import { CarteiraRendaFixa } from "../../interfaces/CarteiraRendaFixa";
import { useEffect, useState } from "react";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useTable } from "../../hooks/useTable";

type CarteiraProps = {
  title: string;
  initialCarteira: CarteiraRendaFixa[];
};

function ConsolidadoRendaFixa({ initialCarteira, title }: CarteiraProps) {
  const [carteira, setCarteira] = useState<CarteiraRendaFixa[]>([]);
  const { formatPriceCell, formatPercentCell, formatHeader } = useTable();

  useEffect(() => {
    setCarteira(initialCarteira);
  }, [initialCarteira]);

  const columns = [
    { field: "titulo", title: "Titulo" },
    { field: "quantidade", title: "Posição" },
    {
      field: "composicao",
      title: "% Classe",
      content: (op: CarteiraRendaFixa) => formatPercentCell(op.composicao),
    },
    {
      field: "composicaoTotal",
      title: "% Carteira",
      content: (op: CarteiraRendaFixa) => formatPercentCell(op.composicaoTotal),
    },
    {
      field: "precoMedio",
      title: "Preço Médio",
      content: (op: CarteiraRendaFixa) => formatPriceCell(op.precoMedio),
    },
    {
      field: "precoMedioTotal",
      title: "Total Investido",
      content: (op: CarteiraRendaFixa) => formatPriceCell(op.precoMedioTotal),
    },
    {
      field: "precoMercado",
      title: "Preço Atual",
      content: (op: CarteiraRendaFixa) =>
        formatPriceCell(
          op.precoMercado,
          op.dataHoraCotacao.toLocaleString("pt-BR")
        ),
    },
    {
      field: "precoMercadoTotal",
      title: "Total Atualizado",
      content: (op: CarteiraRendaFixa) => formatPriceCell(op.precoMercadoTotal),
    },
    {
      field: "variacao",
      title: "Variação",
      content: (op: CarteiraRendaFixa) => formatPercentCell(op.variacao, true),
    },
  ];

  const formatFooter = (column: any) => {
    const itemFooter = carteira.find((i) => i.titulo === "Total");
    if ("content" in column) {
      return <div className="text-xs">{column.content(itemFooter)}</div>;
    }
    return (
      <div className="text-xs">
        {itemFooter &&
          (itemFooter[column.field as keyof CarteiraRendaFixa] as string)}
      </div>
    );
  };

  if (carteira.length === 0) return null;

  return (
    <div className="mainCard">
      <div className="border w-full border-gray-200 bg-white py-2 px-4 rounded-md">
        <DataTable
          value={carteira.filter((i) => i.titulo !== "Total")}
          header={formatHeader(title)}
          size="small"
          stripedRows
          sortMode="multiple"
          removableSort
          paginatorTemplate={{
            layout: "FirstPageLink PageLinks LastPageLink RowsPerPageDropdown",
          }}
        >
          {columns.map((column, index) => (
            <Column
              key={column.field}
              field={column.field}
              header={column.title}
              footer={formatFooter(column)}
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
  );
}

export default ConsolidadoRendaFixa;
