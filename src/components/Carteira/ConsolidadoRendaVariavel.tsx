import Cell from "../Table/Cell";
import Table from "../Table/Table";
import { CarteiraRendaVariavel } from "../../interfaces/CarteiraRendaVariavel";
import PriceCell from "../Table/PriceCell";
import PercentCell from "../Table/PercentCell";

type CarteiraProps = {
  title: string;
  carteira: CarteiraRendaVariavel[];
};

function ConsolidadoRendaVariavel(props: CarteiraProps) {
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

  return (
    <div className="mainCard">
      <div className="border w-full border-gray-200 bg-white py-4 px-6 rounded-md">
        <Table headers={headers} title={props.title}>
          {props.carteira.map((item, index) => (
            <tr
              key={index}
              className="bg-white border md:border-b block md:table-row rounded-md shadow-md md:rounded-none md:shadow-none mb-5"
            >
              <Cell cellValue={item.ticker} dataLabel="Ticker" />
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
              <PriceCell
                cellValue={item.dividendosRecebidos}
                dataLabel="DividendosRecebidos"
              />
              <PercentCell
                cellValue={item.yieldOnCost}
                dataLabel="YieldOnCost"
                options={{ enableTextColor: true }}
              />
            </tr>
          ))}
        </Table>
      </div>
    </div>
  );
}

export default ConsolidadoRendaVariavel;
