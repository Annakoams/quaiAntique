import { useEffect, useState } from "react";
import { getData, url_server,putData  } from "../../lib/api"
import { IconAdd, IconEdit, IconDelete, IconSave, IconDown, IconUp,IconCancel } from "../../lib/icons";
import "../admin/HomeAdmin.css";

const HomeAdmin = () => {
  //  varibles d'etats
  const [edito, setEdito] = useState({})
  const [cover, setCover] = useState({})
  const [illustrations, setIllustrations] = useState([])
  const [carte, setCarte] = useState({})
  const [blnEditCover, setBlnEditCover] = useState(false)


const EditCarte = () => {}

  const saveCover = async () => {

  cover.title = document.getElementById('cover_title').value;

   await  putData('article/acceuil',{ title : cover.title } )

    setCover({...cover });
    setBlnEditCover(false);

  }

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
            {
            blnEditCover ? 
            <><IconAdd onClick={() => EditCarte(carte)} /> <p className="textModifier_image">modifier l'image</p> </> : <></>
            }
           
          </div>
        </div>
         {
          blnEditCover ?
          <textarea className=" title_couvertureAdmin "  defaultValue={cover.title}  id="cover_title"  >
          </textarea> :
         <div className=" title_couvertureAdmin ">{cover.title}
        </div>

         }
        <div className="navigation_Admin">
        
        { !blnEditCover ?   <IconEdit onClick={() => setBlnEditCover(true)} />
          :
          <><IconSave onClick={() => saveCover(carte)} />
          <IconCancel className="text-danger" onClick={() => setBlnEditCover(false)} />
          </>
}
          <div className="navigation_flechesAdmin">
            <IconUp />
            <IconDown />

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
                <IconAdd onClick={() => EditCarte(carte)} />
                <p className="textModifier_image">modifier l'image</p>
              </div>
            </div>
            <div className="title_illustrationAdmin" >{illustration.title}
            </div>
            <div className="navigation_Admin">
              < input className="input_active" type="text" />
              <IconEdit onClick={() => EditCarte(carte)} />
              <IconDelete onClick={() => EditCarte(carte)} />
              <IconSave onClick={() => EditCarte(carte)} />
              <div className="navigation_flechesAdmin">
                <IconUp />
                <IconDown />
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
        <div className="container_imageEdito">
          <img className="image_editoAdmin" src={url_server + edito.url_picture} />
          <div className="btn_modifierImage">
            <IconAdd onClick={() => EditCarte(carte)} />
            <p className="textModifier_image">modifier l'image</p>
          </div>
        </div>
        <div className="container_articleEditoAdmin" >
          <h2 className="title_editoAdmin" >{edito.title}</h2>
          <article className="article_editoAdmin" >{edito.content}</article>
        </div>
        <div className="navigation_AdminEdito">
          < input className="input_active" type="text" />
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

  </>;
};

export default HomeAdmin;