export const useStyles = () => {
  const cellDefaultStyle =
    "border-b md:text-center block md:table-cell md:whitespace-nowrap text-slate-800 md:first:pl-4 md:last:pr-4 px-3 py-1";

  const rowDefaultStyle =
    "border md:border-b block md:table-row rounded-md shadow-md md:rounded-none md:shadow-none mb-5 odd:bg-emerald-50 even:bg-white";

  return {
    cellDefaultStyle,
    rowDefaultStyle,
  };
};
