import Cell from "../Table/Cell";
import Table from "../Table/Table";
import PriceCell from "../Table/PriceCell";
import { CarteiraRendaFixa } from "../../interfaces/CarteiraRendaFixa";
import PercentCell from "../Table/PercentCell";
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

  return (
    <div className="mainCard">
      <div className="border w-full border-gray-200 bg-white py-2 px-4 rounded-md">
        <Table headers={headers} title={props.title}>
          {props.carteira.map((item, index) => (
            <tr key={index} className={rowDefaultStyle}>
              <Cell cellValue={item.titulo} dataLabel="Titulo" />
              <Cell
                cellValue={item.quantidade.toString()}
                dataLabel="Quantidade"
              />
              <PriceCell cellValue={item.precoMedio} dataLabel="PreçoMedio" />
              <PriceCell
                cellValue={item.precoMercado}
                dataLabel="PreçoMercado"
              />
              <PercentCell cellValue={item.composicao} dataLabel="Composicao" />
              <PercentCell
                cellValue={item.composicaoTotal}
                dataLabel="ComposicaoCarteira"
              />
              <PriceCell
                cellValue={item.precoMedioTotal}
                dataLabel="PreçoMedioTotal"
              />
              <PriceCell
                cellValue={item.precoMercadoTotal}
                dataLabel="PreçoMercadoTotal"
              />
              <PercentCell
                cellValue={item.variacao}
                dataLabel="Variacao"
                options={{ enableTextColor: true }}
              />
            </tr>
          ))}
        </Table>
      </div>
    </div>
  );
}

export default ConsolidadoRendaFixa;
