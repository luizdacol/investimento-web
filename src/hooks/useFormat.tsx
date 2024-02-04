export const useFormat = () => {
  const formatPrice = (value: string): number => {
    return +value.replace(",", ".");
  };

  return {
    formatPrice,
  };
};
