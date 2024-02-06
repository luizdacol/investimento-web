import SortAction from "./SortAction";

type HeaderProps = {
  headers?: { key?: string; label: string }[];
  title: string;
  handleSort?: (property: string, order: string) => void;
};

function Header({ headers, title, handleSort }: HeaderProps) {
  return (
    <>
      <caption className="text-black bg-green-600 font-semibold py-1.5 ">
        {title}
      </caption>
      <thead className="hidden bg-green-200 md:table-header-group text-black">
        <tr className="block md:table-row">
          {headers?.map((header) => (
            <th
              scope="col"
              key={header.label}
              className={`py-1.5 px-3 text-center block md:table-cell font-semibold text-sm relative`}
            >
              <span>{header.label}</span>
              {header.key && (
                <SortAction handleSort={handleSort} sortKey={header.key} />
              )}
            </th>
          ))}
        </tr>
      </thead>
    </>
  );
}

export default Header;
