import { ChangeEvent } from "react";

type InputDateProps = {
  label: string;
  id: string;
  value: string;
  handleOnChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

function InputDate({ id, label, value, handleOnChange }: InputDateProps) {
  return (
    <div>
      <label htmlFor={id} className="text-sm text-gray-600">
        {label}
      </label>
      <input
        id={id}
        type="date"
        name={id}
        value={value}
        className="text-sm placeholder-gray-500 px-4 rounded-lg border border-gray-200 w-full md:py-2 py-3 focus:outline-none focus:border-emerald-400 mt-1"
        onChange={handleOnChange}
      />
    </div>
  );
}

export default InputDate;
