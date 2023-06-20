import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { postData, deleteData, getData, url_server, postFormData } from "../../lib/api";
import Uploadfile from "../../components/uploadfile";
import { IconAdd, IconEdit, IconDelete, IconSave, IconDown, IconUp, IconCancel } from "../../lib/icons";
import "../admin/CarteAdmin.css";
// import "../admin/Commun.module.css";



const Carte = () => {


    const [carte, setCarte] = useState({})
    const [blnEditCarte, setBlnEditCarte] = useState(false)
    const [cartePicture, setCartePicture] = useState(null)
    const [carteFilePicture, setFileCartePicture] = useState(null)

    const [categories, setCategories] = useState([]);
    

    const [plats, setPlats] = useState([]);
    const [blnEdithPlats, setBlnEdithPlats] = useState([])

 

const  listCategories = [ {categorie_id:1,name: 'Entrée' },
 {categorie_id:2,name : "Plat" },
 {categorie_id:3,name:"Dessert"}, 
 {categorie_id:4,name :"Spécialité Régionale"}];

    ////////////////////////////////////////////////////////////////////////////////
    // gestion ds plats

    const toggleEditPlats = (i) => {



        blnEdithPlats[i] = !blnEdithPlats[i];


            // Si le plat est à créer,alors on le supprimer du tableau
    if(  !blnEdithPlats[i] && !plats[i].plat_id )
    {
        setBlnEdithPlats(blnEdithPlats.filter((el,index) => i!=index));
        setPlats(plats.filter((el,index) => i!=index));
    }
     else{   console.log(blnEdithPlats); 
        setBlnEdithPlats(blnEdithPlats.map((el) => el));
     }
    }
    // Enregistrer les modifications apportées au plats
    const savePlats = async (index) => {
        // On récupère les valeurs des éléments HTML et on les stocke dans l'objet plats
        plats[index].name = document.getElementById('title_plats'+ index).value;
        plats[index].description = document.getElementById('content_plats'+ index).value;
        plats[index].price = document.getElementById('prix_plats' + index).value;
        plats[index].plats_checkbox =document.getElementById('plats_checkbox' +index).value


        // On crée un objet FormData qui sera utilisé pour l'envoi des données
      

         // On ajoute les plats sous forme de chaîne JSON à l'objet FormData MOI
         let data = { name: plats[index].name,categorie_id: plats[index].categorie_id,  description: plats[index].description, price: plats[index].price, active: plats[index].plats_checkbox=='on'?1:0  };
       if(!plats[index].plat_id){
        const result = await postData('plats/', data);
        if(result) setPlats (result)
       }else{
        const result = await postData('plats/' + plats[index].plat_id, data);
        if (result && result.plat){
            plats[index] = result.plat;
            setPlats(plats.map((elv) => elv));
        }
       };

        // On remet à zéro le mode d'édition des plats
        blnEdithPlats[index] = false;
        console.log(blnEdithPlats)
        setBlnEdithPlats(blnEdithPlats.map((els) => els));
    }

    // /////////////////////////////////////////////////////////////////////////////////////

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
    const swapOrder = (index, decalage) => {
        console.log('swapOrder', index, decalage)
        getData('plats/swap/' + plats[index].position + '/' + (plats[index + decalage].position)).then((result) => {
            result.sort((a, b) => {
                return a.position > b.position ? 1 : -1
            })
            setPlats(result)
            let blnArrayPlats = []
            result.forEach(element => {
                blnArrayPlats.push(false)
            });
            setBlnEdithPlats(blnArrayPlats);
        }).catch(error => {
            console.log("An error occurred while swapping plats:", error);
        });
    }
    // //////////////////////////////////////////////////////////////////////////////////////////
    const newPlat = (categorieId) => {
        const plat = {
          name: '',
          description: '',
          categorie_id: categorieId,
          price: 5,
          position: plats.length + 1,
          active: 0,
        };
      
        setPlats(() => [...plats, plat]);
        
      
        // Réinitialiser les valeurs des champs du formulaire
       
        setBlnEdithPlats([...blnEdithPlats,true])
      };

    const handleDeletePlats = async (index) => {
        if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce plat ?')) return;
        try {
            const result = await deleteData(`plats/${plats[index].plat_id}`);
            getPlats();
        } catch (error) {
            console.log(error.message);
        }
    };
    ////////////////////////////////////////////////////////////////////////////////////////////
    const getPlats = () => {
        getData('plats').then((result) => {
            result.sort((a, b) => {
                return a.position > b.position ? 1 : -1
            });
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

        getPlats();

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
                <div className="container_couvertureCarteAdmin">
                    <div className="container_imageAdmin">
                        <img className="img_couvertureCarteAdmin" src={cartePicture ?? url_server + carte.url_picture} />
                        <div className="btn_modifierImageAdmin">
                            {blnEditCarte ? (
                                <Uploadfile setSelectedFile={setFileCartePicture} setPreviewPicture={setCartePicture} />
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                    {blnEditCarte ? (
                        <textarea className="title_couvertureCarteAdmin" defaultValue={carte.title} id="carte_title"></textarea>
                    ) : (
                        <div className="title_couvertureCarteAdmin">{carte.title}</div>
                    )}
                    <div className="navigation_Admin">
                        {!blnEditCarte ? (
                            <IconEdit onClick={() => setBlnEditCarte(true)} />
                        ) : (
                            <>
                                <IconSave onClick={() => saveCarte(carte)} />
                                <IconCancel className="text-danger" onClick={() => setBlnEditCarte(false)} />
                            </>
                        )}
                    </div>
                </div>
            </section>

            <p className="intituleAdmin">PLATS</p>
            <section className="section_Admin">
                {categories.map(item => (
                    <div className="categories_adminAdmin" key={item.categorie_id}>
                        <h2 className="title_categoriesAdmin">{item.name}</h2>
                        {plats
                           .map((plat,i ) => (
                                <>{    plat.categorie_id !== item.categorie_id ?
                                     <></>  
                                      :
                                <div className="platsAdmin" key={plat.plat_id}>
                                    <div className=""> 
                                        <div className="content_titleAdminCarte">
                                            {blnEdithPlats[i] ?
                                                <>
                                                    <textarea
                                                        placeholder="saisir le nom du plat"
                                                        className="title_plats"
                                                        id={"title_plats" + i}
                                                        defaultValue={plat.name}
                                         
                                                    ></textarea>
                                                    <textarea
                                                        placeholder="saisir le description du plat"
                                                        className="content_plats"
                                                        id={"content_plats" + i}
                                                        defaultValue={plat.description}
                                               
                                                    ></textarea>
                                                </>
                                                :
                                                <>
                                                    <div className="title_plats" >{plat.name}</div>
                                                    <div className="content_plats">{plat.description}</div>
                                                </>
                                            }
                                        </div>
                                    </div>
                                    {
                                        !blnEdithPlats[i] ?
                                            <div className="prix_plats">{plat.price + '€'} </div>
                                            :
                                            <input className="prix_plats"
                                            id={"prix_plats" + i}
                                                placeholder="prix"
                                                defaultValue={plat.price }></input>
                                    }
                                    <div className="navigation_Admin">
                                        <input
                                            className="input_active"
                                            type="checkbox"
                                            disabled={!blnEdithPlats[i]}
                                            defaultChecked={plat.active === 1}
                                            id={"plats_checkbox" + i}
                                        />
                                        {!blnEdithPlats[i] ?
                                            <IconEdit onClick={() => toggleEditPlats(i)} />
                                            :
                                            <>
                                                {plat.plat_id > 0 && <IconDelete onClick={() => handleDeletePlats(i)} />}
                                                <IconSave onClick={() => savePlats(i)} />
                                                <IconCancel className="text-danger" onClick={() => toggleEditPlats(i)} />
                                            </>
                                        }
                                        {blnEdithPlats[i] && plat.plat_id > 0 && (
                                            <div className="navigation_flechesAdmin">
                                                {i + 1 > 1 && <IconUp onClick={() => swapOrder(i, -1)} />}
                                                {i + 1 < plats.length && <IconDown onClick={() => swapOrder(i, 1)} />}
                                            </div>
                                        )}
                                    </div>
                               
                                    </div>
                           
                                            }</>    ))}

                        {!plats.find((plat) => plat.categorie_id === item.categorie_id && !plat.plat_id ) && (
                            <div onClick={() =>{console.log(item.categorie_id); newPlat(item.categorie_id)}}>
                                <span>Ajouter { item.name }</span>
                                <IconAdd />
                            </div>
                        )}
                    </div>
                ))}
            </section>


        </>
    );

}
export default Carte;