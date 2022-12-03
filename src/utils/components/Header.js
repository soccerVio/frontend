import React, { useCallback, useEffect, useRef } from "react";
import { BiHome, BiCalendar, BiUser } from "react-icons/bi";
import { MdOutlineReportProblem, MdNotifications } from "react-icons/md";
import { TfiAnnouncement } from "react-icons/tfi";
import { FiLogOut } from "react-icons/fi";
import { TbMapSearch, TbSoccerField } from "react-icons/tb";

import "./Header.css";

const Header = () => {
  const refLabel = useRef([]);
  const refIcon = useRef([]);

  const pushRefLabel = useCallback((el) => refLabel.current.push(el))
  const pushRefIcon = useCallback((el) => refIcon.current.push(el))

  useEffect(() => {
    for(let i=0 ; i<refIcon.current.length; i++)
      refLabel.current[i].style.left = 
          (Math.round(refIcon.current[i].clientWidth/2) - Math.round(refLabel.current[i].clientWidth/2)) + "px";
  }, []);

  return (
    <header className="header" >
      <div className="header-logo">SoccerVio</div>
      <nav className="menu">
        <div className="menu-item" ref={pushRefIcon}>
          <BiHome className="menu-icon"/>
          <span className="menu-label" ref={pushRefLabel}>Home</span>
        </div>
        <div className="menu-item" ref={pushRefIcon}>
          <BiCalendar className="menu-icon"/>
          <span className="menu-label" ref={pushRefLabel}>Reservations</span>
        </div>
        <div className="menu-item" ref={pushRefIcon}>
          <TbSoccerField className="menu-icon" />
          <span className="menu-label" ref={pushRefLabel}>Stades</span>
        </div>
        <div className="menu-item" ref={pushRefIcon}>
          <TbMapSearch className="menu-icon" />
          <span className="menu-label" ref={pushRefLabel}>Searches</span>
        </div>

        {/*<BiUser className="menu-icon" />
        <MdOutlineReportProblem className="menu-icon" />
        <TfiAnnouncement className="menu-icon" />*/}
      </nav>
      <div className="header-rightSide">
        <div className="header-authUser">
          <img src="/images/userImage.jpg" className="header-imgUser" />
          <span className="header-nameUser">Krach achraf</span>
        </div>
        <div className="menu-item notif-item" ref={pushRefIcon}>
          <MdNotifications className="header-notifIcon menu-icon" />
          <span className="menu-label" ref={pushRefLabel}>Notifications</span>
        </div>
        <div className="menu-item" ref={pushRefIcon}>
          <FiLogOut className="header-logoutIcon menu-icon" />
          <span className="menu-label" ref={pushRefLabel}>Logout</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
