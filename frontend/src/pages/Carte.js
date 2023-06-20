import { useEffect, useState } from "react";
import { getData, url_server  } from "../lib/api";
import { Outlet, Link } from "react-router-dom";
import './Carte.css'


const Carte = () => {

  const [plats, setPlats] = useState([]);
  const [categories, setCategories] = useState([]);
  const [carte, setCarte] = useState({})


  useEffect(() => {

    getData('article/carte')
      .then(result => {
        console.log(result)
        setCarte(result);
      })
      .catch(error => {
        console.log("An error occurred while fetching menu data:", error);
      });

    getData('plats')
      .then(result => {
        setPlats(result);
      })
      .catch(error => {
        console.log("An error occurred while fetching menu data:", error);
      });
    getData('categories')
      .then(result => {
        setCategories(result);
      })
      .catch(error => {
        console.log("An error occurred while fetching menu data:", error);
      });
  }, []);

  return (
    <>
      <section className="container_couvertureCarte">
        <img className="img_couvertureCarte" src={url_server + carte.url_picture} />
        <h1 className="title_couvertureCarte">{carte.title}</h1>
      </section>
      <section className="container_plats">
        {categories.map(item => (
          <div className="categories" key={item.categorie_id}>
            <h2 className="title_categories">{item.name}</h2>
            {plats
              .filter(plat => plat.categorie_id == item.categorie_id)
              .map(plat => (
                <ul className="plats" key={plat.plat_id}>
                  <div className="prix_titleCarte">
                    <li className="title_platsCarte">{plat.name}</li>
                    <li className="prix_platsCarte">{plat.price + '€'}</li>
                  </div>
                  <li className="content_platsCarte">{plat.description}</li>
                </ul>
              ))}
          </div>
        ))}

      </section>
      <div className="container_button">
          <button className="btn_decouvrirNotreCarte">
                <Link to="/menu">Découvrez notre menu</Link>
              </button>
    </div>
    </>
  );


};

export default Carte;