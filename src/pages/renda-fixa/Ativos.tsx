import { useEffect, useState } from "react";
import { RendaFixaService } from "../../services/RendaFixaService";
import { useNavigate } from "react-router-dom";
import { AtivoRendaFixa } from "../../interfaces/AtivoRendaFixa";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useTable } from "../../hooks/useTable";

function Ativos() {
  const [ativos, setAtivos] = useState<AtivoRendaFixa[]>([]);
  const [reload, setReload] = useState<Boolean>(false);
  const navigate = useNavigate();
  const { formatPriceCell, formatActionCell, formatHeader } = useTable();

  const columns = [
    { field: "titulo", title: "Titulo" },
    { field: "tipo", title: "Tipo" },
    {
      field: "cotacao",
      title: "Cotação",
      content: (ativo: AtivoRendaFixa) =>
        formatPriceCell(
          ativo.cotacao,
          ativo.dataHoraCotacao.toLocaleString("pt-BR")
        ),
    },
    {
      field: undefined,
      title: "Ações",
      content: (ativo: AtivoRendaFixa) =>
        formatActionCell(ativo.id, handleDelete, handleUpdate),
    },
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

  return (
    <>
      <main className="h-full">
        {/* Main Content */}
        <div className="mainCard">
          <div className="border w-full border-gray-200 bg-white py-4 px-6 rounded-md">
            <DataTable
              value={ativos}
              header={formatHeader("Ativos", "/renda-fixa/form-ativos")}
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
