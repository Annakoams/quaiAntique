import React, { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { getData, url_server } from "../lib/api";
import "./Layout.css";
import logo from "./images/logo.png";
import logoFooter from "./images/logoFooter.png"
import Hamburger from 'hamburger-react';
import { useNavigate } from "react-router-dom";



const daysweek = { "lundi": 1, "mardi": 2, "mercredi": 3, "jeudi": 4, "vendredi": 5, "samedi": 6, "dimanche": 0 };

const Layout = ({ user, setUser }) => {
  const navigate = useNavigate();

  const [fix, setFix] = useState(false);
  const [isMobile, setIsMobile] = useState(!(window.innerWidth > 980));
  const [adminMode, setAdminMode] = useState(false);
  const [schedules, setSchedules] = useState([]);
  const [horaires, setHoraires] = useState(false);
  // menu hamburger
  const [isOpen, setOpen] = useState(false);

  // toggle
  const [toggleMenu, setToggleMenu] = useState((window.innerWidth > 980));
  const [largeur, setLargeur] = useState(window.innerWidth);

  // navbar fixe
  // const setFixed = () => {
  //   if (window.scrollY >= 392) {
  //     setFix(true);
  //   } else {
  //     setFix(false);
  //   }
  // };

  const logOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setAdminMode(false);
    setUser(null);
    toggleNavSmallScreen();
    navigate("/");
  }

  useEffect(() => {
     // navbar fixe
  const setFixed = () => {
    if (window.pageYOffset >= 392) {
      setFix(true);
    } else {
      setFix(false);
    }
  };

    getData('schedules').then((result) => {
      setSchedules(result)
      return
    })

    setLargeur(window.innerWidth);
    if (window.innerWidth > 980) {
      setToggleMenu(true);
      setIsMobile(false)
    }
    
    window.addEventListener("scroll", setFixed);
    return () => {
    window.removeEventListener("scroll", setFixed);
    };

  }, [user]);




  const toggleNavSmallScreen = () => {
    setToggleMenu(!toggleMenu);
  };

  const changeWidth = () => {
    setLargeur(window.innerWidth);
    if (window.innerWidth > 980) {
      setToggleMenu(true);
      setIsMobile(false)

    } else {
      setToggleMenu(false);
      setIsMobile(true)
    }
  };

  // ouvrir et fermer le burger
  useEffect(() => {

    window.addEventListener("resize", changeWidth);
    return () => {
      window.removeEventListener("resize", changeWidth);
    };

    changeWidth();

  }, []);


const gotoHome = () => {

  navigate("/");
  changeWidth();
}

  return (
    <>
    {/* <nav className={`navbar ${fix ? 'fixed-nav' : ''}`}></nav> */}
      <nav >
        <div className="container_navbar">
       <img className="logo" src={logo} alt="logo de quai d'antique" onClick={gotoHome}  />
          {/* short circuit operator */}
          {toggleMenu && (
            <div className="container-liste">
              <ul className="liste">
                {!adminMode ?
                  <>
                    <li className="item nav-item" key="carte">
                      <Link to="/carte">Carte</Link>
                    </li>
                    <li className="item nav-item" key="menu">
                      <Link to="/menu">Menu</Link>
                    </li>
                    <li className="item nav-item" key="reservation">
                      <Link to="/reservation">Reservation</Link>
                    </li>
                    {user && user.user_type === "admin" ?
                        <div className="">
                          <li  >
                          <button className="rounded bg-light p-2 text-dark mb-sm-3 mb-lg-0  "
                        key="home" onClick={() => setAdminMode(true)}>Mode Admin</button>
                          </li>
                        </div> : <></>
                        }
                  </>
                  :
                  <> <li className="item nav-item" key="homeAdmin">
                    <Link to="admin/HomeAdmin">Home</Link>
                  </li>
                    <li className="item nav-item" key="carteAdmin">
                      <Link to="admin/CarteAdmin">Carte</Link>
                    </li>
                    <li className="item nav-item" key="menuAdmin">
                      <Link to="admin/MenuAdmin">Menu</Link>
                      
                    </li>
                    <li className="item nav-item" key="usersAdmin">
                      <Link to="admin/UsersAdmin">Users</Link>
                    </li>
                    <li className="item nav-item" key="resasAdmin">
                      <Link to="admin/ReservationsAdmin">Résas</Link>
                    </li>
                    <div>
                      <li >
                        <button className="rounded bg-light p-2 text-dark mb-sm-3 mb-lg-0 "
                        key="home" onClick={() => setAdminMode(false)}>Mode Normal</button>
                      </li>
                    </div>
                  </>
                }
                <li >
                  { 
                  user ?
                    <>
                      <button className="btn_connectez p-2"
                        key="home" onClick={logOut}>Deconnection, {user.name }</button>
                    </> :
                    <button className="btn_connectezModeNormal"
                      onClick={toggleNavSmallScreen} key="connection">
                      <Link to="/connection">Connectez-vous</Link>
                    </button>
                  }
                </li>
              </ul>

            </div>
          )}
          {/* Bouton hamburger */}
          {isMobile && <div>
            <Hamburger className="hamburger" color="#BC9800" direction="right" toggled={toggleMenu} toggle={setToggleMenu} />
          </div>}
        </div>
      </nav>
      <Outlet />
      <footer>
        <div className="container_footer">
          <img className="logoFooter" src={logoFooter} alt="logo de bas de la page quai d'antique" />
          <ul className="liste_footer">
            <li>Une visite s’impose</li>
            <li>QUAI ANTIQUE, le nouveau restaurant gastronomique sacoyarde à Chambéry</li>
            <li className="horaires" onClick={() => setHoraires(!horaires)} >NOS HORAIRES D’OUVERTURE</li>
            {schedules.filter(s => {
              if (horaires) return true;
              return daysweek[s.day] == (new Date()).getDay()
            }).map(schedule => {
              return (
                <div className="horaires_ouverture" key={schedule.schedule_id}>
                  <div className="tableau_horaires">
                    <div className="jours" >{schedule.day}</div>
                    <div className="horaires_OpenClose">
                      <div className="open_time" >{schedule.open_time}</div>
                      <div className="close_time" >{schedule.close_time}</div>
                    </div>
                    <div className="nb_clients" >{schedule.nb_max_clients}</div>
                  </div>
                </div>
              );
            })}
            <li>Tel : 01 48 54 72 25</li>
          </ul>
        </div>
      </footer>
    </>
  );
};

export default Layout;
