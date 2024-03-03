import {
  faChartSimple,
  faShoppingCart,
  IconDefinition,
  faDollarSign,
  faWallet,
  faFile,
  faChartPie,
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
    label: "Graficos",
  },
  {
    label: "Composição Carteira",
    path: "/graficos/composicao-carteira",
    icon: faChartPie,
  },
  {
    label: "Proventos",
    path: "/graficos/proventos",
    icon: faChartSimple,
  },
  {
    label: "Renda Variavel",
  },
  {
    label: "Ativos",
    path: "/renda-variavel/ativos",
    icon: faFile,
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
    label: "Ativos",
    path: "/renda-fixa/ativos",
    icon: faFile,
  },
  {
    label: "Operações",
    path: "/renda-fixa/operacoes",
    icon: faShoppingCart,
  },
];

export default initMenu;
