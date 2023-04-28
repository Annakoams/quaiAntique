import { useEffect, useState } from "react";
import { postData, getData, url_server, putData, postFormData } from "../../lib/api";
import Uploadfile from "../../components/uploadfile";
import { IconAdd, IconEdit, IconDelete, IconSave, IconDown, IconUp, IconCancel } from "../../lib/icons";
import "../admin/CarteAdmin.css";



const Carte = () => {


    const [carte, setCarte] = useState({})
    const [blnEditCarte, setBlnEditCarte] = useState(false)
    const [cartePicture, setCartePicture] = useState(null)
    const [carteFilePicture, setFileCartePicture] = useState(null)

    const [categories, setCategories] = useState([]);

    const [plats, setPlats] = useState([]);
    const [blnEdithPlats, setBlnEdithPlats] = useState([])
    

    
////////////////////////////////////////////////////////////////////////////////
   // gestion ds plats

   const toggleEditPlats = (i) => {
    blnEdithPlats[i] = !blnEdithPlats[i];
    console.log(blnEdithPlats);
    setBlnEdithPlats(blnEdithPlats.map((el) => el));
}
    // Enregistrer les modifications apportées au plats
    const savePlats = async (index) => {
        // On récupère les valeurs des éléments HTML et on les stocke dans l'objet plats
        plats[index].name = document.getElementById('title_plats'+ index).value;
        plats[index].description = document.getElementById('content_plats'+ index).value;
        plats[index].price = document.getElementById('prix_plats' + index).value;


        // On crée un objet FormData qui sera utilisé pour l'envoi des données
        const formData = new FormData();

        // On ajoute les plats sous forme de chaîne JSON à l'objet FormData
        let data = { name: plats[index].name, description: plats[index].description, price: plats[index].price };

        // On envoie les données au serveur et on récupère le résultat
        var result = await postData('plats/' + plats[index].plat_id, data);

        // Si le résultat est valide et que les horaires ont été modifiés, on met à jour l'état de l'application
        if (result && result.plat)
        plats[index] = result.plat;
        setPlats(plats.map((elv) => elv));

        // On remet à zéro le mode d'édition des plats
        blnEdithPlats[index] = false;
        console.log(blnEdithPlats)
        setBlnEdithPlats(blnEdithPlats.map((els) => els));
    }

// /////////////////////////////////////////////////////////////////////////////////////
    const EditCarte = () => { }
    //// Gestion de la couverture

    const saveCarte = async () => {

        carte.title = document.getElementById('carte_title').value;

        const formData = new FormData();
        if (carteFilePicture) {
            formData.append('picture', carteFilePicture);
        }

        formData.append('article', JSON.stringify({ title: carte.title }));
        var result = await postFormData('article/carte', formData);

        if (result && result.article) setCarte(result.article);
        setFileCartePicture(null);
        setCartePicture(null);
        setBlnEditCarte(false);

    }

    ///////////////////////////////////////////////////////////////////////////////////////
 


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
                let blnArrayPlats = []
                result.forEach(element => {
                    blnArrayPlats.push(false)
                })
                console.log(blnArrayPlats);
                setBlnEdithPlats(blnArrayPlats);
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
                        <img className="img_couvertureCarteAdmin" src={cartePicture ?? url_server + carte.url_picture} />
                        <div className="btn_modifierImageAdmin">
                            {blnEditCarte ?
                                <><Uploadfile setSelectedFile={setFileCartePicture} setPreviewPicture={setCartePicture} /></> : <></>
                            }
                        </div>
                    </div>
                    {blnEditCarte ?
                        <textarea className="title_couvertureCarteAdmin" defaultValue={carte.title} id="carte_title">
                        </textarea>
                        :
                        <div className="title_couvertureCarteAdmin">{carte.title}
                        </div>
                    }
                    <div className="navigation_Admin">
                        {!blnEditCarte ?
                            <IconEdit onClick={() => setBlnEditCarte(true)} />
                            :
                            <>
                            <IconSave onClick={() => saveCarte(carte)} />
                            <IconCancel className="text-danger" onClick={() => setBlnEditCarte(false)} />
                            </>
                        }

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
                            .map((plat, i) => (
                                <div className="platsAdmin" key={plat.plat_id}>
                                    <div className="">
                                        <div className="content_titleAdminCarte">
                                            {blnEdithPlats[i] ?
                                                <>
                                                    <textarea className="title_platsAdmin" defaultValue={plat.name} id={"title_plats" + i} ></textarea>
                                                    <textarea className="content_platsAdmin" defaultValue={plat.description} id={"content_plats" + i}></textarea>
                                                </>
                                                :
                                                <>
                                                    <div className="title_platsAdmin">{plat.name}</div>
                                                    <div className="content_platsAdmin">{plat.description}</div>
                                                </>
                                            }
                                        </div>
                                    </div>
                                    {
                                        !blnEdithPlats[i] ?
                                            <div className="prix_platsAdmin">{plat.price + '€'} </div>
                                            :
                                            <input className="prix_platsAdmin" defaultValue={plat.price + '€'} id={"prix_plats" + i}></input>
                                    }
                                    <div className="navigation_Admin">
                                        <input className="input_active" type="checkbox" disabled={!blnEdithPlats[i]} defaultChecked={plat.active === 1}  id={"plats_checkbox" + i} />
                                        {!blnEdithPlats[i] ?
                                            <IconEdit onClick={() => toggleEditPlats(i)} />
                                            :
                                            <>
                                                <IconSave onClick={() => savePlats(i)} />
                                                <IconCancel className="text-danger" onClick={() => toggleEditPlats(i)} />
                                                <IconDelete />
                                            </>
                                        }
                                        {blnEdithPlats[i] &&
                                            <div className="navigation_flechesAdmin">
                                                <IconUp />
                                                <IconDown />
                                            </div>
                                        }
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
                        <IconAdd onClick={() => EditCarte(carte)} />
                        <p className="textAjouter_Admin">Ajouter un noveau Menu</p>
                    </div>
                    <div className="inputs_ajouterCarteAdmin">
                        <input className="categorie" placeholder="Choisiser le categorie" type="text" />
                        <input className="title" placeholder="Saisissez le titre du plat le categorie" type="text" />
                        <input className="description" placeholder="Decrire le plats" type="text" />
                        <input className="prix" placeholder="Prix" type="text" />
                    </div>
                    <div className="input_ajouterIconsAdmin">
                        <IconSave onClick={() => EditCarte(carte)} />
                    </div>

                </div>
            </section></>
    );
};

export default Carte;