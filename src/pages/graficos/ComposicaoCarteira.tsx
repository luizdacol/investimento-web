import ComposicaoPieChart from "../../components/Graficos/ComposicaoPieChart";
import NewComposicaoPieChart from "../../components/Graficos/NewComposicaoPieChart";

function ComposicaoCarteira() {
  return (
    <>
      <main className="h-full">
        <div className="mainCard">
          <ComposicaoPieChart />
        </div>
        <div className="mainCard">
          <NewComposicaoPieChart categoria="carteira" />
          {/* <NewComposicaoPieChart categoria="FII" />
          <NewComposicaoPieChart categoria="Ação" />
          <NewComposicaoPieChart categoria="TesouroDireto" /> */}
        </div>
      </main>
    </>
  );
}

export default ComposicaoCarteira;
