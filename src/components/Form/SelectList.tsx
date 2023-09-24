import { ChangeEvent } from "react";

type SelectListProps = {
  label: string;
  id: string;
  options: string[];
  value: string;
  handleOnChange: (event: ChangeEvent<HTMLSelectElement>) => void;
};

function SelectList({
  id,
  label,
  options,
  handleOnChange,
  value,
}: SelectListProps) {
  return (
    <div>
      <label htmlFor={id} className="text-sm text-gray-600">
        {label}
      </label>
      <select
        id={id}
        name={id}
        // onChange={(e) => setEmail(e.target.value)}
        className="text-sm placeholder-gray-500 px-4 rounded-lg border border-gray-200 w-full md:py-2 py-3 focus:outline-none focus:border-emerald-400 mt-1"
        onChange={handleOnChange}
        value={value}
      >
        {options.map((item) => (
          <option key={item} value={item.toLowerCase()}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectList;
