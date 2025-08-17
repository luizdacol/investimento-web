import { FormEvent, useEffect, useState } from "react";
import InputText from "../../components/Form/InputText";
import SelectList from "../../components/Form/SelectList";
import { RendaVariavelService } from "../../services/RendaVariavelService";
import { useNavigate, useSearchParams } from "react-router-dom";
import InputDate from "../../components/Form/InputDate";
import { OperacaoRendaVariavel } from "../../interfaces/Operacao";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../../components/Form/Button";
import { useFormat } from "../../hooks/useFormat";
import { TipoOperacaoRV } from "../../data/enums";

function FormOperacoes() {
  const today = new Date().toISOString().substring(0, 10);
  const [urlParams] = useSearchParams();
  const navigate = useNavigate();
  const { formatPrice } = useFormat();

  const [id, setId] = useState<string>();
  const [data, setData] = useState<string>(today);
  const [ticker, setTicker] = useState<string>("");
  const [precoUnitario, setPrecoUnitario] = useState<string>("");
  const [quantidade, setQuantidade] = useState<string>("");
  const [tipoOperacao, setTipoOperacao] = useState<string>("Compra");

  useEffect(() => {
    const fetchOperacao = async () => {
      const operacaoId = urlParams.get("id");
      if (!!operacaoId) {
        const operacao = await RendaVariavelService.getOperacaoById(
          +operacaoId
        );

        setId(operacaoId);
        setData(operacao.data.toISOString().substring(0, 10));
        setTicker(operacao.ticker);
        setPrecoUnitario(operacao.precoUnitario.toString());
        setQuantidade(operacao.quantidade.toString());
        setTipoOperacao(operacao.tipoOperacao);
      }
    };

    fetchOperacao();
  }, [urlParams]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const operacao: Omit<
      OperacaoRendaVariavel,
      "id" | "tipoAtivo" | "precoTotal"
    > = {
      data: new Date(data),
      ticker: ticker,
      precoUnitario: formatPrice(precoUnitario),
      quantidade: formatPrice(quantidade),
      tipoOperacao: tipoOperacao,
    };

    let status;
    if (!!id) status = await RendaVariavelService.updateOperacao(+id, operacao);
    else status = await RendaVariavelService.createOperacao(operacao);

    if (status) {
      toast.success("Operação cadastrada com sucesso");
    } else {
      toast.error("Erro ao cadastrar operação");
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
                options={Object.values(TipoOperacaoRV)}
                value={tipoOperacao}
                handleOnChange={(event) => {
                  setTipoOperacao(event.target.value);
                }}
              ></SelectList>
              <div className="mt-6 flex flex-row">
                <Button buttonType="submit">
                  {!!id ? "Atualizar" : "Salvar"}
                </Button>
                <Button
                  buttonType="button"
                  handleOnClick={() => navigate("/renda-variavel/operacoes")}
                >
                  {"Cancelar"}
                </Button>
              </div>
            </form>
          </div>
        </div>
        <div>
          <ToastContainer
            position="bottom-right"
            autoClose={1500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
      </main>
    </>
  );
}

export default FormOperacoes;
