import { useEffect, useState } from "react";
import { RendaVariavelService } from "../../services/RendaVariavelService";
import { AtivoRendaVariavel } from "../../interfaces/AtivoRendaVariavel";
import { useNavigate } from "react-router-dom";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useTable } from "../../hooks/useTable";
import { ClasseAtivo } from "../../data/enums";

function Ativos() {
  const [ativos, setAtivos] = useState<AtivoRendaVariavel[]>([]);
  const [reload, setReload] = useState<Boolean>(false);
  const navigate = useNavigate();
  const { formatPriceCell, formatActionCell, formatHeader } = useTable();

  const columns = [
    { field: "ticker", title: "Ticker" },
    { field: "tipo", title: "Tipo" },
    { field: "classe", title: "Classe" },
    {
      field: "cotacao",
      title: "Cotação",
      content: (ativo: AtivoRendaVariavel) =>
        formatPriceCell(
          ativo.cotacao,
          ativo.dataHoraCotacao.toLocaleString("pt-BR"),
          false,
          ativo.classe === ClasseAtivo.BOLSA_AMERICANA ? "USD" : "BRL"
        ),
    },
    { field: "segmento", title: "Segmento" },
    {
      field: undefined,
      title: "Ações",
      content: (ativo: AtivoRendaVariavel) =>
        formatActionCell(ativo.id, handleDelete, handleUpdate),
    },
  ];

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
            <DataTable
              value={ativos}
              header={formatHeader("Ativos", "/renda-variavel/form-ativos")}
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
