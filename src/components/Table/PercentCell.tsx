import React from "react";
import { CellProps } from "./Cell";
import { useStyles } from "../../hooks/useStyles";

function PercentCell({
  cellValue,
  dataLabel,
  className,
  showLabel = true,
  options,
}: CellProps<number>) {
  const { cellDefaultStyle } = useStyles();
  let textColor = "text-gray-900";
  if (options && !!options.enableTextColor) {
    textColor = cellValue >= 0 ? "text-green-600" : "text-red-600";
  }

  return (
    <>
      <td data-label={dataLabel} className={cellDefaultStyle}>
        <span className={`font-medium text-xs ${textColor}`}>{cellValue}%</span>
      </td>
    </>
  );
}

export default PercentCell;
