import ComposicaoPieChart from "../../components/Graficos/ComposicaoPieChart";

function ComposicaoCarteira() {
  return (
    <>
      <main className="h-full">
        <div className="mainCard">
          <ComposicaoPieChart categoria="Carteira" />
        </div>
        <div className="mainCard flex">
          <ComposicaoPieChart categoria="FII" />
          <ComposicaoPieChart categoria="Ação" />
          <ComposicaoPieChart categoria="TesouroDireto" />
        </div>
      </main>
    </>
  );
}

export default ComposicaoCarteira;
