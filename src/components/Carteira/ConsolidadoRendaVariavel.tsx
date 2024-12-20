import Table from "../Table/Table";
import { CarteiraRendaVariavel } from "../../interfaces/CarteiraRendaVariavel";
import LinhaRendaVariavel from "./LinhaRendaVariavel";
import { useStyles } from "../../hooks/useStyles";
import { useSort } from "../../hooks/useSort";
import { useEffect, useState } from "react";

type CarteiraProps = {
  title: string;
  initialCarteira: CarteiraRendaVariavel[];
};

function ConsolidadoRendaVariavel({ initialCarteira, title }: CarteiraProps) {
  const { rowDefaultStyle } = useStyles();
  const { sort } = useSort();

  const [carteira, setCarteira] = useState<CarteiraRendaVariavel[]>([]);

  useEffect(() => {
    setCarteira(
      initialCarteira.filter((c) => c.tipoAtivo === title.replaceAll(" ", ""))
    );
  }, [initialCarteira]);

  const headers = [
    { key: "ticker", label: "Ticker" },
    { key: "quantidade", label: "Quantidade" },
    { key: "precoMedio", label: "Preço Médio" },
    { key: "precoMercado", label: "Preço Mercado" },
    { key: "composicao", label: "Composição" },
    { key: "composicaoTotal", label: "Composição Carteira" },
    { key: "precoMedioTotal", label: "Preço Médio Total" },
    { key: "precoMercadoTotal", label: "Preço Mercado Total" },
    { key: "variacao", label: "Variação" },
    { key: "dividendosRecebidos", label: "Dividendos Recebidos" },
    { key: "yieldOnCost", label: "Yield On Cost" },
  ];

  const itemFooter = carteira.find((i) => i.ticker === "Total");

  const handleSort = (property: string, order: string) => {
    const keyProperty = property as keyof CarteiraRendaVariavel;
    const sortedCarteira = sort(carteira, keyProperty, order);

    setCarteira(sortedCarteira);
  };

  if (carteira.length === 0) return null;

  return (
    <div className="mainCard">
      <div className="border w-full border-gray-200 bg-white py-2 px-4 rounded-md">
        <Table
          headers={headers}
          itemFooter={itemFooter}
          title={title}
          handleSort={handleSort}
        >
          {carteira
            .filter((i) => i.ticker !== "Total")
            .map((item, index) => (
              <LinhaRendaVariavel
                key={index}
                item={item}
                rowClass={rowDefaultStyle}
              />
            ))}
        </Table>
      </div>
    </div>
  );
}

export default ConsolidadoRendaVariavel;
