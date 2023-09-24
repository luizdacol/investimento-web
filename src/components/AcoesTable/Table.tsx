import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Acao } from "../../pages/Acoes";
import ActionCell from "./ActionCell";
import Cell from "./Cell";
import DateCell from "./DateCell";
import Header from "./Header";
import PriceCell from "./PriceCell";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

type tableProps = {
  acoes: Acao[];
};

function Table({ acoes }: tableProps) {
  const headers = [
    "Data",
    "Ticker",
    "Preço Unitario",
    "Quantidade",
    "Preço Total",
    "Tipo de Operação",
    "Tipo de Ativo",
    "Ações",
  ];

  return (
    <div className="overflow-x-auto space-y-2">
      <div className="flex flex-row-reverse">
        <Link
          to={"/form-acoes"}
          className="bg-emerald-600 text-gray-100 px-3 py-2 rounded-lg shadow-lg text-sm flex gap-2 items-center"
        >
          <div>
            <FontAwesomeIcon icon={faPlus} />
          </div>
          <span>Novo Item</span>
        </Link>
      </div>
      <div>
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
    </div>
  );
}

export default Table;
