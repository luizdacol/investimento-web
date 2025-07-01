import {
  DataTableFilterMetaData,
  DataTableSortMeta,
  DataTableStateEvent,
} from "primereact/datatable";
import { useState } from "react";

export const useFilterAndSort = (columns: any[]) => {
  const mapBackField = (field: string) => {
    const column = columns.find((c) => c["field"] === field);
    return column && "backField" in column ? column["backField"] : field;
  };

  const [dataTableSortMeta, setDataTableSortMeta] = useState<
    DataTableSortMeta[]
  >([]);
  const [sortBy, setSortBy] = useState<string[]>([]);
  const [filterBy, setFilterBy] = useState<string[]>([]);

  const handleSort = (evento: DataTableStateEvent) => {
    const stateEvent = evento.multiSortMeta ?? [];
    const sortByParsed = stateEvent.map((s) => {
      return `${mapBackField(s.field)}|${s.order === 1 ? "ASC" : "DESC"}`;
    });

    setSortBy(sortByParsed);
    setDataTableSortMeta(stateEvent);
  };

  const parseDateValues = (values: any[]) => {
    const dates = values.map((v) => new Date(v));
    if (dates.every((d) => isNaN(d.getTime()))) return values;

    return dates.map((d) => {
      if (isNaN(d.getTime())) return "";

      return d.toLocaleDateString("en-CA", { timeZone: "UTC" });
    });
  };

  const handleFilter = (evento: DataTableStateEvent) => {
    const filters = Object.keys(evento.filters).map((field) => {
      const filter = evento.filters[field] as DataTableFilterMetaData;
      const value = (filter.value as string[]) ?? [];

      if (value.length === 0) return "";

      const parsedValues = parseDateValues(value);

      return `${mapBackField(field)}|${filter.matchMode}|${parsedValues.join(
        ","
      )}`;
    });

    setFilterBy(filters.filter((f) => !!f));
  };

  return {
    handleSort,
    sortBy,
    dataTableSortMeta,
    handleFilter,
    filterBy,
  };
};
