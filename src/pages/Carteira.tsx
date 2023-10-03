import ConsolidadoRendaVariavel from "../components/Carteira/ConsolidadoRendaVariavel";

function Carteira() {
  return (
    <>
      <main className="h-full">
        {/* Main Content */}
        <ConsolidadoRendaVariavel title="Ação" tipo="Ação" />
        <ConsolidadoRendaVariavel title="FII" tipo="FII" />
      </main>
    </>
  );
}

export default Carteira;
