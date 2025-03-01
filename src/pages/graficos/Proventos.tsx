import ProventosBarChart from "../../components/Graficos/ProventosBarChart";
import YieldOnCostLineChart from "../../components/Graficos/EvolucaoProventosLineChart";

function Proventos() {
  return (
    <>
      <main className="h-full">
        <div className="mainCard">
          <ProventosBarChart />
        </div>
        <div className="mainCard">
          <YieldOnCostLineChart />
        </div>
      </main>
    </>
  );
}

export default Proventos;
