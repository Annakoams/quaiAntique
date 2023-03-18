import { useEffect, useState } from "react";
import { getData, url_server, putData, postFormData  } from "../../lib/api";
import Uploadfile from "../../components/uploadfile";
import { IconAdd, IconEdit, IconDelete, IconSave, IconDown, IconUp, IconCancel } from "../../lib/icons";
import "../admin/MenuAdmin.css";

const Menu = () => {

    const [menus, setMenus] = useState([]);
    const [menu, setMenu] = useState({})
    const [carte, setCarte] = useState({})
    const [blnEditMenu, setBlnEditMenu] = useState(false)
      const [menuPicture, setMenuPicture] = useState(null)
     const [menuFilePicture, setFileMenuPicture] = useState(null)

    const EditCarte = (carte) => {}

     const saveMenu = async () => {

        menu.title = document.getElementById('menu_title').value;


        const formData = new FormData();
        if (menuFilePicture) {
          formData.append('picture', menuFilePicture);
    
        }
        formData.append('article', JSON.stringify( { title: menu.title }));
        var result = await postFormData('article/menu', formData);
    if ( result &&  result.article )  setMenu(result.article);
        setFileMenuPicture(null);
        setMenuPicture(null);
        setBlnEditMenu(false);

    }
    

    useEffect(() => {

        getData('article/menu')
            .then(result => {
                setMenu(result);

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
            <p className="intituleAdmin">COUVERTURE</p>
            <section className="section_MenuAdmin">
                <div className="container_couvertureMenuAdmin ">
                    <div className="container_imageAdmin">
                        <img className="img_couvertureMenuAdmin" src={menuPicture ?? url_server + menu.url_picture} />
                        <div className="btn_modifierImageAdmin">
                            {
                               blnEditMenu ? 
                               <><Uploadfile setSelectedFile={setFileMenuPicture}   setPreviewPicture={setMenuPicture} /></> : <></>

                            }
                        </div>
                    </div>
                    {blnEditMenu ?
                    <textarea className="title_couvertureMenuAdmin" defaultValue={menu.title} id="menu_title">

                    </textarea>:

                    <div className="title_couvertureMenuAdmin">{menu.title}</div>

                    }
                    <div className="navigation_Admin">
                    
                    {!blnEditMenu ? <IconEdit onClick={() => setBlnEditMenu(true)} />
                            :
                            <><IconSave onClick={() => saveMenu(menu)} />
                                <IconCancel className="text-danger" onClick={() => setBlnEditMenu(false)} />
                            </>
                        }
                    </div>
                </div>
            </section>


            <p className="intituleAdmin">MENUS</p>
            <section className="section_MenuAdmin">
                {menus.map(item => (

                    <div className="menuAdmin" key={item.menu_id}>
                        <div className="content_titleAdmin">
                            <div className="title_menuAdmin">{item.name}</div>
                            <div className="content_menuAdmin">{item.description}</div>
                        </div>
                        <div className="price_menuAdmin">{item.price + "€"}</div>
                        <div className="navigation_Admin">
                            <input className="input_active" type="checkbox" defaultChecked={item.active == 1}/>
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
