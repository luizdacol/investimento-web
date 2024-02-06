import { useEffect, useState } from "react";
import ConsolidadoRendaFixa from "../components/Carteira/ConsolidadoRendaFixa";
import ConsolidadoRendaVariavel from "../components/Carteira/ConsolidadoRendaVariavel";
import { CarteiraService } from "../services/CarteiraService";
import { CarteiraRendaVariavel } from "../interfaces/CarteiraRendaVariavel";
import { CarteiraRendaFixa } from "../interfaces/CarteiraRendaFixa";
import { faRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Carteira() {
  const [priceUpdated, setPriceUpdated] = useState<boolean>(true);
  const [carteira, setCarteira] = useState<
    (CarteiraRendaFixa | CarteiraRendaVariavel)[]
  >([]);

  useEffect(() => {
    if (!priceUpdated) return;

    const fetchData = async () => {
      const data = await CarteiraService.getConsolidado();
      setCarteira(data);
    };

    fetchData();
    setPriceUpdated(false);
  }, [priceUpdated]);

  const atualizaCotacao = async () => {
    await CarteiraService.updatePrices();
    setPriceUpdated(true);
  };

  return (
    <>
      <div className="flex flex-row-reverse pr-6 pt-5">
        <button
          className="bg-green-600 text-white px-3 py-2 rounded-lg shadow-lg text-lg flex items-center"
          onClick={() => atualizaCotacao()}
        >
          <FontAwesomeIcon icon={faRotate} />
        </button>
      </div>
      <main className="h-full">
        {/* Main Content */}
        <ConsolidadoRendaVariavel
          title="Ação"
          initialCarteira={carteira as CarteiraRendaVariavel[]}
        />
        <ConsolidadoRendaVariavel
          title="FII"
          initialCarteira={carteira as CarteiraRendaVariavel[]}
        />
        <ConsolidadoRendaVariavel
          title="BDR"
          initialCarteira={carteira as CarteiraRendaVariavel[]}
        />
        <ConsolidadoRendaFixa
          title="Tesouro Direto"
          initialCarteira={carteira as CarteiraRendaFixa[]}
        />
        <ConsolidadoRendaFixa
          title="CDB"
          initialCarteira={carteira as CarteiraRendaFixa[]}
        />
      </main>
    </>
  );
}

export default Carteira;
