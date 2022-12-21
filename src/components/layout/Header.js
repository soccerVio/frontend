import React, { useCallback, useEffect, useRef } from "react";
import { BiHome, BiCalendar /*, BiUser*/ } from "react-icons/bi";
import { /*MdOutlineReportProblem,*/ MdNotifications } from "react-icons/md";
//import { TfiAnnouncement } from "react-icons/tfi";
import { FiLogOut } from "react-icons/fi";
import { TbMapSearch, TbSoccerField } from "react-icons/tb";
import "./Header.css";
import { Outlet, useNavigate } from "react-router-dom";
import { isLogged, userInfo } from "../../constants/user";

const Header = () => {
  const refLabel = useRef([]);
  const refIcon = useRef([]);
  const navigate = useNavigate();
  const user = userInfo();
  const pushRefLabel = useCallback((el) => refLabel.current.push(el), []);
  const pushRefIcon = useCallback((el) => refIcon.current.push(el), []);

  useEffect(() => {
    if (!isLogged()) navigate("/");
    else
      for (let i = 0; i < refIcon.current.length; i++)
        refLabel.current[i].style.left =
          Math.round(refIcon.current[i].clientWidth / 2) -
          Math.round(refLabel.current[i].clientWidth / 2) +
          "px";
  }, [navigate]);

  const logout = useCallback(() => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  }, [navigate]);

  return (
    <>
      <header className="header">
        <div className="header-logo">SoccerVio</div>
        <nav className="menu">
          <div
            className="menu-item"
            ref={pushRefIcon}
            onClick={() => navigate("/accueil")}
          >
            <BiHome className="menu-icon" />
            <span className="menu-label" ref={pushRefLabel}>
              Accueil
            </span>
          </div>
          {/*<div className="menu-item" ref={pushRefIcon}>
          <BiCalendar className="menu-icon" />
          <span className="menu-label" ref={pushRefLabel}>
            Reservations
          </span>
  </div>*/}
          <div
            className="menu-item"
            ref={pushRefIcon}
            onClick={() => navigate("/terrains")}
          >
            <TbSoccerField className="menu-icon" />
            <span className="menu-label" ref={pushRefLabel}>
              Terrains
            </span>
          </div>
          {/*<div className="menu-item" ref={pushRefIcon}>
          <TbMapSearch className="menu-icon" />
          <span className="menu-label" ref={pushRefLabel}>
            Recherches
          </span>
</div>*/}

          {/*<BiUser className="menu-icon" />
        <MdOutlineReportProblem className="menu-icon" />
        <TfiAnnouncement className="menu-icon" />*/}
        </nav>
        <div className="header-rightSide">
          <div className="header-authUser">
            {user.image ? (
              <img
                src={`data:${user.image.type};base64,${user.image.content}`}
                className="header-imgUser"
                alt="profil pic"
              />
            ) : (
              <img
                src="/images/userImage.jpg"
                className="header-imgUser"
                alt="profil pic"
              />
            )}
            <span className="header-nameUser">{user.nomComplet}</span>
          </div>
          <div className="menu-item notif-item" ref={pushRefIcon}>
            <MdNotifications className="header-notifIcon menu-icon" />
            <span className="menu-label" ref={pushRefLabel}>
              Notifications
            </span>
          </div>
          <div className="menu-item" ref={pushRefIcon} onClick={logout}>
            <FiLogOut className="header-logoutIcon menu-icon" />
            <span className="menu-label" ref={pushRefLabel}>
              Quitter
            </span>
          </div>
        </div>
      </header>
      <Outlet />
    </>
  );
};

export default Header;
