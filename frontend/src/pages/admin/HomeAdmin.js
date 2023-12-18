import { useEffect, useState } from "react";
import { deleteData, postData, getData, url_server, putData, postFormData } from "../../lib/api";
import Uploadfile from "../../components/uploadfile";
import { IconAdd, IconEdit, IconDelete, IconSave, IconDown, IconUp, IconCancel } from "../../lib/icons";
import "../admin/HomeAdmin.css";
// import "../admin/Commun.module.css";

const HomeAdmin = () => {
  //  varibles d'etats
  // Initialisation des variables d'état
  const [carte, setCarte] = useState({});

  const [cover, setCover] = useState({});
  const [blnEditCover, setBlnEditCover] = useState(false);
  const [coverPicture, setCoverPicture] = useState(null);
  const [coverFilePicture, setFileCoverPicture] = useState(null);


  const [illustrations, setIllustrations] = useState([]);
  const [blnEditIllustrations, setBlnEditIllustrations] = useState(null);
  const [illustrationsPreviewPicture, setIllustrationsPreviewPicture] = useState(null);
  const [illustrationsFilePicture, setIllustrationsFilePicture] = useState(null);


  const [edito, setEdito] = useState({})
  const [blnEditEdito, setBlnEditEdito] = useState(false)
  const [editoPicture, setEditoPicture] = useState(null)
  const [editoFilePicture, setFileEditoPicture] = useState(null)


  const [schedules, setSchedules] = useState([]);
  const [blnEditSchedules, setBlnEditSchedules] = useState(false)




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
  const result = await postFormData('article/acceuil', formData);
    if (result && result.article) setCover(result.article);

    // Réinitialiser l'état
    setBlnEditCover(false);

  }

  //////////////////////////////////////////////////////////////////////////////////
  // ajout dune illustration

  const newIllustration = async () => {
    const illustration = {
      illustration_id: 0,
      url_picture: "images/empty.png",
      title: "",
      position: illustrations.length + 1,
      active: 1
    }
    setIllustrations([...illustrations, illustration])
    setBlnEditIllustrations([...blnEditIllustrations, true]);
    setIllustrationsFilePicture([...illustrationsFilePicture, null]);
    setIllustrationsPreviewPicture([...illustrationsPreviewPicture, null]);
  }
  
  const handelDeleteIllustration = async (index) => {
    if (!window.confirm('est vous sur de vouloir suprimer cette illustration?')) return
    try {
      const result = await deleteData(`illustrations/${illustrations[index].illustration_id}`);
      getIllustrations()
    } catch (error) {
      console.log(error.message);
    }
  }

  const setIllustrationPreviewPicture = async (base64String, i) => {
    illustrationsPreviewPicture[i] = base64String;
    setIllustrationsPreviewPicture(illustrationsPreviewPicture.map((el) => el));
  }

  const setIllustrationFilePicture = (file, i) => {
    illustrationsFilePicture[i] = file;
    setIllustrationsFilePicture(illustrationsFilePicture.map((el) => el));
  }

  // gestion des illustration
  const toggleEditIllustration = (i) => {
    if (illustrations[i].illustration_id === 0) {
      setBlnEditIllustrations(blnEditIllustrations.filter((o, index) => index !== i))
      setIllustrations(illustrations.filter((o, index) => index !== i))
      setIllustrationsFilePicture(illustrationsFilePicture.filter((o, index) => index !== i))
      setIllustrationsPreviewPicture(illustrationsPreviewPicture.filter((o, index) => index !== i))
      return
    }
    blnEditIllustrations[i] = !blnEditIllustrations[i];
    setBlnEditIllustrations(blnEditIllustrations.map((el) => el))
  }

  const saveIllustration = async (index) => {
    // Mettre à jour les données de couverture
    illustrations[index].title = document.getElementById('illustrations_title' + index).value;
    illustrations[index].illustrations_checkbox = document.getElementById('illustrations_checkbox' + index).value
    // Préparer les données pour l'envoi
    const formData = new FormData();
    if (illustrationsFilePicture[index]) {
      formData.append('picture', illustrationsFilePicture[index]);}

    formData.append('illustration', JSON.stringify({ title: illustrations[index].title, active: illustrations[index].illustrations_checkbox }));
    // Envoyer la requête POST avec les données
    if (illustrations[index].illustration_id === 0) {
      const result = await postFormData('illustrations/', formData);
      if (result) setIllustrations(result)

    } else {
      const result = await postFormData('illustrations/' + illustrations[index].illustration_id, formData);
      if (result && result.illustration) {
        illustrations[index] = result.illustration
        setIllustrations(illustrations.map((elt) => elt))
      }
    }

    // Réinitialiser l'état
    blnEditIllustrations[index] = false;
    setBlnEditIllustrations(blnEditIllustrations.map((el) => el))
  }


  ///////////////////////////////////////////////////////////////////////////////////////
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

  //////////////////////////////////////////////////////////////////////////////////////

  // gestion des schedules
  const toggleEditSchedules = (i) => {
    blnEditSchedules[i] = !blnEditSchedules[i];
    setBlnEditSchedules(blnEditSchedules.map((el) => el))
  }

  // Enregistrer les modifications apportées à schedules
  const saveSchedules = async (index) => {
    schedules[index].open_time = document.getElementById('open_time' + index).value
    schedules[index].close_time = document.getElementById('close_time' + index).value
    schedules[index].nb_max_clients = document.getElementById('nb_clients' + index).value
    const formData = new FormData();
    let data = { day: schedules[index].day, open_time: schedules[index].open_time, close_time: schedules[index].close_time, nb_max_clients: schedules[index].nb_max_clients };
    var result = await postData('schedules/' + schedules[index].schedule_id, data)
    if (result && result.schedule)
      schedules[index] = result.schedule
    setSchedules(schedules.map((elv) => elv));
    blnEditSchedules[index] = false;
    setBlnEditSchedules(blnEditSchedules.map((els) => els));
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////
  // trier les illustration
  const swapOrder = (index, decalage) => {
    console.log('swapOrder', index, decalage)
    getData('illustrations/swap/' + illustrations[index].position + '/' + (illustrations[index + decalage].position)).then((result) => {
      result.sort((a, b) => {
        return a.position > b.position ? 1 : -1
      })
      setIllustrations(result)
      let previewArray = []
      let fileArray = []
      let blnArray = []
      result.forEach(element => {
        blnArray.push(false)
        fileArray.push(null)
        previewArray.push(null)
      });

      setBlnEditIllustrations(blnArray);
      setIllustrationsFilePicture(fileArray);
      setIllustrationsPreviewPicture(previewArray);
    })
  }


  const getIllustrations = () => {
    getData('illustrations').then((result) => {
      result.sort((a, b) => {
        return a.position > b.position ? 1 : -1
      });
      setIllustrations(result)
      let previewArray = []
      let fileArray = []
      let blnArray = []
      result.forEach(element => {
        blnArray.push(false)
        fileArray.push(null)
        previewArray.push(null)
      });

      setBlnEditIllustrations(blnArray);
      setIllustrationsFilePicture(fileArray);
      setIllustrationsPreviewPicture(previewArray);
    })
  }


  // Cette fonction est appelée à l'initialisation de l'application et permet de récupérer les données nécessaires
  useEffect(() => {
    
    getIllustrations()

    getData('article/acceuil').then((result) => {
      setCover(result)
    })

    getData('article/edito').then((result) => {
      setEdito(result)
    })

    getData('schedules').then((result) => {
      setSchedules(result);
      let blnArraySchedules = []
      result.forEach(element => {
        blnArraySchedules.push(false)
      });
      setBlnEditSchedules(blnArraySchedules);

    })
  }, []);

  // La fonction principale du composant

  return <>
    <p className="intitule">COUVERTURE</p>
    <section className="section_Admin">
      <div className="container_couvertureAdmin ">
        <div className="container_image">
          <img className="img_couvertureAdmin " src={coverPicture ?? url_server + cover.url_picture} alt="image de couverture" />
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

          {!blnEditCover ?
            <IconEdit onClick={() => setBlnEditCover(true)} />
            :
            <>
              <IconSave onClick={() => saveCover(carte)} />
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
      {illustrations.map((illustration, i) => {
        return (
          <div className="container_illustrationAdmin" key={illustration.illustration_id}>
            <div className="container_image">
              <img name="" className="image_illustrationAdmin" src={illustrationsPreviewPicture[i] ?? url_server + illustration.url_picture} alt="images des plats de quai antique" id={"illustrations_picture" + i} />
              {blnEditIllustrations[i] &&
                <div className="btn_modifierImage">
                  {
                    blnEditIllustrations[i] ?
                      <><Uploadfile setSelectedFile={(file) => { setIllustrationFilePicture(file, i) }} setPreviewPicture={(base64String) => { setIllustrationPreviewPicture(base64String, i) }} /></> : <></>
                  }
                </div>}
            </div>
            {blnEditIllustrations[i] ?
              <textarea placeholder="saisir le titre de l'illustration" className="title_illustrationAdmin" defaultValue={illustration.title} id={"illustrations_title" + i}>
              </textarea> :
              <div className="title_illustrationAdmin" >{illustration.title}
              </div>
            }
            <div className="navigation_Admin">
              <input className="input_active" type="checkbox" disabled={!blnEditIllustrations[i]} defaultChecked={illustration.active === 1} id={"illustrations_checkbox" + i} />
              {!blnEditIllustrations[i] ?
                <IconEdit onClick={() => toggleEditIllustration(i)} />
                :
                <>
                  {illustration.illustration_id > 0 &&
                   <IconDelete onClick={() => handelDeleteIllustration(i)} />}
                  <IconSave onClick={() => saveIllustration(i)} />
                  <IconCancel className="text-danger" onClick={() => toggleEditIllustration(i)} />
                </>}
              {(blnEditIllustrations[i] && illustration.illustration_id > 0) &&
                <div className="navigation_flechesAdmin">
                  {i + 1 > 1 &&
                    <IconUp onClick={() => swapOrder(i, -1)} />}
                  {i + 1 < illustrations.length &&
                    <IconDown onClick={() => swapOrder(i, 1)} />}
                </div>}
            </div>
          </div>
        );
      })}
      {!illustrations.find(il => il.illustration_id === 0) &&
        <div onClick={() => newIllustration()}>
          <span>Ajouter illustration</span>
          <IconAdd />
        </div>}
    </section>

    {/* section edito */}
    <p className="intitule">EDITO</p>
    <section className="section_Admin">
      <div className="container_editoAdmin ">
        <div className="container_imageEdito">
          <img className="image_editoAdmin" src={editoPicture ?? url_server + edito.url_picture} alt="" />
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
            </textarea>
            :
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
            <><IconSave onClick={() => saveEdito(edito)} />
              <IconCancel className="text-danger" onClick={() => setBlnEditEdito(false)} />
            </>
          }

        </div>
      </div>
    </section>
    {/* section schedules */}
    <p className="intitule">HORAIRES D'OUVERTURES</p>
    <section className="section_Admin" >
      {schedules.map((schedule, i) => {
        return (
          <div className="horaires_ouvertureAdmin" key={schedule.schedule_id}>
            <div className="tableau_horairesAdmin">
              <div className="joursAdmin"  >{schedule.day}</div>
              {blnEditSchedules[i] ?
                <input className="open_timeAdmin" defaultValue={schedule.open_time} id={"open_time" + i} ></input> :
                <div className="open_timeAdmin" >{schedule.open_time}</div>
              }
              {blnEditSchedules[i] ?
                <input className="close_timeAdmin" defaultValue={schedule.close_time} id={"close_time" + i} ></input> :
                <div className="close_timeAdmin" >{schedule.close_time}</div>
              }
              {blnEditSchedules[i] ?
                <input className="nb_clientsAdmin" defaultValue={schedule.nb_max_clients} id={"nb_clients" + i}  ></input> :
                <div className="nb_clientsAdmin" >{schedule.nb_max_clients}</div>
              }
              <div className="navigation_Admin">

                {!blnEditSchedules[i] ?
                  <IconEdit onClick={() => toggleEditSchedules(i)} />
                  :
                  <>

                    <IconSave onClick={() => saveSchedules(i)} />

                    <IconCancel className="text-danger" onClick={() => toggleEditSchedules(i)} />
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