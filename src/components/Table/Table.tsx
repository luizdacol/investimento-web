import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "./Header";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { ReactNode } from "react";

type TableProps = {
  headers: string[];
  children: ReactNode;
  newItemRedirect: string;
};

function Table(props: TableProps) {
  return (
    <div className="overflow-x-auto space-y-2">
      <div className="flex flex-row-reverse">
        <Link
          to={props.newItemRedirect}
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
          <Header headers={props.headers}></Header>
          <tbody className="block md:table-row-group">{props.children}</tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;