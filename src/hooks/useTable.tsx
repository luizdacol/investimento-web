import { faPencil, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";

export const useTable = () => {
  const formatDateCell = (data: Date) => {
    const isDataFutura = data > new Date();
    const negrito = isDataFutura ? "font-bold" : "font-medium";
    return (
      <span className={negrito}>
        {data.toLocaleDateString("pt-BR", { timeZone: "UTC" })}
      </span>
    );
  };

  const formatPriceCell = (price: number, title?: string) => {
    const defineCurrencyOptions = (
      maximumFractionDigits: number = 2
    ): Intl.NumberFormatOptions => {
      return {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
        maximumFractionDigits,
      };
    };

    title ??= price.toLocaleString("pt-BR", defineCurrencyOptions(8));
    return (
      <span title={title}>
        {price.toLocaleString("pt-BR", defineCurrencyOptions())}
      </span>
    );
  };

  const formatActionCell = (
    itemId: number,
    handleDelete: (id: number) => Promise<void>,
    handleUpdate: (id: number) => Promise<void>
  ) => {
    return (
      <>
        <span
          className="text-sky-700 inline-flex py-1 px-2 rounded text-sm cursor-pointer"
          onClick={(e) => {
            handleUpdate(itemId);
          }}
        >
          <FontAwesomeIcon icon={faPencil} />
        </span>
        <span
          className="text-red-700 inline-flex py-1 px-2 rounded text-sm cursor-pointer"
          onClick={(e) => {
            handleDelete(itemId);
          }}
        >
          <FontAwesomeIcon icon={faTrash} />
        </span>
      </>
    );
  };

  const formatHeader = (title: string, linkToAddItem: string = "") => {
    return (
      <div className="flex flex-wrap gap-2 ">
        <span className="text-xl text-900 font-bold text-center flex-1">
          {title}
        </span>
        {linkToAddItem && (
          <Link to={linkToAddItem}>
            <Button
              icon={<FontAwesomeIcon icon={faPlus} />}
              rounded
              raised
              size="large"
              className="bg-emerald-500 border-emerald-500"
            />
          </Link>
        )}
      </div>
    );
  };

  return {
    formatHeader,
    formatDateCell,
    formatPriceCell,
    formatActionCell,
  };
};
