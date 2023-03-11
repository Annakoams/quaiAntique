import React, { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import "./Layout.css";
import logo from "./images/logo.png";
import logoFooter from "./images/logoFooter.png"
import Hamburger from 'hamburger-react';

const Layout = () => {
  const [fix, setFix] = useState(false);
 const [isMobile, setIsMobile] = useState(false)
  // navbar fixe
  const setFixed = () => {
    if (window.scrollY >= 392) {
      setFix(true);
    } else {
      setFix(false);
    }
  };

  useEffect(() => {
    setLargeur(window.innerWidth);
    if (window.innerWidth > 980) {
      setToggleMenu(true);
      setIsMobile(false)
    }
    window.addEventListener("scroll", setFixed);
    return () => {
      window.removeEventListener("scroll", setFixed);
    };
    
  }, );

  // menu hamburger
  const [isOpen, setOpen] = useState(false);

  // toggle
  const [toggleMenu, setToggleMenu] = useState(false);
  const [largeur, setLargeur] = useState(window.innerWidth);

  const toggleNavSmallScreen = () => {
    setToggleMenu(!toggleMenu);
  };

  // ouvrir et fermer le burger
  useEffect(() => {
    const changeWidth = () => {
      setLargeur(window.innerWidth);
      if (window.innerWidth > 980) {
        setToggleMenu(true);
        setIsMobile(false)
        
      }else{
        setToggleMenu(false);
        setIsMobile(true)
      }
    };

    window.addEventListener("resize", changeWidth);

    return () => {
      window.removeEventListener("resize", changeWidth);
    };
  }, []);

  return (
    <>
      <nav>
        <div className="container_navbar">
          <img className="logo" src={logo} alt="logo de quai d'antique" />

          {/* short circuit operator */}
          {toggleMenu && (
            <div className="container-liste">
              <ul className="liste">
                {/* Ajout d'un "key" unique pour chaque élément de la liste */}
                <li className="item nav-item" key="home">
                  <Link to="/">Home</Link>
                </li>
                <li className="item nav-item" key="carte">
                  <Link to="/carte">Carte</Link>
                </li>
                <li className="item nav-item" key="menu">
                  <Link to="/menu">Menu</Link>
                </li>
                <li className="item nav-item" key="reservation">
                  <Link to="/reservation">Reservation</Link>
                </li>
                <li className="item nav-item" key="homeAdmin">
                  <Link to="admin/HomeAdmin">HomeAdmin</Link>
                </li>
                <li className="item nav-item" key="carteAdmin">
                  <Link to="admin/CarteAdmin">Carte</Link>
                </li>
                <li className="item nav-item" key="menuAdmin">
                  <Link to="admin/MenuAdmin">Menu</Link>
                </li>
                <li >
                <button className="btn_connectez"
                  onClick={toggleNavSmallScreen} key="connection">
                  <Link to="/connection">Connectez-vous</Link>
                  </button>
                </li>
              </ul>

            </div>
          )}

          {/* Bouton hamburger */}
         {isMobile &&  <div>
            <Hamburger  className="hamburger"  color="#BC9800" direction="right" toggled={toggleMenu} toggle={setToggleMenu} />
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
            <li className="horaires">NOS HORAIRES D’OUVERTURE</li>
            <li>Tel : 01 48 54 72 25</li>
        </ul>
        {/* <h6>Une visite s’impose</h6>
        <h7>QUAI ANTIQUE, le nouveau restaurant gastronomique sacoyarde à Chambéry</h7>
        <h7 className="">NOS HORAIRES D’OUVERTURE</h7>
        <h7>Tel : 01 48 54 72 25</h7> */}
        </div>

      </footer>
    </>
  );
};

export default Layout;
