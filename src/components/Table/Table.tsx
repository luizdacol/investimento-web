import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "./Header";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { ReactNode } from "react";
import Footer from "./Footer";
import { CarteiraRendaFixa } from "../../interfaces/CarteiraRendaFixa";
import { CarteiraRendaVariavel } from "../../interfaces/CarteiraRendaVariavel";

type TableProps = {
  headers: { key?: string; label: string }[];
  itemFooter?: CarteiraRendaFixa | CarteiraRendaVariavel;
  title: string;
  children: ReactNode;
  newItemRedirect?: string;
  handleSort?: (property: string, order: string) => void;
};

function Table({
  headers,
  itemFooter,
  title,
  children,
  newItemRedirect,
  handleSort,
}: TableProps) {
  return (
    <div className="overflow-x-auto space-y-2">
      <div className="flex flex-row-reverse">
        {newItemRedirect && (
          <Link
            to={newItemRedirect}
            className="bg-green-600 text-black px-3 py-2 rounded-lg shadow-lg text-sm flex gap-2 items-center"
          >
            <div>
              <FontAwesomeIcon icon={faPlus} />
            </div>
            <span>Novo Item</span>
          </Link>
        )}
      </div>
      <div>
        <table
          className={`block md:table w-full text-sm text-left text-gray-500`}
        >
          <Header
            headers={headers}
            title={title}
            handleSort={handleSort}
          ></Header>
          <tbody className="block md:table-row-group">{children}</tbody>
          {itemFooter && <Footer item={itemFooter} />}
        </table>
      </div>
    </div>
  );
}

export default Table;
