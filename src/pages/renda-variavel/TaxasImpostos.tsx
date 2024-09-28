import { useEffect, useState } from "react";
import { RendaVariavelService } from "../../services/RendaVariavelService";
import PriceCell from "../../components/Table/PriceCell";
import Table from "../../components/Table/Table";
import { useStyles } from "../../hooks/useStyles";
import { useSort } from "../../hooks/useSort";
import { TaxasImpostosRendaVariavel } from "../../interfaces/TaxasImpostosRendaVariavel";
import DateCell from "../../components/Table/DateCell";

function TaxasImpostos() {
  const { rowDefaultStyle } = useStyles();
  const { sort } = useSort();
  const [taxasImpostos, setTaxasImpostos] = useState<
    TaxasImpostosRendaVariavel[]
  >([]);
  const [reload, setReload] = useState<Boolean>(false);

  const headers = [
    { key: "data", label: "Data" },
    { key: "totalOperacao", label: "Total Operação" },
    { key: "emolumentos", label: "Emolumentos" },
    { key: "taxaLiquidacao", label: "Taxa Liquidação" },
    { key: "total", label: "Total" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const data = await RendaVariavelService.getTaxasImpostos();
      setTaxasImpostos(data);
      setReload(false);
    };

    fetchData();
  }, [reload]);

  const handleSort = (property: string, order: string) => {
    const keyProperty = property as keyof TaxasImpostosRendaVariavel;
    const sortedAtivo = sort(taxasImpostos, keyProperty, order);

    setTaxasImpostos(sortedAtivo);
  };

  return (
    <>
      <main className="h-full">
        {/* Main Content */}
        <div className="mainCard">
          <div className="border w-full border-gray-200 bg-white py-4 px-6 rounded-md">
            <Table
              headers={headers}
              title="Taxas e Impostos"
              handleSort={handleSort}
            >
              {taxasImpostos.map((taxaImposto, index) => (
                <tr key={index} className={rowDefaultStyle}>
                  <DateCell cellValue={taxaImposto.data} dataLabel="Data" />
                  <PriceCell
                    cellValue={taxaImposto.valorTotal}
                    dataLabel="TotalOperacao"
                  />
                  <PriceCell
                    cellValue={taxaImposto.emolumentos}
                    dataLabel="Emolumentos"
                  />
                  <PriceCell
                    cellValue={taxaImposto.taxaLiquidacao}
                    dataLabel="TaxaLiquidacao"
                  />
                  <PriceCell cellValue={taxaImposto.total} dataLabel="Total" />
                </tr>
              ))}
            </Table>
          </div>
        </div>
      </main>
    </>
  );
}

export default TaxasImpostos;
