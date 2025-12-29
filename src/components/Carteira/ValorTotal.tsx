import { useEffect, useState } from "react";
import { CarteiraService } from "../../services/CarteiraService";
import { TotalCarteira } from "../../interfaces/Carteira/TotalCarteira";
import { useTable } from "../../hooks/useTable";

function ValorTotal() {
  const { formatPriceCell } = useTable();

  const [totalCarteira, setTotalCarteira] = useState<TotalCarteira>({
    totalAtual: 0,
    totalAportado: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await CarteiraService.getTotalCarteira();
      setTotalCarteira(data);
    };

    fetchData();
  }, []);

  return (
    <div className="border w-1/4 h-[10rem] border-gray-200 bg-white py-2 px-4 rounded-md flex flex-col justify-center">
      <span className="text-sm">Total Atual: </span>
      <span className="text-[52px]">
        {formatPriceCell(totalCarteira.totalAtual)}
      </span>
      <span className="text-sm">
        Total aportado: {formatPriceCell(totalCarteira.totalAportado)}
      </span>
    </div>
  );
}

export default ValorTotal;
