import { FormEvent, useEffect, useState } from "react";
import InputText from "../../components/Form/InputText";
import SelectList from "../../components/Form/SelectList";
import { CriptomoedaService } from "../../services/CriptomoedaService";
import { useNavigate, useSearchParams } from "react-router-dom";
import InputDate from "../../components/Form/InputDate";
import Button from "../../components/Form/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormat } from "../../hooks/useFormat";
import { OperacaoCriptomoeda } from "../../interfaces/Criptomoedas/OperacaoCriptomoeda";

function FormOperacoes() {
  const today = new Date().toISOString().substring(0, 10);
  const [urlParams] = useSearchParams();
  const navigate = useNavigate();
  const { formatPrice, formatPercent } = useFormat();

  const [id, setId] = useState<string>();
  const [data, setData] = useState<string>(today);
  const [codigo, setCodigo] = useState<string>("");
  const [precoUnitario, setPrecoUnitario] = useState<string>("");
  const [valorTotalBruto, setValorTotalBruto] = useState<string>("");
  const [taxa, setTaxa] = useState<string>("");
  const [tipoOperacao, setTipoOperacao] = useState<string>("Compra");

  useEffect(() => {
    const fetchOperacao = async () => {
      const operacaoId = urlParams.get("id");
      if (!!operacaoId) {
        const operacao = await CriptomoedaService.getOperacaoById(+operacaoId);

        setId(operacaoId);
        setData(operacao.data.toISOString().substring(0, 10));
        setCodigo(operacao.codigo);
        setPrecoUnitario(operacao.precoUnitario.toString());
        setValorTotalBruto(operacao.valorTotalBruto.toString());
        setTaxa(operacao.taxa.toString());
        setTipoOperacao(operacao.tipoOperacao);
      }
    };

    fetchOperacao();
  }, [urlParams]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const operacao: Omit<
      OperacaoCriptomoeda,
      "id" | "valorTotalLiquido" | "quantidade"
    > = {
      data: new Date(data),
      codigo: codigo,
      precoUnitario: formatPrice(precoUnitario),
      valorTotalBruto: formatPrice(valorTotalBruto),
      taxa: formatPercent(taxa),
      tipoOperacao: tipoOperacao,
    };

    let status;
    if (!!id) status = await CriptomoedaService.updateOperacao(+id, operacao);
    else status = await CriptomoedaService.createOperacao(operacao);

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
                id="codigo"
                label="Codigo"
                value={codigo}
                handleOnChange={(event) => {
                  setCodigo(event.target.value);
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
                id="valorTotalBruto"
                label="Valor Total Bruto"
                value={valorTotalBruto}
                handleOnChange={(event) => {
                  setValorTotalBruto(event.target.value);
                }}
              />
              <InputText
                id="taxa"
                label="Taxa"
                value={taxa}
                handleOnChange={(event) => {
                  setTaxa(event.target.value);
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
              <div className="mt-6 flex flex-row">
                <Button buttonType="submit">
                  {!!id ? "Atualizar" : "Salvar"}
                </Button>
                <Button
                  buttonType="button"
                  handleOnClick={() => navigate("/criptomoedas/operacoes")}
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
