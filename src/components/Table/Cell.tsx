import React from "react";
import { useStyles } from "../../hooks/useStyles";

export type CellProps<T> = {
  cellValue: T;
  dataLabel: string;
  className?: string;
  showLabel?: boolean;
  options?: any;
};

function Cell({ cellValue, dataLabel, className }: CellProps<string>) {
  const { cellDefaultStyle } = useStyles();

  return (
    <>
      <td data-label={dataLabel} className={cellDefaultStyle}>
        <span className="font-medium text-xs text-gray-900">{cellValue}</span>
      </td>
    </>
  );
}

export default Cell;
