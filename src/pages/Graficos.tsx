import ComposicaoPieChart from "../components/Graficos/ComposicaoPieChart";
import ProventosBarChart from "../components/Graficos/ProventosBarChart";

function Graficos() {
  return (
    <>
      <main className="h-full">
        <div className="mainCard">
          <ComposicaoPieChart />
        </div>
        <div className="mainCard">
          <ProventosBarChart />
        </div>
      </main>
    </>
  );
}

export default Graficos;
