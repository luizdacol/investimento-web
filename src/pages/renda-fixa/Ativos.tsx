import { useEffect, useState } from "react";
import { RendaFixaService } from "../../services/RendaFixaService";
import ActionCell from "../../components/Table/ActionCell";
import Cell from "../../components/Table/Cell";
import PriceCell from "../../components/Table/PriceCell";
import Table from "../../components/Table/Table";
import { useNavigate } from "react-router-dom";
import { useStyles } from "../../hooks/useStyles";
import { AtivoRendaFixa } from "../../interfaces/AtivoRendaFixa";
import { useSort } from "../../hooks/useSort";

function Ativos() {
  const { rowDefaultStyle } = useStyles();
  const { sort } = useSort();
  const [ativos, setAtivos] = useState<AtivoRendaFixa[]>([]);
  const [reload, setReload] = useState<Boolean>(false);
  const navigate = useNavigate();

  const headers = [
    { key: "titulo", label: "Titulo" },
    { key: "tipo", label: "Tipo" },
    { key: "cotacao", label: "Cotação" },
    { key: "codigo", label: "Codigo" },
    { key: undefined, label: "Ações" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const data = await RendaFixaService.getAtivos();
      setAtivos(data);
      setReload(false);
    };

    fetchData();
  }, [reload]);

  const handleDelete = async (id: number): Promise<void> => {
    const status = await RendaFixaService.deleteAtivo(id);
    if (status) {
      setReload(true);
    }
  };

  const handleUpdate = async (id: number): Promise<void> => {
    navigate(`/renda-fixa/form-ativos?id=${id}`);
  };

  const handleSort = (property: string, order: string) => {
    const keyProperty = property as keyof AtivoRendaFixa;
    const sortedAtivo = sort(ativos, keyProperty, order);

    setAtivos(sortedAtivo);
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
              newItemRedirect="/renda-fixa/form-ativos"
              handleSort={handleSort}
            >
              {ativos.map((ativo, index) => (
                <tr key={index} className={rowDefaultStyle}>
                  <Cell cellValue={ativo.titulo} dataLabel="Titulo" />
                  <Cell cellValue={ativo.tipo} dataLabel="Tipo" />
                  <PriceCell
                    cellValue={ativo.cotacao}
                    dataLabel="Cotacao"
                    title={ativo.dataHoraCotacao.toLocaleString("pt-BR")}
                  />
                  <Cell cellValue={ativo.codigo} dataLabel="Codigo" />
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
