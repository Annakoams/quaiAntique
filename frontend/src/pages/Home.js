import { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { getData, url_server } from "../lib/api";
import Slider from "../components/Slider";
import {Motion, spring} from 'react-motion'
import Illustration from "../components/illustrations"

import './Home.css'



const Home = () => {
  //  varibles d'etats
  
  
  // const [illustrations, setIllustrations] = useState([])
  const [edito, setEdito] = useState({})
  // const [illustrations, setIllustrations] = useState([]);
  const [cover, setCover] = useState([]);
  


  useEffect(() => {
    getData('article/acceuil').then((result) => {
      setCover(result)
    })
    

    // getData('illustrations').then((result) => {
    //   setIllustrations(result)
    // })


    getData('article/edito').then((result) => {
      setEdito(result)
    })

  }, []);

  

  return <>

    <section className="container_couvertureHome">
    <div >
            <img className="img_couvertureHome" src={url_server + cover.url_picture} alt="Couverture de site"/>
            <div className="title_et_btn">
              <h1 className="title_couvertureHome">{cover.title}</h1>
              <button className="btn_reservezVotreTable">
                <Link to="/reservation">Réserver votre table</Link>
              </button>
            </div>
          </div>
    </section>


     {/* boucle avec les tableau  */}
    {/* <section className="container_illustration" >
      {
      illustrations.map(illustration => {
        return (
          <div className="illustration" key={illustration.illustration_id}>
            <div className="title_illustrations" >{illustration.title}</div>
            <img className="image_illustration" src={url_server + illustration.url_picture} alt=" des illustrations des plats"/>
          </div>
        );
      })}
    </section> */}
     <section className="container_illustration">
    <Illustration />
    </section> 

    <section className="container_edito">
      <div className="container_articleEdito" >
        <h2 className="title_edito" >{edito.title}</h2>
        <article className="article_edito" >{edito.content}</article>
      </div>
      <img className="image_edito" src={url_server + edito.url_picture} alt="la cuisine savoyarde"/>


    </section>
    <div className="container_button">
          <button className="btn_decouvrirNotreCarte">
                <Link to="/carte">Découvrez notre carte</Link>
              </button>
    </div>


  </>;
};

export default Home;