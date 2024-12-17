import Table from "../Table/Table";
import { CarteiraRendaFixa } from "../../interfaces/CarteiraRendaFixa";
import LinhaRendaFixa from "./LinhaRendaFixa";
import { useStyles } from "../../hooks/useStyles";
import { useSort } from "../../hooks/useSort";
import { useEffect, useState } from "react";

type CarteiraProps = {
  title: string;
  initialCarteira: CarteiraRendaFixa[];
};

function ConsolidadoRendaFixa({ initialCarteira, title }: CarteiraProps) {
  const { rowDefaultStyle } = useStyles();
  const { sort } = useSort();

  const [carteira, setCarteira] = useState<CarteiraRendaFixa[]>([]);

  useEffect(() => {
    setCarteira(
      initialCarteira.filter((c) => c.tipoAtivo === title.replaceAll(" ", ""))
    );
  }, [initialCarteira]);

  const headers = [
    { key: "titulo", label: "Titulo" },
    { key: "quantidade", label: "Quantidade" },
    { key: "precoMedio", label: "Preço Médio" },
    { key: "precoMercado", label: "Preço Mercado" },
    { key: "composicao", label: "Composição" },
    { key: "composicaoTotal", label: "Composição Carteira" },
    { key: "precoMedioTotal", label: "Preço Médio Total" },
    { key: "precoMercadoTotal", label: "Preço Mercado Total" },
    { key: "variacao", label: "Variação" },
  ];

  const itemFooter = carteira.find((i) => i.titulo === "Total");

  const handleSort = (property: string, order: string) => {
    const keyProperty = property as keyof CarteiraRendaFixa;
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
            .filter((i) => i.titulo !== "Total")
            .map((item, index) => (
              <LinhaRendaFixa
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

export default ConsolidadoRendaFixa;
