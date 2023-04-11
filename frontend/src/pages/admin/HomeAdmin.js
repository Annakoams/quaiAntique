import { useEffect, useState } from "react";
import { getData, url_server, putData, postFormData } from "../../lib/api";
import Uploadfile from "../../components/uploadfile";
import { IconAdd, IconEdit, IconDelete, IconSave, IconDown, IconUp, IconCancel } from "../../lib/icons";
import "../admin/HomeAdmin.css";

const HomeAdmin = () => {
  //  varibles d'etats

  // Initialisation des variables d'état
  const [edito, setEdito] = useState({})
  const [cover, setCover] = useState({})
  const [illustrations, setIllustrations] = useState([])
  const [schedules, setSchedules] = useState([]);
  const [carte, setCarte] = useState({})

 const [blnEditIllustrations, setBlnEditIllustrations] = useState(null)
 
  const [blnEditSchedules, setBlnEditSchedules] = useState(false)

  const [blnEditCover, setBlnEditCover] = useState(false)
  const [coverPicture, setCoverPicture] = useState(null)
  const [coverFilePicture, setFileCoverPicture] = useState(null)

  const [blnEditEdito, setBlnEditEdito] = useState(false)
  const [editoPicture, setEditoPicture] = useState(null)
  const [editoFilePicture, setFileEditoPicture] = useState(null)

  const EditCarte = () => { }

  //// Gestion de la couverture

  // Enregistrer les modifications apportées à la couverture
  const saveCover = async () => {

    // Mettre à jour les données de couverture
    cover.title = document.getElementById('cover_title').value;

    // Préparer les données pour l'envoi
    const formData = new FormData();
    if (coverFilePicture) {
      formData.append('picture', coverFilePicture);
    }
    formData.append('article', JSON.stringify({ title: cover.title }));

    // Envoyer la requête POST avec les données
    var result = await postFormData('article/acceuil', formData);
    if (result && result.article) setCover(result.article);

    // Réinitialiser l'état
    setBlnEditSchedules(false);

  }
  /////////////////////////////

  // Enregistrer les modifications apportées à l'édito
  const saveEdito = async () => {

    // Mettre à jour les données de l'édito
    edito.title = document.getElementById('edito_title').value;
    edito.content = document.getElementById('edito_content').value;

    // Préparer les données pour l'envoi
    const formData = new FormData();
    if (editoFilePicture) {
      formData.append('picture', editoFilePicture);
    }
    formData.append('article', JSON.stringify({ title: edito.title, content: edito.content }));

    // Envoyer la requête POST avec les données
    var result = await postFormData('article/edito', formData);
    if (result && result.article) setEdito(result.article);
    setFileEditoPicture(null);
    setEditoPicture(null);
    setBlnEditEdito(false);
  }

// Enregistrer les modifications apportées à schedules
const saveShedules = async () => {
    // On récupère les valeurs des éléments HTML et on les stocke dans l'objet schedules
    schedules.day = document.getElementById('joursAdmin').value;
    schedules.open_timeAdmin = document.getElementById('open_timeAdmin')
    schedules.nb_clientsAdmin = document.getElementById('nb_clientsAdmin')

    // On crée un objet FormData qui sera utilisé pour l'envoi des données
    const formData = new FormData();

    // On ajoute les horaires sous forme de chaîne JSON à l'objet FormData
    formData.append('schedules', JSON.stringify({ day: schedules.day }));

    // On envoie les données au serveur et on récupère le résultat
    var result = await postFormData('schedules', formData);

    // Si le résultat est valide et que les horaires ont été modifiés, on met à jour l'état de l'application
    if (result && result.schedules) setSchedules(result.schedules);

    // On remet à zéro le mode d'édition des horaires
    setBlnEditSchedules(false);
  }

// gestion des illustration
  const toggleEditIllustration = (i) =>{
    blnEditIllustrations[i]=!blnEditIllustrations[i];
console.log(blnEditIllustrations)
    setBlnEditIllustrations(blnEditIllustrations.map((el)=>el))
  }
// Cette fonction est appelée à l'initialisation de l'application et permet de récupérer les données nécessaires
useEffect(() => {
    // On récupère les illustrations
    getData('illustrations').then((result) => {
      setIllustrations(result)
      let blnArray = []
      result.forEach(element => {
        blnArray.push(false)
        
      });
      console.log(blnArray);
      setBlnEditIllustrations(blnArray);
    })

    getData('article/acceuil').then((result) => {
      setCover(result)
    })

    getData('article/edito').then((result) => {
      setEdito(result)
    })

    getData('schedules').then((result) => {
      setSchedules(result)
      return
    })
  }, []);

// La fonction principale du composant

  return <>
    <p className="intitule">COUVERTURE</p>
    <section className="section_Admin">
      <div className="container_couvertureAdmin ">
        <div className="container_image">
          <img className="img_couvertureAdmin " src={coverPicture ?? url_server + cover.url_picture} />
          <div className="btn_modifierImage">
            {
              blnEditCover ?
                <><Uploadfile setSelectedFile={setFileCoverPicture} setPreviewPicture={setCoverPicture} /></> : <></>
            }

          </div>
        </div>
        {
          blnEditCover ?
            <textarea className=" title_couvertureAdmin " defaultValue={cover.title} id="cover_title"  >
            </textarea> :
            <div className=" title_couvertureAdmin ">{cover.title}
            </div>

        }
        <div className="navigation_Admin">

          {!blnEditCover ? <IconEdit onClick={() => setBlnEditCover(true)} />
            :
            <><IconSave onClick={() => saveCover(carte)} />
              <IconCancel className="text-danger" onClick={() => setBlnEditCover(false)} />
            </>
          }

        </div>
      </div>
    </section>
    {/* section illustration */}
    {/* boucle avec les tableau */}
    <p className="intitule">ILLUSTRATIONS</p>
    <section className="section_Admin" >
      {illustrations.map((illustration,i) => {
        return (
          <div className="container_illustrationAdmin" key={illustration.illustration_id}>
            <div className="container_image">
              <img name="" className="image_illustrationAdmin" src={url_server + illustration.url_picture} />
              { blnEditIllustrations[i] && 
              <div className="btn_modifierImage">
                <IconAdd onClick={() => EditCarte(carte)} />
              </div>}
            </div>
            <div className="title_illustrationAdmin" >{illustration.title}
            </div>
            <div className="navigation_Admin">
              <input className="input_active" type="checkbox" disabled={!blnEditIllustrations[i]}  defaultChecked={illustration.active == 1} />
              <IconEdit onClick={() => toggleEditIllustration(i)} />
              {blnEditIllustrations[i] &&
              <><IconDelete onClick={() => EditCarte(carte)} />
              <IconSave onClick={() => EditCarte(carte)} />
              </>}
             {blnEditIllustrations[i] &&
              <div className="navigation_flechesAdmin">
                <IconUp />
                <IconDown />
              </div>}
            </div>

          </div>
        );
      })}
    </section>
    {/* section edito */}
    <p className="intitule">EDITO</p>
    <section className="section_Admin">
      <div className="container_editoAdmin ">
        <div className="container_imageEdito">
          <img className="image_editoAdmin" src={editoPicture ?? url_server + edito.url_picture} />
          <div className="btn_modifierImage">
            {
              blnEditEdito ?
                <><Uploadfile setSelectedFile={setFileEditoPicture} setPreviewPicture={setEditoPicture} /></> : <></>
            }
          </div>
        </div>
        <div className="container_articleEditoAdmin" >
          {blnEditEdito ?
            <textarea className="title_editoAdmin" defaultValue={edito.title} id="edito_title">
            </textarea> :
            <h2 className="title_editoAdmin" >{edito.title}</h2>
          }
          {blnEditEdito ?
            <textarea className="article_editoAdmin" defaultValue={edito.content} id="edito_content" >
            </textarea> :
            <article className="article_editoAdmin" >{edito.content}</article>
          }

        </div>

        <div className="navigation_AdminEdito">
          {!blnEditEdito ?
            <IconEdit onClick={() => setBlnEditEdito(true)} />
            :
            <><IconSave onClick={() => saveEdito()} />
              <IconCancel className="text-danger" onClick={() => setBlnEditEdito(false)} />
            </>
          }

        </div>
      </div>
    </section>
    {/* section schedules */}
    <p className="intitule">HORAIRES D'OUVERTURES</p>
    <section className="section_Admin" >
      {schedules.map(schedule => {
        return (
          <div className="horaires_ouvertureAdmin" key={schedule.schedule_id}>
            <div className="tableau_horairesAdmin">
              <div className="joursAdmin" >{schedule.day}</div>
              {blnEditSchedules ?
                <textarea className="open_timeAdmin" defaultValue={carte.title} id="open_timeAdmin" ></textarea> :
                <div className="open_timeAdmin" >{schedule.open_time}</div>
              }
              {blnEditSchedules ?
                <textarea className="close_timeAdmin" defaultValue={carte.title} id="close_timeAdmin"  ></textarea> :
                <div className="close_timeAdmin" >{schedule.close_time}</div>
              }
              {blnEditSchedules ?
                <textarea className="nb_clientsAdmin" defaultValue={carte.title} id="nb_clientsAdmin"   ></textarea> :
                <div className="nb_clientsAdmin" >{schedule.nb_max_clients}</div>
              }
              <div className="navigation_Admin">

                {!blnEditSchedules ? <IconEdit onClick={() => setBlnEditSchedules(true)} />
                  :
                  <><IconSave onClick={() => saveShedules(carte)} />
                    <IconCancel className="text-danger" onClick={() => setBlnEditSchedules(false)} />
                  </>
                }

              </div>
            </div>
          </div>
        );
      })}
    </section>

  </>;
};

export default HomeAdmin;