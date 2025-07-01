import { MultiSelect } from "primereact/multiselect";

function TickerFilterTemplate({
  options,
  tickers,
}: {
  options: any;
  tickers: string[];
}) {
  return (
    <MultiSelect
      value={options.value}
      options={tickers}
      onChange={(e) => options.filterCallback(e.value)}
      placeholder="Selecione o ativo"
      className="p-column-filter text-xs"
      itemClassName="text-xs"
    />
  );
}

export default TickerFilterTemplate;
