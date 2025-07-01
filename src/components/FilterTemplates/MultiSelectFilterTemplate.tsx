import { MultiSelect } from "primereact/multiselect";

function MultiSelectFilterTemplate({
  options,
  items,
  placeholder,
}: {
  options: any;
  items: string[];
  placeholder: string;
}) {
  return (
    <MultiSelect
      value={options.value}
      options={items}
      onChange={(e) => options.filterCallback(e.value)}
      placeholder={placeholder}
      className="p-column-filter text-xs"
      itemClassName="text-xs"
    />
  );
}

export default MultiSelectFilterTemplate;
