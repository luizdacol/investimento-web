import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faRemove } from "@fortawesome/free-solid-svg-icons";

type ActionProps = {
  id: number;
  handleDelete: (id: number) => Promise<void>;
  handleUpdate: (id: number) => Promise<void>;
};

function ActionCell({ id, handleUpdate, handleDelete }: ActionProps) {
  return (
    <>
      <td
        className={`border-b md:text-left block md:table-cell md:whitespace-nowrap text-slate-800 md:first:pl-4 md:last:pr-4 px-3 py-2 `}
      >
        {
          <span
            className={`text-sky-700 inline-flex py-2 px-2 rounded text-sm cursor-pointer`}
            onClick={(e) => {
              handleUpdate(id);
            }}
          >
            <FontAwesomeIcon icon={faPencil} />
          </span>
        }
        {
          <span
            className={`text-red-700 inline-flex py-2 px-2 rounded text-sm cursor-pointer`}
            onClick={(e) => {
              handleDelete(id);
            }}
          >
            <FontAwesomeIcon icon={faRemove} />
          </span>
        }
      </td>
    </>
  );
}

export default ActionCell;
