import { useEffect, useState } from "react";
import { postData, getData, url_server, putData, postFormData  } from "../../lib/api";
import Uploadfile from "../../components/uploadfile";
import { IconAdd, IconEdit, IconDelete, IconSave, IconDown, IconUp, IconCancel } from "../../lib/icons";
import "../admin/MenuAdmin.css";
// import "../admin/Commun.module.css";

const Menu = () => {

    
    const [menu, setMenu] = useState({})
    const [blnEditCoverMenu,setBlnEditCoverMenu ] = useState(false)
    const [menuPicture, setMenuPicture] = useState(null)
    const [menuFilePicture, setFileMenuPicture] = useState(null)


    const [menus, setMenus] = useState([]);
    const [blnEditMenus, setBlnEditMenus] = useState([])
   

////////////////////////////////////////////////////////////////////////////////////
    // gestion des menus
    const toggleEditMenu =(i)=>{
        blnEditMenus[i]= !blnEditMenus[i];
        console.log(blnEditMenus);
        setBlnEditMenus(blnEditMenus.map((el)=>el));
    }

    const saveMenus = async (index) => {
       

        menus[index].name = document.getElementById('title_menus' + index).value;
        menus[index].description = document.getElementById('content_menus' + index).value;
        menus[index].price = document.getElementById('price_menus' + index).value;


        const formData = new FormData();


         let data= { name: menus[index].name , description: menus[index].description, price: menus[index].price};

        var result = await postData('menus/' + menus[index].menu_id, data);

        if ( result &&  result.menu);
         menus[index]= result.menu;
        setMenus(menus.map((elv) => elv));

        blnEditMenus[index] = false;
        console.log(blnEditMenus)
        setBlnEditMenus(blnEditMenus.map((els)=>els));
        
    }
////////////////////////////////////////////////////////////////////////////////////


const saveCoverMenu = async () => {

    menu.title = document.getElementById('menu_title').value;

    const formData = new FormData();
    if (menuFilePicture) {
        formData.append('picture', menuFilePicture);
    }

    formData.append('article', JSON.stringify({ title: menu.title }));

    var result = await postFormData('article/menu', formData);
    if (result && result.article) setMenu(result.article);

    setFileMenuPicture(null);
    setMenuPicture(null);
    setBlnEditCoverMenu(false);

}

    useEffect(() => {

        getData('article/menu')
            .then(result => {
                setMenu(result);

            })
            .catch(error => {
                console.log("An error occurred while fetching menu data:", error);
            });

        getData('menus')
            .then(result => {
                setMenus(result);
                let blnArrayMenus =[];
                result.forEach(element =>{
                    blnArrayMenus.push(false)
                })
                console.log(blnArrayMenus);
                setBlnEditMenus(blnArrayMenus);
                blnEditMenus(false);

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
                            {blnEditCoverMenu ? 
                               <><Uploadfile setSelectedFile={setFileMenuPicture}   setPreviewPicture={setMenuPicture} /></> : <></>
                            }
                        </div>
                    </div>
                    {blnEditCoverMenu ?
                    <textarea className="title_couvertureMenuAdmin" defaultValue={menu.title} id="menu_title">
                    </textarea>
                    :
                    <div className="title_couvertureMenuAdmin">{menu.title}</div>
                    }
                    <div className="navigation_Admin">
                    
                    {!blnEditCoverMenu ? 
                    
                    <IconEdit onClick={() => setBlnEditCoverMenu(true)} />
                            :
                            <><IconSave onClick={() => saveCoverMenu(menu)} />
                                <IconCancel className="text-danger" onClick={() => setBlnEditCoverMenu(false)} />
                            </>
                        }
                    </div>
                </div>
            </section>


            <p className="intituleAdmin">MENUS</p>
            <section className="section_MenuAdmin">
                {menus.map((menu, i) => (
                    <div className="menuAdmin" key={menu.menu_id}>
                        <div className="content_titleAdminMenu">
                            {blnEditMenus[i] ?
                                <>
                                    <textarea className="title_menuAdmin" defaultValue={menu.name} id={'title_menus' + i}></textarea>
                                    <textarea className="content_menuAdmin" defaultValue={menu.description} id={'content_menus' + i}></textarea>
                                </>
                                :
                                <>
                                    <div className="title_menuAdmin">{menu.name}</div>
                                    <div className="content_menuAdmin">{menu.description}</div>
                                </>
                            }
                        </div>
                        {!blnEditMenus[i] ?
                            <div className="price_menuAdmin">{menu.price + "€"}</div>
                            :
                            <input className="price_menuAdmin" defaultValue={menu.price + "€"} id={'price_menus' + i}></input>
                        }
                        <div className="navigation_Admin">
                        <input className="input_active" type="checkbox" disabled={!blnEditMenus[i]} defaultChecked={menu.active === 1}  id={"menus_checkbox" + i} />
                            {!blnEditMenus[i] ?
                            <IconEdit onClick={() => toggleEditMenu(i)} />
                            :
                            <>
                            <IconSave onClick={() => saveMenus(i)} />
                            <IconCancel className="text-danger" onClick={() => toggleEditMenu
                                (i)} />
                             <IconDelete/>
                            </>
                            }
                            {blnEditMenus[i] &&
                            <div className="navigation_flechesAdmin">
                            <IconUp />
                            <IconDown />
                            </div>
                            }
                        </div>
                    </div>
                ))}
            </section>
            <p className="intituleAdmin">Ajouter un noveau Menu</p>
</>
    );
};

export default Menu;
