import { useState } from "react";

export const usePaginator = () => {
  const initialPaginatedObject = {
    content: [],
    metadata: { skip: 0, take: 0, totalRecords: 0 },
  };
  const [take, setTake] = useState<number>(50);
  const [skip, setSkip] = useState<number>(0);

  const onPageChange = (event: any) => {
    setSkip(event.first);
    setTake(event.rows);
  };

  return {
    initialPaginatedObject,
    take,
    setTake,
    skip,
    setSkip,
    onPageChange,
  };
};
