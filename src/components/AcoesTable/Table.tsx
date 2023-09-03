import { Acao } from "../../pages/Acoes";
import ActionCell from "./ActionCell";
import Cell from "./Cell";
import DateCell from "./DateCell";
import Header from "./Header";
import PriceCell from "./PriceCell";

type tableProps = {
  acoes: Acao[];
};

function Table({ acoes }: tableProps) {
  const headers = Object.keys(acoes[0]).concat("ações");

  return (
    <div className="overflow-x-auto">
      <table
        className={`block md:table w-full text-sm text-left text-gray-500`}
      >
        <Header headers={headers}></Header>
        <tbody className="block md:table-row-group">
          {acoes.map((acao, index) => (
            <tr
              key={index}
              className="bg-white border md:border-b block md:table-row rounded-md shadow-md md:rounded-none md:shadow-none mb-5"
            >
              <DateCell cellValue={acao.data} dataLabel="Data" />
              <Cell cellValue={acao.ticker} dataLabel="Ticker" />
              <PriceCell
                cellValue={acao.precoUnitario}
                dataLabel="PrecoUnitario"
              />
              <Cell
                cellValue={acao.quantidade.toString()}
                dataLabel="Quantidade"
              />
              <PriceCell cellValue={acao.precoTotal} dataLabel="PrecoTotal" />
              <Cell cellValue={acao.operacao} dataLabel="Operacao" />
              <Cell cellValue={acao.tipo} dataLabel="Tipo" />
              <ActionCell
                id="1"
                updateAction={true}
                deleteAction={true}
              ></ActionCell>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
