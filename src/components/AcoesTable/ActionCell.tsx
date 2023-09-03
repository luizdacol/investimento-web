import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faRemove } from "@fortawesome/free-solid-svg-icons";

type ActionProps = {
  id: string;
  updateAction: boolean;
  deleteAction: boolean;
};

function ActionCell({ id, updateAction, deleteAction }: ActionProps) {
  return (
    <>
      <td
        className={`border-b md:text-left block md:table-cell md:whitespace-nowrap text-slate-800 md:first:pl-4 md:last:pr-4 px-3 py-2 `}
      >
        {updateAction && (
          <Link
            to={`/auth/master/user/${id}/edit`}
            className={`text-sky-700 inline-flex py-2 px-2 rounded  text-sm`}
          >
            <FontAwesomeIcon icon={faPencil} />
          </Link>
        )}
        {deleteAction && (
          <Link
            // onClick={(e) => {
            //   e.preventDefault();
            //   handleDelete(row.id);
            // }}
            to={`/auth/master/user/${id}/edit`}
            className={`text-red-700 inline-flex py-2 px-2 rounded  text-sm`}
          >
            <FontAwesomeIcon icon={faRemove} />
          </Link>
        )}
      </td>
    </>
  );
}

export default ActionCell;
