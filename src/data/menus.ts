import { faPage4, faWindows } from "@fortawesome/free-brands-svg-icons";
import {
  faTachometer,
  faShoppingCart,
  IconDefinition,
  faDollarSign,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";

export type menu = {
  label: string;
  path?: string;
  icon?: IconDefinition;
  submenu?: menu[];
  role?: string;
};

const initMenu: menu[] = [
  {
    label: "Carteira",
    path: "/",
    icon: faWallet,
  },
  {
    label: "Renda Variavel",
  },
  {
    label: "Operações",
    path: "/renda-variavel/operacoes",
    icon: faShoppingCart,
  },
  {
    label: "Proventos",
    path: "/renda-variavel/proventos",
    icon: faDollarSign,
  },
  {
    label: "Renda Fixa",
  },
  {
    label: "Operações",
    path: "/renda-fixa/operacoes",
    icon: faShoppingCart,
  },
];

export default initMenu;
