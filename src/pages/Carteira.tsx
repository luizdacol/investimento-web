import ConsolidadoRendaFixa from "../components/Carteira/ConsolidadoRendaFixa";
import ConsolidadoRendaVariavel from "../components/Carteira/ConsolidadoRendaVariavel";

function Carteira() {
  return (
    <>
      <main className="h-full">
        {/* Main Content */}
        <ConsolidadoRendaVariavel title="Ação" tipo="Ação" />
        <ConsolidadoRendaVariavel title="FII" tipo="FII" />
        <ConsolidadoRendaVariavel title="BDR" tipo="BDR" />
        <ConsolidadoRendaFixa title="Tesouro Direto" tipo="TesouroDireto" />
        <ConsolidadoRendaFixa title="CDB" tipo="CDB" />
      </main>
    </>
  );
}

export default Carteira;
