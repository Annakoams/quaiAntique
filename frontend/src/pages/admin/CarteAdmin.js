import { useEffect, useState } from "react";
import { getData, url_server, putData } from "../../lib/api"
import { IconAdd, IconEdit, IconDelete, IconSave, IconDown, IconUp, IconCancel } from "../../lib/icons";
import "../admin/CarteAdmin.css";



const Carte = () => {

    const [plats, setPlats] = useState([]);
    const [categories, setCategories] = useState([]);
    const [carte, setCarte] = useState({})
    const [blnEditCarte, setBlnEditCarte] = useState(false)
    


    const EditCarte = () => {}

        const saveCarte = async () => {

            carte.title = document.getElementById('carte_title').value;
          
             await  putData('article/carte',{ title : carte.title } )
          
              setCarte({...carte });
              setBlnEditCarte(false);
    }

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
            <p className="intituleAdmin">COUVERTURE</p>
            <section className="section_CarteAdmin">
                <div className="container_couvertureCarteAdmin ">
                    <div className="container_imageAdmin">
                        <img className="img_couvertureCarteAdmin" src={url_server + carte.url_picture} />
                        <div className="btn_modifierImageAdmin">
                            {
                                blnEditCarte ?
                                <><IconAdd onClick={() => EditCarte(carte)} />
                            <p className="textModifier_imageAdmin">modifier l'image</p> </> : <></>

                            }
                        </div>
                    </div>
                    { blnEditCarte ?
                    <textarea className="title_couvertureCarteAdmin"  defaultValue={carte.title}  id="carte_title">

                    </textarea> :
                    <div className="title_couvertureCarteAdmin">{carte.title}
                        </div>
                        }

                    <div className="navigation_Admin">
                    { !blnEditCarte ?   <IconEdit onClick={() => setBlnEditCarte(true)} />
          :
          <><IconSave onClick={() => saveCarte(carte)} />
          <IconCancel className="text-danger" onClick={() => setBlnEditCarte(false)} />
          </>
}
                
                        <div className="navigation_flechesAdmin">
                            <IconUp />
                            <IconDown />
                        </div>
                    </div>

                </div>

            </section>
            <p className="intituleAdmin">PLATS</p>
            <section className="section_Admin">
                {categories.map(item => (
                    <div className="categories_adminAdmin" key={item.categorie_id}>
                        <h2 className="title_categoriesAdmin">{item.name}</h2>
                        {plats
                            .filter(plat => plat.categorie_id == item.categorie_id)
                            .map(plat => (

                                <div className="platsAdmin" key={plat.id}>
                                    <div className="content_titleAdmin">
                                        <div className="title_platsAdmin">{plat.name}</div>
                                        <div className="content_platsAdmin">{plat.description}</div>
                                    </div>
                                    <div className="prix_platsAdmin">{plat.price + '€'}</div>
                                    <div className="navigation_Admin">
                                    <input className="input_active" type="checkbox" checked={item.active == 1}/>
                                        <IconEdit onClick={() => EditCarte(carte)} />
                                        <IconDelete onClick={() => EditCarte(carte)} />
                                        <IconSave onClick={() => EditCarte(carte)} />
                                        <div className="navigation_flechesAdmin">
                                            <IconUp  onClick={() => EditCarte(carte)}/>
                                            <IconDown  onClick={() => EditCarte(carte)}/>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                ))}

            </section>
            <p className="intituleAdmin">Ajouter une novelle Carte</p>
            <section className="section_CarteAdmin">
                <div >
                    <div className="btn_ajouterImageAdmin">
                        <IconAdd onClick={() => EditCarte(carte)}/>
                        <p className="textAjouter_Admin">Ajouter un noveau Menu</p>
                    </div>
                    <div className="inputs_ajouterCarteAdmin">
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

export default Carte;