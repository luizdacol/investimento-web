import { faPage4, faWindows } from "@fortawesome/free-brands-svg-icons";
import {
  faTachometer,
  faTable,
  faLock,
  faNoteSticky,
  faNotdef,
  IconDefinition
} from "@fortawesome/free-solid-svg-icons";

export type menu = {
  label: string,
  path?: string,
  icon?: IconDefinition,
  submenu?: menu[],
  role?: string
}

const initMenu: menu[] = [
  {
    label: "Carteira",
    path: "/",
    icon: faTachometer,
  },
  {
    label: 'Ativos'
  },
  {
    label: "Ações",
    path: "/acoes",
    icon: faPage4,
  },
  {
    label: "FII",
    path: "/fundos-imobiliario",
    icon: faNotdef,
  },
];

export default initMenu