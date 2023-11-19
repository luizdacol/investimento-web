import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faRemove } from "@fortawesome/free-solid-svg-icons";
import { useStyles } from "../../hooks/useStyles";

type ActionProps = {
  id: number;
  handleDelete: (id: number) => Promise<void>;
  handleUpdate: (id: number) => Promise<void>;
};

function ActionCell({ id, handleUpdate, handleDelete }: ActionProps) {
  const { cellDefaultStyle } = useStyles();

  return (
    <>
      <td className={cellDefaultStyle}>
        {
          <span
            className={`text-sky-700 inline-flex py-1 px-2 rounded text-sm cursor-pointer`}
            onClick={(e) => {
              handleUpdate(id);
            }}
          >
            <FontAwesomeIcon icon={faPencil} />
          </span>
        }
        {
          <span
            className={`text-red-700 inline-flex py-1 px-2 rounded text-sm cursor-pointer`}
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
