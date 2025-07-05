import { useEffect, useState } from "react";
import ConsolidadoRendaFixa from "../components/Carteira/ConsolidadoRendaFixa";
import ConsolidadoRendaVariavel from "../components/Carteira/ConsolidadoRendaVariavel";
import { CarteiraService } from "../services/CarteiraService";
import { CarteiraRendaVariavel } from "../interfaces/CarteiraRendaVariavel";
import { CarteiraRendaFixa } from "../interfaces/CarteiraRendaFixa";
import { faCalendar, faRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ConsolidadoCriptomoeda from "../components/Carteira/ConsolidadoCriptomoeda";
import { CarteiraCriptomoeda } from "../interfaces/Criptomoedas/CarteiraCriptomoeda";

function Carteira() {
  const [priceUpdated, setPriceUpdated] = useState<boolean>(true);
  const [display, setDisplay] = useState<string>("hidden");
  const [dataDeCorte, setDataDeCorte] = useState<Date>(new Date());
  const [carteira, setCarteira] = useState<
    (CarteiraRendaFixa | CarteiraRendaVariavel | CarteiraCriptomoeda)[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await CarteiraService.getConsolidado(dataDeCorte);
      setCarteira(data);
    };

    fetchData();
  }, [priceUpdated, dataDeCorte]);

  const atualizaCotacao = async () => {
    await CarteiraService.updatePrices();
    setPriceUpdated(!priceUpdated);
  };

  const toogleDisplayInput = () => {
    if (display === "hidden") {
      setDisplay("");
    } else {
      setDisplay("hidden");
      setDataDeCorte(new Date());
    }
  };

  const changeDate = (valor: string) => {
    const valorAsDate = valor ? new Date(valor) : new Date();
    setDataDeCorte(valorAsDate);
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
        <input
          type="date"
          className={display}
          onBlur={(e) => changeDate(e.target.value)}
        ></input>
        <button
          className="bg-green-600 text-white px-3 py-2 rounded-lg shadow-lg text-lg flex items-center"
          onClick={() => toogleDisplayInput()}
        >
          <FontAwesomeIcon icon={faCalendar} />
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
          title="ETF"
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
        <ConsolidadoCriptomoeda
          title="Criptomoeda"
          initialCarteira={carteira as CarteiraCriptomoeda[]}
        />
      </main>
    </>
  );
}

export default Carteira;
