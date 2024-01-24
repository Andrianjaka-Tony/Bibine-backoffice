import "./Sidebar.scss";
import { FunctionComponent } from "react";
import SidebarItem, { Item } from "./item/SidebarItem";

import { FaCar } from "react-icons/fa";
import { PiEngine } from "react-icons/pi";
import { MdOutlineDashboard, MdOutlineAnnouncement } from "react-icons/md";
import { GiFlatTire } from "react-icons/gi";
import { TbManualGearbox, TbBrandCarbon } from "react-icons/tb";
import { CiSettings } from "react-icons/ci";

const items: Item[] = [
  {
    name: "Dashboard",
    to: "/",
    icon: <MdOutlineDashboard />,
  },
  {
    name: "Categories",
    to: "/category",
    icon: <MdOutlineDashboard />,
  },
  {
    name: "Types",
    to: "/type",
    icon: <MdOutlineDashboard />,
  },
  {
    name: "Annonce",
    to: "/announce",
    icon: <MdOutlineAnnouncement />,
  },
  {
    name: "Moteur",
    to: "/engine",
    icon: <PiEngine />,
  },
  {
    name: "Jante",
    to: "/rim",
    icon: <GiFlatTire />,
  },
  {
    name: "Transmission",
    to: "/transmission",
    icon: <TbManualGearbox />,
  },
  {
    name: "Marque",
    to: "/brand",
    icon: <TbBrandCarbon />,
  },
  {
    name: "Modele de voiture",
    to: "/model",
    icon: <FaCar />,
  },
  {
    name: "Entretien",
    to: "/maintain",
    icon: <CiSettings />,
  },
];

const Sidebar: FunctionComponent = () => {
  return (
    <aside className="sidebar">
      <header className="sidebar-user">
        <img src="/user.png" alt="User" className="sidebar-user-image" />
        <p className="sidebar-user-name">Ryomen Sukuna</p>
      </header>
      <div className="items-container">
        {items.map((item, index) => (
          <SidebarItem {...item} key={index} />
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
