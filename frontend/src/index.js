import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Carte from "./pages/Carte";
import Menu from "./pages/Menu";
import Reservation from "./pages/Reservation";
import Connection from "./pages/Connection";
import NoPage from "./pages/NoPage";
import HomeAdmin from "./pages/admin/HomeAdmin.js"
import CarteAdmin from "./pages/admin/CarteAdmin"
import MenuAdmin from "./pages/admin/MenuAdmin"
import ReservationsAdmin from "./pages/admin/ReservationsAdmin"
import UsersAdmin from "./pages/admin/UsersAdmin"
import 'bootstrap/dist/css/bootstrap.min.css';
import {  useState,useEffect } from "react";
import './index.css'

 

export default function App() {
const [user, setUser ]= useState(null);
 
useEffect(()=>{
var stringUser = localStorage.getItem("user");
var _user =null
if (stringUser)
{
 _user = JSON.parse(stringUser);  
} 
setUser(_user)

},[])


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout user={user} setUser={setUser} />}>
          <Route index element={<Home />} />
          <Route path="carte" element={<Carte/>} />
          <Route path="menu" element={<Menu/>} />
          <Route path="reservation" element={<Reservation/>} />
          <Route path="connection" element={<Connection setUser={setUser}  />} />
          <Route path="admin/HomeAdmin" element={<HomeAdmin/>}/>
          <Route path="admin/CarteAdmin" element={<CarteAdmin/>}/>
          <Route path="admin/MenuAdmin" element={<MenuAdmin/>}/>
          <Route path="admin/ReservationsAdmin" element={<ReservationsAdmin/>}/>
          <Route path="admin/UsersAdmin" element={<UsersAdmin/>}/>
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);


// Ce code utilise le système de routage de React Router pour définir les routes de l'application. Le composant principal de l'application est App(), qui est exporté à la fin du fichier.

// Dans App(), on utilise d'abord le composant BrowserRouter qui est fourni par React Router pour définir le comportement de routage. Ensuite, on utilise le composant Routes pour définir les différentes routes de l'application.

// La première route a le chemin "/" et utilise le composant Layout pour afficher le contenu de l'application. Les autres routes sont définies à l'intérieur de cette route principale et sont accessibles via des chemins spécifiques. Par exemple, la route pour la page "carte" utilise le composant Carte.

// Les autres routes sont similaires, mais il y a une route pour la page de connexion (Connection), une route pour la page d'administration de la carte (CarteAdmin), une route pour la page d'administration du menu (MenuAdmin), et une route pour une page d'erreur 404 (NoPage).

// Chaque route utilise l'attribut element pour définir quel composant doit être affiché lorsque la route est visitée. Les composants tels que Home, Carte, Menu, etc. sont tous des composants définis dans d'autres fichiers du projet.

// Enfin, le composant App est rendu dans le document racine de l'application avec la méthode ReactDOM.createRoot() et la méthode render().