import React from "react";
import { BiHome, BiCalendar, BiUser } from "react-icons/bi";
import { MdOutlineReportProblem, MdNotifications } from "react-icons/md";
import { TfiAnnouncement } from "react-icons/tfi";
import { FiLogOut } from "react-icons/fi";
import { TbMapSearch, TbSoccerField } from "react-icons/tb";
import "./Menu.css";

const Menu = () => {
  return (
    <div className="menu">
      <nav className="vertMenu">
        <div className="vertMenu-logo">SoccerVio</div>
        <div className="vertMenu-items">
          <div className="vertMenu-item">
            <BiHome className="vertMenu-icon" />
            <span>Home</span>
          </div>
          <div className="vertMenu-item">
            <BiCalendar className="vertMenu-icon" />
            <span>Reservations</span>
          </div>
          <div className="vertMenu-item">
            <MdOutlineReportProblem className="vertMenu-icon" />
            <span>Reports</span>
          </div>
          <div className="vertMenu-item">
            <BiUser className="vertMenu-icon" />
            <span>Users</span>
          </div>
          <div className="vertMenu-item">
            <TbMapSearch className="vertMenu-icon" />
            <span>Searches</span>
          </div>
          <div className="vertMenu-item">
            <TbSoccerField className="vertMenu-icon" />
            <span>Stades</span>
          </div>
          <div className="vertMenu-item">
            <TfiAnnouncement className="vertMenu-icon" />
            <span>Announcements</span>
          </div>
        </div>
      </nav>
      <header className="horizMenu">
        <div className="horizMenu-authUser">
          <img src="/images/userImage.jpg" className="horizMenu-imgUser" />
          <span>Krach achraf</span>
        </div>
        <div className="horizMenu-rightSide">
          <MdNotifications className="horizMenu-notifIcon" />
          <div className="horizMenu-logout">
            <span>Log out</span>
            <FiLogOut className="horizMenu-logoutIcon" />
          </div>
        </div>
      </header>
    </div>
  );
};

export default Menu;
