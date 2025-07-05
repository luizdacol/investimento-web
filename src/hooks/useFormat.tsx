export const useFormat = () => {
  const formatPrice = (value: string): number => {
    return +value.replace(",", ".");
  };

  const formatPercent = (value: string): number => {
    if (value.includes("%")) {
      const number = +value.replace("%", "").replace(",", ".");
      return number / 100;
    }

    return +value.replace(",", ".");
  };

  return {
    formatPrice,
    formatPercent,
  };
};
