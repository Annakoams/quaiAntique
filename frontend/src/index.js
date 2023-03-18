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
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
