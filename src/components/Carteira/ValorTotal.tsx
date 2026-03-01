import { useEffect, useState } from "react";
import { CarteiraService } from "../../services/CarteiraService";
import { Patrimonio } from "../../interfaces/Carteira/Patrimonio";
import { useTable } from "../../hooks/useTable";

function ValorTotal() {
  const { formatPriceCell } = useTable();

  const [patrimonio, setPatrimonio] = useState<Patrimonio>({
    patrimonioTotal: 0,
    valorEmReais: 0,
    valorEmDolar: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await CarteiraService.getPatrimonio();
      setPatrimonio(data);
    };

    fetchData();
  }, []);

  return (
    <div className="border w-1/4 h-[10rem] border-gray-200 bg-white py-2 px-4 rounded-md flex flex-col justify-center">
      <span className="text-xs font-bold">Patrimonio Total:</span>
      <span className="text-[52px]">
        {formatPriceCell(patrimonio.patrimonioTotal)}
      </span>
      <span className="text-xs font-bold">
        ({formatPriceCell(patrimonio.valorEmReais)} +
        {formatPriceCell(patrimonio.valorEmDolar, undefined, undefined, "USD")})
      </span>
    </div>
  );
}

export default ValorTotal;
