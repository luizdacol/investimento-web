import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useState, useEffect } from "react";
import { useTable } from "../../hooks/useTable";
import { CarteiraCriptomoeda } from "../../interfaces/Criptomoedas/CarteiraCriptomoeda";

type CarteiraProps = {
  title: string;
  initialCarteira: CarteiraCriptomoeda[];
};

function ConsolidadoCriptomoeda({ initialCarteira, title }: CarteiraProps) {
  const [carteira, setCarteira] = useState<CarteiraCriptomoeda[]>([]);
  const { formatPriceCell, formatPercentCell, formatHeader } = useTable();

  useEffect(() => {
    setCarteira(initialCarteira);
  }, [initialCarteira]);

  const columns = [
    { field: "codigo", title: "Codigo" },
    { field: "quantidade", title: "Posição" },
    {
      field: "composicao",
      title: "% Classe",
      content: (op: CarteiraCriptomoeda) => formatPercentCell(op.composicao),
    },
    {
      field: "composicaoTotal",
      title: "% Carteira",
      content: (op: CarteiraCriptomoeda) =>
        formatPercentCell(op.composicaoTotal),
    },
    {
      field: "precoMedio",
      title: "Preço Médio",
      content: (op: CarteiraCriptomoeda) => formatPriceCell(op.precoMedio),
    },
    {
      field: "precoMedioTotal",
      title: "Total Investido",
      content: (op: CarteiraCriptomoeda) => formatPriceCell(op.precoMedioTotal),
    },
    {
      field: "precoMercado",
      title: "Preço Atual",
      content: (op: CarteiraCriptomoeda) => formatPriceCell(op.precoMercado),
    },
    {
      field: "precoMercadoTotal",
      title: "Total Atualizado",
      content: (op: CarteiraCriptomoeda) =>
        formatPriceCell(op.precoMercadoTotal),
    },
    {
      field: "variacao",
      title: "Variação",
      content: (op: CarteiraCriptomoeda) =>
        formatPercentCell(op.variacao, true),
    },
  ];

  const formatFooter = (column: any) => {
    const itemFooter = carteira.find((i) => i.codigo === "Total");
    if ("content" in column) {
      return <div className="text-xs">{column.content(itemFooter)}</div>;
    }
    return (
      <div className="text-xs">
        {itemFooter &&
          (itemFooter[column.field as keyof CarteiraCriptomoeda] as string)}
      </div>
    );
  };

  if (carteira.length === 0) return null;

  return (
    <div className="mainCard">
      <div className="border w-full border-gray-200 bg-white py-2 px-4 rounded-md">
        <DataTable
          value={carteira.filter((i) => i.codigo !== "Total")}
          header={formatHeader(title)}
          size="small"
          stripedRows
          sortMode="multiple"
          removableSort
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

export default ConsolidadoCriptomoeda;
