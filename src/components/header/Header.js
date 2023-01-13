import React, { useCallback, useEffect, useRef } from "react";
import { BiHome, BiCalendar /*, BiUser*/ } from "react-icons/bi";
import { /*MdOutlineReportProblem,*/ MdNotifications } from "react-icons/md";
import { TfiAnnouncement } from "react-icons/tfi";
import { FiLogOut } from "react-icons/fi";
import { TbMapSearch, TbSoccerField } from "react-icons/tb";
import "./Header.css";
import { Outlet, useNavigate } from "react-router-dom";
import { isJoueur, isLogged, userInfo } from "../../constants/user";
import { useState } from "react";
import { toast } from "react-toastify";

const Header = () => {
  const [notifications, setNotifications] = useState([]);

  const refLabel = useRef([]);
  const refIcon = useRef([]);
  const navigate = useNavigate();
  const user = userInfo();
  const pushRefLabel = useCallback((el) => refLabel.current.push(el), []);
  const pushRefIcon = useCallback((el) => refIcon.current.push(el), []);

  useEffect(() => {
    if (!isLogged()) navigate("/");
    else {
      let url =
        process.env.REACT_APP_BACKEND_BASE_URL +
        "notifications-push/" +
        user.id;
      const es = new EventSource(url);

      es.addEventListener("user-list-event", (event) => {
        const data = JSON.parse(event.data);
        if (data.length > 0) {
          setNotifications(data);
          for (let i = 0; i < data.length; i++) {
            toast(data[i].content, {
              position: "top-right",
              autoClose: 10000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        }
      });
      es.onerror = () => {
        es.close();
      };
      for (let i = 0; i < refIcon.current.length; i++)
        refLabel.current[i].style.left =
          Math.round(refIcon.current[i].clientWidth / 2) -
          Math.round(refLabel.current[i].clientWidth / 2) +
          "px";
      return () => {
        es.close();
      };
    }
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
          <div
            className="menu-item"
            ref={pushRefIcon}
            onClick={() => navigate("/reservations")}
          >
            <BiCalendar className="menu-icon" />
            <span className="menu-label" ref={pushRefLabel}>
              Reservations
            </span>
          </div>
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
          {isJoueur() && (
            <div
              className="menu-item"
              ref={pushRefIcon}
              onClick={() => navigate("/recherche")}
            >
              <TbMapSearch className="menu-icon" />
              <span className="menu-label" ref={pushRefLabel}>
                Recherches
              </span>
            </div>
          )}
          {isJoueur() && (
            <div
              className="menu-item"
              ref={pushRefIcon}
              onClick={() => navigate("/annonces")}
            >
              <TfiAnnouncement className="menu-icon" />
              <span className="menu-label" ref={pushRefLabel}>
                Annonces
              </span>
            </div>
          )}
        </nav>
        <div className="header-rightSide">
          <div
            className="header-authUser"
            onClick={() =>
              navigate("/profile", {
                state: {
                  id: userInfo().id,
                  forAuthUser: true,
                },
              })
            }
          >
            {user.image ? (
              <img
                src={user.image}
                className="header-imgUser"
                alt="profil pic"
              />
            ) : (
              <img
                src="/images/userImage.png"
                className="header-imgUser"
                alt="profil pic"
              />
            )}
            <span className="header-nameUser">{user.nomComplet}</span>
          </div>
          <div
            className="menu-item notif-item"
            ref={pushRefIcon}
            onClick={() => navigate("/notifications")}
          >
            <MdNotifications className="header-notifIcon menu-icon" />
            <span className="menu-label" ref={pushRefLabel}>
              Notifications
            </span>
            {notifications.length > 0 && (
              <span className="notifications-count">
                {notifications.length}
              </span>
            )}
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
