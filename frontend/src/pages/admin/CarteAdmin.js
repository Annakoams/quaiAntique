import { useEffect, useState } from "react";
import { getData, url_server } from "../../lib/api"
import btnAjouter from "../images/btn_ajouter.jpg"
import btnModifier from "../images/btn_modifier.jpeg"
import btnTrash from "../images/trash_icons.png"
import btnEnregistre from "../images/btn_enregisre.png"
import btnFlecheHaut from "../images/btn_FlecheHaut.png"
import btnFlecheBas from "../images/btn_FlecheBas.png"
import "../admin/CarteAdmin.css";



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
            <p className="intitule">COUVERTURE</p>
            <section className="section_Carte">
                <div className="container_couvertureCarte ">
                    <div className="container_image">
                        <img className="img_couvertureCarte" src={url_server + carte.url_picture} />
                        <div className="btn_modifierImage">
                            <img className="btnAjouter" src={btnAjouter} />
                            <p className="textModifier_image">modifier l'image</p>
                        </div>
                    </div>
                    <div className="title_couvertureCarteAdmin">{carte.title}</div>
                    <div className="navigation_Admin">
                        <img className="btnModifier" src={btnModifier} />
                        <img className="btnTrash" src={btnTrash} />
                        <img className="btnEnregiste" src={btnEnregistre} />
                        <div className="navigation_fleches">
                            <img className="btnFleche" src={btnFlecheHaut} />
                            <img className="btnFleche" src={btnFlecheBas} />
                        </div>
                    </div>

                </div>

            </section>
            <p className="intitule">PLATS</p>
            <section className="section_Admin">
                {categories.map(item => (
                    <div className="categories_admin" key={item.categorie_id}>
                        <h2 className="title_categories">{item.name}</h2>
                        {plats
                            .filter(plat => plat.categorie_id == item.categorie_id)
                            .map(plat => (

                                <div className="platsAdmin" key={plat.id}>
                                    <div className="content_title">
                                        <div className="title_plats">{plat.name}</div>
                                        <div className="content_plats">{plat.description}</div>
                                    </div>
                                    <div className="prix_plats">{plat.price + '€'}</div>
                                    <div className="navigation_Admin">
                                        <img className="btnModifier" src={btnModifier} />
                                        <img className="btnTrash" src={btnTrash} />
                                        <img className="btnEnregiste" src={btnEnregistre} />
                                        <div className="navigation_fleches">
                                            <img className="btnFleche" src={btnFlecheHaut} />
                                            <img className="btnFleche" src={btnFlecheBas} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                ))}

            </section></>
    );


};

export default Carte;