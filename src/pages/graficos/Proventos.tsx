import { useEffect, useState } from "react";
import ProventosBarChart from "../../components/Graficos/ProventosBarChart";
import ProventosPieChart from "../../components/Graficos/ProventosPieChart";
import { GraficosService } from "../../services/GraficosService";
import { ProventoComposicaoChart } from "../../interfaces/Graficos/ProventoComposicaoChart";

function Proventos() {
  const [selectedMonth, setSelectedMonth] = useState(
    new Intl.DateTimeFormat("en-US", {
      month: "2-digit",
      year: "numeric",
    }).format(new Date())
  );
  const [proventoComposicao, setProventoComposicao] =
    useState<ProventoComposicaoChart>();

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedMonth) return;

      const year = Number(selectedMonth.substring(3));
      const month = Number(selectedMonth.substring(0, 2));

      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0);

      const response = await GraficosService.getProventosComposicao(
        startDate.toISOString().substring(0, 10),
        endDate.toISOString().substring(0, 10)
      );
      setProventoComposicao(response);
    };

    fetchData();
  }, [selectedMonth]);

  return (
    <>
      <main className="h-full">
        <div className="mainCard">
          <ProventosBarChart setSelectedMonth={setSelectedMonth} />
        </div>
        <div className="mainCard">
          {proventoComposicao && (
            <ProventosPieChart
              proventosComposicaoChart={proventoComposicao}
              selectedMonth={selectedMonth}
            />
          )}
        </div>
      </main>
    </>
  );
}

export default Proventos;
