import Table from "../Table/Table";
import { CarteiraRendaVariavel } from "../../interfaces/CarteiraRendaVariavel";
import LinhaRendaVariavel from "./LinhaRendaVariavel";
import { useStyles } from "../../hooks/useStyles";

type CarteiraProps = {
  title: string;
  carteira: CarteiraRendaVariavel[];
};

function ConsolidadoRendaVariavel(props: CarteiraProps) {
  const { rowDefaultStyle } = useStyles();
  const headers = [
    "Ticker",
    "Quantidade",
    "Preço Médio",
    "Preço Mercado",
    "Composição",
    "Composição Carteira",
    "Preço Médio Total",
    "Preço Mercado Total",
    "Variação",
    "Dividendos Recebidos",
    "Yield On Cost",
  ];

  const itemFooter = props.carteira.find((i) => i.ticker === "Total");

  return (
    <div className="mainCard">
      <div className="border w-full border-gray-200 bg-white py-2 px-4 rounded-md">
        <Table headers={headers} itemFooter={itemFooter} title={props.title}>
          {props.carteira
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
