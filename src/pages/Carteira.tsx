import { useEffect, useState } from "react";
import ConsolidadoRendaFixa from "../components/Carteira/ConsolidadoRendaFixa";
import ConsolidadoRendaVariavel from "../components/Carteira/ConsolidadoRendaVariavel";
import { CarteiraService } from "../services/CarteiraService";
import { CarteiraRendaVariavel } from "../interfaces/CarteiraRendaVariavel";
import { CarteiraRendaFixa } from "../interfaces/CarteiraRendaFixa";

function Carteira() {
  const [carteira, setCarteira] = useState<
    (CarteiraRendaFixa | CarteiraRendaVariavel)[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await CarteiraService.getConsolidado();
      setCarteira(data);
    };

    fetchData();
  }, []);

  return (
    <>
      <main className="h-full">
        {/* Main Content */}
        <ConsolidadoRendaVariavel
          title="Ação"
          carteira={
            carteira.filter(
              (c) => c.tipoAtivo === "Ação"
            ) as CarteiraRendaVariavel[]
          }
        />
        <ConsolidadoRendaVariavel
          title="FII"
          carteira={
            carteira.filter(
              (c) => c.tipoAtivo === "FII"
            ) as CarteiraRendaVariavel[]
          }
        />
        <ConsolidadoRendaVariavel
          title="BDR"
          carteira={
            carteira.filter(
              (c) => c.tipoAtivo === "BDR"
            ) as CarteiraRendaVariavel[]
          }
        />
        <ConsolidadoRendaFixa
          title="Tesouro Direto"
          carteira={
            carteira.filter(
              (c) => c.tipoAtivo === "TesouroDireto"
            ) as CarteiraRendaFixa[]
          }
        />
        <ConsolidadoRendaFixa
          title="CDB"
          carteira={
            carteira.filter((c) => c.tipoAtivo === "CDB") as CarteiraRendaFixa[]
          }
        />
      </main>
    </>
  );
}

export default Carteira;
