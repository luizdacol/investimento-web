import { useEffect, useState } from "react";
import { RendaVariavelService } from "../../services/RendaVariavelService";
import { LucrosPrejuizosRendaVariavel } from "../../interfaces/LucrosPrejuizosRendaVariavel";
import TabelaLucrosPrejuizos from "../../components/LucrosPrejuizos/TabelaLucrosPrejuizos";
import { ToastContainer, toast } from "react-toastify";

function LucrosPrejuizos() {
  const [lucrosPrejuizos, setLucrosPrejuizos] = useState<
    LucrosPrejuizosRendaVariavel[]
  >([]);
  const [reload, setReload] = useState<Boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await RendaVariavelService.getLucrosPrejuizos();
      setLucrosPrejuizos(data);
      setReload(false);
    };

    fetchData();
  }, [reload]);

  const updatePrejuizoCompensado = async (
    id: number,
    prejuizoCompensado: number
  ) => {
    const status = await RendaVariavelService.updatePrejuizoCompensado(
      id,
      prejuizoCompensado
    );
    if (status) {
      toast.success("Compensação atualizada com sucesso");
    } else {
      toast.error("Erro ao atualizar compensação");
    }
    setReload(true);
  };

  return (
    <>
      <main className="h-full">
        {/* Main Content */}
        {lucrosPrejuizos.map((lp) => (
          <TabelaLucrosPrejuizos
            key={lp.classeAtivo}
            classeAtivo={lp.classeAtivo}
            saldoParaCompensar={lp.saldoParaCompensar}
            balancoMensal={lp.balancoMensal}
            handlePrejuizoCompensado={updatePrejuizoCompensado}
          />
        ))}
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

export default LucrosPrejuizos;
