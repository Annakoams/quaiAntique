import { useEffect, useState } from "react";
import { getData, url_server } from "../../lib/api"
import btnAjouter from "./imagesAdmin/btn_ajouter.jpg"
import btnModifier from "./imagesAdmin/btn_modifier.jpeg"
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

    <section className="section1_Admin">
      <div className="container_couvertureAdmin ">
        <div className="">
          <img className="img_couvertureAdmin " src={url_server + cover.url_picture} />
          <div className="modifier_image">
            <img className="btnAjouter" src={btnAjouter}/>
            <p className="textModifier_image">modifier l'image</p>
          </div>
        </div>
        <div className=" title_couvertureAdmin ">{cover.title}
        </div>
        <div classname=" navigation_couecrtureAdmin ">
          <img className="btnModifier"src={btnModifier}/>
        </div>

      </div>

    </section>


    {/* boucle avec les tableau */}
    <section className="container_illustrationAdmin" >
      {illustrations.map(illustration => {
        return (
          <div className="illustrationAdmin" key={illustration.id}>
            <div className="title_illustrationsAdmin" >{illustration.title}</div>
            <img name="" className="image_illustrationAdmin" src={url_server + illustration.url_picture} />
          </div>
        );
      })}
    </section>

    <section className="container_editoAdmin">
      <img className="image_editoAdmin" src={url_server + edito.url_picture} />
      <div className="container_articleEditoAdmin" >
        <h2 className="title_editoAdmin" >{edito.title}</h2>
        <article className="article_editoAdmin" >{edito.content}</article>
      </div>


    </section>

  </>;
};

export default HomeAdmin;