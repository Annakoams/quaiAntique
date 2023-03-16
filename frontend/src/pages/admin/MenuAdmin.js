import { useEffect, useState } from "react";
import { getData, url_server } from "../../lib/api";
import btnAjouter from "../images/btn_ajouter.jpg"
import btnModifier from "../images/btn_modifier.jpeg"
import btnTrash from "../images/trash_icons.png"
import btnEnregistre from "../images/btn_enregisre.png"
import btnFlecheHaut from "../images/btn_FlecheHaut.png"
import btnFlecheBas from "../images/btn_FlecheBas.png"
import { IconAdd, IconEdit, IconDelete, IconSave, IconDown, IconUp } from "../../lib/icons";
import "../admin/MenuAdmin.css";

const Menu = () => {

    const [menus, setMenu] = useState([]);
    const [cover, setCover] = useState({})
    const [carte, setCarte] = useState({})

    const EditCarte = (carte) => {
        alert("Edit Carte")
    }

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
            <p className="intituleAdmin">COUVERTURE</p>
            <section className="section_MenuAdmin">
                <div className="container_couvertureMenuAdmin ">
                    <div className="container_imageAdmin">
                        <img className="img_couvertureMenuAdmin" src={url_server + cover.url_picture} />
                        <div className="btn_modifierImageAdmin">
                            <IconAdd onClick={() => EditCarte(carte)}/>
                            <p className="textModifier_imageAdmin">modifier l'image</p>
                        </div>
                    </div>
                    <div className="title_couvertureMenuAdmin">{cover.title}</div>
                    <div className="navigation_Admin">
                    
                        <IconEdit onClick={() => EditCarte(carte)} />
                        <IconDelete onClick={() => EditCarte(carte)} />
                        <IconSave onClick={() => EditCarte(carte)} />
                        <div className="navigation_flechesAdmin">
                            <IconUp />
                            <IconDown />
                        </div>
                    </div>
                </div>
            </section>


            <p className="intituleAdmin">MENUS</p>
            <section className="section_MenuAdmin">
                {menus.map(item => (

                    <div className="menuAdmin" key={item.id}>
                        <div className="content_titleAdmin">
                            <div className="title_menuAdmin">{item.name}</div>
                            <div className="content_menuAdmin">{item.description}</div>
                        </div>
                        <div className="price_menuAdmin">{item.price + "€"}</div>
                        <div className="navigation_Admin">
                            <input className="input_active" type="checkbox" checked={item.active == 1}/>
                            <IconEdit onClick={() => EditCarte(carte)} />
                            <IconDelete onClick={() => EditCarte(carte)} />
                            <IconSave onClick={() => EditCarte(carte)} />
                            <div className="navigation_flechesAdmin">
                                <IconUp />
                                <IconDown />
                              
                            </div>
                        </div>

                    </div>

                ))}
            </section>
            <p className="intituleAdmin">Ajouter un noveau Menu</p>
            <section className="section_MenuAdmin">
                <div className="ajouter_menuAdmin">
                    <div className="btn_ajouterImageAdmin">
                        <IconAdd/>
                        <p className="textAjouter_Admin">Ajouter un noveau Menu</p>
                    </div>
                    <div className="inputs_ajouterMenuAdmin">
                        <input className="categorie"  placeholder="Choisiser le categorie" type="text" />
                        <input className="title" placeholder="Saisissez le titre du plat le categorie"  type="text" />
                        <input className="description" placeholder="Decrire le plats"  type="text" />
                        <input className="prix" placeholder="Prix"  type="text" />
                       
                    </div>
                    <div className="input_ajouterIconsAdmin">
                    <IconSave  onClick={() => EditCarte(carte)} />
                    </div>
                    
                </div>



            </section></>
    );
};

export default Menu;
