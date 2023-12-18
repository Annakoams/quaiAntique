import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { postData, deleteData, getData, url_server, postFormData } from "../../lib/api";
import Uploadfile from "../../components/uploadfile";
import { IconAdd, IconEdit, IconDelete, IconSave, IconDown, IconUp, IconCancel } from "../../lib/icons";
import "../admin/ReservationsAdmin.css";
// import "../admin/Commun.module.css";



const Reservations = () => {


 

    

    const [reservations, setReservations] = useState([]);

 



   

    ///////////////////////////////////////////////////////////////////////////////////////
   
    ////////////////////////////////////////////////////////////////////////////////////////////
    const getReservations = () => {
        getData('reservations').then((result) => {
           if(result) 
            setReservations(result);
            console.log(result)
        
        })
            .catch(error => {
                console.log("An error occurred while fetching menu data:", error);
            });
    }

    useEffect(() => {

      getReservations();

     
    }, []);


    return (
        <>
            
            <p className="intituleAdmin">RESERVATIONS </p>
            <section className="section_Admin">
               <table>
                        {
                        reservations.map((reservation,i ) => (
                            <>
                           
                            <thead>
                                <th scope = "col">numero</th>
                                <th scope = "col">email</th>
                                <th scope = "col">Nom</th>
                                <th scope = "col">Nombre de convives</th>
                                <th scope = "col">Date</th>
                                <th scope = "col">alergies</th>
                            </thead>
                                <tr key={i}>   
                                <td>{reservation.reservation_id}</td>
                                <td>{reservation.email} </td>
                                <td>{reservation.name}</td>
                                <td>{reservation.nb_guest}</td>
                                <td>{reservation.reservation_date}</td>
                                <td>{reservation.allergies}</td>
                                
                                <td></td>
                               
                                </tr>   
                                 </> ))}
</table>
                     
            </section>


        </>
    );

}
export default Reservations;