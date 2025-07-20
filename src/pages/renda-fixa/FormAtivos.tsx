import { FormEvent, useEffect, useState } from "react";
import InputText from "../../components/Form/InputText";
import SelectList from "../../components/Form/SelectList";
import { RendaFixaService } from "../../services/RendaFixaService";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../../components/Form/Button";
import { AtivoRendaFixa } from "../../interfaces/AtivoRendaFixa";
import { useFormat } from "../../hooks/useFormat";
import InputDate from "../../components/Form/InputDate";

function FormAtivos() {
  const [urlParams] = useSearchParams();
  const navigate = useNavigate();
  const { formatPrice } = useFormat();

  const [id, setId] = useState<string>();
  const [titulo, setTitulo] = useState<string>("");
  const [codigo, setCodigo] = useState<string>("");
  const [tipo, setTipo] = useState<string>("TesouroDireto");
  const [cotacao, setCotacao] = useState<string>("");
  const [vencimento, setVencimento] = useState<string>("");

  useEffect(() => {
    const fetchAtivo = async () => {
      const ativoId = urlParams.get("id");
      if (!!ativoId) {
        const operacao = await RendaFixaService.getAtivoById(+ativoId);

        setId(ativoId);
        setCotacao(operacao.cotacao.toString());
        setTitulo(operacao.titulo);
        setVencimento(operacao.dataVencimento.toISOString().substring(0, 10));
        setTipo(operacao.tipo);
        setCodigo(operacao.codigo);
      }
    };

    fetchAtivo();
  }, [urlParams]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const ativo: Omit<AtivoRendaFixa, "id"> = {
      titulo: titulo,
      tipo: tipo,
      dataVencimento: new Date(vencimento),
      codigo: codigo,
      cotacao: formatPrice(cotacao),
      dataHoraCotacao: new Date(),
    };

    let status;
    if (!!id) status = await RendaFixaService.updateAtivo(+id, ativo);
    else status = await RendaFixaService.createAtivo(ativo);

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
                id="titulo"
                label="Titulo"
                value={titulo}
                handleOnChange={(event) => {
                  setTitulo(event.target.value);
                }}
              />
              <InputText
                id="cotacao"
                label="Cotação"
                value={cotacao}
                handleOnChange={(event) => {
                  setCotacao(event.target.value);
                }}
              />
              <SelectList
                id="tipo"
                label="Tipo"
                value={tipo}
                options={["TesouroDireto", "CDB"]}
                handleOnChange={(event) => {
                  setTipo(event.target.value);
                }}
              ></SelectList>
              <InputDate
                id="vencimento"
                label="Vencimento"
                value={vencimento}
                handleOnChange={(event) => {
                  setVencimento(event.target.value);
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
              <div className="mt-6 flex flex-row">
                <Button buttonType="submit">
                  {!!id ? "Atualizar" : "Salvar"}
                </Button>
                <Button
                  buttonType="button"
                  handleOnClick={() => navigate("/renda-fixa/ativos")}
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
