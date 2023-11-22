import Cell from "../Table/Cell";
import PriceCell from "../Table/PriceCell";
import { CarteiraRendaFixa } from "../../interfaces/CarteiraRendaFixa";
import PercentCell from "../Table/PercentCell";

type LinhaProps = {
  item: CarteiraRendaFixa;
  rowClass: string;
};

const LinhaRendaFixa = ({ item, rowClass }: LinhaProps) => {
  return (
    <tr className={rowClass}>
      <Cell cellValue={item.titulo} dataLabel="Titulo" />
      <Cell cellValue={item.quantidade.toString()} dataLabel="Quantidade" />
      <PriceCell cellValue={item.precoMedio} dataLabel="PreçoMedio" />
      <PriceCell cellValue={item.precoMercado} dataLabel="PreçoMercado" />
      <PercentCell cellValue={item.composicao} dataLabel="Composicao" />
      <PercentCell
        cellValue={item.composicaoTotal}
        dataLabel="ComposicaoCarteira"
      />
      <PriceCell cellValue={item.precoMedioTotal} dataLabel="PreçoMedioTotal" />
      <PriceCell
        cellValue={item.precoMercadoTotal}
        dataLabel="PreçoMercadoTotal"
      />
      <PercentCell
        cellValue={item.variacao}
        dataLabel="Variacao"
        options={{ enableTextColor: true }}
      />
    </tr>
  );
};

export default LinhaRendaFixa;
