import InputText from "../components/Form/InputText";
import SelectList from "../components/Form/SelectList";

function FormAcoes() {
  return (
    <>
      <main className="h-full">
        <div className="mainCard">
          <div className="border w-full border-gray-200 bg-white py-4 px-6 rounded-md">
            <form>
              <InputText id="data" label="Data" placeholder="03/09/2023" />
              <InputText id="ticker" label="Ticker" placeholder="TICK11" />
              <InputText
                id="precoUnit"
                label="Preço Unitario"
                placeholder="R$ 10,00"
              />
              <InputText id="qtd" label="Quantidade" placeholder="100" />
              <SelectList
                id="operacao"
                label="Operação"
                options={["Compra", "Venda"]}
              ></SelectList>
              <SelectList
                id="tipo"
                label="Tipo"
                options={["Ação", "BDR"]}
              ></SelectList>
              <div className="mt-6 flex flex-row">
                <button className="bg-emerald-600 text-gray-100 px-3 py-2 rounded-lg shadow-lg text-sm">
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}

export default FormAcoes;
