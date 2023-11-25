import Cell from "../Table/Cell";
import PriceCell from "../Table/PriceCell";
import PercentCell from "../Table/PercentCell";
import { CarteiraRendaVariavel } from "../../interfaces/CarteiraRendaVariavel";

type LinhaProps = {
  item: CarteiraRendaVariavel;
  rowClass: string;
};

const LinhaRendaVariavel = ({ item, rowClass }: LinhaProps) => {
  return (
    <tr className={rowClass}>
      <Cell cellValue={item.ticker} dataLabel="Ticker" />
      <Cell cellValue={item.quantidade.toString()} dataLabel="Quantidade" />
      <PriceCell cellValue={item.precoMedio} dataLabel="PreçoMedio" />
      <PriceCell
        cellValue={item.precoMercado}
        dataLabel="PreçoMercado"
        title={item.dataHoraCotacao.toLocaleString("pt-BR")}
      />
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
      <PriceCell
        cellValue={item.dividendosRecebidos}
        dataLabel="DividendosRecebidos"
      />
      <PercentCell
        cellValue={item.yieldOnCost}
        dataLabel="YieldOnCost"
        options={{ enableTextColor: true }}
      />
    </tr>
  );
};

export default LinhaRendaVariavel;
