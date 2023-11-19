import React from "react";
import { CellProps } from "./Cell";
import { useStyles } from "../../hooks/useStyles";

function PriceCell({
  cellValue,
  dataLabel,
  className,
  showLabel = true,
}: CellProps<number>) {
  const { cellDefaultStyle } = useStyles();

  return (
    <>
      <td data-label={dataLabel} className={cellDefaultStyle}>
        <span
          className="font-medium text-xs text-gray-900"
          title={cellValue.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
            minimumFractionDigits: 2,
            maximumFractionDigits: 8,
          })}
        >
          {cellValue.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>
      </td>
    </>
  );
}

export default PriceCell;
