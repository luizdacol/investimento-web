import { FormEvent, useState } from "react";
import InputText from "../components/Form/InputText";
import SelectList from "../components/Form/SelectList";
import { Acao } from "./Acoes";
import { AcoesService } from "../services/AcoesService";
import { useNavigate } from "react-router-dom";
import InputDate from "../components/Form/InputDate";

function FormAcoes() {
  const [data, setData] = useState<string>("");
  const [ticker, setTicker] = useState<string>("");
  const [precoUnitario, setPrecoUnitario] = useState<string>("");
  const [quantidade, setQuantidade] = useState<string>("");
  const [segmento, setSegmento] = useState<string>("");
  const [tipoAtivo, setTipoAtivo] = useState<string>("Ação");
  const [tipoOperacao, setTipoOperacao] = useState<string>("Compra");

  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const acao: Acao = {
      data: new Date(data),
      ticker: ticker,
      precoUnitario: +precoUnitario,
      quantidade: +quantidade,
      precoTotal: +precoUnitario * +quantidade,
      tipo: tipoAtivo,
      operacao: tipoOperacao,
      segmento: segmento,
    };

    const statusCriacao = await AcoesService.postAcao(acao);
    if (statusCriacao) {
      navigate("/acoes");
    }
  };

  return (
    <>
      <main className="h-full">
        <div className="mainCard">
          <div className="border w-full border-gray-200 bg-white py-4 px-6 rounded-md">
            <form onSubmit={handleSubmit}>
              <InputDate
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
                id="tipoOperacao"
                label="Tipo da Operação"
                options={["Compra", "Venda"]}
                value={tipoOperacao}
                handleOnChange={(event) => {
                  setTipoOperacao(event.target.value);
                }}
              ></SelectList>
              <SelectList
                id="tipoAtivo"
                label="Tipo do Ativo"
                value={tipoAtivo}
                options={["Ação", "BDR", "FII"]}
                handleOnChange={(event) => {
                  setTipoAtivo(event.target.value);
                }}
              ></SelectList>
              <InputText
                id="segmento"
                label="Segmento"
                value={segmento}
                handleOnChange={(event) => {
                  setSegmento(event.target.value);
                }}
              />
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