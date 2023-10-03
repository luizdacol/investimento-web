import { useEffect, useState } from "react";
import Cell from "../Table/Cell";
import Table from "../Table/Table";
import { CarteiraRendaVariavel } from "../../interfaces/CarteiraRendaVariavel";
import PriceCell from "../Table/PriceCell";
import { CarteiraService } from "../../services/CarteiraService";

type CarteiraProps = {
  title: string;
  tipo: string;
};

function ConsolidadoRendaVariavel(props: CarteiraProps) {
  const headers = [
    "Ticker",
    "Quantidade",
    "Preço Médio",
    "Preço Mercado",
    "Composição",
    "Preço Médio Total",
    "Preço Mercado Total",
    "Variação",
    "Dividendos Recebidos",
    "Yield On Cost",
    "Dividendos Provisionados",
  ];

  const [carteira, setCarteira] = useState<CarteiraRendaVariavel[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await CarteiraService.getRendaVariavel(props.tipo);
      setCarteira(data);
    };

    fetchData();
  }, []);

  return (
    <div className="mainCard">
      <div className="border w-full border-gray-200 bg-white py-4 px-6 rounded-md">
        <Table headers={headers} title={props.title}>
          {carteira.map((item, index) => (
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
              <Cell
                cellValue={item.composicao.toString()}
                dataLabel="Composicao"
              />
              <PriceCell
                cellValue={item.precoMedioTotal}
                dataLabel="PreçoMedioTotal"
              />
              <PriceCell
                cellValue={item.precoMercadoTotal}
                dataLabel="PreçoMercadoTotal"
              />
              <Cell cellValue={item.variacao.toString()} dataLabel="Variacao" />
              <PriceCell
                cellValue={item.dividendosRecebidos}
                dataLabel="DividendosRecebidos"
              />
              <Cell
                cellValue={item.yieldOnCost.toString()}
                dataLabel="YieldOnCost"
              />
              <PriceCell
                cellValue={item.dividendosProvisionados}
                dataLabel="DividendosProvisionados"
              />
            </tr>
          ))}
        </Table>
      </div>
    </div>
  );
}

export default ConsolidadoRendaVariavel;
