import { useEffect, useState } from "react";

type SortActionProps = {
  sortKey: string;
  handleSort: (property: string, order: string) => void;
  cleanChoosenSortKey: (choosenSortKey: string) => void;
  choosenSortKey: string;
};

function SortAction({
  sortKey,
  handleSort,
  cleanChoosenSortKey,
  choosenSortKey,
}: SortActionProps) {
  const enableStyle = "text-black text-lg";
  const disableStyle = "text-gray-400";

  enum sortState {
    NONE = 0,
    ASC = 1,
    DESC = 2,
  }

  const [selectedSort, setSort] = useState<sortState>(sortState.NONE);
  const toogleSort = () => {
    const newState =
      selectedSort === sortState.DESC ? sortState.NONE : selectedSort + 1;
    setSort(newState);

    cleanChoosenSortKey(sortKey);
    handleSort(sortKey, sortState[newState]);
  };

  useEffect(() => {
    if (sortKey !== choosenSortKey) setSort(sortState.NONE);
  }, [choosenSortKey, sortKey]);

  return (
    <>
      <span
        className={`absolute right-0 cursor-pointer ${
          selectedSort !== sortState.NONE && "top-0"
        }`}
        onClick={toogleSort}
      >
        <span
          className={
            selectedSort === sortState.ASC ? enableStyle : disableStyle
          }
        >
          &#8593;
        </span>
        <span
          className={
            selectedSort === sortState.DESC ? enableStyle : disableStyle
          }
        >
          &#8595;
        </span>
      </span>
    </>
  );
}

export default SortAction;
