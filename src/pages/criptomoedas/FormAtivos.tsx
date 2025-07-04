import { FormEvent, useEffect, useState } from "react";
import InputText from "../../components/Form/InputText";
import { CriptomoedaService } from "../../services/CriptomoedaService";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../../components/Form/Button";
import { useFormat } from "../../hooks/useFormat";
import { AtivoCriptomoeda } from "../../interfaces/Criptomoedas/AtivoCriptomoeda";

function FormAtivos() {
  const [urlParams] = useSearchParams();
  const navigate = useNavigate();
  const { formatPrice } = useFormat();

  const [id, setId] = useState<string>();
  const [nome, setNome] = useState<string>("");
  const [codigo, setCodigo] = useState<string>("");
  const [cotacao, setCotacao] = useState<string>("");

  useEffect(() => {
    const fetchAtivo = async () => {
      const ativoId = urlParams.get("id");
      if (!!ativoId) {
        const operacao = await CriptomoedaService.getAtivoById(+ativoId);

        setId(ativoId);
        setCotacao(operacao.cotacao.toString());
        setNome(operacao.nome);
        setCodigo(operacao.codigo);
      }
    };

    fetchAtivo();
  }, [urlParams]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const ativo: Omit<AtivoCriptomoeda, "id"> = {
      codigo: codigo,
      nome: nome,
      cotacao: formatPrice(cotacao),
      dataHoraCotacao: new Date(),
    };

    let status;
    if (!!id) status = await CriptomoedaService.updateAtivo(+id, ativo);
    else status = await CriptomoedaService.createAtivo(ativo);

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
                id="codigo"
                label="Codigo"
                value={codigo}
                handleOnChange={(event) => {
                  setCodigo(event.target.value);
                }}
              />
              <InputText
                id="nome"
                label="Nome"
                value={nome}
                handleOnChange={(event) => {
                  setNome(event.target.value);
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
              <div className="mt-6 flex flex-row">
                <Button buttonType="submit">
                  {!!id ? "Atualizar" : "Salvar"}
                </Button>
                <Button
                  buttonType="button"
                  handleOnClick={() => navigate("/criptomoedas/ativos")}
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
