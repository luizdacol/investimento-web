export const useSort = () => {
  const sort = <T,>(
    arrayToSort: T[],
    property: keyof T,
    order: string
  ): T[] => {
    const sortedOperation = Array.from(arrayToSort);
    const firstItem = sortedOperation[0];

    if (typeof firstItem[property] === "string") {
      sortedOperation.sort((a, b) => {
        const firstElement = order === "ASC" ? a[property] : b[property];
        const secondElement = order === "ASC" ? b[property] : a[property];

        return sortString(firstElement as string, secondElement as string);
      });
    } else if (typeof firstItem[property] === "number") {
      sortedOperation.sort((a, b) => {
        const firstElement = order === "ASC" ? a[property] : b[property];
        const secondElement = order === "ASC" ? b[property] : a[property];

        return sortNumber(firstElement as number, secondElement as number);
      });
    } else if (
      typeof firstItem[property] === "object" &&
      firstItem[property] instanceof Date
    ) {
      sortedOperation.sort((a, b) => {
        const firstElement = order === "ASC" ? a[property] : b[property];
        const secondElement = order === "ASC" ? b[property] : a[property];

        return sortDate(firstElement as Date, secondElement as Date);
      });
    } else {
      console.error("tipo não suportado para ordenação");
    }

    return sortedOperation;
  };

  const sortString = (firstElement: string, secondElement: string): number =>
    firstElement.localeCompare(secondElement);

  const sortNumber = (firstElement: number, secondElement: number): number =>
    firstElement - secondElement;

  const sortDate = (firstElement: Date, secondElement: Date): number =>
    firstElement.getTime() - secondElement.getTime();

  return {
    sort,
  };
};
