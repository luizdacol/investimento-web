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
    label: "Dashboard",
    path: "/",
    icon: faTachometer,
  },
  {
    label: 'Halaman'
  },
  {
    label: "Blank",
    path: "/blank",
    icon: faPage4,
  },
  {
    label: "404",
    path: "/404",
    icon: faNotdef,
  },
  
  {
    label: 'Tabel dan Form'
  },
  {
    label: "Form",
    path: "/form",
    icon: faWindows,
  },
  {
    label: "Tabel",
    path: "/table",
    icon: faTable,
  },

  {
    label: 'Otentikasi'
  },
  {
    label: "Login",
    path: "/auth/login",
    icon: faLock,
  },
  {
    label: "Register",
    path: "/auth/register",
    icon: faNoteSticky,
  },
];

export default initMenu