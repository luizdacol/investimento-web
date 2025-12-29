import ValorTotal from "../../components/Carteira/ValorTotal";

function VisaoGeral() {
  return (
    <>
      <main className="h-full">
        <div className="mainCard">
          <div className="flex space-x-2">
            <ValorTotal />
          </div>
        </div>
      </main>
    </>
  );
}

export default VisaoGeral;
