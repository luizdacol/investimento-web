import { FormEvent, useEffect, useState } from "react";
import InputText from "../../components/Form/InputText";
import SelectList from "../../components/Form/SelectList";
import { RendaVariavelService } from "../../services/RendaVariavelService";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../../components/Form/Button";
import { AtivoRendaVariavel } from "../../interfaces/AtivoRendaVariavel";

function FormAtivos() {
  const [urlParams] = useSearchParams();
  const navigate = useNavigate();

  const [id, setId] = useState<string>();
  const [ticker, setTicker] = useState<string>("");
  const [segmento, setSegmento] = useState<string>("");
  const [tipo, setTipo] = useState<string>("Ação");

  useEffect(() => {
    const fetchAtivo = async () => {
      const ativoId = urlParams.get("id");
      if (!!ativoId) {
        const operacao = await RendaVariavelService.getAtivoById(+ativoId);

        setId(ativoId);
        setTicker(operacao.ticker);
        setTipo(operacao.tipo);
        setSegmento(operacao.segmento);
      }
    };

    fetchAtivo();
  }, [urlParams]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const ativo: Omit<AtivoRendaVariavel, "id" | "cotacao"> = {
      ticker: ticker,
      tipo: tipo,
      segmento: segmento,
    };

    let status;
    if (!!id) status = await RendaVariavelService.updateAtivo(+id, ativo);
    else status = await RendaVariavelService.createAtivo(ativo);

    if (status) {
      toast.success("Ativo cadastrado com sucesso");
    } else {
      toast.error("Erro ao cadastrar ativo");
    }
  };

  return (
    <>
      <main className="h-full">
        <div className="mainCard">
          <div className="border w-full border-gray-200 bg-white py-4 px-6 rounded-md">
            <form onSubmit={handleSubmit}>
              <InputText
                id="ticker"
                label="Ticker"
                value={ticker}
                handleOnChange={(event) => {
                  setTicker(event.target.value);
                }}
              />
              <SelectList
                id="tipo"
                label="Tipo"
                value={tipo}
                options={["Ação", "BDR", "FII"]}
                handleOnChange={(event) => {
                  setTipo(event.target.value);
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
                <Button buttonType="submit">
                  {!!id ? "Atualizar" : "Salvar"}
                </Button>
                <Button
                  buttonType="button"
                  handleOnClick={() => navigate("/renda-variavel/ativos")}
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

export default FormAtivos;
