type headerProps = {
  headers: string[];
};

function Header({ headers }: headerProps) {
  return (
    <>
      <thead className="hidden bg-slate-100 md:table-header-group text-gray-600">
        <tr className="block md:table-row">
          {headers.map((column) => (
            <th
              scope="col"
              key={column}
              className={`py-3 px-4 block md:table-cell font-semibold text-xs uppercase  `}
            >
              <span>{column}</span>
            </th>
          ))}
        </tr>
      </thead>
    </>
  );
}

export default Header;
