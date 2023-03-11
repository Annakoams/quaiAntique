import { useEffect, useState } from "react";
import { getData, url_server } from "../../lib/api";
import btnAjouter from "../images/btn_ajouter.jpg"
import btnModifier from "../images/btn_modifier.jpeg"
import btnTrash from "../images/trash_icons.png"
import btnEnregistre from "../images/btn_enregisre.png"
import btnFlecheHaut from "../images/btn_FlecheHaut.png"
import btnFlecheBas from "../images/btn_FlecheBas.png"
import "../admin/MenuAdmin.css";

const Menu = () => {

    const [menus, setMenu] = useState([]);
    const [cover, setCover] = useState({})

    useEffect(() => {

        getData('article/menu')
            .then(result => {
                setCover(result);

            })

        getData('menus')
            .then(result => {
                setMenu(result);

            })
            .catch(error => {
                console.log("An error occurred while fetching menu data:", error);
            });
    }, []);

    return (
        <>
            <p className="intitule">COUVERTURE</p>
            <section className="section_Menu">
                <div className="container_couvertureMenu ">
                    <div className="container_image">
                        <img className="img_couvertureMenu" src={url_server + cover.url_picture} />
                        <div className="btn_modifierImage">
                            <img className="btnAjouter" src={btnAjouter} />
                            <p className="textModifier_image">modifier l'image</p>
                        </div>
                    </div>
                    <div className="title_couvertureMenuAdmin">{cover.title}</div>
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


            <p className="intitule">MENUS</p>
            <section className="section_Menu">
                {menus.map(item => (

                    <div className="menuAdmin" key={item.id}>
                        <div className="content_title">
                            <div className="title_menu">{item.name}</div>
                            <div className="content_menu">{item.description}</div>
                        </div>
                        <div className="price_menu">{item.price + "€"}</div>
                        <div className="navigation_Admin">
                            <img className="btnModifier" src={btnModifier} />
                            <img className="btnTrash" src={btnTrash} />
                            <img className="btnEnregiste" src={btnEnregistre} />
                            <div className="navigation_fleches">
                                <img className="btnFleche" src={btnFlecheHaut} />
                                <img className="btnFleche" src={btnFlecheBas} />
                            </div>
                        </div>
                        <div>
                        <div className="btn_modifierImage">
                            <img className="btnAjouter" src={btnAjouter} />
                            <p className="textModifier_image">Ajouter un noveau Menu</p>
                        </div>
                        </div>

                        </div>
                ))}
            </section></>
    );
};

export default Menu;
