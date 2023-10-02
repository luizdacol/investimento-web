type HeaderProps = {
  headers: string[];
  title: string;
};

function Header(props: HeaderProps) {
  return (
    <>
      <caption className="text-gray-600 bg-gray-400 font-semibold py-1.5 ">
        {props.title}
      </caption>
      <thead className="hidden bg-slate-200 md:table-header-group text-gray-600">
        <tr className="block md:table-row">
          {props.headers.map((column) => (
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
