import { useEffect, useState } from "react";
import { RendaVariavelService } from "../../services/RendaVariavelService";
import { AtivoRendaVariavel } from "../../interfaces/AtivoRendaVariavel";
import ActionCell from "../../components/Table/ActionCell";
import Cell from "../../components/Table/Cell";
import PriceCell from "../../components/Table/PriceCell";
import Table from "../../components/Table/Table";
import { useNavigate } from "react-router-dom";
import { useStyles } from "../../hooks/useStyles";

function Ativos() {
  const { rowDefaultStyle } = useStyles();
  const [ativos, setAtivos] = useState<AtivoRendaVariavel[]>([]);
  const [reload, setReload] = useState<Boolean>(false);
  const navigate = useNavigate();

  const headers = ["Ticker", "Tipo", "Cotação", "Segmento", "Ações"];

  useEffect(() => {
    const fetchData = async () => {
      const data = await RendaVariavelService.getAtivos();
      setAtivos(data);
      setReload(false);
    };

    fetchData();
  }, [reload]);

  const handleDelete = async (id: number): Promise<void> => {
    const status = await RendaVariavelService.deleteAtivo(id);
    if (status) {
      setReload(true);
    }
  };

  const handleUpdate = async (id: number): Promise<void> => {
    navigate(`/renda-variavel/form-ativos?id=${id}`);
  };

  return (
    <>
      <main className="h-full">
        {/* Main Content */}
        <div className="mainCard">
          <div className="border w-full border-gray-200 bg-white py-4 px-6 rounded-md">
            <Table
              headers={headers}
              title="Ativos"
              newItemRedirect="/renda-variavel/form-ativos"
            >
              {ativos.map((ativo, index) => (
                <tr key={index} className={rowDefaultStyle}>
                  <Cell cellValue={ativo.ticker} dataLabel="Ticker" />
                  <Cell cellValue={ativo.tipo} dataLabel="Tipo" />
                  <PriceCell cellValue={ativo.cotacao} dataLabel="Cotacao" />
                  <Cell cellValue={ativo.segmento} dataLabel="Segmento" />
                  <ActionCell
                    id={ativo.id}
                    handleDelete={handleDelete}
                    handleUpdate={handleUpdate}
                  ></ActionCell>
                </tr>
              ))}
            </Table>
          </div>
        </div>
      </main>
    </>
  );
}

export default Ativos;
