import { useEffect, useState } from "react";
import { getData, url_server  } from "../lib/api";
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
                <ul className="plats" key={plat.id}>
                  <div className="prix_title">
                    <li className="title_plats">{plat.name}</li>
                    <li className="prix_plats">{plat.price + '€'}</li>
                  </div>
                  <li className="content_plats">{plat.description}</li>
                </ul>
              ))}
          </div>
        ))}

      </section></>
  );


};

export default Carte;