import { FormEvent, useEffect, useState } from "react";
import InputText from "../../components/Form/InputText";
import SelectList from "../../components/Form/SelectList";
import { RendaFixaService } from "../../services/RendaFixaService";
import { useNavigate, useSearchParams } from "react-router-dom";
import InputDate from "../../components/Form/InputDate";
import { OperacaoRendaFixa } from "../../interfaces/OperacaoRendaFixa";
import Button from "../../components/Form/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function FormOperacoes() {
  const today = new Date().toISOString().substring(0, 10);
  const [urlParams] = useSearchParams();
  const navigate = useNavigate();

  const [id, setId] = useState<string>();
  const [data, setData] = useState<string>(today);
  const [titulo, setTitulo] = useState<string>("");
  const [precoUnitario, setPrecoUnitario] = useState<string>("");
  const [quantidade, setQuantidade] = useState<string>("");
  const [rentabilidade, setRentabilidade] = useState<string>("");
  const [vencimento, setVencimento] = useState<string>("");
  const [tipoOperacao, setTipoOperacao] = useState<string>("Compra");

  useEffect(() => {
    const fetchOperacao = async () => {
      const operacaoId = urlParams.get("id");
      if (!!operacaoId) {
        const operacao = await RendaFixaService.getOperacaoById(+operacaoId);

        setId(operacaoId);
        setData(operacao.data.toISOString().substring(0, 10));
        setTitulo(operacao.titulo);
        setPrecoUnitario(operacao.precoUnitario.toString());
        setQuantidade(operacao.quantidade.toString());
        setRentabilidade(operacao.rentabilidade);
        setVencimento(operacao.dataVencimento.toISOString().substring(0, 10));
        setTipoOperacao(operacao.tipoOperacao);
      }
    };

    fetchOperacao();
  }, [urlParams]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const operacao: Omit<OperacaoRendaFixa, "id" | "tipoAtivo" | "precoTotal"> =
      {
        data: new Date(data),
        titulo: titulo,
        precoUnitario: +precoUnitario,
        quantidade: +quantidade,
        rentabilidade: rentabilidade,
        dataVencimento: new Date(vencimento),
        tipoOperacao: tipoOperacao,
      };

    let status;
    if (!!id) status = await RendaFixaService.updateOperacao(+id, operacao);
    else status = await RendaFixaService.createOperacao(operacao);

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
                id="titulo"
                label="Titulo"
                value={titulo}
                handleOnChange={(event) => {
                  setTitulo(event.target.value);
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
              <InputText
                id="rentabilidade"
                label="Rentabilidade Contratada"
                value={rentabilidade}
                handleOnChange={(event) => {
                  setRentabilidade(event.target.value);
                }}
              />
              <InputDate
                id="vencimento"
                label="Vencimento"
                value={vencimento}
                handleOnChange={(event) => {
                  setVencimento(event.target.value);
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
                  handleOnClick={() => navigate("/renda-fixa/operacoes")}
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
