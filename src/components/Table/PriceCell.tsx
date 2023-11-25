import React from "react";
import { CellProps } from "./Cell";
import { useStyles } from "../../hooks/useStyles";

function PriceCell({
  cellValue,
  dataLabel,
  title,
  showLabel = true,
}: CellProps<number>) {
  const { cellDefaultStyle } = useStyles();
  const finalTitle =
    title ??
    cellValue.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 8,
    });

  return (
    <>
      <td data-label={dataLabel} className={cellDefaultStyle}>
        <span className="font-medium text-xs text-gray-900" title={finalTitle}>
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
