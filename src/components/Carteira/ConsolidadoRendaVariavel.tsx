import { CarteiraRendaVariavel } from "../../interfaces/CarteiraRendaVariavel";
import { useEffect, useState } from "react";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useTable } from "../../hooks/useTable";

type CarteiraProps = {
  title: string;
  initialCarteira: CarteiraRendaVariavel[];
};

function ConsolidadoRendaVariavel({ initialCarteira, title }: CarteiraProps) {
  const [carteira, setCarteira] = useState<CarteiraRendaVariavel[]>([]);

  const { formatPriceCell, formatPercentCell, formatHeader } = useTable();

  useEffect(() => {
    setCarteira(
      initialCarteira.filter((c) => c.tipoAtivo === title.replaceAll(" ", ""))
    );
  }, [initialCarteira]);

  const columns = [
    { field: "ticker", title: "Ticker" },
    { field: "quantidade", title: "Quantidade" },
    {
      field: "precoMedio",
      title: "Preço Médio",
      content: (op: CarteiraRendaVariavel) => formatPriceCell(op.precoMedio),
    },
    {
      field: "precoMercado",
      title: "Preço Mercado",
      content: (op: CarteiraRendaVariavel) => formatPriceCell(op.precoMercado),
    },
    {
      field: "composicao",
      title: "Composição",
      content: (op: CarteiraRendaVariavel) => formatPercentCell(op.composicao),
    },
    {
      field: "composicaoTotal",
      title: "Composição Carteira",
      content: (op: CarteiraRendaVariavel) =>
        formatPercentCell(op.composicaoTotal),
    },
    {
      field: "precoMedioTotal",
      title: "Preço Médio Total",
      content: (op: CarteiraRendaVariavel) =>
        formatPriceCell(op.precoMedioTotal),
    },
    {
      field: "precoMercadoTotal",
      title: "Preço Mercado Total",
      content: (op: CarteiraRendaVariavel) =>
        formatPriceCell(op.precoMercadoTotal),
    },
    {
      field: "variacao",
      title: "Variação",
      content: (op: CarteiraRendaVariavel) =>
        formatPercentCell(op.variacao, true),
    },
    {
      field: "dividendosRecebidos",
      title: "Dividendos Recebidos",
      content: (op: CarteiraRendaVariavel) =>
        formatPriceCell(op.dividendosRecebidos),
    },
    {
      field: "yieldOnCost",
      title: "Yield On Cost",
      content: (op: CarteiraRendaVariavel) =>
        formatPercentCell(op.yieldOnCost, true),
    },
  ];

  const formatFooter = (column: any) => {
    const itemFooter = carteira.find((i) => i.ticker === "Total");
    if ("content" in column) {
      return <div className="text-xs">{column.content(itemFooter)}</div>;
    }
    return (
      <div className="text-xs">
        {itemFooter &&
          (itemFooter[column.field as keyof CarteiraRendaVariavel] as string)}
      </div>
    );
  };

  if (carteira.length === 0) return null;

  return (
    <div className="mainCard">
      <div className="border w-full border-gray-200 bg-white py-2 px-4 rounded-md">
        <DataTable
          value={carteira.filter((i) => i.ticker !== "Total")}
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

export default ConsolidadoRendaVariavel;
