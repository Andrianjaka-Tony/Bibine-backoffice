import "./SidebarItem.scss";

import { FunctionComponent } from "react";
import { NavLink } from "react-router-dom";

export interface Item {
  name: string;
  to: string;
  icon: any;
}

const SidebarItem: FunctionComponent<Item> = ({ name, to, icon }) => {
  return (
    <NavLink to={to} className="sidebar-item">
      {icon}
      <p>{name}</p>
    </NavLink>
  );
};

export default SidebarItem;
