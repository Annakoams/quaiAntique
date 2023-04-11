import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import { postData } from '../lib/api';
import InputGroup from 'react-bootstrap/InputGroup';
import { Outlet, Link } from "react-router-dom";
import { ArrowRight } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import './Reservation.css'



const Reservation = () => {
  const navigate= useNavigate()
  const date = (new Date());

  const choix_couverts =Array.from({length: 12}, (v, k) => k+1); 
  const choix_morning_hours =[ "12:00", "12:15", "12:30", "12:45","13:00","13:15", "13:30", "13:45","14:00" ]; 
  const choix_evening_hours =[ "19:00", "19:15", "19:30","19:45","20:00","20:15", "20:30", "20:45","24:00","20:15", "20:30", "20:45" ]; 
  const choix_dates = Array.from({length: 12}, (v, k) => {

      return  ( new Date( Date.now() + 24*60*60*1000*k  )).toDateString();


  }    ); 
  const [msgErrorResa, setMsgErrorResa] = useState("");

  const [nbGuests, setNbGuests] = useState(2);
  const [reservationDate, setReservationDate] = useState(date.toDateString())
  const [reservationHours, setReservationHours] = useState(null);
  const [user_id, setUserId] = useState(null);
  const [email, setEmail] = useState(null);
  const [name, setName] = useState(null);
  const [allergies, setAllergies] = useState(null);
  

  useEffect(() => {
    /** verification si le visiteur est connecté */

    var stringUser = localStorage.getItem("user");

    if (stringUser) {
      const user = JSON.parse(stringUser);
      setName(user.name);
      setUserId(user.user_id);
      setEmail(user.email);
      setAllergies(user.allergies);
      setNbGuests(user.ng_guests);
      
      
    }
  }, [])

  const verificationEmail = (email) => {

    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

const ValideReservation=async ()=>{
// Controle  des informations
if( !name) {
  setMsgErrorResa("Vous devez saisir votre nom");
  return;
}
if( !reservationHours) {
  setMsgErrorResa("Vous devez saisir un horaire");
  return;
}
if( !email) {
  setMsgErrorResa("Vous devez saisir votre adresse email");
  return;
}
if( !reservationHours) {
  setMsgErrorResa("Vous devez saisir un horaire");
  return;
}
if( !nbGuests) {
  setNbGuests("Vous devez saisir nombre d'accompagniateurs");
  return;
}

if (!verificationEmail(email)) {
  setMsgErrorResa('Saisissez une adresse mail valide');
  return;
}

let reservation ={};
if (user_id) reservation.user_id = user_id;
reservation.name = name;
reservation.email= email;
reservation.nb_guests = nbGuests;
reservation.allergies = allergies;
reservation.reservation_date =   new Date(  reservationDate + " " + reservationHours).toISOString() ;
//// La validation 
const result = await postData('resa',reservation);

if(result=="OK") {
  alert(name + ", votre réservation est enregistrée ")
}
navigate("/")

}
  return (
    <Form>
      <div className='container_inputsTitle'>
        <h1 className='title_reservations'>Merci d'avoir choisi Quai Antique</h1>
        <div className='container_inputs'>
          <InputGroup className=" inputs mb-3 ">
            <InputGroup.Text id="basic-addon1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-add" viewBox="0 0 16 16">
              <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
              <path d="M8.256 14a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1h5.256Z" />
            </svg></InputGroup.Text>
            <Form.Select className='input_select' aria-label="Default select example"  onChange={(e)=>{setNbGuests(e.target.value)}}>
              <option value="0">Nombre des couvertes</option>
            { choix_couverts.map(nbcouverts=>       <option key={nbcouverts} value={nbcouverts}>{nbcouverts}</option> ) }
            </Form.Select>
          </InputGroup>
          <InputGroup className=" inputs mb-3">
            <InputGroup.Text id="basic-addon1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-calendar3" viewBox="0 0 16 16">
              <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z" />
              <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
            </svg></InputGroup.Text>
            <Form.Select aria-label="Default select example">
            
              { choix_dates.map(date=>       <option key={date} value={date}>{date}</option> ) }  
            </Form.Select>
          </InputGroup>
        </div>
      </div>

      <div className='container_resa'>
        <h4 className='title_hour'>DEJEUNER</h4>
        <div className=' grid container_hour'>
          {   choix_morning_hours.map(hour=>     <div key={hour} className={'hour ' + (hour==reservationHours ? " bg-dark":"")   }  onClick={()=>setReservationHours(hour) }   >{hour}</div> )  }
         
        </div>
      </div>
      <div className='container_resa'>
        <h4 className='title_hour'>DINER</h4>
        <div className=' grid container_hour'>
        {   choix_evening_hours.map(hour=>     <div key={hour} className={'hour ' + (hour==reservationHours ? " bg-dark":"")   }  onClick={()=>setReservationHours(hour) }   >{hour}</div> )  }
        </div>
      </div>
      <div className='containeur_btn'>
      
        <input className='input_resa' type="text" id="name" name="name"  defaultValue={name}  onChange={(e)=>{setName(e.target.value)   }}  />
      
        <input className='input_resa' type="text" id="email" name="email"  defaultValue={email}   onChange={(e)=>{setEmail(e.target.value)   }}  />
        <h6 className='text-danger '>{msgErrorResa} </h6>
     {  user_id  ? <button  type="button" className="btn_reservez p-2 px-4" onClick={ValideReservation}>{name}, Reservez votre table</button> :
     <button  type="button"  className="btn_reservez p-2 px-4"><Link to="/connection">Connectez-vous </Link> </button>
     }
      </div>

    </Form>
  );
};

export default Reservation;