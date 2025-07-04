import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useTable } from "../../hooks/useTable";
import { AtivoCriptomoeda } from "../../interfaces/Criptomoedas/AtivoCriptomoeda";
import { CriptomoedaService } from "../../services/CriptomoedaService";

function Ativos() {
  const [ativos, setAtivos] = useState<AtivoCriptomoeda[]>([]);
  const [reload, setReload] = useState<Boolean>(false);
  const navigate = useNavigate();
  const { formatPriceCell, formatActionCell, formatHeader } = useTable();

  const columns = [
    { field: "codigo", title: "Codigo" },
    { field: "nome", title: "Nome" },
    {
      field: "cotacao",
      title: "Cotação",
      content: (ativo: AtivoCriptomoeda) =>
        formatPriceCell(
          ativo.cotacao,
          ativo.dataHoraCotacao.toLocaleString("pt-BR")
        ),
    },
    {
      field: undefined,
      title: "Ações",
      content: (ativo: AtivoCriptomoeda) =>
        formatActionCell(ativo.id, handleDelete, handleUpdate),
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const data = await CriptomoedaService.getAtivos();
      setAtivos(data);
      setReload(false);
    };

    fetchData();
  }, [reload]);

  const handleDelete = async (id: number): Promise<void> => {
    const status = await CriptomoedaService.deleteAtivo(id);
    if (status) {
      setReload(true);
    }
  };

  const handleUpdate = async (id: number): Promise<void> => {
    navigate(`/criptomoedas/form-ativos?id=${id}`);
  };

  return (
    <>
      <main className="h-full">
        {/* Main Content */}
        <div className="mainCard">
          <div className="border w-full border-gray-200 bg-white py-4 px-6 rounded-md">
            <DataTable
              value={ativos}
              header={formatHeader("Ativos", "/criptomoedas/form-ativos")}
              size="small"
              stripedRows
              sortMode="multiple"
              removableSort
              paginatorTemplate={{
                layout:
                  "FirstPageLink PageLinks LastPageLink RowsPerPageDropdown",
              }}
            >
              {columns.map((column, index) => (
                <Column
                  key={column.field}
                  field={column.field}
                  header={column.title}
                  body={column.content}
                  sortable
                  alignHeader="center"
                  headerClassName="text-sm"
                  align="center"
                  bodyClassName="text-xs"
                />
              ))}
            </DataTable>
          </div>
        </div>
      </main>
    </>
  );
}

export default Ativos;
