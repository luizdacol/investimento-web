import { useEffect, useState } from "react";
import Cell from "../Table/Cell";
import Table from "../Table/Table";
import PriceCell from "../Table/PriceCell";
import { CarteiraService } from "../../services/CarteiraService";
import { CarteiraRendaFixa } from "../../interfaces/CarteiraRendaFixa";

type CarteiraProps = {
  title: string;
  tipo: string;
};

function ConsolidadoRendaFixa(props: CarteiraProps) {
  const headers = [
    "Titulo",
    "Quantidade",
    "Preço Médio",
    "Preço Mercado",
    "Composição",
    "Preço Médio Total",
    "Preço Mercado Total",
    "Variação",
  ];

  const [carteira, setCarteira] = useState<CarteiraRendaFixa[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await CarteiraService.getRendaFixa(props.tipo);
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
            </tr>
          ))}
        </Table>
      </div>
    </div>
  );
}

export default ConsolidadoRendaFixa;
