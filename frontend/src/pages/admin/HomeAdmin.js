import { useEffect, useState } from "react";
import { getData, url_server } from "../../lib/api"
import btnAjouter from "../images/btn_ajouter.jpg"
import btnModifier from "../images/btn_modifier.jpeg"
import btnTrash from "../images/trash_icons.png"
import btnEnregistre from "../images/btn_enregisre.png"
import btnFlecheHaut from "../images/btn_FlecheHaut.png"
import btnFlecheBas from "../images/btn_FlecheBas.png"
import "../admin/HomeAdmin.css";

const HomeAdmin = () => {
  //  varibles d'etats
  const [edito, setEdito] = useState({})
  const [cover, setCover] = useState({})
  const [illustrations, setIllustrations] = useState([])


  useEffect(() => {

    getData('illustrations').then((result) => {
      setIllustrations(result)
    })

    getData('article/acceuil').then((result) => {
      setCover(result)
    })
    getData('article/edito').then((result) => {
      setEdito(result)
    })
  }, []);

  return <>
    <p className="intitule">COUVERTURE</p>
    <section className="section_Admin">
      <div className="container_couvertureAdmin ">
        <div className="container_image">
          <img className="img_couvertureAdmin " src={url_server + cover.url_picture} />
          <div className="btn_modifierImage">
            <img className="btnAjouter" src={btnAjouter} />
            <p className="textModifier_image">modifier l'image</p>
          </div>
        </div>
        <div className=" title_couvertureAdmin ">{cover.title}
        </div>
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

    {/* section illustration */}
    {/* boucle avec les tableau */}
    <p className="intitule">ILLUSTRATIONS</p>
    <section className="section_Admin" >
      {illustrations.map(illustration => {
        return (
          <div className="container_illustrationAdmin" key={illustration.id}>
            <div className="container_image">
              <img name="" className="image_illustrationAdmin" src={url_server + illustration.url_picture} />
              <div className="btn_modifierImage">
                <img className="btnAjouter" src={btnAjouter} />
                <p className="textModifier_image">modifier l'image</p>
              </div>
            </div>
            <div className="title_illustrationAdmin" >{illustration.title}
            </div>
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
        );
      })}
    </section>
    {/* section edito */}
    <p className="intitule">EDITO</p>
    <section className="section_Admin">
      <div className="container_editoAdmin ">
        <div className="container_image">
          <img className="image_editoAdmin" src={url_server + edito.url_picture} />
          <div className="btn_modifierImage">
            <img className="btnAjouter" src={btnAjouter} />
            <p className="textModifier_image">modifier l'image</p>
          </div>
        </div>
        <div className="container_articleEditoAdmin" >
          <h2 className="title_editoAdmin" >{edito.title}</h2>
          <article className="article_editoAdmin" >{edito.content}</article>
        </div>
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

  </>;
};

export default HomeAdmin;