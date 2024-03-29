import { useEffect, useState } from "react";
import { getData, url_server } from "../lib/api";
import { Outlet, Link } from "react-router-dom";
import './Menu.css'

const Menu = () => {

  const [menus, setMenus] = useState([]);
  const [cover, setCover] = useState({})

  useEffect(() => {
    
    getData('article/menu')
    .then(result => {
      setCover(result);
      
    })

    getData('menus')
      .then(result => {
        setMenus(result);
        
      })
      .catch(error => {
        console.log("An error occurred while fetching menu data:", error);
      });
  }, []);

  return (
    <>
    <section className="container_couvertureMenu">
      
          <img className="img_couvertureMenu" src={url_server + cover.url_picture} />
          <h1 className="title_couvertureMenu">{cover.title}</h1>
      

    </section>

    <section className="container_menu">
        {menus.map(item => (
          <ul className="menu" key={item.menu_id}>
            <li className="title_prix">
              <h1 className="title_menu">{item.name}</h1>
              <div className="price_menu">{item.price + "€"}</div>
            </li>
            <li className="content_menu">{item.description}</li>
            <li className="explication_asterisque">au choix parmis les plats notés d'un Astérisque (*)</li>

          </ul>
        ))}
      </section>
      <div className="container_button">
          <button className="btn_reserverVotreTable">
          <Link to="/reservation">Réserver votre table</Link>
              </button>
    </div>
      
      
      
      
      </>
  );
};

export default Menu;
