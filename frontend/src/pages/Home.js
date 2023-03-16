import { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { getData, url_server } from "../lib/api";
import './Home.css'



const Home = () => {
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

    <section className="container_couvertureHome">
      <img className="img_couvertureHome" src={url_server + cover.url_picture} />
      <div className="title_et_btn">
        <h1 className="title_couvertureHome">{cover.title}</h1>
        <button className="btn_reservezVotreTable" ><Link to="/reservation">Reserver votre table</Link></button>
      </div>
    </section>


    {/* boucle avec les tableau */}
    <section className="container_illustration" >
      {
      illustrations.map(illustration => {
        return (
          <div className="illustration" key={illustration.illustration_id}>
            <div className="title_illustrations" >{illustration.title}</div>
            <img className="image_illustration" src={url_server + illustration.url_picture} />
          </div>
        );
      })}
    </section>

    <section className="container_edito">
      <div className="container_articleEdito" >
        <h2 className="title_edito" >{edito.title}</h2>
        <article className="article_edito" >{edito.content}</article>
      </div>
      <img className="image_edito" src={url_server + edito.url_picture} />

    </section>

  </>;
};

export default Home;