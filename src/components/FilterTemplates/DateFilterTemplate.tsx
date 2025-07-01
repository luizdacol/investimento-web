import { InputMask } from "primereact/inputmask";

function DateFilterItem({
  id,
  value,
  handleOnBlur,
}: {
  id: string;
  value: string;
  handleOnBlur: (e: any) => void;
}) {
  return (
    <InputMask
      value={value}
      id={id}
      className="text-sm"
      placeholder="dd/mm/yyyy"
      mask="99/99/9999"
      size={1}
      onBlur={handleOnBlur}
    />
  );
}

function DateFilterTemplate(options: any) {
  return (
    <div className="text-sm">
      <label htmlFor="startDate">De:</label>
      <DateFilterItem
        id="startDate"
        value={options.value
          ?.at(0)
          ?.toLocaleDateString("pt-BR", { timeZone: "UTC" })}
        handleOnBlur={(e) => {
          const [dia, mes, ano] = e.target.value?.split("/");
          const data = `${ano}-${mes}-${dia}`;

          options.filterCallback(
            [new Date(data), options.value?.at(1)],
            options.index
          );
        }}
      />

      <label htmlFor="endDate">Até:</label>
      <DateFilterItem
        id="endDate"
        value={options.value
          ?.at(1)
          ?.toLocaleDateString("pt-BR", { timeZone: "UTC" })}
        handleOnBlur={(e) => {
          const [dia, mes, ano] = e.target.value?.split("/");
          const data = `${ano}-${mes}-${dia}`;

          options.filterCallback(
            [options.value?.at(0), new Date(data)],
            options.index
          );
        }}
      />
    </div>
  );
}

export default DateFilterTemplate;
