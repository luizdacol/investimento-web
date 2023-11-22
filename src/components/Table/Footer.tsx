import { CarteiraRendaFixa } from "../../interfaces/CarteiraRendaFixa";
import { CarteiraRendaVariavel } from "../../interfaces/CarteiraRendaVariavel";
import LinhaRendaFixa from "../Carteira/LinhaRendaFixa";
import LinhaRendaVariavel from "../Carteira/LinhaRendaVariavel";

type FooterProps = {
  item: CarteiraRendaFixa | CarteiraRendaVariavel;
};

function isRendaFixa(
  item: CarteiraRendaFixa | CarteiraRendaVariavel
): item is CarteiraRendaFixa {
  return "titulo" in item;
}

function Footer({ item }: FooterProps) {
  return (
    <tfoot className="hidden bg-green-200 md:table-footer-group text-black  ">
      {isRendaFixa(item) ? (
        <LinhaRendaFixa item={item} rowClass="" />
      ) : (
        <LinhaRendaVariavel item={item} rowClass="" />
      )}
    </tfoot>
  );
}

export default Footer;
