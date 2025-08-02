import { useEffect, useState } from "react";
import { RendaVariavelService } from "../../services/RendaVariavelService";
import { LucrosPrejuizosRendaVariavel } from "../../interfaces/LucrosPrejuizosRendaVariavel";
import TabelaLucrosPrejuizos from "../../components/LucrosPrejuizos/TabelaLucrosPrejuizos";

function LucrosPrejuizos() {
  const [lucrosPrejuizos, setLucrosPrejuizos] = useState<
    LucrosPrejuizosRendaVariavel[]
  >([]);
  const [reload, setReload] = useState<Boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await RendaVariavelService.getLucrosPrejuizos();
      setLucrosPrejuizos(data);
      setReload(false);
    };

    fetchData();
  }, [reload]);

  return (
    <>
      <main className="h-full">
        {/* Main Content */}
        {lucrosPrejuizos.map((lp) => (
          <TabelaLucrosPrejuizos
            key={lp.classeAtivo}
            classeAtivo={lp.classeAtivo}
            saldoParaCompensar={lp.saldoParaCompensar}
            balancoMensal={lp.balancoMensal}
          />
        ))}
      </main>
    </>
  );
}

export default LucrosPrejuizos;
