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
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './index.css'



export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="carte" element={<Carte/>} />
          <Route path="menu" element={<Menu/>} />
          <Route path="reservation" element={<Reservation/>} />
          <Route path="connection" element={<Connection />} />
          <Route path="admin/HomeAdmin" element={<HomeAdmin/>}/>
          <Route path="*" element={<NoPage />} />
 
        
        </Route>
      </Routes>

    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);