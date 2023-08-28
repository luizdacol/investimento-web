import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

type SidebarLogoProps = {
  icon: IconProp,
  text: string,
  [x: string]: any
}

function SidebarLogo({ icon, text, ...props }: SidebarLogoProps) {
  return (
    <div className="relative flex flex-row font-semibold text-3xl md:items-center md:mx-auto text-green-700 mb-5 p-4 justify-between">
      <Link to="/">
        <FontAwesomeIcon icon={icon}></FontAwesomeIcon> {text}
      </Link>
      <button
        onClick={props.toggle}
        className="border border-emerald-300 text-xl font-medium py-2 px-4 block md:hidden absolute right-1 top-3"
      >
        <FontAwesomeIcon icon={faTimes} />
      </button>
    </div>
  );
}

export default SidebarLogo;
