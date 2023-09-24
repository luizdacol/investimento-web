import React from "react";
import { CellProps } from "./Cell";

function DateCell({
  cellValue,
  dataLabel,
  className,
  showLabel = true,
}: CellProps<Date>) {
  return (
    <>
      <td
        data-label={dataLabel}
        className={
          `${
            showLabel &&
            "before:float-left before:text-sm before:font-bold before:content-[attr(data-label)] before:md:content-none text-right"
          } border-b md:text-left block md:table-cell md:whitespace-nowrap text-slate-800 md:first:pl-4 md:last:pr-4 px-3 py-2 ` +
          className
        }
      >
        <span className="font-medium text-sm text-gray-900">
          {cellValue.toLocaleDateString("pt-BR", { timeZone: "UTC" })}
        </span>
      </td>
    </>
  );
}

export default DateCell;
