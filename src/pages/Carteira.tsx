import ConsolidadoRendaVariavel from "../components/Carteira/ConsolidadoRendaVariavel";

function Carteira() {
  return (
    <>
      <main className="h-full">
        {/* Main Content */}
        <ConsolidadoRendaVariavel title="Ação" tipo="Ação" />
        <ConsolidadoRendaVariavel title="FII" tipo="FII" />
        <ConsolidadoRendaVariavel title="BDR" tipo="BDR" />
      </main>
    </>
  );
}

export default Carteira;
