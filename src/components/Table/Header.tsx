type HeaderProps = {
  headers: string[];
  title: string;
};

function Header({ headers, title }: HeaderProps) {
  return (
    <>
      <caption className="text-black bg-green-600 font-semibold py-1.5 ">
        {title}
      </caption>
      <thead className="hidden bg-green-200 md:table-header-group text-black">
        <tr className="block md:table-row">
          {headers.map((column) => (
            <th
              scope="col"
              key={column}
              className={`py-1.5 px-3 text-center block md:table-cell font-semibold text-sm  `}
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
