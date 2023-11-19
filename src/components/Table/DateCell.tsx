import React from "react";
import { CellProps } from "./Cell";
import { useStyles } from "../../hooks/useStyles";

function DateCell({
  cellValue,
  dataLabel,
  className,
  showLabel = true,
}: CellProps<Date>) {
  const { cellDefaultStyle } = useStyles();

  const isDataFutura = cellValue > new Date();
  const negrito = isDataFutura ? "font-bold" : "font-medium";

  return (
    <>
      <td data-label={dataLabel} className={cellDefaultStyle}>
        <span className={`text-xs text-gray-900 ` + negrito}>
          {cellValue.toLocaleDateString("pt-BR", { timeZone: "UTC" })}
        </span>
      </td>
    </>
  );
}

export default DateCell;
