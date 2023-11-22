import Table from "../Table/Table";
import { CarteiraRendaFixa } from "../../interfaces/CarteiraRendaFixa";
import LinhaRendaFixa from "./LinhaRendaFixa";
import { useStyles } from "../../hooks/useStyles";

type CarteiraProps = {
  title: string;
  carteira: CarteiraRendaFixa[];
};

function ConsolidadoRendaFixa(props: CarteiraProps) {
  const { rowDefaultStyle } = useStyles();
  const headers = [
    "Titulo",
    "Quantidade",
    "Preço Médio",
    "Preço Mercado",
    "Composição",
    "Composição Carteira",
    "Preço Médio Total",
    "Preço Mercado Total",
    "Variação",
  ];

  const itemFooter = props.carteira.find((i) => i.titulo === "Total");

  return (
    <div className="mainCard">
      <div className="border w-full border-gray-200 bg-white py-2 px-4 rounded-md">
        <Table headers={headers} itemFooter={itemFooter} title={props.title}>
          {props.carteira
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
