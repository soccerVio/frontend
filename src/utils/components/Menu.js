import React from "react";
import { BiHome, BiCalendar, BiUser } from "react-icons/bi";
import { MdOutlineReportProblem, MdNotifications } from "react-icons/md";
import { TfiAnnouncement } from "react-icons/tfi";
import { FiLogOut } from "react-icons/fi";
import { TbMapSearch, TbSoccerField } from "react-icons/tb";
import "./Menu.css";

const Menu = () => {
  return (
    <header className="header">
      <div className="header-logo">SoccerVio</div>
      <nav className="menu">
        <BiHome className="menu-icon" />
        <BiCalendar className="menu-icon" />
        <MdOutlineReportProblem className="menu-icon" />
        <TbMapSearch className="menu-icon" />
        {/*<BiUser className="menu-icon" />
        <TbSoccerField className="menu-icon" />
        <TfiAnnouncement className="menu-icon" />*/}
      </nav>
      <div className="header-rightSide">
        <div className="header-authUser">
          <img src="/images/userImage.jpg" className="header-imgUser" />
          <span className="header-nameUser">Krach achraf</span>
        </div>
        <MdNotifications className="header-notifIcon" />
        <FiLogOut className="header-logoutIcon" />
      </div>
    </header>
  );
};

export default Menu;
