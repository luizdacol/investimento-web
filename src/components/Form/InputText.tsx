type InputTextProps = {
  label: string;
  placeholder?: string;
  id: string;
};

function InputText({ id, label, placeholder }: InputTextProps) {
  return (
    <div>
      <label htmlFor={id} className="text-sm text-gray-600">
        {label}
      </label>
      <input
        id={id}
        type="text"
        name={id}
        // onChange={(e) => setEmail(e.target.value)}
        className="text-sm placeholder-gray-500 px-4 rounded-lg border border-gray-200 w-full md:py-2 py-3 focus:outline-none focus:border-emerald-400 mt-1"
        placeholder={placeholder}
      />
    </div>
  );
}

export default InputText;
