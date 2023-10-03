import { FormEvent, useEffect, useState } from "react";
import InputText from "../../components/Form/InputText";
import SelectList from "../../components/Form/SelectList";
import { RendaVariavelService } from "../../services/RendaVariavelService";
import { useNavigate, useSearchParams } from "react-router-dom";
import InputDate from "../../components/Form/InputDate";
import { ProventoRendaVariavel } from "../../interfaces/Provento";

function FormProventos() {
  const today = new Date().toISOString().substring(0, 10);
  const [urlParams] = useSearchParams();
  const navigate = useNavigate();

  const [id, setId] = useState<string>();
  const [dataCom, setDataCom] = useState<string>(today);
  const [dataPagamento, setDataPagamento] = useState<string>(today);
  const [ticker, setTicker] = useState<string>("");
  const [valorBruto, setValorBruto] = useState<string>("");
  const [tipo, setTipo] = useState<string>("Dividendo");

  useEffect(() => {
    const fetchOperacao = async () => {
      const proventoId = urlParams.get("id");
      if (!!proventoId) {
        const provento = await RendaVariavelService.getProventoById(
          +proventoId
        );

        setId(proventoId);
        setDataCom(provento.dataCom.toISOString().substring(0, 10));
        setDataPagamento(provento.dataPagamento.toISOString().substring(0, 10));
        setTicker(provento.ticker);
        setValorBruto(provento.valorBruto.toString());
        setTipo(provento.tipo);
      }
    };

    fetchOperacao();
  }, [urlParams]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const provento: Omit<
      ProventoRendaVariavel,
      "id" | "valorLiquido" | "valorTotal" | "posicao"
    > = {
      dataCom: new Date(dataCom),
      dataPagamento: new Date(dataPagamento),
      ticker: ticker,
      valorBruto: +valorBruto,
      tipo: tipo,
    };

    let status;
    if (!!id) status = await RendaVariavelService.updateProvento(+id, provento);
    else status = await RendaVariavelService.createProvento(provento);

    if (status) {
      navigate("/renda-variavel/proventos");
    }
  };

  return (
    <>
      <main className="h-full">
        <div className="mainCard">
          <div className="border w-full border-gray-200 bg-white py-4 px-6 rounded-md">
            <form onSubmit={handleSubmit}>
              <InputDate
                id="dataCom"
                label="Data Com"
                value={dataCom}
                handleOnChange={(event) => {
                  setDataCom(event.target.value);
                }}
              />
              <InputDate
                id="dataPagamento"
                label="Data Pagamento"
                value={dataPagamento}
                handleOnChange={(event) => {
                  setDataPagamento(event.target.value);
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
                id="valorBruto"
                label="Valor Bruto"
                value={valorBruto}
                handleOnChange={(event) => {
                  setValorBruto(event.target.value);
                }}
              />
              <SelectList
                id="tipo"
                label="Tipo"
                value={tipo}
                options={["Dividendo", "JCP", "Restituição de Capital"]}
                handleOnChange={(event) => {
                  setTipo(event.target.value);
                }}
              ></SelectList>

              <div className="mt-6 flex flex-row">
                <button
                  className="bg-emerald-600 text-gray-100 px-3 py-2 rounded-lg shadow-lg text-sm"
                  type="submit"
                >
                  {!!id ? "Atualizar" : "Salvar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}

export default FormProventos;
