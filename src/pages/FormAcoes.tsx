import { FormEvent, useState } from "react";
import InputText from "../components/Form/InputText";
import SelectList from "../components/Form/SelectList";
import { Acao } from "./Acoes";
import { AcoesService } from "../services/AcoesService";

function FormAcoes() {
  const [data, setData] = useState<string>("");
  const [ticker, setTicker] = useState<string>("");
  const [precoUnitario, setPrecoUnitario] = useState<string>("");
  const [quantidade, setQuantidade] = useState<string>("");
  const [tipo, setTipo] = useState<string>("Ação");
  const [operacao, setOperacao] = useState<string>("Compra");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const acao: Acao = {
      data: new Date(data),
      ticker: ticker,
      precoUnitario: +precoUnitario,
      quantidade: +quantidade,
      precoTotal: +precoUnitario * +quantidade,
      tipo: tipo,
      operacao: operacao,
    };

    await AcoesService.postAcao(acao);
  };

  return (
    <>
      <main className="h-full">
        <div className="mainCard">
          <div className="border w-full border-gray-200 bg-white py-4 px-6 rounded-md">
            <form onSubmit={handleSubmit}>
              <InputText
                id="data"
                label="Data"
                value={data}
                handleOnChange={(event) => {
                  setData(event.target.value);
                }}
              />
              <InputText
                id="ticker"
                label="Ticker"
                value={ticker}
                handleOnChange={(event) => {
                  setTicker(event.target.value);
                }}
              />
              <InputText
                id="precoUnitario"
                label="Preço Unitario"
                value={precoUnitario}
                handleOnChange={(event) => {
                  setPrecoUnitario(event.target.value);
                }}
              />
              <InputText
                id="quantidade"
                label="Quantidade"
                value={quantidade}
                handleOnChange={(event) => {
                  setQuantidade(event.target.value);
                }}
              />
              <SelectList
                id="operacao"
                label="Operação"
                options={["Compra", "Venda"]}
                value={operacao}
                handleOnChange={(event) => {
                  setOperacao(event.target.value);
                }}
              ></SelectList>
              <SelectList
                id="tipo"
                label="Tipo"
                value={tipo}
                options={["Ação", "BDR"]}
                handleOnChange={(event) => {
                  setTipo(event.target.value);
                }}
              ></SelectList>
              <div className="mt-6 flex flex-row">
                <button
                  className="bg-emerald-600 text-gray-100 px-3 py-2 rounded-lg shadow-lg text-sm"
                  type="submit"
                >
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
