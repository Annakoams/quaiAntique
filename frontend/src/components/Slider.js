// import React, { useEffect, useState } from 'react';
// import { getData, url_server } from '../lib/api';
// import 'react-responsive-carousel/lib/styles/carousel.min.css';
// import { Carousel } from 'react-responsive-carousel';
// import { Link } from 'react-router-dom';
// import './Slider.css';


// function Slider() {
//   const [covers, setCovers] = useState([]);


//   useEffect(() => {
//     getData('article/acceuil')
//       .then(result => {
//         if (Array.isArray(result) && result.length > 0) { // Check if the result is an array with at least one item
//           setCovers(result);
//         } else {
//           console.error('Invalid data format for covers');
//         }
//       })
//       .catch(error => {
//         console.error('Error fetching covers:', error);
//       });
//   }, []);

//   return (
//     <>
//       <Carousel
//       autoPlay
//       interval={4000}
//       infiniteLoop
//       showIndicators={true}
//       showStatus={false}
//       showThumbs={false}
      
      
//       >
//         {covers.map(cover => (
//           <div key={cover.target}>
//             <img className="img_couvertureHome" src={url_server + cover.url_picture} alt="Couverture de site"/>
//             <div className="title_et_btn">
//               <h1 className="title_couvertureHome">{cover.title}</h1>
//               <button className="btn_reservezVotreTable">
//                 <Link to="/reservation">Réserver votre table</Link>
//               </button>
//             </div>
//           </div>
//         ))}
//       </Carousel>
//     </>
//   );
// }

// export default Slider;

